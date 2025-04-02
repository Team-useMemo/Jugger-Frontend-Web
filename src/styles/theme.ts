const palette = {
  /** common */ common: {
    /** #000000ff */ '0': '#000000ff',
    /** #ffffffff */ '100': '#ffffffff',
  },
  /** neutral */ neutral: {
    /** #0f0f0fff */ '5': '#0f0f0fff',
    /** #171717ff */ '10': '#171717ff',
    /** #1c1c1cff */ '15': '#1c1c1cff',
    /** #2a2a2aff */ '20': '#2a2a2aff',
    /** #303030ff */ '22': '#303030ff',
    /** #474747ff */ '30': '#474747ff',
    /** #5c5c5cff */ '40': '#5c5c5cff',
    /** #737373ff */ '50': '#737373ff',
    /** #8a8a8aff */ '60': '#8a8a8aff',
    /** #9b9b9bff */ '70': '#9b9b9bff',
    /** #b0b0b0ff */ '80': '#b0b0b0ff',
    /** #c4c4c4ff */ '90': '#c4c4c4ff',
    /** #dcdcdcff */ '95': '#dcdcdcff',
    /** #f7f7f7ff */ '99': '#f7f7f7ff',
  },
  /** coolneutral */ coolneutral: {
    /** #0f0f10ff */ '5': '#0f0f10ff',
    /** #141415ff */ '7': '#141415ff',
    /** #171719ff */ '10': '#171719ff',
    /** #1b1c1eff */ '15': '#1b1c1eff',
    /** #212225ff */ '17': '#212225ff',
    /** #292a2dff */ '20': '#292a2dff',
    /** #2e2f33ff */ '22': '#2e2f33ff',
    /** #333438ff */ '23': '#333438ff',
    /** #37383cff */ '25': '#37383cff',
    /** #46474cff */ '30': '#46474cff',
    /** #5a5c63ff */ '40': '#5a5c63ff',
    /** #70737cff */ '50': '#70737cff',
    /** #878a93ff */ '60': '#878a93ff',
    /** #989ba2ff */ '70': '#989ba2ff',
    /** #aeb0b6ff */ '80': '#aeb0b6ff',
    /** #c2c4c8ff */ '90': '#c2c4c8ff',
    /** #dbdcdfff */ '95': '#dbdcdfff',
    /** #e1e2e4ff */ '96': '#e1e2e4ff',
    /** #eaebecff */ '97': '#eaebecff',
    /** #f4f4f5ff */ '98': '#f4f4f5ff',
    /** #f7f7f8ff */ '99': '#f7f7f8ff',
  },
  /** blue */ blue: {
    /** #001536ff */ '10': '#001536ff',
    /** #002966ff */ '20': '#002966ff',
    /** #003e9cff */ '30': '#003e9cff',
    /** #0054d1ff */ '40': '#0054d1ff',
    /** #005eebff */ '45': '#005eebff',
    /** #0066ffff */ '50': '#0066ffff',
    /** #1a75ffff */ '55': '#1a75ffff',
    /** #3385ffff */ '60': '#3385ffff',
    /** #69a5ffff */ '70': '#69a5ffff',
    /** #9ec5ffff */ '80': '#9ec5ffff',
    /** #c9defeff */ '90': '#c9defeff',
    /** #eaf2feff */ '95': '#eaf2feff',
    /** #f7fbffff */ '99': '#f7fbffff',
  },
  /** red */ red: {
    /** #3b0101ff */ '10': '#3b0101ff',
    /** #730303ff */ '20': '#730303ff',
    /** #b00c0cff */ '30': '#b00c0cff',
    /** #e52222ff */ '40': '#e52222ff',
    /** #ff4242ff */ '50': '#ff4242ff',
    /** #ff6363ff */ '60': '#ff6363ff',
    /** #ff8c8cff */ '70': '#ff8c8cff',
    /** #ffb5b5ff */ '80': '#ffb5b5ff',
    /** #fed5d5ff */ '90': '#fed5d5ff',
    /** #feececff */ '95': '#feececff',
    /** #fffafaff */ '99': '#fffafaff',
  },
  /** green */ green: {
    /** #00240cff */ '10': '#00240cff',
    /** #004517ff */ '20': '#004517ff',
    /** #006e25ff */ '30': '#006e25ff',
    /** #009632ff */ '40': '#009632ff',
    /** #00bf40ff */ '50': '#00bf40ff',
    /** #1ed45aff */ '60': '#1ed45aff',
    /** #49e57dff */ '70': '#49e57dff',
    /** #7df5a5ff */ '80': '#7df5a5ff',
    /** #acfcc7ff */ '90': '#acfcc7ff',
    /** #d9ffe6ff */ '95': '#d9ffe6ff',
    /** #f2fff6ff */ '99': '#f2fff6ff',
  },
  /** orange */ orange: {
    /** #361e00ff */ '10': '#361e00ff',
    /** #663a00ff */ '20': '#663a00ff',
    /** #9c5800ff */ '30': '#9c5800ff',
    /** #d47800ff */ '40': '#d47800ff',
    /** #ff9200ff */ '50': '#ff9200ff',
    /** #ffa938ff */ '60': '#ffa938ff',
    /** #ffc06eff */ '70': '#ffc06eff',
    /** #ffd49cff */ '80': '#ffd49cff',
    /** #fee6c6ff */ '90': '#fee6c6ff',
    /** #fef4e6ff */ '95': '#fef4e6ff',
    /** #fffcf7ff */ '99': '#fffcf7ff',
  },
  /** redorange */ redorange: {
    /** #290f00ff */ '10': '#290f00ff',
    /** #592100ff */ '20': '#592100ff',
    /** #913500ff */ '30': '#913500ff',
    /** #c94a00ff */ '40': '#c94a00ff',
    /** #ff5e00ff */ '50': '#ff5e00ff',
    /** #ff7b2eff */ '60': '#ff7b2eff',
    /** #ff9b61ff */ '70': '#ff9b61ff',
    /** #ffbd96ff */ '80': '#ffbd96ff',
    /** #fed9c4ff */ '90': '#fed9c4ff',
    /** #feeee5ff */ '95': '#feeee5ff',
    /** #fffaf7ff */ '99': '#fffaf7ff',
  },
  /** cyan */ cyan: {
    /** #00252bff */ '10': '#00252bff',
    /** #004854ff */ '20': '#004854ff',
    /** #006f82ff */ '30': '#006f82ff',
    /** #0098b2ff */ '40': '#0098b2ff',
    /** #00bddeff */ '50': '#00bddeff',
    /** #28d0edff */ '60': '#28d0edff',
    /** #57dff7ff */ '70': '#57dff7ff',
    /** #8aedffff */ '80': '#8aedffff',
    /** #b5f4ffff */ '90': '#b5f4ffff',
    /** #defaffff */ '95': '#defaffff',
    /** #f7feffff */ '99': '#f7feffff',
  },
  /** lightblue */ lightblue: {
    /** #002130ff */ '10': '#002130ff',
    /** #004261ff */ '20': '#004261ff',
    /** #006796ff */ '30': '#006796ff',
    /** #008dcfff */ '40': '#008dcfff',
    /** #00aeffff */ '50': '#00aeffff',
    /** #3dc2ffff */ '60': '#3dc2ffff',
    /** #70d2ffff */ '70': '#70d2ffff',
    /** #a1e1ffff */ '80': '#a1e1ffff',
    /** #c4ecfeff */ '90': '#c4ecfeff',
    /** #e5f6feff */ '95': '#e5f6feff',
    /** #f7fdffff */ '99': '#f7fdffff',
  },
  /** violet */ violet: {
    /** #11024dff */ '10': '#11024dff',
    /** #23098fff */ '20': '#23098fff',
    /** #3a16c9ff */ '30': '#3a16c9ff',
    /** #4f29e5ff */ '40': '#4f29e5ff',
    /** #6541f2ff */ '50': '#6541f2ff',
    /** #7d5ef7ff */ '60': '#7d5ef7ff',
    /** #9e86fcff */ '70': '#9e86fcff',
    /** #c0b0ffff */ '80': '#c0b0ffff',
    /** #dbd3feff */ '90': '#dbd3feff',
    /** #f0ecfeff */ '95': '#f0ecfeff',
    /** #fbfaffff */ '99': '#fbfaffff',
  },
  /** purple */ purple: {
    /** #290247ff */ '10': '#290247ff',
    /** #580a7dff */ '20': '#580a7dff',
    /** #861cb8ff */ '30': '#861cb8ff',
    /** #ad36e3ff */ '40': '#ad36e3ff',
    /** #cb59ffff */ '50': '#cb59ffff',
    /** #d478ffff */ '60': '#d478ffff',
    /** #de96ffff */ '70': '#de96ffff',
    /** #e9baffff */ '80': '#e9baffff',
    /** #f2d6ffff */ '90': '#f2d6ffff',
    /** #f9edffff */ '95': '#f9edffff',
    /** #fefbffff */ '99': '#fefbffff',
  },
  /** pink */ pink: {
    /** #3d0133ff */ '10': '#3d0133ff',
    /** #730560ff */ '20': '#730560ff',
    /** #a81690ff */ '30': '#a81690ff',
    /** #d331b8ff */ '40': '#d331b8ff',
    /** #f553daff */ '50': '#f553daff',
    /** #fa73e3ff */ '60': '#fa73e3ff',
    /** #ff94edff */ '70': '#ff94edff',
    /** #ffb8f3ff */ '80': '#ffb8f3ff',
    /** #fed3f7ff */ '90': '#fed3f7ff',
    /** #feecfbff */ '95': '#feecfbff',
    /** #fffafeff */ '99': '#fffafeff',
  },
};

