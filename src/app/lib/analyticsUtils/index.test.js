import Cookie from 'js-cookie';
import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import onClient from '../utilities/onClient';

let isOnClient = true;

jest.mock('../utilities/onClient', () => jest.fn());
onClient.mockImplementation(() => isOnClient);

const {
  getDestination,
  getScreenInfo,
  getBrowserViewPort,
  getCurrentTime,
  getDeviceLanguage,
  getAppType,
  getHref,
  getReferrer,
  getPublishedDatetime,
  getAtUserId,
  sanitise,
  getProducer,
  getAtiUrl,
  getClickInfo,
} = require('./index');

let locServeCookieValue;

const returnsNullWhenOffClient = func => {
  describe('returns null when not on client', () => {
    beforeEach(() => {
      isOnClient = false;
    });

    afterEach(() => {
      isOnClient = true;
    });

    it('should find value in good data', () => {
      expect(func()).toEqual(null);
    });
  });
};

describe('getDestination', () => {
  const getDestinationTestScenarios = [
    {
      statsDestination: 'NEWS_PS',
      expected: 598285,
      summary: 'should return for live uk for News',
    },
    {
      statsDestination: 'NEWS_GNL',
      expected: 598287,
      summary: 'should return for live international for News',
    },
    {
      statsDestination: 'NEWS_PS_TEST',
      expected: 598286,
      summary: 'should return for test uk for News',
    },
    {
      statsDestination: 'NEWS_GNL_TEST',
      expected: 598288,
      summary: 'should return for test international for News',
    },
    {
      statsDestination: 'WS_NEWS_LANGUAGES',
      expected: 598342,
      summary: 'should return for live WS',
    },
    {
      statsDestination: 'WS_NEWS_LANGUAGES_TEST',
      expected: 598343,
      summary: 'should return for test WS',
    },
    {
      statsDestination: 'PLACEHOLDER',
      expected: 598295,
      summary: 'should return for live Scotland',
    },
    {
      statsDestination: 'PLACEHOLDER_TEST',
      expected: 598297,
      summary: 'should return for test Scotland',
    },
    {
      statsDestination: undefined,
      expected: 598285,
      summary: 'should return for live uk statsDestination is undefined',
    },
    {
      statsDestination: null,
      expected: 598285,
      summary: 'should return for live uk statsDestination is null',
    },
  ];

  getDestinationTestScenarios.forEach(
    ({ statsDestination, expected, summary }) => {
      it(summary, () => {
        const destination = getDestination(statsDestination);
        expect(destination).toEqual(expected);
      });
    },
  );
});

describe('getAppType', () => {
  const getAppTypeScenarios = [
    {
      platform: 'amp',
      expected: 'amp',
      summary: 'should return amp for amp',
    },
    {
      platform: 'canonical',
      expected: 'responsive',
      summary: 'should return responsive for amp',
    },
    {
      platform: null,
      expected: 'responsive',
      summary: 'should return responsive for null',
    },
    {
      platform: undefined,
      expected: 'responsive',
      summary: 'should return responsive for undefined',
    },
  ];

  getAppTypeScenarios.forEach(({ platform, expected, summary }) => {
    it(summary, () => {
      const appType = getAppType(platform);
      expect(appType).toEqual(expected);
    });
  });
});

describe('getScreenInfo', () => {
  const windowScreen = window.screen;

  afterEach(() => {
    resetWindowValue('screen', windowScreen);
  });

  returnsNullWhenOffClient(getScreenInfo);

  it('should concat screen values, joined by "x"', () => {
    setWindowValue('screen', {
      width: 1,
      height: 2,
      colorDepth: 3,
      pixelDepth: 4,
    });

    const screenInfo = getScreenInfo();

    expect(screenInfo).toEqual('1x2x3x4');
  });

  it('should use 0 to fill unknown values', () => {
    setWindowValue('screen', {
      width: 1,
      height: 2,
      colorDepth: null,
      pixelDepth: null,
    });

    const screenInfo = getScreenInfo();

    expect(screenInfo).toEqual('1x2x0x0');
  });
});

