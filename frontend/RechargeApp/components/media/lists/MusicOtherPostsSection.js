import React, {useEffect, useState} from 'react';
import MediaListsSection from './MediaListsSection';
import {fetchUserMusicPosts} from '../../../utils/MusicApi';

export default function MusicOtherPostsSection({userId, onEmpty}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadOtherPosts();
  }, [userId]);

  const loadOtherPosts = async () => {
    try {
      const data = await fetchUserMusicPosts(userId);
      setItems(data);

      if (data.length === 0 && onEmpty) onEmpty();
    } catch (err) {
      console.log('다른 음악 게시글 로드 실패:', err);
    }
  };

  return (
    <MediaListsSection
      title="이 이용자의 다른 음악 추천"
      items={items}
      variant="music"
      loading={loading}
    />
  );
}
