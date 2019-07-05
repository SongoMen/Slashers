var $box = $('.box'),
    $loader = $('.cursor .loading'),
    $drag = $('.drag'),
    inter = 30,
    speed = 0;

function moveBox(e) {
    var timesel = 0.3;

    if ($drag.hasClass('grab')) {
        timesel = 0.05;
    }

    $box.each(function (index, val) {
        if (!$(this).hasClass('fixit')) {
            if (index == 1) {
                TweenLite.to($(this), timesel, { css: { left: e.pageX, top: e.pageY }, delay: 0 + (index / 750) });
            } else {
                TweenLite.to($(this), 0.05, { css: { left: e.pageX, top: e.pageY }, delay: 0 + (index / 750) });
            }
        } else {
            TweenLite.to($(this), timesel, { css: { opacity: 1, scale: 1 }, delay: 0 + (index / 750) });
        }
    });
}

function changeDragType(e) {
    if ($drag.hasClass('grab')) {
        $drag.each(function (index, val) {
            TweenLite.to($box.eq(1), 0.3, { scale: 0.8, delay: 0, ease: Circ.easeOut });
            TweenLite.to($(this), 0.3, { scale: 0.8, delay: 0, overwrite: "all", ease: Circ.easeOut });
            TweenLite.to($(this).find('.next'), 0.3, { x: 25, delay: 0, overwrite: "all", ease: Circ.easeOut });
            TweenLite.to($(this).find('.prev'), 0.3, { x: -25, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        });
    } else {
        $drag.each(function (index, val) {
            TweenLite.to($box.eq(1), 0.3, { scale: 1, delay: 0, ease: Circ.easeOut });
            TweenLite.to($(this), 0.3, { scale: 1, delay: 0, overwrite: "all", ease: Circ.easeOut });
            TweenLite.to($(this).find('.next'), 0.3, { x: 0, delay: 0, overwrite: "all", ease: Circ.easeOut });
            TweenLite.to($(this).find('.prev'), 0.3, { x: 0, delay: 0, overwrite: "all", ease: Circ.easeOut });
        });
    }
}

function moveDrag(e) {
    var timesel = 0.3;

    if ($drag.hasClass('grab')) {
        timesel = 0;
    }

    if ($(e.target).hasClass('fixtarget') || $(e.target).hasClass('fixpoint')) {
        TweenLite.to($drag, 0.1, { opacity: 0, overwrite: "all", ease: Circ.easeOut });
        //return false;
    } else {
        TweenLite.to($drag, 0.1, { opacity: 1, ease: Circ.easeOut });
    }

    $drag.each(function (index, val) {

        var scaleval = 1;

        if ($drag.hasClass('grab')) {
            scaleval = 0.8;
        }

        TweenLite.to($(this), timesel, { scale: scaleval, left: e.pageX, top: e.pageY, delay: 0 + (index / 750) });

        TweenLite.to($(this).find('.next'), 0.2, { opacity: 1, delay: 0, ease: Circ.easeInOut });
        TweenLite.to($(this).find('.prev'), 0.2, { opacity: 1, delay: 0, ease: Circ.easeInOut });
    });
}
function hideDrag(e) {
    var timesel = 0.2;

    if ($drag.hasClass('grab')) {
        timesel = 0;
    }

    $drag.each(function (index, val) {
        TweenLite.to($(this).find('.next'), 0.3, { x: 0, delay: 0, overwrite: "all", ease: Circ.easeOut });
        TweenLite.to($(this).find('.prev'), 0.3, { x: 0, delay: 0, overwrite: "all", ease: Circ.easeOut });
        TweenLite.to($(this), timesel, { scale: 0, left: e.pageX, top: e.pageY, overwrite: "all", ease: Circ.easeInOut });
    });
}


function moveNext(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this), 0.2, { scale: 1, left: e.pageX, top: e.pageY, delay: 0 + (index / 750) });
    });
}
function showNext(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this).find('.next'), 0.2, { x: 0, opacity: 1, delay: 0 + (index / 750) });
        TweenLite.to($(this).find('.prev'), 0.2, { x: -50, opacity: 0, delay: 0 + (index / 750) });
    });
}
function hideNext(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this).find('.next'), 0.2, { x: 50, opacity: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($(this).find('.prev'), 0.2, { x: -50, opacity: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($(this), 0.2, { scale: 0, left: e.pageX, top: e.pageY, overwrite: "all", ease: Circ.easeInOut });
    });
}


