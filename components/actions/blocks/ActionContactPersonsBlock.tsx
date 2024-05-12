import { usePlan } from 'context/plan';
import RestrictedBlockWrapper from './RestrictedBlockWrapper';
import { ActionSection } from 'components/actions/ActionContent';
import ContactPersons from 'components/actions/ContactPersons';

const ActionContactPersonsBlock = (props) => {
  const { contactPersons } = props;
  const plan = usePlan();
  const isRestricted =
    plan.features.contactPersonsPublicData === 'ALL_FOR_AUTHENTICATED';

  return (
    <ActionSection>
      <RestrictedBlockWrapper isRestricted={isRestricted} isHidden={false}>
        <ContactPersons persons={contactPersons.map((item) => item.person)} />
      </RestrictedBlockWrapper>
    </ActionSection>
  );
};

export default ActionContactPersonsBlock;