const color = {
  /** primary */
  primary: {
    /** #0054d1ff */ normal: palette['blue']['40'],
    /** #57dff7ff */ sub: palette['cyan']['70'],
  },

  /** label */
  label: {
    /** #171719ff */ normal: palette['coolneutral']['10'],
    /** #000000ff */ strong: palette['common']['0'],
    /** #46474cff */ neutral: palette['coolneutral']['30'],
    /** #878a93ff */ alternative: palette['coolneutral']['60'],
    /** #c2c4c8ff */ assistive: palette['coolneutral']['90'],
    /** #dbdcdfff */ disable: palette['coolneutral']['95'],
    /** #ffffffff */ inverse: palette['common']['100'],
  },

  /** background */
  background: {
    /** #ffffffff */ normal: palette['common']['100'],
    /** #f7f7f8ff */ alternative: palette['coolneutral']['99'],
    /** #f4f4f5ff */ neutral: palette['coolneutral']['98'],
  },

  /** interaction */
  interaction: {
    /** #989ba2ff */ inactive: palette['coolneutral']['70'],
    /** #f7f7f8ff */ disable: palette['coolneutral']['99'],
  },

  /** line */
  line: {
    /** #e8e8eaff */ neutral: '#e8e8eaff',
    /** #f4f4f5ff */ alternative: '#f4f4f5ff',
    /** #e0e0e2ff */ normal: '#e0e0e2ff',
  },

  /** accent */
  accent: {
    /** #ff5e00ff */ redorange: palette['redorange']['50'],
    /** #00bddeff */ cyan: palette['cyan']['50'],
    /** #00aeffff */ lightblue: palette['lightblue']['50'],
    /** #4f29e5ff */ violet: palette['violet']['40'],
    /** #cb59ffff */ purple: palette['purple']['50'],
    /** #f553daff */ pink: palette['pink']['50'],
    /** #0066ffff */ blue: palette['blue']['50'],
  },

  /** fill */
  fill: {
    /** #f4f4f5ff */ normal: '#f4f4f5ff',
    /** #e8e8eaff */ strong: '#e8e8eaff',
    /** #f8f8f8ff */ alternative: '#f8f8f8ff',
  },

  /** status */
  status: {
    /** #00bf40ff */ success: palette['green']['50'],
    /** #ff4242ff */ error: palette['red']['50'],
    /** #00aeffff */ informative: palette['lightblue']['50'],
  },

  /** material */
  material: {
    /** #171719b3 */ dimmer: '#171719b3',
  },
};

