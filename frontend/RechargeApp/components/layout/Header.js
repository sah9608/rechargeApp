import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../common/Button';
import IconButton from '../common/iconButton';
import DropdownModalKSA from '../common/DropdownModalKSA';

//임시 알림 데이터
const notificationData = [
  {id: 1, content: '이여행님이 팔로우 했습니다.', date: '1분전'},
  {id: 2, content: '사과님이 팔로우 했습니다.', date: '1시간 전'},
  {id: 3, content: "'충전소 추천'글에 댓글이 달렸습니다.", date: '어제'},
  {id: 4, content: "'충전소 추천'글에 댓글이 달렸습니다.", date: '어제'},
  {id: 5, content: "'충전소 추천'글에 댓글이 달렸습니다.", date: '어제'},
  {id: 6, content: "'충전소 추천'글에 댓글이 달렸습니다.", date: '어제'},
];

export default function Header({navigation}) {
  // navigation.canGoBack()은 무조건 안전 (Navigator가 props로 넘기기 때문)
  const canGoBack = navigation.canGoBack();

  const [isNotVisible, setIsNotiVisible] = useState(false);
  const [dropDownPosition, setDropdownPosition] = useState({top: 0, left: 0});

  const alarmIconRef = useRef(null);

  const handleAlarmClick = () => {
    if (alarmIconRef.current) {
      alarmIconRef.current.measure((fx, fy, width, height, px, py) => {
        setDropdownPosition({
          top: py - 5,
          left: px - 200 + width,
        });
        setIsNotiVisible(true);
      });
    }
  };
  const notiOptions = notificationData.map(noti => ({
    label: `${noti.content} (${noti.date})`,
    value: noti.id,
  }));

  return (
    <View style={styles.header}>
      {/* 왼쪽 영역 */}
      <View style={styles.left}>
        {/* 뒤로가기 버튼 */}
        {canGoBack && (
          <TouchableOpacity
            style={{
              marginRight: 8,
              padding: 4,
              width: 32,
              alignItems: 'center',
            }}
            onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              size={24}
              color="#004E89"
            />
          </TouchableOpacity>
        )}

        {/* 로고 */}
        <MaterialCommunityIcons name="flash" size={24} color="#004E89" />
        <Text style={styles.title}>Re:Charge</Text>
      </View>

      {/* 오른쪽 영역 */}
      <View style={styles.right}>
        <>
          {/*  공지사항 버튼  */}
          <IconButton
            type="notice"
            size={24}
            color="#585858ff"
            style={{marginRight: -2}}
            onPress={() =>
              navigation.navigate('Notice', {screen: 'NoticeMain'})
            }
          />
          {/* 알림 */}
          <View ref={alarmIconRef} collapsable={false}>
            <IconButton
              type="alarm"
              size={24}
              color="#585858ff"
              style={{marginRight: -2}}
              onPress={handleAlarmClick}
            />
            {notificationData.length > 0 && <View style={styles.redDot} />}
          </View>
          {/* 세팅 */}
          <IconButton
            type="setting"
            size={24}
            color="#585858ff"
            onPress={() =>
              navigation.navigate('Setting', {screen: 'SettingMain'})
            }
            style={{marginRight: -15}}
          />
        </>
      </View>

      <DropdownModalKSA
        visible={isNotVisible}
        onClose={() => setIsNotiVisible(false)}
        options={
          notiOptions.length > 0
            ? notiOptions
            : [{label: '새로운 알림이 없습니다.', value: null}]
        }
        selectedValue={null}
        onSelect={item => {
          if (item.value) {
            console.log('알림 클릭:', item.value);
            setIsNotiVisible(false);
          }
        }}
        top={dropDownPosition.top}
        left={dropDownPosition.left}
        width={220}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#004E89',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redDot: {
    position: 'absolute',
    right: 6,
    top: 21,
    width: 7,
    height: 7,
    borderRadius: 3,
    backgroundColor: '#f85757ff',
    zIndex: 1,
  },
});
