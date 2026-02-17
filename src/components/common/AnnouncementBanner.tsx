import styled from '@emotion/styled';
import { readableColor } from 'polished';
import { Container } from 'reactstrap';

export const StyledAnnouncementBannerSection = styled.div`
  padding: ${(props) => props.theme.spaces.s100} 0;
  background-color: ${({ theme }) =>
    theme.settings.announcementBannerColor || theme.graphColors.blue070};
  color: ${({ theme }) =>
    readableColor(theme.settings.announcementBannerColor || theme.graphColors.blue070)};
`;

export const StyledAnnouncementBannerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  background-color: ${({ theme }) =>
    theme.settings.announcementBannerColor || theme.graphColors.blue070};
  color: ${({ theme }) =>
    readableColor(theme.settings.announcementBannerColor || theme.graphColors.blue070)};

  p {
    margin-bottom: 0;
  }
  p ~ p {
    margin-top: ${(props) => props.theme.spaces.s050};
  }
  a {
    color: ${({ theme }) =>
      readableColor(theme.settings.announcementBannerColor || theme.graphColors.blue070)};
    text-decoration: underline;

    &:hover {
      color: ${({ theme }) =>
        readableColor(theme.settings.announcementBannerColor || theme.graphColors.blue070)};
      text-decoration: none;
    }
  }
`;

export const AnnouncementBannerWithRichTextMessage = ({ message }: { message: string }) => (
  <AnnouncementBanner>
    <div dangerouslySetInnerHTML={{ __html: message }}></div>
  </AnnouncementBanner>
);

const AnnouncementBanner = ({ children }: { children: React.ReactNode }) => (
  <StyledAnnouncementBannerSection>
    <Container>
      <StyledAnnouncementBannerWrapper>{children}</StyledAnnouncementBannerWrapper>
    </Container>
  </StyledAnnouncementBannerSection>
);

export default AnnouncementBanner;
