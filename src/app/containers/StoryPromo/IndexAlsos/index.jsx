import React, { useContext, Fragment } from 'react';
import { arrayOf, shape, oneOf, number, string } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import pathOr from 'ramda/src/pathOr';
import MediaIndicator from '@bbc/psammead-media-indicator';
import {
  IndexAlsos,
  IndexAlso,
  IndexAlsosUl,
  IndexAlsosLi,
} from '@bbc/psammead-story-promo/index-alsos';
import { ServiceContext } from '#contexts/ServiceContext';

const MAX_NUM_INDEX_ALSOS = 3; // Cap the number of Index Alsos at 3.

const getMediaType = (cpsType, mediaType) => {
  const isPGL = cpsType === 'PGL';
  const isMedia = cpsType === 'MAP';
  const media = mediaType || 'Video';

  if (!isPGL && !isMedia) {
    return null;
  }

  return isPGL ? 'photogallery' : media.toLowerCase();
};

const buildIndexAlsosMediaIndicator = (cpsType, mediaType, service) => {
  const indexAlsosMediaType = getMediaType(cpsType, mediaType);

  return (
    indexAlsosMediaType && (
      <MediaIndicator service={service} type={indexAlsosMediaType} indexAlsos />
    )
  );
};

/*
 * When there are more than one Index Alsos, they should be wrapped in a list item `IndexAlsosLi` within an unordered list `IndexAlsosUl`.
 * On the other hand, when there is exactly one Index Also, it should use the `IndexAlso` component and it should not be contained within a list.
 */
const IndexAlsosContainer = ({ alsoItems, script, service, dir }) => {
  const {
    translations: { media: mediaTranslations, relatedContent },
  } = useContext(ServiceContext);

  const IndexAlsosWrapper = alsoItems.length > 1 ? IndexAlsosUl : Fragment;
  const IndexAlsoItem = alsoItems.length > 1 ? IndexAlsosLi : IndexAlso;

  return (
    <IndexAlsos offScreenText={relatedContent} data-e2e="index-alsos">
      <IndexAlsosWrapper>
        {alsoItems.slice(0, MAX_NUM_INDEX_ALSOS).map(item => {
          const { id, cpsType, mediaType } = item;
          const headline = pathOr(null, ['headlines', 'headline'], item);
          const url = pathOr(null, ['locators', 'assetUri'], item);
          const indexAlsoMediaIndicator = buildIndexAlsosMediaIndicator(
            cpsType,
            mediaType,
            service,
          );
          const indexAlsoMediaType =
            mediaTranslations[getMediaType(cpsType, mediaType)];

          return (
            <IndexAlsoItem
              key={id}
              script={script}
              service={service}
              url={url}
              dir={dir}
              mediaIndicator={indexAlsoMediaIndicator}
              mediaType={indexAlsoMediaType}
            >
              {headline}
            </IndexAlsoItem>
          );
        })}
      </IndexAlsosWrapper>
    </IndexAlsos>
  );
};

const alsoItemsPropTypes = shape({
  headlines: shape({
    headline: string.isRequired,
  }).isRequired,
  locators: shape({
    assetUri: string.isRequired,
    cpsUrn: string,
  }).isRequired,
  summary: string,
  timestamp: number,
  cpsType: string.isRequired,
  id: string.isRequired,
  type: string,
});

IndexAlsosContainer.propTypes = {
  alsoItems: arrayOf(alsoItemsPropTypes).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
};

IndexAlsosContainer.defaultProps = {
  dir: 'ltr',
};

export default IndexAlsosContainer;
