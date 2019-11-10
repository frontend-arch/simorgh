import { setWindowValue, resetWindowValue } from '@bbc/psammead-test-helpers';
import onClient from '.';

const windowLocation = window.location;

describe('onClient', () => {
  beforeEach(() => {
    resetWindowValue('location', windowLocation);
  });

  it('returns true when window location is available', () => {
    setWindowValue('location', true);

    expect(onClient()).toBeTruthy();
  });

  it('returns false when window location is not', () => {
    setWindowValue('location', false);

    expect(onClient()).not.toBeTruthy();
  });
});
