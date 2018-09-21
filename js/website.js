(function($) {

  'use strict';

  $(document).ready(() => {


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

    ids.forEach(id => {
      $(id).click(function() {
        if ($(this).css('background-color') === '#fdfdfd') {
          $(this).toggleClass('feature-checked');
        } else {
          $(this).toggleClass('feature-checked');
        }
      });
    });

    //appends rows using card data to a table
    // function appendRow(card){
    //   var row_ = "<tr>" + "<th>" + card.name + "</th>" + "<th>" + card.description + "</th>" + "</tr>";
    //   $("#table-of-cards").append(row_);
    //   console.log(row_);
    //
    // }

    $('#go').click(() => {
      const qs = document.querySelector.bind(document);
      const qsClass = id => qs(id).className.includes('feature-checked');
      $.ajax({
        url: '/results',
        method: 'POST',
        data: {
          score: qs('#scores').value,
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

          // stores query data in session storage
          if (typeof(Storage) !== "undefined") {

            var selections = {
              score: qs('#scores').value,
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
          // Code for localStorage/sessionStorage.
           sessionStorage.setItem("cards", JSON.stringify(data.data));
           sessionStorage.setItem("selections", JSON.stringify(selections));
          } else {
          // Sorry! No Web Storage support..
          }
          window.location.href = "result.html";
        },
      });
    });

  });

}(jQuery));
