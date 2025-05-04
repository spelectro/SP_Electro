export default function Appointments() {
    return (
      <div className="w-full h-[600px] sm:h-[800px] bg-white">
      <iframe
      src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ0aMU2fTtIadvMuQNx5VoY7CrPkkRJwhnbaJA8q381zAv5XFcT6-AdMQOWdSF1UlLDhRSynoHXN?gv=true"
        className="w-full h-full"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
    
    );
  }
  
