// Variables
const auth0ClientID = process.env.REACT_APP_AUTH0_CLIENT_ID;
const auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth0RedirectUri = process.env.REACT_APP_REDIRECT_URI;
const backendUrl = process.env.REACT_APP_BACKEND_URL;
const pusherKey = process.env.REACT_APP_PUSHER_KEY;
const pusherCluster = process.env.REACT_APP_PUSHER_CLUSTER;
const sideNavWidth = '250px';
const stripePayFormat = [999, 1999]; // matching subscriptionPrices
const stripeToken = process.env.REACT_APP_STRIPE_TOKEN;
const accountUserTypes = ['user', 'silver_member', 'gold_member', 'admin']; // Must match with globals on front end
const subFreeStartIndex = 0;
const subSilverStartIndex = 1;
const subGoldStartIndex = 2;
const subscriptionPlans = ['free', 'silver', 'gold']; // same order as subscriptionPrices
const subscriptionPrices = ['$0.00', '$9.99/yr', '$19.99/yr']; // same order as subscriptionPlans
const searchCharLimit = 64; // limits the max number of characters to return in a search
const topHeaderHeight = '60px';
const maxLengthInNotifications = 32;
const maxNumOfNotifications = 5;

// must match defaultAvatar on backend globals
const defaultAvatar = 'data:image/png;base64,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';

// subscription features
const subscriptionFreeFeatures = [
  'Account Profile',
  'Account Settings',
  'Add Posts to Categories',
  'Add Comments to Posts',
  'Add Replies to Comments'
];
const subscriptionSilverFeatures = [
  'Gets Signature',
  'Add Categories'
];
const subscriptionGoldFeatures = [
  'Gets Avatar'
];

// mixins
//Media Queries
const phoneP = '(max-width: 480px)'; // portrait
const phoneL = '(max-width: 599px)'; // landscape
const tabletP = '(max-width: 768px)'; // portrait
const tabletL = '(max-width: 1024px)'; // landscape

// Copy from backend globals (can't import from out of src folder)
const accountStatusTypes = ['inactive', 'active', 'banned']; // be careful when adding new things or changing order

