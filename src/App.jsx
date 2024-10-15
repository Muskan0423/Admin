import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Authentication/Login_Screen/Login";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import Home from "./UI/Home";
import Register from "./Pages/Authentication/Register/Register";

function App() {
  const theme = createTheme({
    palette: {
      themeColor: {
        main: '#c93a0e',
      },
    },
  });
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
<ToastContainer />
        <Router>
          {/* top-header */}
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="/home/*" element={<Home />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
