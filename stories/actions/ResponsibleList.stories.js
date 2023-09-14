import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import ResponsibleList from '../../components/actions/ResponsibleList';

const orgData = [
  {
    id: 'u75001',
    abbreviation: 'PTA',
    name: 'Public Transport Authority',
  },
  {
    id: 'u5110510040',
    abbreviation: 'TraPlaDep',
    name: 'Traffic and Streets Planning Department',
  },
  {
    id: '2274586-3',
    abbreviation: 'TI-JA',
    name: 'Traffic Infrastructure Joint Association',
  },
  {
    id: '2274241-9',
    abbreviation: 'Lo Co',
    name: 'Local Corporations',
  },
];

export default {
  title: 'Action/Responsible Badges',
};

export const normal = () => (
  <div className="row">
    <div className="col-8 p-5">
      <ResponsibleList data={orgData} />
    </div>
  </div>
);
