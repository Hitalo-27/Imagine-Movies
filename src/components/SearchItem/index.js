import React from 'react';
import { Banner, Container, Rate, RateContainer, Title } from './styles';

import {Ionicons} from '@expo/vector-icons';

export default function SearchItem({data, navigatePage}){

    function detailMovie(){
        if(data.release_date === ''){
            alert('Filme ainda sem data de lançamento');
            return;
        }

        navigatePage(data);
    }

    return(
        <Container activeOpacity={0.7} onPress={detailMovie}>
            {data?.poster_path ? (
                <Banner
                    resizeMethod="resize"
                    source={{uri: `http://image.tmdb.org/t/p/w500/${data?.poster_path}`}}
                />
            ) : (
                <Banner
                    resizeMethod="resize"
                    source={require('../../assets/semfoto.png')}
                /> 
            )}

            <Title>{data?.title}</Title>

            <RateContainer>
                <Ionicons name="md-star" size={12} color="#E7A74E" />
                <Rate>{data?.vote_average}/10</Rate>
            </RateContainer>
            
        </Container>
    )
}