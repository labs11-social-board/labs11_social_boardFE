import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// actions
import { getTeams } from '../store/actions/index.js';

// components
import {
  Teams,
} from '../components/index.js';

const TeamsWrapper = styled.div`
  width: 95%;
`;

const DivTeamsComponent = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  color: ${props => props.theme.defaultColor};
`;

const TeamsHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${props => props.theme.discussionPostColor};
  
  .name-wrapper {
    display: flex;
    align-items: center;
    .name {
      font-size: 24px;
    }
  }

  @media (max-width: 910px) {
    flex-direction: column;
  }

  .filter-wrapper {
    i {
      margin-right: 5px;
      color: ${props => props.theme.discussionPostColor};
    }

    .filter {
      border: none;
      background-color: rgba(0, 0, 0, 0);
      padding: 5px;
      color: ${props => props.theme.discussionPostColor};
      option {
        color: black;
      }
      &:focus {
        outline: none;
      }
    }
  
    // .add-post-btn {
    //   margin-left: 10px;
    //   padding: 10px 15px;
    //   border-radius: 5px;
    //   border: none;
    //   background-color: #418DCF;
    //   color: white;

    //   &:hover {
    //     cursor: pointer;
    //     background-color: white;
    //     color: #418DCF;
    //     border: 1px solid #418DCF;
    //   }
    // }
  }
`;

const name = 'name';
const newest = 'newest';
const oldest = 'oldest';

class TeamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 'name', // possible values: 'name', 'discussion_count', 'created_at'
      orderType: '', // possible values: 'asc', 'desc'
    };
  };

  handleSelectChange = e => {
    let order = 'created_at';
    let orderType;
    switch (e.target.value) {
      case name:
        order = 'name';
        orderType = 'asc';
        break;
      case newest:
        order = 'created_at';
        orderType = 'desc';
        break;
      case oldest:
        order = 'created_at';
        orderType = 'asc';
        break;
      default:
        break;
    };
    return this.setState({ order, orderType }, () => {
      return this.props.getTeams(this.state.order, this.state.orderType);
    });
  };
  sortHandler = ev => {
    ev.preventDefault();
    return Promise.resolve(this.setState({ [ev.target.name]: ev.target.value })).then(() => {
      this.props.getTeams(this.state.order, this.state.orderType);
    });
  };
  componentDidMount = () => this.props.getTeams();
  render() {
    return (
      <TeamsWrapper>
        <TeamsHeader>
          <div className = 'name-wrapper'>
            <h2 className='name'>Teams</h2>
          </div>
          <div className='filter-wrapper'>
            <i className='fab fa-mix' />
            <span>Filter by</span>
            <select
              className='filter'
              onChange={this.handleSelectChange}
              name='filter'
            >
              <option value={name}>{name}</option>
              <option value={newest}>{newest}</option>
              <option value={oldest}>{oldest}</option>
            </select>
          </div>
        </TeamsHeader>
        <DivTeamsComponent>
          <Teams teams={this.props.teams} history={this.props.history} />
        </DivTeamsComponent>
      </TeamsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.teams,
});

export default connect(
  mapStateToProps,
  { getTeams }
)(TeamsView);