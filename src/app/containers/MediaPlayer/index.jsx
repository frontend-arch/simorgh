import React, { useContext } from 'react';
import { string, bool } from 'prop-types';
import moment from 'moment-timezone';
import pathOr from 'ramda/src/pathOr';
import path from 'ramda/src/path';
import {
  CanonicalMediaPlayer,
  AmpMediaPlayer,
} from '@bbc/psammead-media-player';
import Caption from '../Caption';
import Metadata from './Metadata';
import embedUrl from './helpers/embedUrl';
import { getPlaceholderSrcSet } from '#lib/utilities/srcSet';
import filterForBlockType from '#lib/utilities/blockHandlers';
import formatDuration from '#lib/utilities/formatDuration';
import buildIChefURL from '#lib/utilities/ichefURL';
import useToggle from '../Toggle/useToggle';
import { RequestContext } from '#contexts/RequestContext';
import { ServiceContext } from '#contexts/ServiceContext';
import {
  mediaPlayerPropTypes,
  emptyBlockArrayDefaultProps,
} from '#models/propTypes';

const DEFAULT_WIDTH = 512;
const MediaPlayerContainer = ({
  blocks,
  assetId,
  assetType,
  showPlaceholder,
}) => {
  const { platform, origin } = useContext(RequestContext);
  const { lang, translations, service } = useContext(ServiceContext);
  const { enabled } = useToggle('mediaPlayer');
  const isAmp = platform === 'amp';

  if (!enabled || !blocks) {
    return null;
  }

  const aresMediaBlock = filterForBlockType(blocks, 'aresMedia');
  const captionBlock = filterForBlockType(blocks, 'caption');

  if (!aresMediaBlock) {
    return null;
  }

  const { originCode, locator } = path(
    ['model', 'blocks', 1, 'model', 'blocks', 0, 'model'],
    aresMediaBlock,
  );
  const versionId = path(
    ['model', 'blocks', 0, 'model', 'versions', 0, 'versionId'],
    aresMediaBlock,
  );
  const format = path(
    ['model', 'blocks', 0, 'model', 'format'],
    aresMediaBlock,
  );
  const rawDuration = path(
    ['model', 'blocks', 0, 'model', 'versions', 0, 'duration'],
    aresMediaBlock,
  );
  const duration = moment.duration(rawDuration, 'seconds');

  const mediaInfo = {
    title: path(['model', 'blocks', 0, 'model', 'title'], aresMediaBlock),
    duration: formatDuration(duration),
    durationSpoken: formatDuration(duration, ','),
    datetime: path(
      ['model', 'blocks', 0, 'model', 'versions', 0, 'durationISO8601'],
      aresMediaBlock,
    ),
    type: format === 'audio' ? 'audio' : 'video',
  };

  if (!versionId) {
    return null; // this should be the holding image with an error overlay
  }

  const placeholderSrcset = getPlaceholderSrcSet({ originCode, locator });
  const placeholderSrc = buildIChefURL({
    originCode,
    locator,
    resolution: DEFAULT_WIDTH,
  });
  const embedSource = embedUrl({
    requestUrl: `${assetId}/${versionId}/${lang}`,
    type: assetType,
    isAmp,
    origin,
  });
  const iframeTitle = pathOr(
    'Media player',
    ['mediaAssetPage', 'mediaPlayer'],
    translations,
  );

  return (
    <>
      <Metadata aresMediaBlock={aresMediaBlock} />
      {isAmp ? (
        <AmpMediaPlayer
          src={embedSource}
          placeholderSrc={placeholderSrc}
          placeholderSrcset={placeholderSrcset}
          title={iframeTitle}
        />
      ) : (
        <CanonicalMediaPlayer
          src={embedSource}
          placeholderSrc={showPlaceholder ? placeholderSrc : null}
          placeholderSrcset={placeholderSrcset}
          showPlaceholder={showPlaceholder}
          title={iframeTitle}
          service={service}
          mediaInfo={mediaInfo}
        />
      )}
      {captionBlock && <Caption block={captionBlock} type={mediaInfo.type} />}
    </>
  );
};

MediaPlayerContainer.propTypes = {
  ...mediaPlayerPropTypes,
  assetId: string.isRequired,
  assetType: string.isRequired,
  showPlaceholder: bool.isRequired,
};
MediaPlayerContainer.defaultProps = {
  ...emptyBlockArrayDefaultProps,
};

export default MediaPlayerContainer;
