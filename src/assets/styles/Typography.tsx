import { css } from 'styled-components';

import InterBlack from '@/assets/fonts/inter/dehinted-Inter-Black.woff2';
import InterBlackItalic from '@/assets/fonts/inter/dehinted-Inter-BlackItalic.woff2';
import InterBold from '@/assets/fonts/inter/dehinted-Inter-Bold.woff2';
import InterBoldItalic from '@/assets/fonts/inter/dehinted-Inter-BoldItalic.woff2';
import InterExtraLight from '@/assets/fonts/inter/dehinted-Inter-ExtraLight.woff2';
import InterExtraLightItalic from '@/assets/fonts/inter/dehinted-Inter-ExtraLightItalic.woff2';
import InterItalic from '@/assets/fonts/inter/dehinted-Inter-Italic.woff2';
import InterLight from '@/assets/fonts/inter/dehinted-Inter-Light.woff2';
import InterLightItalic from '@/assets/fonts/inter/dehinted-Inter-LightItalic.woff2';
import InterMedium from '@/assets/fonts/inter/dehinted-Inter-Medium.woff2';
import InterMediumItalic from '@/assets/fonts/inter/dehinted-Inter-MediumItalic.woff2';
import InterRegular from '@/assets/fonts/inter/dehinted-Inter-Regular.woff2';
import InterSemiBold from '@/assets/fonts/inter/dehinted-Inter-SemiBold.woff2';
import InterSemiBoldItalic from '@/assets/fonts/inter/dehinted-Inter-SemiBoldItalic.woff2';
import InterThin from '@/assets/fonts/inter/dehinted-Inter-Thin.woff2';
import InterThinItalic from '@/assets/fonts/inter/dehinted-Inter-ThinItalic.woff2';

const Typography = css`
  @font-face {
    font-family: 'Inter';
    src: url(${InterExtraLight}) format('woff2');
    font-weight: 200;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterMedium}) format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterSemiBold}) format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterSemiBoldItalic}) format('woff2');
    font-weight: 600;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterItalic}) format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBoldItalic}) format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterLight}) format('woff2');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterMediumItalic}) format('woff2');
    font-weight: 500;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterLightItalic}) format('woff2');
    font-weight: 300;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterExtraLightItalic}) format('woff2');
    font-weight: 200;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBoldItalic}) format('woff2');
    font-weight: bold;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBold}) format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterRegular}) format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBold}) format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBlack}) format('woff2');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterThin}) format('woff2');
    font-weight: 100;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterThinItalic}) format('woff2');
    font-weight: 100;
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: 'Inter';
    src: url(${InterBlackItalic}) format('woff2');
    font-weight: 900;
    font-style: italic;
    font-display: swap;
  }
`;

export default Typography;
