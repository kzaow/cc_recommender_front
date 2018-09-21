(function($) {
    'use strict';

    $(document).ready(() => {

        var cards = JSON.parse(sessionStorage.getItem("cards"));

        // parses the description and organizes it with bullet points
        function createList(description){
          var description_list = description.split("|");
          var list_ = "";
          description_list.forEach(item => {
            list_ = list_ + "<li>" + item + "</li>";
          });
          return list_;

        }

        function createTableHeader(){
          const features = [
            "Name",
            "Description",
            "Cashback",
            "Travel",
            "Low Interest",
            "Zero Percent",
            "Balance Transfer",
            "Points",
            "Gas",
            "Extended Warranty",
            "Price Guarantee",
          ];
          var feature_header = "";
          features.forEach(feature => {
            feature_header = feature_header + "<th>" + feature + "</th>";
            // console.log(feature_header);
          });
          return feature_header;
        }

        //appends rows using card data to a table
        function appendRow(card) {
            var all_columns = "<tr>";
            all_columns = all_columns + "<th>" + card.name + "</th>";
            all_columns = all_columns + "<th>" + "<ul>" + createList(card.description) + "</ul>" + "</th>";
            all_columns = all_columns + "<th>" + card.cash_back + "</th>";
            all_columns = all_columns + "<th>" + card.travel + "</th>";
            all_columns = all_columns + "<th>" + card.low_interest + "</th>";
            all_columns = all_columns + "<th>" + card.zero_percent + "</th>";
            all_columns = all_columns + "<th>" + card.balance_transfer + "</th>";
            all_columns = all_columns + "<th>" + card.points + "</th>";
            all_columns = all_columns + "<th>" + card.gas + "</th>";
            all_columns = all_columns + "<th>" + card.extended_warranty + "</th>";
            all_columns = all_columns + "<th>" + card.price_guarantee + "</th>";
            all_columns = all_columns + "</tr>";
            $("#table-of-cards").append(all_columns);
            //             return {
            //   payment_network_name: c.payment_network_name,
            //   issuer_name: c.issuer_name,
            //   name: c.name,
            //   description: c.description,
            //   min_score: c.min_score,
            //   cash_back: c.cash_back,
            //   travel: c.travel,
            //   low_interest: c.low_interest,
            //   zero_percent: c.zero_percent,
            //   balance_transfer: c.balance_transfer,
            //   points: c.points,
            //   gas: c.gas,
            //   extended_warranty: c.extended_warranty,
            //   price_guarantee: c.price_guarantee,
            // }
        }

        // creates table using queried card data
        function createTable(cards_) {
          if(cards.length > 0){
            var table_ = '<table id="cards_table" class="table"><thead><tr>' + createTableHeader() + '</tr></thead><tbody id="table-of-cards"></tbody></table>';
            $("#div-for-table").append(table_);

            cards_.forEach(card => {
            appendRow(card);
            });
          }
          else {
            $("#div-for-table").append("<p id='no-result'>No results</p>");
          }
        }

        createTable(cards);
        $("#cards_table").tablesorter();

    });

}(jQuery));
