import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ReportItem from "../../components/admin/ReportItem";
import { sampleReports } from "../../components/admin/sampleReports";

export default function ReportPostsScreen() {
    const renderItem = ({ item }) => (
        <ReportItem
            report={item}
            onPressDetail={() => console.log("상세보기:", item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={sampleReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F9FAFB" }
});
