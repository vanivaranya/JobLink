// import React, { useState } from 'react';

// const SignUp = () => {
//   const [userType, setUserType] = useState('seeker');
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [email, setEmail] = useState('');
//   const [location, setLocation] = useState('');
//   const [photo, setPhoto] = useState(null);
//   const [jobType, setJobType] = useState('');
//   const [experience, setExperience] = useState('');
//   const [age, setAge] = useState('');
//   const [message, setMessage] = useState('');
//   const [organizationType, setOrganizationType] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted!");
//   };

//   const handlePhotoChange = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   return (
//     <div className="signup-container">
//       <div className="left-section">
//         <h2>Sign Up as Job Seeker</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//           <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
//           <label>
//             Setup Profile Picture:
//             <input type="file" accept="image/*" onChange={handlePhotoChange} required />
//           </label>
//           <select value={jobType} onChange={(e) => setJobType(e.target.value)} required>
//             <option value="">Select Job Type</option>
//             <option value="Full-time">Full-time</option>
//             <option value="Part-time">Part-time</option>
//             <option value="Freelance">Freelance</option>
//           </select>
//           <input type="text" placeholder="Experience" value={experience} onChange={(e) => setExperience(e.target.value)} />
//           <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
//           <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//       <div className="right-section">
//         <h2>Sign Up as Job Giver</h2>
//         <form onSubmit={handleSubmit}>
//           <select value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} required>
//             <option value="">Select Organization Type</option>
//             <option value="individual">Individual</option>
//             <option value="organization">Organization</option>
//           </select>
//           <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//           <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
//           <label>
//             Setup Profile Picture:
//             <input type="file" accept="image/*" onChange={handlePhotoChange} required />
//           </label>
//           <button type="submit">Sign Up</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;


import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [selectedOption, setSelectedOption] = useState('job-seeker');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="sign-in-up-container">
      <button className="toggle-button" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Sign In' : 'Create an Account'}
      </button>
      {isSignUp && (
        <div className="options-container">
          <label>
            <input
              type="radio"
              name="option"
              value="job-seeker"
              checked={selectedOption === 'job-seeker'}
              onChange={handleOptionChange}
            />
            Job Seeker
          </label>
          <label>
            <input
              type="radio"
              name="option"
              value="job-giver"
              checked={selectedOption === 'job-giver'}
              onChange={handleOptionChange}
            />
            Job Giver
          </label>
        </div>
      )}
      <form onSubmit={handleSubmit} className={`form ${isSignUp ? 'sign-up' : 'sign-in'}`}>
        {isSignUp && (
          <>
            <div className="profile-picture-container">
              <label htmlFor="profile-picture">
                {profilePicture ? 'Change Profile Picture' : 'Set Up Profile Picture'}
              </label>
              <input
                type="file"
                id="profile-picture"
                accept="image/*"
                onChange={handleFileChange}
              />
              {profilePicture && (
                <img src={URL.createObjectURL(profilePicture)} alt="Profile" />
              )}
            </div>
            {selectedOption === 'job-seeker' && (
              <>
                <input type="text" placeholder="Name" required />
                <input type="text" placeholder="Location" required />
                <input type="text" placeholder="Job Type" required />
                <input type="number" placeholder="Experience" required />
              </>
            )}

              {selectedOption === 'job-giver' && (
              <>
              <input type="text" placeholder="Organization Type" required />
                <input type="text" placeholder="Name" required />
                <input type="text" placeholder="Location" required />
              </>
            )}

          </>
        )}
        <input type="email" placeholder="Email" required />
        <input type="tel" placeholder="Phone" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;