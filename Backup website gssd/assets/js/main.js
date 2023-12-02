$('.trig').click(function (evt) {
    evt.stopPropagation();
    $('iframe').css('opacity', 0);
  
    setTimeout(function () {
      $('iframe').remove();
    }, 1300);
  });
  
  $('.content label.lab').click(function () {
    let ID = $(this).data('iframe');
  
    setTimeout(function () {
      $('body').append(`<iframe src='https://www.gssd.cl/${ID}' />`);
    }, 1500);
  
    setTimeout(function () {
      $('iframe').css('opacity', 1);c
    }, 1600);
  
  });

/* MASONRY*/

$(window).load(function() {

  $("section img").click(function() {
    $(".lightbox").fadeIn(300);
    $(".lightbox").append("<img src='" + $(this).attr("src") + "' alt='" + $(this).attr("alt") + "' />");
    $(".filter").css("background-image", "url(" + $(this).attr("src") + ")");
    /*$(".title").append("<h1>" + $(this).attr("alt") + "</h1>");*/
    $("html").css("overflow", "hidden");
    if ($(this).is(":last-child")) {
      $(".arrowr").css("display", "none");
      $(".arrowl").css("display", "block");
    } else if ($(this).is(":first-child")) {
      $(".arrowr").css("display", "block");
      $(".arrowl").css("display", "none");
    } else {
      $(".arrowr").css("display", "block");
      $(".arrowl").css("display", "block");
    }
  });

  $(".close").click(function() {
    $(".lightbox").fadeOut(300);
    $("h1").remove();
    $(".lightbox img").remove();
    $("html").css("overflow", "auto");
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $(".lightbox").fadeOut(300);
      $(".lightbox img").remove();
      $("html").css("overflow", "auto");
    }
  });

  $(".arrowr").click(function() {
    var imgSrc = $(".lightbox img").attr("src");
    var search = $("section").find("img[src$='" + imgSrc + "']");
    var newImage = search.next().attr("src");
    /*$(".lightbox img").attr("src", search.next());*/
    $(".lightbox img").attr("src", newImage);
    $(".filter").css("background-image", "url(" + newImage + ")");

    if (!search.next().is(":last-child")) {
      $(".arrowl").css("display", "block");
    } else {
      $(".arrowr").css("display", "none");
    }
  });

  $(".arrowl").click(function() {
    var imgSrc = $(".lightbox img").attr("src");
    var search = $("section").find("img[src$='" + imgSrc + "']");
    var newImage = search.prev().attr("src");
    /*$(".lightbox img").attr("src", search.next());*/
    $(".lightbox img").attr("src", newImage);
    $(".filter").css("background-image", "url(" + newImage + ")");

    if (!search.prev().is(":first-child")) {
      $(".arrowr").css("display", "block");
    } else {
      $(".arrowl").css("display", "none");
    }
  });

});

/* MODAL */

window.onload = function () {
    document.querySelector(".cont_modal").className = "cont_modal";
  };
  var c = 0;
  function open_close() {
    if (c % 2 == 0) {
      document.querySelector(".cont_modal").className =
        "cont_modal cont_modal_active";
      c++;
    } else {
      document.querySelector(".cont_modal").className = "cont_modal";
      c++;
    }
  }
  
  $(".animated-progress span").each(function () {
    $(this).animate(
    {
      width: $(this).attr("data-progress") + "%",
    },
    2000
    );
    $(this).text($(this).attr("data-progress") + "%");
    });
  
