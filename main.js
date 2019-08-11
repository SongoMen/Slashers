var mousetracking,
  swiping,
  transitioning,
  page = 0;
function mouseTrack() {
  if (mousetracking) {
    TweenMax.set(".mouse-track", {
      autoAlpha: 1
    });
    TweenMax.to(".mouse-track .outer-circle", 0.2, {
      left: mouseX,
      top: mouseY
    });
    TweenMax.to(".mouse-track .inner-circle", 0.4, {
      left: mouseX,
      top: mouseY
    });
    TweenMax.to(".mouse-track .arrow-left", 0.2, {
      left: mouseX,
      top: mouseY
    });
    TweenMax.to(".mouse-track .arrow-right", 0.2, {
      left: mouseX,
      top: mouseY
    });
    TweenMax.to(".mouse-track .play", 0.35, {
      left: mouseX,
      top: mouseY
    });
    TweenMax.to(".mouse-track .stop", 0.35, {
      left: mouseX,
      top: mouseY
    });
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
    menuCDSwitch = true;
    swiping = true;
  })
  .on("mousemove touchmove", function(e) {
    e.preventDefault();
    if (swiping && !transitioning) {
      distanceRaw = mouseThen - mouseX;
      distance = Math.abs(distanceRaw);
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

function load() {
  setTimeout(function() {
    $(".counter .page").html(page + 1);
    $(".counter .divider").html("/");
    $(".counter .total").html(5);
  }, 1000);
  sideText();

  TweenMax.staggerTo(
    ".menu-top a",
    0.5,
    {
      autoAlpha: 1,
      y: 0,
      delay: 1
    },
    0.2
  );
  TweenMax.to(".bottomMenu", 0.5, {
    autoAlpha: 1,
    delay: 1
  });
  TweenMax.set(window, {
    transitioning: false,
    delay: 0.3
  });
}

function sideText() {
  TweenMax.to(".line", 0.5, {
    height: "0%",
    top: "100%"
  });
  TweenMax.to(".counter span", 0.5, {
    marginBottom: -45,
    delay: 0.5
  });
  TweenMax.set(".line", {
    top: 0,
    delay: 1
  });
  TweenMax.to(".line", 0.5, {
    ease: Elastic.easeOut.config(1, 1),
    height: "50%",
    delay: 1
  });
  TweenMax.set(".counter span", {
    marginBottom: 45,
    delay: 1
  });
  TweenMax.staggerTo(
    ".counter span",
    0.5,
    {
      ease: Elastic.easeOut.config(1, 1),
      marginBottom: 0,
      delay: 1.5
    },
    0.03
  );
}

$(window).on("mousewheel", function(event) {
  event.preventDefault();
  TweenMax.set(window, {
    page: "+= 1",
    delay: 1,
    onComplete: function() {
      projectIn();
    }
  });
});
load();
