/*!
 * jquery.higher.js v0.5
 * Auther @maechabin
 * Licensed under mit license
 */


;(function ($, window, document, undefined) {

    var Plugin = function (element) {

        this.element = element;
        this.$element = $(element);
        this.timer = null;

    };


    Plugin.prototype.equalBoxHeight = function (num1, num2) {

        var elm = this.$element.children();

        elm.each(function (i) {

            var height;
            var $this = $(this);

            if (i === num1) {

                height = $this.height();

                for (var n = num1 + 1; n <= num1 + num2 - 1; n++) {

                    if (height < elm.eq(n).height()) {

                        height = elm.eq(n).height();

                    }

                }

                for (var n = num1; n <= num1 + num2 - 1; n++) {

                    elm.eq(n).css("height", height + "px");

                }

           }

        });

    };


    Plugin.prototype.getHeight = function () {

        var elm = this.$element.children();

        var start_num;
        var line_flag = 0;
        var l = elm.length;

        for (var i = 0; i < l; i++) {

            var box1 = elm.eq(i);
            var top1 = box1.offset().top;

            if (i < l - 1) {

                var box2 = elm.eq(i + 1);
                var top2 = box2.offset().top;

            }

            if (line_flag === 0) {

                var box_array = [];
                start_num = i;

            }

            if (top1 == top2) {

                box_array.push(box1)
                line_flag = 1;

            } else {

                box_array.push(box1);
                this.equalBoxHeight(start_num, box_array.length);

                if (box2) {
                    box2.css("clear", "both");
                }

                start_num = "";
                line_flag = 0;

            }

        }

        this.equalBoxHeight(start_num, box_array.length);

    };


    Plugin.prototype.getResize = function () {

        var _this = this;

        $(window).on("resize", function () {

            _this.checkTimer();

        });

    };


    Plugin.prototype.checkTimer = function () {

        var _this = this;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {

            var elm = _this.$element.children();

            elm.each(function () {

                $(this).css({
                    "clear": "none",
                    "height": "auto"
                });

            });

            _this.getHeight();

        }, 200);

    };


    Plugin.prototype.init = function () {

        this.getHeight();
        this.getResize();

        return this;

    };


    $.fn.higher = function () {

        return this.each(function () {

            new Plugin(this).init();

        });

    };

})(jQuery, window, document);