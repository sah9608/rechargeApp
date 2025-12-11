import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';

import AuthStack from './components/layout/auth/AuthStack';
import BottomNavigation from './components/layout/BottomNavigation';
import {navigationRef} from './components/layout/navigationRef';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  const handleDeepLink = event => {
    const url = event.url;
    console.log('딥링크 감지됨:', url);

    if (!url) return;

    /** 🔹 비밀번호 재설정 딥링크 */
    if (url.includes('reset-password')) {
      const tokenMatch = url.match(/token=([^&]+)/);
      const token = tokenMatch ? tokenMatch[1] : null;

      if (token) {
        console.log('비밀번호 재설정 토큰:', token);
        navigationRef.current?.navigate('ResetPwd', {token});
        return;
      }
    }

    /** 🔹 이메일 인증 딥링크 */
    if (url.includes('email-auth')) {
      const emailMatch = url.match(/email=([^&]+)/);
      const codeMatch = url.match(/code=([^&]+)/);
      const userEmail = emailMatch ? decodeURIComponent(emailMatch[1]) : null;
      const authCode = codeMatch ? decodeURIComponent(codeMatch[1]) : null;

      console.log('이메일 인증 파싱:', userEmail, authCode);

      if (userEmail && authCode) {
        navigationRef.current?.navigate('VerifyEmail', {
          userEmail,
          authCode,
        });
      }
    }
  };

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      setIsLoggedIn(!!token);
      setChecking(false);

      // cold start 딥링크 체크
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) handleDeepLink({url: initialUrl});
    };
    checkToken();

    // 앱 실행 중 딥링크 감지
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove();
    };
  }, []);

  if (checking) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLoggedIn ? (
          <Stack.Screen name="MainTabs">
            {() => <BottomNavigation setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Auth">
            {() => <AuthStack setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
