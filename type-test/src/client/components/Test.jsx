import React, { useEffect, useState, useRef } from "react";
import './styles.css';

const Test = ({ setOpenResults, setLastAttemptId }) => {
  const [text, setText] = useState('');
  const [textId, setTextId] = useState(1);
  const [source, setSource] = useState('');
  const [author, setAuthor] = useState('');

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
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const response = await fetch(`/api/texts/${textId}`);
        const data = await response.json();
        setText(data.content);
        setAuthor(data.author);
        setSource(data.source);
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

  function updateTimer() {
    const currentDuration = verifyValue(((Date.now() - startTime) / 1000).toFixed(0));
    const correctChars = charIndex - mistakes;
    const percent = verifyValue((correctChars / charIndex * 100).toFixed(0));
    const wpm = verifyValue(((correctChars / 5) / (currentDuration / 60)).toFixed(0));
    setDuration(currentDuration);
    setAccuracy(percent);
    setSpeed(wpm);
    const calculateScore = (speed * (2 * accuracy));
    setScore(calculateScore);
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
    inputRef.current.value = '';
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
        saveTestResult();
        setOpenResults(true);
      }
    } else setIsTyping(false);
  };

  const changeText = () => {
    setTextId(prevId => prevId + 1);
  };

  const saveTestResult = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      console.error("No user logged in.");
      return;
    }
    console.log(`speed: ${speed}, accuracy: ${accuracy}, score: ${score}`);
    const result = {
      speed: speed,
      accuracy: accuracy,
      score: score,
      user_id: user.id,
      text_id: textId,
    };

    try {
      const response = await fetch('/api/attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
      });

      const data = await response.json();
      console.log('Test result saved:', data);
      setLastAttemptId(data.id);
      console.log(`last attempt id: ${data.id}`)
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  return (
    <div className=" max-w-2xl m-2 bg-zinc-700 p-8 rounded-xl">
      <div className="flex justify-between mb-4 border-b-2 pb-3 items-center">
        <p>WPM: <div className="inline-block font-bold">{speed}</div></p>
        <p>Аккуратность: <div className="inline-block font-bold">{accuracy}%</div></p>
        <p>Время: <div className="inline-block font-bold">{duration}</div></p>
        <button className="p-2 bg-sky-400 text-black rounded-lg font-bold hover:bg-sky-600" onClick={changeText}>Смена текста</button>
      </div>
      <div className="test select-none box-border">
        <input type="text" className="opacity-0 absolute w-96 h-16" ref={inputRef} onChange={handleChange} />
        {
          text.split("").map((char, index) => (
            <span className={`char cursor-text text-xl text-zinc-300 ${index === charIndex ? "active" : ""} ${correctWrong[index]}`} key={index} ref={(e) => charRefs.current[index] = e}>
              {char}
            </span>
          ))
        }
      </div>
      <div className="flex items-center mt-4 justify-between">
        <div className="flex">
        <p className="">"{source}"</p>
        <p> - {author}</p>
        </div>
        <button className="p-2 bg-sky-400 text-black rounded-lg font-bold hover:bg-sky-600" onClick={restartTest}>Заново</button>
      </div>
    </div>
  );
};

export default Test;
