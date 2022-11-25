import React from 'react'
import styles from '../styles/Header.module.css'

function Header({ title }) {
  return (
    <header className={styles.Header}><h1>{title}</h1></header>
  );
}

export default Header;