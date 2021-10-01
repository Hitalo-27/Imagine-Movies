import React from 'react';

import { 
    Container,
    BannerItem,
    Title,
    RateContainer,
    Rate
} from './styles';
import {Ionicons} from '@expo/vector-icons';


export default function SliderItem({data, navigatePage}) {
 return (
   <Container activeOpacity={0.8} onPress={() => navigatePage(data)}>
       <BannerItem
            resizeMethod="resize"
            source={{uri: `http://image.tmdb.org/t/p/original/${data.poster_path}`}}
       />

       <Title numberOfLines={1}>{data.title}</Title>

       <RateContainer>
            <Ionicons
                name="md-star"
                size={12}
                color="#e7a74e"
            />

            <Rate>{data.vote_average}/10</Rate>
       </RateContainer>
   </Container>
  );
}