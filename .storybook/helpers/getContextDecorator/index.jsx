import React from 'react';
import { inputProvider } from '@bbc/psammead-storybook-helpers';
import { ServiceContext } from '../../../src/app/contexts/ServiceContext';
import { RequestContextProvider } from '../../../src/app/contexts/RequestContext';
import services from '../../../src/app/lib/config/services';

const getContextDecorator = ({ slots, pageType, platform } = {}) => storyFn => {
  const renderFn = ({ slotTexts, script, dir, service }) => (
    <ServiceContext.Provider value={services[service]}>
      <RequestContextProvider
        bbcOrigin="https://www.bbc.com"
        id="c000000000"
        isAmp={platform === 'amp'}
        pageType={pageType || 'canonical'}
        service={service}
      >
        {storyFn({ slotTexts, script, dir, service })}
      </RequestContextProvider>
    </ServiceContext.Provider>
  );

  const decoratedComponent = inputProvider(
    slots,
    renderFn,
    Object.keys(services),
  );
  return decoratedComponent();
};

export default getContextDecorator;
