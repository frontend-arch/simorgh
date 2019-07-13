import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import getContextDecorator from '../../../../.storybook/helpers/getContextDecorator';
import CopyrightContainer from '.';

storiesOf('Copyright', module)
  .addDecorator(withKnobs)
  .addDecorator(getContextDecorator())
  .add('default', () => <CopyrightContainer>Joe Bloggs</CopyrightContainer>);
