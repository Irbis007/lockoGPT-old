import styled from 'styled-components';

const StyledPreloaderScreen = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  margin-top: 0 !important;

  color: #919191;
`;

const PreloaderScreen = () => {
  return (
    <StyledPreloaderScreen>
      <svg xmlns="http://www.w3.org/2000/svg" width="256px" height="256px" viewBox="0 0 24 24">
        <circle cx={18} cy={12} r={0} fill="currentColor">
          <animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
        </circle>
        <circle cx={12} cy={12} r={0} fill="currentColor">
          <animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
        </circle>
        <circle cx={6} cy={12} r={0} fill="currentColor">
          <animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate>
        </circle>
      </svg>
    </StyledPreloaderScreen>
  );
};

export default PreloaderScreen;
