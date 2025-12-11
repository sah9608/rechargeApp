import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import MediaHomeContentCard from '../../../components/media/cards/MediaHeroContentCard';
import AiRecommendSection from '../../../components/media/cards/AiRecommendCard';
import Button from '../../../components/common/Button';
import GenreSelector from '../../../components/media/cards/GenreSelector';
import MediaListSection from '../../../components/media/lists/MediaListsSection';
import AiRecommendModal from '../../../components/media/contents/AiRecommendModal';

const MUSIC_GENRES = [
  {id: 'ALL', name: '전체'},
  {id: 'KR', name: '국내'},
  {id: 'US', name: '해외'},
];

function FindMusicScreen() {
  const navigation = useNavigation();
  const [showAimodal, setShowAiModal] = useState(false);

  const [dummyMusic, setDummyMusic] = useState([
    {
      id: 'm1',
      title: 'Love Dive',
      author: 'IVE',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
      isFavorite: false,
    },
    {
      id: 'm2',
      title: 'Hype Boy',
      author: 'NewJeans',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
      isFavorite: false,
    },
    {
      id: 'm3',
      title: 'OMG',
      author: 'NewJeans',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
      isFavorite: false,
    },
  ]);

  const toggleFavorite = id => {
    setDummyMusic(prev =>
      prev.map(item =>
        item.id === id ? {...item, isFavorite: !item.isFavorite} : item,
      ),
    );
  };
  const userMusicPosts = [
    {
      id: 'pm1',
      title: '집중할 때 듣기 좋은 음악 추천',
      author: '알꽁!',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
    },
    {
      id: 'pm2',
      title: '비 올 때 듣기 좋은 노래',
      author: '음악덕후',
      image: 'https://dummyimage.com/393x393/cccccc/000000&text=Album',
    },
  ];

  return (
    <>
      <ScrollView style={styles.container}>
        {/* 상단 히어로 섹션 */}
        <MediaHomeContentCard
          title="콘서트 정보"
          subtitle="아니 카리나를 실제로 본다고요"
          posters={[
            'https://dummyimage.com/393x393/cccccc/000000&text=A1',
            'https://dummyimage.com/393x393/cccccc/000000&text=A2',
            'https://dummyimage.com/393x393/cccccc/000000&text=A3',
            'https://dummyimage.com/393x393/cccccc/000000&text=A4',
          ]}
        />
        {/* AI 추천 */}
        <AiRecommendSection
          title="음악 AI 추천 받기"
          onPress={() => setShowAiModal(true)}
        />
        {/* 해외/국내 선택 */}
        <GenreSelector
          genres={MUSIC_GENRES}
          onSelect={genre => {
            console.log('선택 장르:', genre);
          }}
        />

        {/* 인기 음악 spotify 이용 예정 */}
        <MediaListSection
          title="인기 음악"
          items={dummyMusic}
          variant="musicChart"
          onFavoriteToggle={toggleFavorite}
        />

        {/* 이용자 추천 음악 */}
        <MediaListSection
          title="이용자 추천 음악"
          items={userMusicPosts}
          variant="music"
          onPressItem={music =>
            navigation.navigate('MusicDetail', {musicId: music.id})
          }
        />

        <View style={styles.bottomArea}>
          <Button
            type="submit"
            text="음악 추천하러 가기"
            height={50}
            onPress={() => navigation.navigate('MusicPostScreen')}
          />
        </View>
      </ScrollView>
      {/* Ai 추천 모달 */}
      <AiRecommendModal
        visible={showAimodal}
        onClose={() => setShowAiModal(false)}
        contentType="musicChart"
        onResultPress={(item, type) => {
          navigation.navigate('MusicDetail', {musicId: item.id});
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9F9',
  },
  bottomArea: {
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
});

export default FindMusicScreen;
