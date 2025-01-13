import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/files";

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(API_BASE_URL, formData);
};

export const getFiles = async () => {
  return axios.get(API_BASE_URL);
};

export const downloadFile = async (id: number) => {
  return axios.get(`${API_BASE_URL}/${id}`, { responseType: "blob" });
};