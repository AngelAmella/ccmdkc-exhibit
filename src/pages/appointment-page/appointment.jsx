import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './appointment.css';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import ServicesIcon from '../../assets/services.jpg';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios
        .get(`http://localhost:5000/api/user/${userId}`)
        .then((result) => setUser(result.data))
        .catch((err) => console.log(err));
    }
  }, []); 

  const handleClick = () => {
    if (user) {
      navigate(`/booking/${user._id}`);
    }
  };

  return (
    <>
      <main>
        <div className="servicespage">
          <div id="services-logo">
            <DiaLogo src={ClientLogo} />
          </div>

          <div id="services-form">
            <div id="services-icon">
              <img src={ServicesIcon} alt="Services Icon" />
            </div>

            <div className="services-info">
              <Head2 text="Consultation Hours" />
              <h3>1:00PM-4:00PM</h3>
            </div>
            <Button label="Book" type="button" onClick={handleClick} />
          </div>
        </div>
      </main>
    </>
  );
}
