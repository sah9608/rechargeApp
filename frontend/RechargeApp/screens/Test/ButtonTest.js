// screens/ButtonTest.js
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button from "../../components/common/Button"; // 경로 맞춰서 변경해줘!

const ButtonTest = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Button Test Screen</Text>

      <Text style={styles.label}>submit</Text>
      <Button type="submit" text="Submit" onPress={() => alert("Submit")} />

      <Text style={styles.label}>add</Text>
      <Button type="add" text="Add" onPress={() => alert("Add")} />

      <Text style={styles.label}>edit</Text>
      <Button type="edit" text="Edit" onPress={() => alert("Edit")} />

      <Text style={styles.label}>moving</Text>
      <Button type="moving" text="Moving" onPress={() => alert("Moving")} />

      <Text style={styles.label}>delete</Text>
      <Button type="delete" text="Delete" onPress={() => alert("Delete")} />

      <Text style={styles.label}>cancel</Text>
      <Button type="cancel" text="취소" onPress={() => alert("Cancel")} width={100} height={30} />

      <Text style={styles.label}>more</Text>
      <Button type="more" text="More" onPress={() => alert("More")}  />

      <Text style={styles.label}>Disabled</Text>
      <Button type="submit" text="Disabled" disabled={true} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  label: {
    marginTop: 20,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
});

export default ButtonTest;
