// import React from 'react'
// import "./navbar.css";

// const NavBar = () => {
//     return (
//         <>
//             <nav className="main-nav">
//                 <div className="logo">
//                     <h2>
//                         <span>J</span>ob
//                         <span>L</span>ink
//                     </h2>
//                 </div>

//                 <div className="menu-link">
//                     <ul>
//                         <li>
//                             <a href="/">Home</a>
//                         </li>
//                         {/* <li>
//                             <a href="/about">About</a>
//                         </li>  */}
//                         <li>
//                             <a href="/search">Find Job</a>
//                         </li>
//                         <li>
//                             <a href="/search">Book Service</a>
//                         </li>
//                         <li>
//                             <a href="/search">Skill Training</a>
//                         </li>
                        
//                         <li>
//                             <a href="/contact">Contact</a>
//                         </li>
                        // <li>
                        //     <a href="/SignUp">Sign in/up</a>
                        // </li>
//                     </ul>
//                 </div>
                
//                 <div className="profile">
//                     <ul><li><a href="#"><img src={require('./girlprofile.png')} /></a></li></ul>
//                 </div>


//             </nav>

//         </>
//     )
// }

// export default NavBar;


import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const NavBar = ({ profilePhoto }) => {
    return (
        <nav className="main-nav">
            <div className="logo">
                <h2>
                    <span>J</span>ob
                    <span>L</span>ink
                </h2>
            </div>

            <div className="menu-link">
                <ul>
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>

                    <li>
                        <a href="/FindJob">Find Job</a>
                    </li>

                    <li>
                        <a href="/Search">Book Service</a>
                    </li>

                    <li>
                        <a href="/SkillTraining">Skill Training</a>
                    </li>
                    
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                    <li>
                        <a href="/SignUp">Sign in/up</a>
                    </li>
                </ul>
            </div>
            
            <div className="profile">
                <ul>
                    <li>
                        <Link to="/user">
                            <img src={profilePhoto} alt="Profile" />
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;