import React, { useState } from "react";
import { Button, TextField, Modal } from "@mui/material";
import axios from 'axios';

const SignupModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/signup', {
        username,
        email,
        password,
      });
      alert(response.data.message); // Handle success response
      onClose(); // Close the modal
    } catch (error) {
      alert(error.response.data.message); // Handle error response
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-content">
        <h2>Signup</h2>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          type="email"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          type="password"
        />
        <Button onClick={handleSignup} disabled={loading}>
          {loading ? "Signing Up..." : "Signup"}
        </Button>
      </div>
    </Modal>
  );
};



export default SignupModal;