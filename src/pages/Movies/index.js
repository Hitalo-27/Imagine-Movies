import React, {useState, useEffect} from 'react';
import Header from '../../components/Header';
import { Container, ContainerLoading, ListMovies } from './style';

import {getMoviesSave, deleteMovie} from '../../utils/storage';
import FavoriteItem from '../../components/FavotiteItem';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';

export default function Movies() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    let isActive = true;

    async function getFavoriteMovies(){
      const result = await getMoviesSave('@imaginemovies')

      if(isActive){
        setMovies(result);
        setLoading(false);
      }
    }

    if(isActive){
      getFavoriteMovies();
    }

    return () => {
      isActive = false;
    }

  }, [isFocused]);

  async function handleDelete(id){
    const result = await deleteMovie(id);
    setMovies(result);
  }

  function navigateDatailsPage(item){
    navigation.navigate('Detail', {id:item.id})
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
      <Header title="Meus filmes" />

      <ListMovies
        showsVerticalIndicator={false}
        data={movies}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <FavoriteItem
            data={item}
            deleteMovie={handleDelete}
            navigatePage={() => navigateDatailsPage(item)}
          />
        )}

      />
    </Container>
  );
}

