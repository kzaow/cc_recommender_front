import React from 'react';
import ReactDOM from 'react-dom';


  class NavBar extends React.Component {
    constructor(props){
      super(props);
      this.searchClick = this.searchClick.bind(this);
      this.clickAllCreditCards = this.clickAllCreditCards.bind(this);
    }

    searchClick() {

    }

    clickAllCreditCards() {


      let chosenFeatures = [""];
      let columnHeaders =   ['customer_service', 'redemption', 'credit_building', 'security'];
      let creditScore = "excellent";
      //ensures chosenFeatures is never empty in case the user never chooses a feature
      $.ajax({
        url: '/results',
        method: 'POST',
        data: {
          score: creditScore,
          cashback: false,
          travel: false,
          lowinterest: false,
          zeropercent: false,
          balancetransfer: false,
          points: false,
          gas: false,
          extendedwarranty: false,
          priceguarantee: false,
          customerservice: false,
          redemption: false,
          creditbuilding: false,
          security: false,
          technology: false,
        },
        success: data => {
          // this.setState({cards: p, columns: columnHeaders});
          this.props.updateCardData(data.data, columnHeaders, chosenFeatures);
        },
      });
    }

    render() {

      // {/* <div class="navbar-header"> */}
      return (

        <nav className="navbar navbar-default navigation-bar navbar-fixed-top">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="navbar-header">
                  <a className="navbar-brand" href="index.html">
                    <img src="/images/icon.png" />
                  </a>
                </div>
                <ul className="nav navbar-nav navbar-right">
                  <button id="all-credit-cards" onClick={this.clickAllCreditCards}>All Credit Cards</button>
                </ul>
                <form className="nav navbar-form navbar-right">
                  <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" />
                  </div>
                  <button onClick={this.searchClick} id="search-button" className="btn btn-default" id="search-button" type="submit">
                    <span className="glyphicon glyphicon-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }

  export {NavBar};
