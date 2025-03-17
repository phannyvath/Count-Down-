import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownItem {
  label: string;
  value: number;
}

const App: React.FC = () => {
  const targetDate = new Date("2025-04-13T00:00:00+07:00");

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownItems: CountdownItem[] = [
    { label: "ថ្ងៃ (Days)", value: timeLeft.days },
    { label: "ម៉ោង (Hours)", value: timeLeft.hours },
    { label: "នាទី (Minutes)", value: timeLeft.minutes },
    { label: "វិនាទី (Seconds)", value: timeLeft.seconds },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-300 to-red-400 flex items-center justify-center p-6">
      <div className="relative bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 max-w-lg w-full transform transition-all hover:scale-105">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 to-red-600 rounded-t-2xl"></div>

        {/* Title with Improved Typography */}
        <h1
          className="text-5xl font-extrabold text-center text-amber-900 mb-10 tracking-tight"
          style={{
            fontFamily: "'Khmer', serif",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          Sol marn ngai tt reh save luy pong
          <br />
          <span className="text-2xl text-red-700 font-semibold">
            Countdown Banh Terk Tov SR
          </span>
        </h1>

        {/* Countdown Grid with Animation */}
        <div className="grid grid-cols-4 gap-6 text-center">
          {countdownItems.map((item) => (
            <div
              key={item.label}
              className="bg-amber-100 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl font-bold text-amber-800 animate-pulse-slow">
                {item.value.toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-red-600 mt-3 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Target Date with Subtle Background */}
        <p className="text-center text-amber-800 mt-8 bg-amber-50 py-2 px-4 rounded-lg text-lg">
          គោលដៅ:{" "}
          <span className="font-semibold">ថ្ងៃទី ១៣ ខែមេសា ឆ្នាំ២០២៥</span>
          <br />
          Target: <span className="font-semibold">April 13, 2025</span>
        </p>

        {/* Footer with Gradient Text */}
        <div className="mt-10 text-center text-sm bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-red-600">
          ngai 14 ma larn tt Bart rkun
        </div>
      </div>
    </div>
  );
};

export default App;
