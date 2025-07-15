// const recently = (className: string) => (
//   <svg
//     width="9"
//     height="9"
//     viewBox="0 0 9 9"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//   >
//     <path
//       d="M4.5 0L6.02963 2.60796L9 3.24671L6.975 5.49727L7.28115 8.5L4.5 7.28296L1.71885 8.5L2.025 5.49727L0 3.24671L2.97037 2.60796L4.5 0Z"
//       fill="#FFCB45"
//     />
//   </svg>
// );

// const familiar = (className: string) => (
//   <svg
//     width="9"
//     height="9"
//     viewBox="0 0 9 9"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className={className}
//   >
//     <path
//       d="M4.5 0.5L6.02963 3.10796L9 3.74671L6.975 5.99727L7.28115 9L4.5 7.78296L1.71885 9L2.025 5.99727L0 3.74671L2.97037 3.10796L4.5 0.5Z"
//       fill="#F2F2F2"
//     />
//     <path
//       d="M1.71885 9L4.5 7.78296V0.5L2.97037 3.10796L0 3.74671L2.025 5.99727L1.71885 9Z"
//       fill="#FFCB45"
//     />
//   </svg>
// );
const BASE_PATH = "/images/logo/";
export const skills = [
  { name: "html", icon: `${BASE_PATH}html.png`, style: "" },
  { name: "css", icon: `${BASE_PATH}css.png` },
  { name: "javascript", icon: `${BASE_PATH}js.png` },
  { name: "typescript", icon: `${BASE_PATH}ts.png` },
  { name: "python", icon: `${BASE_PATH}python.png` },
  {
    name: "nextjs",
    icon: `${BASE_PATH}next.png`,
    style: "rounded-full bg-white",
  },
  { name: "redux", icon: `${BASE_PATH}redux.png`, style: "w-10 rounded-full" },
  { name: "reactjs", icon: `${BASE_PATH}react.png` },
  {
    name: "redux toolkit",
    icon: `${BASE_PATH}redux.png`,
    style: "rounded-full",
  },
  { name: "ui/ux(figma)", icon: `${BASE_PATH}figma.png` },
  { name: "git", icon: `${BASE_PATH}git.png`, style: "rounded-full bg-white" },
  {
    name: "tailwind css",
    icon: `${BASE_PATH}tailwind.png`,
    style: "rounded-full",
  },
  {
    name: "react-query",
    icon: `${BASE_PATH}react_query.png`,
    style: "rounded-full",
  },
  {
    name: "material-ui",
    icon: `${BASE_PATH}mui.png`,
    style: "rounded-full",
  },
  { name: "firebase", icon: `${BASE_PATH}firebase.png`, style: "rounded-full" },
  { name: "fastapi", icon: `${BASE_PATH}fastapi.png`, style: "rounded-full" },
  {
    name: "postgresql",
    icon: `${BASE_PATH}postgress.png`,
    style: "rounded-full",
  },
  {
    name: "antd components",
    icon: `${BASE_PATH}antd.png`,
    style: "rounded-full",
  },
];
