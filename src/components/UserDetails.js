import React, { useState, useEffect } from 'react';
import './UserDetails.css'; // Import the CSS file
import { Link } from 'react-router-dom';


const UserDetails = ({ profilePhotoUrl, userDetails, onPhotoChange, onUserDetailsChange }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(userDetails.name);
  const [email, setEmail] = useState(userDetails.email);

  useEffect(() => {
    // Set the name and email when userDetails changes
    setName(userDetails.name);
    setEmail(userDetails.email);
  }, [userDetails]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // Update user details
    onUserDetailsChange({ name, email });
    // Save updated user details to localStorage
    localStorage.setItem('userDetails', JSON.stringify({ name, email }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // Update profile photo URL
      onPhotoChange(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleViewBookings = () => {
    window.location.href = '/bookings';
  };

  const handleLogout = () => {
    // Handle logout functionality
    console.log('Logout');
  };

  return (
    <div className="profile-card">
      {editing && (
        <div>
          <label htmlFor="profile-photo-upload" className="edit-profile-photo-button">
            Change Photo
          </label>
          <input
            id="profile-photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ display: 'none' }}
          />
        </div>
      )}
      <div>
        <img src={profilePhotoUrl} alt="Profile" className="profile-photo" />
      </div>
      <div className="profile-details">
        <label>Name: </label>
        {editing ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <span>{name}</span>
        )}
      </div>
      <div className="profile-details">
        <label>Email: </label>
        {editing ? (
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <span>{email}</span>
        )}
      </div>
      <div className="action-buttons">
        {editing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
      </div>
      <div className="action-buttons">
        {editing ? null : (
          <>
            <button onClick={handleViewBookings}>View Bookings</button>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDetails;