import React, { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  borderWidth?: number;
  borderColor?: string;
  textColor?: string;
  fontSize?: string;
  fontWeight?: string;
  className?: string;
  variant?: "stroke" | "shadow" | "outline" | "glow" | "clean";
}

const Typography = ({
  children,
  borderWidth = 2,
  borderColor = "#000000",
  textColor = "#ffffff",
  fontSize = "2rem",
  fontWeight = "bold",
  className = "",
  variant = "stroke",
}: TypographyProps) => {
  const baseStyles = {
    fontSize,
    fontWeight,
    color: textColor,
    display: "inline-block",
    fontFamily: "Arial, sans-serif",
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "stroke":
        return {
          ...baseStyles,
          WebkitTextStroke: `${borderWidth}px ${borderColor}`,
          textStroke: `${borderWidth}px ${borderColor}`,
          WebkitTextFillColor: textColor,
          textFillColor: textColor,
        };

      case "shadow":
        const shadowOffset = borderWidth;
        return {
          ...baseStyles,
          textShadow: `
            -${shadowOffset}px -${shadowOffset}px 0 ${borderColor},
            ${shadowOffset}px -${shadowOffset}px 0 ${borderColor},
            -${shadowOffset}px ${shadowOffset}px 0 ${borderColor},
            ${shadowOffset}px ${shadowOffset}px 0 ${borderColor},
            -${shadowOffset}px 0px 0 ${borderColor},
            ${shadowOffset}px 0px 0 ${borderColor},
            0px -${shadowOffset}px 0 ${borderColor},
            0px ${shadowOffset}px 0 ${borderColor}
          `,
        };

      case "clean":
        // Better alternative to stroke for letters with enclosed areas
        const offset = borderWidth;
        return {
          ...baseStyles,
          textShadow: `
            -${offset}px -${offset}px 0 ${borderColor},
            0 -${offset}px 0 ${borderColor},
            ${offset}px -${offset}px 0 ${borderColor},
            ${offset}px 0 0 ${borderColor},
            ${offset}px ${offset}px 0 ${borderColor},
            0 ${offset}px 0 ${borderColor},
            -${offset}px ${offset}px 0 ${borderColor},
            -${offset}px 0 0 ${borderColor}
          `,
        };

      case "outline":
        return {
          ...baseStyles,
          textShadow: `
            0 0 ${borderWidth}px ${borderColor},
            0 0 ${borderWidth * 2}px ${borderColor}
          `,
        };

      case "glow":
        return {
          ...baseStyles,
          textShadow: `
            0 0 ${borderWidth * 2}px ${borderColor},
            0 0 ${borderWidth * 4}px ${borderColor},
            0 0 ${borderWidth * 6}px ${borderColor}
          `,
        };

      default:
        return baseStyles;
    }
  };

  return (
    <span className={className} style={getVariantStyles()}>
      {children}
    </span>
  );
};
export default Typography;

// // Demo component showing different variants
// const TextBorderDemo = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-8">
//       <div className="max-w-4xl mx-auto space-y-12">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-white mb-4">
//             Text Border Component
//           </h1>
//           <p className="text-gray-300">
//             Showcase of different text border effects
//           </p>
//         </div>

//         <div className="grid gap-8">
//           {/* Stroke Variant */}
//           <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//             <h2 className="text-xl text-white mb-4">Stroke Border</h2>
//             <TextBorder
//               variant="stroke"
//               borderWidth={3}
//               borderColor="#ff6b6b"
//               textColor="#ffffff"
//               fontSize="3rem"
//             >
//               STROKE TEXT
//             </TextBorder>
//           </div>

//           {/* Shadow Variant */}
//           <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//             <h2 className="text-xl text-white mb-4">Shadow Border</h2>
//             <TextBorder
//               variant="shadow"
//               borderWidth={2}
//               borderColor="#4ecdc4"
//               textColor="#ffffff"
//               fontSize="3rem"
//             >
//               SHADOW TEXT
//             </TextBorder>
//           </div>

//           {/* Outline Variant */}
//           <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//             <h2 className="text-xl text-white mb-4">Outline Border</h2>
//             <TextBorder
//               variant="outline"
//               borderWidth={3}
//               borderColor="#ffd93d"
//               textColor="#ffffff"
//               fontSize="3rem"
//             >
//               OUTLINE TEXT
//             </TextBorder>
//           </div>

//           {/* Glow Variant */}
//           <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//             <h2 className="text-xl text-white mb-4">Glow Effect</h2>
//             <TextBorder
//               variant="glow"
//               borderWidth={2}
//               borderColor="#ff9ff3"
//               textColor="#ffffff"
//               fontSize="3rem"
//             >
//               GLOW TEXT
//             </TextBorder>
//           </div>

//           {/* Multiple Examples */}
//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//               <h3 className="text-lg text-white mb-3">Custom Colors</h3>
//               <TextBorder
//                 variant="stroke"
//                 borderWidth={2}
//                 borderColor="#e74c3c"
//                 textColor="#f39c12"
//                 fontSize="2rem"
//               >
//                 CUSTOM
//               </TextBorder>
//             </div>

//             <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6">
//               <h3 className="text-lg text-white mb-3">Thick Border</h3>
//               <TextBorder
//                 variant="shadow"
//                 borderWidth={4}
//                 borderColor="#2ecc71"
//                 textColor="#ecf0f1"
//                 fontSize="2rem"
//               >
//                 THICK
//               </TextBorder>
//             </div>
//           </div>

//           {/* Usage Example */}
//           <div className="bg-gray-800 rounded-lg p-6">
//             <h3 className="text-white text-lg mb-4">Usage Example:</h3>
//             <pre className="text-green-400 text-sm overflow-x-auto">
//               {`<TextBorder
//   variant="stroke"
//   borderWidth={3}
//   borderColor="#ff6b6b"
//   textColor="#ffffff"
//   fontSize="3rem"
// >
//   YOUR TEXT
// </TextBorder>`}
//             </pre>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TextBorderDemo;
