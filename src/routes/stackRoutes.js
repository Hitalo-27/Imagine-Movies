import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="Detail"
                component={Detail}
                options={{
                    headerShown: false,
                    title:'Detalhes'
                }}
            />

            <Stack.Screen
                name="Search"
                component={Search}
                options={{
                    title:'Sua Busca',
                    headerTintColor:"#FFF",
                    headerTitleStyle:{
                        color:'#FFF'
                    },
                    headerStyle:{
                        backgroundColor:'#101b21'
                    }

                }}
            />
            </Stack.Navigator>
    )
}