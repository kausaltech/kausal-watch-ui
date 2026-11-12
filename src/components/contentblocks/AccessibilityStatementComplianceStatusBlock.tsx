import { useLocale, useTranslations } from 'next-intl';

import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import accessibilityStatementData from '@/public/static/accessibility';

type ComplianceStatus = 'partial' | 'full' | 'not';
type AccessibilityProblem = {
  WCAGSection: string;
  description: string;
  id: string;
  title: string;
};
type AccessibilityStatement = {
  complianceStatus: ComplianceStatus;
  nonAccessibleContent: {
    nonCompliant: AccessibilityProblem[];
  };
};

const statements = accessibilityStatementData as Record<string, AccessibilityStatement>;

const COMPLIANCE_STATUS_KEYS = {
  partial: 'compliance-partial',
  full: 'compliance-full',
  not: 'compliance-none',
} as const;

type AccessibilityStatementComplianceStatusBlockProps = {
  id?: string;
};

const AccessibilityStatementComplianceStatusBlock = ({
  id = '',
}: AccessibilityStatementComplianceStatusBlockProps) => {
  const t = useTranslations();
  let locale = useLocale();

  if (!(locale in statements)) {
    locale = 'en';
  }
  const statement = statements[locale];
  const accessibilityProblems = statement.nonAccessibleContent.nonCompliant;
  const complianceStatus = statement.complianceStatus;

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col xl={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <h2>{t('compliance-status')}</h2>
          <p>
            {t.rich(COMPLIANCE_STATUS_KEYS[complianceStatus], {
              link: (chunks) => <a href={t('wcag-url')}>{chunks}</a>,
            })}
          </p>
          {accessibilityProblems.length > 0 && (
            <>
              <h2>{t('non-accessible-content')}</h2>
              <h3>{t('non-compliance-aa')}</h3>
              <p>{t('non-compliance-below')}:</p>
              <ul>
                {accessibilityProblems.map((problem) => (
                  <li key={problem.id}>
                    <h4>{problem.title}</h4>
                    <p dangerouslySetInnerHTML={{ __html: problem.description }} />
                    <p>WCAG: {problem.WCAGSection}</p>
                  </li>
                ))}
              </ul>
              <p>{t('when-fixed')}</p>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementComplianceStatusBlock;
