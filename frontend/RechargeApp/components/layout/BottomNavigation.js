import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BoardStack from './board/BoardStack';
import ChargerStack from './charger/ChargerStack';
import FortuneStack from './fortune/FortuneStack';
import MusicStackNavigation from './media/MusicStackNavigation';
import MyPageStackNavigation from './mypage/MypageStackNavigation';
import MovieStackNavigation from './media/MovieStackNavigation';
import NoticeStack from './notice/NoticeStack';
import SettingStack from './setting/SettingStack';

const Tab = createBottomTabNavigator();

const COLORS = {
  primary: '#004E89',
  inactive: '#9CA3AF',
  background: '#F9FAFB',
};

export default function BottomNavigation({setIsLoggedIn}) {
  return (
    <Tab.Navigator
      initialRouteName="Charge"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 90 : 65,
          paddingBottom: Platform.OS === 'ios' ? 25 : 5,
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 5,
        },
      }}>
      <Tab.Screen
        name="Charge"
        component={ChargerStack}
        options={{
          tabBarLabel: '충전',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="map-marker-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Movie"
        component={MovieStackNavigation}
        options={{
          tabBarLabel: '영화',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="movie-open" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Music"
        component={MusicStackNavigation}
        options={{
          tabBarLabel: '음악',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="music" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Fortune"
        component={FortuneStack}
        options={{
          tabBarLabel: '운세',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="star-four-points-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Board"
        component={BoardStack}
        options={{
          tabBarLabel: '게시판',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="comment-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyPage"
        options={{
          tabBarLabel: '마이페이지',
          unmountOnBlur: true,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={24}
              color={color}
            />
          ),
        }}>
        {() => <MyPageStackNavigation setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>

      <Tab.Screen
        name="Notice"
        component={NoticeStack}
        options={{tabBarButton: () => null}}
      />

      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{tabBarButton: () => null}}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
