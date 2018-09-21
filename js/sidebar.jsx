import React from 'react';
import ReactDOM from 'react-dom';

// $(document).ready(() => {
  'use strict';

  class FeatureBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div id="side-menu">
          <div>
            <CreditScoreList getNewCardData={this.props.getNewCardData} creditScore={this.props.creditScore}/>
          </div>
          <div className="btn-group-vertical btn-groups">
            <p style={{textAlign: "left"}}>Card Features</p>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/cbSB.png"/>} feature=" Cash back" id="cash-back" featureKey="cash_back" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/tSB.png"/>} feature=" Travel" id="travel" featureKey="travel" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/liSB.png"/>} feature=" Low interest" id="low-interest" featureKey="low_interest" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "1.5em", height: "1.5em"}} src="/images/zpSB.png"/>} feature=" Zero percent" id="zero-percent" featureKey="zero_percent" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/btSB.png"/>} feature=" Balance transfer" id="balance-transfer" featureKey="balance_transfer" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/pSB.png"/>} feature=" Points" id="points" featureKey="points" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/gSB.png"/>} feature=" Gas" id="gas" featureKey="gas" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/ewSB.png"/>} feature=" Extended warranty" id="extended-warranty" featureKey="extended_warranty" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/pgSB.png"/>} feature=" Price guarantee" id="price-guarantee" featureKey="price_guarantee" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
          </div>
          <div className="btn-group-vertical btn-groups">
            <p style={{textAlign: "left"}}>Intangible Features</p>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/csSB.png"/>} feature=" Customer Service" id="customer-service" featureKey="customer_service" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/rSB.png"/>} feature=" Redemption" id="redemption" featureKey="redemption" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/cbuSB.png"/>} feature=" Credit Building" id="credit-building" featureKey="credit_building" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/sSB.png"/>} feature="Security" id="security" featureKey="security" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
            <FeatureButton featureImage = {<img style={{width: "2em", height: "2em"}} src="/images/techSB.png"/>} feature=" Technology" id="technology" featureKey="technology" getNewCardData={this.props.getNewCardData} chosenFeatures={this.props.chosenFeatures}/>
          </div>
        </div>
      );
    }
  }

  class CreditScoreList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {creditScore : this.props.creditScore};
      this.changeActiveCreditScore = this.changeActiveCreditScore.bind(this);
    }

    changeActiveCreditScore (credit) {
      this.setState({creditScore : credit});
    }

    componentDidUpdate() {
      this.props.getNewCardData();
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.state.creditScore === nextState.creditScore) {
        return false;
      }
      else {
        return true;
      }
    }

    render() {
      return (
        <div className="btn-group-vertical credit-score-group">
          <p style={{textAlign: "left"}}>Credit Score</p>
          <CreditScoreButton feature="Excellent (720 - 850)" id="excellent" getNewCardData={this.props.getNewCardData} creditScore={this.state.creditScore} changeActiveCreditScore={this.changeActiveCreditScore}/>
          <CreditScoreButton feature="Good (690 - 719)" id="good" getNewCardData={this.props.getNewCardData} creditScore={this.state.creditScore} changeActiveCreditScore={this.changeActiveCreditScore}/>
          <CreditScoreButton feature="Average (630 - 689)" id="average" getNewCardData={this.props.getNewCardData} creditScore={this.state.creditScore} changeActiveCreditScore={this.changeActiveCreditScore}/>
          <CreditScoreButton feature="Poor (350 - 629)" id="poor" getNewCardData={this.props.getNewCardData} creditScore={this.state.creditScore} changeActiveCreditScore={this.changeActiveCreditScore}/>
        </div>
      );
    }
  }

  class CreditScoreButton extends React.Component {
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      if (this.props.creditScore !== this.props.id){
        this.props.changeActiveCreditScore(this.props.id);
      }
    }


    render() {
      if (this.props.creditScore === this.props.id) {
        return (
          <button type="button" id={this.props.id} className="features-check-box feature-checked" onClick={this.handleClick}>
            {this.props.feature}
          </button>
        );
      }
      else {
        return (
          <button type="button" id={this.props.id} className="features-check-box" onClick={this.handleClick}>
            {this.props.feature}
          </button>
        );
      }
    }
  }

  class FeatureButton extends React.Component {
    constructor(props) {
        super(props);
        for (var i = 0; i < this.props.chosenFeatures.length; i++) {
          if (this.props.featureKey === this.props.chosenFeatures[i]) {
            this.state = {isToggleOn: true, className: "features-check-box feature-checked"};
            break;
          }
          else {
            this.state = {isToggleOn: false, className: "features-check-box"};
          }
        }
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }



    shouldComponentUpdate(nextProps, nextState) {
      // this.state = {isToggleOn: false, className: "features-check-box"}
      if (this.state.isToggleOn !== nextState.isToggleOn && this.state.className !== nextState.className){
        return true;
      }
      else {
        return false;
      }
    }

    componentDidUpdate(){
      this.props.getNewCardData();
    }

    handleClick() {
      if (this.state.isToggleOn === false){
        this.setState({isToggleOn: true, className: "features-check-box feature-checked"});
      }
      else if(this.state.isToggleOn === true) {
        this.setState({isToggleOn: false, className: "features-check-box"});
      }
    }

    render() {
      // if (this.props.chosenFeatures[0] === "") {
      //   this.setState({isToggleOn: false, className: "features-check-box"});
      // }
      return (
        <button type="button" id={this.props.id} className={this.state.className} onClick={this.handleClick}>
          {this.props.featureImage}
          {this.props.feature}
        </button>
      );
    }
  }

  // var root = document.getElementById('root');

  //  ReactDOM.render(<FeatureBar creditScore="hello World"/>, document.getElementById('root'));
  export {FeatureBar, FeatureButton, CreditScoreList};

  // }

// });
