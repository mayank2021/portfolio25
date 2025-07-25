import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const options: Option[] = [
    { value: "download", label: "Download" },
    { value: "view", label: "View" },
    { value: "copy", label: "Copy link" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option: Option) => {
    const resumePath = "/pdfs/mayank_sonkar_resume.pdf";

    switch (option.value) {
      case "download":
        // Create a temporary link element to trigger download
        const link = document.createElement("a");
        link.href = resumePath;
        link.download = "mayank_resume_frontend.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case "view":
        // Open PDF in new tab for viewing
        window.open(resumePath, "_blank");
        break;

      case "copy":
        // Copy the Google Drive link to clipboard
        const driveUrl =
          "https://drive.google.com/file/d/1NltGbODS5Bh7DqP73kQslJoMpmRTkaws/view?usp=sharing";
        navigator.clipboard
          .writeText(driveUrl)
          .then(() => {
            // You could add a toast notification here to confirm copy
            setTimeout(() => {
              setIsVisible(true);
            }, 10);
            setTimeout(() => {
              setIsVisible(false);
            }, 1500);
          })
          .catch((err) => {
            console.error("Failed to copy link: ", err);
          });
        break;

      default:
        break;
    }

    setIsOpen(false);
  };

  return (
    <div className="w-[115px] max-md:w-[100px]">
      <div className="relative" ref={dropdownRef}>
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 max-md:py-2 max-md:px-2 text-left bg-[#111] border  border-[rgba(255,255,255,0.3)] rounded-md shadow-sm  focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
        >
          <div className="flex items-center justify-between max-md:gap-1 max-md:justify-center">
            <span className={"text-[rgba(255,255,255,0.6)] max-md:text-[14px]"}>
              Resume
            </span>
            <ChevronDown
              className={`w-5 h-5 max-md:w-4 max-md:h-4 text-[rgba(255,255,255,0.6)] transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-180 text-[rgba(255,255,255,0.6)]" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute z-10 w-full mt-1 bg-[#111] border border-[rgba(255,255,255,0.3)] rounded-md shadow-xl transform transition-all duration-200 ease-out origin-top ${
            isOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option)}
                className={`w-full px-4 py-2 text-left text-gray-200 hover:bg-[rgba(255,255,255,0.2)] max-md:text-[14px] hover:text-white transition-all duration-150 ease-in-out transform hover:scale-105 ${
                  isOpen ? "animate-slideIn" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out forwards;
        }
      `}</style>
      <div
        className={`fixed top-24 text-[12px] border border-white right-8 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-500 z-50 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <p className="font-normal">Copied to clipboard</p>
      </div>
    </div>
  );
};

export default Dropdown;
