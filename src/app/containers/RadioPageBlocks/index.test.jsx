import React from 'react';
import path from 'ramda/src/path';
import { latin } from '@bbc/gel-foundations/scripts';
import { matchSnapshotAsync } from '@bbc/psammead-test-helpers';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import RadioPageBlocks from '.';
import amharicPageData from '#data/amharic/bbc_amharic_radio/liveradio';
import preprocessor from '#lib/utilities/preprocessor';
import { radioPagePreprocessorRules } from '#app/routes/getInitialData/utils/preprocessorRulesConfig';

const serviceContextMock = {
  service: 'amharic',
  script: latin,
  lang: 'am',
  translations: { mediaAssetPage: { audioPlayer: 'Audio player' } },
};

describe('Radio Page Blocks', () => {
  it('should match snapshot for Canonical', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );
    const blocks = path(['content', 'blocks'], pageData);

    await matchSnapshotAsync(
      <ServiceContext.Provider value={serviceContextMock}>
        <RequestContext.Provider
          value={{
            platform: 'canonical',
            pageType: 'media',
            origin: 'http://localhost:7080',
          }}
        >
          <RadioPageBlocks blocks={blocks} />
        </RequestContext.Provider>
      </ServiceContext.Provider>,
    );
  });

  it('should match snapshot for AMP', async () => {
    const pageData = await preprocessor(
      amharicPageData,
      radioPagePreprocessorRules,
    );
    const blocks = path(['content', 'blocks'], pageData);

    await matchSnapshotAsync(
      <ServiceContext.Provider value={serviceContextMock}>
        <RequestContext.Provider
          value={{
            platform: 'amp',
            pageType: 'media',
            origin: 'http://localhost:7080',
          }}
        >
          <RadioPageBlocks blocks={blocks} />
        </RequestContext.Provider>
      </ServiceContext.Provider>,
    );
  });
});
