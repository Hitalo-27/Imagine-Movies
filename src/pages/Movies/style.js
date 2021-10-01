import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color:#101b21;
    padding: 4px 0;
`;

export const ContainerLoading = styled.SafeAreaView`
    flex: 1;
    background-color:#101b21;
    padding: 4px 0;
    justify-content: center;
`;

export const ListMovies = styled.FlatList`

`;

export const ContainerVazio = styled.View`
    flex:1;
    align-items: center;
`;

export const Title = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 25px;
    margin-top: 38%;
`;

export const Title2 = styled.Text`
    color: #FFF;
    font-weight: bold;
    font-size: 25px;
`;

export const Pipoca = styled.Image`
    width: 90%;
    height:240px;
    border-radius: 8px;
    margin-top: 10%;
`;