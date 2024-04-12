import React from 'react';

const BookingsView = ({ bookedProfiles, setBookedProfiles }) => {
  const handleCancelBooking = (profileId) => {
    const updatedBookedProfiles = bookedProfiles.filter(profile => profile.id !== profileId);
    setBookedProfiles(updatedBookedProfiles);
    localStorage.setItem('bookedProfiles', JSON.stringify(updatedBookedProfiles));
  };

  return (
    <div className="bookings-container">
      <h2>Booked Profiles</h2>
      {bookedProfiles.map(profile => (
        <div key={profile.id} className="booked-profile-item">
          <h4>{profile.name}</h4>
          <p>Rating: {profile.Rating}</p>
          <p>Experience: {profile.experience} years</p>
          <p>Skill: {profile.skill}</p>
          {profile.bookingDetails && (
            <div>
              <p>Date: {profile.bookingDetails.date}</p>
              <p>Time: {profile.bookingDetails.time}</p>
              <p>Location: {profile.bookingDetails.location}</p>
              <p>Payment Option: {profile.bookingDetails.paymentOption}</p>
            </div>
          )}
          <button onClick={() => handleCancelBooking(profile.id)}>Cancel Booking</button>
        </div>
      ))}
    </div>
  );
};

export default BookingsView;