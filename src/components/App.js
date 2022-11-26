import '../styles/App.css';
import Header from './Header';
import Display from './Display';
import Button from './Button';
import Footer from './Footer';

import { useState, useEffect } from 'react';
import { calculatorButtons } from '../data/calculator-bonus-03-button-data.js'

function App() {
  const [memory, setMemory] = useState(0);
  const [operandA, setOperandA] = useState("0");
  const [operator, setOperator] = useState("");
  const [operandB, setOperandB] = useState("");

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
    const operandsFloat = [
      parseFloat(operandA), 
      operandB ? parseFloat(operandB) : 0
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
    }
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
    (value === "All Clear") ? resetDisplay() :
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
    return (parseFloat(operand) / 100.0).toString();
  }

  function sqrt(operand) {
    const result = Math.sqrt(parseFloat(operand));
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
      <div>{buttons}</div>
    );
  }

  useEffect(() => {
    createButtons()
  }, [])

  return (
    <div className="wrapper">
      <div className="calculator">
        <Header title={"Calculator App"}/>
        <Display text={ operandA + operator + operandB }/>
        <div className="buttonArea">
        {createButtons()}
        </div>
      </div>
      <Footer author={"Adam Rodrigues"}/>
    </div>
  );
}

export default App;
