import { PlanFeaturesContactPersonsPublicData } from '@/common/__generated__/graphql';
import { type ActionContentAction, ActionSection } from '@/components/actions/ActionContent';
import ContactPersons from '@/components/actions/ContactPersons';
import { usePlan } from '@/context/plan';

import RestrictedBlockWrapper from './RestrictedBlockWrapper';

type ActionContactPersonsBlockProps = {
  contactPersons: NonNullable<ActionContentAction['contactPersons']>;
};

const ActionContactPersonsBlock = (props: ActionContactPersonsBlockProps) => {
  const { contactPersons } = props;
  const plan = usePlan();
  const isRestricted =
    plan.features.contactPersonsPublicData ===
    PlanFeaturesContactPersonsPublicData.AllForAuthenticated;

  return (
    <ActionSection>
      <RestrictedBlockWrapper isRestricted={isRestricted} isHidden={false}>
        <ContactPersons persons={contactPersons.map((item) => item.person)} />
      </RestrictedBlockWrapper>
    </ActionSection>
  );
};

export default ActionContactPersonsBlock;
