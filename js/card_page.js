(function() {
  'use strict';

  let card = {};

  $(document).ready(() => {
    $.ajax({
      url: `/card/${parseInt(location.href.split('?').pop())}`,
      method: 'POST',
      success: data => {
        //document.querySelector('#test').innerHTML = JSON.stringify(data);
        cardDetails(data);
      },
    });
    /**
    1-20 American Express | Blue
    21-46 Bank of America | Red/Blue
    47-64 Barclays | Blue
    65-76 Capital One |
    77-98 Chase | Blue/White
    99-104 Discover | Orange/White
    105-138 Wells Fargo | Red/Yellow
    139-157 Citi |
    **/
    function cardDetails(data){
      card = data;
      var newDescription;
      var list="";
      if(card.img != null){
        $('#img').prepend("<img id='cardImage' src='" + card.img + "'/>")
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "260px";
      }
      if(card.issuer_name == "Wells Fargo" && card.img != null){
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "280px";
      }else if(card.issuer_name == "Citi" && card.img == null){
        $('#img').prepend("<img id='cardImage' src='/images/citiicon.png'/>")
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "260px";
      }else if(card.issuer_name == "Discover" && card.img == null){
        $('#img').prepend("<img id='cardImage' src='/images/discover.png'/>")
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "260px";
      }else if(card.issuer_name == "Bank of America" && card.img == null){
        $('#img').prepend("<img id='cardImage' src='/images/boa.png'/>")
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "260px";
      }else if(card.issuer_name == "American Express" && card.img == null){
        $('#img').prepend("<img id='cardImage' src='/images/am.png'/>")
        document.getElementById("cardImage").style.height = "160px";
        document.getElementById("cardImage").style.width = "260px";
      }
      // }else{
      //   document.getElementById("cardImage").style.height = "160px";
      //   document.getElementById("cardImage").style.width = "260px";
      // }
      $('#nameOfCard').text(card.name.toUpperCase())
      //$('#issuerName').append("Offered by: " + card.issuer_name)
      $('#PNN').text(card.payment_network_name)


      if(card.issuer_name == "Chase" || card.issuer_name == "Capital One" || card.issuer_name == "Barclays" || card.issuer_name == "Bank of America" || card.issuer_name == "Citi" || card.issuer_name == "Discover" || card.issuer_name == "American Express"){
        document.getElementById("issuerName").style.position = "relative";
        document.getElementById("issuerName").style.left = "382px";
        document.getElementById("issuerName").style.bottom = "132px";
        document.getElementById("PNN").style.position = "relative";
        document.getElementById("PNN").style.left = "382px";
        document.getElementById("PNN").style.bottom = "108px";
      }else if (card.issuer_name == "Wells Fargo") {
        document.getElementById("issuerName").style.position = "relative";
        document.getElementById("issuerName").style.left = "401px";
        document.getElementById("issuerName").style.bottom = "133px";
        document.getElementById("PNN").style.position = "relative";
        document.getElementById("PNN").style.left = "401px";
        document.getElementById("PNN").style.bottom = "108px";
      }
      // Apply Now & Offered by:
      if(card.issuer_name == "Chase"){
        $("#issuerName").append("Offered by: " + " <a href=\"https://www.chase.com/digital/resources/about-chase\" >Chase</a> ")
        $('#applyButton').click(function(){
          window.open('https://creditcards.chase.com/credit-cards/browse-all?HT5N=Y71UH0&iCELL=61FY&jp_ltg=chsecate_allcards', '_blank')
        })
      }else if (card.issuer_name == "Capital One") {
        $("#issuerName").append("Offered by: " + " <a href=\"https://www.capitalone.com/about\" >Capital One</a> ")
        $('#applyButton').click(function(){
          window.open('https://www.capitalone.com/credit-cards/compare/', '_blank')
        })
      }else if (card.issuer_name == "Barclays"){
        $("#issuerName").append("Offered by: " + " <a href=\"https://www.home.barclays/about-barclays.html\" >Barclays</a> ")
        $('#applyButton').click(function(){
          window.open('https://home.barclaycardus.com/cards.html', '_blank')
        })
      }else if (card.issuer_name == "Bank of America") {
        $("#issuerName").append("Offered by: " + " <a href=\"http://about.bankofamerica.com/en-us/index.html#fbid=wGMAEyiZSww\" >Bank of America</a> ")
        $('#applyButton').click(function(){
          window.open('https://www.bankofamerica.com/credit-cards/#filter', '_blank')
        })
      }else if (card.issuer_name == "Wells Fargo") {
        $("#issuerName").append("Offered by: " + " <a href=\"https://www.wellsfargo.com/about/\" >Wells Fargo</a> ")
        $('#applyButton').click(function(){
          window.open('https://www.wellsfargo.com/credit-cards/find-a-credit-card/all/', '_blank')
        })
      }else if (card.issuer_name == "Citi") {
        $("#issuerName").append("Offered by: " + " <a href=\"http://www.citigroup.com/citi/about/citi_at_a_glance.html\" >Citi</a> ")
        $('#applyButton').click(function(){
          window.open('https://www.citi.com/credit-cards/compare-credit-cards/citi.action?ID=view-all-credit-cards', '_blank')
        })
      }else if(card.issuer_name == "Discover"){
        $("#issuerName").append("Offered by: " + " <a href=\"https://www.discover.com/company/our-company/\" >Discover</a> ")
        $('#applyButton').click(function(){
          window.open('https://www.discover.com/credit-cards/#card-options-content', '_blank')
        })
      }else if (card.issuer_name == "American Express") {
        $("#issuerName").append("Offered by: " + " <a href=\"http://about.americanexpress.com/\" >American Express</a> ")
        $('#applyButton').click(function(){
          window.open('https://card.americanexpress.com/american-express/?s_clid=94eb7b9a2d10144b82d7fad0f9fafde1&gclid=Cj0KEQjwuOHHBRDmvsHs8PukyIQBEiQAlEMW0KD9_MuXifHEisq-6ICbVu06kOrkSgWtLuKjC7BSUSsaAuvr8P8HAQ', '_blank')
        })
      }
      // Three arrow button on top
      $('#backButton').click(function goBack(){
        const prevID = card.id-1;
        window.location.href = "card.html?" + prevID;
      })

      $('#downButton').click(function goDetails(){
        window.scrollTo(0,document.body.scrollHeight)
      })

      $('#rightButton').click(function goForward(){
        const nextID = card.id+1;
        window.location.href = "card.html?" + nextID;
      })

      function goBack(){
        const prevID = card.id-1;
        window.location.href = "card.html?" + prevID;
      };

      function goForward(){
        const nextID = card.id+1;
        window.location.href = "card.html?" + nextID;
      };

      function goDetails(){
        window.scrollTo(0,document.body.scrollHeight)
      };

      $(document).keydown(function(e) {
      switch(e.which) {

          case 37: // left
          goBack();
          break;

          case 39: // right
          goForward();
          break;

          case 40:
          goDetails();
          break;

          default: return; // exit this handler for other keys
      }
      e.preventDefault(); // prevent the default action (scroll / move caret)
  });
  // End of three arrow button

    // Detials of card section
      newDescription = card.description.split("|");
      newDescription.forEach(item => {
        list = list + "<li>" + item + "</li>";
      });
      $('#descriptionOfCard').prepend(list)

      // Card Feature Section
      if(card.min_score != 0){
        if(card.min_score >= 720 && card.min_score <= 850){
          $('#cpminScore').append("<h4>Minimum Credit Score</h4>" + "\n" + '<span>' + card.min_score + '</span>' + " | Excellent")
          document.getElementById("cpminScore").style.borderBottom = "1px solid rgba(33,150,243,1)";
        }else if (card.min_score >= 690 && card.min_score <= 719) {
          $('#cpminScore').append("<h4>Minimum Credit Score</h4>" + "\n" + '<span>' + card.min_score + '</span>' + " | Good")
          document.getElementById("cpminScore").style.borderBottom = "1px solid rgba(33,150,243,1)";
        }else if (card.min_score >= 630 && card.min_score <= 689) {
          $('#cpminScore').append("<h4>Minimum Credit Score</h4>" + "\n" + '<span>' + card.min_score + '</span>' + " | Average")
          document.getElementById("cpminScore").style.borderBottom = "1px solid rgba(33,150,243,1)";
        }else if (card.min_score >= 350 && card.min_score <= 629) {
          $('#cpminScore').append("<h4>Minimum Credit Score</h4>" + "\n" + '<span>' + card.min_score + '</span>' + " | Poor")
          document.getElementById("cpminScore").style.borderBottom = "1px solid rgba(33,150,243,1)";
        }
      }

      if(card.cash_back != 0){
        $('#cpcashBack').append("<h4>Cash Back</h4>" + "\n" + '<span>' + card.cash_back + '</span>' + "%")
        document.getElementById("cpcashBack").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.travel != 0){
        $('#cptravel').append("<h4>Travel</h4>" + "\n" + '<span>' + card.travel + '</span>' + "%")
        document.getElementById("cptravel").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.low_interest != 0){
        $('#cplowInterest').append("<h4>Low Interest</h4>" + "\n" + '<span>' + card.low_interest + '</span>' + "%")
        document.getElementById("cplowInterest").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.zero_percent != 0){
        $('#cpzeroPercent').append("<h4>Zero Percent</h4>" + "\n" + '<span>' + card.zero_percent + '</span>' + "%")
        document.getElementById("cpzeroPercent").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.balance_transfer != 0){
        $('#cpbalanceTransfer').append("<h4>Balance Transfer</h4>" + "\n" + '<span>' + card.balance_transfer + '</span>' + "%")
        document.getElementById("cpbalanceTransfer").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.points != 0){
        $('#cppoints').append("<h4>Points</h4>" + "\n" + '<span>' + card.points + '</span>' + "%")
        document.getElementById("cppoints").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.gas != 0){
        $('#cpgas').append("<h4>Gas</h4>" + "\n" + '<span>' + card.gas + '</span>' + "%")
        document.getElementById("cpgas").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.extended_warranty != 0){
        $('#cpextendedWarranty').append("<h4>Extended Warranty</h4>" + "\n" + '<span>' + card.extended_warranty + '</span>' + "%")
        document.getElementById("cpextendedWarranty").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.price_guarantee != 0){
        $('#cppriceGuarantee').append("<h4>Price Guarantee</h4>" + "\n" + '<span>' + card.price_guarantee + '</span>' + "%")
        document.getElementById("cppriceGuarantee").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }

      // Intangible Features Section
      // Doesn't show Intangible features if there isn't any results
      if((card.customer_service == -1 || !(Math.round(card.customer_service*100) > 1)) &&
         (card.redemption == -1 || !(Math.round(card.redemption*100) > 1)) &&
         (card.technology == -1 || !(Math.round(card.technology*100) > 1)) &&
         (card.security == -1 || !(Math.round(card.security*100) > 1)) &&
         (card.credit_building == -1 || !(Math.round(card.credit_building*100) > 1))){

          document.getElementById("right").style.width = "0%";
          document.getElementById("middle").style.width = "66%";
        console.log("No Results");
      }else{
          document.getElementById("middle").style.borderRight = "1px solid rgba(33,150,243,1)";
          document.getElementById("right").style.width = "33%";
        console.log("Has Results");
      }

      if(card.customer_service != -1 && Math.round(card.customer_service*100) > 1){
        $('#cdCustomerService').append("<h4>Customer Service</h4>" + "\n" + '<span>' + Math.round(card.customer_service*100) + '</span>' + "%")
        document.getElementById("cdCustomerService").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }else{
        // $('#cdCustomerService').append("<h4>Customer Service</h4>" + "\n" + '<span>' + "No Result" + '</span>')
        // document.getElementById("cdCustomerService").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.redemption != -1 && Math.round(card.redemption*100) > 1){
        $('#cdRedemption').append("<h4>Redemption</h4>" + "\n" + '<span>' + Math.round(card.redemption*100) + '</span>' + "%")
        document.getElementById("cdRedemption").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }else{
        // $('#cdRedemption').append("<h4>Redemption</h4>" + "\n" + '<span>' + "No Result" + '</span>')
        // document.getElementById("cdRedemption").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.technology != -1 && Math.round(card.technology*100) > 1){
        $('#cdTechnology').append("<h4>Technology</h4>" + "\n" + '<span>' + Math.round(card.technology*100) + '</span>' + "%")
        document.getElementById("cdTechnology").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }else{
          // $('#cdTechnology').append("<h4>Technology</h4>" + "\n" + '<span>' + "No Result" + '</span>')
          // document.getElementById("cdTechnology").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.security != -1 && Math.round(card.security*100) > 1){
        $('#cdSecurity').append("<h4>Security</h4>" + "\n" + '<span>' + Math.round(card.security*100) + '</span>' + "%")
        document.getElementById("cdSecurity").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }else{
        // $('#cdSecurity').append("<h4>Security</h4>" + "\n" + '<span>' + "No Result" + '</span>')
        // document.getElementById("cdSecurity").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }
      if(card.credit_building != -1 && Math.round(card.credit_building*100) > 1){
        $('#cdCreditBuilding').append("<h4>Credit Building</h4>" + "\n" + '<span>' + Math.round(card.credit_building*100) + '</span>' + "%")
        document.getElementById("cdCreditBuilding").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }else{
        // $('#cdCreditBuilding').append("<h4>Credit Building</h4>" + "\n" + '<span>' + "No Result" + '</span>')
        // document.getElementById("cdCreditBuilding").style.borderBottom = "1px solid rgba(33,150,243,1)";
      }

    };
    //end of cardDetails
  });
}(jQuery));
