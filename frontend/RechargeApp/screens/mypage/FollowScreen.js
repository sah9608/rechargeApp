import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {useRoute} from '@react-navigation/native';

import MyPageTab from '../../components/mypage/buttontabs/MyPageTab';
import ProfileList from '../../components/mypage/lists/ProfileLists';

const {width} = Dimensions.get('window');

export default function FollowScreen() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const route = useRoute();
  const {nickname} = route.params ?? {nickname: '사용자'};

  /** 🔥 내가 팔로우 중인 사람들 (삭제 O) */
  const [followingList, setFollowingList] = useState([
    {id: 1, name: '이여행'},
    {id: 2, name: '박영화'},
    {id: 3, name: '최음악'},
  ]);

  /** 🔥 나를 팔로우한 사람들 (삭제 X, isFollowing만 변화 O) */
  const [followerList, setFollowerList] = useState([
    {id: 10, name: '새로운유저', isFollowing: false},
  ]);

  /** -----------------------------------------
   * 🔥 1) 내 팔로잉 목록에서 언팔 → 삭제해야 함
   * ---------------------------------------- */
  const handleUnfollow = id => {
    // 1) 내 팔로잉 리스트에서는 삭제
    setFollowingList(prev => prev.filter(user => user.id !== id));

    // 2) followerList에서도 isFollowing=false 로만 업데이트
    setFollowerList(prev =>
      prev.map(user => (user.id === id ? {...user, isFollowing: false} : user)),
    );
  };

  /** -----------------------------------------
   * 🔥 2) 팔로워 목록에서 "팔로우" → 내 팔로잉 리스트에 추가
   * ---------------------------------------- */
  const handleFollow = id => {
    const user = followerList.find(u => u.id === id);
    if (user) {
      // 1) followingList에 없으면 추가(맞팔)
      setFollowingList(prev => {
        const exists = prev.some(u => u.id === id);
        return exists ? prev : [...prev, {id: user.id, name: user.name}];
      });

      // 2) followerList에 isFollowing=true로만 표시
      setFollowerList(prev =>
        prev.map(u => (u.id === id ? {...u, isFollowing: true} : u)),
      );
    }
  };

  /** ▼ 탭 눌렀을 때 스크롤 이동 */
  const handleTabChange = index => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({x: width * index, animated: true});
  };

  /** ▼ 스크롤 끝났을 때 탭 동기화 */
  const handleScrollEnd = e => {
    const page = Math.round(e.nativeEvent.contentOffset.x / width);
    setActiveIndex(page);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* 상단 제목 고정 */}
      <Text style={styles.title}>{nickname}의 팔로잉</Text>

      {/* 탭 */}
      <MyPageTab
        labels={['팔로잉', '팔로워']}
        activeIndex={activeIndex}
        onTabChange={handleTabChange}
      />

      {/* 좌우 스크롤 영역 */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        style={{flex: 1}}>
        {/* 팔로잉 */}
        <View style={{width}}>
          <ProfileList
            data={followingList}
            mode="following"
            onPressUnfollow={handleUnfollow}
          />
        </View>

        {/* 팔로워 */}
        <View style={{width}}>
          <ProfileList
            data={followerList}
            mode="follower"
            onPressFollow={handleFollow}
            onPressUnfollow={handleUnfollow}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    padding: 20,
    paddingBottom: 10,
    color: '#001c33',
  },
});
