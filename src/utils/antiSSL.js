// utils/axiosWithAgent.js
const axios = require("axios");
const https = require("https");

const agent = new https.Agent({
  rejectUnauthorized: false, // Bỏ qua kiểm tra chứng chỉ SSL
});

export const a = axios.create({
  httpsAgent: agent,
});
