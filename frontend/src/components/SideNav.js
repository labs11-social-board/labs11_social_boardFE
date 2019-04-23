
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import NoGo2 from './NoGo2.js';
import ResourcesLinks from './ResourcesLinks.js';
import './sidenav.css';

// actions
import { getCategoriesFollowed, getUsersTeams, getUsers, verifyEmail, getKeyResources } from '../store/actions/index.js';

// globals
import { accountUserTypes, subSilverStartIndex } from '../globals/globals.js';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivSideNav = styled.div`
  padding-top: 20px;
  flex-direction: column;
  width: 100%;
  user-select:none;
  overflow-y: auto;
  height: calc(100% - 180px);
  min-height: 10%;
  background-color: ${props => props.theme.bgColor};

  span {
    margin-left: 20px;
  }
  .section-select {
    font-size: .93rem;
    display: flex;
    margin: 20px;
    cursor:pointer;
    color:grey;
    &:hover {
      color: ${props => props.theme.defaultColorOnHover};
    }
    i {
      margin-left: 10px;
    }
  }
  
  .admin {
    cursor:default;
    color: black;
    &:hover {
      color:grey;
    }
  }
  @media (max-width: 800px) {
    display: ${props => props.isOpen === 'true' ? 'flex' : 'none'};
    height: calc(100% - 21px);
  }
`;

const DivHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .fa-plus-circle {
    font-size: 21px;
    cursor: pointer;
    padding: 10px;
    color: ${ props => props.theme.defaultColor};
    //margin: 10px;
    //margin-bottom: 10px;
    &:hover {
      color: ${ props => props.theme.defaultColorOnHover};
    }
  }
`;

const H4BrowseCategories = styled.h4`
    width: 95%;
    margin-top: 6px;
    margin-bottom: 36px;
`;

const LinkBrowseCategories = styled(Link)`
  text-decoration: none;
  //margin-left: -6px;
  color: ${props => props.islinkselected === 'true' ? props.theme.defaultColorOnHover : props.theme.defaultColor};
  border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props.theme.defaultColorOnHover}` : '6px solid transparent'};
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 15px;
  i {
    cursor: pointer;
    padding: 10px 8px 6px 0;
    color: inherit;
    margin-left: 15px;
  }
  .fa-male {
    padding: 10px 13px 6px 6px;
  }
  .admin-icons {
    padding: 10px 10px 6px 0;
  }
  &:hover {
    color: ${ props => props.theme.defaultColorOnHover};
  }
    &:hover {
      //border: 1px solid ${props => props.theme.defaultColorOnHover};
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
  margin-bottom: 20px;
  border-left: ${props => props.islinkselected === 'true' ? `1px solid ${props.theme.defaultColor}` : '0px solid transparent'};
  i {
    cursor: pointer;
    font-size: 21px;
    color: ${ props => props.theme.defaultColor};
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
  color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
  font-weight: bold;
  margin-left: -1px;
  margin-right: 41px;
  margin-top: -65px;
  display: flex;
  align-items: center;
  margin-bottom: 9px;
  border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props.theme.defaultColorOnHover}` : '7px solid transparent'};
  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
    .div-window {
      background-color: ${props => props.theme.defaultColorOnHover};
    }
  }
  .div-window {
    background-color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
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
  margin-left: 15px;
  margin-right: 9px;
  margin-bottom: 0px;
  div {
    background-color: ${props => props.theme.defaultColor};
    border-radius: 2px;
    width: 43%;
    height: 40%;
  }
`;

const PNoCatFollowMessage = styled.p`
  display: ${props => props.isfollowedcatsopen === 'true' ? 'flex' : 'none'};
  margin: 0 0 0 60px;
  width: 180px;
  height: 50px;
  color: ${props => props.theme.defaultColor};
  justify-content: center;
`;

const LiCategoryFollowed = styled.li`
  display: ${props => props.isfollowedcatsopen === 'true' ? 'list-item' : 'none'};
  padding-left: 50px;
  border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props => props.theme.defaultColorOnHover}` : '1px solid transparent'};
  list-style-position: inside;
  
  &::before{
    // background-color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
    background-color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
    font-weight: bold;
    display: inline-block; 
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 16px;
    margin-bottom: 20px;
  }
`;

