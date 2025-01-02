import axios from "axios";

// Get token from localStorage (only on the client-side)
const token = localStorage.getItem("token");

if (token) {
  axios.post("http://localhost:3000/protected-endpoint", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
  .then(response => {
    console.log("Protected data received:", response.data);
  })
  .catch(error => {
    console.log("Error:", error);
  });
}
