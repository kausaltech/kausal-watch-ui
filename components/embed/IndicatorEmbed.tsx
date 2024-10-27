import { getIndicatorLinkProps } from '@/common/links';

import { InvalidEmbedAddressError } from '@/context/embed';
import IndicatorVisualisation from '@/components/indicators/IndicatorVisualisation';

interface IndicatorEmbedPropsType {
  path: string[];
}

const IndicatorEmbed = ({ path }: IndicatorEmbedPropsType) => {
  if (path.length !== 1) {
    throw new InvalidEmbedAddressError('Could not retrieve indicator data');
  }
  const indicatorId = path[0];

  return (
    <IndicatorVisualisation
      indicatorId={indicatorId}
      indicatorLink={getIndicatorLinkProps(indicatorId).href}
    />
  );
};

export default IndicatorEmbed;
