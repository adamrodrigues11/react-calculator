import '../styles/App.css';
import Header from './Header';
import Display from './Display';
import Button from './Button';
import Footer from './Footer';

import { useState, useEffect } from 'react';
import { calculatorButtons } from '../data/calculator-bonus-03-button-data.js'


function App() {
  const [memory, setMemory] = useState(0);
  const [operator, setOperator] = useState("");
  const [operandA, setOperandA] = useState("");
  const [operandB, setOperandB] = useState("");

  function updateOperands(value) {
    operator ? setOperandB(operandB + value) : setOperandA(operandA + value);
  }

  function updateOperator(value) {
    if (!operator) {
      setOperator(value);
    }
  }

  function evaluateExpression() {
    const operandsFloat = [parseFloat(operandA), parseFloat(operandB)];
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
    return result;
  }

  const handleButtonClicked = (button) => {
    switch(button.getAttribute("data-type")) {
      case "number":
        updateOperands(button.value);
        break;
      case "operator":
        updateOperator(button.value);
        break;
      case "enter":
        const result = evaluateExpression();
        setOperandA(result);
        setOperator("");
        setOperandB("");
        break;
      case "clear":
        break;
      case "memory":
        break;
      case "sign":
        break;
      case "percent":
        break;
      case "sqrt":
        break;
      default:
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
        <div className='buttonArea'>
        {createButtons()}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
