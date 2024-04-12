import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/Navbar';
import Banner from './components/Banner';
import Search from './components/Search';
import ProfilesView from './components/ProfilesView';
import UserDetails from './components/UserDetails';
import girlProfile from './components/girlprofile.png'; 
import './App.css';
import SignUp from './components/SignUp';
import FindJob from './components/FindJob';
import SkillTraining from './components/SkillTraining';
import BookingsView from './components/BookingsView';


function App() {
  const [predictedCategory, setPredictedCategory] = useState('');
  const [profilePhotoUrl, setProfilePhotoUrl] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [bookedProfiles, setBookedProfiles] = useState([]);

  useEffect(() => {
    // Load profile data from localStorage on component mount
    const storedProfilePhotoUrl = localStorage.getItem('profilePhotoUrl');
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));

    if (storedProfilePhotoUrl) {
      setProfilePhotoUrl(storedProfilePhotoUrl);
    } else {
      setProfilePhotoUrl(girlProfile); // Default profile photo
    }

    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    } else {
      setUserDetails({ name: 'John Doe', email: 'john@example.com' }); // Default user details
    }

    // Retrieve booked profiles from localStorage
    const storedBookedProfiles = JSON.parse(localStorage.getItem('bookedProfiles')) || [];
    setBookedProfiles(storedBookedProfiles);
  }, []);

  const handlePredict = (category) => {
    setPredictedCategory(category);
  };

  const handlePhotoChange = (newPhotoUrl) => {
    setProfilePhotoUrl(newPhotoUrl);
    // Save updated profile photo URL to localStorage
    localStorage.setItem('profilePhotoUrl', newPhotoUrl);
  };

  const handleUserDetailsChange = (newDetails) => {
    setUserDetails(newDetails);
    // Save updated user details to localStorage
    localStorage.setItem('userDetails', JSON.stringify(newDetails));
  };
  
  return (
    <>
        <NavBar profilePhoto={profilePhotoUrl} />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route
          path="/search"
          element={<Search placeholder="Type your problem" handlePredict={handlePredict} />}
        />
        <Route
          path="/profiles/:category"
          element={<ProfilesView bookedProfiles={bookedProfiles} setBookedProfiles={setBookedProfiles} />}
        />
        <Route path="/bookings" element={<BookingsView bookedProfiles={bookedProfiles} setBookedProfiles={setBookedProfiles} />} />
        <Route
          path="/user"
          element={<UserDetails 
                     profilePhotoUrl={profilePhotoUrl} 
                     userDetails={userDetails} 
                     onPhotoChange={handlePhotoChange} 
                     onUserDetailsChange={handleUserDetailsChange} 
                  />} 
        />

        <Route
          path="/SignUp"
          element={<SignUp />}
        />
        
        <Route
          path="/FindJob"
          element={<FindJob />}
        />

        <Route
          path="/SkillTraining"
          element={<SkillTraining />}
        />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </>
  );
}

export default App;