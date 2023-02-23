import dayjs from 'common/dayjs';

import { ActionSection } from 'components/actions/ActionContent';
import RichText from 'components/common/RichText';

const ReportComparisonBlock = (props) => {
  const { block, action } = props;
  const { reportField, reportsToCompare } = block;
  const reportIdentifiers = reportsToCompare.map(({ identifier }) => identifier);
  const attributes = (action.attributes
    .filter(({ type }) => reportIdentifiers.includes(type.report?.identifier) && type.reportField === reportField)
    .sort((a, b) => {
      const aDate = a?.type?.report?.startDate;
      const bDate = b?.type?.report?.startDate;
      if (aDate == null || bDate == null) {
        return 0;
      }
      return dayjs(aDate).diff(dayjs(bDate));
    })
  );
  // TODO: Display attributes so that they can be nicely compared with each other.
  // They are not necessarily rich text. You may want to check attribute.__typename or attribute.type.format.
  return (
    <ActionSection className="text-content">
      { attributes && attributes.map((attribute) => (
        <div key={attribute.id}>
          <b>Attribute from report {attribute.type.report.name} ({attribute.type.report.startDate} &ndash; {attribute.type.report.endDate}):</b>
          <RichText html={attribute.value} />
        </div>
      ))}
    </ActionSection>
  );
};

export default ReportComparisonBlock;
