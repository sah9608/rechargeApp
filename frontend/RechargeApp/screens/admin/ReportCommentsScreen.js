import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator, Alert, StyleSheet } from "react-native";
import ReportItem from "../../components/admin/ReportItem";
import { fetchReportList, updateReportStatus } from "../../api/ReportApi";

export default function ReportCommentsScreen({ navigation }) {
  // 임시 관리자
  const adminUser = {
    userId: "ADMIN001",
    role: "ADMIN",
    name: "관리자",
  };

  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const reportData = await fetchReportList();
      // 댓글 신고만 필터
      const commentReports = reportData.filter((report) =>
        report.reportTargetType.endsWith("comment")
      );
      setReports(commentReports);
    } catch (error) {
      console.error(error);
      Alert.alert("오류", "댓글 신고 목록을 가져오는 데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 신고 상세보기
  const handlePressDetail = (report) => {
    const { reportTargetType, postId, reportTargetId } = report;
    if (reportTargetType === "moviecomment") {
      navigation.navigate("MovieDetail", { postId, crollToCommentId: reportTargetId });
    } else if (reportTargetType === "musiccomment") {
      navigation.navigate("MusicDetail", { postId, crollToCommentId: reportTargetId });
    } else if (reportTargetType === "boardcomment") {
      navigation.navigate("BoardDetail", { postId, crollToCommentId: reportTargetId });
    }
  };

  // 신고 상태 변경
  const handleChangeStatus = async (reportId, newStatus) => {
    try {
      const adminId = adminUser.userId;
      const response = await updateReportStatus(reportId, newStatus, adminId);
      if (response.success) {
        // UI 즉시 반영
        setReports((prev) =>
          prev.map((report) =>
            report.reportId === reportId ? { ...report, reportStatus: newStatus } : report
          )
        );
        Alert.alert("성공", "상태가 변경되었습니다.");
      }
    } catch (error) {
      Alert.alert("오류", "상태 변경에 실패했습니다.");
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
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
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
