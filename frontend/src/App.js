import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { scroller } from 'react-scroll';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';

// globals
import { dayTheme, nightTheme, sideNavWidth, topHeaderHeight } from './globals/globals.js';

// components
import {
  Header,
  SideNav,
  Profiles,
  Profile,
  Settings,
  Error,
  Footer,
  Message,
  ConfirmEmail,
  RequestResetPWForm,
  ResetPWForm,
  DiscussionsByCats,
  AddCategoryModal,
  LoginDropdown,
  AvatarDropdown,
  Notifications,
  ChangeSubscriptionModal,
  RegisterDropdown,
} from './components/index.js';

// views
import {
  LandingView,
  CategoriesView,
  DiscussionView,
  RegisterView,
  NonUserLandingView,
} from './views/index.js';

// action creators
import { logBackIn, markNotificationsAsRead, toggleTheme } from './store/actions/index.js';

const GlobalStyle = createGlobalStyle`
  html,
  body,
  #root {
    margin: 0 auto;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex-direction: column;
    background: ${props => props.theme.appBgColor};
    width: 100%;
    min-height: 100vh;
  }
`;

const AppWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  position: relative;
  min-height: 100vh;
`;

const DivBody = styled.div`
  display: flex;
  flex-direction: row;
  width: ${props => props.isLoggedIn ? 'calc(100% - ' + sideNavWidth + ')' : '100%'};
  min-height: 100%;
  flex-grow: 1;
  justify-content: center;
  align-items: flex-start;
  margin: ${props => props.isLoggedIn ? '0 0 40px ' + sideNavWidth : '0 0 40px 0'}  ;

  @media(max-width: 800px) {
    width: 100%;
    margin: 0 0 40px 0;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const DivSideNav = styled.div`
  display: ${props => props.isLoggedIn ? 'flex' : 'none'};
  width: ${sideNavWidth};
  min-height: 100%;
  position: fixed;
  left: 0;
  top: ${topHeaderHeight};
  z-index: 7801;
  box-sizing: border-box;
  border-right: 2px solid rgb(243, 245, 248);
  height: 100%;

  @media(max-width: 800px) {
    position: relative;
    height: auto;
    width: 99.9%;
    border: none;
    top: 0;
  }
`;

const DivPage = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  position: relative;
`;

class App extends Component {
  constructor(props) {
    super(props);

    // Initial state: day time!
    this.state = {
      theme: dayTheme,
      showSearch: false,
      showNotifications: false,
      isLoginDropdownModalRaised: false,
      isAvatarModalRaised: false,
      isNotificationsModalRaised: false,
      isChangeSubModalRaised: false,
      isAddCatModalRaised: false,
      showRegisterModal: false,
    };
  }

  switchTheme = () => {
    // Toggle day / night on click
    const { toggleTheme } = this.props;
    return toggleTheme().then(() => this.setState({ theme: this.props.isDay ? dayTheme : nightTheme }));
  }

  setLoginDropdownModalRaised = (ev, status) => {
    ev.stopPropagation();
    this.setState({ isLoginDropdownModalRaised: status });
  }

  toggleRegisterModal = ev => {
    ev.stopPropagation();
    this.setState({ showRegisterModal: !this.state.showRegisterModal });
  }

  setAvatarModalRaised = (ev, status) => {
    ev.stopPropagation();
    this.setState({ isAvatarModalRaised: status });
  }

  setNotificationsModalRaised = (ev, status) => {
    ev.stopPropagation();
    this.setState({ isNotificationsModalRaised: status },
      () => this.props.newNotifications && this.props.markNotificationsAsRead());
  }

  setChangeSubModalRaised = (ev, status) => {
    (ev) && ev.stopPropagation();
    this.setState({ isChangeSubModalRaised: status });
  }

  setAddCatModalRaised = (ev, status) => {
    ev.stopPropagation();
    this.setState({ isAddCatModalRaised: status });
  }

  toggleSearch = () => this.setState({ showSearch: !this.state.showSearch });
  isAuthenticated() {
    // check whether the current time is past the access token's expiry time
    const expiresAt = localStorage.getItem('symposium_auth0_expires_at');
    return new Date().getTime() < expiresAt;
  };
  goTo = async url => await this.setState({ showSearch: false }, () => this.props.history.push(url));
  scrollTo = id => {
    if (id || this.props.location.hash.substring(1)) {
      return scroller.scrollTo(id || this.props.location.hash.substring(1), {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  };
  handleHashChange = () => this.scrollTo();
  componentDidMount() {
    const user_id = localStorage.getItem('symposium_user_id');
    const token = localStorage.getItem('symposium_token');
    window.addEventListener('hashchange', this.handleHashChange, false);
    if (user_id && token) return this.props.logBackIn(user_id, token);
  };
  componentDidUpdate(prevProps) {
    if (prevProps.location.hash.substring(1) !== this.props.location.hash.substring(1)) {
      return this.scrollTo();
    }
  };
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.handleHashChange, false);
  };

  render() {
    const { showSearch } = this.state;
    const { error, history, message, location, isDay } = this.props;
    if (this.isAuthenticated() || localStorage.getItem('symposium_user_id')) {
      if ((this.isAuthenticated() || localStorage.getItem('symposium_user_id'))) {
      }
      return (
        <ThemeProvider theme={this.state.theme}>
          <AppWrapper isDay={isDay}>
            <GlobalStyle />
            <Header showSearch={showSearch} scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} isDay={isDay} history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch} switched={this.switchTheme} isLoginDropdownModalRaised={this.state.isLoginDropdownModalRaised} setLoginDropdownModalRaised={this.setLoginDropdownModalRaised} isAvatarModalRaised={this.state.isAvatarModalRaised} setAvatarModalRaised={this.setAvatarModalRaised} isNotificationsModalRaised={this.state.isNotificationsModalRaised} setNotificationsModalRaised={this.setNotificationsModalRaised} />
            <AvatarDropdown history={history} isAvatarModalRaised={this.state.isAvatarModalRaised} setAvatarModalRaised={this.setAvatarModalRaised} />
            <Notifications history={history} isNotificationsModalRaised={this.state.isNotificationsModalRaised} setNotificationsModalRaised={this.setNotificationsModalRaised} />
            <ChangeSubscriptionModal isChangeSubModalRaised={this.state.isChangeSubModalRaised} setChangeSubModalRaised={this.setChangeSubModalRaised} />
            <DivBody isLoggedIn>
              <DivSideNav isLoggedIn>
                <SideNav setAddCatModalRaised={this.setAddCatModalRaised} />
              </DivSideNav>
              <DivPage>
                {(this.state.isAddCatModalRaised) && <AddCategoryModal history={history} historyPush={this.props.history.push} pathname={location.pathname} isAuthenticated={this.isAuthenticated} setAddCatModalRaised={this.setAddCatModalRaised} />}
                <Route exact path='/' component={NonUserLandingView} />
                <Route exact path='/home' component={LandingView} />
                <Route path='/profiles' component={Profiles} />
                <Route path='/profile/:id' component={Profile} />
                <Route path='/categories' render={() => <CategoriesView history={history} historyPush={this.props.history.push} setAddCatModalRaised={this.setAddCatModalRaised} isAddCatModalRaised={this.state.isAddCatModalRaised} />} />
                <Route path='/discussion/:id' render={props => <DiscussionView {...props} scrollTo={this.scrollTo} />} />
                <Route path='/settings/:id' render={props => <Settings {...props} setChangeSubModalRaised={this.setChangeSubModalRaised} />} />
                <Route path='/discussions/category/:category_id' component={DiscussionsByCats} />
                <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
              </DivPage>
            </DivBody>
            <Footer toggleSearch={this.toggleSearch} switched={this.switchTheme} />
            {error && <Error error={error} />}
            {message && <Message message={message} />}
          </AppWrapper>
        </ThemeProvider>
      );
    } else {
      // prettier-ignore
      return (
        <ThemeProvider theme={this.state.theme}>
          <AppWrapper>
            <GlobalStyle />
            <Header showSearch={showSearch} scrollTo={this.scrollTo} pathname={location.pathname} goTo={this.goTo} isDay={isDay} history={history} isAuthenticated={this.isAuthenticated} toggleSearch={this.toggleSearch} switched={this.switchTheme} isLoginDropdownModalRaised={this.state.isLoginDropdownModalRaised} setLoginDropdownModalRaised={this.setLoginDropdownModalRaised} isAvatarModalRaised={this.state.isAvatarModalRaised} setAvatarModalRaised={this.setAvatarModalRaised} isNotificationsModalRaised={this.state.isNotificationsModalRaised} setNotificationsModalRaised={this.setNotificationsModalRaised} toggleRegisterModal={this.toggleRegisterModal} />
            <DivBody>
              <LoginDropdown history={history} isLoginDropdownModalRaised={this.state.isLoginDropdownModalRaised} setLoginDropdownModalRaised={this.setLoginDropdownModalRaised} />
              <RegisterDropdown history={history} showRegisterModal={this.state.showRegisterModal} toggleRegisterModal={this.toggleRegisterModal} />
              <DivSideNav>
                {/* <SideNav /> */}
              </DivSideNav>
              <DivPage>
                <Switch>
                  <Route path='/register' component={RegisterView} />
                  <Route path='/request-reset-pw' component={RequestResetPWForm} />
                  <Route path='/reset/:reset_pw_token' component={ResetPWForm} />
                  <Route path='/confirm-email/:email_confirm_token' component={ConfirmEmail} />
                  <Route component={NonUserLandingView} />
                </Switch>
              </DivPage>
            </DivBody>
            <Footer toggleSearch={this.toggleSearch} switched={this.switchTheme} />
            {error && <Error error={error} />}
            {message && <Message message={message} />}
          </AppWrapper>
        </ThemeProvider>
      );
    }
  }
};

const mapStateToProps = state => ({
  error: state.users.error,
  message: state.users.message,
  newNotifications: state.users.newNotifications,
  isDay: state.users.isDay,
});

export default connect(
  mapStateToProps,
  { logBackIn, markNotificationsAsRead, toggleTheme }
)(App);