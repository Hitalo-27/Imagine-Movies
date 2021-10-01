import React, { useEffect, useState } from 'react';
import {
    Container,
    HeaderButton,
    Header,
    Banner,
    Title,
    ButtonLink,
    Rate,
    ContentArea,
    ListGenres,
    Description,
    ContainerLoading,
    Lancamento
} from './styles';

import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/core';
import api, { key } from '../../services/api';
import Stars from 'react-native-stars';
import Genres from '../../components/Genres';
import { ActivityIndicator, Modal, ScrollView } from 'react-native';
import ModalLink from '../../components/ModalLink';

import { hasMovie, saveMovie, deleteMovie } from '../../utils/storage';

export default function Detail() {

    const navigation = useNavigation();
    const route = useRoute();

    const [movie, setMovie] = useState({});
    const [openLink, setOpenLink] = useState(false);
    const [favoritedMovie, setFavoritedMovie] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isActive = true;

        async function getMovie() {
            const response = await api.get(`/movie/${route.params?.id}`, {
                params: {
                    api_key: key,
                    language: 'pt-BR'
                }
            })
                .catch((err) => {
                    console.log(err)
                })

            if (isActive) {
                setMovie(response.data);
                const isFavorite = await hasMovie(response.data);
                setFavoritedMovie(isFavorite);
                setLoading(false);

            }
        }

        if (isActive) {
            getMovie();
        }

        return () => {
            isActive = false;
        }

    }, [])

    async function handleFavoriteMovie(movie) {
        if (favoritedMovie) {
            await deleteMovie(movie.id);
            setFavoritedMovie(false);

        } else {
            await saveMovie('@imaginemovies', movie)
            setFavoritedMovie(true);
        }
    }

    if (loading) {
        return (
            <ContainerLoading>
                <ActivityIndicator
                    size={80}
                    color="#FFF"
                />
            </ContainerLoading>
        )
    }

    return (
        <Container>
            <Header>
                <HeaderButton activeOpacity={0.8} onPress={() => navigation.goBack()}>
                    <Feather
                        name="arrow-left"
                        size={28}
                        color="#FFF"
                    />
                </HeaderButton>

                <HeaderButton activeOpacity={0.8} onPress={() => handleFavoriteMovie(movie)}>
                    {favoritedMovie ? (
                        <Ionicons
                            name="bookmark"
                            size={28}
                            color="#FFF"
                        />
                    ) : (
                        <Ionicons
                            name="bookmark-outline"
                            size={28}
                            color="#FFF"
                        />
                    )}

                </HeaderButton>
            </Header>

            <Banner
                resizeMethod="resize"
                source={{ uri: `http://image.tmdb.org/t/p/original/${movie.poster_path}` }}
            />

            <ButtonLink activeOpacity={0.8} onPress={() => setOpenLink(true)}>
                <Feather name="link" size={24} color="#FFF" />
            </ButtonLink>

            <Title numberOfLines={1} >{movie.title}</Title>

            <ContentArea>
                <Stars
                    default={movie.vote_average}
                    count={10}
                    half={true}
                    starSize={20}
                    fullStar={<Ionicons name="md-star" size={24} color="#E7A74E" />}
                    emptyStar={<Ionicons name="md-star-outline" size={24} color="#E7A74E" />}
                    halfStar={<Ionicons name="md-star-half" size={24} color="#E7A74E" />}
                    disable={true}
                />

                <Rate>{movie.vote_average}/10</Rate>
            </ContentArea>

            <ListGenres
                data={movie?.genres}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => <Genres data={item} />}

            />

            <Lancamento> Data de Lançamento: {movie?.release_date} </Lancamento>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Title>Descrição</Title>
                <Description> {movie?.overview} </Description>
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={openLink}>
                <ModalLink
                    link={movie.homepage}
                    title={movie.title}
                    closeModal={() => setOpenLink(false)}
                />
            </Modal>
        </Container>
    )
}