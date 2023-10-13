import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdSpaceDashboard, MdMedicalServices, MdAnnouncement } from "react-icons/md";
import axios from "axios";

export default function PtnSidebar() {
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

  return (
    <>
      <div className="sidenav">
        <ul>
          <Link to={`/patient/${userId}`} className="link-div">
            <MdSpaceDashboard className="sidebar-icon" />&nbsp;Dashboard
          </Link>

          <Link to={`/appointment/${userId}`} className="link-div">
            <MdMedicalServices className="sidebar-icon" />&nbsp;Appointment
          </Link>

          <Link to={`/announcements/${userId}`} className="link-div" id="announce-link">
            <MdAnnouncement className="sidebar-icon"/>&nbsp;Bulletin
          </Link>
        </ul>
      </div>
    </>
  );
}
