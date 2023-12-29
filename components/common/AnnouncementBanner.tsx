import styled from 'styled-components';
import { Container } from 'reactstrap';

export const StyledAnnouncementBannerSection = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
  background-color: ${(props) => props.theme.graphColors.blue070};
  color: ${(props) => props.theme.graphColors.grey010};
`;

export const StyledAnnouncementBannerWrapper = styled.div`
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
  <StyledAnnouncementBannerSection>
    <Container>
      <StyledAnnouncementBannerWrapper>
        {children}
      </StyledAnnouncementBannerWrapper>
    </Container>
  </StyledAnnouncementBannerSection>
);

export default AnnouncementBanner;
