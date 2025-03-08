import HeroSection from "@/components/home/HeroSection";
import EmailSubscription from "@/components/Modules/EmailSubscription";

const HomePage = () => {
  return (
    <div>
      <div className="mb-10">
        <HeroSection />
      </div>
      <EmailSubscription />
    </div>
  );
};

export default HomePage;
