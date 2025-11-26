import { useState, useEffect } from 'react';
import './TopNav.css';
import { useNavigate } from 'react-router-dom';
import { useAdminContext } from '../../context/AdminContext';
import { useLocalContext } from '../../context/LocalContext';

const TopNav = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const navigate = useNavigate();
  const { admin, adminLogout } = useAdminContext();
  const {webinfo } = useLocalContext();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <header className="admin-topnav">
      <div className="admin-topnav-left">
        <h1 className="brand-name">{webinfo.name}</h1>
      </div>
      <div className="admin-topnav-right">
        <span className="welcome">Welcome, Admin</span>
        <span className="clock">{currentTime}</span>
        <span className='welcome'>{admin?.email}</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default TopNav;
