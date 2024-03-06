import React from "react";

const GetLinks = ({ getLinks, links }) => {
  const handleGetLinks = async () => {
    try {
      const response = await getLinks();

      if (response.ok) {
        const data = await response.json();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.detail}`);
      }
    } catch (error) {
      console.error("Error retrieving links:", error.message);
    }
  };

  return (
    <div>
      <h2>Retrieve Links</h2>
      <button onClick={handleGetLinks}>Get Links</button>

      <h2>Links:</h2>
      <ul>
        {links.map((link) => (
          <li key={link.short_url}>{`${link.short_url}: ${link.long_url}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetLinks;
