import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './profilesview.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Profiles from './profilesapi';

const Popup = ({ profile, onClose, onBookNow }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>{profile.name}</h2>
        <p>Phone: {profile.phone}</p>
        <p>Email: {profile.email}</p>
        <p>Gender: {profile.gender}</p>
        <p>Skill: {profile.skill}</p>
        <p>Location: {profile.location}</p>
        <p>Rating: {profile.Rating}</p>
        <p>Age: {profile.age}</p>
        <p>Experience: {profile.experience} years</p>
        <button className="book-now-btn" onClick={onBookNow}>Book Now</button>
      </div>
    </div>
  );
};

const BookingForm = ({ profile, onClose, onConfirm }) => {
  const [myLocation, setMyLocation] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeChange = time => {
    setSelectedTime(time);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleLocationChange = (e) => {
    setMyLocation(e.target.value);
  };

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleConfirm = () => {
    // Pass the booking details to the parent component for confirmation
    onConfirm({ location: myLocation, paymentOption, date: selectedDate, time: selectedTime });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={onClose}>Close</button>
        <h2>Booking for: {profile.name}</h2>
        <label>
          Select Date:
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy" // Specify the date format here
          />
        </label>
        <label>
          Select Time:
          <DatePicker
            selected={selectedTime}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            timeFormat="HH:mm"
          />
        </label>
        <label>
          Payment Option:
          <select value={paymentOption} onChange={handlePaymentOptionChange}>
            <option value="">Select Payment Option</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="Cash">Cash</option>
          </select>
        </label>
        <button className="confirm-btn" onClick={handleConfirm}>Confirm Booking</button>
      </div>
    </div>
  );
};

const ProfilesView = ({ bookedProfiles, setBookedProfiles }) => {
  const [minExperience, setMinExperience] = useState(0);
  const [minRating, setMinRating] = useState(0);
  const [location, setLocation] = useState('');
  const [uniqueLocations, setUniqueLocations] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    const uniqueLocationsArray = Array.from(new Set(Profiles.map(profile => profile.location)));
    setUniqueLocations(uniqueLocationsArray);
  }, []);
  
  useEffect(() => {
    localStorage.setItem('bookedProfiles', JSON.stringify(bookedProfiles));
  }, [bookedProfiles]);

  const filteredProfiles = Profiles.filter(profile =>
    profile.skill &&
    profile.skill.toLowerCase() === category.toLowerCase() &&
    profile.experience >= minExperience &&
    profile.Rating >= minRating &&
    (location === '' || profile.location.toLowerCase() === location.toLowerCase())
  );

  const handleLearnMore = (profile) => {
    setSelectedProfile(profile);
    setShowBookingForm(false);
  };

  const handleClosePopup = () => {
    setSelectedProfile(null);
  };

  const handleShowBookingForm = () => {
    setShowBookingForm(true);
  };

  const handleConfirmBooking = ({ location, paymentOption, date, time }) => {
    if (bookedProfiles.find(profile => profile.id === selectedProfile.id)) {
      alert('This profile is already booked!');
      return;
    }
  
    alert('Booking confirmed!');
    
    const updatedBookedProfiles = [...bookedProfiles, { ...selectedProfile, bookingDetails: { location, paymentOption, date, time } }];
    setBookedProfiles(updatedBookedProfiles);
    setSelectedProfile(null);
    setShowBookingForm(false);
  
    localStorage.setItem('bookedProfiles', JSON.stringify(updatedBookedProfiles));
  };

  return (
    <>
      <h2 className='headingskill'>Profiles with Skill: {category}</h2>
      <div className="filter-pane">
        <label>
          Min Experience:
          <input
            type="number"
            value={minExperience}
            onChange={(e) => setMinExperience(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Min Rating:
          <input
            type="number"
            value={minRating}
            onChange={(e) => setMinRating(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Location:
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {uniqueLocations.map((loc, index) => (
              <option key={index} value={loc}>{loc}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="profile-container">
        {filteredProfiles.map(profile => (
          <div key={profile.id} className="profile-item">
            <h4>{profile.name}</h4>
            <p>Rating: {profile.Rating}</p>
            <p>Experience: {profile.experience} years</p>
            <p>Location: {profile.location}</p>
            <button onClick={() => handleLearnMore(profile)}>Learn More</button>
          </div>
        ))}
      </div>
      {selectedProfile && !showBookingForm && (
        <Popup profile={selectedProfile} onClose={handleClosePopup} onBookNow={handleShowBookingForm} />
      )}
      {selectedProfile && showBookingForm && (
        <BookingForm profile={selectedProfile} onClose={handleClosePopup} onConfirm={handleConfirmBooking} />
      )}
    </>
  );
};

export default ProfilesView;