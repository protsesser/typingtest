import React, { useEffect, useState, useRef } from "react";
import './styles.css';

const Test = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Etiam non quam lacus suspendisse faucibus.';

  const [startTime, setStartTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
	const [correctWrong, setCorrectWrong] = useState([]);
	const [duration, setDuration] = useState(0);
  //let duration = startTime ? ((Date.now() - startTime) / 1000).toFixed(0) : 0;;
	
  useEffect(() => {
    inputRef.current.focus();
		setCorrectWrong(Array(charRefs.current.length).fill(''));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        const currentDuration = ((Date.now() - startTime) / 1000).toFixed(0);
				const correctChars = charIndex - mistakes;

        setDuration(currentDuration);
        setSpeed(((correctChars / 5) / (currentDuration / 60)).toFixed(0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping, startTime, charIndex]);

  const handleChange = (e) => {
    const characters = charRefs.current;
    let currentChar = charRefs.current[charIndex];
    let typedChar = e.target.value.slice(-1);
    if (charIndex < characters.length) {
      if (!isTyping) {
        setIsTyping(true);
        setStartTime(Date.now());
      }
      if (typedChar === currentChar.textContent) {
        setCharIndex((prevIndex) => prevIndex + 1);
				correctWrong[charIndex] = " correct ";
      } else {
        setMistakes((prevMistakes) => prevMistakes + 1);
        setCharIndex((prevIndex) => prevIndex + 1);
				correctWrong[charIndex] = " wrong ";
      }

      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
    } else setIsTyping(false);
  };

  return (
    <div className="container">
      <div className="test">
        <input type="text" className="input-field" ref={inputRef} onChange={handleChange} />
        {
          text.split("").map((char, index) => (
            <span className={`char ${index === charIndex ? "active" : ""} ${correctWrong[index]}`} key={index} ref={(e) => charRefs.current[index] = e}>
              {char}
            </span>
          ))
        }
      </div>
      <div className="result">
        <p>Время: <strong>{duration}</strong></p>
        <p>Аккуратность: <strong>{((charIndex - mistakes) / charIndex * 100).toFixed(0)}%</strong></p>
        <p>WPM: <strong>{speed}</strong></p>
        <button className="btn">Повтор</button>
      </div>
    </div>
  );
};

export default Test;
