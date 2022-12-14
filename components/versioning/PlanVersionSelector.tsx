import styled from 'styled-components';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'components/common/Icon';
import { useTranslation } from 'common/i18n';

const VersionSelect = styled.div`
  display: flex;
  align-items: center;

  .dropdown-header {
    margin: 0 .5rem .5rem;
    padding: .5rem 0;
    border-bottom: 1px solid ${(props)=> props.theme.themeColors.light};
    font-weight: ${(props)=> props.theme.fontWeightNormal};
    font-size: ${(props)=> props.theme.fontSizeBase};
  }
`;

const VersionDropdownItem = styled.a`
  display: block;
  padding: .25rem .75rem .25rem .25rem;
  margin: 0 .5rem .5rem;
  border: 1px solid ${(props)=> props.theme.themeColors.light};
  border-radius: .5rem;
  text-decoration: none !important;
  /*font-weight: ${(props)=> props.latest === true ? props.theme.fontWeightBold : 'inherit'};*/
  /*background: ${(props)=> props.active === true ? props.theme.themeColors.light : 'none'};*/

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${(props)=> props.theme.themeColors.light};
    border-color: ${(props)=> props.theme.themeColors.light};
    text-decoration: none;
  }
`;

const VersionName = styled.div`
  font-size: ${(props)=> props.theme.fontSizeSm};
`;

const VersionDate = styled.div`
  color: ${(props)=> props.theme.themeColors.dark};
`;

const StyledDropdownToggle = styled(DropdownToggle)`
  display: flex;
  align-items: center;
  padding: .25rem;
  background: none;
  line-height: 1.5rem;
  border: 1px solid transparent;
  border-radius: 1.75rem;
  font-size: 1rem;
  color: ${(props)=> props.theme.themeColors.dark};
  background: ${(props)=> props.isLatest === true ? 'none' : props.theme.graphColors.red010 };
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    border-color: ${(props) => props.theme.themeColors.dark};
    color: ${(props) => props.theme.themeColors.dark};

    svg {
      fill: ${(props) => props.theme.themeColors.dark} !important;
    }
  }

  svg {
    fill: ${(props)=> props.theme.brandNavColor} !important;
  }
`;

const PlanVersionSelector = (props) => {

  const { plan } = props;
  const { t } = useTranslation();

  const supersededVersions = plan.supersededPlans;
  const supersedingVersions = plan.supersedingPlans;

  const allVersions = [
    ...supersededVersions.map((v) => ({
      identifier: v.identifier,
      shortName: v.name.slice(0, 15),
      versionName: v.shortName,
      viewUrl: v.viewUrl,
      active: false,
    })),
    {
      identifier: plan.identifier,
      shortName: plan.name.slice(0, 15),
      versionName: plan.shortName,
      viewUrl: plan.viewUrl,
      active: true,
    },
    ...supersedingVersions.map((v) => ({
      identifier: v.identifier,
      shortName: v.name.slice(0, 15),
      versionName: v.shortName,
      viewUrl: v.viewUrl,
      active: false,
    })),
  ];

  if (allVersions.length === 1) {
    return null;
  }

  const activeVersion = allVersions.find((v) => v.active);
  const latestVersion = allVersions[allVersions.length - 1];

  return (
    <VersionSelect>
      <UncontrolledDropdown>
        <StyledDropdownToggle
          data-toggle="dropdown"
          tag="button"
          isLatest = {activeVersion.identifier === latestVersion.identifier}
        >
            <Icon name="version" className="me-2" width="1.25rem" height="1.25rem" />
            {activeVersion.versionName}
            <Icon name="angle-down" />
        </StyledDropdownToggle>
        <DropdownMenu>
          <DropdownItem header>
            { t('common:versions-list')}
          </DropdownItem>
          { allVersions.reverse().map((v) => (
            <VersionDropdownItem
              href={v.viewUrl}
              key={v.identifier}
              latest={v.identifier === latestVersion.identifier}
            >
              <VersionDate>
                {v.versionName}
              </VersionDate>
            </VersionDropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </VersionSelect>
  )
};

export default PlanVersionSelector;