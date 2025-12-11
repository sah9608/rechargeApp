import React, {useState} from 'react';
import {ScrollView, Alert} from 'react-native';
import ProfileHeader from '../../components/mypage/contents/ProfileHeader';
import MyPageTab from '../../components/mypage/buttontabs/MyPageTab';
import MyPostMediaList from '../../components/mypage/contents/MyPostMediaList';
import FavoriteMediaList from '../../components/mypage/contents/FavoriteMediaList';
import {logout} from '../../utils/api';

function MyPageScreen({route, navigation}) {
  const {setIsLoggedIn} = route.params ?? {};
  const isMine = route?.params?.isMine ?? true;
  const [isFollowing, setIsFollowing] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);

  // ⭐ 반드시 있어야 함 (더미 데이터)
  const myMoviePosts = [
    {
      id: 1,
      title: '내 영화 글 1',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=M1',
    },
    {
      id: 2,
      title: '내 영화 글 2',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=M2',
    },
    {
      id: 3,
      title: '내 영화 글 3',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=M2',
    },
  ];

  const myMusicPosts = [
    {
      id: 10,
      title: '내 음악 글 1',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=S1',
    },
    {
      id: 11,
      title: '내 음악 글 2',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=S1',
    },
    {
      id: 13,
      title: '내 음악 글 3',
      author: '알꽁님',
      image: 'https://dummyimage.com/393x590/cccccc/000000&text=S1',
    },
  ];

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert('로그아웃', '정상적으로 로그아웃되었습니다.');
      setIsLoggedIn(false); // 🔥 RootStack이 자동으로 AuthStack으로 이동!
    }
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <ProfileHeader
        nickname="알꽁님"
        postCount={12}
        followerCount={145}
        followingCount={98}
        isMine={isMine}
        isFollowing={isFollowing}
        onToggleFollow={() => setIsFollowing(prev => !prev)} // ⭐ 필요!
        onPressFollower={() =>
          navigation.navigate('FollowScreen', {mode: 'follower'})
        }
        onPressFollowing={() =>
          navigation.navigate('FollowScreen', {mode: 'following'})
        }
        onLogout={handleLogout}
      />

      <MyPageTab
        labels={['내 게시글', '즐겨찾기']}
        activeIndex={activeIndex}
        onTabChange={setActiveIndex}
      />

      {/* ⭐ activeIndex 0일 때만 내 게시글 보여줌 */}
      {activeIndex === 0 && (
        <MyPostMediaList
          moviePosts={myMoviePosts}
          musicPosts={myMusicPosts}
          onPressItem={(item, type) => {
            if (type === 'movie') {
              navigation.navigate('Movie', {
                screen: 'MovieDetail',
                params: {postId: item.id},
              });
            } else if (type === 'music') {
              navigation.navigate('Music', {
                screen: 'MusicDetail',
                params: {postId: item.id},
              });
            }
          }}
        />
      )}

      {/* ⭐ activeIndex 1일 때는 즐겨찾기 컴포넌트 표시 */}
      {activeIndex === 1 && (
        <FavoriteMediaList
          onPressItem={(item, type) => {
            console.log('즐겨찾기 클릭:', item, type);
          }}
        />
      )}
    </ScrollView>
  );
}

export default MyPageScreen;
