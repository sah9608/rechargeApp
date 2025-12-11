import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AdminScreen from '../../../screens/admin/AdminScreen';
import ReportPostsScreen from '../../../screens/admin/ReportPostsScreen';
import ReportCommentsScreen from '../../../screens/admin/ReportCommentsScreen';
import BoardDetailScreen from '../../../screens/board/BoardDetailScreen';
import Header from '../Header';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
    return (
        <Stack.Navigator>
            {/* 관리자 메인 화면 */}
            <Stack.Screen
                name="AdminMain"
                component={AdminScreen}

            />

            {/* 신고 게시글 리스트 */}
            <Stack.Screen
                name="ReportDetail"
                component={ReportPostsScreen}

            />

            {/* 신고 댓글 리스트 */}
            <Stack.Screen
                name="ReportCommentsDetail"
                component={ReportCommentsScreen}
            />

            {/* 게시판게시글 상세 */}
            <Stack.Screen
                name="BoardDetail"
                component={BoardDetailScreen}
            />

            {/* 뮤직게시글 상세 */}
            <Stack.Screen
                name="MusicDetail"
                component={BoardDetailScreen}
            />

            {/* 영화게시글 상세 */}
            <Stack.Screen
                name="MovieDetail"
                component={BoardDetailScreen}
            />

        </Stack.Navigator>
    );
}