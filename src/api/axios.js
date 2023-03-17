import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "cd3e5bfb8329877422c30a7d294c4f95",
    language: "ko-KR"
  }
});

export default instance;