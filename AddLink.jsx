import React, { useState } from "react";

const AddLink = ({ createLink }) => {
  const [long_url, setLongUrl] = useState("");

  const handleCreateLink = async () => {
    try {
      const response = await createLink(long_url);

      if (response) {
        if (response.ok) {
          const data = await response.json();
          alert(`Short URL created: ${data.short_url}`);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.detail}`);
        }
      } else {
        console.error("Error creating link: Response is undefined");
      }
    } catch (error) {
      console.error("Error creating link:", error.message);
    }
  };

  return (
    <div>
      <h2>Add a new Link</h2>
      <label htmlFor="longUrl">
        Long URL:
        <input
          type="text"
          id="longUrl"
          placeholder="Enter long URL"
          value={long_url}
          onChange={(e) => setLongUrl(e.target.value)}
        />
      </label>
      <button onClick={handleCreateLink}>Shorten URL</button>
    </div>
  );
};

export default AddLink;
