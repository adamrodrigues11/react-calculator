import React from 'react'
import styles from '../styles/ButtonArea.module.css';

function ButtonArea( {children} ) {
  return (
    <div className={styles.buttonArea}>
        {children}
    </div>
  )
}

export default ButtonArea;