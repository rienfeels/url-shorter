import { useState } from "react";
// import './App.css'

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
          user_id: 0,
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
        setLinks(data.links);
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
      <h1>URL Shortner</h1>

      <h2>Add a new Link</h2>
      <label htmlFor="longUrl">Long URL:</label>
      <input
        type="text"
        id="longUrl"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <button onClick={createLink}>Shorten URL</button>

      <h2>Retrieve Links</h2>
      <button onClick={getLinks}>Get Links</button>

      <h2>Links:</h2>
      <ul>
        {links.map((link) => (
          <li key={link.short_url}>{`${link.short_url}: ${link.long_url}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
