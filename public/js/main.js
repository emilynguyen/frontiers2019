/*
 * main.js
 */

const lgScreen = 960;

function highlightNav() {
  // Get current scroll position
  const position = $(this).scrollTop();

  // Compare current scroll position with position of each section
  $('.nav-item').each(function() {
    const targetid = "#" + $(this).text().toLowerCase();
    const target = $(targetid).offset().top + -150;

    // Highlight Sign-Up if at bottom of page
    if (position >= $(document).height() - $(window).height()) {
      $('.nav-item').removeClass('active');
      $('.nav-item:last-child').addClass('active');
    }
    // Highlight Sponsors if near bottom of page
    else if (position >= $(document).height() - $(window).height() - 200) {
      $('.nav-item').removeClass('active');
      $('.nav-item:nth-last-child(2)').addClass('active');
    }
    // Highlight target
    else if (position >= target && position < target + $(targetid).height()) {
      $(this).addClass('active');
    }
    else {
      // Reset highlighting
      $(this).removeClass('active');
    }
  });
}

/*
 * Main function
 */
var main = function() {
  highlightNav();

  /* FAQ DRAWER TOGGLE */
  $('.q').click(function() {
    $(this).closest('.faq-item').find('.a').slideToggle(300);
    $(this).toggleClass('active');
  });

  /* NAV ITEM CLICK ACTION */
  $(".nav-item").click(function() {
    // Determine offsets
    let offset;
    let lastChildOffset;
    if ($(window).width() < lgScreen) {
      offset = -70;
      lastChildOffset = -400;
    }
    else {
      offset = 5;
      lastChildOffset = -200;
    }

    const dest = "#" + $(this).text().toLowerCase();

    // Only fade out menu if mobile
    if ($(window).width() < lgScreen) {
      $hamburger.toggleClass("is-active");
      $(".nav-drawer").fadeToggle(200);
    }

    // Don't scroll to bottom if dest = Sponsors
    if (dest == "#sponsors") {
      $('html, body').animate({
         scrollTop: $(dest).offset().top + lastChildOffset
      }, 500);
    }
    else {
      $('html, body').animate({
        scrollTop: $(dest).offset().top + offset
      }, 500);
    }
  });

  /* HIGHLIGHT ACTIVE MENU ITEM */
  $(window).scroll(function() {
    highlightNav();
  });

  /* Ensure menu is showing on desktop */
  $(window).resize(function() {
    if ($(window).width() >= lgScreen)
      $(".nav-drawer").show();
  });

  /* HAMBURGER MENU */
  var $hamburger = $(".hamburger");
  $hamburger.on("click", function(e) {
    // If menu is closed and scrolltop is not 0
    if (!$hamburger.hasClass("is-active") && $(window).scrollTop() > 0) {
      // Toggle hamburger open/close
      $hamburger.toggleClass("is-active");
      // Toggle menu
      $(".nav-drawer").slideToggle(400);
    } else {
      // Toggle hamburger open/close
      $hamburger.toggleClass("is-active");
      // Toggle menu
      $(".nav-drawer").slideToggle(400);
    }
  });

};

$(document).ready(main);
