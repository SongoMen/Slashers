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
        $(".jd").parallax(50, e);
    });
}
animateText('.jd', false);
activateParallax()

