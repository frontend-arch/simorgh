import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import getContextDecorator from '../../../../.storybook/helpers/getContextDecorator';
import Footer from '.';

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .addDecorator(getContextDecorator())
  .add('default', () => <Footer />);
