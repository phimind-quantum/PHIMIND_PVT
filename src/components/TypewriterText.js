import React, { useState, useEffect } from 'react';

const TypewriterText = ({ 
  texts = ['phi', 'Φ'], 
  typingSpeed = 200, 
  pauseDuration = 3000,
  className = '',
  startDelay = 0 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (startDelay > 0) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);
      return () => clearTimeout(startTimer);
    } else {
      setHasStarted(true);
    }
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    const currentText = texts[currentTextIndex];
    
    if (isTyping) {
      if (currentCharIndex < currentText.length) {
        const timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentCharIndex + 1));
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished typing current text, pause before erasing
        const timer = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timer);
      }
    } else {
      if (currentCharIndex > 0) {
        const timer = setTimeout(() => {
          setDisplayText(currentText.substring(0, currentCharIndex - 1));
          setCurrentCharIndex(currentCharIndex - 1);
        }, typingSpeed);
        return () => clearTimeout(timer);
      } else {
        // Finished erasing, move to next text
        const timer = setTimeout(() => {
          setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          setIsTyping(true);
        }, typingSpeed * 2);
        return () => clearTimeout(timer);
      }
    }
  }, [hasStarted, currentCharIndex, currentTextIndex, isTyping, texts, typingSpeed, pauseDuration]);

  return <span className={className}>{displayText}</span>;
};

export default TypewriterText;
