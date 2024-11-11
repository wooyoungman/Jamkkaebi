import styled from "styled-components";

const MarkerSvg = styled.svg`
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.25));
`;

const MapPin = ({
  fill = "#FF5252", // 기본 색상
  size = 32, // 기본 크기
  ...props
}) => {
  const height = size * 1.3125;

  return (
    <MarkerSvg width={size} height={height} viewBox="0 0 24 32" {...props}>
      <path
        d="M12 0C5.383 0 0 5.383 0 12c0 9 12 20 12 20s12-11 12-20c0-6.617-5.383-12-12-12z"
        fill={fill}
      />
      <circle cx="12" cy="12" r="4" fill="white" />
    </MarkerSvg>
  );
};

export default MapPin;
