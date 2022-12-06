import { ActionSection } from 'components/actions/ActionContent';
import ContactPersons from 'components/actions/ContactPersons';

const ActionContactPersonsBlock = (props) => {
  const { contactPersons } = props;

  return (
    <ActionSection>
      <ContactPersons
        persons={contactPersons.map((item) => item.person)}
      />
    </ActionSection>
  )
}

export default ActionContactPersonsBlock;
