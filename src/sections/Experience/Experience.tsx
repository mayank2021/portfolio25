"use client";

import AnimatedCircles from "@/components/CircleAnimation/CircleAnimation";
import GlassButton from "@/components/GlassButton/GlassButton";
import { useState } from "react";

interface Company {
  companyName: string;
  jobTitle: string;
  color: string;
  bg: string;
  logo: string;
  highlights?: (string | string[])[];
  tech?: string[];
  links?: {
    title: string;
    href: string;
  }[];
}

const content: Company[] = [
  {
    companyName: "Zinc",
    jobTitle: "Frontend developer",
    color: "#CA7842",
    logo: "zinc_logo.png",
    bg: "zinc.png",
    highlights: [
      "Worked on Remittance, stabilizing the platform, enhancing performance, and improving the user experience by 30% for seamless money transfers abroad.",
      "Started the brokerage platform from scratch. Led development of 2 out of 5 core modules—Trade and Wallet. The Trade module includes expert-curated picks, watchlist, ETF search, and real-time pricing via WebSocket. The Wallet module manages deposits, withdrawals, and PSP integration. Also contributed to Portfolio and Buy/Sell modules.",
      "Developed the Partner Portal from scratch, an extended version of Remittance, enabling partners to manage transactions for users; implemented the entire remittance journey, reducing the customer efforts by 80%.",
      "Integrated external systems like Hyperverse, Singzy, and DigiLocker for KYC flows, streamlining user onboarding and transaction validations; reduced user detail mismatching by 25%.",
      "Built the Cost Comparison Calculator from scratch, managing complex state logic to accurately project future education costs abroad. Increased the overall user engagement by 8%.",
      "Contributed to UI creation, animations, and effects, enhancing the visual appeal and usability of various company offerings.",
    ],
    tech: [
      "nextjs",
      "redux toolkit",
      "redux toolkit query",
      "git",
      "typescript",
      "tailwind",
    ],
    links: [
      {
        title: "Remittance",
        href: "https://pay.zinc.money/",
      },
      {
        title: "Super app (Brokerage)",
        href: "https://www.zinc.money/login/",
      },
      {
        title: "Partner portal (Remittance)",
        href: "https://partner.zinc.money/",
      },
      {
        title: "Financial Calc",
        href: "https://calculator.zinc.financial/honors/ria-calculator/login",
      },
      {
        title: "Brokerage UI",
        href: "https://www.zinc.money/in/wealth - ",
      },
      {
        title: "Remittance UI",
        href: "https://www.zinc.money/pay",
      },
    ],
  },
  {
    companyName: "Psiborg",
    jobTitle: "Frontend developer",
    logo: "psiborg_logo.jpeg",
    bg: "psi.png",
    color: "#CD5656",
    highlights: [
      "Deployed two responsive, multi-role (admin, sub-admin, user) dashboards from scratch.",
      "Handles large amount of data with customized reusable components such as charts, modals, and paginated tables.",
      "Implemented React optimization hooks, advanced patterns, and reduced code complexity by using small, reusable components with a feature-first approach project structure.",
      [
        "Livestock",
        "Deployed two responsive, multi-role (admin, sub-admin, user) dashboards from scratch.",
        "Handles large amount of data with customized reusable components such as charts, modals, and paginated tables.",
        "Implemented React optimization hooks, advanced patterns, and reduced code complexity by using small, reusable components with a feature-first approach project structure.",
      ],
      [
        "Agro: Smart Agriculture",
        "Leverages IoT to enhance farm operations and address agricultural challenges. With a focus on improving visibility and providing actionable data to make strategic decisions and optimise yields effectively.",
        "Establish a multi–role routing using react-router-dom and conditionally rendered multiple geometric shape validations (Add, Edit, Click, Drag) with G–Map API.",
        "Created sections for Site, Gateway, BM, and Node and connected them with each other to ensure data flow.",
      ],
    ],
    tech: [
      "nextjs",
      "redux toolkit",
      "react query",
      "MUI",
      "g-maps",
      "git",
      "typescript",
    ],
    links: [
      {
        title: "Psiborg Tech",
        href: "https://psiborg.in/",
      },
      {
        title: "Livestock",
        href: "https://psiborg.in/livestock-monitoring-using-iot/",
      },
      {
        title: "Agro: Smart agriculture",
        href: "https://psiborg.in/smart-agricultural-system/",
      },
    ],
  },
  {
    companyName: "Aviate",
    jobTitle: "Frontend developer",
    logo: "aviate_logo.png",
    bg: "aviate.png",
    color: "#16C47F",
    highlights: [
      "Developed a fully responsive and accessible UI using ReactJS, ensuring seamless performance across devices and screen sizes, which led to notable improvements in user satisfaction and experience scores.",
      "Collaborated with cross-functional teams to refine user interface components, integrating user feedback into design decisions and enhancing overall usability.",
      "Proactively identified and resolved critical bugs during development and QA cycles, significantly improving application stability and reducing post-release issues.",
      "Performed comprehensive functional and UI testing, validating performance, usability, and responsiveness to deliver a polished end-user experience.",
      "Contributed to continuous product improvements by analyzing recurring user pain points and implementing targeted solutions, driving consistent UX optimization.",
    ],
    tech: ["ReactJS", "redux", "MUI", "git", "typescript"],
    links: [
      {
        title: "Aviate",
        href: "https://www.aviate.jobs/",
      },
    ],
  },
  {
    companyName: "Alan AI",
    jobTitle: "Frontend/Dev Rel intern",
    logo: "alan_logo.png",
    bg: "alan.png",
    color: "#FE5D26",
    highlights: [
      "Organized and managed multiple hackathons, tech events, and workshops, fostering a vibrant developer community and significantly boosting engagement and retention.",
      "Conducted 10+ interactive technical workshops focused on hands-on learning in areas like ReactJS, open-source tools, and frontend development, resulting in greater participation and skill-building within the community.",
      "Developed step-by-step ReactJS starter templates that simplified onboarding for new users, reducing the volume of frequently asked questions and support queries by a notable margin.",
      "Improved developer experience through detailed documentation and guided templates, enabling faster adoption of tools and empowering users to build with confidence.",
      "Forged strategic partnerships with relevant tech organizations and communities, expanding outreach efforts and enhancing the platform’s visibility among target audiences.",
      "Authored 10+ blog posts on tutorials, community stories, and use cases, contributing to an 18% increase in new user sign-ups through consistent content marketing and educational initiatives.",
    ],
    tech: ["ReactJS", "redux", "MUI", "git", "typescript", "alan ai sdk"],
    links: [
      {
        title: "Alan AI",
        href: "https://www.aviate.jobs/",
      },
      {
        title: "Voice over App",
        href: "https://www.youtube.com/watch?v=DNbkZpjb7Hw",
      },
      {
        title: "Voice Assisted Food Delivery App",
        href: "https://www.youtube.com/watch?v=YclhanaCPuY",
      },
    ],
  },
  {
    companyName: "Spenza",
    jobTitle: "Frontend intern",
    logo: "spenza_logo.jpeg",
    bg: "spenza.png",
    color: "#56d9cd",
    highlights: [
      "Collaborated closely with the CEO to deeply understand business challenges, engage in detailed problem discussions, and contribute to strategic decision-making for effective solutions.",
      "Demonstrated adaptability by successfully transitioning from a UI Developer role to a UI Designer role, bridging the gap between design thinking and frontend execution.",
      "Independently led the end-to-end design and development of user interfaces, ensuring both visual appeal and functional usability in alignment with business goals.",
      "Balanced dual responsibilities across UI design and development, maintaining high standards in both areas while meeting tight project deadlines.",
      "Earned recognition from senior leadership and stakeholders for versatility, initiative, and impactful contributions in driving product quality through a hybrid skill set.",
    ],
    tech: ["ReactJS", "MUI", "git", "typescript", "figma"],
    links: [
      {
        title: "Spenza Site",
        href: "https://spenza.com/",
      },
    ],
  },
];

