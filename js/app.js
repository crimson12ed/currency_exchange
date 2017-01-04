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

        var from_rate = data.rates[from];
        var to_rate = data.rates[to];

        var converted_value = (value / from_rate) * to_rate;

        var output = value + " " + from + " = " + converted_value.toFixed(0) + " " + to;

        return $('.js-media-list').html(output);
      }
    );
  }

  $(document).ready(function () {
    $('#currency').html(createDataList(currencies));

    console.log(getCurrentDate());

    $('#currency_from').attr('placeholder', 'USD');
    $('#currency_to').attr('placeholder', 'AUD');


    $('.js-search-btn').click(function (event) {
      event.preventDefault();
      getCurrencyExhange($("#amount").val(), $('#currency_from').val(), $('#currency_to').val());
    });

  });
}());
