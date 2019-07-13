import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import getContextDecorator from '../../../../.storybook/helpers/getContextDecorator';
import ConsentBanner from '.';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';

const ConsentBannerWithMessage = () => (
  <Fragment>
    <ConsentBanner />
    This container uses cookies to conditionally render. If you can not see the
    banner above please clear your cookies or view in incognito mode.
  </Fragment>
);

storiesOf('Consent Banner', module)
  .addDecorator(withKnobs)
  .addDecorator(getContextDecorator({ platform: 'canonical' }))
  .add('canonical', () => <ConsentBannerWithMessage />);

storiesOf('Consent Banner', module)
  .addDecorator(withKnobs)
  .addDecorator(AmpDecorator)
  .addDecorator(getContextDecorator({ platform: 'amp' }))
  .add('amp', () => <ConsentBannerWithMessage />);
