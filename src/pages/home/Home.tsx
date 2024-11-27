import FeatureBike from "../featureBike/FeatureBike";
import Review from "../review/Review";
import WhyChooseMe from "../whyChooseMe/WhyChooseMe";
import HowToRent from "./howToRent/HowToRent";
import LandingSwiper from "./landingSwiper/LandingSwiper";

const HomePage = () => {
  return (
    <>
      <LandingSwiper />
      <FeatureBike />
      <HowToRent />
      <Review />
      <WhyChooseMe />
    </>
  );
};

export default HomePage;
