import React, { useState } from "react";
import axios from "axios";

const UpdateAvatar = () => {
  const [newAvatarId, setNewAvatarId] = useState("");
  const [message, setMessage] = useState("");

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Array of circle types with their IDs and colors
  const circleTypes = [
    { id: "circle1", color: "red" },
    { id: "circle2", color: "blue" },
    { id: "circle3", color: "green" },
    { id: "circle4", color: "yellow" },
    { id: "circle5", color: "purple" },
  ];

  const handleCircleClick = (id) => {
    setNewAvatarId(id); // Update the input box with the clicked circle's ID
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
        { avatarId: newAvatarId },
        {
          headers: { Authorization: `Bearer ${token}` }, // Attach the token for authorization
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error updating avatar");
    }
  };

  return (
    <div>
      <h2>Update Avatar</h2>
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        {circleTypes.map((circle) => (
          <div
            key={circle.id}
            onClick={() => handleCircleClick(circle.id)}
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              backgroundColor: circle.color,
              position: "relative",
              cursor: "pointer",
              border: newAvatarId === circle.id ? "3px solid black" : "none",
            }}
          >
            {/* Left Eye */}
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "20px",
                left: "20px",
              }}
            ></div>
            {/* Right Eye */}
            <div
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "20px",
                right: "20px",
              }}
            ></div>
            {/* Smile (Mouth) */}
            <div
              style={{
                width: "30px",
                height: "15px",
                borderRadius: "50%",
                backgroundColor: "white",
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                borderTop: "3px solid black", // Smile effect
              }}
            ></div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="newAvatarId"
          placeholder="New Avatar ID"
          value={newAvatarId}
          readOnly // Make it read-only as the value comes from circle selection
        />

        <button type="submit">Update Avatar</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateAvatar;
