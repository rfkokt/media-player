import axios from "axios";
const prod = window.location.hostname !== "localhost";
console.log("debug prod", prod);
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "974d47ffdf1d46e0b07180a780d2dc3d";
const redirectUri = prod
  ? "https://media-player-six.vercel.app/"
  : "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};

export default apiClient;
