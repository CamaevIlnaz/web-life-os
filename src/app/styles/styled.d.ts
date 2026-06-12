import 'styled-components';

import { theme } from './theme';

type AppTheme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: AppTheme['colors'];
    radius: AppTheme['radius'];
    shadow: AppTheme['shadow'];
  }
}
