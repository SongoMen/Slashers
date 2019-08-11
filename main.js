function animText() {
      $(" .hover > span").html(function(index, html) {
          return html.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word">$2</span>')
      });
      $(" .hover .word").html(function(index, html) {
          return html.replace(/\S/g, '<span class="letter">$&</span>');
      });
      $(".intro h1").each(function(i, el) {
          $(el).prepend("<small>"+('0' + (page + 1)).slice(-2)+"</small>")
      })
  
  
}
animText()
$("a.hover").each(function(i, el) {
  $(el).on("mouseenter", function() {
      TweenMax.staggerTo($(el).find("span span"), 0.2, {
          x: 5,
          y: 5,
          autoAlpha: 0
      }, 0.05)
      TweenMax.staggerTo($(el).find("span span"), 0, {
          x: -5,
          y: -5,
          autoAlpha: 0,
          delay: 0.2,
      }, 0.05)
      TweenMax.staggerTo($(el).find("span span"), 0.2, {
          x: 0,
          y: 0,
          autoAlpha: 1,
          delay: 0.2
      }, 0.05)
      TweenMax.to(".mouse-track .outer-circle", 0.5, {
          height: 80,
          width: 80,
          strokeWidth: 2,
          autoAlpha: 0
      })
      TweenMax.set(".countdown", {
          autoAlpha: 0
      })
      TweenMax.to(".mouse-track .inner-circle", 0.5, {
          autoAlpha: 0
      })
  }).on("mouseleave", function() {
      TweenMax.to(".mouse-track .outer-circle", 0.5, {
          height: 18,
          width: 18,
          strokeWidth: 2,
          autoAlpha: 1
      })
      TweenMax.to(".mouse-track .inner-circle", 0.5, {
          autoAlpha: 0.6
      })
  })
})