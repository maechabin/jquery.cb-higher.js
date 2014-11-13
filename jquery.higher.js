/*!
 * jquery.higher.js v0.7.0
 * Auther @maechabin
 * Licensed under mit license
 */

;(function ($, window, document, undefined) {

    var Plugin = function (element, options) {

        this.element = element;
        this.$element = $(element);
        this.config;
        this.defaults = {            
            attributes: [element]
        };
        this.options = options;
        this.timer = null;

    };


    Plugin.prototype.equalBoxHeight = function (num1, num2) {

        var elm = this.config.attributes;

        for (var i = 0, l = elm.length; i < l; i++) {

            var e = (this.options) ? $(elm[i]) : $(elm[i]).children();

            e.each(function (j) {

                var height;
                var $this = $(this);

                if (j === num1) {

                    height = $this.height();

                    for (var n = num1 + 1; n <= num1 + num2 - 1; n++) {

                        if (height < e.eq(n).height()) {

                            height = e.eq(n).height();

                        }

                    }

                    for (var n = num1; n <= num1 + num2 - 1; n++) {

                        e.eq(n).css({
                            "height": height + "px"
                        });

                    }

                }

            });

        }

    };


    Plugin.prototype.countNumRaws = function () {

        var start_num;
        var line_flag = 0;
        var box_array;
        var e = this.$element.children();
        var len = e.length;

        for (var i = 0; i < len; i++) {

            var box1 = e.eq(i);
            var top1 = box1.offset().top;

            if (i < len - 1) {

                var box2 = e.eq(i + 1);
                var top2 = box2.offset().top;

            }

            if (line_flag === 0) {

                box_array = [];
                start_num = i;

            }

            if (top1 == top2) {

                box_array.push(box1)
                line_flag = 1;

            } else {

                box_array.push(box1);
                this.equalBoxHeight(start_num, box_array.length);

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
            
            var elm = _this.config.attributes;
        
            for (var i = 0, l = elm.length; i < l; i++) {
        
                var e = (_this.options) ? $(elm[i]) : $(elm[i]).children();

                e.each(function () {
                
                    var $this = $(this);

                    $this.css({
                        "height": "auto"
                    });

                });

                _this.countNumRaws();

            }

        }, 200);

    };


    Plugin.prototype.init = function () {
        
        this.config = $.extend({}, this.defaults, this.options);

        this.countNumRaws();
        this.getResize();

        //console.log(this.config.attributes);

        return this;

    };


    $.fn.higher = function (options) {

        return this.each(function () {

            new Plugin(this, options).init();

        });

    };

} (jQuery, window, document));