import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SelectableButton from '../../components/common/SelectableButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RadioButtonTest() {
  const [gender, setGender] = useState('M');
  const [category, setCategory] = useState('cafe');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Radio Button Test</Text>

      {/* 성별 선택 (RadioGroup 없이 개별 버튼) */}
      <Text style={styles.label}>성별 선택</Text>
      
      <View style={styles.row}>
        <SelectableButton
          label="남성"
          selected={gender === 'M'}
          onPress={() => setGender('M')}
          style={{ marginRight: 10 }}
        />
        
        <SelectableButton
          label="여성"
          selected={gender === 'F'}
          onPress={() => setGender('F')}
        />
      </View>

      <Text style={styles.selectedText}>선택됨: {gender}</Text>

      {/* 카테고리 선택 (아이콘 포함) */}
      <Text style={[styles.label, { marginTop: 30 }]}>카테고리 선택 (아이콘 포함)</Text>

      <View style={styles.row}>
        <SelectableButton
          label="카페"
          icon={<MaterialCommunityIcons name="music-note" />}
          selected={category === 'cafe'}
          onPress={() => setCategory('cafe')}
          style={{ marginRight: 10 }}
        />

        <SelectableButton
          label="식당"
          icon={<Ionicons name="chatbubble-outline" />}
          selected={category === 'food'}
          onPress={() => setCategory('food')}
        />
      </View>

      <Text style={styles.selectedText}>선택됨: {category}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  selectedText: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },
  row: {
    flexDirection: 'row',
  },
});
