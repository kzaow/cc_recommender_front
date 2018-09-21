import React from 'react';
import ReactDOM from 'react-dom';

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

  class RateCard extends React.Component {
    constructor(props){
      super(props);
      this.exitModal = this.exitModal.bind(this);
      this.submitReview = this.submitReview.bind(this);
      this.state = {
        status: "",
      }
    }

    exitModal(event){
      if(event.target == document.getElementById("modal") || event.target == document.getElementById("exit-modal")){
        $("#review-comments").val("");
        this.props.changeModalState(false, this.props.cardForReview, true, "");
      }
    }

    submitReview(event){
      const rateIds = [
        "rate-customer-service",
        "rate-redemption",
        "rate-credit-building",
        "rate-security",
        "rate-technology",
      ];
        const getRating = id => parseInt($("#" + id + " div").text().split("%")[0])/100;
        const cardRating = {
          id: this.props.cardForReview.id,
          customerservice: getRating(rateIds[0]),
          redemption: getRating(rateIds[1]),
          building: getRating(rateIds[2]),
          security: getRating(rateIds[3]),
          technology: getRating(rateIds[4]),
          text: $("#review-comments").val(),
        }

      // let urlForRateSubmission = '/results/$' + this.props.cardForReview.id;
      $.ajax({
        url: '/review/',
        method: 'POST',
        data: cardRating,
        success: s => {
          // this.setState({status: s.status});
          // setTimeout(this.props.changeModalState(false, this.props.cardForReview, true), 5000);
          this.props.changeModalState(false, this.props.cardForReview, true, s.status);
          // this.setState({status: ""});
          // let statusDisplay = "<div id='status-modal'> <div id='status'> <p>" + s.status + "</p> </div></div>";
          // $("#review-comments").append(statusDisplay);
          // alert(s.status);
          $("#review-comments").val("");
        }
      });
    }

    // componentDidUpdate() {
    //   this.setState({status: s.status});
    // }

    render(){
      var display;
      var modalStyle = {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        background: "rgba(0,0,0,0.8)",
        zIndex: "1",
        opacity:"85",
        overflowY: "scroll",
      }

      var rateCardStyle = {
        backgroundColor: "#fefefe",
        margin: "5% auto", /* 15% from the top and centered */
        border: "1px solid #888",
        width: "80%", /* Could be more or less, depending on screen size */
        overflow: "auto"
      }

      if(this.props.modalState){
        modalStyle.display = "block";
      }
      else{
        modalStyle.display = "none";
      }

      if (this.props.cardForReview.issuer_name === "Wells Fargo"){
        display = <img src={this.props.cardForReview.img} height="120" width="250"/>;
      }
      else {
        display = <img src={this.props.cardForReview.img} height="120" width="204"/>;
      }

      // <button id="exit-modal" style={{fontSize: "2.2em", border: "0 none", backgroundColor: "black", color: "white"}} onClick={this.exitModal}>X</button>

      //column has textAlign center style to allow the centering of submit button and title of card and image
      return(
        <div id="modal" style={modalStyle} onClick={this.exitModal}>
          <div id="rate-this-card" style={rateCardStyle}>
            <button id="exit-modal" type="button" className="close rate-close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12" style={{textAlign:"center"}}>
                    <div className="row">
                      <div className="col-md-6">
                        <div style={{marginTop: "0%", marginRight: "10%", height: "80%", width: "100%"}}>
                          <p style= {{fontSize : "1.2em"}}>{this.props.cardForReview.name}</p>
                          {display}
                          <form style={{height: "80%", width: "100%"}}>
                            <div>
                              <textarea id="review-comments" placeholder="(optional) Say something about this card..." name="comments_about_card"></textarea>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div style={{height: "80%", width: "100%", textAlign: "left"}}>
                          <RateFeature elementName="rate-customer-service" name="customer_service" reset={this.props.reset}/>
                          <RateFeature elementName="rate-redemption" name="redemption" reset={this.props.reset}/>
                          <RateFeature elementName="rate-credit-building" name="credit_building" reset={this.props.reset}/>
                          <RateFeature elementName="rate-security" name="security" reset={this.props.reset}/>
                          <RateFeature elementName="rate-technology" name="technology" reset={this.props.reset}/>
                        </div>
                      </div>
                    </div>
                    <button className="submit-button" onClick={this.submitReview}>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

  class RateFeature extends React.Component {
    constructor(props) {
      super(props);
      this.moveBar = this.moveBar.bind(this);
      this.state = {
        percentage : 0
      }
    }

    moveBar(event){
      var x = event.clientX;
      var y = event.clientY;
      var div = document.getElementById(this.props.elementName);
      var divWidth = div.clientWidth;
      var target = event.target || event.srcElement;
      var rect = target.getBoundingClientRect();
      var offsetX = x - rect.left;
      var offsetY = y - rect.top;
      var percent = Math.round(offsetX / divWidth * 100);
      this.setState({percentage: percent});
    }

    shouldComponentUpdate(nextProps, nextState) {
      if (this.props.reset === nextProps.reset && nextState.percentage === this.state.percentage){
        return false;
      }
      else {
        return true;
      }
    }

    render() {
      var feature_percentage;
      var bg_color;

      if (this.props.reset){
        this.setState({percentage: 0});
        feature_percentage = this.state.percentage + "%";

      }
      else {
        feature_percentage = this.state.percentage + "%";
      }


      if (this.state.percentage < 34) {
        bg_color = "#cd2e03";
      }
      else if (this.state.percentage < 67 && this.state.percentage > 33) {
        bg_color = "#ebc316";
      }
      else {
        bg_color = "#20c72c";
      }


      var featureBarStyle = {
        width : feature_percentage,
        backgroundColor : bg_color,
        height : "1.9em",
        borderRadius : "0.20em",
        fontSize: "1.0em",
        textAlign: "center", //moves the percentage within the bar
      }
      // <p>{features[this.props.elementName]}</p>

      let name = features[this.props.name] + ":";
      return (
        <div style={{margin : "7%", height: "15%", width: "80%"}}>
          <p style={{marginBottom: "0.3em"}}>{name}</p>
          <div className="rate-feature-bar" id={this.props.elementName} onClick={this.moveBar} style={{margin: "0%", width: "100%", height: "1.9em", backgroundColor : "#d9d9d9", boxShadow : "0.3125em 0.3125em 0.3125em #888888"}}>
            <div style={featureBarStyle}>{this.state.percentage + "%"}</div>
          </div>
        </div>
      );
    }
  }

  class ReviewStatus extends React.Component {
    constructor(props) {
      super(props);
      this.exitReviewStatus = this.exitReviewStatus.bind(this);
      // this.showStatus = this.showStatus.bind(this);
      // this.state = {status: ""};
    }

    exitReviewStatus(event) {
      if (event.target === document.getElementById("status-modal") || event.target === document.getElementById("close-review-status")) {
        this.props.changeModalState(false, "", true, "");
      }
    }

    render () {
      let display;
      let modalStyle = {
        position: "fixed",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
        background: "rgba(0,0,0,0.8)",
        zIndex: "1",
        opacity:"85",
      };

      let reviewStatusStyle = {
        backgroundColor: "#ffffff",
        margin: "10% auto", /* 15% from the top and centered */
        // border: "1px solid #888",
        width: "25em", /* Could be more or less, depending on screen size */
        overflow: "auto",
        textAlign: "center",
        height: "15em",
        borderRadius: "0.4em",
      };

      let statusHeader = {
        height: "3em",
      };

      let statusImage = [];

      if(this.props.status !== ""){
        modalStyle.display = "block";
        if (this.props.status === "Success") {
          statusHeader.backgroundColor = "#13b023";
          statusImage.push(<img src="/images/green-check.png" height="100" width="200"/>);
        }
        else {
          statusHeader.backgroundColor = "#d93307";
          statusImage.push(<img style={{marginTop: "1em"}} src="/images/red-x.png" height="67" width="67"/>);
        }
      }
      else{
        modalStyle.display = "none";
      }

      return (
        <div id="status-modal" style={modalStyle} onClick={this.exitReviewStatus}>
          <div id="status" style={reviewStatusStyle}>
            <div>
              <div style={statusHeader}>
                <button id="close-review-status" onClick={this.exitReviewStatus} type="button" className="close rate-close exit-modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
            </div>
            <div style={{marginTop: "1.4em", fontSize: "1.8em"}}>{this.props.status}</div>
            {statusImage}
          </div>
        </div>
      );
    }
  }

  export {RateCard, ReviewStatus};
