import React from 'react';
import { storiesOf } from '@storybook/react';
import WithTimeMachine from '../../../testHelpers/withTimeMachine';
import newsData from '../../../../data/news/frontpage';
import igboData from '../../../../data/igbo/frontpage';
import pidginData from '../../../../data/pidgin/frontpage';
import thaiData from '../../../../data/thai/frontpage';
import yorubaData from '../../../../data/yoruba/frontpage';
import punjabiData from '../../../../data/punjabi/frontpage';
import FrontPageMain from '.';
import { ServiceContextProvider } from '../../contexts/ServiceContext';
import { ToggleContextProvider } from '../../contexts/ToggleContext';
import { RequestContextProvider } from '../../contexts/RequestContext';

const serviceDataSets = {
  news: newsData,
  igbo: igboData,
  yoruba: yorubaData,
  pidgin: pidginData,
  thai: thaiData,
  punjabi: punjabiData,
};

const stories = storiesOf('Main|Front Page', module).addDecorator(story => (
  <WithTimeMachine>{story()}</WithTimeMachine>
));

Object.keys(serviceDataSets).forEach(service => {
  stories.add(`Front Page - ${service}`, () => (
    <ToggleContextProvider>
      <ServiceContextProvider service={service}>
        <RequestContextProvider
          isAmp={false}
          pageType="frontPage"
          service={service}
        >
          <FrontPageMain frontPageData={serviceDataSets[service]} />
        </RequestContextProvider>
      </ServiceContextProvider>
    </ToggleContextProvider>
  ));
});
