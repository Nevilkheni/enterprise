import middleSectionBg2 from "../assets/image/midelimage2.png";
import submiddleSectionBg from "../assets/image/roll2.png";
import CardShowcase from "../components/CardShowcase";
import OurStory from "../components/ourstory";
import Certificate from "../components/certificate";
import Feature from "../components/feature";
import HomeImgSlider from "../components/Homeimgslider";

import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <HomeImgSlider />
      <OurStory />

      <section
        className="w-full  bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url(${middleSectionBg2})` }}
      >
        <div className="max-w-7xl mx-auto px-4 backdrop-blur-[3px] sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="w-full lg:w-2/3 bg-black/70 backdrop-blur-lg rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Welcome to Jyot Sequence
              </h2>
              <p className="text-lg md:text-xl mb-6 text-gray-200">
                Creating exceptional digital experiences for your talent journey
              </p>
              <p className="text-base text-gray-300 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                in dui mauris. Vivamus hendrerit arcu sed erat molestie
                vehicula. Sed do eiusmod tempor incididunt ut labore et dolore
                magna aliqua.
              </p>
              <button
                onClick={() => navigate("/Products")}
                className="px-6 py-2 bg-red-600 text-white font-medium rounded hover:bg-red-700 transition"
              >
                Products
              </button>
            </div>

            <div className="w-full lg:w-1/3 flex justify-center">
              <div className="overflow-hidden rounded-full w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-sm p-2">
                <img
                  src={submiddleSectionBg}
                  alt="Company Logo"
                  className="w-full h-full object-contain animate-roll"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CardShowcase />
      <Feature />
      <Certificate />
    </div>
  );
}

export default Home;
