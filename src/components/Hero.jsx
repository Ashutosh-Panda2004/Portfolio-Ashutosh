import { SpacemanCanvas } from ".";
import Position from "./Position";
import spacebgImage from '/src/assets/spacebg-2.jpg'; // Adjust path as needed


const Hero = ({ scrollContainer }) => {
  return (
    // <section className="parallax bg-black">
    <section
      className="parallax bg-black"
      style={{
        backgroundImage: `url(${spacebgImage})`,
        // backgroundImage: `url('/assets/spacebg-2.jpg')`,
        backgroundSize: "cover", // Adjusts the image to cover the entire section
        backgroundPosition: "center", // Centers the image
        backgroundAttachment: "fixed", // Creates the parallax effect
        backgroundRepeat: "no-repeat", // Prevents image repetition
      }}
    >
      <div className="parallax__content absolute top-[6%] sm:top-[16%] lg:top-[22%] w-full m lg:pl-[38vh] lg:pr-[30vh] xl:pl-96 xl:pr-72 2xl:px-40 3xl:px-60 flex flex-col lg:flex-row items-start z-10">
        <div className="flex-1 lg:mb-0">
          <h1 className="mb-56 font-medium text-white text-[40px] xs:text-[50px] sm:text-[68px] md:text-[80px] lg:text-[100px] 2xl:text-[180px] leading-[110px] 2xl:leading-[160px]">
            ASHUTOSH PANDA
            <Position />
          </h1>
        </div>
        <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8 xs:ml-[-4vh] sm:ml-[-17vh] md:ml-[-26vh] lg:mt-10 2xl:mt-0">
          <div className="font-bold text-[20px] sm:text-[30px] md:text-[36px] 2xl:text-[46px] sm:leading-[40px] md:leading-[50px] 2xl:leading-[60px] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left">
            {/* <p>I love exploring <br/> new tech stacks and deliver a great prouct to consumer.</p> */}
          </div>
        </div>
      </div>

      {/* <img className="parallax__stars" src="./parallax/1Stars00.svg" alt="" /> */}
      <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
      <img
        className="parallax__mountain1"
        src="./parallax/3Mountain.svg"
        alt=""
      />
      <img
        className="parallax__mountain2"
        src="./parallax/4Mountain.svg"
        alt=""
      />
      <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />
      <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" />

      <SpacemanCanvas scrollContainer={scrollContainer} />
    </section>
  );
};

export default Hero;











// import { SpacemanCanvas } from ".";
// import Position from "./Position";
// import spacebgImage from '/src/assets/spacebg-2.jpg'; // Adjust path as needed

// const Hero = ({ scrollContainer }) => {
//   return (
//     <section
//       className="parallax bg-black"
//       style={{
//         backgroundImage: `url(${spacebgImage})`,
//         backgroundSize: "cover", 
//         backgroundPosition: "center", 
//         backgroundAttachment: "fixed", 
//         backgroundRepeat: "no-repeat", 
//       }}
//     >
//       <div className="parallax__content absolute top-[6%] sm:top-[16%] lg:top-[22%] w-full flex flex-col lg:flex-row items-start z-10">
//         <div className="flex-1 lg:mb-0">
//           <h1 className="mb-12 font-medium text-white text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] 2xl:text-[4.5vw] leading-[1.2]">
//             ASHUTOSH PANDA
//             <Position />
//           </h1>
//         </div>
//         <div className="flex-1 flex justify-start lg:justify-end mt-4 sm:mt-14 ml-8">
//           <div className="font-bold text-[4vw] sm:text-[3vw] md:text-[2.5vw] 2xl:text-[2vw] leading-[1.4] streaky-glow max-w-sm 2xl:max-w-lg text-white text-left">
//             {/* You can add additional text here */}
//           </div>
//         </div>
//       </div>

//       <img className="parallax__planets" src="./parallax/2Planets.svg" alt="" />
//       <img className="parallax__mountain1" src="./parallax/3Mountain.svg" alt="" />
//       <img className="parallax__mountain2" src="./parallax/4Mountain.svg" alt="" />
//       <img className="parallax__crater" src="./parallax/5Crater.svg" alt="" />
//       <img className="parallax__sun" src="./parallax/6Sun.svg" alt="" />

//       <SpacemanCanvas scrollContainer={scrollContainer} />
//     </section>
//   );
// };

// export default Hero;