const font = {
  /**
   * fontSize: 56px
   * letterSpacing: -1.786
   * lineHeight: 1.286
   */
  display1: {
    /** fontWeight: 700 */
    bold: {
      fontSize: '56px',
      fontWeight: 700,
      letterSpacing: -1.786,
      lineHeight: 1.286,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '56px',
      fontWeight: 500,
      letterSpacing: -1.786,
      lineHeight: 1.286,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '56px',
      fontWeight: 400,
      letterSpacing: -1.786,
      lineHeight: 1.286,
    },
  },
  /**
   * fontSize: 40px
   * letterSpacing: -1.128
   * lineHeight: 1.3
   */
  display2: {
    /** fontWeight: 700 */
    bold: {
      fontSize: '40px',
      fontWeight: 700,
      letterSpacing: -1.128,
      lineHeight: 1.3,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '40px',
      fontWeight: 500,
      letterSpacing: -1.128,
      lineHeight: 1.3,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '40px',
      fontWeight: 400,
      letterSpacing: -1.128,
      lineHeight: 1.3,
    },
  },
  /**
   * fontSize: 36px
   * letterSpacing: -0.972
   * lineHeight: 1.334
   */
  title1: {
    /** fontWeight: 700 */
    bold: {
      fontSize: '36px',
      fontWeight: 700,
      letterSpacing: -0.972,
      lineHeight: 1.334,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '36px',
      fontWeight: 500,
      letterSpacing: -0.972,
      lineHeight: 1.334,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '36px',
      fontWeight: 400,
      letterSpacing: -0.972,
      lineHeight: 1.334,
    },
  },
  /**
   * fontSize: 28px
   * letterSpacing: -0.661
   * lineHeight: 1.358
   */
  title2: {
    /** fontWeight: 700 */
    bold: {
      fontSize: '28px',
      fontWeight: 700,
      letterSpacing: -0.661,
      lineHeight: 1.358,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '28px',
      fontWeight: 500,
      letterSpacing: -0.661,
      lineHeight: 1.358,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '28px',
      fontWeight: 400,
      letterSpacing: -0.661,
      lineHeight: 1.358,
    },
  },
  /**
   * fontSize: 24px
   * letterSpacing: -0.552
   * lineHeight: 1.36
   */
  title3: {
    /** fontWeight: 700 */
    bold: {
      fontSize: '24px',
      fontWeight: 700,
      letterSpacing: -0.552,
      lineHeight: 1.36,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '24px',
      fontWeight: 500,
      letterSpacing: -0.552,
      lineHeight: 1.36,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '24px',
      fontWeight: 400,
      letterSpacing: -0.552,
      lineHeight: 1.36,
    },
  },
  /**
   * fontSize: 22px
   * letterSpacing: -0.427
   * lineHeight: 1.364
   */
  heading1: {
    /** fontWeight: 600 */
    semibold: {
      fontSize: '22px',
      fontWeight: 600,
      letterSpacing: -0.427,
      lineHeight: 1.364,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '22px',
      fontWeight: 500,
      letterSpacing: -0.427,
      lineHeight: 1.364,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '22px',
      fontWeight: 400,
      letterSpacing: -0.427,
      lineHeight: 1.364,
    },
  },
  /**
   * fontSize: 18px
   * letterSpacing: -0.004
   * lineHeight: 1.445
   */
  headline1: {
    /** fontWeight: 600 */
    semibold: {
      fontSize: '18px',
      fontWeight: 600,
      letterSpacing: -0.004,
      lineHeight: 1.445,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '18px',
      fontWeight: 500,
      letterSpacing: -0.004,
      lineHeight: 1.445,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '18px',
      fontWeight: 400,
      letterSpacing: -0.004,
      lineHeight: 1.445,
    },
  },
  /**
   * fontSize: 16px
   * letterSpacing: 0.091
   * lineHeight: 1.5
   */
  body1normal: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: 0.091,
      lineHeight: 1.5,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '16px',
      fontWeight: 500,
      letterSpacing: 0.091,
      lineHeight: 1.5,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '16px',
      fontWeight: 600,
      letterSpacing: 0.091,
      lineHeight: 1.5,
    },
  },
  /**
   * fontSize: 16px
   * letterSpacing: 0.091
   * lineHeight: 1.625
   */
  body1reading: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '16px',
      fontWeight: 400,
      letterSpacing: 0.091,
      lineHeight: 1.625,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '16px',
      fontWeight: 500,
      letterSpacing: 0.091,
      lineHeight: 1.625,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '16px',
      fontWeight: 600,
      letterSpacing: 0.091,
      lineHeight: 1.625,
    },
  },
  /**
   * fontSize: 15px
   * letterSpacing: 0.144
   * lineHeight: 1.467
   */
  body2normal: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '15px',
      fontWeight: 400,
      letterSpacing: 0.144,
      lineHeight: 1.467,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '15px',
      fontWeight: 500,
      letterSpacing: 0.144,
      lineHeight: 1.467,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '15px',
      fontWeight: 600,
      letterSpacing: 0.144,
      lineHeight: 1.467,
    },
  },
  /**
   * fontSize: 15px
   * letterSpacing: 0.144
   * lineHeight: 1.6
   */
  body2reading: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '15px',
      fontWeight: 400,
      letterSpacing: 0.144,
      lineHeight: 1.6,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '15px',
      fontWeight: 500,
      letterSpacing: 0.144,
      lineHeight: 1.6,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '15px',
      fontWeight: 600,
      letterSpacing: 0.144,
      lineHeight: 1.6,
    },
  },
  /**
   * fontSize: 14px
   * letterSpacing: 0.203
   * lineHeight: 1.429
   */
  label1normal: {
    /** fontWeight: 600 */
    semibold: {
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: 0.203,
      lineHeight: 1.429,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: 0.203,
      lineHeight: 1.429,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: 0.203,
      lineHeight: 1.429,
    },
  },
  /**
   * fontSize: 14px
   * letterSpacing: 0.203
   * lineHeight: 1.571
   */
  label1reading: {
    /** fontWeight: 600 */
    semibold: {
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: 0.203,
      lineHeight: 1.571,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '14px',
      fontWeight: 500,
      letterSpacing: 0.203,
      lineHeight: 1.571,
    },
    /** fontWeight: 400 */
    regular: {
      fontSize: '14px',
      fontWeight: 400,
      letterSpacing: 0.203,
      lineHeight: 1.571,
    },
  },
  /**
   * fontSize: 12px
   * letterSpacing: 0.302
   * lineHeight: 1.334
   */
  caption1: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '12px',
      fontWeight: 400,
      letterSpacing: 0.302,
      lineHeight: 1.334,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '12px',
      fontWeight: 500,
      letterSpacing: 0.302,
      lineHeight: 1.334,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: 0.302,
      lineHeight: 1.334,
    },
  },
  /**
   * fontSize: 11px
   * letterSpacing: 0.342
   * lineHeight: 1.273
   */
  caption2: {
    /** fontWeight: 400 */
    regular: {
      fontSize: '11px',
      fontWeight: 400,
      letterSpacing: 0.342,
      lineHeight: 1.273,
    },
    /** fontWeight: 500 */
    medium: {
      fontSize: '11px',
      fontWeight: 500,
      letterSpacing: 0.342,
      lineHeight: 1.273,
    },
    /** fontWeight: 600 */
    semibold: {
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: 0.342,
      lineHeight: 1.273,
    },
  },
};

const radius = {
  4: '4px',
  6: '6px',
  8: '8px',
  12: '12px',
  16: '16px',
  20: '20px',
  24: '24px',
  32: '32px',
  48: '48px',
  full: '100%',
};

const shadow = {
  normal: '0px 5px 15px 0px #00000008, 0px 1px 8px 0px #00000008',
  emphasize: '0px 0px 2px 0px #0000000d, 0px 1px 5px 0px #0000000d, 0px 5px 12px 0px #0000000d',
  strong: '0px 0px 4px 0px #00000014, 0px 4px 8px 0px #00000014, 0px 6px 12px 0px #0000001f',
  heavy: '0px 0px 8px 0px #00000014, 0px 8px 16px 0px #00000014, 0px 16px 20px 0px #0000001f',
};

const theme = {
  palette,
  color,
  font,
  radius,
  shadow,
};

export type themeColor = typeof color;
export type themeFont = typeof font;

const breakpoints = [720, 480];

const media = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export { theme, media };
