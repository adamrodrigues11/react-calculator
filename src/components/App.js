import '../styles/App.css';
import Header from './Header';
import Display from './Display';
import Button from './Button';
import Footer from './Footer';

import { useState, useEffect } from 'react';
import { calculatorButtons } from '../data/calculator-bonus-03-button-data.js'

function App() {
  // memory state stored as number
  const [memory, setMemory] = useState(0);
  // operand and operator states stored as strings
  const [operandA, setOperandA] = useState("0");
  const [operator, setOperator] = useState("");
  const [operandB, setOperandB] = useState("");
  
  const MAX_DISPLAY_LENGTH = 12; // not including -, exp 

  function generateDisplay() {
    let displayStr; 
    // set display to active state
    if (operandB) {
      displayStr = operandB;
    } else if (operator) {
      return operator;
    } else {
      displayStr = operandA;
    }
    
    const value = parseFloat(displayStr);

    // use sci notation if display won't fit, but keep true value in the state
    if (displayStr.length > MAX_DISPLAY_LENGTH) {
      displayStr = value.toExponential(MAX_DISPLAY_LENGTH - 1);
    } 
    return displayStr;
  }
  
  function updateOperandB(value) {
    if (value !== "." || !operandB.includes(".")) { 
          setOperandB(operandB + value);
      }
  }

  function updateOperandA(value) {
    if (value !== "." || !operandA.includes(".")) {
      (operandA === "0" && value !== ".") ? setOperandA(value) :
        setOperandA(operandA + value);
    }
  }

  function updateOperator(value) {
    if (!operator) {
      setOperator(value);
    }
  }

  function evaluateExpression() {
    // use this function for safe evals of input
    const operandsFloat = [
      parseFloat(operandA), 
      operandB ? parseFloat(operandB) : 0.0
    ];
    let result;
    switch (operator) {
      case "+":
        result = operandsFloat[0] + operandsFloat[1];
        break;
      case "-":
        result = operandsFloat[0] - operandsFloat[1];
        break;
      case "*":
        result = operandsFloat[0] * operandsFloat[1];
        break;
      case "/":
        result = operandsFloat[0] / operandsFloat[1];
        break;
      default: // case where no operator enterred
        result = operandsFloat[0];
        break;
    }
    // throw error to display when applicable (eg. for div by 0)
    if (isNaN(result) || !isFinite(result)) {
      throw Error("Error")
    }
    return result;
  }

  function toggleSignOperandA() {
    if (operandA !== "0") {
      operandA.startsWith("-") ? setOperandA(operandA.slice(1)) : 
      setOperandA("-" + operandA);
    }
  }

  function toggleSignOperandB() {
    if (operandB !== "0" && operandB !== "") {
      operandB.startsWith("-") ? setOperandB(operandB.slice(1)) : 
      setOperandB("-" + operandB);
    }  
  }

  function resetDisplay() {
    setOperandA("0");
    setOperator("");
    setOperandB("");
  }  

  function handleClearButtonClicked(value) {
    // all clear
    (value === "All Clear") ? resetDisplay() :
    // clear
      operandB ? setOperandB("") :
        operator ? setOperator("") :
          setOperandA("0");
  }

  function handleMemoryButtonClicked(value) {
    const activeOperandFlt = operandB ? parseFloat(operandB) : 
      parseFloat(operandA);
    switch (value) {
      case "Memory Save":
        setMemory(activeOperandFlt);
        break;
      case "Memory Clear":
        setMemory(0);
        break;
      case "Memory Recall":
        operandB ? setOperandB(memory.toString()) : 
          setOperandA(memory.toString());
        break;
      case "Memory Subtract":
        setMemory(memory - activeOperandFlt);
        break;
      case "Memory Addition":
        setMemory(memory + activeOperandFlt);
        break;
    }
  }

  function percent(operand) {
    const result = parseFloat(operand) / 100.0;
    return result.toString();
  }

  function sqrt(operand) {
    const result = Math.sqrt(parseFloat(operand));
    // Throw error to display for sqrt of negative number
    if (isNaN(result)) {
      throw Error("Error")
    }
    return result.toString();
  }

  const handleButtonClicked = (button) => {
    switch(button.getAttribute("data-type")) {
      case "number":
        operator ? updateOperandB(button.value) : 
          updateOperandA(button.value);
        break;
      case "operator":
        updateOperator(button.value);
        break;
      case "enter":
        try {
          const result = evaluateExpression();
          resetDisplay();
          setOperandA(result.toString());
        } catch(error) {
          resetDisplay();
          setOperandA(error.message);
        }
        break;
      case "clear":
        handleClearButtonClicked(button.value);
        break;
      case "memory":
        handleMemoryButtonClicked(button.value);
        break;
      case "sign":
        operator ? toggleSignOperandB() : toggleSignOperandA();
        break;
      case "percent":
        operandB ? setOperandB(percent(operandB)) :
          setOperandA(percent(operandA));
        break;
      case "sqrt":
        try {
          operandB ? setOperandB(sqrt(operandB)) :
            setOperandA(sqrt(operandA));
        } catch(error) {
          resetDisplay();
          setOperandA(error.message);
        }
        break;
    }
  }

  const createButtons = () => {
    const buttons = calculatorButtons.map((buttonData, index) =>
      <Button
        key={ index }
        dataType ={ buttonData.type }
        className={ buttonData.className }
        value={ buttonData.value }
        text={ buttonData.text}
        handleButtonClicked={handleButtonClicked}
      />
  )
    return(
      <div className="buttonArea">{buttons}</div>
    );
  }

  useEffect(() => {
    createButtons()
  }, [])

  return (
      <div className="pageWrapper">
        <Header title={"Calculator App"}/>
        <div className="calculatorWrapper">
          <Display text={generateDisplay()}/>
          {createButtons()}
        </div>
        <Footer author={"Adam Rodrigues"}/>
      </div>
  );
}

export default App;
