import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Text, StyleSheet } from 'react-native';

// 실제 연결할 페이지들이 아직 없다면 임시 컴포넌트(Placeholder)를 사용합니다.
// 나중에 실제 페이지 파일(ChargeScreen.js 등)을 import해서 교체하세요.
const ChargeScreen = () => <View style={styles.screen}><Text>충전소 찾기</Text></View>;
const MovieScreen = () => <View style={styles.screen}><Text>영화 추천</Text></View>;
const MusicScreen = () => <View style={styles.screen}><Text>음악 추천</Text></View>;
const FortuneScreen = () => <View style={styles.screen}><Text>오늘의 운세</Text></View>;
const BoardScreen = () => <View style={styles.screen}><Text>게시판</Text></View>;
const MyPageScreen = () => <View style={styles.screen}><Text>마이페이지</Text></View>;

const Tab = createBottomTabNavigator();

// 공통 컴포넌트에서 추출한 컬러 및 아이콘 설정
const COLORS = {
  primary: '#004E89', // 선택된 탭 색상 (Button.js 참조)
  inactive: '#9CA3AF', // 비활성 탭 색상
  background: '#ffffff',
};

export default function BottomNavigation() {
  return (
    <Tab.Navigator
      initialRouteName="Charge"
      screenOptions={{
        headerShown: false, // 상단 헤더 숨김 (필요 시 true)
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.inactive,
        tabBarStyle: {
          height: 65, // 탭 바 높이 약간 확보
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: COLORS.background,
          borderTopColor: '#E5E7EB', // 연한 회색 테두리
          borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11, // 탭이 6개라 글자가 겹치지 않게 크기 조정
          marginTop: 4,
          fontWeight: '500',
        },
      }}
    >
      {/* 1. 충전 (Charge) */}
      <Tab.Screen
        name="Charge"
        component={ChargeScreen}
        options={{
          tabBarLabel: '충전',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map-marker-outline" color={color} size={26} />
          ),
        }}
      />

      {/* 2. 영화 (Movie) */}
      <Tab.Screen
        name="Movie"
        component={MovieScreen}
        options={{
          tabBarLabel: '영화',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie-open" color={color} size={26} />
          ),
        }}
      />

      {/* 3. 음악 (Music) */}
      <Tab.Screen
        name="Music"
        component={MusicScreen}
        options={{
          tabBarLabel: '음악',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="music" color={color} size={26} />
          ),
        }}
      />

      {/* 4. 운세 (Fortune) */}
      <Tab.Screen
        name="Fortune"
        component={FortuneScreen}
        options={{
          tabBarLabel: '운세',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star-four-points-outline" color={color} size={26} />
          ),
        }}
      />

      {/* 5. 게시판 (Board) */}
      <Tab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          tabBarLabel: '게시판',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="comment-outline" color={color} size={26} />
          ),
        }}
      />

      {/* 6. 마이페이지 (MyPage) */}
      <Tab.Screen
        name="MyPage"
        component={MyPageScreen}
        options={{
          tabBarLabel: '마이페이지',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB', // Button.js의 배경색 참조
  },
});