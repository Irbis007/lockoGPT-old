import styled from 'styled-components';

type LogotypeProps = {
  size: 'extra-small' | 'small' | 'medium' | 'large',
  orientation: 'horizontal' | 'vertical'
};

const StyledLogotype = styled.div<LogotypeProps>`
  display: flex;
  align-items: center;
  flex-direction: ${({ orientation }) => orientation === 'horizontal' ? 'row' : 'column'};
  
  gap: ${({ size }) => {
    switch (size) {
      case 'extra-small':
        return '10px';

      case 'small':
        return '15px';

      default:
        return '20px';
    }
  }};

  width: fit-content;
  line-height: 1;

  ${({ size }) => {
    switch (size) {
      case 'large':
        return 'font-size: 40px; font-weight: 600;';
      
      case 'medium':
        return 'font-size:18px;';

      default:
        break;
    }
  }};

  > svg {
    ${({ size }) => {
    switch (size) {
      case 'extra-small':
        return 'width: 30px; height: 30px;';

      case 'small':
        return 'width: 35px; height: 35px;';

      case 'medium':
        return 'width: 50px; height: 50px;';

      case 'large':
        return 'width: 80px; height: 80px;';

      default:
        break;
    }
  }}
  }
`;

const Logotype = ({ size, orientation }: LogotypeProps) => {
  return (
    <StyledLogotype size={size} orientation={orientation}>
      <svg viewBox="0 0 154 155" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M122.41 154.099H31.6061C14.18 154.099 0 139.911 0 122.475V31.6231C0 14.1877 14.18 0 31.6061 0H122.41C139.836 0 154.001 14.1877 154.001 31.6231V122.475C154.016 139.911 139.836 154.099 122.41 154.099ZM31.6061 2.23641C15.4044 2.23641 2.2352 15.4127 2.2352 31.6231V122.475C2.2352 138.671 15.4044 151.848 31.6061 151.848H122.41C138.597 151.848 151.766 138.657 151.766 122.475V31.6231C151.766 15.4127 138.597 2.23641 122.41 2.23641H31.6061Z" fill="#0039A6" />
        <path d="M69.0636 22.4355C71.4127 21.068 73.9754 20.3843 76.5236 20.2988C71.1846 20.4555 66.0597 23.2902 63.1979 28.2616L17.127 108.074C12.7278 115.71 15.3474 125.453 22.9642 129.854C30.581 134.256 40.3333 131.649 44.7183 124.028L77.0076 68.0752L63.2407 44.2156C58.8415 36.5804 61.4469 26.8371 69.0636 22.4355Z" fill="#00A1DE" />
        <path d="M136.888 108.074L90.8315 28.2757C87.9556 23.3043 82.8302 20.4697 77.4912 20.313C80.0258 20.3842 82.5885 21.0822 84.9376 22.4497C92.5543 26.8513 95.1738 36.5946 90.7601 44.2155L76.9932 68.075L109.282 124.028C113.682 131.649 123.42 134.256 131.037 129.854C138.682 125.453 141.287 115.709 136.888 108.074Z" fill="#0039A6" />
        <path d="M84.9519 22.4355C82.6028 21.068 80.0401 20.3843 77.506 20.2988H77.4065H76.6235H76.538C73.9894 20.37 71.4408 21.068 69.0776 22.4355C61.4609 26.8371 58.8555 36.5804 63.2546 44.2013L77.022 68.0611L90.789 44.2013C95.174 36.5804 92.5686 26.8371 84.9519 22.4355Z" fill="#002C77" />
        <path d="M93.409 116.15C93.409 125.224 86.0772 132.546 77.0221 132.546C67.9674 132.546 60.6211 125.21 60.6211 116.15C60.6211 107.105 67.9533 99.7551 77.008 99.7551C86.0626 99.7551 93.409 107.105 93.409 116.15Z" fill="#EEAF30" />
      </svg>
      LockoGPT
    </StyledLogotype>
  );
};

export default Logotype;
