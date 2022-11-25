import React from 'react'
import styles from '../styles/Display.module.css';

function Display( { text }) {
  return (
    <div className={styles.display}><p>{ text }</p></div>
  );
}

export default Display;