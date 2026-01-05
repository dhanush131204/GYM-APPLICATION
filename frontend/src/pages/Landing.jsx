import HeroSection from '../components/landing/HeroSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import BMICalculator from '../components/landing/BMICalculator';
import WorkoutPreview from '../components/landing/WorkoutPreview';
import MembershipSection from '../components/landing/MembershipSection';
import Chatbot from '../components/chatbot/Chatbot';

const Landing = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <WorkoutPreview />
      <MembershipSection />
      <BMICalculator />
      <Chatbot />
    </div>
  );
};

export default Landing;






