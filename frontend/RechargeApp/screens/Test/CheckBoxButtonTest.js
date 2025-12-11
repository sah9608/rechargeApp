import React,{useState} from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import SelectableButton from "../../components/common/SelectableButton";

function CheckBoxButtonTest(){

    const [hobbies, setHobbies] = useState({
        movie: false,
        music: false,
        game: false,
    });

    const toggle = (key) => {
        setHobbies(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return(
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>CheckBox (Multi Select) Test</Text>

      <Text style={styles.label}>취미 선택 (여러 개 선택 가능)</Text>

      <View style={styles.list}>
        <SelectableButton
          label="영화"
          selected={hobbies.movie}
          onPress={() => toggle('movie')}
        />

        <SelectableButton
          label="음악"
          selected={hobbies.music}
          onPress={() => toggle('music')}
        />

        <SelectableButton
          label="게임"
          selected={hobbies.game}
          onPress={() => toggle('game')}
        />
      </View>

      <Text style={styles.selectedText}>
        선택됨:{' '}
        {Object.keys(hobbies)
          .filter(key => hobbies[key])
          .join(', ') || '없음'}
      </Text>
    </ScrollView>
  );
}

export default CheckBoxButtonTest;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  list: {
    flexDirection: 'column',
    gap: 12,
  },
  selectedText: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
  },
});