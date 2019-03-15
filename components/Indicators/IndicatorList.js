import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Table,
} from 'reactstrap';

import styled from 'styled-components';
import { Link } from '../../routes';

import { aplans } from '../../common/api';
import Icon from '../Common/Icon';

import IndicatorListFilters from './IndicatorListFilters';

const IndicatorType = styled(Badge)`
  background-color: ${(props) => {
    switch (props.level) {
      case 'tactical':
        return props.theme.helFog;
      case 'operational':
        return props.theme.helCopper;
      case 'strategic':
        return props.theme.helCoat;
      default:
        return '#cccccc';
    }
  }};
`;

const StyledBadge = styled(Badge)`
  white-space: normal;
  margin-right: .5em;
`;

const levels = {
  operational: { fi: 'toiminnallinen', index: 1 },
  tactical: { fi: 'taktinen', index: 2 },
  strategic: { fi: 'strateginen', index: 3 },
};

class IndicatorList extends React.Component {
  static async fetchData(plan) {
    // Fetches the data needed by this component from the API and
    // returns them as props suitable for the component.
    const resp = await aplans.findAll('indicator', {
      'filter[plans]': plan.identifier,
      include: ['categories', 'levels'],
      'fields[indicator]': ['name', 'unit_name', 'updated_at', 'levels', 'categories', 'latest_graph'],
      'fields[category]': ['identifier', 'name', 'parent'],
    });

    const { store } = resp;
    resp.data.forEach((indicator) => {
      const obj = store.get('indicator', indicator.id);
      let planLevel;

      obj.relationships.levels.data.forEach((level) => {
        const levelObj = store.get('indicator_level', level.id);
        if (levelObj.relationships.plan.data.id === plan.id) {
          planLevel = levelObj.attributes.level;
        }
      });
      indicator.level = planLevel;
    });
    const props = {
      indicators: resp.data,
      cats: resp.store.getAll('category'),
    };
    return props;
  }

  constructor(props) {
    super(props);
    this.state = {
      activeCategory: '',
      activeSearch: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(filterType, val) {
    const change = `active${filterType}`;
    this.setState({
      [change]: val,
    });
  }

  sortIndicators(indicators) {
    let sorted = indicators;
    sorted = indicators.sort((a, b) => a.name.localeCompare(b.name));
    sorted = indicators.sort((a, b) => {
      if (levels[a.level].index < levels[b.level].index) {
        return -1;
      }
      if (levels[a.level].index > levels[b.level].index) {
        return 1;
      }
      return 0;
    });
    return sorted;
  }

  filterIndicators() {
    let i;
    const indicators = this.props.indicators.filter((item) => {
      const { activeCategory } = this.state;
      const { activeSearch } = this.state;

      if (activeCategory) {
        let catMatch = false;
        for (i = 0; i < item.categories.length; i += 1) {
          if (item.categories[i].id === activeCategory) catMatch = true;
        }
        if (!catMatch) return false;
      }

      if (activeSearch) {
        if (item.name.toLowerCase().search(activeSearch.toLowerCase()) !== -1) return true;
        return false;
      }
      return true;
    });

    return indicators;
  }

  render() {
    const indicators = this.filterIndicators();
    return (
      <div className="mb-5 pb-5">
        <IndicatorListFilters cats={this.props.cats} changeOption={this.handleChange} />
        <Table hover>
          <tbody>
            {this.sortIndicators(indicators).map(item => (
              <tr key={item.id}>
                <td>
                  <IndicatorType pill level={item.level}>
                    { levels[item.level].fi || <span>-</span> }
                  </IndicatorType>
                </td>
                <td>
                  <Link route="indicator" params={{ id: item.id }} href>
                    <a>{ item.name }</a>
                  </Link>
                </td>
                <td>
                  {item.categories.map(cat => (
                    <StyledBadge color="light" key={cat.id}>{cat.name}</StyledBadge>
                  ))}
                </td>
                <td>
                  {item.latest_graph !== null
                  && (
                    <span>
                      <Icon name="chartLine" />
                    </span>
                  )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

IndicatorList.propTypes = {
  indicators: PropTypes.arrayOf(PropTypes.object),
};

export default IndicatorList;
