import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../LandingPage/LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles['initial-container']}>
      <div className={styles['title-container']}>
        <h1>¡Viaja por el mundo!</h1>
        <Link to="/home">
          <button className={styles['ov-btn-grow-ellipse']}>Ingresar</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
