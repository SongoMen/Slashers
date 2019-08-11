var mousetracking,
    swiping

function mouseTrack() {
    if (mousetracking) {
        TweenMax.set(".mouse-track", {
            autoAlpha: 1
        })
        TweenMax.to(".mouse-track .outer-circle", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .inner-circle", 0.4, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .arrow-left", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .arrow-right", 0.2, {
            left: mouseX,
            top: mouseY
        })
        TweenMax.to(".mouse-track .play", 0.35, {
            left: mouseX,
            top: mouseY,
        })
        TweenMax.to(".mouse-track .stop", 0.35, {
            left: mouseX,
            top: mouseY
        })
    }
}

$(document).on("touchstart touchmove", function(e) {
  mousetracking = false;
});
$("body")
  .on("touchstart", function(e) {
    mousetracking = false;
    (mouseThen = e.originalEvent.touches[0].clientX),
      (mouseYThen = e.originalEvent.touches[0].clientY);
  })
  .on("mousedown", function(e) {
    mouseThen = e.clientX;
    mouseYThen = e.clientY;
  })
  .on("touchmove", function(e) {
    mousetracking = false;
    if (swiping) {
      mouseX = e.originalEvent.touches[0].clientX;
      mouseY = e.originalEvent.touches[0].clientY;
    }
  })
  .on("mousemove", function(e) {
    mousetracking = true;
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

$("body")
  .on("mousedown touchstart", function(e) {
    e.preventDefault();
    if (!mouseInVideo) {
      TweenMax.to(".mouse-track .outer-circle", 0.5, {
        strokeWidth: 6,
        height: 6,
        width: 6
      });
    }
    if (!transitioning && !intro) {
      menuCDSwitch = true;
      menuCountdown();
      swiping = true;
    }
    if (intro) {
      menuCDSwitch = true;
      introCountdown();
      swiping = true;
    }
  })
  .on("mousemove touchmove", function(e) {
    e.preventDefault();
    if (swiping && !transitioning) {
      distanceRaw = mouseThen - mouseX;
      distance = Math.abs(distanceRaw);
      swipe();
      if (mouseThen > mouseX) {
        movingLeft = true;
        movingRight = false;
      } else if (mouseX > mouseThen) {
        movingLeft = false;
        movingRight = true;
      }

      if (mouseYThen > mouseY) {
        movingDown = true;
        movingUp = false;
      } else if (mouseY > mouseYThen) {
        movingDown = false;
        movingUp = true;
      }
    }
    mouseTrack();
  })
  .on("mouseup touchend", function(e) {
    e.preventDefault();
    swiping = false;
    swipeCancel();
    distance = 0;
  });

function animText() {
  $(".hover > span").html(function(index, html) {
    return html.replace(
      /(^|<\/?[^>]+>|\s+)([^\s<]+)/g,
      '$1<span class="word">$2</span>'
    );
  });
  $(".hover .word").html(function(index, html) {
    return html.replace(/\S/g, '<span class="letter">$&</span>');
  });
  $(".intro h1").each(function(i, el) {
    $(el).prepend("<small>" + ("0" + (page + 1)).slice(-2) + "</small>");
  });
}
animText();
$("a.hover").each(function(i, el) {
  $(el)
    .on("mouseenter", function() {
      TweenMax.staggerTo(
        $(el).find("span span"),
        0.2,
        {
          x: 5,
          y: 5,
          autoAlpha: 0
        },
        0.05
      );
      TweenMax.staggerTo(
        $(el).find("span span"),
        0,
        {
          x: -5,
          y: -5,
          autoAlpha: 0,
          delay: 0.2
        },
        0.05
      );
      TweenMax.staggerTo(
        $(el).find("span span"),
        0.2,
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          delay: 0.2
        },
        0.05
      );
      TweenMax.to(".mouse-track .outer-circle", 0.5, {
        height: 80,
        width: 80,
        strokeWidth: 2,
        autoAlpha: 0
      });
      TweenMax.set(".countdown", {
        autoAlpha: 0
      });
      TweenMax.to(".mouse-track .inner-circle", 0.5, {
        autoAlpha: 0
      });
    })
    .on("mouseleave", function() {
      TweenMax.to(".mouse-track .outer-circle", 0.5, {
        height: 18,
        width: 18,
        strokeWidth: 2,
        autoAlpha: 1
      });
      TweenMax.to(".mouse-track .inner-circle", 0.5, {
        autoAlpha: 0.6
      });
    });
});
