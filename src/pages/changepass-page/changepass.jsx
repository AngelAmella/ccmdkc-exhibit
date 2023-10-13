import React, { useState } from 'react';
import Head2 from '../../components/headers/header';
import '../../components/headers/header.css';
import './changepass.css';
import Button from '../../components/buttons/button';
import DiaLogo from '../../components/logo/logo';
import ClientLogo from '../../assets/ccmdkc-logo.png';
import { RiEyeFill } from 'react-icons/ri';
import { AiFillEyeInvisible } from 'react-icons/ai';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);  
    const [email, setEmail] = useState('');
    const [resetToken, setResetToken] = useState('');

    const navigate = useNavigate();

    const handleResetTokenChange = (e) => {
        setResetToken(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            // API call for password change
            const response = await axios.post('http://localhost:5000/api/user/resetpassword', {
                email: email,
                resetToken: resetToken,
                newPassword: newPassword,
            });
    
            if (response.status === 200) {
                console.log('Password changed successfully!');
                navigate('/'); 
            } else {
                console.error('Password change failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error occurred during password change:', error.message);
        }
    };
    return (
        <>
            <main>
                <div className='changepasspage'>
                    <div id='changepass-logo'>
                        <DiaLogo src={ClientLogo} />
                    </div>
                    <form onSubmit={handleSubmit}>
                    <div id='changepass-form'>
                        <Head2 text='Create New Password'></Head2>
                        <div className='new-password'>
                            <h3>Enter your new password below to change your password</h3>


                            <div className='password-container'>
                            <input 
                                value= {email}
                                placeholder=" Email Address"
                                className='changepassword-field'
                                required
                                onChange={handleEmailChange}/>
                            </div>

                            <div className='password-container'>
                                <input 
                                placeholder='Reset Token' 
                                value={resetToken} 
                                onChange={handleResetTokenChange} 
                                className='changepassword-field' />
                            </div>

                            <div className='password-container'>
                                <input type={showNewPassword ? 'text' : 'password'} 
                                placeholder='New Password' 
                                value={newPassword} 
                                onChange={handleNewPasswordChange} 
                                className='changepassword-field' />
                                <button className='change-toggle-eye' 
                                onClick={toggleNewPasswordVisibility}>
                                    {showNewPassword ? (<RiEyeFill />) : (<AiFillEyeInvisible />)}
                                </button>
                            </div>

                            <Button label='Send' type='submit' />
                        </div>
                    </div>
                    </form>
                </div>
            </main>
        </>
    );
}
