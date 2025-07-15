const s3BasePath = "https://d3hjahv3hylyce.cloudfront.net/icons/";

export const icons = {
  profile: `${s3BasePath}profile.svg`,
  building: `${s3BasePath}building.svg`,
  document: `${s3BasePath}document.svg`,
  help: `${s3BasePath}help.svg`,
  graph: `${s3BasePath}graph.svg`,
  human: `${s3BasePath}human.svg`,
  logout: `${s3BasePath}logout.svg`,
  arrow: `${s3BasePath}arrow.svg`,
  arrow_right: `${s3BasePath}arrow-right.svg`,
  arrow_left: `${s3BasePath}arrow-left.svg`,
  arrow_white: `${s3BasePath}arrow-white.svg`,
  plus: `${s3BasePath}plus.svg`,
};

const Icon = ({
  name,
  className,
  width = 24,
  height = 24,
}: {
  width?: number;
  height?: number;
  name: keyof typeof icons;
  className?: string;
}) => {
  return (
    <img
      src={icons[name]}
      alt={name}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
