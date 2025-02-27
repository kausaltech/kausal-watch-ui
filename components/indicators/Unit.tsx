import { useTranslations } from 'next-intl';

import { Unit as UnitType } from '@/common/__generated__/graphql';

type UnitProps = {
  unit: UnitType;
};

// FIXME: Until we get html unit support in the backend, we need to map units
const getHtmlUnit = (unit: string, t: any) => {
  switch (unit) {
    case 't/Einw./a':
      return t.raw('tco2-e-inhabitant');
    case 'kt/a':
      return t.raw('ktco2-e');
    case 't CO2eq':
      return 't CO<sub>2</sub>eq';
    case 't CO2/a':
      return 't CO<sub>2</sub>/a';
    default:
      return unit;
  }
};

const Unit = (props: UnitProps) => {
  const { unit } = props;
  const t = useTranslations();

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: getHtmlUnit(unit.shortName || unit.name, t),
      }}
    />
  );
};

export default Unit;
