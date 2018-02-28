// page transitions
$(function() {
  $('.page').fadeIn(500);
  $('.work').click(function() {
    $('.calc').fadeOut(1000);
  });

// mobile menu

$(".hamburger").click(function() {
  $(".hamburger").toggleClass("trigger");
});

$(".menu").click(function() {
  $(".nav ul").toggleClass("open");
});

  var displayNumber = "";
  var storedNumber = "";
  var operator = "";
  var screen = $(".screen");
  screen.text("0");


  $(".numbers").click(function() {
    var number = $(this).text();
    numberPressed(number);
  });


  $(".equals").click(function() {
    var pressedOperator = $(this).text();
    operatorPressed(pressedOperator);
    operator = ""; // so it does not set operator to "="
  });

  // Set font size based on length of the string. As the string gets longer
  // the font size should get smaller.

  var numLength = function(number) {
    if (number.length > 5) {
      $('.screen').css('font-size', '2.5em');
    }
  }

  // When an operator is pressed or clicked, set the value of that
  // operator to pressedOperator variable, then call operatorPressed
  // with pressedOperator passed in

  $(".operator").not('.equals').click(function() {
    var pressedOperator = $(this).text();
    operatorPressed(pressedOperator);
  });

  // We only accept 7 digits, so break the method here to avoid adding on
  // more numbers
  function numberPressed(number) {
    if (displayNumber.length > 7) {
      return;
    }
    displayNumber += number;
    setDisplayNumber(displayNumber);
    numLength(displayNumber);
  }

  function setDisplayNumber(number) {
    if (number.length > 6) {
      var parseNum = parseInt(number);
      var expo = parseNum.toExponential();
      screen.text(expo);
    } else {
      screen.text(number);
    }
  }

  function operatorPressed(pressedOperator) {
    if (storedNumber && displayNumber && operator) {
      var result = calculate(storedNumber, displayNumber, operator);
      storedNumber = result;
      displayNumber = "";
      numLength(result);
      setDisplayNumber(result);
      operator = pressedOperator;
    } else if (!storedNumber) {
      // We don't have a stored number yet. Store the displayNumber and the
      // operator and clear "displayNumber" so that the future presses of the
      // user can be stored.
      storedNumber = displayNumber;
      displayNumber = "";
      numLength(storedNumber);
      setDisplayNumber(storedNumber);
      operator = pressedOperator;
    } else {
      operator = pressedOperator;

    }
  }

  var calculate = function(storedNumber, displayNumber, operator) {
    var a = parseInt(storedNumber, 10);
    var b = parseInt(displayNumber, 10);

    switch (operator) {
      case "-":
        return (a - b).toString(10);

      case "+":
        return (a + b).toString(10);

      case "/":
        return (a / b).toString(10);

      case "*":
        return (a * b).toString(10);
    }
  };

  function clearAll() {
    displayNumber = "";
    storedNumber = "";
    operator = "";
    setDisplayNumber(displayNumber);
    numLength(displayNumber);
    $('.screen').css('font-size', '3em');
    $('.screen').html('0').css('font-size', '3em');
  }

  function clear() {
    displayNumber = "";
    setDisplayNumber(displayNumber.substr(-1));
    $('.screen').html('0').css('font-size', '3em');
  }

  $(".C").click(function() {
    clear();
  });

  $(".AC").click(function() {
    clearAll();
  });

  var pressCount = 0;
  $(document).keypress(function(number) {
    if ([42, 43, 45, 47].includes(number.which)) {
      // These are the *, /, +, - operators.
      var pressedOperator = String.fromCharCode(number.which);
      operatorPressed(pressedOperator);
    } else if (number.which >= 48 && number.which <= 57) {
      // Pressed a number key.
      var number = String.fromCharCode(number.which);
      // displays number pressed to screen
      numberPressed(number);
      // Pressing the equals sign calls operatorPressed with
      // pressedOperator already defined
    } else if (number.which == 61 || number.which == 13) {
      // Pressed equals sign
      operatorPressed();
      // Pressed clear
      // To-do: first clear with C, then AC
      // check number of clicks
    } else if (number.which == 67 || number.which == 99) {
      pressCount++;
      if (pressCount == 1) {
        clear();
      } else if (pressCount >= 2) {
        clearAll();
      }
    }
  });
  // backspace

  $(document).keydown(function(number) {
    if (number.which == 08) {
      var result = displayNumber.slice(0, -1);
      displayNumber = result;
      setDisplayNumber(result);
    }
    if (number.which == 08 && displayNumber == "") {
      screen.text('0');
    }
  });
});
