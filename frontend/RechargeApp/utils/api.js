import axios from 'axios';
import {Platform, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 백앤드 서버 URL
// Emulator : 10.0.2.2, apk : ip - 192.168.1.127
export const API_BASE_URL =
  Platform.OS === 'android'
    ?'http://192.168.2.15:18090/api'
    : 'http://192.168.2.15:18090/api';

    //  'http://10.0.2.2:18090/api'
    //: 'http://10.0.2.2:18090/api';

// 'http://192.168.0.210:18090/api'
//: 'http://192.168.0.210:18090/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

//JwtToken 생성
api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('authToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//회원가입
export const signup = async userData => {
  try {
    console.log('회원가입 요청 데이터', userData);
    const res = await api.post('/user/signup', userData);
    console.log('회원가입 응답:', res.data);
    return res.data;
  } catch (err) {
    console.log('회원가입 실패', err.response?.data || err);
    throw err.response?.data || '회원가입 실패';
  }
};

//아이디 중복체크
export const checkUserId = async userId => {
  const res = await api.get('/user/check-id', {params: {userId}});
  return res.data;
};

//닉네임
export const checkUserNickname = async userNickname => {
  const res = await api.get('/user/check-nickname', {params: {userNickname}});
  return res.data;
};

//로그인
export const login = async userData => {
  try {
    console.log('로그인 요청 데이터:', userData);
    const res = await api.post('/user/login', userData);
    console.log('로그인 응답:', res.data);

    const user = res.data;

    if (user.token) {
      await AsyncStorage.setItem('authToken', user.token);
      await AsyncStorage.setItem('userNickname', user.userNickname);

    //id랑 role 추가
    if (user.userId) {
      await AsyncStorage.setItem('userId', user.userId);
    }
    await AsyncStorage.setItem('userRole', user.userRole || 'USER');
  }
    return user;
  } catch (err) {
    console.log('로그인 실패:', err.response?.data || err);
    throw err.response?.data || '로그인 실패';
  }
};

// 로그아웃
export const logout = async () => {
  try {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('userNickname');
    //추가
    await AsyncStorage.removeItem('userId');   // 추가됨
    await AsyncStorage.removeItem('userRole'); // 추가됨

    console.log('로그아웃 완료');
    return true;
  } catch (err) {
    console.log('로그아웃 중 오류:', err);
    return false;
  }
};

//아이디 찾기
export const findUserId = async userData => {
  try {
    console.log('아이디 찾기 성공: ', userData);
    const res = await api.post('/user/find-id', userData);
    console.log('아이디 찾기 성공:', res.data);
    return res.data;
  } catch (err) {
    console.log('아이디 찾기 실패:', err.response?.data || err);
    throw err.response?.data || '아이디 찾기 실패';
  }
};

//비밀번호 찾기 메일발송
export const findPassword = async userData => {
  try {
    console.log('비밀번호 찾기 요청 데이터:', userData);
    const res = await api.post('/user/find-password', userData);
    console.log('비밀번호 메일 발송 성공:', res.data);
    return res.data;
  } catch (err) {
    console.log('비밀번호 찾기 실패:', err.response?.data || err);
    throw err.response?.data || '비밀번호 찾기 실패';
  }
};

//비밀번호 재설정
export const resetPassword = async resetData => {
  try {
    console.log('비밀번호 재설정 요청 : ', resetData);
    const res = await api.post('/user/reset-password', resetData);
    console.log('비밀번호 재설정 응답:', res.data);
    return res.data;
  } catch (err) {
    console.log('비밀번호 재설정 실패', err.response?.data || err);
    throw err.response?.data || '비밀번호 재설정 실패';
  }
};

//이메일 인증 요청
export const sendEmailAuth = async userEmail => {
  try {
    const res = await api.post('/user/send-email-auth', {userEmail});
    console.log('이메일 인증 요청 성공:', res.data);
    return res.data;
  } catch (err) {
    console.log('이메일 인증요청 실패: ', err.response?.data || err);
    throw err.response?.data || '이메일 인증요청 실패';
  }
};

//이메일 인증 확인
export const verifyEmail = async (email, authCode) => {
  try {
    const payload = {
      userEmail: email,
      emailAuthCode: authCode,
    };

    const res = await api.post('/user/verify-email', payload);
    console.log('이메일 인증 확인 성공:', res.data);
    return res.data;
  } catch (err) {
    console.log('이메일 인증 확인 실패:', err.response?.data || err);
    throw err.response?.data || '이메일 인증 실패';
  }
};

export default api;