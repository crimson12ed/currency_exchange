/*jslint devel: true, esversion: 6 */
/*global $, jQuery*/

(function () {

  function createDataList(currencies) {
    var output = '';

    for (var k in currencies) {
      output += '<option value="' + k + '">' + currencies[k] + '</option>';
    }

    return output;
  }

  function getCurrentDate() {
    var today = new Date();

    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (mm < 10) mm = "0" + mm;
    if (dd < 10) dd = "0" + dd;

    return [yyyy, mm, dd].join('-');
  }

  function getCurrencyExhange(value, from, to) {
    var date = getCurrentDate();

    $.get('https://openexchangerates.org/api/historical/' + date + '.json',
      {
        app_id: '22d9598f35804071b18669436390b5d6',
        base: 'USD',
      },
      function(data) {
        var converted_value = convertValue(value, data.rates[from], data.rates[to]);
        var output = "<h2>" + value + " " + from + " = " + converted_value.toFixed(0) + " " + to + "</h2>";

        $('.js-media-list').html(output).hide();

        $('.js-media-list').fadeIn({duration: 400, queue: false});
      }
    );
  }

  function convertValue(value, fromRate, toRate) {
    return (value / fromRate) * toRate;
  }

  $(document).ready(function () {


    // Animation
    $('.js-animate-show-logo').hide();
    $('.js-animate-show-content').hide();

    $('.js-animate-show-logo').animate(
      {'margin-top': '3em'},
      {duration: 1000, queue: false});

    $('.js-animate-show-logo').fadeIn({
      duration: 1000,
      queue: false,
      complete: function () {
        $('.js-animate-show-content').fadeIn(400);
      }
    });


    $('#currency').html(createDataList(currencies));

    $('#currency_from').attr('placeholder', 'USD');
    $('#currency_to').attr('placeholder', 'AUD');


    $('.js-search-btn').click(function (event) {
      event.preventDefault();
      getCurrencyExhange($("#amount").val(), $('#currency_from').val(), $('#currency_to').val());
    });

  });
}());
