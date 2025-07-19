import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import AnnouncementBanner from '@/components/common/AnnouncementBanner';
import Icon from '@/components/common/Icon';

const VersionNote = styled.div`
  display: flex;
`;

const VersionName = styled.div`
  font-size: ${(props) => props.theme.fontSizeSm};
`;

const CurrentVersionName = styled.div`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const LatestVersionName = styled.div`
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const LinkToLatestVersion = styled.div`
  display: flex;
  text-align: right;
  font-size: ${(props) => props.theme.fontSizeSm};

  a {
    color: ${(props) => props.theme.graphColors.grey010};
  }
`;

const PlanVersionBanner = (props) => {
  const { latestVersion, currentVersion } = props;
  const t = useTranslations();

  return (
    <AnnouncementBanner>
      <VersionNote>
        <Icon.Version className="me-2" width="2.25rem" height="2.25rem" />
        <VersionName>
          {t('version-this-is-old')}
          <br />
          <CurrentVersionName>
            {currentVersion?.versionName || currentVersion?.shortName}
          </CurrentVersionName>
        </VersionName>
      </VersionNote>
      <LinkToLatestVersion>
        <a href={latestVersion?.viewUrl} className="ms-2">
          {t('version-switch-to-active')}
          <br />
          <LatestVersionName>
            {latestVersion?.versionName || latestVersion?.shortName}
          </LatestVersionName>
        </a>
        <Icon.ArrowRight className="ms-2" width="2.25rem" height="2.25rem" />
      </LinkToLatestVersion>
    </AnnouncementBanner>
  );
};

export default PlanVersionBanner;
