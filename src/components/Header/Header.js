import React, { useState, useEffect } from 'react'
import './Header.css';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa'
import stackoverflowlogo from '../../assets/logo-stackoverflow.svg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignup = () => {
        navigate('/signup');
    }
    const handleHome = () => {
        navigate('/home')
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }
    return (
        <div className='header-container'>
            {
                !localStorage.getItem('token') && (<div className='header-menu' onClick={toggleMenu}>
                    <div onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                    {isOpen && (
                        <div>
                            <ul className='header-menu-list'>
                                <li className='header-menu-item'>Home</li>
                                <li className='header-menu-item'>Sign Up</li>
                                <li className='header-menu-item'>Sign In</li>
                                <li className='header-menu-item'>About</li>
                            </ul>
                        </div>
                    )}
                </div>)
            }
            <div className='header-logo' onClick={handleHome}>
                <img className='header-logo-img' src={stackoverflowlogo} alt='stack-overflow' />
            </div>
            <div className='header-items'>
                <div className='header-item'>About</div>
            </div>
            <div className='header-search-bar'>
                <input className='header-search-input' placeholder='Search...' />
                <FaSearch className='search-icon' />
            </div>
            {!localStorage.getItem('token')
                &&
                (<div className='header-auth'>
                    <div className='header-auth-login' onClick={handleLogin}>Login</div>
                    <div className='header-auth-signup' onClick={handleSignup}>Sign&nbsp;Up</div>
                </div>)
            }
            {
                localStorage.getItem('token')
                &&
                (<div className='header-auth'>
                    <div className='header-profile'>
                        <img className='header-profile-img' src={localStorage.getItem('user_profile')} alt='user-profile' />
                    </div>
                    <div className='header-auth-login' onClick={handleLogout}>Log Out</div>
                </div>)
            }
        </div>
    )
}

export default Header