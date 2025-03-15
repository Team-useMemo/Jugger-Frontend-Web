export type themeColor =
  | 'primary0'
  | 'primary5'
  | 'primary10'
  | 'primary20'
  | 'primary30'
  | 'primary40'
  | 'primary50'
  | 'primary60'
  | 'primary70'
  | 'primary80'
  | 'primary90'
  | 'primary100'
  | 'grayscale0'
  | 'grayscale5'
  | 'grayscale10'
  | 'grayscale20'
  | 'grayscale30'
  | 'grayscale40'
  | 'grayscale50'
  | 'grayscale60'
  | 'grayscale70'
  | 'grayscale80'
  | 'grayscale90'
  | 'grayscale100'
  | 'danger'
  | 'warning'
  | 'success'
  | 'information'
  | 'red'
  | 'blue'
  | 'yellow'
  | 'cyan'
  | 'transparent';

const colors = {
  /* primary */
  /** #FFFFFF */ primary0: '#FFFFFF',
  /** #E8ECFF */ primary5: '#E8ECFF',
  /** #D3DBFF */ primary10: '#D3DBFF',
  /** #ADBBFF */ primary20: '#ADBBFF',
  /** #8096FF */ primary30: '#8096FF',
  /** #5270FF */ primary40: '#5270FF',
  /** #3457FD */ primary50: '#3457FD',
  /** #2947D2 */ primary60: '#2947D2',
  /** #243CAE */ primary70: '#243CAE',
  /** #162672 */ primary80: '#162672',
  /** #0B1339 */ primary90: '#0B1339',
  /** #101010 */ primary100: '#101010',
  /* grayscale */
  /** #FFFFFF */ grayscale0: '#FFFFFF',
  /** #F6F6F6 */ grayscale5: '#F6F6F6',
  /** #F0F0F1 */ grayscale10: '#F0F0F1',
  /** #E8E8E9 */ grayscale20: '#E8E8E9',
  /** #DBDCDF */ grayscale30: '#DBDCDF ',
  /** #C1C3C8 */ grayscale40: '#C1C3C8',
  /** #B2B4B9 */ grayscale50: '#B2B4B9',
  /** #93959A */ grayscale60: '#93959A',
  /** #525558 */ grayscale70: '#525558',
  /** #3E3F40 */ grayscale80: '#3E3F40',
  /** #303033 */ grayscale90: '#303033',
  /** #1D1E1F */ grayscale100: '#1D1E1F',
  /* function */
  /** #EB003B */ danger: '#EB003B',
  /** #FFB724 */ warning: '#FFB724',
  /** #008A1E */ success: '#008A1E',
  /** #2768FF */ information: '#2768FF',
  /* key */
  /** #FD4821 */ red: '#EB4553',
  /** #2D92FF */ blue: '#2D92FF',
  /** #FFEA64 */ yellow: '#FFEA64',
  /** #64FFEA */ cyan: '#64FFEA',
  /** #6495ED */ cornflowerblue: '#6495ED',
  /** #DD000000 */ transparent: '#DD000000',
};

const fontSize = {
  /** 56px */ Display1: '56px',
  /** 56px */ Display2: '40px',
  /** 56px */ Title1: '36px',
  /** 56px */ Title2: '28px',
  /** 56px */ Title3: '24px',
  /** 56px */ Heading1: '22px',
  /** 56px */ Headline1: '18px',
  /** 56px */ Body1: '16px',
  /** 56px */ Body2: '15px',
  /** 56px */ Label1: '14px',
  /** 56px */ Caption1: '12px',
  /** 56px */ Caption2: '11px',
};

const theme = {
  colors: colors,
  fontSize: fontSize,
};

const breakpoints = [720, 480];

const media = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export { theme, media };
