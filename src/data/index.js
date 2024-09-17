import {
  vidyakruti,
  anvesha,
  codolio,
  obyss,
  sanjeevanialgo,
  sanjeevani,
  vision
} from "../assets";

export const navLinks = [
  {
    id: "hero",
    title: "Hero",
  },
  {
    id: "portfolio",
    title: "Portfolio",
  },
  {
    id: "education",
    title: "Education",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const educations = [
  
  {
    title: "Bachelor of Engineering",
    company_name: "Chitkara University, Rajpura, Punjab",
    date: "October 2022 – July 2026",
    details: [
      "Featured on the <span style='color: white;'>Dean’s List </span> in the <span style='color: white;'> first semester </span> for <span style='color: white;'> best project </span> and <span style='color: white;'>top programmer </span>.",
      "Achieved a distinguished <span style='color: white;'> 9.03 CGPA </span> overall through the third semester, reflecting exceptional academic performance.",
      "Within <span style='color: white;'> two years </span> at the university, collaborated with the <span style='color: white;'> Research Department (CURIN) </span> , contributing to <span style='color: white;'> 4 patents </span>, with  <span style='color: white;'> 2 successfully granted </span>.",
    ],
  },
  {
    title: "Senior Secondary",
    company_name: "P.K.R Jain Sr Sec. Public School, Ambala",
    date: "April 2021 - March 2022",
    details: [
      "Chosen a specialized <span style='color: white;'> non-medical track in Class XI </span>, delving into core subjects with a focus on <span style='color: white;'> Physics, Chemistry, and Mathematics. </span>",
      "Further <span style='color: white;'> advanced this specialization in Class XII </span>, deepening expertise in these key scientific disciplines.",
      "Graduated from <span style='color: white;'> Class XII </span> with a distinguished <span style='color: white;'> 86.2% </span>.",
    ],
  },
  {
    title: "Secondary Education",
    company_name: "P.K.R Jain Sr Sec. Public School, Ambala",
    date: "April 2019 - March 2020",
    details: [
      "Achieved <span style='color: white;'>91.2% in Class X </span> and ranked among the <span style='color: white;'> top 20 students in the batch</span>.",
      "Qualified for <span style='color: white;'> CBSE National Level Science Challenge. </span>",
      "Secured <span style='color: white;'> 2nd place in State Level Science Fair </span>, organized by the <span style='color: white;'> Ministry of Culture, Govt. of India.<span>",

    ],
  },
];

const portfolio = [
  {
    name: "Coding Platform Portfolio",
    description:
      "With a LeetCode contest rating of 1,687, global ranking in the top 13.84%, and 400+ questions completed on multiple coding platforms, I’ve earned multiple badges and maintained a max streak of 95 days.",
    image: codolio,
  },
  {
    name: "Project-Anvesha",
    description:
      "Anvesha is an online collaborative compiler with a visually appealing UI and animations, currently in progress, with the authentication and text editor features already implemented",
    image: anvesha,
  },
  {
    name: "Project-Vidyakruti",
    description:
      "Vidyakruti is a centralized platform for students to collaboarate and study together and share information, currently in progress, with a fully implemented book selling and buying feature.",
    image: vidyakruti,
  },
  {
    name: "Obyss Agency Clone",
    description:
      "Obyss Agency Clone is a full-featured, modern digital agency website replica, offering a sleek design and essential functionalities tailored for showcasing services, portfolios, and client projects.",
    image: obyss,
  },
  {
    name: "PS Algorithm for Patient Management",
    description:
      "Our formalized Priority Score (PS) algorithm, combining base severity, wait time, and ward capacity, improves efficiency by 40% over existing hospital triage systems and reduces patient starvation by 20%.",
    image: sanjeevanialgo,
  },
  {
    name: "Project-Sanjeevani",
    description:
      "Sanjeevani integrates city-wide healthcare systems with live OPD, bed availability, real-time ambulance tracking, and pre-fill forms, ensuring efficient operations and improved patient care.",
    image: sanjeevani,
  },
  {
    name: "Visual Impairment Supporter Interactive Obstacle Navigator (VISION)",
    description:
      "VISION is a Smart Cap equipped with ultrasonic sensors and vibrating motors, utilizing Arduino technology to help visually impaired individuals navigate obstacles.",
    image: vision,
  },
];



export { educations, portfolio };