const CompanyDetail = ({
  onClose,
  show,
  selectedCompany,
}: {
  onClose: () => void;
  show: boolean;
  selectedCompany: Company | null;
}) => {
  return (
    <div
      className={`w-full pb-10 overflow-y-auto h-screen z-10 bg-[#111] fixed top-0 left-0 transition-all duration-500 ease-in-out ${
        show ? "translate-x-0" : "translate-x-[110%]"
      }`}
    >
      <div className="relative max-md:mb-10 max-md:mt-5">
        <button
          onClick={onClose}
          className="absolute top-8 right-8 max-md:top-0 max-md:right-4 text-white"
        >
          <AnimatedCircles text="X" textStyle="text-white font-bold" />
        </button>
        <div className="flex gap-4 items-center">
          <img
            src={`/images/${selectedCompany?.bg}`}
            className="w-[40%] h-screen max-md:hidden"
          />
          <div className="text-white pr-10 max-md:px-4">
            <p
              className="font-bold font-playfair tracking-[0.05em] text-[72px] capitalize max-md:text-[48px]"
              style={{ color: selectedCompany?.color }}
            >
              {selectedCompany?.companyName}
            </p>
            <p className="font-light tracking-[0.05em] text-[20px] uppercase mb-2">
              Highlights
            </p>
            <ol className="list-disc pl-3 space-y-2 text-[16px]  max-md:text-[12px] max-md:text-justify text-[rgba(255,255,255,0.7)]">
              {selectedCompany?.highlights?.map((ele) => {
                if (Array.isArray(ele)) {
                  const content = (
                    <>
                      <li key={ele[0]} className="text-[rgba(255,255,255,0.9)]">
                        {ele[0]}
                      </li>
                      <ol className="list-decimal space-y-2 text-[16px] text-[rgba(255,255,255,0.7)] pl-6">
                        {ele?.slice(1)?.map((text) => (
                          <li key={text}>{text}</li>
                        ))}
                      </ol>
                    </>
                  );
                  return content;
                } else {
                  return <li key={ele}>{ele}</li>;
                }
              })}
            </ol>
            <p className="font-light tracking-[0.05em] text-[20px] uppercase mt-6 mb-2">
              tech used
            </p>
            <div className="flex gap-2 max-md:flex-wrap">
              {selectedCompany?.tech?.map((ele) => (
                <p
                  key={ele}
                  className="border py-2 px-4 max-md:grow max-md:text-center rounded-lg tracking-wider uppercase max-md:text-[12px]"
                  style={{ borderColor: selectedCompany?.color }}
                >
                  {ele}
                </p>
              ))}
            </div>
            <p className="font-light tracking-[0.05em] text-[20px] uppercase mt-6 mb-2">
              Links
            </p>
            <div className="flex gap-3 flex-wrap">
              {selectedCompany?.links?.map((ele) => (
                <GlassButton
                  className="max-md:grow"
                  key={ele?.title}
                  onClick={() => {
                    window.open(ele.href);
                  }}
                >
                  {ele?.title}
                </GlassButton>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  return (
    <div
      id="experience-section"
      className="min-h-screen py-16 relative mt-10 max-md:overflow-x-hidden"
    >
      <p className="font-light text-[#fff] tracking-[0.05em] text-[26px] text-center mb-8 max-md:mb-20">
        Milestones & Impact
      </p>

      <div className="flex flex-col gap-6 max-md:gap-12 items-center">
        {content?.map((company, ind) => {
          return (
            <div
              key={company?.companyName}
              className="flex flex-col justify-center items-center relative text-white hover:cursor-pointer transition-all duration-500 ease-in-out group"
              style={{ "--hover-color": company?.color } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = company?.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "white";
              }}
              onClick={() => {
                setSelectedCompany(company);
                setShowDetails(true);
              }}
            >
              <img
                src={`/images/${company?.logo}`}
                className={`rounded-full w-[244px] p-4 h-[244px] max-md:w-[160px] max-md:h-[160px] absolute -top-[100px] max-md:-top-[30px] ${
                  ind % 2 === 0
                    ? "-left-[400px] max-md:-left-[60px]"
                    : "-right-[400px]  max-md:-right-[60px]"
                } transition-transform duration-500 ease-in-out border-2 max-md:opacity-30 border-[#56d9cd] scale-0 group-hover:scale-100 max-md:scale-100`}
                style={{ borderColor: company?.color }}
              />

              <p className="font-bold max-md:z-10 max-md:relative max-md:text-[48px] font-playfair tracking-[0.05em] text-[72px] capitalize">
                {company?.companyName}
              </p>
              <p className="font-light text-[rgba(255,255,255,0.8)] uppercase tracking-[0.3em] text-[16px] max-md:text-[12px]">
                {company?.jobTitle}
              </p>
            </div>
          );
        })}
      </div>
      <CompanyDetail
        selectedCompany={selectedCompany}
        show={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedCompany(null);
        }}
      />
    </div>
  );
};

export default Experience;
