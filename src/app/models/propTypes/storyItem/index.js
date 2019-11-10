import { shape, string, number } from 'prop-types';

export const storyItemImage = {
  path: string,
  altText: string,
  height: number,
  width: number,
};

export const storyItem = {
  headlines: shape({
    headline: string.isRequired,
  }),
  locators: shape({
    assetUri: string.isRequired,
  }),
  summary: string,
  timestamp: number,
  indexImage: shape(storyItemImage),
};

export const linkPromo = {
  name: string.isRequired,
  url: string.isRequired,
  summary: string,
  indexImage: shape(storyItemImage),
  timestamp: number,
};