const dayTheme = {
  appBgColor: '#f8f9fe',
  authBgColor: 'gray',
  authColor: 'white',
  authLinkRegColor: 'white',
  authLinkRegColorHov: 'black',
  authLoginColor: 'white',
  authLoginColorHov: 'black',
  borderColor: '#F3F5F8',
  catNameColor: 'black',
  catDiscussionCountColor: 'black',
  catBgColorHov: 'rgba(255, 255, 255, 0.6)',
  catTimestampColor: 'black',
  catTitleColor: 'black',
  catNameDateColor: 'black',
  catViewWrapperBgColor: '#54BDFF',
  catViewWrapperHeaderColor: 'black',
  defaultColor: 'black',
  defaultColorOnHover: '#418DCF',
  discussionUsernameColor: 'black',
  discussionAvatarUsernameColor: 'black',
  discussionPostColor: 'black',
  discussionByCatWrapperBgColor: '#e8e3e0',
  discussionByCatWrapperBgColorHov: 'rgba(255, 255, 255, 0.195)',
  discussionByCatWrapperBxShdw: '2px 3px 2px 2px #10355C',
  discussionByCatTitleColor: 'black',
  discussionByCatTitleBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatTitleColorHov: 'white',
  discussionByCatCategoryColor: 'black',
  discussionByCatCategoryBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatCategoryColorHov: 'white',
  discussionByCatNameDateColor: 'black',
  discussionByCatNameDateBgColorHov: 'rgba(255, 255, 255, 0.13)',
  discussionByCatNameDateColorHov: 'white',
  errorWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  errorBoxBgColor: '#C9C19F',
  errorBoxPColor: '#b30000',
  footerColor: '#2C2E31',
  headerBg: 'white',
  headerLinkColor: 'white',
  headerLinkColorHov: 'black',
  headerTitleColor: 'white',
  headerTitleAColor: '#f7f5f3',
  headerTitleAColorHov: 'black',
  headerTitleSubheaderColor: '#f7f5f3',
  highlightWrapperColor: 'white',
  landingViewWrapperBgColor: '#fnf8fe',
  messageWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  messageBoxBgColor: '#657ED4',
  messageBoxBorder: '1px solid black',
  messageBoxPColor: 'black',
  notificationFontColor: 'black',
  notificationBackgroundColor: 'white',
  navWelcomeUsername: 'black',
  navWelcomeUsernameHov: 'white',
  postWrapperBorder: '1px solid black',
  postPostedByUsernameColor: 'black',
  postCountWrapperBorder: '0px solid black',
  postCountWrapperColor: 'black',
  profilesWrapperBorder: '1px solid gray',
  profilesWrapperBgColor: '#e8e3e0',
  profilesWrapperBxShdw: '#610b07 2px 1px 2px 2px;',
  profilesWrapperBgColorHov: 'rgba(255, 255, 255, 0.40)',
  profilesTitleColor: 'black',
  profileBgColor: '#976DFF',
  profileBorder: '1px solid gray',
  profileBxShdw: '#10355C 2px 1px 2px 2px',
  profileTitleColor: 'black',
  profileTitleContentColor: 'black',
  profileTitleContentDColor: 'black',
  profileTitleSubContentDColor: 'black',
  searchWrapperBgColor: 'rgba(0, 0, 0, 0.5)',
  searchBoxBgColor: '#F7F9FC',
  searchBoxBorder: '1px solid black',
  searchBoxCloseBtnBgColor: 'red',
  searchCatResultWrapperTypeBgColor: 'blue',
  searchCatResultWrapperTypeColor: 'white',
  searchCatResultWrapperUsernameBgColorHov: '#444',
  searchCatResultWrapperUsernameColorHov: 'white',
  searchDisResultWrapperTypeBgColor: 'red',
  searchDisResultWrapperTypeColor: 'white',
  searchDisResultWrapperUsernameBgColorHov: '#444',
  searchDisResultWrapperUsernameColorHov: 'white',
  searchPostResultWrapperTypeBgColor: 'green',
  searchPostResultWrapperTypeColor: 'white',
  searchPostResultWrapperUsernameBgColorHov: '#444',
  searchPostResultWrapperUsernameColorHov: 'white',
  settingsButtonBgColor: '#4ca0e0',
  settingsBxShdw: '4px 6px 4px 4px #fnf8fe',
  settingsButtonHov: 'green',
  settingsDeleteButtonBg: 'red',
  settingsDeleteButtonBgHov: 'black',
  settingsDeleteButtonColor: 'white',
  settingsEditAvatarButtonBg: '#4ca0e0',
  settingsEditAvatarButtonBgHov: '#4ca0e0',
  tooltipWrapperBgColor: 'black',
  tooltipWrapperColor: 'fff',
  topDiscussionWrapperBxShdw: '2px 3px 2px 2px #10355C',
  topDiscussionElipBxShdw: '2px 3px 2px 2px #54bdff',
  topDiscussionWrapperBgHov: 'rgb(230,230,250)',
  topDiscussionTitleColor: 'black',
  topDiscussionCatColor: 'black',
  topDiscussionCatBgColorHov: 'rgba(255, 255, 255, 0.13)',
  topDiscussionNameDateColor: 'black',
  topDiscussionNameDateBgColor: 'rgba(255, 255, 255, 0.13)',
  topDiscussionElipBgColor: 'rgba(60, 57, 57)',
  settingsBgColor: 'white',
  skyColor: '#37d8e6',
  symposiumBorderColor: '#f1c40f',

};

