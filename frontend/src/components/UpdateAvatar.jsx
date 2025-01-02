import React, { useState } from "react";
import axios from "axios";

const UpdateAvatar = () => {
  const [newAvatarId, setNewAvatarId] = useState("");
  const [message, setMessage] = useState("");

  // Get the userId and token from localStorage
  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setNewAvatarId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newAvatarId) {
      setMessage("Avatar ID is required");
      return;
    }

    try {
      // Send the updated avatarId to the backend
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/metadata",
        { avatarId : newAvatarId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach the token for authorization
        }
      );

      setMessage(response.data.message);
      localStorage.setItem("avatarId", newAvatarId); // Update avatarId in localStorage
    } catch (error) {
      setMessage("Error updating avatar");
    }
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="newAvatarId"
          placeholder="New Avatar ID"
          value={newAvatarId}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Avatar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateAvatar;
