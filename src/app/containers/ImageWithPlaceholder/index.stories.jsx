import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  ImageWithPlaceholder,
  AmpImageWithPlaceholder,
  LazyLoadImageWithPlaceholder,
} from './fixtureData';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

storiesOf('Image With Placeholder/canonical', module)
  .add('default', () => <ImageWithPlaceholder />)
  .add('with a lazyloaded image', () => <LazyLoadImageWithPlaceholder />);

storiesOf('Image With Placeholder/amp', module)
  .addDecorator(AmpDecorator)
  .add('default', () => <AmpImageWithPlaceholder />);
