import React from 'react'
import styles from '../styles/Button.module.css';

function Button( {dataType, className, value, text, handleButtonClicked} ) {
  const handleClick = (e) => {
    handleButtonClicked(e.target);
  }
  
  return (
      <button data-type={dataType} className={className} value={value} onClick={handleClick}>{text}</button>
  );
}

export default Button;