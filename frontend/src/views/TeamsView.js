import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

// actions
import { getTeams, getUsersTeams } from "../store/actions/index.js";

// components
import { Teams } from "../components/index.js";

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
    width: 90%;
    justify-content: center;
    h2{
      cursor: pointer;
      &:hover {
        color: #f18500
      }
    }
    .name {
      font-size: 24px;
      margin-right: 40px;
      color: ${props => props.tab === 'Teams' ? '#f66042' : null};
      border-bottom: ${props => props.tab === 'Teams' ? '1px solid #f66042' : null }
    }
    .userTeams {
      color: ${props => props.tab === 'My Teams' ? '#f66042' : null };
      border-bottom: ${props => props.tab === 'My Teams' ? '1px solid #f66042' : null }
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

const name = "name";
const newest = "newest";
const oldest = "oldest";

class TeamsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "team_name", // possible values: 'name', 'discussion_count', 'created_at'
      orderType: "", // possible values: 'asc', 'desc'
      tab: 'Teams'
    };
  }

  handleSelectChange = e => {
    let order = "created_at";
    let orderType;
    switch (e.target.value) {
      case name:
        order = "team_name";
        orderType = "asc";
        break;
      case newest:
        order = "created_at";
        orderType = "desc";
        break;
      case oldest:
        order = "created_at";
        orderType = "asc";
        break;
      default:
        break;
    }
    return this.setState({ order, orderType }, () => {
      return this.props.getTeams(this.state.order, this.state.orderType).then(() => {
        this.props.getUsersTeams(this.state.order, this.state.orderType);
      });
    });
  };
  // sortHandler = ev => {
  //   ev.preventDefault();
  //   return Promise.resolve(
  //     this.setState({ [ev.target.name]: ev.target.value })
  //   ).then(() => {
  //     this.props.getTeams(this.state.order, this.state.orderType);
  //   });
  // };
  selectTab = e => {
    this.setState({ tab: e.target.textContent });
  }
  componentDidMount = () => {
    this.props.getTeams(this.state.order, this.state.orderType);
    this.props.getUsersTeams(this.state.order, this.state.orderType);
  }
  conditionalRender = () => {
    if(this.state.tab === 'Teams'){
      return (
        <DivTeamsComponent>
            <Teams teams={this.props.teams} history={this.props.history} />
        </DivTeamsComponent>
      );
    } else {
      return (
        <DivTeamsComponent>
            <Teams teams={this.props.usersTeams} history={this.props.history} />
        </DivTeamsComponent>
      );
    } 
  }
  render() {
    return (
      <TeamsWrapper>
        <TeamsHeader tab={this.state.tab}>
          <div className="name-wrapper">
            <h2 className="name" onClick={this.selectTab}>Teams</h2>
            <h2 className="userTeams" onClick={this.selectTab}>My Teams</h2>
          </div>
          <div className="filter-wrapper">
            {/* <i className="fab fa-mix" /> */}
            <span>Sort by</span>
            <select
              className="filter"
              onChange={this.handleSelectChange}
              name="filter"
            >
              <option value={name}>{name}</option>
              <option value={newest}>{newest}</option>
              <option value={oldest}>{oldest}</option>
            </select>
          </div>
        </TeamsHeader>
        <div className='tabs-content'>
          {this.conditionalRender()}
        </div>
      </TeamsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  teams: state.teams.teams,
  usersTeams: state.teams.userTeams
});

export default connect(
  mapStateToProps,
  { getTeams, getUsersTeams }
)(TeamsView);
