import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileRow from '../../components/profile/ProfileRow';

export default function ModifyProfileScreen({navigation}) {
  const handleSaveName = newName => console.log('새 이름:', newName);
  const handleSaveNickname = v => console.log('새 닉:', v);
  const handleSavePhone = v => console.log('새 전화:', v);
  const handleSaveCar = v => console.log('새 차종:', v);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>프로필 수정</Text>

      <View style={styles.contentbox}>
        {/* 아이디 */}
        <ProfileRow label="아이디" value="user123" />
        <View style={styles.divider} />

        {/* 비밀번호 */}
        <View style={styles.Row}>
          <Text style={styles.label}>비밀번호</Text>
          <Pressable onPress={() => navigation.navigate('FindIdScreen')}>
            <View style={styles.linkRow}>
              <Text style={styles.findText}>새 비밀번호 설정</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={18}
                color="#004E89"
              />
            </View>
          </Pressable>
        </View>
        <View style={styles.divider} />

        {/* 이메일 */}
        <ProfileRow label="이메일" value="user@email.com" />
        <View style={styles.divider} />

        {/* 이름 */}
        <ProfileRow
          label="이름"
          value="이강현"
          editable
          onSave={handleSaveName}
        />
        <View style={styles.divider} />

        {/* 닉네임 */}
        <ProfileRow
          label="닉네임"
          value="쿠로"
          editable
          onSave={handleSaveNickname}
        />
        <View style={styles.divider} />

        {/* 전화번호 */}
        <ProfileRow
          label="전화번호"
          value="01011112222"
          editable
          onSave={handleSavePhone}
        />
        <View style={styles.divider} />

        {/* 차종 */}
        <ProfileRow label="차종" value="EV4" editable onSave={handleSaveCar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004E89',
    marginBottom: 20,
  },
  contentbox: {
    backgroundColor: '#fff',
    width: '85%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  label: {
    width: 90,
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
    marginVertical: 10,
  },
  findText: {
    color: '#004E89',
    fontSize: 15,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
