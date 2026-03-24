import React, { useState, useEffect } from "react";
import { Menu, X, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const Navbar = (props) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Jobs", path: "/jobs" },
    { name: "Companies", path: "/companies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      localStorage.removeItem("jobify_access_token", data.access_token);
      Cookies.remove("jobify_refresh_token");
      if (data.success) {
        toast.success("User Logout Successfull");
      }
      props.setLogin(false);
    } catch (err) {
      toast.error("Logout Request failed");
      console.error("Logout Request failed", err);
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        isScrolled ? "top-4" : "top-6"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto transition-all duration-300 rounded-full ${
          isScrolled
            ? "bg-white/70 backdrop-blur-lg shadow-lg py-3 px-6"
            : "bg-transparent py-3 px-4"
        }`}
      >
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-secondary transition-colors">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-text-primary tracking-tight">
              Jobify
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-text-secondary hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!props.login ? (
              <>
                <Link to="/login">
                  <button className="px-5 py-2.5 text-primary font-semibold border-2 border-primary rounded-full hover:bg-light-blue transition-colors">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-5 py-2.5 bg-primary text-white font-semibold rounded-full hover:bg-secondary shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5">
                    Sign Up
                  </button>
                </Link>
              </>
            ) : (
              <button
                className="px-5 py-2.5 text-primary font-semibold border-2 border-primary rounded-full hover:bg-light-blue transition-colors"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-4 flex flex-col space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-primary hover:bg-light-blue rounded-md"
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col space-y-3 border-t border-gray-100">
            <Link to="/login">
              <button className="w-full px-5 py-2.5 text-primary font-semibold border-2 border-primary rounded-lg">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="w-full px-5 py-2.5 bg-primary text-white font-semibold rounded-lg shadow-md">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
