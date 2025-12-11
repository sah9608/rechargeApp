import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button from '../../common/Button';

export default function ProfileList({
  data = [],
  mode, // "following" | "follower"
  onPressFollow,
  onPressUnfollow,
}) {
  return (
    <View style={styles.listWrapper}>
      {data.map(user => (
        <View key={user.id} style={styles.row}>
          {/* 아이콘(임시) */}
          <View style={styles.avatar}>
            <Text style={{fontSize: 24}}>🙂</Text>
          </View>

          <Text style={styles.name}>{user.name}</Text>

          {/* 1) 내 팔로잉 → 언팔로우 버튼 */}
          {mode === 'following' && (
            <Button
              type="cancel"
              text="팔로잉 취소"
              width={110}
              height={40}
              borderRadius={20}
              onPress={() => onPressUnfollow(user.id)}
            />
          )}

          {/* 2) 팔로워 → 팔로우/언팔로우(삭제 아님!) */}
          {mode === 'follower' && (
            <Button
              type={user.isFollowing ? 'cancel' : 'submit'}
              text={user.isFollowing ? '언팔로우' : '팔로우'}
              width={110}
              height={40}
              borderRadius={20}
              onPress={
                () =>
                  user.isFollowing
                    ? onPressUnfollow(user.id) // 내 팔로잉 리스트에서만 삭제
                    : onPressFollow(user.id) // 내 팔로잉 리스트에 추가
              }
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  listWrapper: {marginTop: 12},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 12,
  },
  avatar: {
    width: 40,
    marginRight: 16,
  },
  name: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#001c33',
  },
});
