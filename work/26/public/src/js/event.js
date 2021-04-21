$(window).on({
    load: function () {
        // 흩날리는 벚꽃
        var petalFallingEvent = {
            particlesWrap: $(".falling_petal"),
            setrandomandomSpanTag: function (element) {
                for (var i = 0; i < 32; i++) {
                    var _imageClass = parseInt(random(1, 9));
                    element.append(`<span class="ps${_imageClass}"></span>`);
                }
            },
            fallingMotion: function (element) {
                this.setrandomandomSpanTag(this.particlesWrap);

                if (element.children("span").length !== 0) {
                    var _particles = element.find("span");
                    var _petal1 = element.find(".ps1, .ps2, .ps7");
                    var _petal2 = element.find(".ps3, .ps4, .ps5");
                    var _petal3 = element.find(".ps6, .ps8");

                    _particles.each(function (i) {
                        var _tl = gsap.timeline({repeat: -1});
                        
                        gsap.set($(this), {left: parseInt(random(1, 99)) + "%", y: -300});

                        _tl.to($(this), {y: 1542, opacity: 1, duration: random(6, 12).toFixed(2), delay: random(-2, 10).toFixed(2), ease: "none"})
                        .to($(this), {y: 3084, duration: random(6, 12).toFixed(2), opacity: 0, ease: "none"});
                    });

                    _petal1.each(function () {
                        gsap.set($(this), {scale: random(0.35, 0.65).toFixed(2), opacity: random(0.35, 1).toFixed(2)});
                        gsap.to($(this), {x:"+=240", duration: random(2.5, 4.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                        gsap.to($(this), {rotationX: parseInt(random(-15, 90)), rotationY: parseInt(random(180, -45)), duration: random(2.5, 4.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                    });

                    _petal2.each(function () {
                        gsap.set($(this), {scale: random(0.25, 0.6).toFixed(2), opacity: random(0.35, 1).toFixed(2)});
                        gsap.to($(this), {x:"-=560", duration: random(3.5, 7.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                        gsap.to($(this), {rotation: parseInt(random(45, 90)), rotationX: parseInt(random(45, 135)), duration: random(3.5, 7.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                    });

                    _petal3.each(function () {
                        gsap.set($(this), {scale: random(0.1, 0.25).toFixed(2), opacity: random(0.25, 0.6).toFixed(2)}); 
                        gsap.to($(this), {x:"+=720", duration: random(4.5, 8.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                        gsap.to($(this), {rotationX: parseInt(random(-120, 540)), rotationY: parseInt(random(15, 45)), duration: random(4.5, 8.5).toFixed(2), yoyo: true, repeat:-1, ease: "sine.inOut"});
                    });
                }
            }
        }
        
        petalFallingEvent.fallingMotion(petalFallingEvent.particlesWrap);
        
        // title motion
        (function mainTitleMotion () {
            gsap.set(".char1", {x: -200, opacity: 0});
            gsap.set(".char2", {x: -50, opacity: 0});
            gsap.set(".spring", {rotationX: 75, rotation: 15, scale: 0.5, opacity: 0});
            gsap.set(".title_wrap p", {x: -80, width: 0, opacity: 0});
            gsap.set(".red, .date", {x: 120, opacity: 0});
            gsap.set(".diamond", {x: -120, opacity: 0});
            
            var _tl = gsap.timeline();
            _tl.to(".char1", {x: 160, opacity: 0.5, duration: 0.95, ease: "cric.out"})
            .to(".char1", {opacity:0, scale: 1.1, duration: 1, ease: "cric.out"}, "-=0.85")
            .to(".char2", {x: 0, opacity: 1, duration: 0.9, delay: 0.1, ease: "cric.out"}, "-=0.85")
            .to(".spring", {rotationX: 0, rotation: 0, scale: 1, opacity: 1, duration: 1.65, ease: "expo.out"}, "-=0.6")
            .to(".title_wrap p", {x: 0, width: 922, opacity: 1, duration: 0.85, ease: "expo.out"}, "-=1.5")
            .to(".red, .diamond", {x: 0, opacity: 1, duration: 0.75, ease: "expo.out"}, "-=1.5")
            .to(".date", {x: 0, opacity: 1, duration: 0.75, ease: "expo.out"}, "-=1.5")
            .to(".r", {rotation: 0, duration: 0.5, ease: "bounce.out"}, "-=0.85");
        }());

        // button click motion
        (function buttonClickEvent() {
            $(".btn_wrap button").on("mousedown", function () {
                $(this).find(">span").css({
                    "margin-top": "3px" 
                });
            }).on("mouseup", function () {
                $(this).find(">span").css({
                    "margin-top": 0 
                });
            })
        }());

        // top button
        $(".quick .btn_top").on("click", function () {
            var _speed = 0.45;
            var _ease = "sine.out";

            gsap.to("html, body", {duration: _speed, scrollTo: {y: 0}, ease: _ease});
        });

        // layer pop
        $(".wrap .btn_reward").on("click", function () {
            $(".pop_wrap").show();
            $(".pop_wrap .table_wrap").mCustomScrollbar();
        });
        $(".pop_wrap .btn_close, .pop_wrap .dimmed").on("click", function () {
            $(".pop_wrap").hide();
        });
    },
    scroll: function () {
        var windowScrollTop = getWindowScrollTop();

        // petal scroll move
        $(".sticky_petal span").each(function (i) {
            var _petalPositionY = 0;
            var _duration = 1.25;
            var _ease = "sine.out";

            if (i % 2 === 0) {
                _petalPositionY -= (windowScrollTop / 8).toFixed(0);
                gsap.to($(this), {duration: _duration, y: _petalPositionY, ease: _ease});
            } else {
                _petalPositionY += (windowScrollTop / 12).toFixed(0);
                gsap.to($(this), {duration: _duration, y: _petalPositionY, ease: _ease});
            }
        });

        // cherry scroll move
        $(".bg_cherry").each(function (i) {
            var _cherryPositionY = 0;
            var _duration = 1.5;
            var _ease = "sine.out";

            _cherryPositionY -= (windowScrollTop / 28).toFixed(0);
            gsap.to($(this), {duration: _duration, y: _cherryPositionY, ease: _ease});
        });
    }
});

function getWindowScrollTop () {
    var _windowScrollTop = $(window).scrollTop();
    return _windowScrollTop;
}

// particle random num
function random(min, max) {
    return min + Math.random() * (max - min);
}