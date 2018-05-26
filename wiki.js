$(function() {
  $('.page').fadeIn('slow');
  $('.back-arrow').click(function() {
    $('.calc').fadeOut('fast');
  });


  // mobile menu

  $(".hamburger").click(function() {
    $(".hamburger").toggleClass("trigger");
  });

  $(".menu").click(function() {
    $(".nav ul").toggleClass("open");
  });

  $(".keyword").keypress(function(event) {
    // on enter
    if (event.which == 13) {
      // 13 is the keycode for "enter"
      var keyword = $(".keyword").val(); // keyword is stored in val
      $(".load").removeClass("hidden");
      $("#results").remove();
      makeRequest(); //caling the makeRequest function
    }

    function makeRequest() {
      $.ajax({
        // ajax call
        url: "https://en.wikipedia.org/w/api.php", // api endpoint where you are requesting data from
        data: {
          // data object of the information you are requesting from the api
          origin: "*", // this prevents issues with cross-site requests
          action: "query",
          format: "json",
          list: "search",
          srsearch: keyword,
          srlimit: "20",
          srprop: "snippet"
        },
        success: function(data) {
          $(".top").removeClass("full-size"); // remove class to trigger animation on enter
          $('.logo img').css('display', 'none');
          $(".keyword").val(""); // empty search form
          $(".load").addClass("hidden");
          $('.results-wrap').css('padding-top', '20px');

          console.log(data);
          var queryObject = data.query;
          var searchResults = queryObject.search;

          var resultsDiv = $("<div id='results'></div>"); // creating a new div for animations

          for (i = 0; i < searchResults.length; i++) {
            var articleTitle = searchResults[i].title;
            var articleSnip = searchResults[i].snippet;
            var articlePage = searchResults[i].pageid;

            var div = $("<div></div>"); // putting each result in its own div element
            div.append(
              "<h4><a target = '_blank' href='https://en.wikipedia.org/wiki?curid=" +
              articlePage +
              "'>" +
              articleTitle +
              "</a></h4>"
            );

            div.append(
              "<p>" +
              articleSnip +
              " ... " +
              "<a target = '_blank' href='https://en.wikipedia.org/wiki?curid=" +
              articlePage +
              "'>" +
              " [read more]" +
              "</p>"
            );

            resultsDiv.append(div);
          } // for loop completed, resultsDiv has all results

          $("#results").remove(); //removing old div
          $(".bottom").append(resultsDiv); // appending results to new div created
        }, // end of success callback
        error: function(error) {
          console.log("Let's try that again", error);
        }
      }); // end of ajax call
    } // end of makeRequest function
  }); // end of keypress function

  // scroll to top
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 300) {
      // if page is scrolled more than 100px
      $(".return-to-top").fadeIn(200); // fade in the arrow
    } else {
      $(".return-to-top").fadeOut(200); // else fade out the arrow
    }
  });

  $(".return-to-top").click(function() {
    // when arrow is clicked
    $("body,html").animate({
        scrollTop: 0 // scroll to top of body
      },
      500
    );
  });
});
