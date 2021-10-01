import AsyncStorage from '@react-native-async-storage/async-storage';

//Buscar os filmes salvos
export async function getMoviesSave(key){
    const myMovies = await AsyncStorage.getItem(key)

    let moviesSave = JSON.parse(myMovies) || [];

    return moviesSave;
}

//Salvar um novo filme
export async function saveMovie(key, newMovie){
    let moviesStored = await getMoviesSave(key)

    //Se tiver algum filme salvo com esse mesmo ID / ou duplicado precisamos ignorar
    const hasMovie = moviesStored.some(item => item.id == newMovie.id)

    if(hasMovie){
        return;
    }
    
    moviesStored.push(newMovie);

    await AsyncStorage.setItem(key, JSON.stringify(moviesStored));

}

//Deletar algum filme especifico
export async function deleteMovie(id){
    let moviesStored = await getMoviesSave('@imaginemovies');

    let myMovies = moviesStored.filter(item => {
        return(item.id !== id)
    })

    await AsyncStorage.setItem('@imaginemovies', JSON.stringify(myMovies));
    return myMovies;
}


//Filtrar algum filme se ja esta salvo
export async function hasMovie(movie){
    let moviesStored = await getMoviesSave('@imaginemovies');

    const hasMovie = moviesStored.find(item => item.id === movie.id);

    if(hasMovie){
        return true;
    }
        return false;
}