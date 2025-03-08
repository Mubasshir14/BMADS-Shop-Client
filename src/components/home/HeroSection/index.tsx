/* eslint-disable react/no-unescaped-entities */
import Navigation from "@/components/Shared/Navbar";
import Image from "next/image";
import { FaBolt, FaHeadset, FaShieldAlt } from "react-icons/fa";
import img from "../../../assets/wrongtakeauto.png";

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-b from-blue-500 to-blue-600 min-h-screen relative overflow-hidden ">
      <Navigation />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-8 h-8 bg-blue-300 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-60 left-40 w-12 h-12 bg-blue-300 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-32 right-60 w-6 h-6 bg-blue-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-40 left-1/4 w-10 h-10 bg-blue-300 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/3 w-8 h-8 bg-blue-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "0.8s" }}
        ></div>
      </div>

      <div className="absolute bottom-0 w-full ">
        <svg
          viewBox="0 0 1440 270"
          className="w-full"
          preserveAspectRatio="none"
        >
          <path
            fill="white"
            d="M0,128L48,128C96,128,192,128,288,149.3C384,171,480,213,576,208C672,203,768,149,864,133.3C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Hero Content */}
      <div className="container max-w-screen-xl mx-auto px-6 pt-32 pb-32 flex flex-col-reverse md:flex-row items-center relative z-10">
        <div className="md:w-1/2 mb-12 md:mb-0">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight ">
              Your{" "}
              <span className="relative inline-block">
                <span className="text-blue-300">#1 agency</span>
                <svg
                  className="absolute -bottom-2 w-full"
                  viewBox="0 0 100 15"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q50,15 100,5"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    fill="none"
                  />
                </svg>
              </span>{" "}
              for advertising assets & solutions!
            </h1>

            <p className="text-white text-lg mb-4 leading-relaxed text-justify">
              We're proud to support your{" "}
              <strong className="font-semibold">business</strong> and help you
              overcome obstacles from
              <strong className="font-semibold"> Facebook bans</strong>. Our
              dedication ensures effective solutions to scale your ads and
              business. <span className="text-yellow-400 text-xl">🏆</span>
            </p>

            <div className="flex flex-wrap justify-start gap-4 text-white">
              <div className="flex items-center bg-blue-600/50 shadow-2xl px-4 py-3 rounded-xl backdrop-blur-sm transition-transform hover:transform hover:scale-105">
                <div className="bg-blue-500 p-2 border-white border-2 rounded-lg mr-3">
                  <FaBolt className="text-white" />
                </div>
                <span>Instant delivery</span>
              </div>
              <div className="flex items-center bg-blue-600/50 px-4 py-3 shadow-2xl rounded-xl backdrop-blur-sm transition-transform hover:transform hover:scale-105">
                <div className="bg-blue-500 p-2 border-white border-2 rounded-lg mr-3">
                  <FaHeadset className="text-white" />
                </div>
                <span>Best Support</span>
              </div>
              <div className="flex items-center bg-blue-600/50 px-4 py-3 shadow-2xl rounded-xl backdrop-blur-sm transition-transform hover:transform hover:scale-105">
                <div className="bg-blue-500 border-white border-2 p-2 rounded-lg mr-3">
                  <FaShieldAlt className="text-white" />
                </div>
                <span>100% Secure</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-3/4 relative flex justify-center md:justify-end ">
          <div className="relative">
            <div className="relative z-10  transition-transform hover:transform hover:scale-105 duration-300">
              <div className="absolute inset-0 bg-blue-400 rounded-3xl blur-xl opacity-20"></div>
              <div className="rounded-3xl w-full h-full flex items-center justify-center  ">
                <div className="relative">
                  <Image src={img} width={500} height={500} alt="image-mane" />

                  <div
                    className="absolute -bottom-6 -right-6 bg-white p-2 rounded-lg shadow-lg animate-bounce"
                    style={{ animationDuration: "3s" }}
                  >
                    <span className="text-blue-600 font-bold">+100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="absolute top-40 md:top-48 -left-16 z-0 w-24 h-24 md:w-32 md:h-32 animate-pulse" style={{animationDuration: '4s'}}>
                <div className="absolute inset-0 bg-orange-400 blur-md opacity-30 rounded-2xl"></div>
                <div className="bg-gradient-to-br from-blue-300 to--500 rounded-2xl w-full h-full flex items-center justify-center transform rotate-12 shadow-lg border-2 border-orange-300/30">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6L8 12L14 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Image src={img} width={600} height={600} alt='image-mane' />
                </div>
              </div>
               */}

            {/* <div className="absolute top-16 -left-8 z-5 w-16 h-16 md:w-20 md:h-20 animate-bounce" style={{animationDuration: '5s'}}>
                <div className="absolute inset-0 bg-gray-700 blur-md opacity-30 rounded-xl"></div>
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl w-full h-full flex items-center justify-center shadow-lg border-2 border-gray-600/30">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 11L10 13L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div> */}
          </div>
        </div>
      </div>

      {/* <div className="fixed bottom-6 left-6 z-30">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-full flex items-center shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
            <span className="relative">
              <FaHeadset className="mr-2" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500 animate-ping"></span>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500"></span>
            </span>
            Support
          </button>
        </div> */}

      {/* Shopping Cart - Fixed */}
      {/* <div className="fixed bottom-6 right-6 z-30">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:transform hover:scale-105">
            <span className="relative">
              <FaShoppingCart className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-white text-blue-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-blue-500">
                0
              </span>
            </span>
          </button>
        </div> */}
    </div>
  );
};

export default HeroSection;
