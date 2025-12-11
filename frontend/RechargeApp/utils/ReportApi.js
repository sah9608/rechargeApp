import api from './api';

// 1️⃣ 신고 목록 조회 (관리자용)
export const fetchReportList = async () => {
  try {
    const response = await api.get('/report/admin/list');
    return response.data; 
  } catch (error) {
    console.error("fetchReportList error:", error.response?.data || error.message);
    throw error;
  }
};

// 2️⃣ 신고 상태 변경 (관리자용)
export const updateReportStatus = async (reportId, reportStatus, updatedId) => {
  try {
    const response = await api.put('/report/admin/status', {
      reportId,
      reportStatus,
      updatedId
    });
    return response.data;
  } catch (error) {
    console.error("updateReportStatus error:", error.response?.data || error.message);
    throw error;
  }
};

// 3️⃣ 신고 등록 (사용자용)
export const submitReport = async (reportData) => {
  try {
    const response = await api.post('/report', reportData);
    return response.data;
  } catch (error) {
    console.error("submitReport error:", error.response?.data || error.message);
    throw error;
  }
};