import React, { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '+/-') {
      if (input) {
        setInput((prev) => {
          if (prev.startsWith('-')) {
            return prev.substring(1); // Remove the negative sign
          } else {
            return `-${prev}`; // Add a negative sign
          }
        });
      }
    } else {
      setInput((prev) => prev + value);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      setResult(evaluate(input).toString());
    } catch (e) {
      setResult('Error');
    }
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyboard = (event) => {
      const key = event.key;

      if (key >= '0' && key <= '9') {
        handleClick(key);
      } else if (key === 'Enter' || key === '=') {
        handleCalculate();
      } else if (key === 'Backspace') {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        handleClear();
      } else if (key === '/' || key === '*' || key === '-' || key === '+') {
        handleClick(key);
      } else if (key === '%') {
        handleClick('%');
      } else if (key === '.') {
        handleClick('.');
      } else if (key === '+') {
        handleClick('+');
      } else if (key === '-') {
        handleClick('-');
      } else if (key === '*') {
        handleClick('*');
      } else if (key === '/') {
        handleClick('/');
      }
    };

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [input]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200 p-4">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="p-5 rounded-lg shadow-md bg-black">
          <div className="text-right mb-2">
            <div className="text-2xl text-white">{input || '0'}</div>
            <div className="text-white">{result}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <button onClick={handleClear} className="btn bg-red-500 text-white col-span-2">C</button>
            <button onClick={() => handleClick('+/-')} className="btn">+/-</button>
            <button onClick={() => handleClick('%')} className="btn">%</button>
            <button onClick={() => handleClick('/')} className="btn operator">/</button>

            <button onClick={() => handleClick('7')} className="btn">7</button>
            <button onClick={() => handleClick('8')} className="btn">8</button>
            <button onClick={() => handleClick('9')} className="btn">9</button>
            <button onClick={() => handleClick('*')} className="btn operator">*</button>

            <button onClick={() => handleClick('4')} className="btn">4</button>
            <button onClick={() => handleClick('5')} className="btn">5</button>
            <button onClick={() => handleClick('6')} className="btn">6</button>
            <button onClick={() => handleClick('-')} className="btn operator">-</button>

            <button onClick={() => handleClick('1')} className="btn">1</button>
            <button onClick={() => handleClick('2')} className="btn">2</button>
            <button onClick={() => handleClick('3')} className="btn">3</button>
            <button onClick={() => handleClick('+')} className="btn operator">+</button>

            <button onClick={() => handleClick('0')} className="btn col-span-2">0</button>
            <button onClick={() => handleClick('.')} className="btn">.</button>
            <button onClick={handleCalculate} className="btn bg-blue-500 text-white col-span-4">=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