describe('getBrowserViewPort', () => {
  const windowInnerWidth = window.innerWidth;
  const windowInnerHeight = window.innerHeight;

  afterEach(() => {
    resetWindowValue('innerWidth', windowInnerWidth);
    resetWindowValue('innerHeight', windowInnerHeight);
  });

  returnsNullWhenOffClient(getBrowserViewPort);

  it('should concat values, joined by "x"', () => {
    setWindowValue('innerWidth', 1234);
    setWindowValue('innerHeight', 4321);

    const browserViewPort = getBrowserViewPort();

    expect(browserViewPort).toEqual('1234x4321');
  });

  it('should use 0 to fill unknown values', () => {
    setWindowValue('innerWidth', null);
    setWindowValue('innerHeight', 4321);

    const browserViewPort = getBrowserViewPort();

    expect(browserViewPort).toEqual('0x4321');
  });
});

describe('getCurrentTime', () => {
  const originalDate = global.Date;

  afterEach(() => {
    global.Date = originalDate;
  });

  returnsNullWhenOffClient(getCurrentTime);

  it('should return hours, mins and seconds joined by "x"', () => {
    const mockDate = {
      getHours: jest.fn().mockReturnValue('12'),
      getMinutes: jest.fn().mockReturnValue('23'),
      getSeconds: jest.fn().mockReturnValue('45'),
    };
    global.Date = jest.fn(() => mockDate);

    const ATITime = getCurrentTime();

    expect(ATITime).toEqual('12x23x45');
  });
});

describe('getDeviceLanguage', () => {
  const windowNavigator = window.navigator;

  afterEach(() => {
    resetWindowValue('navigator', windowNavigator);
  });

  returnsNullWhenOffClient(getDeviceLanguage);

  it('should return navigator language', () => {
    setWindowValue('navigator', {
      language: 'abc',
    });

    const deviceLanguage = getDeviceLanguage();

    expect(deviceLanguage).toEqual('abc');
  });

  it('should return null if langage isnt set', () => {
    setWindowValue('navigator', {
      language: null,
    });

    const deviceLanguage = getDeviceLanguage();

    expect(deviceLanguage).toEqual(null);
  });
});

describe('isLocServeCookieSet', () => {
  beforeEach(() => {
    jest.mock('js-cookie', () => jest.fn());
    Cookie.get = jest.fn();
    Cookie.get.mockImplementation(() => locServeCookieValue);
  });

  // eslint-disable-next-line global-require
  returnsNullWhenOffClient(require('./index').isLocServeCookieSet);

  it('should return true if cookie is set', () => {
    const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = 'value';

    const locServeCookie = isLocServeCookieSet();

    expect(locServeCookie).toEqual(true);
  });

  it('should return false if cookie is not set', () => {
    const { isLocServeCookieSet } = require('./index'); // eslint-disable-line global-require

    locServeCookieValue = null;

    const locServeCookie = isLocServeCookieSet();

    expect(locServeCookie).toEqual(false);
  });
});

describe('getHref', () => {
  const windowLocation = window.location;

  afterEach(() => {
    resetWindowValue('location', windowLocation);
  });

  returnsNullWhenOffClient(getHref);

  it('should return location href', () => {
    setWindowValue('location', {
      href: 'https://href.com',
    });

    const href = getHref();

    expect(href).toEqual('https://href.com');
  });

  it('should return null if href isnt set', () => {
    setWindowValue('location', {
      href: null,
    });

    const href = getHref();

    expect(href).toEqual(null);
  });

  it('should return href with anchor text - encoding the hash', () => {
    setWindowValue('location', {
      href: 'https://www.example.com/#anchortext',
    });
    const href = getHref();
    expect(href).toEqual('https://www.example.com/%23anchortext');
  });
});

