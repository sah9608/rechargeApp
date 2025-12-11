import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyPageScreen from '../../../screens/mypage/MyPageScreen';
import FollowScreen from '../../../screens/mypage/FollowScreen';
import Header from '../Header';

const Stack = createNativeStackNavigator();

export default function MyPageStackNavigation({setIsLoggedIn}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPageMain"
        component={MyPageScreen}
        initialParams={{setIsLoggedIn}}
        options={{header: props => <Header {...props} />}}
      />
      <Stack.Screen
        name="Follow"
        component={FollowScreen}
        options={{header: props => <Header {...props} />}}
      />
    </Stack.Navigator>
  );
}
