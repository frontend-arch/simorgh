import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import getContextDecorator from '../../../../.storybook/helpers/getContextDecorator';
import ErrorMain from '.';

storiesOf('Error Page', module)
  .addDecorator(withKnobs)
  .addDecorator(getContextDecorator())
  .add('404', () => <ErrorMain status={404} />)
  .add('500', () => <ErrorMain status={500} />);
