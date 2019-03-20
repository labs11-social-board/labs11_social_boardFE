import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';

// globals
import {
  phoneL,
  topHeaderHeight,
  accountUserTypes,
  subscriptionPlans,
  subscriptionPrices,
  stripePayFormat,
  stripeToken,
  subscriptionFreeFeatures,
  subscriptionSilverFeatures,
  subscriptionGoldFeatures
} from '../globals/globals.js';

// actions
import { stripePayment, changeUserType } from '../store/actions/index';

/***************************************************************************************************
 ********************************************** Styles *********************************************
 **************************************************************************************************/
const DivChangeSubModal = styled.div`
  display: ${props => props.ischangesubmodalraised === 'true' ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9950;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  user-select: none;
  @media ${phoneL} {
    margin-top: ${topHeaderHeight};
  }
`;

const DivScroller = styled.div`
display: flex;
background-color: white;
z-index: 9999;
width: 75%;
height: 70%;
overflow-y: auto;

@media(max-width: 1200px) {
  width: 100%;
  height: 100%;
  align-items: center;
}
`;

const DivChangeSub = styled.div`
display: flex;
width: 100%;
height: 630px;
flex-direction: column;
padding: 0 50px;
border-radius: 5px;

@media(max-width: 1200px) {
  width: 100%;
  height: 100%;
  align-items: center;
}
@media ${phoneL} {
  padding: 0;
}
`;

const FormChangeSub = styled.form`
  display: flex;
    width: 100%;
`;

const DivHeader = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 25px;
  border-bottom: 1px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
  @media(max-width: 1200px){
    border: none;
    margin: 0;
  }
`;

const DivBack = styled.div`
  display: flex;
  margin-top: 30px;
  position: absolute;
  top: 0;
  left: 0;
  @media(max-width: 1200px) {
    margin-top: 24px;
  }
  i {
    align-self: flex-start;
    font-size: 30px;
    cursor: pointer;
  }
  @media ${phoneL} {
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const DivHeaderTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  @media ${phoneL} {
    margin-bottom: 25px;
  }
`;

const H1HeaderTitle = styled.h1`
  display: flex;
  font-weight: normal;
  @media(max-width: 1200px) {
    font-size: 28px;
  }
  @media ${phoneL} {
    font-size: 18px;
  }
`;

const DivSelectBanners = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  @media(max-width: 1200px) {
    flex-direction: column;
  }
`;

const DivBanner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 410px;
  cursor: pointer;
  input {
    margin-top: 20px;
    width: 2em;
    height: 2em;
    cursor: pointer;
    visibility: hidden;
    @media(max-width: 1200px) {
      visibility: visible;
    }
  }
  @media(max-width: 1200px) {
    height: ${props =>
    props.subPlan
      ? 'auto'
      : '45px'};
    width: 100%;
    position: relative;
    input {
      margin-top: 0;
      position: absolute;
      top: ${props =>
    props.subPlan
      ? '25px'
      : '10px'};
      right: 10px;
    }
  }
`;

const DivFeatures = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  h2 {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    user-select: none;
    font-weight: normal;
  }
  ul {
    padding-right: 20px;
    user-select: none;
    font-weight: normal;
    margin: 0;
    @media(max-width: 1200px) {
      list-style: none;
      hr {
        display: none;
      }
    }
    &:not(:last-child) {
      @media(max-width: 1200px) {
        margin-bottom: 20px;
      }
    }
    &:last-child {
      @media(max-width: 1200px) {
        margin-bottom: 10px;
      }
    }
  }
  @media(max-width: 1200px) {
    overflow: ${props =>
    props.subPlan
      ? 'visible'
      : 'hidden'};
    h2 {
      justify-content: flex-start;
      text-decoration: none;
      margin-bottom: 20px;
      margin-top: 20px;
      margin-left: 25px;
      width: 150px;
      font-size: 22px;
    }
  }
`;

const IAsterisk = styled.i`
  display: none;
  @media(max-width: 1200px) {
    display: inline-block;
    margin-left: -20px;
    color: ${props => props.silver && '#848795'};
    color: ${props => props.gold && 'gold'};
  }
  @media ${phoneL} {
    font-size: 16px;
  }
`;

const DivFreePlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[0]
      ? '1px solid black'
      : '1px solid silver'};
  border-radius: 10px;
  font-weight: bold;
  height: 100%;
  position: relative;
  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media(max-width: 1200px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[0]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[0]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[0]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[0]
    && '50px'};
    margin-top: 23px;
    }
  }
  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[0] ? '1' : '0.7')};
  }
  @media(max-width: 1200px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
  }
