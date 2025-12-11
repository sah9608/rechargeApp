import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import TextArea from '../../components/common/TextArea';

export default function TextAreaTest() {
  const [content, setContent] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>TextArea Test</Text>

      <TextArea
        value={content}
        onChangeText={setContent}
        placeholder="내용을 입력하세요..."
        maxLength={200}
      />

      <Text style={styles.label}>입력한 내용:</Text>
      <Text style={styles.output}>{content}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
  },
  output: {
    marginTop: 8,
    fontSize: 14,
    color: '#555',
  },
});
