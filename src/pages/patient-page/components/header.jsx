import React, { useState } from "react";
import '../patient-profile.css'
import DiaLogo from "../../../components/logo/logo";
import ClientLogo from '../../../assets/ccmdkc-logo.png'
import Head2 from "../../../components/headers/header";
import Profile from '../../../assets/Patients_icon.svg'
import { Link } from "react-router-dom";
import User from '../../../assets/user.svg'
import Password from '../../../assets/changepassword.svg'
import Logout from '../../../assets/logout.svg'
import { useEffect } from "react";
import axios from "axios";

export default function PtnHeader() {
    
    const [open, setOpen] = useState(false)

    const [userId, setUserId] = useState(null);

    useEffect(() => {
     
      const storedUserId = localStorage.getItem("userId");
  
      
      setUserId(storedUserId);
  
      
      if (storedUserId) {
        axios
          .get(`http://localhost:5000/api/user/${storedUserId}`)
          .then((response) => {
            
            console.log(response.data);
          })
          .catch((error) => console.error(error));
      }
    }, []);

    return(
        <>
             <header className="ptnheader">
                <div className="profile-header-ptn">
                    <div className="logo-sidebar-ptn">
                        <div id="logo-box-sidebar-ptn">
                        <DiaLogo src={ClientLogo}/>
                        <Head2 text="CCMDKC"/>
                        </div>
                    </div>

                    <div className="profile-menu-ptn">
                        <div className="menu-trigger-ptn"
                        onClick={()=>{setOpen(!open)}}>
                        <img src={Profile} 
                        alt="Profile" 
                        id="menu-img-ptn"/>
                        {/* <h3 id="name-menu">Name</h3> */}
                        </div>

                        <div className={`dropdown-menu-ptn ${open ? 'active' : 'inactive'}`}
                        id="drop-label-ptn">
                        <p>Patient</p>

                            <div className="drop-links-ptn">
                            <ul>
                            <Link to={`/patient/myprofile/${userId}`}><PatientMenu img={User}/>My Profile</Link>
                            {/* <Link to={`/patient/changepassword/${userId}`}><PatientMenu img={Password}/>Change Password</Link> */}
                            <Link to='/'><PatientMenu img={Logout}/>Logout</Link>
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}


function PatientMenu(props) {
    return (
        <div className="dropdownItem">
            <img src={props.img}/>
        </div>
    );
}