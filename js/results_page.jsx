import React from 'react';
import ReactDOM from 'react-dom';
// import {Modal} from 'react-bootstrap';
import {FeatureBar, FeatureButton, CreditScoreList} from "./sidebar.jsx";
import {NavBar} from "./navbar.jsx";
import {TablePagination} from "./table-pagination.jsx";
import {RateCard, ReviewStatus} from "./rate-card.jsx";
// import { Dropdown } from 'semantic-ui-react';
// import $ from 'react-table'

(function($) {
    'use strict';


    $(document).ready(() => {

      const features =
        {
          customer_service: "Customer Service",
          redemption: "Redemption",
          credit_building: "Credit Building",
          security: "Security",
          technology: "Technology",
          cash_back: "Cash Back",
          low_interest: "Low Interest",
          travel: "Travel",
          zero_percent: "Zero Percent",
          gas: "Gas",
          points: "Points",
          balance_transfer: "Balance Transfer",
          extended_warranty: "Extended Warranty",
          price_guarantee: "Price Guarantee",
        };

        const ids = [
          '#cash-back',
          '#travel',
          '#low-interest',
          '#zero-percent',
          '#balance-transfer',
          '#points',
          '#gas',
          '#extended-warranty',
          '#price-guarantee',
          '#customer-service',
          '#redemption',
          '#credit-building',
          '#security',
          '#technology',
        ];

        const credit_score_ids = [
          '#excellent',
          '#good',
          '#average',
          '#poor',
        ];

      // payment_network_name:null
      // issuer_name:"Chase"
      // name:"Southwest Rapid Rewards Premier Business credit card"
      // description:"NEW CARDMEMBER OFFER 60,000 bonus points after you spend $3,000 on purchases in the first 3 months your account is open.|AT A GLANCE Earn reward flights with no blackout dates. Earn 2x points on Southwest purchases and points on all other purchases. Plus 6,000 anniversary bonus points.|APR 16.49%–23.49% variable APR.|ANNUAL FEE $99 applied to first billing statement."
      // min_score:720
      // cash_back:0
      // travel:2
      // low_interest:0
      // zero_percent:0
      // balance_transfer:0
      // points:2
      // gas:0
      // extended_warranty:0
      // price_guarantee:0
      // img:"https://creditcards.chase.com/R-Marketplace/1110008/images/cardart/swa_premier_biz_card.png"
      // redemption:0.749663
      // customer_service:0.65049
      // technology:0.635601
      // security:-1
      // credit_building:0.649327
      var card_data = JSON.parse(sessionStorage.getItem("cards"));
      var creditScore = JSON.parse(sessionStorage.getItem("selections")).score;
      // var user_chosen_features = JSON.parse(sessionStorage.getItem("selections"));

      var getChosenFeatures = user_features => {
        let chosenFeatures = [];
        for (var key in user_features) {
          if (user_features.hasOwnProperty(key)) {
            if (user_features[key] === true) {
              chosenFeatures.push(key);
            }
          }
        }
        //ensures chosenFeatures is never empty in case the user never chooses a feature
        if (chosenFeatures.length === 0) {
          chosenFeatures.push("");
        }
        return chosenFeatures;
      }
      let chosenFeatures = getChosenFeatures(JSON.parse(sessionStorage.getItem("selections")));

      // returns an array of keys that will be used to create the header and rows of the table
      var arrayify_selections = user_features => {
        var selections_array = [];
        for (var key in user_features) {
          if (user_features.hasOwnProperty(key)) {
            if (user_features[key] === true) {
              selections_array.push(key);
            }
          }
        }

        var feature_count = selections_array.length;
        if (selections_array.length < 4) {
          selections_array = checkPresentFeatures(selections_array, feature_count);
        }
        else if (selections_array.length > 4) {
          while (selections_array.length > 4) {
            selections_array.pop();
          }
        }
        return selections_array;
      }

      // adds headers that weren't chosen by the user
      var checkPresentFeatures = (selections_array, feature_count) => {
        for (var key in features) {
          var has_this_feature_count = 0;
          if (features.hasOwnProperty(key)) {
            for (var i = 0; i < selections_array.length; i++) {
              if (key === selections_array[i]) {
                has_this_feature_count++;
              }
            }
          }
          if (has_this_feature_count === 0) {
            selections_array.push(key);
            feature_count++;
          }
          else {
            has_this_feature_count = 0;
          }
          if (feature_count === 4) {
            break;
          }
        }
        return selections_array;
      }

      var selections = arrayify_selections(JSON.parse(sessionStorage.getItem("selections")));

      class Results extends React.Component {
        constructor(props) {
          super(props);
          this.getNewCardData = this.getNewCardData.bind(this);
          this.state = {cards: this.props.cards, columns: this.props.columns, chosenFeatures: this.props.chosenFeatures, isSorted: false};
          this.updateCardData = this.updateCardData.bind(this);
          this.sortCardData = this.sortCardData.bind(this);

        }

        getNewCardData() {

          const qs = document.querySelector.bind(document);
          const qsClass = id => qs(id).className.includes('feature-checked');
          const credit_score_values = {
            excellent : qsClass(credit_score_ids[0]),
            good : qsClass(credit_score_ids[1]),
            average : qsClass(credit_score_ids[2]),
            poor : qsClass(credit_score_ids[3]),
          };

          let credit_score = "";
          for (var key in credit_score_values) {
            if (credit_score_values[key]) {
              credit_score = key;
              break;
            }
          }

          let p = [];
          let newSelections = {
            score: credit_score,
            cash_back: qsClass(ids[0]),
            travel: qsClass(ids[1]),
            low_interest: qsClass(ids[2]),
            zero_percent: qsClass(ids[3]),
            balance_transfer: qsClass(ids[4]),
            points: qsClass(ids[5]),
            gas: qsClass(ids[6]),
            extended_warranty: qsClass(ids[7]),
            price_guarantee: qsClass(ids[8]),
            customer_service: qsClass(ids[9]),
            redemption: qsClass(ids[10]),
            credit_building: qsClass(ids[11]),
            security: qsClass(ids[12]),
            technology: qsClass(ids[13]),
          };


          let chosenFeatures = getChosenFeatures(newSelections);
          let columnHeaders = arrayify_selections(newSelections);
          //ensures chosenFeatures is never empty in case the user never chooses a feature
          if (chosenFeatures.length === 0) {
            chosenFeatures.push("");
          }
          $.ajax({
            url: '/results',
            method: 'POST',
            data: {
              score: credit_score,
              cashback: qsClass(ids[0]),
              travel: qsClass(ids[1]),
              lowinterest: qsClass(ids[2]),
              zeropercent: qsClass(ids[3]),
              balancetransfer: qsClass(ids[4]),
              points: qsClass(ids[5]),
              gas: qsClass(ids[6]),
              extendedwarranty: qsClass(ids[7]),
              priceguarantee: qsClass(ids[8]),
              customerservice: qsClass(ids[9]),
              redemption: qsClass(ids[10]),
              creditbuilding: qsClass(ids[11]),
              security: qsClass(ids[12]),
              technology: qsClass(ids[13]),
            },
            success: data => {
              // this.setState({cards: p, columns: columnHeaders});
              this.updateCardData(data.data, columnHeaders, chosenFeatures);
            },
          });
          // }
        }

        sortCardData(feature, sortDirection){
          var cardArray = [];
          if (sortDirection === "up") {
            cardArray = this.state.cards.sort(function(a, b) {
              return a[feature] - b[feature];
            });
          }
          else {
            cardArray = this.state.cards.sort(function(a, b) {
              return b[feature] - a[feature];
            });
          }

          this.setState({cards : cardArray, columns: this.state.columns, chosenFeatures: this.state.chosenFeatures, isSorted: true});
          // this.state = {cards: this.props.cards, columns: this.props.columns, chosenFeatures: this.props.chosenFeatures, isSorted: false};

        }

        updateCardData(cardData, columnHeaders, chosen_features) {
          this.setState({cards: cardData, columns: columnHeaders, chosenFeatures: chosen_features, isSorted: false});
        }

        render() {
          if (this.state.cards.length === 0){
            return (
              <div>
                <NavBar updateCardData={this.updateCardData}/>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-md-9">
                      <p style={{fontSize: "2em", fontWeight: "100"}}>Sorry, no card has that feature. Choose a different set of features... =></p>
                    </div>
                    <div className="col-md-3" style={{border: "1px solid #dadada"}}>
                      <FeatureBar getNewCardData={this.getNewCardData} creditScore={this.props.creditScore} chosenFeatures={this.state.chosenFeatures}/>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          else {
            return (
              <div>
                <NavBar updateCardData={this.updateCardData}/>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-md-12">
                      <div className="container-fluid">
                        <div className="row">
                          <div className="col-md-10" style={{width: "80%", paddingRight: "0px"}}>
                            <Main cards={this.state.cards} columns={this.state.columns} isSorted={this.state.isSorted} sortCards={this.sortCardData}/>
                          </div>
                          <div className="col-md-2" style={{width: "20%", paddingRight: "0.2em"}}>
                            <FeatureBar getNewCardData={this.getNewCardData} creditScore={this.props.creditScore} chosenFeatures={this.state.chosenFeatures}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        }
      }

      class Main extends React.Component {
        constructor(props) {
          super(props);
          this.changeModalState = this.changeModalState.bind(this);
          this.state = {
            modalState: false,
            cardForReview: "",
            reset: false,
            previousReviewStatus: "",
          }
        }

        changeModalState(currentState, card, shouldReset, status){
          this.setState({modalState: currentState, cardForReview: card, reset: shouldReset, previousReviewStatus: status});
        }

        render() {
          return(
            <div id="table-modal-div" style={{height: "90vh", overflowY: "scroll"}}>
              <Table cards={this.props.cards} columns={this.props.columns} sortCards={this.props.sortCards} modalState={this.state.modalState} changeModalState={this.changeModalState} isSorted={this.props.isSorted}/>
              <div>
                <RateCard modalState={this.state.modalState} changeModalState={this.changeModalState} cardForReview={this.state.cardForReview} reset={this.state.reset}/>
                <ReviewStatus status={this.state.previousReviewStatus} changeModalState={this.changeModalState}/>
              </div>
            </div>
          );
        }
      }

      class Table extends React.Component {
        constructor(props) {
          super(props);
          // this.state = {cardData: this.props.cards, isSorted: this.props.isSorted};
          // this.sortCardData = this.sortCardData.bind(this);
          // this.compareCardArrays = this.compareCardArrays.bind(this);
        }

        // sortCardData(feature, sortDirection){
        //   var cardArray = [];
        //   if (sortDirection === "up") {
        //     cardArray = this.state.cardData.sort(function(a, b) {
        //       return a[feature] - b[feature];
        //     });
        //   }
        //   else {
        //     cardArray = this.state.cardData.sort(function(a, b) {
        //       return b[feature] - a[feature];
        //     });
        //   }
        //
        //   this.setState({cardData : cardArray, isSorted: true});
        // }

        // compareCardArrays(cards1, cards2) {
        //   if (cards1.length !== cards2.length){
        //     return false;
        //   }
        //   else{
        //     for (var i = 0; i < cards1.length; i++) {
        //       if (cards1[i].name != cards2[i].name) {
        //         return false;
        //       }
        //     }
        //   }
        //   return true;
        // }


        render() {
          // if (!this.props.isSorted) {
          //   if (!this.compareCardArrays(this.state.cardData, this.props.cards)) {
          //     this.setState({cardData: this.props.cards});
          //   }
          // }

          return (
            <div id="div-for-table" class="table-responsive">
              <table className="table" id="cards_table">
               <TableHeader headers={this.props.columns} cards={this.props.cards} sortCards={this.props.sortCards} isSorted={this.props.isSorted}/>
               <TableBody columns={this.props.columns} cards={this.props.cards} modalState={this.props.modalState} changeModalState={this.props.changeModalState}/>
             </table>
           </div>
          );
        }
      }

      class TableHeader extends React.Component {
        constructor(props){
          super(props);
          // this.state = {card_data : this.props.cards};
          // this.state = props;
          this.state = {activeHeader: ""};
          this.checkActiveHeader = this.checkActiveHeader.bind(this);
        }

        checkActiveHeader(header) {
          if(header !== this.state.activeHeader){
            this.setState({activeHeader: header});
          }
        }

        render() {
          // if (!this.props.isSorted)
          return (
            <thead>
              <tr>
                <th></th>
                <Header headerName={features[this.props.headers[0]]} feature={this.props.headers[0]} sortCards={this.props.sortCards} checkActiveHeader={this.checkActiveHeader} activeHeader={this.state.activeHeader} isSorted={this.props.isSorted}/>
                <Header headerName={features[this.props.headers[1]]} feature={this.props.headers[1]} sortCards={this.props.sortCards} checkActiveHeader={this.checkActiveHeader} activeHeader={this.state.activeHeader} isSorted={this.props.isSorted}/>
                <Header headerName={features[this.props.headers[2]]} feature={this.props.headers[2]} sortCards={this.props.sortCards} checkActiveHeader={this.checkActiveHeader} activeHeader={this.state.activeHeader} isSorted={this.props.isSorted}/>
                <Header headerName={features[this.props.headers[3]]} feature={this.props.headers[3]} sortCards={this.props.sortCards} checkActiveHeader={this.checkActiveHeader} activeHeader={this.state.activeHeader} isSorted={this.props.isSorted}/>
              </tr>
            </thead>
          );
        }
      }

      class Header extends React.Component {
        constructor(props) {
          super(props);
          this.state = {isSorted: false, className: ""};
          this.handleHeaderClick = this.handleHeaderClick.bind(this);
        }

        handleHeaderClick() {
          this.props.checkActiveHeader(this.props.feature);
          if (!this.state.isSorted) {
            this.setState({isSorted: true, sortDirection: "down", className: "glyphicon glyphicon-menu-down"});
            this.props.sortCards(this.props.feature, "down");
          }
          else {
            if (this.state.sortDirection === "down"){
              this.setState({isSorted: true, sortDirection: "up", className: "glyphicon glyphicon-menu-up"});
              this.props.sortCards(this.props.feature, "up");
            }
            else {
              this.setState({isSorted: true, sortDirection: "down", className: "glyphicon glyphicon-menu-down"});
              this.props.sortCards(this.props.feature, "down");
            }
          }
        }

        render() {
          if (this.state.isSorted && this.props.feature !== this.props.activeHeader) {
            this.setState({isSorted: false, className: ""});
          }

          return (
            <th onClick={this.handleHeaderClick}>{this.props.headerName}
              <span className={this.state.className} style={{paddingLeft : "5px"}}></span>
            </th>
          );
        }
      }

      class TableBody extends React.Component {
        constructor(props){
          super(props);
        }

        render() {
          var rows = [];
          this.props.cards.forEach((card) => {
            rows.push(<TableRow card={card} columns={this.props.columns} modalState={this.props.modalState} changeModalState={this.props.changeModalState}/>)
          });
          return (
            <tbody>
              {rows}
            </tbody>
          );
        }
      }

      class TableRow extends React.Component {
        constructor(props) {
          super(props);
          // this.state = props;
        }

        render () {
          const intangibleFeatureKeys = ["customer_service", "redemption", "credit_building", "security", "technology"]
          var row_cells = [];
          row_cells.push(<td><CardDisplay card={this.props.card} modalState={this.props.modalState} changeModalState={this.props.changeModalState}/></td>);

          for (var i = 0; i < this.props.columns.length; i++){
            var didFindIntangible = false;
            for (var j = 0; j < intangibleFeatureKeys.length; j++){
              if (this.props.columns[i] === intangibleFeatureKeys[j]){
                row_cells.push(<td style={{fontSize : "1.3em", verticalAlign : "middle"}}><IntangibleFeatureBar featureValue={this.props.card[this.props.columns[i]]} /></td>)
                didFindIntangible = true;
                break;
              }
            }
            if (didFindIntangible === false){
              row_cells.push(<td style={{fontSize : "1.3em", verticalAlign : "middle"}}>{this.props.card[this.props.columns[i]]}</td>)
            }
          }

          return (
            <tr>{row_cells}</tr>
          );
        }
      }

      class IntangibleFeatureBar extends React.Component {
        constructor(props) {
          super(props);
        }

        render() {
          var feature_percentage;

          if (this.props.featureValue !== -1){
            feature_percentage = Math.round(this.props.featureValue * 100) + "%";
            var bg_color;

            if (Math.round(this.props.featureValue * 100) < 34) {
              bg_color = "#cd2e03";
            }
            else if (Math.round(this.props.featureValue * 100) < 67 && Math.round(this.props.featureValue * 100) > 33) {
              bg_color = "#ebc316";
            }
            else {
              bg_color = "#20c72c";
            }
            var featureBarStyle = {
              width : feature_percentage,
              backgroundColor : bg_color,
              height : "1.4em",
              borderRadius : "0.10em"
            }

            return (
              <div style={{margin : "10%", height: "1.4em", backgroundColor : "#d9d9d9", boxShadow : "0.3125em 0.3125em 0.3125em #888888"}}>
                <div style={featureBarStyle}></div>
              </div>
            );
          }
          else {
            return (
              <div style={{margin : "10%", height: "1.4em"}}>
                <p>N/A</p>
              </div>
            );
          }
        }
      }

      class CardDisplay extends React.Component {
        constructor(props){
          super(props);
          this.handleClick = this.handleClick.bind(this);
          this.detailsClick = this.detailsClick.bind(this);
        }

        handleClick(){
          this.props.changeModalState(true, this.props.card, false, "");
        }

        detailsClick(){
          window.location.href = "card.html?" + this.props.card.id;
        }

        render() {
          var aTagStyle = {
            fontSize: "0.8em",
            width: "10em",
            height: "3em",
            background: "#0c68c8",
            padding: "0.85em",
            textAlign: "center",
            borderRadius: "5px",
            color: "white"
          }

          var detailsStyle = {
            marginRight: "1em",
            fontSize: "0.8em",
            width: "7em",
            height: "3em",
            background: "#3dc80c",
            padding: "0.6em",
            textAlign: "center",
            borderRadius: "5px",
            color: "white"
          }

          if (this.props.card.issuer_name == "Wells Fargo"){
            return (
              <div>
                <div className="card-display" onClick={this.detailsClick}>
                  <p style= {{fontSize : "1.2em"}}>{this.props.card.name}</p>
                  <img src={this.props.card.img} height="120" width="250"/>
                </div>
                <div style={{marginTop: "0.75em"}}>

                  <button style={aTagStyle} onClick={this.handleClick}>Rate Card</button>
                </div>
              </div>
            );
          }else if(this.props.card.issuer_name == "Citi" && this.props.card.img == null){
            return(
              <div>
                <div className="card-display" onClick={this.detailsClick}>
                  <p style= {{fontSize : "1.2em"}}>{this.props.card.name}</p>
                  <img src={"/images/citiicon.png"}height="120" width="204"/>
                </div>
                <div style={{marginTop: "0.75em"}}>
                  <button style={aTagStyle} onClick={this.handleClick}>Rate Card</button>
                </div>
              </div>
            );
          }else if(this.props.card.issuer_name == "Bank of America" && this.props.card.img == null){
            return(
              <div>
                <div className="card-display" onClick={this.detailsClick}>
                  <p style= {{fontSize : "1.2em"}}>{this.props.card.name}</p>
                  <img src={"/images/boa.png"}height="120" width="204"/>
                </div>
                <div style={{marginTop: "0.75em"}}>
                  <button style={aTagStyle} onClick={this.handleClick}>Rate Card</button>
                </div>
              </div>
            );
          }else if(this.props.card.issuer_name == "American Express" && this.props.card.img == null){
            return(
              <div>
                <div className="card-display" onClick={this.detailsClick}>
                  <p style= {{fontSize : "1.2em"}}>{this.props.card.name}</p>
                  <img src={"/images/am.png"}height="120" width="204"/>
                </div>
                <div style={{marginTop: "0.75em"}}>
                  <button style={aTagStyle} onClick={this.handleClick}>Rate Card</button>
                </div>
              </div>
            );
          }
          else {
            return (
              <div>
                <div className="card-display" onClick={this.detailsClick}>
                  <p style= {{fontSize : "1.2em"}}>{this.props.card.name}</p>
                  <img src={this.props.card.img} height="120" width="204"/>
                </div>
                <div style={{marginTop: "0.75em"}}>
                  <button style={aTagStyle} onClick={this.handleClick}>Rate Card</button>
                </div>
              </div>
            );
          }
        }
      }



      ReactDOM.render(<Results cards={card_data} columns={selections} creditScore={creditScore} chosenFeatures={chosenFeatures}/>, document.getElementById('root'));

      // $("#cards_table").tablesorter();

    });

}(jQuery));
