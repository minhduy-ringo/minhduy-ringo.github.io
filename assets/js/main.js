// main.js
// Show loading overlay with basic fontawesome icon
$.LoadingOverlay("show", {
  image       : "",
  fontawesome : "fas fa-circle-notch fa-spin"
});

$(function() {
  
  // Hide overlay when done loading
  $.LoadingOverlay("hide");

  $(".progress").each(function() {

    var value = $(this).attr('data-value');
    var left = $(this).find('.progress-left .progress-bar');
    var right = $(this).find('.progress-right .progress-bar');

    if (value > 0) {
      if (value <= 50) {
        right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
      } else {
        right.css('transform', 'rotate(180deg)')
        left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
      }
    }

  })

  function percentageToDegrees(percentage) {
    return percentage / 100 * 360
  }

  // Stick navbar
  var sticky = new Waypoint.Sticky({
    element: $(".navbar")
  });
  
  // Highlight current section on nav-item
  // Trigger when hit top of section
  var waypoints = $("section").waypoint({
    handler: function(direction) {
      if(direction === "down")
      {
        var navItems = document.getElementsByClassName("nav-item");
        for (const link of navItems) {
          if(link.hash.substring(1) == this.element.id)
            link.classList.add('nav-item-active');
          else
            link.classList.remove('nav-item-active');
        }
      }
    },
    // Subtract offset for navbar's scroll offset
    offset: function() {
      var navbar = document.getElementById('navbar');
      return navbar.offsetHeight + 20;
    }
  })
  // Trigger when hit bottom of section
  var waypoints = $("section").waypoint({
    handler: function(direction) {
      if(direction === "up")
      {
        var navItems = document.getElementsByClassName("nav-item");
        for (const link of navItems) {
          if(link.hash.substring(1) == this.element.id)
            link.classList.add('nav-item-active');
          else
            link.classList.remove('nav-item-active');
        }
      }
    },
    offset: function() {
      var navbar = document.getElementById('navbar');
      return -this.element.clientHeight + navbar.offsetHeight;
    }
  })

  // Scroll to section with offset
  $(".nav-link").click(function(event) {
    event.preventDefault();

    var sectionId = $(this).attr("href");
    var navbarHeight = $(".navbar").outerHeight();

    $("html, body").animate({
      scrollTop: $(sectionId).offset().top - navbarHeight - 10}, 100);
  })

});