import React, { useEffect, useState, useRef } from "react";
import './styles.css';

//todo sync charlength

const Test = () => {
  const [text, setText] = useState('');
  const [textId, setTextId] = useState(1);

  const [startTime, setStartTime] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [speed, setSpeed] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const inputRef = useRef(null);
  const charRefs = useRef([]);
	const [correctWrong, setCorrectWrong] = useState([]);
	const [duration, setDuration] = useState(0);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`/api/texts/${textId}`);
        const data = await response.json();
        setText(data.content);
        restartTest();
      } catch (error) {
        console.error('Error fetching text:', error);
      }
    };
    fetchText();
  }, [textId]);

  const verifyValue = (value) => {
    return isNaN(value) || value < 0 || value > 10000 || !value || value === Infinity ? 0 : value;
  };

  function updateTimer(){
    const currentDuration = verifyValue(((Date.now() - startTime) / 1000).toFixed(0));
    const correctChars = charIndex - mistakes;
    const percent = verifyValue((correctChars / charIndex * 100).toFixed(0));
    const wpm = verifyValue(((correctChars / 5) / (currentDuration / 60)).toFixed(0));
    setDuration(currentDuration);
    setAccuracy(percent);
    setSpeed(wpm);
  };
	
  const restartTest = () => {
    console.log(textId);
    setIsTyping(false);
    setStartTime(null);
    setCharIndex(0);
    setDuration(0);
    setMistakes(0);
    setAccuracy(100);
    setSpeed(0);
    setCorrectWrong(Array(charRefs.current.length).fill(''));
    inputRef.current.focus();
    charRefs.current = [];
  }
  useEffect(() => {
    inputRef.current.focus();
		setCorrectWrong(Array(charRefs.current.length).fill(''));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping) {
      interval = setInterval(() => {
        updateTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping, startTime, charIndex]);

  const handleChange = (e) => {
    const characters = charRefs.current;
    console.log(characters.length);
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
      updateTimer();
      if (charIndex === characters.length - 1) {
        setIsTyping(false);
      }
    } else setIsTyping(false);
  };

  const changeText = () => {
    setTextId(prevId => prevId + 1);
  };

  return (
    <div className="container">
      <div className="result">
        <p>Время: <strong>{duration}</strong></p>
        <p>Аккуратность: <strong>{accuracy}%</strong></p>
        <p>WPM: <strong>{speed}</strong></p>
        <button className="btn" onClick={restartTest}>Повтор</button>
      </div>
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
      <button className="btn" onClick={changeText}>Новый текст</button>
    </div>
  );
};

export default Test;
