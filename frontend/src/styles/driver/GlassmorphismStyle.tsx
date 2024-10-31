import styled from "styled-components";

export const GlassDiv = styled.div`
  border-radius: 20px;
  border: 1px solid rgba(84, 63, 212, 0.3);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  box-shadow:
    -5px -5px 4px 0px rgba(255, 255, 255, 0.04) inset,
    5px 5px 4px 0px rgba(255, 255, 255, 0.08) inset;
  backdrop-filter: blur(10px);
`;
