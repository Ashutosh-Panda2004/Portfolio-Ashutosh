import { SpacemanCanvas } from ".";
import Position from "./Position";
import spacebgImage from '/src/assets/spacebg-2.jpg'; // Adjust path as needed

const Hero = ({ scrollContainer }) => {
  return (
    <section
      className="parallax bg-black"
      style={{
        backgroundImage: `url(${spacebgImage})`,
        backgroundSize: "cover", // Adjusts the image to cover the entire section
        backgroundPosition: "center", // Centers the image
        backgroundAttachment: "fixed", // Creates the parallax effect
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}
    >
      <div className="parallax__content absolute top-[6%] sm:top-[16%] lg:top-[22%] w-full lg:pl-[62vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10">
        <div className="flex-1 lg:mb-0">
          <h1 className="mb-56 font-medium text-white
            text-[40px] xs:text-[50px] sm:text-[60px] md:text-[70px] lg:text-[85px] xl:text-[100px] 2xl:text-[120px] leading-[110px] 2xl:leading-[160px]">
            ASHUTOSH PANDA
            <Position />
          </h1>
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          {/* optional taglines */}
        </div>
      </div>

      {/*parallax layers */}
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
      <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" />
      <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />
      <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" />

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;









