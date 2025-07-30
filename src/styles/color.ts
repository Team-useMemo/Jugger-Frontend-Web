import palette from './palette';

const color = {
  /** primary */
  primary: {
    /** #0066ffff */ normal: palette['blue']['50'],
    /** #57dff7ff */ sub2: palette['cyan']['70'],
    /** #0054d1ff */ sub1: palette['blue']['40'],
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
    /** #171719 */ inverse: '#171719',
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

export default color;