describe('getReferrer', () => {
  returnsNullWhenOffClient(getHref);

  it('should return document referrer', () => {
    Object.defineProperty(window.document, 'referrer', {
      configurable: true,
      value: 'https://referrer.com',
    });

    const referrer = getReferrer();

    expect(referrer).toEqual('https://referrer.com');
  });

  it('should return null if referrer isnt set', () => {
    Object.defineProperty(window.document, 'referrer', {
      configurable: true,
      value: null,
    });

    const referrer = getReferrer();

    expect(referrer).toEqual(null);
  });
});

describe('sanitise', () => {
  it('should replace all spaces with a + character', () => {
    expect(sanitise('hi hello there')).toEqual('hi+hello+there');
  });
});

describe('getPublishedDatetime', () => {
  const data = {
    metadata: {
      firstPublished: 946688461000,
      seconds: 1504785600000,
      invalidDate: 'foobar',
    },
  };

  it('should find value in good data', () => {
    const publishedTime = getPublishedDatetime('firstPublished', data);

    expect(publishedTime).toEqual('2000-01-01T01:01:01.000Z');
  });

  it('should autodetect timestamp in seconds and autocorrect', () => {
    const secondsTimestamp = getPublishedDatetime('seconds', data);

    expect(secondsTimestamp).toEqual('2017-09-07T12:00:00.000Z');
  });

  it('should return null if type not found', () => {
    const publishedTime = getPublishedDatetime('foobar', data);

    expect(publishedTime).toEqual(null);
  });

  it('should return null if timestamp is invalid', () => {
    const publishedTime = getPublishedDatetime('invalidDate', data);

    expect(publishedTime).toEqual(null);
  });
});

describe('getProducer', () => {
  it('should return a number', () => {
    expect(typeof Number(getProducer('news'))).toEqual('number');
  });
});

describe('getAtiUrl', () => {
  it('should return url', () => {
    const data = [
      {
        key: 'a',
        value: 'a1',
        wrap: false,
      },
      {
        key: 'b',
        value: 'b1',
        wrap: true,
      },
      {
        key: 'c',
        value: 'c1',
        wrap: false,
      },
    ];
    expect(getAtiUrl(data)).toEqual('a=a1&b=[b1]&c=c1');
  });

  it('should return empty string', () => {
    const data = [];
    expect(getAtiUrl(data)).toEqual('');
  });
});

describe('getClickInfo', () => {
  const params = {
    service: 'service',
    component: 'component',
    label: 'label',
    type: 'type',
  };

  it('should return url section', () => {
    expect(getClickInfo({}, params)).toEqual(
      'PUB-[service-component]-[=type]-[label]-[PAR=container-component::name~CHD=brand-top]-[]-[]-[]-[/]',
    );
  });

  it('should include elem.dataset.info in output', () => {
    expect(
      getClickInfo(
        {
          dataset: {
            info: 'data-info-attr',
          },
        },
        params,
      ),
    ).toContain('data-info-attr');
  });

  it('should include elem.href in output', () => {
    expect(
      getClickInfo(
        {
          href: 'http://foobar.com',
        },
        params,
      ),
    ).toContain('[http://foobar.com]');
  });
});

describe('getAtUserId', () => {
  returnsNullWhenOffClient(getAtUserId);

  it('should return AT user id when found', () => {
    Cookie.getJSON = jest.fn().mockReturnValue({ val: 'uuid' });
    const id = getAtUserId();
    expect(id).toEqual('uuid');
  });

  it('should return null if AT user id not found', () => {
    Cookie.getJSON = jest.fn().mockReturnValue(null);
    let id = getAtUserId();
    expect(id).toBeNull();

    Cookie.getJSON = jest.fn().mockReturnValue({});
    id = getAtUserId();
    expect(id).toBeNull();
  });
});
