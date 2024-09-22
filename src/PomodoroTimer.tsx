// PomodoroTimer.tsx

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPomodoro, setIsPomodoro] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval!);
          setIsActive(false);
          // Pomodoroと休憩を切り替え
          setIsPomodoro(!isPomodoro);
          setMinutes(isPomodoro ? 5 : 25);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, minutes, seconds, isPomodoro]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMinutes(isPomodoro ? 25 : 5);
    setSeconds(0);
  };

  const progress =
    (((isPomodoro ? 25 : 5) * 60 - (minutes * 60 + seconds)) /
      ((isPomodoro ? 25 : 5) * 60)) *
    100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-80">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isPomodoro ? "Pomodoro" : "Break"}
        </h1>
        <div className="relative w-64 h-64 mx-auto mb-6">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-200 stroke-current"
              strokeWidth="5"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
            ></circle>
            <circle
              className="text-indigo-500 stroke-current"
              strokeWidth="5"
              strokeLinecap="round"
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            ></circle>
          </svg>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span className="text-5xl font-bold text-gray-800">
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleTimer}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isActive ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button
            onClick={resetTimer}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}