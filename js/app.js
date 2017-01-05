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

  function validateForm(currencies, value, from, to) {
    var error = "";
    if (!(value && value == parseInt(value, 10))) {
      error += "Invalid value. ";
    }

    if (!(from && currencies[from])) {
      error += "Invalid currency to be converted from. ";
    }

    if (!(to && currencies[to])) {
      error += "Invalid currency to be converted to. ";
    }

    return error;
  }

  function getCurrencyExhange(value, from, to) {

    $.get('https://openexchangerates.org/api/latest.json',
      {
        app_id: '22d9598f35804071b18669436390b5d6',
        base: 'USD',
      },
      function(data) {
        var converted_value = convertValue(value, data.rates[from], data.rates[to]);
        var output = "<h2>" + parseInt(value).toFixed(4) + " " + from + " = " + converted_value.toFixed(4) + " " + to + "</h2>";

        $('.js-media-list').html(output).hide();

        $('.js-media-list').fadeIn({duration: 400, queue: false});
      }
    );
  }

  function convertValue(value, fromRate, toRate) {
    console.log(fromRate);
    console.log(toRate);
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

    $('#currency_from').attr('placeholder', 'e.g. USD');
    $('#currency_to').attr('placeholder', 'e.g. AUD');

    // Disable submit button until all fields filled
    $('form > input').keyup(function() {

        var empty = false;
        $('form > input').each(function() {
            if ($(this).val() == '') {
                empty = true;
            }
        });

        if (empty) {
            $('.js-search-btn').attr('disabled', 'disabled');
        } else {
            $('.js-search-btn').removeAttr('disabled');
        }
    });

    $('.js-search-btn').click(function (event) {
      event.preventDefault();
      var errormsg = validateForm(currencies, $("#amount").val(), $('#currency_from').val(), $('#currency_to').val());

      if (!errormsg) {
        getCurrencyExhange($("#amount").val(), $('#currency_from').val(), $('#currency_to').val());

      } else {
        $('.js-media-list').css("color", "red").html(errormsg).fadeOut(5000, function() {
          $('.js-media-list').css("color", "#FFF");
        });
      }
    });

  });
}());
