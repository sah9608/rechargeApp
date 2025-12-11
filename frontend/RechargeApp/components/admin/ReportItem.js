import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function ReportItem({ report, onPressDetail, onChangeStatus }) {
    return (
        <View style={styles.card}>
            {/* 상단: 게시판명 */}
            <Text style={styles.boardName}>📌 {report.boardName}</Text>

            {/* 제목 */}
            <TouchableOpacity onPress={onPressDetail}>
                <Text style={styles.title} numberOfLines={1}>
                    {report.title}
                </Text>
            </TouchableOpacity>

            {/* 신고 정보 */}
            <View style={styles.infoRow}>
                <Text style={styles.label}>신고 사유</Text>
                <Text style={styles.value}>{report.reason}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>신고자</Text>
                <Text style={styles.value}>{report.reporter}</Text>
            </View>

            <View style={styles.infoRow}>
                <Text style={styles.label}>피신고자</Text>
                <Text style={styles.value}>{report.target}</Text>
            </View>

            {/* 상태 */}
            <View style={styles.statusRow}>
                <Text style={styles.label}>현재 상태</Text>
                <Text style={styles.statusValue}>{report.status}</Text>
            </View>

            {/* 상태 변경 버튼 영역 (항상 보이게) */}
            <View style={styles.statusOptions}>
                <TouchableOpacity
                    style={styles.statusOptionButton}

                >
                    <Text>미처리</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.statusOptionButton}

                >
                    <Text>이상없음</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.statusOptionButton}

                >
                    <Text>글삭제</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#eee",
        elevation: 2
    },
    boardName: {
        fontSize: 13,
        fontWeight: "600",
        color: "#2563EB",
        marginBottom: 6
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
        marginBottom: 10
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    label: {
        fontSize: 14,
        color: "#555",
        width: 90
    },
    value: {
        flex: 1,
        fontSize: 14,
        color: "#222"
    },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: "#eee",
        paddingTop: 10
    },
    statusValue: {
        fontSize: 14,
        color: "#111",
        flex: 1
    },
    statusOptions: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    statusOptionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: "#F3F4F6",
        borderRadius: 8
    }
});
