import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FindMovieScreen from '../../../screens/media/movie/FindMovieScreen';
import MoviePostScreen from '../../../screens/media/movie/MoviePostScreen';
import MovieDetail from '../../../screens/media/movie/MovieDetail';
import Header from '../Header';

const Stack = createNativeStackNavigator();

export default function MovieStackNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FindMovie"
        component={FindMovieScreen}
        options={{header: props => <Header {...props} />}}
      />
      <Stack.Screen
        name="MoviePostScreen"
        component={MoviePostScreen}
        options={{header: props => <Header {...props} />}}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{header: props => <Header {...props} />}}
      />
    </Stack.Navigator>
  );
}
