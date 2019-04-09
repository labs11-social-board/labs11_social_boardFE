import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// actions
import {
  getCategoriesFollowed,
  getUsersTeams
} from "../store/actions/index.js";

// globals
import {
  phoneL,
  accountUserTypes,
  subSilverStartIndex
} from "../globals/globals.js";

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivSideNav = styled.div`
  flex-direction: column;
  width: 100%;
  user-select: none;
  overflow-y: auto;
  height: calc(100% - 170px);
  min-height: 10%;

  @media (max-width: 800px) {
    display: ${props => (props.isOpen === "true" ? "flex" : "none")};
  }
`;

const DivHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  .fa-plus-circle {
    font-size: 21px;
    cursor: pointer;
    padding: 10px;
    color: ${props => props.theme.defaultColor};
    margin: 10px;
    margin-bottom: 10px;

    &:hover {
      color: ${props => props.theme.defaultColorOnHover};
    }
  }
`;

const H4BrowseCategories = styled.h4`
  width: 95%;
  border-left: ${props =>
    props.islinkselected === "true"
      ? "1px solid #418DCF"
      : "1px solid transparent"};
  margin-bottom: 57px;

  .browse-categories {
    font-size: 0.9rem;
  }
`;

const LinkBrowseCategories = styled(Link)`
  text-decoration: none;
  color: ${props =>
    props.islinkselected === "true"
      ? props.theme.defaultColorOnHover
      : props.theme.defaultColor};
  font-weight: normal;
  

  i {
    cursor: pointer;
    padding: 10px 8px 10px 0;
    color: inherit;
    margin-left: 12px;
  }

  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
  }

    &:hover {
      border: 1px solid ${props => props.theme.defaultColorOnHover};
    }
  }
`;

const DivCategoriesFollowed = styled.div`
  display: flex;
  flex-direction: column;
`;

const DivCatFollowItems = styled.div`
  ul {
    list-style: none;
    padding-left: 0;
    margin-left: -50px;
    margin-top: -25px;
  }
