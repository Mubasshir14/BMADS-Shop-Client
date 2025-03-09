import AllCategories from "@/components/home/AllCategories";
import HeroSection from "@/components/home/HeroSection";
import HomeTableData from "@/components/home/HomeTableData";
import EmailSubscription from "@/components/Modules/EmailSubscription";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AllCategories />
      <HomeTableData />
      <EmailSubscription />
    </div>
  );
};

export default HomePage;
