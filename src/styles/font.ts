const fontWeight = {
  /** fontWeight: 700 */ bold: 700,
  /** fontWeight: 600 */ semibold: 600,
  /** fontWeight: 500 */ medium: 500,
  /** fontWeight: 400 */ regular: 400,
};

const fontStyle = {
  /**
  /* fontSize: 56px
  /* lineHeight: 72px (1.286)
  /* letterSpacing: -0.0319em
   */
  display1: {
    fontSize: '56px',
    lineHeight: '72px',
    letterSpacing: '-0.0319em',
  },
  /**
  /* fontSize: 40px
  /* lineHeight: 52px (1.3)
  /* letterSpacing: -0.0282em
   */
  display2: {
    fontSize: '40px',
    lineHeight: '52px',
    letterSpacing: '-0.0282em',
  },
  /**
  /* fontSize: 36px
  /* lineHeight: 48px (1.334)
  /* letterSpacing: -0.027em
   */
  title1: {
    fontSize: '36px',
    lineHeight: '48px',
    letterSpacing: '-0.027em',
  },
  /**
  /* fontSize: 28px
  /* lineHeight: 38px (1.358)
  /* letterSpacing: -0.0236em
   */
  title2: {
    fontSize: '28px',
    lineHeight: '38px',
    letterSpacing: '-0.0236em',
  },
  /**
  /* fontSize: 24px
  /* lineHeight: 32px (1.36)
  /* letterSpacing: -0.023em
   */
  title3: {
    fontSize: '24px',
    lineHeight: '32px',
    letterSpacing: '-0.023em',
  },
  /**
  /* fontSize: 22px
  /* lineHeight: 30px (1.364)
  /* letterSpacing: -0.0194em
   */
  heading1: {
    fontSize: '22px',
    lineHeight: '30px',
    letterSpacing: '-0.0194em',
  },
  /**
  /* fontSize: 18px
  /* lineHeight: 26px (1.445)
  /* letterSpacing: -0.0002em
   */
  headline1: {
    fontSize: '18px',
    lineHeight: '26px',
    letterSpacing: '-0.0002em',
  },
  /**
  /* fontSize: 16px
  /* lineHeight: 24px (1.5)
  /* letterSpacing: 0.0057em
   */
  body1normal: {
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.0057em',
  },
  /**
  /* fontSize: 16px
  /* lineHeight: 26px (1.625)
  /* letterSpacing: 0.0057em
   */
  body1reading: {
    fontSize: '16px',
    lineHeight: '26px',
    letterSpacing: '0.0057em',
  },
  /**
  /* fontSize: 15px
  /* lineHeight: 22px (1.467)
  /* letterSpacing: 0.0096em
   */
  body2normal: {
    fontSize: '15px',
    lineHeight: '22px',
    letterSpacing: '0.0096em',
  },
  /**
  /* fontSize: 15px
  /* lineHeight: 24px (1.6)
  /* letterSpacing: 0.0096em
   */
  body2reading: {
    fontSize: '15px',
    lineHeight: '24px',
    letterSpacing: '0.0096em',
  },
  /**
  /* fontSize: 14px
  /* lineHeight: 20px (1.429)
  /* letterSpacing: 0.0145em
   */
  label1normal: {
    fontSize: '14px',
    lineHeight: '20px',
    letterSpacing: '0.0145em',
  },
  /**
  /* fontSize: 14px
  /* lineHeight: 21px (1.571)
  /* letterSpacing: 0.0145em
   */
  label1reading: {
    fontSize: '14px',
    lineHeight: '21px',
    letterSpacing: '0.0145em',
  },
  /**
  /* fontSize: 12px
  /* lineHeight: 16px (1.334)
  /* letterSpacing: 0.0252em
   */
  caption1: {
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.0252em',
  },
  /**
  /* fontSize: 11px
  /* lineHeight: 14px (1.273)
  /* letterSpacing: 0.0311em
   */
  caption2: {
    fontSize: '11px',
    lineHeight: '14px',
    letterSpacing: '0.0311em',
  },
};
const font = {
  /**
   * Typography scale: Display 1
   *
   * - **fontSize**: 56px
   * - **lineHeight**: 72px (1.286)
   * - **letterSpacing**: -0.0319em
   */
  display1: {
    /**
     * Display 1 Bold style
     *
     * - **fontSize**: 56px
     * - **lineHeight**: 72px (1.286)
     * - **letterSpacing**: -0.0319em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['display1'],
      fontWeight: fontWeight['bold'],
    },
    /**
     * Display 1 Medium style
     *
     * - **fontSize**: 56px
     * - **lineHeight**: 72px (1.286)
     * - **letterSpacing**: -0.0319em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['display1'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Display 1 Regular style
     *
     * - **fontSize**: 56px
     * - **lineHeight**: 72px (1.286)
     * - **letterSpacing**: -0.0319em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['display1'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Display 2
   *
   * - **fontSize**: 40px
   * - **lineHeight**: 52px (1.3)
   * - **letterSpacing**: -0.0282em
   */
  display2: {
    /**
     * Display 2 Bold style
     *
     * - **fontSize**: 40px
     * - **lineHeight**: 52px (1.3)
     * - **letterSpacing**: -0.0282em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['display2'],
      fontWeight: fontWeight['bold'],
    },
    /**
     * Display 2 Medium style
     *
     * - **fontSize**: 40px
     * - **lineHeight**: 52px (1.3)
     * - **letterSpacing**: -0.0282em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['display2'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Display 2 Regular style
     *
     * - **fontSize**: 40px
     * - **lineHeight**: 52px (1.3)
     * - **letterSpacing**: -0.0282em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['display2'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Title1
   *
   * - **fontSize**: 36px
   * - **lineHeight**: 48px (1.334)
   * - **letterSpacing**: -0.027em
   */
  title1: {
    /**
     * Title1 Bold style
     *
     * - **fontSize**: 36px
     * - **lineHeight**: 48px (1.334)
     * - **letterSpacing**: -0.027em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['title1'],
      fontWeight: fontWeight['bold'],
    },
    /**
     * Title1 Medium style
     *
     * - **fontSize**: 36px
     * - **lineHeight**: 48px (1.334)
     * - **letterSpacing**: -0.027em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['title1'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Title1 Regular style
     *
     * - **fontSize**: 36px
     * - **lineHeight**: 48px (1.334)
     * - **letterSpacing**: -0.027em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['title1'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Title2
   *
   * - **fontSize**: 28px
   * - **lineHeight**: 38px (1.358)
   * - **letterSpacing**: -0.0236em
   */
  title2: {
    /**
     * Title2 Bold style
     *
     * - **fontSize**: 28px
     * - **lineHeight**: 38px (1.358)
     * - **letterSpacing**: -0.0236em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['title2'],
      fontWeight: fontWeight['bold'],
    },
    /**
     * Title2 Medium style
     *
     * - **fontSize**: 28px
     * - **lineHeight**: 38px (1.358)
     * - **letterSpacing**: -0.0236em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['title2'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Title2 Regular style
     *
     * - **fontSize**: 28px
     * - **lineHeight**: 38px (1.358)
     * - **letterSpacing**: -0.0236em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['title2'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Title3
   *
   * - **fontSize**: 24px
   * - **lineHeight**: 32px (1.36)
   * - **letterSpacing**: -0.023em
   */
  title3: {
    /**
     * Title3 Bold style
     *
     * - **fontSize**: 24px
     * - **lineHeight**: 32px (1.36)
     * - **letterSpacing**: -0.023em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['title3'],
      fontWeight: fontWeight['bold'],
    },
    /**
     * Title3 Medium style
     *
     * - **fontSize**: 24px
     * - **lineHeight**: 32px (1.36)
     * - **letterSpacing**: -0.023em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['title3'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Title3 Regular style
     *
     * - **fontSize**: 24px
     * - **lineHeight**: 32px (1.36)
     * - **letterSpacing**: -0.023em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['title3'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Heading 1
   *
   * - **fontSize**: 22px
   * - **lineHeight**: 30px (1.364)
   * - **letterSpacing**: -0.0194em
   */
  heading1: {
    /**
     * Heading 1 Semibold style
     *
     * - **fontSize**: 22px
     * - **lineHeight**: 30px (1.364)
     * - **letterSpacing**: -0.0194em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['heading1'],
      fontWeight: fontWeight['semibold'],
    },
    /**
     * Heading 1 Medium style
     *
     * - **fontSize**: 22px
     * - **lineHeight**: 30px (1.364)
     * - **letterSpacing**: -0.0194em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['heading1'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Heading 1 Regular style
     *
     * - **fontSize**: 22px
     * - **lineHeight**: 30px (1.364)
     * - **letterSpacing**: -0.0194em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['heading1'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Headline 1
   *
   * - **fontSize**: 18px
   * - **lineHeight**: 26px (1.445)
   * - **letterSpacing**: -0.0002em
   */
  headline1: {
    /**
     * Headline 1 Semibold style
     *
     * - **fontSize**: 18px
     * - **lineHeight**: 26px (1.445)
     * - **letterSpacing**: -0.0002em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['headline1'],
      fontWeight: fontWeight['semibold'],
    },
    /**
     * Headline 1 Medium style
     *
     * - **fontSize**: 18px
     * - **lineHeight**: 26px (1.445)
     * - **letterSpacing**: -0.0002em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['headline1'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Headline 1 Regular style
     *
     * - **fontSize**: 18px
     * - **lineHeight**: 26px (1.445)
     * - **letterSpacing**: -0.0002em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['headline1'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Body 1 - Normal
   *
   * - **fontSize**: 16px
   * - **lineHeight**: 24px (1.5)
   * - **letterSpacing**: 0.0057em
   */
  body1normal: {
    /**
     * Body 1 - Normal Regular style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 24px (1.5)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['body1normal'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Body 1 - Normal Medium style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 24px (1.5)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['body1normal'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Body 1 - Normal Semibold style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 24px (1.5)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['body1normal'],
      fontWeight: fontWeight['semibold'],
    },
    /**
     * Body 1 - Normal Bold style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 24px (1.5)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 700
     */
    bold: {
      ...fontStyle['body1normal'],
      fontWeight: fontWeight['bold'],
    },
  },
  /**
   * Typography scale: Body 1 - Reading
   *
   * - **fontSize**: 16px
   * - **lineHeight**: 26px (1.625)
   * - **letterSpacing**: 0.0057em
   */
  body1reading: {
    /**
     * Body 1 - Reading Regular style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 26px (1.625)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['body1reading'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Body 1 - Reading Medium style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 26px (1.625)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['body1reading'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Body 1 - Reading Semibold style
     *
     * - **fontSize**: 16px
     * - **lineHeight**: 26px (1.625)
     * - **letterSpacing**: 0.0057em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['body1reading'],
      fontWeight: fontWeight['semibold'],
    },
  },
  /**
   * Typography scale: Body 2 - Normal
   *
   * - **fontSize**: 15px
   * - **lineHeight**: 22px (1.467)
   * - **letterSpacing**: 0.0096em
   */
  body2normal: {
    /**
     * Body 2 - Normal Regular style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 22px (1.467)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['body2normal'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Body 2 - Normal Medium style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 22px (1.467)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['body2normal'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Body 2 - Normal Semibold style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 22px (1.467)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['body2normal'],
      fontWeight: fontWeight['semibold'],
    },
  },
  /**
   * Typography scale: Body 2 - Reading
   *
   * - **fontSize**: 15px
   * - **lineHeight**: 24px (1.6)
   * - **letterSpacing**: 0.0096em
   */
  body2reading: {
    /**
     * Body 2 - Reading Regular style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 24px (1.6)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['body2reading'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Body 2 - Reading Medium style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 24px (1.6)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['body2reading'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Body 2 - Reading Semibold style
     *
     * - **fontSize**: 15px
     * - **lineHeight**: 24px (1.6)
     * - **letterSpacing**: 0.0096em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['body2reading'],
      fontWeight: fontWeight['semibold'],
    },
  },
  /**
   * Typography scale: Label 1 - Normal
   *
   * - **fontSize**: 14px
   * - **lineHeight**: 20px (1.429)
   * - **letterSpacing**: 0.0145em
   */
  label1normal: {
    /**
     * Label 1 - Normal Semibold style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 20px (1.429)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['label1normal'],
      fontWeight: fontWeight['semibold'],
    },
    /**
     * Label 1 - Normal Medium style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 20px (1.429)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['label1normal'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Label 1 - Normal Regular style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 20px (1.429)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['label1normal'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Label 1 - Reading
   *
   * - **fontSize**: 14px
   * - **lineHeight**: 21px (1.571)
   * - **letterSpacing**: 0.0145em
   */
  label1reading: {
    /**
     * Label 1 - Reading Semibold style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 21px (1.571)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['label1reading'],
      fontWeight: fontWeight['semibold'],
    },
    /**
     * Label 1 - Reading Medium style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 21px (1.571)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['label1reading'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Label 1 - Reading Regular style
     *
     * - **fontSize**: 14px
     * - **lineHeight**: 21px (1.571)
     * - **letterSpacing**: 0.0145em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['label1reading'],
      fontWeight: fontWeight['regular'],
    },
  },
  /**
   * Typography scale: Caption 1
   *
   * - **fontSize**: 12px
   * - **lineHeight**: 16px (1.334)
   * - **letterSpacing**: 0.0252em
   */
  caption1: {
    /**
     * Caption 1 Regular style
     *
     * - **fontSize**: 12px
     * - **lineHeight**: 16px (1.334)
     * - **letterSpacing**: 0.0252em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['caption1'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Caption 1 Medium style
     *
     * - **fontSize**: 12px
     * - **lineHeight**: 16px (1.334)
     * - **letterSpacing**: 0.0252em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['caption1'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Caption 1 Semibold style
     *
     * - **fontSize**: 12px
     * - **lineHeight**: 16px (1.334)
     * - **letterSpacing**: 0.0252em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['caption1'],
      fontWeight: fontWeight['semibold'],
    },
  },
  /**
   * Typography scale: Caption 2
   *
   * - **fontSize**: 11px
   * - **lineHeight**: 14px (1.273)
   * - **letterSpacing**: 0.0311em
   */
  caption2: {
    /**
     * Caption 2 Regular style
     *
     * - **fontSize**: 11px
     * - **lineHeight**: 14px (1.273)
     * - **letterSpacing**: 0.0311em
     * - **fontWeight**: 400
     */
    regular: {
      ...fontStyle['caption2'],
      fontWeight: fontWeight['regular'],
    },
    /**
     * Caption 2 Medium style
     *
     * - **fontSize**: 11px
     * - **lineHeight**: 14px (1.273)
     * - **letterSpacing**: 0.0311em
     * - **fontWeight**: 500
     */
    medium: {
      ...fontStyle['caption2'],
      fontWeight: fontWeight['medium'],
    },
    /**
     * Caption 2 Semibold style
     *
     * - **fontSize**: 11px
     * - **lineHeight**: 14px (1.273)
     * - **letterSpacing**: 0.0311em
     * - **fontWeight**: 600
     */
    semibold: {
      ...fontStyle['caption2'],
      fontWeight: fontWeight['semibold'],
    },
  },
};

export default font;
