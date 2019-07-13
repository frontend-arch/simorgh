import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import getContextDecorator from '../../../../.storybook/helpers/getContextDecorator';
import BrandContainer from '.';

storiesOf('Brand', module)
  .addDecorator(withKnobs)
  .addDecorator(getContextDecorator())
  .add('default', () => <BrandContainer />);
