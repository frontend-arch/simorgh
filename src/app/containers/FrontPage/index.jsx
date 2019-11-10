import React from 'react';
import { shape } from 'prop-types';
import compose from 'ramda/src/compose';
import frontPagePropTypes from '#models/propTypes/frontPage';
import FrontPageMain from '../FrontPageMain';

import withContexts from '../PageHandlers/withContexts';
import withPageWrapper from '../PageHandlers/withPageWrapper';
import withLoading from '../PageHandlers/withLoading';
import withError from '../PageHandlers/withError';
import withData from '../PageHandlers/withData';

const FrontPageContainer = ({ pageData }) => (
  <FrontPageMain frontPageData={pageData} />
);

FrontPageContainer.propTypes = {
  pageData: shape(frontPagePropTypes),
};

FrontPageContainer.defaultProps = {
  pageData: null,
};

const EnhancedFrontPageContainer = compose(
  withContexts,
  withPageWrapper,
  withLoading,
  withError,
  withData,
)(FrontPageContainer);

export default EnhancedFrontPageContainer;
