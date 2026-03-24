import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ProfileCreate from "./pages/ProfileCreate";
import ProfileEdit from "./pages/ProfileEdit";
import Profile from './pages/Profile'
import ProfileView from "./pages/ProfileView";
function App() {
  const [login, setLogin] = useState(false);
  const makeLoginRequest = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "jobify_access_token"
          )}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setLogin(true);
        toast.success("User Login Successfull");
      } else {
        localStorage.removeItem("jobify_access_token");
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("jobify_access_token");
    }
  };
  const makeRefreshRequest = async () => {
    try {
      const response = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("jobify_access_token", data.access_token);
        makeLoginRequest();
      }
    } catch (err) {
      toast.error("Login Request failed");
      console.error("Login Request failed", err);
    }
  };
  useEffect(() => {
    const access_token = localStorage.getItem("jobify_access_token");
    if (!access_token || jwtDecode(access_token).exp <= Date.now() / 1000) {
      makeRefreshRequest();
    } else {
      makeLoginRequest();
    }
  }, []);
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans text-text-primary">
        <Navbar login={login} setLogin={setLogin} />
        <Toaster position="top-center" reverseOrder={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={<Login login={login} setLogin={setLogin} />}
            />
            <Route path="/signup" element={<Register />} />
            <Route path="/profile/create" element={<ProfileCreate />} />
            <Route path="/profile/update/" element={<ProfileEdit />} />
            <Route path="/profile/view" element={<ProfileView />} />
            <Route path="/profiles" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
