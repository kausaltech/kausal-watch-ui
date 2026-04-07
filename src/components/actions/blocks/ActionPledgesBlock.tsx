'use client';

import { useState } from 'react';

import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';

import type { GetActionDetailsQuery } from '@/common/__generated__/graphql';
import { getAttributeValueText } from '@/components/common/ActionAttribute';
import ConfirmPledge from '@/components/pledge/ConfirmPledge';
import PledgeCard, { type PledgeCategory } from '@/components/pledge/PledgeCard';
import { usePledgeUser } from '@/components/pledge/use-pledge-user';
import { getDefaultFormFields } from '@/utils/pledge.utils';

import { ActionSection } from '../ActionContent';

type ActionPledge = NonNullable<GetActionDetailsQuery['action']>['pledges'][number];

type Props = {
  pledges: ActionPledge[];
  heading?: string | null;
};

const StyledPledgeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spaces.s200};
  align-items: stretch;
`;

export default function ActionPledgesBlock({ pledges, heading }: Props) {
  const t = useTranslations();
  const {
    userData,
    committedSlugs,
    commitToPledge,
    uncommitFromPledge,
    getCommitmentCountAdjustment,
  } = usePledgeUser();

  const [showConfirmDrawer, setShowConfirmDrawer] = useState(false);
  const [selectedPledge, setSelectedPledge] = useState<ActionPledge | null>(null);

  const handleCommitClick = (pledge: ActionPledge, isCurrentlyCommitted: boolean) => {
    if (isCurrentlyCommitted) {
      uncommitFromPledge(pledge.id);
    } else {
      setSelectedPledge(pledge);
      setShowConfirmDrawer(true);
    }
  };

  const handleConfirmPledge = async (formData: Record<string, string>) => {
    if (selectedPledge) {
      await commitToPledge(selectedPledge.id, formData);
    }
  };

  const handleCloseDrawer = () => {
    setShowConfirmDrawer(false);
    setSelectedPledge(null);
  };

  return (
    <ActionSection>
      <h2>{heading || t('pledge-list-title')}</h2>
      <StyledPledgeGrid>
        {pledges.map((pledge) => (
          <PledgeCard
            key={pledge.slug}
            title={pledge.name}
            description={pledge.description}
            categories={pledge.attributes
              .map((attribute) => ({
                label: getAttributeValueText(attribute),
              }))
              .filter((category): category is PledgeCategory => !!category.label)}
            slug={pledge.slug}
            image={pledge.image?.large?.src ?? pledge.image?.full?.src}
            imageAlt={pledge.image?.altText ?? pledge.name}
            isCommitted={committedSlugs.has(pledge.slug)}
            committedCount={pledge.commitmentCount + getCommitmentCountAdjustment(pledge.slug)}
            onCommitClick={(isCommitted) => handleCommitClick(pledge, isCommitted)}
          />
        ))}
      </StyledPledgeGrid>

      {selectedPledge && (
        <ConfirmPledge
          isOpen={showConfirmDrawer}
          onClose={handleCloseDrawer}
          onConfirm={handleConfirmPledge}
          pledgeName={selectedPledge.name}
          pledgeSlug={selectedPledge.slug}
          pledgeImage={selectedPledge.image?.rendition?.src ?? null}
          commitmentCount={selectedPledge.commitmentCount}
          formFields={getDefaultFormFields(t)}
          userData={userData}
        />
      )}
    </ActionSection>
  );
}
