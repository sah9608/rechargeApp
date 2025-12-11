import React, { useState, useEffect } from "react";
import { View, FlatList, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import { fetchReportList, updateReportStatus } from "../../api/ReportApi"; // 백엔드 API 호출
import ReportItem from "../../components/admin/ReportItem"; // 신고 항목 컴포넌트

export default function ReportPostsScreen() {

    //임시관리자
    const adminUser = {
        userId: "ADMIN001",
        role: "ADMIN",
        name: "관리자"
    };

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);  // 로딩 상태 추가

    useEffect(() => {
        // 신고 데이터 가져오기
        fetchReports();
    }, []);

    const fetchReports = async () => {
        setLoading(true);  // 로딩 시작
        try {
            console.log("fetchReportList function:", fetchReportList);
            const reportData = await fetchReportList();  // 게시글 신고 목록 요청
            const postReports = reportData.filter(report => report.reportTargetType.endsWith("post"));
            console.log("Reports:", reportData); // 받아온 데이터 확인
            setReports(postReports);  // 게시글 신고 데이터 상태에 저장
        } catch (error) {
            console.error("fetchReports error:", error);
            Alert.alert("오류", "신고 목록을 가져오는 데 실패했습니다.");
        } finally {
            setLoading(false);  // 로딩 종료
        }
    };

    const handlePressDetail = (report) => {
        // 게시글 종류에 따른 상세 페이지로 이동
        if (report.reportTargetType === "moviepost") {
            navigation.navigate("MovieDetail", { postId: report.reportTargetId });
        } else if (report.reportTargetType === "musicpost") {
            navigation.navigate("MusicDetail", { postId: report.reportTargetId });
        } else if (report.reportTargetType === "boardpost") {
            navigation.navigate("BoardDetail", { postId: report.reportTargetId });
        }
    };

    const handleChangeStatus = async (reportId, newStatus) => {
        try {
            const adminId = adminUser.userId;
            const response = await updateReportStatus(reportId, newStatus, adminId); // 상태 변경 API 호출
            if (response.success) {

                // 1. UI에서 바로 상태 업데이트

                setReports(prev =>
                    prev.map(report =>
                        report.reportId === reportId
                            ? { ...report, reportStatus: newStatus }
                            : report
                    )
                );
                Alert.alert("성공", "처리 상태가 변경되었습니다.");
            }
        } catch (error) {
            Alert.alert("오류", "처리 상태를 변경하는 데 실패했습니다.");
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={reports}
                keyExtractor={(item) => item.reportId.toString()}
                renderItem={({ item }) => (
                    <ReportItem
                        report={item}
                        onPressDetail={() => handlePressDetail(item)}
                        onChangeStatus={handleChangeStatus}
                    />
                )}
            />

            {loading && (
                <View style={styles.loadingOverlay} >
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    loadingOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
    },
});