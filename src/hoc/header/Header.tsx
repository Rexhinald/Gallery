import React from 'react';
import Logo from '../../assets/svg/logo.svg';
import styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.header}>
            <img className={styles.logo} src={Logo} onClick={() => navigate('/')} />
        </div>
    );
};

export default Header;
