// Home.js
import HeroSection from "../components/Hero";
import FeaturedModelsSection from "../components/EVModel";
import AboutSection from "../components/About";
import ContactSection from "../components/Contact";
// import Testimonials from "../components/Testimonials";


export default function Home() {
  const handleCopyPhone = () => {
    navigator.clipboard.writeText("9404702745");
    alert("Phone number copied to clipboard!");
  };

  return (
    <div>
      <HeroSection />
      <FeaturedModelsSection />
      <AboutSection />
      <ContactSection handleCopyPhone={handleCopyPhone} />
      {/* <Testimonials /> */}
    </div>
  );
}
