import { useTranslations } from 'next-intl';

import type { TFunction } from '@/common/i18n';

type UnitType = {
  name: string;
  shortName?: string | null;
};

type UnitProps = {
  unit: UnitType;
};

// FIXME: Until we get html unit support in the backend, we need to map units
const getHtmlUnit = (unit: string, t: TFunction): string => {
  switch (unit) {
    case 't/Einw./a': {
      const translated: unknown = t.raw('tco2-e-inhabitant');
      return typeof translated === 'string' ? translated : unit;
    }
    case 'kt/a': {
      const translated: unknown = t.raw('ktco2-e');
      return typeof translated === 'string' ? translated : unit;
    }
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
