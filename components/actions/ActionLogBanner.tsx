import styled from 'styled-components';
import dayjs from 'common/dayjs';

const DraftBanner = styled.div`
  padding: ${(props) => props.theme.spaces.s150};
  background-color: ${(props) => props.theme.graphColors.yellow010};
  border-radius: ${(props) =>
    `${props.theme.cardBorderRadius} ${props.theme.cardBorderRadius} 0 0`};
  display: flex;
  p {
    margin-bottom: 0;
    font-weight: ${(props) => props.theme.fontWeightBold};
  }
`;

const DraftBannerTitle = styled.div`
  flex: 0 0 50%;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const DraftBannerInfo = styled.span`
  font-weight: ${(props) => props.theme.fontWeightBase};
`;

const DraftBannerDate = styled.div`
  flex: 0 0 50%;
  font-size: small;
  text-align: right;
`;

const ActionLogBanner = (props) => {
  const { matchingVersion, updatedAt } = props;
  return (
    <DraftBanner>
      <DraftBannerTitle>
        {matchingVersion.description}
        <DraftBannerInfo></DraftBannerInfo>
      </DraftBannerTitle>
      <DraftBannerDate>{dayjs(updatedAt).format('l')}</DraftBannerDate>
    </DraftBanner>
  );
};

export default ActionLogBanner;
