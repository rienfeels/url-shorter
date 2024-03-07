import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddLink from "../../AddLink";
import GetLinks from "../../GetLinks";
import RegisterUser from "../../RegisterUser";
import LoginUser from "../../LoginUser";
import "./App.css";

const App = () => {
  const [longUrl, setLongUrl] = useState("");
  const [links, setLinks] = useState([]);

  const apiUrl = "http://127.0.0.1:8000";

  async function createLink() {
    const longUrl = document.getElementById("longUrl").value;

    try {
      const response = await fetch(`${apiUrl}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: longUrl,
          short_url: "",
          title: "",
          user_id: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Short URL created: ${apiUrl}/${data.short_url}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error creating link:", error.message);
    }
  }

  const getLinks = async () => {
    try {
      const response = await fetch(`${apiUrl}/read`);

      if (response.ok) {
        const data = await response.json();
        // Make sure data.links is an array before setting it
        if (Array.isArray(data.links)) {
          setLinks(data.links);
        } else {
          console.error("Invalid data format received from the server:", data);
        }
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error retrieving links:", error);
    }
  };

  return (
    <div>
      <h1>URL Shortener</h1>

      <nav className="nav_links">
        <ul>
          <li>
            <button>
              <Link to="/add-link">Add a new Link</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/get-links">Retrieve Links</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/register">Register</Link>
            </button>
          </li>
          <li>
            <button>
              <Link to="/login">Login</Link>
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        {/* Use App component for the root path */}
        <Route path="/" element={<Home />} />

        {/* Specify the appropriate component for each route */}
        <Route path="/add-link" element={<AddLink createLink={createLink} />} />
        <Route
          path="/get-links"
          element={<GetLinks getLinks={getLinks} links={links} />}
        />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </div>
  );
};

// Create a separate Home component
const Home = () => (
  <div>
    {/* Content for the home page */}
    <h2>Welcome to the Home Page!</h2>
  </div>
);

export default App;
