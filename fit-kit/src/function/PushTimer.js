import { useState, useEffect } from 'react';
import { schedulePushNotification } from './PushUp';

export function PushTimer() {
  const [time1, setTime1] = useState(90); // Zeit in Sekunden (2 Minuten = 90 Sekunden)
  const [isRunning1, setIsRunning1] = useState(false);

  useEffect(() => {
    if (isRunning1) {
      const timerInterval = setInterval(() => {
        if (time1 > 0) {
          setTime1(time1 - 1);
        } else {
          schedulePushNotification();
          setTime1(90);
          setIsRunning1(false);
        }
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isRunning1, time1]);

  const startTimer = () => {
    setIsRunning1(true);
  };

  const decreaseTime = () => {
    if (time1 > 10) {
      setTime1((prevTime) => prevTime - 10);
    }
  };

  const increaseTime = () => {
    setTime1((prevTime) => prevTime + 10);
  };

  const formatTime1 = () => {
    const minutes = Math.floor(time1 / 60);
    const seconds = time1 % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleTimerTextClick = () => {
    // Wenn der Timer nicht läuft, starten Sie ihn
    if (!isRunning1) {
      startTimer();
    }
  };
  return { startTimer, decreaseTime, handleTimerTextClick, formatTime1, increaseTime };
}
