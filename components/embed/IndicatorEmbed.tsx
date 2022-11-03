import ErrorBoundary from 'components/common/ErrorBoundary';
import { useTranslation } from 'common/i18n';
import { gql, useQuery } from '@apollo/client';
import { usePlan } from 'context/plan';
import images from 'common/images';
import { useEffect } from 'react';

import { InvalidEmbedAddressError } from 'context/embed';
import IndicatorVisualisation from '../../components/indicators/IndicatorVisualisation';

interface IndicatorEmbedPropsType {
  path: string[]
}

const IndicatorEmbed = ({path} : IndicatorEmbedPropsType) => {
  if (path.length !== 1) {
    throw new InvalidEmbedAddressError('Could not retrieve indicator data');
  }
  return <ErrorBoundary>
    <IndicatorVisualisation indicatorId={path[0]} />
  </ErrorBoundary>;
}

export default IndicatorEmbed;