`;

const H4AllPosts = styled.h4`
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  border-left: ${props =>
    props.islinkselected === "true"
      ? `1px solid ${props.theme.defaultColor}`
      : "1px solid transparent"};

  i {
    cursor: pointer;
    font-size: 21px;
    color: ${props => props.theme.defaultColor};
    padding: 0 7px 2px 10px;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`;

const LinkAllPosts = styled(Link)`
  display: flex;
  text-decoration: none;
  color: ${props =>
    props.islinkselected === "true"
      ? `${props.theme.defaultColorOnHover}`
      : `${props.theme.defaultColor}`};
  font-weight: normal;
  margin-right: 41px;
  margin-top: -65px;
  font-size: 0.9rem;

  &:hover {
    color: ${props => props.theme.defaultColorOnHover};

    .div-window {
      background-color: ${props => props.theme.defaultColorOnHover};
    }
  }

  .div-window {
    background-color: ${props =>
      props.islinkselected === "true"
        ? `${props.theme.defaultColorOnHover}`
        : `${props.theme.defaultColor}`};
  }
`;

const DivWindows = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  flex-wrap: wrap;
  margin: 0 6px;
  background-color: inherit;
  width: 18px;
  height: 18px;
  padding-top: 1.8px;
  margin-left: 12px;
  margin-right: 13px;
  margin-bottom: 0px;

  div {
    background-color: ${props => props.theme.defaultColor};
    border-radius: 2px;
    width: 43%;
    height: 40%;
  }
`;

const PNoCatFollowMessage = styled.p`
  display: ${props => (props.isfollowedcatsopen === "true" ? "flex" : "none")};
  margin: 0 0 0 60px;
  width: 180px;
  height: 50px;
  color: ${props => props.theme.defaultColor};
  justify-content: center;
`;

const LiCategoryFollowed = styled.li`
  display: ${props =>
    props.isfollowedcatsopen === "true" ? "list-item" : "none"};
  padding-left: 42px;
  border-left: ${props =>
    props.islinkselected === "true"
      ? `5px solid ${props => props.theme.defaultColorOnHover}`
      : "5px solid transparent"};
  list-style-position: inside;
  &::before{
    // background-color: ${props =>
      props.islinkselected === "true" ? "blue" : "black"};
    background-color: ${props =>
      props.islinkselected === "true"
        ? `${props.theme.defaultColorOnHover}`
        : `${props.theme.defaultColor}`};
    font-weight: bold;
    display: inline-block; 
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 16px;
    margin-bottom: 3px;
  }
`;

const LinkSideNav = styled(Link)`
  text-decoration: none;
  // color: ${props => (props.islinkselected === "true" ? "blue" : "black")};
  color: ${props =>
    props.islinkselected === "true"
      ? `${props.theme.defaultColorOnHover}`
      : `${props.theme.defaultColor}`};
      

  span {
    width: 46px;
    display: inline-block;
    text-align: center;
    i {
      cursor: pointer;
      padding: 10px 10px 10px 0;
      color: inherit;
      margin-left: 15px;
    }


  }

  &:hover {
    color: ${props => props.theme.defaultColorOnHover};

  }
`;

const DropdownFollowing = styled.div`
  display: flex;
  text-align: center;
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      linkSelected: "",
      categories: [],
      categoryFollows: [],
      userTeams: [],
      isFollowedCatsOpen: true
    };
  }

  componentDidMount = () => {
    this.props.getCategoriesFollowed().then(() => {
      this.setState({
        categories: this.props.categoriesFollowed,
        categoryFollows: this.props.categoryFollows
      });
    });

    this.props.getUsersTeams().then(() => {
      this.setState({ userTeams: this.props.userTeams });
    });
  };

  componentDidUpdate = prevProps => {
    if (prevProps.categoryFollows !== this.props.categoryFollows) {
      this.props.getCategoriesFollowed().then(() => {
        this.setState({
          categories: this.props.categoriesFollowed,
          categoryFollows: this.props.categoryFollows
        });
      });
    }
    if (prevProps.userTeams !== this.props.userTeams) {
      this.setState({ userTeams: this.props.userTeams });
    }
  };

  selectLink = linkName => {
    this.setState({ linkSelected: linkName });
  };

  toggleFollowedCats = () => {
    this.setState({ isFollowedCatsOpen: !this.state.isFollowedCatsOpen });
  };

  render() {
    const { user_type } = this.props;

    return (
      <DivSideNav isOpen={`${this.props.isOpen}`}>
        <DivHeader>
          <H4BrowseCategories
            islinkselected={(
              this.state.linkSelected === "BrowseCategories"
            ).toString()}
          >
            <LinkBrowseCategories
              to={`/categories`}
              islinkselected={(
                this.state.linkSelected === "BrowseCategories"
              ).toString()}
              onClick={() => this.selectLink("BrowseCategories")}
              className="browse-categories"
            >
              <i className="fas fa-book-open" />
              Browse&nbsp;Categories&nbsp;
            </LinkBrowseCategories>

            {accountUserTypes.indexOf(user_type) >= subSilverStartIndex && (
              <i
                className="fas fa-plus-circle"
                onClick={ev => this.props.setAddCatModalRaised(ev, true)}
              />
            )}
            {console.log(accountUserTypes)}
            {user_type == "admin" && (
              <LinkBrowseCategories
                to={`/admin`}
                islinkselected={(
                  this.state.linkSelected === "Admin"
                ).toString()}
                onClick={() => this.selectLink("Admin")}
                className="browse-categories"
              >
                <i className="fas fa-cogs" />
                Admin
              </LinkBrowseCategories>
            )}
          </H4BrowseCategories>
        </DivHeader>
        <DivCategoriesFollowed>
          <DivCatFollowItems>
            <H4AllPosts
              islinkselected={(
                this.state.linkSelected === "AllPosts"
              ).toString()}
            >
              <LinkAllPosts
                onClick={() => this.selectLink("AllPosts")}
                to="/home"
                islinkselected={(
                  this.state.linkSelected === "AllPosts"
                ).toString()}
              >
                <DivWindows>
                  <div className="div-window" />
                  <div className="div-window" />
                  <div className="div-window" />
                  <div className="div-window" />
                </DivWindows>
                All&nbsp;Posts
              </LinkAllPosts>
              {/* <i className={this.state.isFollowedCatsOpen ? "fas fa-minus-circle" : "fas fa-plus-circle"} onClick={this.toggleFollowedCats} /> */}
            </H4AllPosts>
            <ul>
              {this.state.categories.length === 0 ? (
                <PNoCatFollowMessage
                  isfollowedcatsopen={this.state.isFollowedCatsOpen.toString()}
                >
                  You are currently not following any categories
                </PNoCatFollowMessage>
              ) : (
                this.state.categories.map((category, index) => (
                  <LiCategoryFollowed
                    isfollowedcatsopen={this.state.isFollowedCatsOpen.toString()}
                    key={index}
                    islinkselected={(
                      this.state.linkSelected === category.name
                    ).toString()}
                  >
                    <LinkSideNav
                      onClick={() => this.selectLink(category.name)}
                      islinkselected={(
                        this.state.linkSelected === category.name
                      ).toString()}
                      to={`/discussions/category/${category.id}`}
                    >
                      <span>
                        <i
                          className={category.icon}
                          islinkselected={(
                            this.state.linkSelected === category.name
                          ).toString()}
                        />
                      </span>
                      {category.name}
                    </LinkSideNav>
                  </LiCategoryFollowed>
                ))
              )}
            </ul>
          </DivCatFollowItems>
        </DivCategoriesFollowed>
        <DivHeader>
          <LinkBrowseCategories
            to="/teams"
            islinkselected={(this.state.linkSelected === "Teams").toString()}
            onClick={() => this.selectLink("Teams")}
          >
            Teams
          </LinkBrowseCategories>
          <i
            className="fas fa-plus-circle"
            onClick={ev => this.props.setAddTeamModalRaised(ev, true)}
          />
        </DivHeader>
        <ul>
          {this.state.userTeams.length === 0 ? (
            <div>No teams yet!</div>
          ) : (
            this.state.userTeams.map(team => (
              <LiCategoryFollowed
                key={team.team_id}
                isfollowedcatsopen={this.state.isFollowedCatsOpen.toString()}
                islinkselected={(
                  this.state.linkSelected === team.team_name
                ).toString()}
              >
                <LinkSideNav
                  onClick={() => this.selectLink(team.team_name)}
                  islinkselected={(
                    this.state.linkSelected === team.team_name
                  ).toString()}
                  to={`/team/discussions/${team.team_id}`}
                >
                  {team.team_name}
                </LinkSideNav>
              </LiCategoryFollowed>
            ))
          )}
        </ul>
      </DivSideNav>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categoryFollows: state.users.categoryFollows,
  user_type: state.users.user_type,
  categoriesFollowed: state.categories.categoriesFollowed,
  userTeams: state.teams.userTeams
});

export default connect(
  mapStateToProps,
  { getCategoriesFollowed, getUsersTeams }
)(SideNav);
