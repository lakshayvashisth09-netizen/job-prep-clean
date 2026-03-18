import axios from "axios";

const api = axios.create({
  baseURL: "https://job-preparation-web-application.onrender.com/api",
  withCredentials: true,
});

/**
 * 🔥 GENERATE INTERVIEW REPORT
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription || "");
    formData.append("selfDescription", selfDescription || "");
    formData.append("resume", resumeFile);

    // FIX: Yahan se "/api" hata diya, sirf "/interview" rakha
    const response = await api.post("/interview", formData); 
    return response.data;
  } catch (error) {
    console.error("❌ INTERVIEW API ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GET REPORT BY ID
 */
export const getInterviewReportById = async (interviewId) => {
  try {
    // FIX: Yahan bhi sirf "/interview/report/..."
    const response = await api.get(`/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    console.error("❌ GET REPORT ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GET ALL REPORTS
 */
export const getAllInterviewReports = async () => {
  try {
    // FIX: Sirf "/interview"
    const response = await api.get("/interview");
    return response.data;
  } catch (error) {
    console.error("❌ GET ALL ERROR:", error);
    throw error;
  }
};

/**
 * 🔥 GENERATE RESUME PDF
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  try {
    // FIX: Sirf "/interview/resume/..."
    const response = await api.post(
      `/interview/resume/pdf/${interviewReportId}`,
      null,
      { responseType: "blob" }
    );
    return response.data;
  } catch (error) {
    console.error("❌ PDF ERROR:", error);
    throw error;
  }
};