const LinkSideNav = styled(Link)`
border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props.theme.defaultColorOnHover}` : '5px solid transparent'};
//border-left: 5px solid ${props => props.theme.defaultColorOnHover};
  text-decoration: none;
  // color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
  color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
  font-weight: bold;
  display: flex;
  align-items: center;
  height: 35px;
  margin-bottom: 20px;

  span {
    width: 30px;
    display: inline-block;
    text-align: center;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0px 4px 0px 6px;
    i {
      cursor: pointer;
      padding: 10px 10px 9px 0;
      color: inherit;
      margin-left: 15px;
      
    }
  }
  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
  }
`;

const DivNavContainer = styled.div`
  color: ${props => props.islinkselected === 'true' ? props.theme.defaultColorOnHover : props.theme.defaultColor};
`;

// const DropdownFollowing = styled.div`
//   display: flex;
//   text-align: center;
// `;

const DivModalRaised = styled.div`
font-weight: normal;
color: ${props => props.islinkselected === 'true' ? props.theme.defaultColorOnHover : props.theme.defaultColor};
&:hover {
  color: ${props => props.theme.defaultColorOnHover};
  cursor: pointer;
}

`
const UserTeams = styled.div`
  .noteams {
    font-size: .8rem;
    padding-left: 20px;
    font-weight: bold;
  }
  .teams {
    padding-left: 4px;

    span {
      padding: 0px 1px 0px 6px;
    }

    img {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }

    .logo {
      margin-left: 10px;
    }
  }
`;

