import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ReportPostsScreen from "./ReportPostsScreen";
import ReportCommentsScreen from "./ReportCommentsScreen";

const InnerTab = createMaterialTopTabNavigator();

export default function ReportManageScreen() {
    return (
        <InnerTab.Navigator>
            <InnerTab.Screen name="PostReport" component={ReportPostsScreen} options={{ title: "게시글" }} />
            <InnerTab.Screen name="CommentReport" component={ReportCommentsScreen} options={{ title: "댓글" }} />
        </InnerTab.Navigator>
    );
}
