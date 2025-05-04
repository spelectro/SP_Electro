import React, { useState, useEffect } from "react";

function Verification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
    setCanResend(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <div className="bg-white p-12 rounded-xl shadow-lg w-[500px] transform transition duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-center text-blue-700">
          OTP Verification
        </h2>
        <form className="space-y-6 mt-4">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                className="w-16 h-16 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={digit}
                onChange={(e) => handleChange(index, e)}
              />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>
              Remaining Time:{" "}
              <span className="text-blue-700 font-bold">{timeLeft}s</span>
            </span>
            <span className="text-black">
              Didn't get the code?{" "}
              <button
                type="button"
                className={`text-blue-700 hover:underline font-bold ${
                  canResend ? "" : "cursor-not-allowed"
                }`}
                onClick={handleResend}
                disabled={!canResend}
              >
                Resend
              </button>
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={otp.some((digit) => digit === "")}
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default Verification;
