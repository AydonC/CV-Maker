import React, { useState } from 'react';

const ProfilePic = () => {
  const [image, setImage] = useState(null); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the upload logic here (e.g., sending the image to a server)
    console.log('Profile picture uploaded');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="profilePicture">Upload Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>

      {image && (
        <div>
          <h3>Image Preview:</h3>
          <img
            src={image}
            alt="Profile preview"
            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
          />
        </div>
      )}

     
    </form>
  );
};

export default ProfilePic;
