import React from 'react'

function Button( {dataType, className, value, text, handleButtonClicked} ) {
  const handleClick = (e) => {
    handleButtonClicked(e.target);
  }
  
  return (
        <button 
          data-type={dataType} 
          className={className}
          value={value} 
          text={text} 
          onClick={handleClick}>
            {text}
        </button>
  );
}

export default Button;