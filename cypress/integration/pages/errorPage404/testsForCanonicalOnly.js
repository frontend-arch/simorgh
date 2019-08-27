import config from '../../../support/config/services';

// For testing important features that differ between services, e.g. Timestamps.
// Inline conditional logic limiting tests to only those service/s which are different are encouraged.
export const testsThatAlwaysRunForCanonicalOnly = ({ service, pageType }) => {
  describe(`No testsToAlwaysRunForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};

// For testing feastures that may differ across services but share a common logic e.g. translated strings.
export const testsThatFollowSmokeTestConfigForCanonicalOnly = ({
  service,
  pageType,
}) =>
  describe(`Canonical Tests for ${service} ${pageType}`, () => {
    it('should return a 404 error code', () => {
      cy.testResponseCodeAndType(
        config[service].pageTypes.errorPage404.path,
        404,
        'text/html',
      );
    });
  });

// For testing low priority things e.g. cosmetic differences, and a safe place to put slow tests.
export const testsThatNeverRunDuringSmokeTestingForCanonicalOnly = ({
  service,
  pageType,
}) => {
  describe(`No testsToNeverSmokeTestForCanonicalOnly to run for ${service} ${pageType}`, () => {});
};
