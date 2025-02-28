import React from 'react';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import RadioPageMain from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import preprocessor from '#lib/utilities/preprocessor';
import { radioPagePreprocessorRules } from '#app/routes/getInitialData/utils/preprocessorRulesConfig';

describe('Radio Page Main', () => {
  it('should match snapshot for Canonical', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );

    await matchSnapshotAsync(
      <ServiceContextProvider service="amharic">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp={false}
          pageType="media"
          pathname="/pathname"
          service="amharic"
          statusCode={200}
        >
          <RadioPageMain service="amharic" pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );

    await matchSnapshotAsync(
      <ServiceContextProvider service="amharic">
        <RequestContextProvider
          bbcOrigin="https://www.test.bbc.co.uk"
          isAmp
          pageType="media"
          pathname="/pathname"
          service="amharic"
          statusCode={200}
        >
          <RadioPageMain service="amharic" pageData={pageData} />
        </RequestContextProvider>
      </ServiceContextProvider>,
    );
  });
});