`;

const DivSilverPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? '1px solid black'
      : '1px solid silver'};
  border-radius: 10px;
  font-weight: bold;
  height: 100%;
  position: relative;
  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media(max-width: 1200px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[1]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[1]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[1]
    && '50px'};
    margin-top: 23px;
    }
  }
  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[1] ? '1' : '0.7')};
  }
  @media(max-width: 1200px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
  }
`;

const DivGoldPlan = styled.div`
  display: flex;
  width: 255px;
  flex-direction: column;
  border: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? '1px solid black'
      : '1px solid silver'};
  border-radius: 10px;
  font-weight: bold;
  height: 100%;
  position: relative;
  h4 {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 100%;
    user-select: none;
    
    @media(max-width: 1200px) {
      display: ${props =>
    props.subPlan === subscriptionPlans[2]
      ? 'visible'
      : 'none'};
      top: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '1px'};
      text-align: ${props =>
    props.subPlan === subscriptionPlans[2]
    && 'right'};
      right: ${props =>
    props.subPlan === subscriptionPlans[2]
    && '50px'};
    margin-top: 23px;
    }
  }
  &:hover {
    opacity: ${props => (props.subPlan === subscriptionPlans[2] ? '1' : '0.7')};
  }
  @media(max-width: 1200px) {
    width: 100%;
    border-radius: 0;
    border: none; /* remove lime selection border first */
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

const DivBottom = styled.div`
display: flex;
flex-wrap: wrap;
margin-top: 25px;
width: 100%;
justify-content: flex-end;

@media (max-width: 1200px){
  justify-content: center;
}
@media ${phoneL} {
  margin-top: 45px;
}
`;

const DivButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  @media (max-width: 1200px){
  justify-content: center;
}
`;

const ButtonSubmit = styled.button`
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  background-color: #418DCF;
  color: white;
  border: 1px solid #418DCF;
  width: 200px;
  outline: none;
  height: 42px;
  &:hover {
    cursor: pointer;
    background-color: white;
    color: #418DCF;
    border: 1px solid #418DCF;
  }
  @media ${phoneL} {
    width: 80%;
    height: 62px;
    padding: 15px 0;
  }
`;

const DivStripeCheckout = styled.div`
  @media ${phoneL} {
    width: 80%;
  }
`;

const ButtonStripeCheckout = styled(StripeCheckout)`
  width: 200px;
  * {
    display: flex!important;
    height: 40px!important;
    justify-content: center;
    align-items: center;
    font-size: 14px!important;
    font-weight: normal!important;
  }
  @media ${phoneL} {
    width: 100%;
    border-radius: 0!important;
    * {
      padding: 15px 0!important;
      height: auto!important;
      border-radius: 0!important;
    }
  }
`;

/***************************************************************************************************
 ********************************************* Component *******************************************
 **************************************************************************************************/
class ChangeSubscriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subPlan: subscriptionPlans[1],
      username: ''
    }
  }

  selectSubPlan = sub => {
    this.setState({ subPlan: sub });
  };

  getUserTypeSelected = () => {
    return accountUserTypes[subscriptionPlans.indexOf(this.state.subPlan)];
  }

  getPaymentAmount = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]:
        return subscriptionPrices[1]; // Silver
      case subscriptionPlans[2]:
        return subscriptionPrices[2]; // Gold
      default:
        return subscriptionPrices[0]; // Free
    }
  }

  getStripePayment = () => {
    switch (this.state.subPlan) {
      case subscriptionPlans[1]: // Silver
        return stripePayFormat[0];
      case subscriptionPlans[2]: // Gold
        return stripePayFormat[1];
      default:
        return 0;
    }
  }

  onToken = (token) => {
    const headersObj = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {
        stripeToken: token.id,
        payment: this.getStripePayment(),
        description: `${this.state.subPlan.toUpperCase()} Plan`,
        email: this.state.email
      }
    }
    this.props.stripePayment(headersObj).then(() => this.props.changeUserType(this.props.profile.id, this.getUserTypeSelected()).then(() => this.props.setChangeSubModalRaised(null, false)));
  }



  submitHandler = ev => {
    ev && ev.preventDefault();
    try {
      this.props.changeUserType(this.props.profile.id, this.getUserTypeSelected()).then(() => this.props.setChangeSubModalRaised(null, false));
    } catch (err) {
      this.props.displayError(err);
    }
  };

  render() {
    const { setChangeSubModalRaised } = this.props;
    const stripeAmount = this.getStripePayment();
    const stripeEmail = this.props.profile.email;
    const subPlan = `${this.state.subPlan.toUpperCase()} Plan`;
    return (
      <DivChangeSubModal ischangesubmodalraised={this.props.isChangeSubModalRaised.toString()}>
        <DivScroller>
          <DivChangeSub>
            <DivHeader>
              <DivBack>
                <i className='far fa-arrow-alt-circle-left' onClick={(ev) => setChangeSubModalRaised(ev, false)} />
              </DivBack>
              <DivHeaderTitle>
                <H1HeaderTitle>Change&nbsp;Account&nbsp;Subscription</H1HeaderTitle>
              </DivHeaderTitle>
            </DivHeader>
            <FormChangeSub>
              <DivSelectBanners>
                <DivBanner
                  onClick={() => this.selectSubPlan(subscriptionPlans[0])}
                  subPlan={this.state.subPlan === subscriptionPlans[0]}
                >
                  <DivFreePlan subPlan={this.state.subPlan}>
                    <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[0]}>
                      <h2>Free Plan</h2>
                      <ul>
                        {
                          subscriptionFreeFeatures.map((feature, i) => <li key={i}>{feature}</li>)
                        }
                      </ul>
                    </DivFeatures>
                    <h4>{subscriptionPrices[0]}</h4>
                  </DivFreePlan>
                  <input
                    type='radio'
                    value='free-plan'
                    name='sub-plan'
                    checked={
                      this.state.subPlan === subscriptionPlans[0]
                    }
                    readOnly
                  />
                </DivBanner>
                <DivBanner
                  onClick={() => this.selectSubPlan(subscriptionPlans[1])}
                  subPlan={this.state.subPlan === subscriptionPlans[1]}
                >
                  <DivSilverPlan subPlan={this.state.subPlan}>
                    <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[1]}>
                      <h2>Silver Plan</h2>
                      <ul>
                        {
                          subscriptionFreeFeatures.map((feature, i) => <li key={i}>{feature}</li>)
                        }
                        <hr />
                      </ul>
                      <ul>
                        {
                          subscriptionSilverFeatures.map((feature, i) => <li key={i}><IAsterisk silver className='fas fa-asterisk' />&nbsp;{feature}</li>)
                        }
                      </ul>
                    </DivFeatures>
                    <h4>{subscriptionPrices[1]}</h4>
                  </DivSilverPlan>
                  <input
                    type='radio'
                    value='silver-plan'
                    name='sub-plan'
                    checked={
                      this.state.subPlan === subscriptionPlans[1]
                    }
                    readOnly
                  />
                </DivBanner>
                <DivBanner
                  onClick={() => this.selectSubPlan(subscriptionPlans[2])}
                  subPlan={this.state.subPlan === subscriptionPlans[2]}
                >
                  <DivGoldPlan subPlan={this.state.subPlan}>
                    <DivFeatures subPlan={this.state.subPlan === subscriptionPlans[2]}>
                      <h2>Gold Plan</h2>
                      <ul>
                        {
                          subscriptionFreeFeatures.map((feature, i) => <li key={i}>{feature}</li>)
                        }
                        <hr />
                      </ul>
                      <ul>
                        {
                          subscriptionSilverFeatures.map((feature, i) => <li key={i}><IAsterisk silver className='fas fa-asterisk' />&nbsp;{feature}</li>)
                        }
                        <hr />
                      </ul>
                      <ul>
                        {
                          subscriptionGoldFeatures.map((feature, i) => <li key={i}><IAsterisk gold className='fas fa-asterisk' />&nbsp;{feature}</li>)
                        }
                      </ul>
                    </DivFeatures>
                    <h4>{subscriptionPrices[2]}</h4>
                  </DivGoldPlan>
                  <input
                    type='radio'
                    value='gold-plan'
                    name='sub-plan'
                    checked={
                      this.state.subPlan === subscriptionPlans[2]
                    }
                    readOnly
                  />
                </DivBanner>
              </DivSelectBanners>
            </FormChangeSub>
            <DivBottom>
              <DivButtons>
                {this.state.subPlan === subscriptionPlans[0] ? (
                  <ButtonSubmit onClick={ev => this.submitHandler(ev)}>Submit</ButtonSubmit>
                ) : (
                    <DivStripeCheckout>
                      <ButtonStripeCheckout
                        token={this.onToken}
                        stripeKey={stripeToken}
                        email={stripeEmail}
                        description={subPlan}
                        amount={stripeAmount}
                      />
                    </DivStripeCheckout>
                  )}
              </DivButtons>
            </DivBottom>
          </DivChangeSub>
        </DivScroller>
      </DivChangeSubModal>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.profilesData.singleProfileData[0]
  };
};

export default connect(
  mapStateToProps,
  { stripePayment, changeUserType }
)(ChangeSubscriptionModal);