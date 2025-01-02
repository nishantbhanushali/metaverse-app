import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import UpdateAvatar from "./components/UpdateAvatar";


const App = () => {
  return (
    <Router>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/signup" style={styles.link}>Sign Up</Link>
        {" | "}
        <Link to="/signin" style={styles.link}>Sign In</Link>
      </div>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/avatar" element={<UpdateAvatar />}></Route>
      </Routes>
    </Router>
  );
};

const styles = {
  link: { margin: "0 10px", textDecoration: "none", color: "#007bff" },
};

export default App;
