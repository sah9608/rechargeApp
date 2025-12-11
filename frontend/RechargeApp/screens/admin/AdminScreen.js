import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ReportPostsScreen from "./ReportPostsScreen";
import ReportCommentsScreen from "./ReportCommentsScreen";
import NoticeStack from "../../components/layout/notice/NoticeStack";

export default function AdminScreen() {
    const [mainTab, setMainTab] = useState("report"); // "report" or "notice"
    const [reportSubTab, setReportSubTab] = useState("post"); // "post" or "comment"

    return (
        <View style={{ flex: 1 }}>
            {/* 상단 메인 탭 */}
            <View style={styles.mainTabContainer}>
                <TouchableOpacity
                    style={[styles.mainTabButton, mainTab === "report" && styles.activeMainTab]}
                    onPress={() => setMainTab("report")}
                >
                    <Text style={styles.mainTabText}>신고자 관리</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.mainTabButton, mainTab === "notice" && styles.activeMainTab]}
                    onPress={() => setMainTab("notice")}
                >
                    <Text style={styles.mainTabText}>공지사항 관리</Text>
                </TouchableOpacity>
            </View>

            {/* 메인 탭 화면 */}
            {mainTab === "notice" && <NoticeStack />}
            {mainTab === "report" && (
                <View style={{ flex: 1 }}>
                    {/* 신고자 관리 하위 탭 */}
                    <View style={styles.subTabContainer}>
                        <TouchableOpacity
                            style={[styles.subTabButton, reportSubTab === "post" && styles.activeSubTab]}
                            onPress={() => setReportSubTab("post")}
                        >
                            <Text style={styles.subTabText}>게시글</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.subTabButton, reportSubTab === "comment" && styles.activeSubTab]}
                            onPress={() => setReportSubTab("comment")}
                        >
                            <Text style={styles.subTabText}>댓글</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 신고자 관리 화면 */}
                    {reportSubTab === "post" && <ReportPostsScreen />}
                    {reportSubTab === "comment" && <ReportCommentsScreen />}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    mainTabContainer: { flexDirection: "row", height: 50 },
    mainTabButton: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#EEE" },
    activeMainTab: { backgroundColor: "#004E89" },
    mainTabText: { color: "#000", fontWeight: "bold" },
    subTabContainer: { flexDirection: "row", height: 40 },
    subTabButton: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#DDD" },
    activeSubTab: { backgroundColor: "#2563EB" },
    subTabText: { color: "#000", fontWeight: "600" }
});
