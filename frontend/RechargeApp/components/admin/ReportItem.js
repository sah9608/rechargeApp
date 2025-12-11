import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ReportItem({ report, onPressDetail, onChangeStatus }) {
    const handleStatusChange = (newStatus) => {
        onChangeStatus(report.reportId, newStatus); // 상태 변경 호출
    };

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={onPressDetail}>
                <Text style={styles.reportText}>
                    신고자: {report.userId}, 신고받은 사람: {report.reportTargetUserId}
                </Text>
                <Text style={styles.reportText}>신고 이유: {report.reportReason}</Text>
                <Text style={styles.reportText}>처리 상태: {report.reportStatus}</Text>
            </TouchableOpacity>

            <View style={styles.statusButtons}>
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        report.reportStatus?.trim() === "삭제처리완료" && styles.activeStatus,
                    ]}
                    onPress={() => handleStatusChange("삭제처리완료")}
                >
                    <Text style={styles.statusText}>삭제처리완료</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        report.reportStatus?.trim() === "대기중" && styles.activeStatus,
                    ]}
                    onPress={() => handleStatusChange("대기중")}
                >
                    <Text style={styles.statusText}>대기중</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.statusButton,
                        report.reportStatus?.trim() === "이상없음처리" && styles.activeStatus,
                    ]}
                    onPress={() => handleStatusChange("이상없음처리")}
                >
                    <Text style={styles.statusText}>이상없음처리</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    reportText: {
        fontSize: 14,
        color: "#333",
    },
    statusButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    statusButton: {
        padding: 5,
        backgroundColor: "#ddd",
        borderRadius: 3,
    },
    activeStatus: {
        backgroundColor: "#2563EB",
    },
    statusText: {
        color: "#fff",
        fontSize: 12,
    },
});
