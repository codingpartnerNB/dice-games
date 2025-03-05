import { useState } from 'react';
import UserLogin from './UserLogin';
import GamerLogin from './GamerLogin';

const LoginToggle = () => {
  const [isGamer, setIsGamer] = useState(false);

  const toggleHandler = () => {
    setIsGamer(!isGamer);
  };

  return (
    <div style={styles.container}>
      {/* Toggle Header */}
      <div style={styles.headerContainer}>
        <div 
          style={styles.toggleContainer}
          onClick={toggleHandler}
        >
          <div style={{
            ...styles.slider,
            transform: isGamer ? 'translateX(100%)' : 'translateX(0)',
          }}>
            <span style={styles.sliderText}>
              {isGamer ? 'Gamer' : 'User'}
            </span>
          </div>
          <span style={{
            ...styles.backgroundLabel,
            left: '25%',
            opacity: isGamer ? 1 : 0,
          }}>
            User
          </span>
          <span style={{
            ...styles.backgroundLabel,
            right: '25%',
            opacity: isGamer ? 0 : 1,
          }}>
            Gamer
          </span>
        </div>
      </div>

      {/* Render Appropriate Login Component */}
      <div style={styles.loginBox}>
        {isGamer ? <GamerLogin /> : <UserLogin />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(90deg, #2a0845, #6441a5)',
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    // backgroundColor: '#f0f2f5',
    // background: 'linear-gradient(90deg, #2a0845, #6441a5)',
    position: 'relative',
    zIndex: 1000,
  },
  toggleContainer: {
    position: 'relative',
    width: '400px',
    height: '60px',
    borderRadius: '30px',
    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  slider: {
    position: 'absolute',
    top: '4px',
    left: '4px',
    width: 'calc(50% - 8px)',
    height: '52px',
    backgroundColor: '#fff',
    borderRadius: '26px',
    transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderText: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    fontWeight: '600',
    fontSize: '1.2rem',
  },
  backgroundLabel: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: '600',
    transition: 'opacity 0.4s',
    userSelect: 'none',
  },
  loginBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
};

export default LoginToggle;