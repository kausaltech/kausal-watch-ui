import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import Icon from '../../components/common/Icon';

const iconsList = [
  'angleDown',
  'angleLeft',
  'angleRight',
  'angleUp',
  'arrowDown',
  'arrowLeft',
  'arrowRight',
  'arrowUp',
  'bars',
  'calendar',
  'chartLine',
  'check',
  'circleFull',
  'circleOutline',
  'commenting',
  'exclamationCircle',
  'globe',
  'heart',
  'home',
  'pencil',
  'search',
  'sync',
  'times',
  'user',
];

const Icons = (props) => {
  const { iconColor } = props;
  const showIcons = iconsList.map((item) => (
    <div className="py-2 d-flex d-flex-row" key={item}>
      <Icon name={item} color={iconColor} width="2rem" height="2rem" />
      <small className="ml-3" style={{ lineHeight: '2rem' }}>{item}</small>
    </div>
  ));

  return showIcons;
};

const IconsLayout = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
          <Icons />
        </div>
        <div className="col-6" style={{ backgroundColor: theme.brandDark, color: theme.themeColors.light }}>
          <Icons iconColor={theme.brandLight} />
        </div>
      </div>
    </div>
  )
};

export const IconsStory = (theme) => <IconsLayout theme={theme} />;

IconsStory.story = {
  name: 'Basic Icons',
};

export default {
  title: 'Icons',
  component: IconsStory,
};