const TeamsContent = styled.div`
  display: ${props => props.section === true ? 'block' : 'none'}
`;
const CatContent = styled.div`
  display: ${props => props.section === true ? 'block' : 'none'}
`;
const ResourcesContent = styled.div`
  display: ${props => props.section === true ? 'block' : 'none'};
  
`;
/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
      linkSelected: 'AllPosts',
      categories: [],
      categoryFollows: [],
      userTeams: [],
      resources: [],
      isFollowedCatsOpen: true,
      setWrapperRef: this.setWrapperRef.bind(this),
      updated: this.props.verified,
      isTeamSectionDisplayed: true,
      isCatSectionDisplayed: true,
      isResourcesSectionDisplayed: true,
    }
  }

  componentDidMount = () => {
    this.props.getCategoriesFollowed().then(() => {
      this.setState({ categories: this.props.categoriesFollowed, categoryFollows: this.props.categoryFollows });
    });

    this.props.getUsersTeams().then(() => {
      this.setState({ userTeams: this.props.userTeams });
    });

    this.props.getKeyResources().then(() => {
      this.setState({ resources: this.props.resource })
    })

    document.addEventListener('click', this.handleClick, false);
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.categoryFollows !== this.props.categoryFollows) {
      this.props.getCategoriesFollowed().then(() => {
        this.setState({ categories: this.props.categoriesFollowed, categoryFollows: this.props.categoryFollows });
      });
    }
    if (prevProps.userTeams !== this.props.userTeams) {
      this.setState({ userTeams: this.props.userTeams })
    }
  }

  componentWillUnmount = () => {
    document.addEventListener('click', this.handleClick, false);
  }
  selectLink = (linkName) => {
    this.setState({ linkSelected: linkName });
    if (this.props.isOpen) {
      this.props.toggleSideNav();
    }
  }

  toggleFollowedCats = () => {
    this.setState({ isFollowedCatsOpen: !this.state.isFollowedCatsOpen })
  }

  handleClick = e => {
    if (this.wrapperRef && !this.wrapperRef.contains(e.target) && e.target.id !== 'nav-button' && this.props.isOpen) {
      this.props.toggleSideNav();
    }
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  render() {
    const { user_type } = this.props;
    const { isTeamSectionDisplayed, isCatSectionDisplayed, isResourcesSectionDisplayed } = this.state;
    //console.log(this.props.verified)
    if (!this.props.verified) {
      return (
        <NoGo2 />
      )
    }

    return (
      <DivSideNav isOpen={`${this.props.isOpen}`} ref={this.state.setWrapperRef}>


        <DivNavContainer>
          {
            (user_type === 'admin') &&
            <span className='section-select admin'><div className="underit">ADMIN</div></span>
          }
          <H4BrowseCategories>
            <div>
              {
                (user_type === 'admin') &&
                <LinkBrowseCategories
                  to={`/admin`}
                  islinkselected={(this.state.linkSelected === 'Admin').toString()}
                  onClick={() => this.selectLink('Admin')}
                  className='browse-categories'
                ><i className="fas fa-male" />User Management</LinkBrowseCategories>
              }
            </div>
            <div>
              {
                (user_type === 'admin') &&
                <LinkBrowseCategories
                  to={`/analytics`}
                  islinkselected={(this.state.linkSelected === 'Analytics').toString()}
                  onClick={() => this.selectLink('Analytics')}
                  className='browse-categories'
                ><i className="fas fa-chart-line admin-icons" />Analytics</LinkBrowseCategories>
              }
            </div>
            <div>
              {
                (user_type === 'admin') &&
                <LinkBrowseCategories
                  to={`/resources`}
                  islinkselected={(this.state.linkSelected === 'Resources').toString()}
                  onClick={() => this.selectLink('Resources')}
                  className='browse-categories'
                ><i className="fas fa-comment admin-icons" />Resources</LinkBrowseCategories>
              }
            </div>
          </H4BrowseCategories>
        </DivNavContainer>


        <span className='section-select admin' onClick={() => this.setState({ isResourcesSectionDisplayed: !this.state.isResourcesSectionDisplayed })}>
        <div className="underit">RESOURCES</div>
          {isResourcesSectionDisplayed ? <i className="fas fa-chevron-up"/>: <i className="fas fa-chevron-down"/>}
        </span>
        <ResourcesContent section={isResourcesSectionDisplayed}>
          <DivNavContainer>
            <H4BrowseCategories>
            <div className='alignstuff'>
              <ResourcesLinks className='browse-categories' resources={this.state.resources} />
            </div>
            </H4BrowseCategories>
          </DivNavContainer>  
        </ResourcesContent>



        <span className='section-select admin' onClick={() => this.setState({ isTeamSectionDisplayed: !this.state.isTeamSectionDisplayed })}>
        <div className="underit">TEAMS</div>
          {isTeamSectionDisplayed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
        </span>
        <TeamsContent section={isTeamSectionDisplayed}>
          <DivNavContainer>
            <H4BrowseCategories>
              <DivModalRaised onClick={(ev) => this.props.setAddTeamModalRaised(ev, true)}>
                <i style={{ marginLeft: 22 + 'px', marginTop: 10 + 'px', marginRight: 9 + 'px', marginBottom: 9 + 'px' }} className="fas fa-plus-circle" />
                Create Team
              </DivModalRaised>
              <div>
                <LinkBrowseCategories
                  to='/teams'
                  islinkselected={(this.state.linkSelected === 'Teams').toString()}
                  onClick={() => this.selectLink('Teams')}
                  className='browse-categories'
                ><i className="fas fa-book-open" />Browse Teams</LinkBrowseCategories>

              </div>
              <UserTeams>
                {this.state.userTeams.length === 0 ? <div className='noteams'>You're not apart of any Teams Yet!</div> : this.state.userTeams.map(team => (
                  <LinkSideNav 
                    to={`/team/discussions/${team.team_id}`}
                    islinkselected={(this.state.linkSelected === team.team_name).toString()}
                    onClick={() => this.selectLink(team.team_name)}
                    className='browse-categories teams'
                    key={team.team_id}>
                    <span>
                      { team.logo ? <img src={team.logo} alt='team logo' /> : <i className="fas fa-users logo"></i>}
                    </span>
                    {team.team_name}
                  </LinkSideNav>
                ))}
              </UserTeams>
            </H4BrowseCategories>
          </DivNavContainer>
        </TeamsContent>



        <span className='section-select admin' onClick={() => this.setState({ isCatSectionDisplayed: !this.state.isCatSectionDisplayed })}>
        <div className="underit">CATEGORIES</div>
          {isCatSectionDisplayed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}
        </span>
        <CatContent section={isCatSectionDisplayed}>
          <DivNavContainer>

            <div onClick={(ev) => this.props.setAddCatModalRaised(ev, true)}>
              {(accountUserTypes.indexOf(user_type) >= subSilverStartIndex) &&
                <DivModalRaised>
                  <i style={{ marginLeft: 22 + 'px', marginTop: 15 + 'px', marginRight: 9 + 'px', marginBottom: 4 + 'px' }} className="fas fa-plus-circle" />
                  Create Category
              </DivModalRaised>
              }

              { //<span>New&nbsp;Category&nbsp;</span>
              }

              {/* {console.log(accountUserTypes)} */}
            </div>

            <DivHeader>

              <H4BrowseCategories
                islinkselected={(this.state.linkSelected === 'BrowseCategories').toString()}
              >

                <LinkBrowseCategories style={{ marginLeft: -6 + 'px' }}
                  to={`/categories`}
                  islinkselected={(this.state.linkSelected === 'BrowseCategories').toString()}
                  onClick={() => this.selectLink('BrowseCategories')}
                  className='browse-categories'
                ><i className="fas fa-book-open" />Browse&nbsp;Categories&nbsp;</LinkBrowseCategories>

              </H4BrowseCategories>


            </DivHeader>
            <DivCategoriesFollowed>
              <DivCatFollowItems>
                <H4AllPosts islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>

                  <LinkAllPosts onClick={() => this.selectLink('AllPosts')} to='/home' islinkselected={(this.state.linkSelected === 'AllPosts').toString()}>
                    <DivWindows>
                      <div className='div-window' />
                      <div className='div-window' />
                      <div className='div-window' />
                      <div className='div-window' />
                    </DivWindows>All&nbsp;Posts</LinkAllPosts>
                  {/* <i className={this.state.isFollowedCatsOpen ? "fas fa-minus-circle" : "fas fa-plus-circle"} onClick={this.toggleFollowedCats} /> */}
                </H4AllPosts>
                <ul>
                  {(this.state.categories.length === 0) ? (<PNoCatFollowMessage isfollowedcatsopen={(this.state.isFollowedCatsOpen).toString()}>You are currently not following any categories</PNoCatFollowMessage>) : (this.state.categories.map((category, index) => (
                    <LiCategoryFollowed
                      isfollowedcatsopen={(this.state.isFollowedCatsOpen).toString()}
                      key={index} islinkselected={(this.state.linkSelected === category.name).toString()}>
                      <LinkSideNav onClick={() => this.selectLink(category.name)}
                        islinkselected={(this.state.linkSelected === category.name).toString()}
                        to={`/discussions/category/${category.id}`}>
                        <span>
                          <i className={category.icon}
                            islinkselected={(this.state.linkSelected === category.name).toString()} />
                        </span>
                        {category.name}
                      </LinkSideNav>
                    </LiCategoryFollowed>
                  )))}
                </ul>
              </DivCatFollowItems>
            </DivCategoriesFollowed>
          </DivNavContainer>
        </CatContent>




        




        




      </DivSideNav>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.users.user_id,
  categoryFollows: state.users.categoryFollows,
  user_type: state.users.user_type,
  categoriesFollowed: state.categories.categoriesFollowed,
  userTeams: state.teams.userTeams,
  verified: state.users.verified,
  resource: state.emails.resources
});

export default connect(
  mapStateToProps,
  { getCategoriesFollowed, getUsersTeams, getUsers, verifyEmail, getKeyResources }
)(SideNav);