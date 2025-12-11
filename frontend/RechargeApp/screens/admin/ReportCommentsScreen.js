import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import ReportItem from "../../components/admin/ReportItem";

export default function ReportCommentsScreen({ navigation }) {
    const sampleReports = [
        { id: 101, boardName: "자유게시판", title: "댓글 부적절", reason: "부적절", reporter: "user3", target: "badCommenter", status: "미처리" },
        { id: 102, boardName: "음악게시판", title: "광고 댓글", reason: "광고글", reporter: "user4", target: "spamCommentUser", status: "미처리" },
    ];

    return (
        <View style={styles.container}>
            <FlatList
                data={sampleReports}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ReportItem
                        report={item}
                        onPressDetail={() => navigation.navigate("CommentDetail", { commentId: item.id })}
                        onChangeStatus={(report) => navigation.navigate("ReportStatusModal", { report })}
                    />
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: "#F3F4F6" } });
