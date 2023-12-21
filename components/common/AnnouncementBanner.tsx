import styled from 'styled-components';
import { Container } from 'reactstrap';

export const AnnouncementBannerSection = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
  background-color: ${(props) => props.theme.graphColors.blue070};
  color: ${(props) => props.theme.graphColors.grey010};
`;

export const AnnouncementBannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: ${(props) => props.theme.graphColors.blue070};
  color: ${(props) => props.theme.graphColors.grey010};

  p {
    margin-bottom: 0;
  }
  p ~ p {
    margin-top: ${(props) => props.theme.spaces.s050};
  }
  a {
    color: ${(props) => props.theme.themeColors.white};
    font-weight: bold;
  }
  @media (max-width: ${(props) => props.theme.breakpointMd}) {
  }
`;

export const AnnouncementBannerWithRichTextMessage = ({
  message,
}: {
  message: string;
}) => (
  <AnnouncementBanner>
    <div dangerouslySetInnerHTML={{ __html: message }}></div>
  </AnnouncementBanner>
);

const AnnouncementBanner = ({ children }: { children: React.ReactNode }) => (
  <AnnouncementBannerSection>
    <Container>
      <AnnouncementBannerWrapper>{children}</AnnouncementBannerWrapper>
    </Container>
  </AnnouncementBannerSection>
);

export default AnnouncementBanner;
