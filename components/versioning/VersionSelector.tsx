import styled from 'styled-components';
import { transparentize } from 'polished';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Icon from 'components/common/Icon';

const VersionSelect = styled.div`
  display: flex;
  align-items: center;
`;

const VersionDropdownItem = styled.a`
  display: block;
  padding: .25rem .75rem .25rem .25rem;
  margin: 0 .5rem .5rem;
  border: 1px solid ${(props)=> props.theme.themeColors.light};
  border-radius: .5rem;
  text-decoration: none !important;

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
  font-weight: ${(props)=> props.theme.fontWeightBold};
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
  font: inherit;
  cursor: pointer;
  outline: inherit;

  &:hover {
    background: ${(props) => props.theme.themeColors.white};
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

const VersionSelector = (props) => {

  const versions = [
    {
      identifier: '2022',
      name: 'Kiertotalous',
      startDate: '2022-01-01',
      endDate: '2024-12-31',
      viewUrl: '#',
      active: true,
    },
    {
      identifier: '2020',
      name: 'Kiertotalous',
      startDate: '2020-01-01',
      endDate: '2022-12-31',
      viewUrl: '#',
      active: false,
    },
  ];

  const activeVersion = versions.find((v) => v.active);

  return (
    <VersionSelect>
      <UncontrolledDropdown>
        <StyledDropdownToggle
          data-toggle="dropdown"
          tag="button"
        >
            <Icon name="sync" className="me-2" />
            {(new Date(activeVersion.startDate)).getFullYear()}
            {` - `}
            {(new Date(activeVersion.endDate)).getFullYear()}
            <Icon name="angle-down" />
        </StyledDropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Versions</DropdownItem>
          { versions.map((v) => (
            <VersionDropdownItem
              href={v.viewUrl}
              key={v.identifier}
            >
              <VersionName>
              {v.name}
              </VersionName>
              <VersionDate>
                {(new Date(v.startDate)).getFullYear()}
                {` - `}
                {(new Date(v.endDate)).getFullYear()}
              </VersionDate>
            </VersionDropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </VersionSelect>
  )
};

export default VersionSelector;