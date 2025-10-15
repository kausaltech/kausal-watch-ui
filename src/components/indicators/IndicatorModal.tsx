import { Button } from 'reactstrap';

interface IndicatorModalProps {
  indicatorId: string;
  onClose: () => void;
}

const IndicatorModal = (props: IndicatorModalProps) => {
  const { indicatorId, onClose } = props;

  return (
    <div style={{ backgroundColor: '#eeeeee', padding: '20px' }}>
      <Button onClick={onClose}>Close</Button>
      <h1>Indicator Modal {indicatorId}</h1>
    </div>
  );
};

export default IndicatorModal;