const nightTheme = {
  appBgColor: 'rgba(60, 57, 57)',
  authBgColor: 'gray',
  authColor: 'white',
  authLinkRegColor: 'white',
  authLinkRegColorHov: 'black',
  authLoginColor: 'white',
  authLoginColorHov: 'white',
  borderColor: '#F3F5F8',
  catNameColor: 'white',
  catDiscussionCountColor: 'white',
  catBgColorHov: 'rgba(51, 1, 54, 0.9)',
  catViewWrapperHeaderColor: 'white',
  catTimestampColor: 'white',
  catTitleColor: 'white',
  catNameDateColor: 'white',
  catViewWrapperBgColor: '#122042',
  defaultColor: 'lightgrey',
  defaultColorOnHover: 'white',
  discussionUsernameColor: 'white',
  discussionAvatarUsernameColor: 'black',
  discussionPostColor: 'lightgrey',
  discussionByCatWrapperBgColor: 'rgba(100, 200, 255, 0.33)',
  discussionByCatWrapperBgColorHov: 'rgba(51, 1, 54, 0.33)',
  discussionByCatWrapperBxShdw: '2px 3px 2px 2px rgba(18, 32, 66)',
  discussionByCatTitleColor: 'white',
  discussionByCatTitleBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatTitleColorHov: 'black',
  discussionByCatCategoryColor: 'white',
  discussionByCatCategoryBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatCategoryColorHov: 'black',
  discussionByCatNameDateColor: 'white',
  discussionByCatNameDateBgColorHov: 'rgba(100, 200, 255, 0.33)',
  discussionByCatNameDateColorHov: 'black',
  errorWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  errorBoxBgColor: 'red',
  errorBoxPColor: 'purple',
  footerColor: '#2C2E31',
  headerBg: 'rgba(60, 57, 57)',
  headerLinkColor: 'white',
  headerLinkColorHov: 'white',
  headerTitleColor: 'white',
  headerTitleAColor: 'white',
  headerTitleAColorHov: 'white',
  headerTitleSubheaderColor: 'white',
  highlightWrapperColor: 'white',
  landingViewWrapperBgColor: 'rgba(60, 57, 57)',
  messageWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  messageBoxBgColor: 'pink',
  messageBoxBorder: '1px solid white',
  messageBoxPColor: 'white',
  navWelcomeUsername: 'white',
  navWelcomeUsernameHov: 'white',
  notificationFontColor: 'white',
  notificationBackgroundColor: 'rgba(60, 57, 57)',
  postWrapperBorder: '1px solid white',
  postPostedByUsernameColor: 'white',
  postCountWrapperBorder: '0px solid white',
  postCountWrapperColor: 'white',
  profilesWrapperBorder: '1px solid #330136',
  profilesWrapperBgColor: 'green',
  profilesWrapperBxShdw: '#330136 2px 1px 2px 2px',
  profilesWrapperBgColorHov: 'rgba(100, 200, 255, 0.80)',
  profilesTitleColor: 'white',
  profileBorder: '1px solid #2A3240',
  profileBgColor: '#122042',
  profileBxShdw: '#2A3240 2px 1px 2px 2px',
  profileTitleColor: 'white',
  profileTitleContentColor: 'white',
  profileTitleContentDColor: 'white',
  profileTitleSubContentDColor: 'white',
  searchWrapperBgColor: 'rgba(0, 0, 0, 0.8)',
  searchBoxBgColor: '#F7F9FC',
  searchBoxBorder: '1px solid white',
  searchBoxCloseBtnBgColor: 'white',
  searchCatResultWrapperTypeBgColor: 'green',
  searchCatResultWrapperTypeColor: 'black',
  searchCatResultWrapperUsernameBgColorHov: 'green',
  searchCatResultWrapperUsernameColorHov: 'black',
  searchDisResultWrapperTypeBgColor: 'pink',
  searchDisResultWrapperTypeColor: 'black',
  searchDisResultWrapperUsernameBgColorHov: 'green',
  searchDisResultWrapperUsernameColorHov: 'black',
  searchPostResultWrapperTypeBgColor: 'yellow',
  searchPostResultWrapperTypeColor: 'black',
  searchPostResultWrapperUsernameBgColorHov: 'green',
  searchPostResultWrapperUsernameColorHov: 'black',
  settingsBgColor: 'rgba(60, 57, 57)',
  settingsBxShdw: '4px 6px 4px 4px #yellow',
  settingsButtonHov: 'grey',
  settingsDeleteButtonBg: 'red',
  settingsDeleteButtonBgColor: 'white',
  settingsEditAvatarButtonBgHov: 'red',
  tooltipWrapperBgColor: 'white',
  tooltipWrapperColor: 'black',
  topDiscussionWrapperBxShdw: '2px 3px 2px 2px #330136',
  topDiscussionElipBxShdw: '2px 3px 2px 2px #330136',
  topDiscussionWrapperBgHov: 'rgba(18, 32, 66, 0.8)',
  topDiscussionTitleColor: 'white',
  topDiscussionCatColor: 'white',
  topDiscussionCatBgColorHov: 'green',
  topDiscussionNameDateColor: 'white',
  topDiscussionNameDateBgColorHov: 'rgba(100, 220055, 255, 0.33)',
  topDiscussionElipBgColor: '#2A3240',
  topDiscussionElipColor: 'white',
  skyColor: '#2c3e50',
  symposiumBorderColor: '#eaeff2',
}
const isUrl = (str, profileLink = false) => {
  /*if it is a profileLink meaning set to true check if str is null if it is return true. This will allow  for a user to reset their profile link to null
   this would also make sure that isUrl when used in other areas is not changed. 
  */
 if (profileLink === true && str.length === 0) return true; 
  var pattern = new RegExp('^((ft|htt)ps?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?' + // port
    '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
    '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return pattern.test(str);
}

module.exports = {
  accountStatusTypes,
  accountUserTypes,
  subFreeStartIndex,
  subSilverStartIndex,
  subGoldStartIndex,
  auth0ClientID,
  auth0Domain,
  auth0RedirectUri,
  backendUrl,
  defaultAvatar,
  phoneP,
  phoneL,
  sideNavWidth,
  stripePayFormat,
  stripeToken,
  subscriptionPlans,
  subscriptionPrices,
  subscriptionFreeFeatures,
  subscriptionSilverFeatures,
  subscriptionGoldFeatures,
  searchCharLimit,
  topHeaderHeight,
  maxLengthInNotifications,
  maxNumOfNotifications,
  pusherKey,
  pusherCluster,
  tabletP,
  tabletL,
  dayTheme,
  nightTheme,
  isUrl,
};
