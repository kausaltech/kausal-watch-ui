import { useTranslations } from 'next-intl';

import { type CommonContentBlockProps } from '@/common/blocks.types';
import { Col, Container, Row } from '@/components/common/layout/LayoutGrid';
import { usePlan } from '@/context/plan';

type ContactContentBlock = { field?: string | null; value?: string | null };

interface Props extends CommonContentBlockProps {
  content?: ContactContentBlock[];
}

const AccessibilityStatementContactInformationBlock = ({ id = '', content }: Props) => {
  const t = useTranslations();
  const plan = usePlan();

  const accessibilityContactEmail =
    content?.find((block) => block.field === 'email')?.value || 'accessibility@kausal.tech';
  const publisher = content?.find((block) => block.field === 'publisher')?.value;
  const customParagraph = content?.find(
    (block) => block.field === 'maintenance_responsibility_paragraph'
  )?.value;
  const responsibleBody = publisher || plan.generalContent.ownerName;

  return (
    <Container id={id} className="my-2 text-content">
      <Row>
        <Col xl={{ size: 6, offset: 3 }} lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }}>
          <h2>{t('a11y-feedback-contact')}</h2>
          <p>{customParagraph || t('responsible-for-maintenance', { responsibleBody })}</p>
          <p>
            {t.rich('feedback-by-email', {
              email: accessibilityContactEmail,
              link: (chunks) => <a href={`mailto:${accessibilityContactEmail}`}>{chunks}</a>,
            })}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessibilityStatementContactInformationBlock;
