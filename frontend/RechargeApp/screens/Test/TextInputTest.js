import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomTextInput from '../../components/common/TextInput'

const TextInputTest = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null); // forwardRef 테스트용

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TextInput Test Screen</Text>

      {/* 이메일 입력 */}
      <CustomTextInput
        label="이메일"
        value={email}
        onChangeText={setEmail}
        placeholder="이메일을 입력하세요"
        errorMessage={!email.includes('@') && email ? '올바른 이메일 형식이 아닙니다.' : ''}
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current?.focus()}
      />

      {/* 패스워드 입력 */}
      <CustomTextInput
        ref={passwordRef}
        label="비밀번호"
        value={password}
        onChangeText={setPassword}
        placeholder="비밀번호를 입력하세요"
        secureTextEntry
        style={{ marginTop: 20 }}
      />

      {/* width, height 테스트 */}
      <CustomTextInput
        label="작은 인풋"
        placeholder="height 40"
        width="50%"
        height={40}
        style={{ marginTop: 30 }}
      />

      {/* 스타일 덮어쓰기 테스트 */}
      <CustomTextInput
        label="스타일 커스텀"
        placeholder="border 색, 텍스트색 바꿔봄"
        inputStyle={{
          borderColor: '#10B981',
          color: '#059669',
        }}
        style={{ marginTop: 30 }}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default TextInputTest;