function movePrev(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this), 0.2, { scale: 1, left: e.pageX, top: e.pageY, delay: 0 + (index / 750) });
    });
}
function showPrev(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this).find('.next'), 0.2, { x: 50, opacity: 0, delay: 0 + (index / 750) });
        TweenLite.to($(this).find('.prev'), 0.2, { x: 0, opacity: 1, delay: 0 + (index / 750) });
    });
}
function hidePrev(e) {
    $drag.each(function (index, val) {
        TweenLite.to($(this).find('.next'), 0.2, { x: 50, opacity: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($(this).find('.prev'), 0.2, { x: -50, opacity: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($(this), 0.2, { scale: 0, left: e.pageX, top: e.pageY, overwrite: "all", ease: Circ.easeInOut });
    });
}

var showPointBase = [30, 30];

function showPoint(e) {
    busy = true;

    if ($(e.target).hasClass('fixpoint')) {
        $box.eq(1).addClass('fixit');
        var fixtarget = $(e.target).find('.fixtarget');
    } else if ($(e.target).closest('.fixpoint').length) {
        $box.eq(1).addClass('fixit');
        // caselist
        if ($(e.target).closest('.fixpoint').hasClass('info')) {
            var fixtarget = $(e.target).closest('.info').find('.fixtarget');
        } else {
            var fixtarget = $(e.target);
        }
        console.log("DSA")
    }

    if ($(e.target).hasClass('fixpoint') || $(e.target).closest('.fixpoint').length) {
        var subadd = 10;
        twidth = $(fixtarget).width() + subadd,
            theight = $(fixtarget).height() + subadd,
            pos = $(fixtarget).offset(),
            posTop = pos.top + subadd,
            posLeft = pos.left + subadd;

        TweenLite.to($box.eq(1), 0.5, { scale: 1, width: twidth, height: theight, left: posLeft, top: posTop, opacity: 1, overwrite: "all", ease: Circ.easeOut });
    }
}
function hidePoint(e) {
    $box.eq(1).removeClass('fixit');

    busy = false;
    TweenLite.to($box.eq(1), 0.3, { scale: 1, width: showPointBase[0], height: showPointBase[1], marginTop: -showPointBase[1] / 2, marginLeft: -showPointBase[0] / 2, opacity: 1, overwrite: "all", ease: Circ.easeOut });
}

function moveLoader(e) {
    $loader.each(function (index, val) {
        if ($(this).hasClass('showed')) {
            TweenLite.to($(this), 0.05, { scale: 1, rotate: "360deg", left: e.pageX, top: e.pageY, delay: 0 + (index / 750) });
        } else {
            TweenLite.to($(this), 0.5, {
                scale: 1, rotate: "360deg", left: e.pageX, top: e.pageY, delay: 0 + (index / 750), onComplete() {
                    $loader.addClass('showed');
                }
            });
        }
    });
}

function changeCursor(e) {
    TweenLite.to($box.eq(0), 0.05, { backgroundColor: "#ffffff", left: e.pageX, top: e.pageY });
    TweenLite.to($box.eq(1), 0.05, { borderColor: "#ffffff", left: e.pageX, top: e.pageY });
}
function restoreCursor(e) {
    TweenLite.to($box.eq(0), 0.05, { backgroundColor: "#fa343d", left: e.pageX, top: e.pageY });
    TweenLite.to($box.eq(1), 0.05, { borderColor: "#fa343d", left: e.pageX, top: e.pageY });
}

$box.each(function(index, val) {
	index = index + 1;
	TweenMax.set(
		$(this),{
			autoAlpha: 1 - (0.0333 * index),
			delay:0
		});
});

TweenLite.to($box.eq(1), 0, { scale: 1, opacity: 1, overwrite: "all" });

$(document).on('mousemove', moveBox);
$('.dragit').on('mousemove', moveDrag);
$('.dragit').on('mouseleave', hideDrag);

$('.whitecursor').on('mousemove', changeCursor);
$('.whitecursor').on('mouseleave', restoreCursor);

$('.nextcur').on('mousemove', moveNext);
$('.nextcur').on('mouseenter', showNext);
$('.nextcur').on('mouseleave', hideNext);

$('.nextcur').on('mousemove', movePrev);
$('.nextcur').on('mouseenter', showPrev);
$('.nextcur').on('mouseleave', hidePrev);

// sub pointer
$('.pointin').on('mouseenter', showPoint);
$('.pointin').on('mouseleave', hidePoint);


$('.pointer').hover(
    function () {
        TweenLite.to($box.eq(0), 0.1, { opacity: 0, repeat: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($box.eq(1), 0.3, { scale: 0, opacity: 0, repeat: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
    }, function () {
        TweenLite.to($box.eq(0), 0.1, { opacity: 1, repeat: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
        TweenLite.to($box.eq(1), 0.3, { scale: 1, opacity: 1, repeat: 0, delay: 0, overwrite: "all", ease: Circ.easeInOut });
    }
);

$(document).mouseleave(function () {
    $box.each(function (index, val) {
        TweenMax.set(
            $(this), {
                scale: 0,
                delay: 0
            });
    });
});
$(document).mouseenter(function () {
    $box.each(function (index, val) {
        TweenMax.set(
            $(this), {
                scale: 1,
                delay: 0
            });
    });
});


if ($(window).width() > 992) {
    $(".pelement").each(function (index) {
        $(this).hover(
            function () {
                $(this).addClass('hovered');
            }, function () {
                $(this).removeClass('hovered');

                $(this).css({
                    transform: 'translate3d(0px, 0px, 0px)'
                });
            }
        );

        $(this).mousemove(function (e) {
            var power = $(this).data('power');

            const bounds = this.getBoundingClientRect();
            const centerX = bounds.left + (bounds.width / 2);
            const centerY = bounds.top + (bounds.height / 2);

            const deltaX = Math.floor((centerX - e.clientX)) * power * -1;
            const deltaY = Math.floor((centerY - e.clientY)) * power * -1;

            TweenLite.to($(this), 0, {
                x: deltaX,
                y: deltaY,
            });
        });
    });
}
function showPoint(e) {
    busy = true;

    if ($(e.target).hasClass('fixpoint')) {
        $box.eq(1).addClass('fixit');
        var fixtarget = $(e.target).find('.fixtarget');
    } else if ($(e.target).closest('.fixpoint').length) {
        $box.eq(1).addClass('fixit');
        // caselist
        if ($(e.target).closest('.fixpoint').hasClass('info')) {
            var fixtarget = $(e.target).closest('.info').find('.fixtarget');
        } else {
            var fixtarget = $(e.target);
        }
    }

    if ($(e.target).hasClass('fixpoint') || $(e.target).closest('.fixpoint').length) {
        var subadd = 10;
        twidth = $(fixtarget).width() + subadd,
            theight = $(fixtarget).height() + subadd,
            pos = $(fixtarget).offset(),
            posTop = pos.top + subadd,
            posLeft = pos.left + subadd;

        TweenLite.to($box.eq(1), 0.5, { scale: 1, width: twidth, height: theight, left: posLeft, top: posTop, opacity: 1, overwrite: "all", ease: Circ.easeOut });
    }
}
function hidePoint(e) {
    $box.eq(1).removeClass('fixit');

    busy = false;
    TweenLite.to($box.eq(1), 0.3, { scale: 1, width: showPointBase[0], height: showPointBase[1], marginTop: -showPointBase[1] / 2, marginLeft: -showPointBase[0] / 2, opacity: 1, overwrite: "all", ease: Circ.easeOut });
}
function animateText(el, reverse) {
    if (!reverse) {
        $slidetext = $(el).textillate({
            in: {
                effect: 'fadeInRight',
                delay: 20,
            },
            out: {
                effect: 'fadeOut',
                delay: 0,
            }
        });
    } else {
        $slidetext = $(el).textillate({
            in: {
                effect: 'fadeInLeft',
                delay: 20,
                reverse: true,
            },
            out: {
                effect: 'fadeOut',
                delay: 0,
            }
        });
    }
}

$.fn.parallax = function (resistance, mouse) {
    $el = $(this);

    TweenLite.to($el, 1, {
        x: ((mouse.clientX - window.innerWidth / 2) / resistance),
        y: ((mouse.clientY - window.innerHeight / 2) / resistance),
        //force3d: true,
    });
};
function activateParallax() {
    $(document).mousemove(function (e) {
        $(".landingPage__title").parallax(30, e);
    });
}

function nextSlide(active,next){
    $(active).css('position','absolute')
    $(active).css('left','-3000px')
    setTimeout(() => {
        $(active).css('display','none')
    }, 1000);
}

$('.control .next').on( 'click', function() {
    nextSlide('.landingPage')
})



animateText('.landingPage__title h1', false);
setTimeout(() => {
    $(".landingPage__title h3").css("display","block")
    animateText('.landingPage__title h3', false);
}, 800);
setTimeout(() => {
    $(".landingPage__title .btnmore").css("display","inline-block")

},1500)


activateParallax()

