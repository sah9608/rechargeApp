import axios from "axios";

const BASE_URL = "http://10.0.2.2:18090";

// === Axios 인터셉터 추가 ===
// 요청 전
axios.interceptors.request.use(request => {
    console.log("Axios Request:", {
        url: request.url,
        method: request.method,
        headers: request.headers,
        data: request.data,
    });
    return request;
}, error => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
});

// 응답 후
axios.interceptors.response.use(response => {
    console.log("Axios Response:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
    });
    return response;
}, error => {
    if (error.response) {
        console.error("Axios Response Error:", {
            url: error.config.url,
            status: error.response.status,
            data: error.response.data,
        });
    } else {
        console.error("Axios Network/Error:", error.message);
    }
    return Promise.reject(error);
});

// === API 함수들 ===
export const getNotices = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/notice/list`);
        return res.data.map(n => ({
            id: n.noticeId,
            title: n.noticeTitle,
            content: n.noticeContent,
            userId: n.userId,
            viewCount: n.noticeViewCount,
            createDate: n.createDate,
            createId: n.createId,
            updatedDate: n.updatedDate,
            updatedId: n.updatedId
        }));
    } catch (err) {
        console.error(err);
        return [];
    }
};

export const getNoticeDetail = async (noticeId) => {
    const res = await axios.get(`${BASE_URL}/notice/${noticeId}`);
    return res.data;
};

export const insertNotice = async (notice) => {
    return await axios.post(`${BASE_URL}/notice/insertNotice`, notice);
};

export const editNotice = async (notice) => {
    return await axios.put(`${BASE_URL}/notice/edit`, notice);
};

export const deleteNotice = async (noticeId) => {
    return await axios.delete(`${BASE_URL}/notice/delete/${noticeId}`);
};

export const incrementNoticeViewCount = async (noticeId) => {
    try {
        const res = await axios.post(`${BASE_URL}/notice/${noticeId}/view`);
        return res.data;

    } catch (err) {
        console.error(" 조회수 증가 실패", err);
        throw err;
    }
}