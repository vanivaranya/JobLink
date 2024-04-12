// import React, { useState } from 'react';
// import SignUp from './SignUp';
// import './SignUp.css'

// const Authentication = () => {
//   const [isSignUp, setIsSignUp] = useState(false);

//   const handleSignUpClick = () => {
//     setIsSignUp(true);
//   };

//   const handleSignInClick = () => {
//     setIsSignUp(false);
//   };

//   const handleSignInSubmit = (e) => {
//     e.preventDefault();
//     console.log("Sign In Submitted!");
//   };

//   return (
//     <div className="authentication-container">
//       {!isSignUp ? (
//         <div className="signin-container">
//           <h2>Sign In</h2>
//           <form onSubmit={handleSignInSubmit}>

//             <button onClick={handleSignUpClick}>Create an Account</button>

//             <input type="text" placeholder="Email" />
//             <input type="number" placeholder="Phone" />
//             <input type="password" placeholder="Password" />
//             <button type="submit">Sign In</button>
//           </form>
//         </div>
//       ) : (
//         <SignUp />
//       )}
//     </div>
//   );
// };

// export default Authentication;

// import React, { useState } from 'react';

// function SignInForm() {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Handle form submission here
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label htmlFor="email">Email:</label>
//       <input
//         type="email"
//         id="email"
//         value={email}
//         onChange={(event) => setEmail(event.target.value)}
//       />
//       <label htmlFor="phone">Phone:</label>
//       <input
//         type="tel"
//         id="phone"
//         value={phone}
//         onChange={(event) => setPhone(event.target.value)}
//       />
//       <label htmlFor="password">Password:</label>
//       <input
//         type="password"
//         id="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//       />
//       <button type="submit">Sign In</button>
//     </form>
//   );
// }

// export default SignInForm;