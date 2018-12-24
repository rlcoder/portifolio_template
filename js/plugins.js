/*! https://github.com/ai/visibilityjs */
!function(e){"use strict";var i=-1,t={onVisible:function(e){var i=t.isSupported();if(!i||!t.hidden())return e(),i;var n=t.change(function(){t.hidden()||(t.unbind(n),e())});return n},change:function(e){if(!t.isSupported())return!1;i+=1;var n=i;return t._callbacks[n]=e,t._listen(),n},unbind:function(e){delete t._callbacks[e]},afterPrerendering:function(e){var i=t.isSupported(),n="prerender";if(!i||n!=t.state())return e(),i;var r=t.change(function(i,d){n!=d&&(t.unbind(r),e())});return r},hidden:function(){return!(!t._doc.hidden&&!t._doc.webkitHidden)},state:function(){return t._doc.visibilityState||t._doc.webkitVisibilityState||"visible"},isSupported:function(){return!(!t._doc.visibilityState&&!t._doc.webkitVisibilityState)},_doc:document||{},_callbacks:{},_change:function(e){var i=t.state();for(var n in t._callbacks)t._callbacks[n].call(t._doc,e,i)},_listen:function(){if(!t._init){var e="visibilitychange";t._doc.webkitVisibilityState&&(e="webkit"+e);var i=function(){t._change.apply(t,arguments)};t._doc.addEventListener?t._doc.addEventListener(e,i):t._doc.attachEvent(e,i),t._init=!0}}};"undefined"!=typeof module&&module.exports?module.exports=t:e.Visibility=t}(this),function(e){"use strict";var i=-1,t=function(t){return t.every=function(e,n,r){t._time(),r||(r=n,n=null),i+=1;var d=i;return t._timers[d]={visible:e,hidden:n,callback:r},t._run(d,!1),t.isSupported()&&t._listen(),d},t.stop=function(e){return t._timers[e]?(t._stop(e),delete t._timers[e],!0):!1},t._timers={},t._time=function(){t._timed||(t._timed=!0,t._wasHidden=t.hidden(),t.change(function(){t._stopRun(),t._wasHidden=t.hidden()}))},t._run=function(i,n){var r,d=t._timers[i];if(t.hidden()){if(null===d.hidden)return;r=d.hidden}else r=d.visible;var a=function(){d.last=new Date,d.callback.call(e)};if(n){var o=new Date,u=o-d.last;r>u?d.delay=setTimeout(function(){a(),d.id=setInterval(a,r)},r-u):(a(),d.id=setInterval(a,r))}else d.id=setInterval(a,r)},t._stop=function(e){var i=t._timers[e];clearInterval(i.id),clearTimeout(i.delay),delete i.id,delete i.delay},t._stopRun=function(){var e=t.hidden(),i=t._wasHidden;if(e&&!i||!e&&i)for(var n in t._timers)t._stop(n),t._run(n,!e)},t};"undefined"!=typeof module&&module.exports?module.exports=t(require("./visibility.core")):t(e.Visibility)}(window);


/*Scrollspy Menu - Rolagem de pagina suave*/
//Creditos: https://jsfiddle.net/mekwall/up4nu/
// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active-menu-top")
            .end().filter("[href='#" + id + "']").parent().addClass("active-menu-top");
    }
});
  
/*Origamid - menu responsivo*/
(function( $, window ) {
$.fn.origamidMenu = function( options ) {
	
	// Opções	
	var settings = $.extend({
			breakpoint: 768,
			top: 50,
			color: '#ffffff',
			background: 'black'
	}, options );
	
	var mobileWidth = settings.breakpoint,
			color = settings.color,
			background = settings.background,
			hambugerActive = false,
			hamburger = '<a id="origamid-icon"></a>',
			menu = $(this);
	
	var styles = '<style>\
					#origamid-menu { background-color: ' + background + '; top: ' + settings.top + 'px; }\
					#origamid-menu li { border-color: ' + color + '; }\
					#origamid-menu li:last-of-type { border-color: ' + color + '; }\
					#origamid-menu li a:hover { color: ' + background + '; background: ' + color + '; }\
					#origamid-icon::before { background:' + color + '; }\
					#origamid-icon::after { box-shadow: 0 4px 0 0 ' + color + ', 0 -4px 0 0 ' + color + '; }\
					#origamid-icon.active::before, #origamid-icon.active::after { background:' + color + '; }\
				</style>';

	var menuFunction = function() {
		var width = $(window).width();
		if (width < mobileWidth) {
			menu.attr('id', 'origamid-menu');
			if(!hambugerActive) {
				hambugerActive = true;
				menu.before(hamburger);
				$('#origamid-menu').append(styles);
			} else {
				return false;
			}

		} else if (width > mobileWidth) {
			hambugerActive = false;
			$('#origamid-icon').remove();
			$('#origamid-menu style').remove();
			menu.attr('id', '');
		}

		$('#origamid-icon').on('click touchstart', function(e) {
			e.preventDefault();
			$('#origamid-icon').toggleClass('active');
			menu.toggleClass('active');
		});
	}
	
	menuFunction();
	$(window).resize(menuFunction);
};
}( jQuery, window ));



/*z Scroll top */
//Thanks to: http://www.webtipblog.com/adding-scroll-top-button-website/

$(document).ready(function () {

    $(function () {

        $(document).on('scroll', function () {

            if ($(window).scrollTop() > 100) {
                $('.scroll-top-wrapper').addClass('show');
            } else {
                $('.scroll-top-wrapper').removeClass('show');
            }
        });

        $('.scroll-top-wrapper').on('click', scrollToTop);
    });


    function scrollToTop() {
        verticalOffset = typeof (verticalOffset) != 'undefined' ? verticalOffset : 0;
        element = $('body');
        offset = element.offset();
        offsetTop = offset.top;
        $('html, body').animate({
            scrollTop: offsetTop
        }, 500, 'linear');
    }

});



jQuery(function () {
	"use strict";
    
    /*global jQuery $*/ 
	//Slider 
	$(document).ready(function(){
		
		jQuery('.skillbar').each(function() {
			jQuery(this).appear(function() {
				jQuery(this).find('.count-bar').animate({
					width:jQuery(this).attr('data-percent')
				},3000);
				var percent = jQuery(this).attr('data-percent');
				jQuery(this).find('.count').html('<span>' + percent + '</span>');
			});
		});	
	});
	
}());




/*
 * QueryLoader2 - A simple script to create a preloader for images
 *
 * For instructions read the original post:
 * http://www.gayadesign.com/diy/queryloader2-preload-your-images-with-ease/
 *
 * Copyright (c) 2011 - Gaya Kessler
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Version: 3.0.6
 * Last update: 2014-09-25
 */
! function t(e, i, s) {
    function n(o, a) {
        if (!i[o]) {
            if (!e[o]) {
                var l = "function" == typeof require && require;
                if (!a && l) return l(o, !0);
                if (r) return r(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var h = i[o] = {
                exports: {}
            };
            e[o][0].call(h.exports, function(t) {
                var i = e[o][1][t];
                return n(i ? i : t)
            }, h, h.exports, t, e, i, s)
        }
        return i[o].exports
    }
    for (var r = "function" == typeof require && require, o = 0; o < s.length; o++) n(s[o]);
    return n
}({
    1: [function(t, e) {
        function i(t) {
            "use strict";
            this.src = t, this.element = null, "undefined" != typeof t && this.create()
        }
        var s = t("./ImageLoaded.js");
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("img"), this.element.setAttribute("src", this.src)
        }, i.prototype.preload = function(t) {
            "use strict";
            s(this.element, function(e, i) {
                t(e, i)
            })
        }, e.exports = i
    }, {
        "./ImageLoaded.js": 2
    }],
    2: [function(t, e) {
        function i(t, e) {
            "use strict";

            function i(t, e, i, s) {
                t.addEventListener ? t[i ? "addEventListener" : "removeEventListener"](e, s) : t[i ? "attachEvent" : "detachEvent"]("on" + e, s)
            }

            function n() {
                i(t, "load", !1, n), i(t, "error", !1, n), e(null, !1)
            }
            var r;
            return t.nodeName ? "img" !== t.nodeName.toLowerCase() ? e(new Error("Element supplied is not an image")) : t.src && t.complete && void 0 !== t.naturalWidth ? e(null, !0) : (i(t, "load", !0, n), i(t, "error", !0, n), void((t.readyState || t.complete) && (r = t.src, t.src = s, t.src = r))) : e(new Error("First argument must be an image element"))
        }
        var s = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        e.exports = i
    }, {}],
    3: [function(t, e) {
        function i(t) {
            "use strict";
            this.parent = t, this.sources = [], this.images = [], this.loaded = 0, this.deepSearch = !0
        }
        var s = t("./Image.js");
        i.prototype.getImageSrcs = function(t) {
            "use strict";
            if (this.sources = [], "undefined" != typeof t && (this.findImageInElement(t), this.deepSearch === !0))
                for (var e = t.querySelectorAll("*"), i = 0; i < e.length; i++) "SCRIPT" !== e[i].tagName && this.findImageInElement(e[i]);
            return this.sources
        }, i.prototype.findAndPreload = function(t) {
            "use strict";
            if ("undefined" != typeof t) {
                this.sources = this.getImageSrcs(t);
                for (var e = 0; e < this.sources.length; e++) {
                    var i = new s(this.sources[e]);
                    i.preload(this.imageLoaded.bind(this)), this.images.push(i)
                }
            }
        }, i.prototype.imageLoaded = function() {
            "use strict";
            this.loaded++, this.updateProgress()
        }, i.prototype.updateProgress = function() {
            "use strict";
            this.parent.updateProgress(this.loaded, this.sources.length)
        }, i.prototype.findImageInElement = function(t) {
            "use strict";
            var e = this.determineUrlAndType(t);
            if (!this.hasGradient(e.url)) {
                e.url = this.stripUrl(e.url);
                for (var i = e.url.split(", "), s = 0; s < i.length; s++)
                    if (this.validUrl(i[s]) && this.urlIsNew(i[s])) {
                        var n = "";
                        (this.isIE() || this.isOpera()) && (n = "?rand=" + Math.random()), this.sources.push(i[s] + n)
                    }
            }
        }, i.prototype.determineUrlAndType = function(t) {
            "use strict";
            var e = "",
                i = "normal",
                s = t.currentStyle || window.getComputedStyle(t, null);
            return "" !== s.backgroundImage && "none" !== s.backgroundImage || "" !== t.style.backgroundImage && "none" !== t.style.backgroundImage ? (e = s.backgroundImage || t.style.backgroundImage, i = "background") : "undefined" != typeof t.getAttribute("src") && "img" === t.nodeName.toLowerCase() && (e = t.getAttribute("src")), {
                url: e,
                type: i
            }
        }, i.prototype.hasGradient = function(t) {
            "use strict";
            return -1 !== t.indexOf("gradient(")
        }, i.prototype.stripUrl = function(t) {
            "use strict";
            return t = t.replace(/url\(\"/g, ""), t = t.replace(/url\(/g, ""), t = t.replace(/\"\)/g, ""), t = t.replace(/\)/g, "")
        }, i.prototype.validUrl = function(t) {
            "use strict";
            return t.length > 0 && !t.match(/^(data:)/i) ? !0 : !1
        }, i.prototype.urlIsNew = function(t) {
            "use strict";
            return -1 === this.sources.indexOf(t)
        }, i.prototype.isIE = function() {
            "use strict";
            return navigator.userAgent.match(/msie/i)
        }, i.prototype.isOpera = function() {
            "use strict";
            return navigator.userAgent.match(/Opera/i)
        }, e.exports = i
    }, {
        "./Image.js": 1
    }],
    4: [function(t, e) {
        function i() {
            "use strict";
            this.element = null, this.className = "queryloader__overlay__bar", this.barHeight = 1, this.barColor = "#fff"
        }
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("div"), this.element.setAttribute("class", this.className), this.setStyling(), this.updateProgress(0, 0)
        }, i.prototype.setStyling = function() {
            "use strict";
            this.element.style.height = this.barHeight + "px", this.element.style.marginTop = "-" + this.barHeight / 2 + "px", this.element.style.backgroundColor = this.barColor, this.element.style.position = "absolute", this.element.style.top = "50%", this.setTransitionTime(100)
        }, i.prototype.updateProgress = function(t, e) {
            "use strict";
            parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100), 0 !== e && this.setTransitionTime(e), this.element.style.width = parseInt(t) + "%"
        }, i.prototype.setTransitionTime = function(t) {
            "use strict";
            this.element.style.WebkitTransition = "width " + t + "ms", this.element.style.MozTransition = "width " + t + "ms", this.element.style.OTransition = "width " + t + "ms", this.element.style.MsTransition = "width " + t + "ms", this.element.style.Transition = "width " + t + "ms"
        }, e.exports = i
    }, {}],
    5: [function(t, e) {
        function i() {
            "use strict";
            this.element = null, this.idName = "qlPercentage", this.className = "queryloader__overlay__percentage", this.barHeight = 1, this.barColor = "#fff"
        }
        i.prototype.create = function() {
            "use strict";
            this.element = document.createElement("div"), this.element.setAttribute("class", this.className), this.element.setAttribute("id", this.idName), this.applyStyling(), this.updateProgress(0, 0)
        }, i.prototype.applyStyling = function() {
            "use strict";
            this.element.style.height = "40px", this.element.style.width = "100%", this.element.style.position = "absolute", this.element.style.fontSize = "3em", this.element.style.top = "50%", this.element.style.left = "0", this.element.style.marginTop = "-" + (59 + this.barHeight) + "px", this.element.style.textAlign = "center", this.element.style.color = this.barColor
        }, i.prototype.updateProgress = function(t) {
            "use strict";
            parseInt(t) < 0 ? t = 0 : parseInt(t) > 100 && (t = 100), this.element.innerHTML = parseInt(t) + "%"
        }, e.exports = i
    }, {}],
    6: [function(t, e) {
        function i(t) {
            "use strict";
            this.parentElement = t, this.idName = "qLoverlay", this.percentageId = "qlPercentage", this.className = "queryloader__overlay", this.element = null, this.loadingBar = null, this.percentage = null, this.barColor = "#ff0000", this.backgroundColor = "#000", this.barHeight = 1, this.fadeOutTime = 300, this.showPercentage = !1
        }
        var s = t("./LoadingBar.js"),
            n = t("./Percentage.js");
        i.prototype.init = function() {
            "use strict";
            this.create(), this.loadingBar = new s, this.loadingBar.barHeight = this.barHeight, this.loadingBar.barColor = this.barColor, this.loadingBar.create(), this.element.appendChild(this.loadingBar.element), this.showPercentage && (this.percentage = new n, this.percentage.barColor = this.barColor, this.percentage.idName = this.percentageId, this.percentage.create(), this.element.appendChild(this.percentage.element)), this.parentElement.appendChild(this.element)
        }, i.prototype.create = function() {
            "use strict";
            this.element = document.querySelector("#" + this.idName) || document.createElement("div"), this.element.setAttribute("class", this.className), this.element.setAttribute("id", this.idName), this.applyStyling()
        }, i.prototype.applyStyling = function() {
            "use strict";
            this.element.style.position = this.calculatePosition(), this.element.style.width = "100%", this.element.style.height = "100%", this.element.style.backgroundColor = this.backgroundColor, this.element.style.backgroundPosition = "center", this.element.style.zIndex = 666999, this.element.style.top = "0", this.element.style.left = "0", this.element.style.WebkitTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.MozTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.OTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.MsTransition = "opacity " + this.fadeOutTime + "ms", this.element.style.Transition = "opacity " + this.fadeOutTime + "ms"
        }, i.prototype.calculatePosition = function() {
            "use strict";
            var t = "absolute";
            return "body" === this.parentElement.tagName.toLowerCase() ? t = "fixed" : ("fixed" !== this.parentElement.style.position || "absolute" !== this.parentElement.style.position) && (this.parentElement.style.position = "relative"), t
        }, i.prototype.updateProgress = function(t, e) {
            "use strict";
            null !== this.loadingBar && this.loadingBar.updateProgress(t, e), null !== this.percentage && this.percentage.updateProgress(t, e)
        }, i.prototype.remove = function() {
            "use strict";
            this.element.parentNode.removeChild(this.element)
        }, e.exports = i
    }, {
        "./LoadingBar.js": 4,
        "./Percentage.js": 5
    }],
    7: [function() {
        Function.prototype.bind || (Function.prototype.bind = function(t) {
            "use strict";
            if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            var e = Array.prototype.slice.call(arguments, 1),
                i = this,
                s = function() {},
                n = function() {
                    return i.apply(this instanceof s && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
                };
            return s.prototype = this.prototype, n.prototype = new s, n
        })
    }, {}],
    8: [function(t, e) {
        function i(t, e) {
            "use strict";
            this.element = t, this.options = e, this.done = !1, this.maxTimeout = null, this.defaultOptions = {
                onComplete: function() {},
                backgroundColor: "#000",
                barColor: "#fff",
                overlayId: "qLoverlay",
                percentageId: "qLpercentage",
                barHeight: 1,
                percentage: !1,
                deepSearch: !0,
                minimumTime: 300,
                maxTime: 1e4,
                fadeOutTime: 1e3
            }, this.overlay = null, this.preloader = null, null !== t && this.init()
        }
        var s = t("./ImagePreloader/"),
            n = t("./Overlay/");
        i.prototype.init = function() {
            "use strict";
            this.options = this.extend(this.defaultOptions, this.options), "undefined" != typeof this.element && (this.createOverlay(), this.createPreloader(), this.startMaxTimeout())
        }, i.prototype.extend = function(t, e) {
            "use strict";
            "undefined" == typeof t && (t = {});
            for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            return t
        }, i.prototype.startMaxTimeout = function() {
            "use strict";
            this.maxTimeout = window.setTimeout(this.doneLoading.bind(this), this.options.maxTime)
        }, i.prototype.createOverlay = function() {
            "use strict";
            this.overlay = new n(this.element), this.overlay.idName = this.options.overlayId, this.overlay.percentageId = this.options.percentageId, this.overlay.backgroundColor = this.options.backgroundColor, this.overlay.barHeight = this.options.barHeight, this.overlay.barColor = this.options.barColor, this.overlay.showPercentage = this.options.percentage, this.overlay.fadeOuttime = this.options.fadeOutTime, "undefined" != typeof this.element && this.overlay.init()
        }, i.prototype.createPreloader = function() {
            "use strict";
            this.preloader = new s(this), this.preloader.deepSearch = this.options.deepSearch, window.setTimeout(function() {
                this.preloader.findAndPreload(this.element)
            }.bind(this), 100)
        }, i.prototype.updateProgress = function(t, e) {
            "use strict";
            this.overlay.updateProgress(t / e * 100, this.options.minimumTime), t === e && this.done === !1 && (window.clearTimeout(this.maxTimeout), window.setTimeout(this.doneLoading.bind(this), this.options.minimumTime))
        }, i.prototype.doneLoading = function() {
            "use strict";
            window.clearTimeout(this.maxTimeout), this.done = !0, this.overlay.element.style.opacity = 0, window.setTimeout(this.destroy.bind(this), this.options.fadeOutTime)
        }, i.prototype.destroy = function() {
            "use strict";
            this.overlay.remove(), this.options.onComplete()
        }, e.exports = i
    }, {
        "./ImagePreloader/": 3,
        "./Overlay/": 6
    }],
    9: [function(t, e) {
        t("./Polyfills/");
        var i = t("./QueryLoader.js");
        (window.jQuery || window.Zepto) && ! function(t) {
            "use strict";
            t.fn.queryLoader2 = function(t) {
                return this.each(function() {
                    new i(this, t)
                })
            }
        }(window.jQuery || window.Zepto), "undefined" != typeof e && (e.exports = i), "function" == typeof define && define.amd && define([], function() {
            "use strict";
            return i
        }), window.QueryLoader2 = i
    }, {
        "./Polyfills/": 7,
        "./QueryLoader.js": 8
    }]
}, {}, [9]);





/**
 * jquery.typist
 * @author Alexander Burtsev, http://burtsev.me, 2014
 * @license MIT
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){"use strict";function b(b,c){a.extend(this,{speed:10,text:"",cursor:!0,blinkSpeed:2,typeFrom:"end",cursorStyles:{display:"inline-block",fontStyle:"normal",margin:"-2px 2px 0 2px"}},c||{}),this._element=a(b),this._element.data("typist",this),this.queue=[],this.timer=null,this.delay=1e3/this.speed,this.blinkTimer=null,this.blinkDelay=1e3/this.blinkSpeed,this.text&&(this.queue.push(this.text),this.type())}a.fn.typist=function(a){return this.each(function(){new b(this,a)})},a.fn.typistAdd=function(b){return this.each(function(){var c=a(this).data("typist");c.queue.push(b),c.type()})},a.fn.typistRemove=function(b){return b=parseInt(b)||0,this.each(function(){var c=a(this).data("typist");c.queue.push({remove:b}),c.type()})},a.fn.typistPause=function(b){return b=parseInt(b)||0,this.each(function(){var c=a(this).data("typist");c.queue.push({delay:b}),c.type()})},a.fn.typistStop=function(){return this.each(function(){var b=a(this).data("typist");b.queue.push({stop:!0}),b.type()})},b.prototype={addCursor:function(){this._cursor&&(clearInterval(this.blinkTimer),this._cursor.stop().remove()),this._cursor=a("<span>|</span>").css(this.cursorStyles).insertAfter(this._container),this.cursorVisible=!0,this.blinkTimer=setInterval(a.proxy(function(){this.cursorVisible=!this.cursorVisible,this._cursor.animate({opacity:this.cursorVisible?1:0},100)},this),this.blinkDelay)},fire:function(a){return this._element.trigger(a,this),this},nl2br:function(a){return a.replace("\n","<br/>")},remove:function(b){if(0>=b)return this.timer=null,this.fire("end_remove.typist").type();b--;var c=this._container.text();c=c.substr(0,c.length-1),c=this.nl2br(c),this.timer=setTimeout(a.proxy(function(){this._container.html(c),this.remove(b)},this),this.delay)},step:function(b){if(!b.length)return this.timer=null,this.fire("end_type.typist").type();var c=b.shift();c=a("<div>").text(c).html(),c=this.nl2br(c),this.timer=setTimeout(a.proxy(function(){this._container.html(this._container.html()+c),this.step(b)},this),this.delay)},stop:function(){clearInterval(this.blinkTimer),this.blinkTimer=null,this._cursor&&(this._cursor.remove(),this._cursor=null),clearTimeout(this.timer),this.timer=null},type:function(){if(!this.timer){this._container||(this._container=a("<span>"),"start"===this.typeFrom?this._element.prepend(this._container):this._element.append(this._container)),this.cursor&&this.addCursor();var b,c=this.queue.shift();if("string"==typeof c)b=c;else{if(c&&c.delay)return void(this.fire("start_pause.typist").timer=setTimeout(a.proxy(function(){this.timer=null,this.fire("end_pause.typist").type()},this),c.delay));if(c&&c.remove)return void this.fire("start_remove.typist").remove(c.remove);if(c&&c.stop)return void this.stop()}b&&(b=b.split(""),this.fire("start_type.typist").step(b))}}}});




/*
 * swiper 2.4.3
 * Mobile touch slider and framework with hardware accelerated transitions
 *
 * http://www.idangero.us/sliders/swiper/
 *
 * Copyright 2010-2014, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 *
 * Licensed under GPL & MIT
 *
 * Released on: January 29, 2014
*/
var Swiper=function(a,b){function c(a,b){return document.querySelectorAll?(b||document).querySelectorAll(a):jQuery(a,b)}function d(a){"use strict";return"[object Array]"===Object.prototype.toString.apply(a)?!0:!1}function e(){var a=F-I;return b.freeMode&&(a=F-I),b.slidesPerView>C.slides.length&&(a=0),0>a&&(a=0),a}function f(){function a(a){var c=new Image;c.onload=function(){C.imagesLoaded++,C.imagesLoaded==C.imagesToLoad.length&&(C.reInit(),b.onImagesReady&&C.fireCallback(b.onImagesReady,C))},c.src=a}var d=C.h.addEventListener,e="wrapper"==b.eventTarget?C.wrapper:C.container;if(C.browser.ie10||C.browser.ie11?(d(e,C.touchEvents.touchStart,p),d(document,C.touchEvents.touchMove,q),d(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(d(e,"touchstart",p),d(e,"touchmove",q),d(e,"touchend",r)),b.simulateTouch&&(d(e,"mousedown",p),d(document,"mousemove",q),d(document,"mouseup",r))),b.autoResize&&d(window,"resize",C.resizeFix),g(),C._wheelEvent=!1,b.mousewheelControl){void 0!==document.onmousewheel&&(C._wheelEvent="mousewheel");try{WheelEvent("wheel"),C._wheelEvent="wheel"}catch(f){}C._wheelEvent||(C._wheelEvent="DOMMouseScroll"),C._wheelEvent&&d(C.container,C._wheelEvent,j)}if(b.keyboardControl&&d(document,"keydown",i),b.updateOnImagesReady){C.imagesToLoad=c("img",C.container);for(var h=0;h<C.imagesToLoad.length;h++)a(C.imagesToLoad[h].getAttribute("src"))}}function g(){var a,d=C.h.addEventListener;if(b.preventLinks){var e=c("a",C.container);for(a=0;a<e.length;a++)d(e[a],"click",n)}if(b.releaseFormElements){var f=c("input, textarea, select",C.container);for(a=0;a<f.length;a++)d(f[a],C.touchEvents.touchStart,o,!0)}if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l)}function h(){var a,d=C.h.removeEventListener;if(b.onSlideClick)for(a=0;a<C.slides.length;a++)d(C.slides[a],"click",k);if(b.onSlideTouch)for(a=0;a<C.slides.length;a++)d(C.slides[a],C.touchEvents.touchStart,l);if(b.releaseFormElements){var e=c("input, textarea, select",C.container);for(a=0;a<e.length;a++)d(e[a],C.touchEvents.touchStart,o,!0)}if(b.preventLinks){var f=c("a",C.container);for(a=0;a<f.length;a++)d(f[a],"click",n)}}function i(a){var b=a.keyCode||a.charCode;if(37==b||39==b||38==b||40==b){for(var c=!1,d=C.h.getOffset(C.container),e=C.h.windowScroll().left,f=C.h.windowScroll().top,g=C.h.windowWidth(),h=C.h.windowHeight(),i=[[d.left,d.top],[d.left+C.width,d.top],[d.left,d.top+C.height],[d.left+C.width,d.top+C.height]],j=0;j<i.length;j++){var k=i[j];k[0]>=e&&k[0]<=e+g&&k[1]>=f&&k[1]<=f+h&&(c=!0)}if(!c)return}M?((37==b||39==b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),39==b&&C.swipeNext(),37==b&&C.swipePrev()):((38==b||40==b)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),40==b&&C.swipeNext(),38==b&&C.swipePrev())}function j(a){var c=C._wheelEvent,d=0;if(a.detail)d=-a.detail;else if("mousewheel"==c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.wheelDeltaX)>Math.abs(a.wheelDeltaY)))return;d=a.wheelDeltaX}else{if(!(Math.abs(a.wheelDeltaY)>Math.abs(a.wheelDeltaX)))return;d=a.wheelDeltaY}else d=a.wheelDelta;else if("DOMMouseScroll"==c)d=-a.detail;else if("wheel"==c)if(b.mousewheelControlForceToAxis)if(M){if(!(Math.abs(a.deltaX)>Math.abs(a.deltaY)))return;d=-a.deltaX}else{if(!(Math.abs(a.deltaY)>Math.abs(a.deltaX)))return;d=-a.deltaY}else d=Math.abs(a.deltaX)>Math.abs(a.deltaY)?-a.deltaX:-a.deltaY;if(b.freeMode){var f=C.getWrapperTranslate()+d;if(f>0&&(f=0),f<-e()&&(f=-e()),C.setWrapperTransition(0),C.setWrapperTranslate(f),C.updateActiveSlide(f),0==f||f==-e())return}else(new Date).getTime()-U>60&&(0>d?C.swipeNext():C.swipePrev()),U=(new Date).getTime();return b.autoplay&&C.stopAutoplay(!0),a.preventDefault?a.preventDefault():a.returnValue=!1,!1}function k(a){C.allowSlideClick&&(m(a),C.fireCallback(b.onSlideClick,C,a))}function l(a){m(a),C.fireCallback(b.onSlideTouch,C,a)}function m(a){if(a.currentTarget)C.clickedSlide=a.currentTarget;else{var c=a.srcElement;do if(c.className.indexOf(b.slideClass)>-1)break;while(c=c.parentNode);C.clickedSlide=c}C.clickedSlideIndex=C.slides.indexOf(C.clickedSlide),C.clickedSlideLoopIndex=C.clickedSlideIndex-(C.loopedSlides||0)}function n(a){return C.allowLinks?void 0:(a.preventDefault?a.preventDefault():a.returnValue=!1,b.preventLinksPropagation&&"stopPropagation"in a&&a.stopPropagation(),!1)}function o(a){return a.stopPropagation?a.stopPropagation():a.returnValue=!1,!1}function p(a){if(b.preventLinks&&(C.allowLinks=!0),C.isTouched||b.onlyExternal)return!1;if(b.noSwiping&&(a.target||a.srcElement)&&s(a.target||a.srcElement))return!1;if($=!1,thresholdFirstMove=!1,C.isTouched=!0,Z="touchstart"==a.type,!Z||1==a.targetTouches.length){C.callPlugins("onTouchStartBegin"),Z||C.isAndroid||(a.preventDefault?a.preventDefault():a.returnValue=!1);var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;C.touches.startX=C.touches.currentX=c,C.touches.startY=C.touches.currentY=d,C.touches.start=C.touches.current=M?c:d,C.setWrapperTransition(0),C.positions.start=C.positions.current=C.getWrapperTranslate(),C.setWrapperTranslate(C.positions.start),C.times.start=(new Date).getTime(),H=void 0,b.moveStartThreshold>0&&(W=!1),b.onTouchStart&&C.fireCallback(b.onTouchStart,C),C.callPlugins("onTouchStartEnd")}}function q(a){if(C.isTouched&&!b.onlyExternal&&(!Z||"mousemove"!=a.type)){var c=Z?a.targetTouches[0].pageX:a.pageX||a.clientX,d=Z?a.targetTouches[0].pageY:a.pageY||a.clientY;if("undefined"==typeof H&&M&&(H=!!(H||Math.abs(d-C.touches.startY)>Math.abs(c-C.touches.startX))),"undefined"!=typeof H||M||(H=!!(H||Math.abs(d-C.touches.startY)<Math.abs(c-C.touches.startX))),H)return void(C.isTouched=!1);if(a.assignedToSwiper)return void(C.isTouched=!1);if(a.assignedToSwiper=!0,b.preventLinks&&(C.allowLinks=!1),b.onSlideClick&&(C.allowSlideClick=!1),b.autoplay&&C.stopAutoplay(!0),!Z||1==a.touches.length){if(C.isMoved||(C.callPlugins("onTouchMoveStart"),b.loop&&(C.fixLoop(),C.positions.start=C.getWrapperTranslate()),b.onTouchMoveStart&&C.fireCallback(b.onTouchMoveStart,C)),C.isMoved=!0,a.preventDefault?a.preventDefault():a.returnValue=!1,C.touches.current=M?c:d,C.positions.current=(C.touches.current-C.touches.start)*b.touchRatio+C.positions.start,C.positions.current>0&&b.onResistanceBefore&&C.fireCallback(b.onResistanceBefore,C,C.positions.current),C.positions.current<-e()&&b.onResistanceAfter&&C.fireCallback(b.onResistanceAfter,C,Math.abs(C.positions.current+e())),b.resistance&&"100%"!=b.resistance){if(C.positions.current>0){var f=1-C.positions.current/I/2;C.positions.current=.5>f?I/2:C.positions.current*f}if(C.positions.current<-e()){var g=(C.touches.current-C.touches.start)*b.touchRatio+(e()+C.positions.start),f=(I+g)/I,h=C.positions.current-g*(1-f)/2,i=-e()-I/2;C.positions.current=i>h||0>=f?i:h}}if(b.resistance&&"100%"==b.resistance&&(C.positions.current>0&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=0),C.positions.current<-e()&&(!b.freeMode||b.freeModeFluid)&&(C.positions.current=-e())),!b.followFinger)return;if(b.moveStartThreshold)if(Math.abs(C.touches.current-C.touches.start)>b.moveStartThreshold||W){if(!W)return W=!0,void(C.touches.start=C.touches.current);C.setWrapperTranslate(C.positions.current)}else C.positions.current=C.positions.start;else C.setWrapperTranslate(C.positions.current);return(b.freeMode||b.watchActiveIndex)&&C.updateActiveSlide(C.positions.current),b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grabbing",C.container.style.cursor="-moz-grabbin",C.container.style.cursor="-webkit-grabbing"),X||(X=C.touches.current),Y||(Y=(new Date).getTime()),C.velocity=(C.touches.current-X)/((new Date).getTime()-Y)/2,Math.abs(C.touches.current-X)<2&&(C.velocity=0),X=C.touches.current,Y=(new Date).getTime(),C.callPlugins("onTouchMoveEnd"),b.onTouchMove&&C.fireCallback(b.onTouchMove,C),!1}}}function r(){if(H&&C.swipeReset(),!b.onlyExternal&&C.isTouched){C.isTouched=!1,b.grabCursor&&(C.container.style.cursor="move",C.container.style.cursor="grab",C.container.style.cursor="-moz-grab",C.container.style.cursor="-webkit-grab"),C.positions.current||0===C.positions.current||(C.positions.current=C.positions.start),b.followFinger&&C.setWrapperTranslate(C.positions.current),C.times.end=(new Date).getTime(),C.touches.diff=C.touches.current-C.touches.start,C.touches.abs=Math.abs(C.touches.diff),C.positions.diff=C.positions.current-C.positions.start,C.positions.abs=Math.abs(C.positions.diff);var a=C.positions.diff,c=C.positions.abs,d=C.times.end-C.times.start;5>c&&300>d&&0==C.allowLinks&&(b.freeMode||0==c||C.swipeReset(),b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)),setTimeout(function(){b.preventLinks&&(C.allowLinks=!0),b.onSlideClick&&(C.allowSlideClick=!0)},100);var f=e();if(!C.isMoved&&b.freeMode)return C.isMoved=!1,b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd");if(!C.isMoved||C.positions.current>0||C.positions.current<-f)return C.swipeReset(),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd");if(C.isMoved=!1,b.freeMode){if(b.freeModeFluid){var g,h=1e3*b.momentumRatio,i=C.velocity*h,j=C.positions.current+i,k=!1,l=20*Math.abs(C.velocity)*b.momentumBounceRatio;-f>j&&(b.momentumBounce&&C.support.transitions?(-l>j+f&&(j=-f-l),g=-f,k=!0,$=!0):j=-f),j>0&&(b.momentumBounce&&C.support.transitions?(j>l&&(j=l),g=0,k=!0,$=!0):j=0),0!=C.velocity&&(h=Math.abs((j-C.positions.current)/C.velocity)),C.setWrapperTranslate(j),C.setWrapperTransition(h),b.momentumBounce&&k&&C.wrapperTransitionEnd(function(){$&&(b.onMomentumBounce&&C.fireCallback(b.onMomentumBounce,C),C.callPlugins("onMomentumBounce"),C.setWrapperTranslate(g),C.setWrapperTransition(300))}),C.updateActiveSlide(j)}return(!b.freeModeFluid||d>=300)&&C.updateActiveSlide(C.positions.current),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),void C.callPlugins("onTouchEnd")}G=0>a?"toNext":"toPrev","toNext"==G&&300>=d&&(30>c||!b.shortSwipes?C.swipeReset():C.swipeNext(!0)),"toPrev"==G&&300>=d&&(30>c||!b.shortSwipes?C.swipeReset():C.swipePrev(!0));var m=0;if("auto"==b.slidesPerView){for(var n,o=Math.abs(C.getWrapperTranslate()),p=0,q=0;q<C.slides.length;q++)if(n=M?C.slides[q].getWidth(!0):C.slides[q].getHeight(!0),p+=n,p>o){m=n;break}m>I&&(m=I)}else m=E*b.slidesPerView;"toNext"==G&&d>300&&(c>=m*b.longSwipesRatio?C.swipeNext(!0):C.swipeReset()),"toPrev"==G&&d>300&&(c>=m*b.longSwipesRatio?C.swipePrev(!0):C.swipeReset()),b.onTouchEnd&&C.fireCallback(b.onTouchEnd,C),C.callPlugins("onTouchEnd")}}function s(a){var c=!1;do a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),a=a.parentElement;while(!c&&a.parentElement&&-1==a.className.indexOf(b.wrapperClass));return!c&&a.className.indexOf(b.wrapperClass)>-1&&a.className.indexOf(b.noSwipingClass)>-1&&(c=!0),c}function t(a,b){var c,d=document.createElement("div");return d.innerHTML=b,c=d.firstChild,c.className+=" "+a,c.outerHTML}function u(a,c,d){function e(){var c=+new Date,d=c-g;h+=i*d/(1e3/60),k="toNext"==j?h>a:a>h,k?(C.setWrapperTranslate(Math.round(h)),C._DOMAnimating=!0,window.setTimeout(function(){e()},1e3/60)):(b.onSlideChangeEnd&&C.fireCallback(b.onSlideChangeEnd,C),C.setWrapperTranslate(a),C._DOMAnimating=!1)}var f="to"==c&&d.speed>=0?d.speed:b.speed,g=+new Date;if(C.support.transitions||!b.DOMAnimation)C.setWrapperTranslate(a),C.setWrapperTransition(f);else{var h=C.getWrapperTranslate(),i=Math.ceil((a-h)/f*(1e3/60)),j=h>a?"toNext":"toPrev",k="toNext"==j?h>a:a>h;if(C._DOMAnimating)return;e()}C.updateActiveSlide(a),b.onSlideNext&&"next"==c&&C.fireCallback(b.onSlideNext,C,a),b.onSlidePrev&&"prev"==c&&C.fireCallback(b.onSlidePrev,C,a),b.onSlideReset&&"reset"==c&&C.fireCallback(b.onSlideReset,C,a),("next"==c||"prev"==c||"to"==c&&1==d.runCallbacks)&&v(c)}function v(a){if(C.callPlugins("onSlideChangeStart"),b.onSlideChangeStart)if(b.queueStartCallbacks&&C.support.transitions){if(C._queueStartCallbacks)return;C._queueStartCallbacks=!0,C.fireCallback(b.onSlideChangeStart,C,a),C.wrapperTransitionEnd(function(){C._queueStartCallbacks=!1})}else C.fireCallback(b.onSlideChangeStart,C,a);if(b.onSlideChangeEnd)if(C.support.transitions)if(b.queueEndCallbacks){if(C._queueEndCallbacks)return;C._queueEndCallbacks=!0,C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)})}else C.wrapperTransitionEnd(function(c){C.fireCallback(b.onSlideChangeEnd,c,a)});else b.DOMAnimation||setTimeout(function(){C.fireCallback(b.onSlideChangeEnd,C,a)},10)}function w(){for(var a=C.paginationButtons,b=0;b<a.length;b++)C.h.removeEventListener(a[b],"click",y)}function x(){for(var a=C.paginationButtons,b=0;b<a.length;b++)C.h.addEventListener(a[b],"click",y)}function y(a){for(var b,c=a.target||a.srcElement,d=C.paginationButtons,e=0;e<d.length;e++)c===d[e]&&(b=e);C.swipeTo(b)}function z(){_=setTimeout(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearTimeout(_),_=void 0):C.swipeTo(0)),C.wrapperTransitionEnd(function(){"undefined"!=typeof _&&z()})},b.autoplay)}function A(){C.calcSlides(),b.loader.slides.length>0&&0==C.slides.length&&C.loadSlides(),b.loop&&C.createLoop(),C.init(),f(),b.pagination&&C.createPagination(!0),b.loop||b.initialSlide>0?C.swipeTo(b.initialSlide,0,!1):C.updateActiveSlide(0),b.autoplay&&C.startAutoplay(),C.centerIndex=C.activeIndex,b.onSwiperCreated&&C.fireCallback(b.onSwiperCreated,C),C.callPlugins("onSwiperCreated")}if(document.body.__defineGetter__&&HTMLElement){var B=HTMLElement.prototype;B.__defineGetter__&&B.__defineGetter__("outerHTML",function(){return(new XMLSerializer).serializeToString(this)})}if(window.getComputedStyle||(window.getComputedStyle=function(a){return this.el=a,this.getPropertyValue=function(b){var c=/(\-([a-z]){1})/g;return"float"===b&&(b="styleFloat"),c.test(b)&&(b=b.replace(c,function(){return arguments[2].toUpperCase()})),a.currentStyle[b]?a.currentStyle[b]:null},this}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;d>c;c++)if(this[c]===a)return c;return-1}),(document.querySelectorAll||window.jQuery)&&"undefined"!=typeof a&&(a.nodeType||0!==c(a).length)){var C=this;C.touches={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,diff:0,abs:0},C.positions={start:0,abs:0,diff:0,current:0},C.times={start:0,end:0},C.id=(new Date).getTime(),C.container=a.nodeType?a:c(a)[0],C.isTouched=!1,C.isMoved=!1,C.activeIndex=0,C.centerIndex=0,C.activeLoaderIndex=0,C.activeLoopIndex=0,C.previousIndex=null,C.velocity=0,C.snapGrid=[],C.slidesGrid=[],C.imagesToLoad=[],C.imagesLoaded=0,C.wrapperLeft=0,C.wrapperRight=0,C.wrapperTop=0,C.wrapperBottom=0,C.isAndroid=navigator.userAgent.toLowerCase().indexOf("android")>=0;var D,E,F,G,H,I,J={eventTarget:"wrapper",mode:"horizontal",touchRatio:1,speed:300,freeMode:!1,freeModeFluid:!1,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,slidesPerView:1,slidesPerGroup:1,simulateTouch:!0,followFinger:!0,shortSwipes:!0,longSwipesRatio:.5,moveStartThreshold:!1,onlyExternal:!1,createPagination:!0,pagination:!1,paginationElement:"span",paginationClickable:!1,paginationAsRange:!0,resistance:!0,scrollContainer:!1,preventLinks:!0,preventLinksPropagation:!1,noSwiping:!1,noSwipingClass:"swiper-no-swiping",initialSlide:0,keyboardControl:!1,mousewheelControl:!1,mousewheelControlForceToAxis:!1,useCSS3Transforms:!0,autoplay:!1,autoplayDisableOnInteraction:!0,autoplayStopOnLast:!1,loop:!1,loopAdditionalSlides:0,calculateHeight:!1,cssWidthAndHeight:!1,updateOnImagesReady:!0,releaseFormElements:!0,watchActiveIndex:!1,visibilityFullFit:!1,offsetPxBefore:0,offsetPxAfter:0,offsetSlidesBefore:0,offsetSlidesAfter:0,centeredSlides:!1,queueStartCallbacks:!1,queueEndCallbacks:!1,autoResize:!0,resizeReInit:!1,DOMAnimation:!0,loader:{slides:[],slidesHTMLType:"inner",surroundGroups:1,logic:"reload",loadAllSlides:!1},slideElement:"div",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",wrapperClass:"swiper-wrapper",paginationElementClass:"swiper-pagination-switch",paginationActiveClass:"swiper-active-switch",paginationVisibleClass:"swiper-visible-switch"};b=b||{};for(var K in J)if(K in b&&"object"==typeof b[K])for(var L in J[K])L in b[K]||(b[K][L]=J[K][L]);else K in b||(b[K]=J[K]);C.params=b,b.scrollContainer&&(b.freeMode=!0,b.freeModeFluid=!0),b.loop&&(b.resistance="100%");var M="horizontal"===b.mode,N=["mousedown","mousemove","mouseup"];C.browser.ie10&&(N=["MSPointerDown","MSPointerMove","MSPointerUp"]),C.browser.ie11&&(N=["pointerdown","pointermove","pointerup"]),C.touchEvents={touchStart:C.support.touch||!b.simulateTouch?"touchstart":N[0],touchMove:C.support.touch||!b.simulateTouch?"touchmove":N[1],touchEnd:C.support.touch||!b.simulateTouch?"touchend":N[2]};for(var O=C.container.childNodes.length-1;O>=0;O--)if(C.container.childNodes[O].className)for(var P=C.container.childNodes[O].className.split(" "),Q=0;Q<P.length;Q++)P[Q]===b.wrapperClass&&(D=C.container.childNodes[O]);C.wrapper=D,C._extendSwiperSlide=function(a){return a.append=function(){return b.loop?a.insertAfter(C.slides.length-C.loopedSlides):(C.wrapper.appendChild(a),C.reInit()),a},a.prepend=function(){return b.loop?(C.wrapper.insertBefore(a,C.slides[C.loopedSlides]),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.wrapper.insertBefore(a,C.wrapper.firstChild),C.reInit(),a},a.insertAfter=function(c){if("undefined"==typeof c)return!1;var d;return b.loop?(d=C.slides[c+1+C.loopedSlides],d?C.wrapper.insertBefore(a,d):C.wrapper.appendChild(a),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):(d=C.slides[c+1],C.wrapper.insertBefore(a,d)),C.reInit(),a},a.clone=function(){return C._extendSwiperSlide(a.cloneNode(!0))},a.remove=function(){C.wrapper.removeChild(a),C.reInit()},a.html=function(b){return"undefined"==typeof b?a.innerHTML:(a.innerHTML=b,a)},a.index=function(){for(var b,c=C.slides.length-1;c>=0;c--)a===C.slides[c]&&(b=c);return b},a.isActive=function(){return a.index()===C.activeIndex?!0:!1},a.swiperSlideDataStorage||(a.swiperSlideDataStorage={}),a.getData=function(b){return a.swiperSlideDataStorage[b]},a.setData=function(b,c){return a.swiperSlideDataStorage[b]=c,a},a.data=function(b,c){return c?(a.setAttribute("data-"+b,c),a):a.getAttribute("data-"+b)},a.getWidth=function(b){return C.h.getWidth(a,b)},a.getHeight=function(b){return C.h.getHeight(a,b)},a.getOffset=function(){return C.h.getOffset(a)},a},C.calcSlides=function(a){var c=C.slides?C.slides.length:!1;C.slides=[],C.displaySlides=[];for(var d=0;d<C.wrapper.childNodes.length;d++)if(C.wrapper.childNodes[d].className)for(var e=C.wrapper.childNodes[d].className,f=e.split(" "),i=0;i<f.length;i++)f[i]===b.slideClass&&C.slides.push(C.wrapper.childNodes[d]);for(d=C.slides.length-1;d>=0;d--)C._extendSwiperSlide(C.slides[d]);c!==!1&&(c!==C.slides.length||a)&&(h(),g(),C.updateActiveSlide(),C.params.pagination&&C.createPagination(),C.callPlugins("numberOfSlidesChanged"))},C.createSlide=function(a,c,d){var c=c||C.params.slideClass,d=d||b.slideElement,e=document.createElement(d);return e.innerHTML=a||"",e.className=c,C._extendSwiperSlide(e)},C.appendSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).append():C.createSlide(a,b,c).append():void 0},C.prependSlide=function(a,b,c){return a?a.nodeType?C._extendSwiperSlide(a).prepend():C.createSlide(a,b,c).prepend():void 0},C.insertSlideAfter=function(a,b,c,d){return"undefined"==typeof a?!1:b.nodeType?C._extendSwiperSlide(b).insertAfter(a):C.createSlide(b,c,d).insertAfter(a)},C.removeSlide=function(a){if(C.slides[a]){if(b.loop){if(!C.slides[a+C.loopedSlides])return!1;C.slides[a+C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()}else C.slides[a].remove();return!0}return!1},C.removeLastSlide=function(){return C.slides.length>0?(b.loop?(C.slides[C.slides.length-1-C.loopedSlides].remove(),C.removeLoopedSlides(),C.calcSlides(),C.createLoop()):C.slides[C.slides.length-1].remove(),!0):!1},C.removeAllSlides=function(){for(var a=C.slides.length-1;a>=0;a--)C.slides[a].remove()},C.getSlide=function(a){return C.slides[a]},C.getLastSlide=function(){return C.slides[C.slides.length-1]},C.getFirstSlide=function(){return C.slides[0]},C.activeSlide=function(){return C.slides[C.activeIndex]},C.fireCallback=function(){var a=arguments[0];if("[object Array]"===Object.prototype.toString.call(a))for(var c=0;c<a.length;c++)"function"==typeof a[c]&&a[c](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);else"[object String]"===Object.prototype.toString.call(a)?b["on"+a]&&C.fireCallback(b["on"+a]):a(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},C.addCallback=function(a,b){"use strict";var c,e=this;return e.params["on"+a]?d(this.params["on"+a])?this.params["on"+a].push(b):"function"==typeof this.params["on"+a]?(c=this.params["on"+a],this.params["on"+a]=[],this.params["on"+a].push(c),this.params["on"+a].push(b)):void 0:(this.params["on"+a]=[],this.params["on"+a].push(b))},C.removeCallbacks=function(a){return C.params["on"+a]?C.params["on"+a]=null:void 0};var R=[];for(var S in C.plugins)if(b[S]){var T=C.plugins[S](C,b[S]);T&&R.push(T)}C.callPlugins=function(a,b){b||(b={});for(var c=0;c<R.length;c++)a in R[c]&&R[c][a](b)},!C.browser.ie10&&!C.browser.ie11||b.onlyExternal||C.wrapper.classList.add("swiper-wp8-"+(M?"horizontal":"vertical")),b.freeMode&&(C.container.className+=" swiper-free-mode"),C.initialized=!1,C.init=function(a,c){var d=C.h.getWidth(C.container),e=C.h.getHeight(C.container);if(d!==C.width||e!==C.height||a){C.width=d,C.height=e,I=M?d:e;var f=C.wrapper;if(a&&C.calcSlides(c),"auto"===b.slidesPerView){var g=0,h=0;b.slidesOffset>0&&(f.style.paddingLeft="",f.style.paddingRight="",f.style.paddingTop="",f.style.paddingBottom=""),f.style.width="",f.style.height="",b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-this.slides[0].getWidth(!0))/2,C.wrapperRight=(I-C.slides[C.slides.length-1].getWidth(!0))/2):(C.wrapperTop=(I-C.slides[0].getHeight(!0))/2,C.wrapperBottom=(I-C.slides[C.slides.length-1].getHeight(!0))/2)),M?(C.wrapperLeft>=0&&(f.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>=0&&(f.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>=0&&(f.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>=0&&(f.style.paddingBottom=C.wrapperBottom+"px"));var i=0,j=0;C.snapGrid=[],C.slidesGrid=[];for(var k=0,l=0;l<C.slides.length;l++){var m=C.slides[l].getWidth(!0),n=C.slides[l].getHeight(!0);b.calculateHeight&&(k=Math.max(k,n));var o=M?m:n;if(b.centeredSlides){var p=l===C.slides.length-1?0:C.slides[l+1].getWidth(!0),q=l===C.slides.length-1?0:C.slides[l+1].getHeight(!0),r=M?p:q;if(o>I){for(var s=0;s<=Math.floor(o/(I+C.wrapperLeft));s++)C.snapGrid.push(0===s?i+C.wrapperLeft:i+C.wrapperLeft+I*s);C.slidesGrid.push(i+C.wrapperLeft)}else C.snapGrid.push(j),C.slidesGrid.push(j);j+=o/2+r/2}else{if(o>I)for(var s=0;s<=Math.floor(o/I);s++)C.snapGrid.push(i+I*s);else C.snapGrid.push(i);C.slidesGrid.push(i)}i+=o,g+=m,h+=n}b.calculateHeight&&(C.height=k),M?(F=g+C.wrapperRight+C.wrapperLeft,f.style.width=g+"px",f.style.height=C.height+"px"):(F=h+C.wrapperTop+C.wrapperBottom,f.style.width=C.width+"px",f.style.height=h+"px")}else if(b.scrollContainer){f.style.width="",f.style.height="";var t=C.slides[0].getWidth(!0),u=C.slides[0].getHeight(!0);F=M?t:u,f.style.width=t+"px",f.style.height=u+"px",E=M?t:u}else{if(b.calculateHeight){var k=0,u=0;M||(C.container.style.height=""),f.style.height="";for(var l=0;l<C.slides.length;l++)C.slides[l].style.height="",k=Math.max(C.slides[l].getHeight(!0),k),M||(u+=C.slides[l].getHeight(!0));var n=k;C.height=n,M?u=n:(I=n,C.container.style.height=I+"px")}else var n=M?C.height:C.height/b.slidesPerView,u=M?C.height:C.slides.length*n;var m=M?C.width/b.slidesPerView:C.width,t=M?C.slides.length*m:C.width;E=M?m:n,b.offsetSlidesBefore>0&&(M?C.wrapperLeft=E*b.offsetSlidesBefore:C.wrapperTop=E*b.offsetSlidesBefore),b.offsetSlidesAfter>0&&(M?C.wrapperRight=E*b.offsetSlidesAfter:C.wrapperBottom=E*b.offsetSlidesAfter),b.offsetPxBefore>0&&(M?C.wrapperLeft=b.offsetPxBefore:C.wrapperTop=b.offsetPxBefore),b.offsetPxAfter>0&&(M?C.wrapperRight=b.offsetPxAfter:C.wrapperBottom=b.offsetPxAfter),b.centeredSlides&&(M?(C.wrapperLeft=(I-E)/2,C.wrapperRight=(I-E)/2):(C.wrapperTop=(I-E)/2,C.wrapperBottom=(I-E)/2)),M?(C.wrapperLeft>0&&(f.style.paddingLeft=C.wrapperLeft+"px"),C.wrapperRight>0&&(f.style.paddingRight=C.wrapperRight+"px")):(C.wrapperTop>0&&(f.style.paddingTop=C.wrapperTop+"px"),C.wrapperBottom>0&&(f.style.paddingBottom=C.wrapperBottom+"px")),F=M?t+C.wrapperRight+C.wrapperLeft:u+C.wrapperTop+C.wrapperBottom,b.cssWidthAndHeight||(parseFloat(t)>0&&(f.style.width=t+"px"),parseFloat(u)>0&&(f.style.height=u+"px"));var i=0;C.snapGrid=[],C.slidesGrid=[];for(var l=0;l<C.slides.length;l++)C.snapGrid.push(i),C.slidesGrid.push(i),i+=E,b.cssWidthAndHeight||(parseFloat(m)>0&&(C.slides[l].style.width=m+"px"),parseFloat(n)>0&&(C.slides[l].style.height=n+"px"))}C.initialized?(C.callPlugins("onInit"),b.onInit&&C.fireCallback(b.onInit,C)):(C.callPlugins("onFirstInit"),b.onFirstInit&&C.fireCallback(b.onFirstInit,C)),C.initialized=!0}},C.reInit=function(a){C.init(!0,a)},C.resizeFix=function(a){C.callPlugins("beforeResizeFix"),C.init(b.resizeReInit||a),b.freeMode?C.getWrapperTranslate()<-e()&&(C.setWrapperTransition(0),C.setWrapperTranslate(-e())):(C.swipeTo(b.loop?C.activeLoopIndex:C.activeIndex,0,!1),b.autoplay&&(C.support.transitions&&"undefined"!=typeof _?"undefined"!=typeof _&&(clearTimeout(_),_=void 0,C.startAutoplay()):"undefined"!=typeof ab&&(clearInterval(ab),ab=void 0,C.startAutoplay()))),C.callPlugins("afterResizeFix")},C.destroy=function(){var a=C.h.removeEventListener,c="wrapper"==b.eventTarget?C.wrapper:C.container;C.browser.ie10||C.browser.ie11?(a(c,C.touchEvents.touchStart,p),a(document,C.touchEvents.touchMove,q),a(document,C.touchEvents.touchEnd,r)):(C.support.touch&&(a(c,"touchstart",p),a(c,"touchmove",q),a(c,"touchend",r)),b.simulateTouch&&(a(c,"mousedown",p),a(document,"mousemove",q),a(document,"mouseup",r))),b.autoResize&&a(window,"resize",C.resizeFix),h(),b.paginationClickable&&w(),b.mousewheelControl&&C._wheelEvent&&a(C.container,C._wheelEvent,j),b.keyboardControl&&a(document,"keydown",i),b.autoplay&&C.stopAutoplay(),C.callPlugins("onDestroy"),C=null};var U=(new Date).getTime();if(b.grabCursor){var V=C.container.style;V.cursor="move",V.cursor="grab",V.cursor="-moz-grab",V.cursor="-webkit-grab"}C.allowSlideClick=!0,C.allowLinks=!0;var W,X,Y,Z=!1,$=!0;C.swipeNext=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipeNext");var c=C.getWrapperTranslate(),d=c;if("auto"==b.slidesPerView){for(var f=0;f<C.snapGrid.length;f++)if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){d=-C.snapGrid[f+1];break}}else{var g=E*b.slidesPerGroup;d=-(Math.floor(Math.abs(c)/Math.floor(g))*g+g)}return d<-e()&&(d=-e()),d==c?!1:(u(d,"next"),!0)},C.swipePrev=function(a){!a&&b.loop&&C.fixLoop(),!a&&b.autoplay&&C.stopAutoplay(!0),C.callPlugins("onSwipePrev");var c,d=Math.ceil(C.getWrapperTranslate());if("auto"==b.slidesPerView){c=0;for(var e=1;e<C.snapGrid.length;e++){if(-d==C.snapGrid[e]){c=-C.snapGrid[e-1];break}if(-d>C.snapGrid[e]&&-d<C.snapGrid[e+1]){c=-C.snapGrid[e];break}}}else{var f=E*b.slidesPerGroup;c=-(Math.ceil(-d/f)-1)*f}return c>0&&(c=0),c==d?!1:(u(c,"prev"),!0)},C.swipeReset=function(){C.callPlugins("onSwipeReset");{var a,c=C.getWrapperTranslate(),d=E*b.slidesPerGroup;-e()}if("auto"==b.slidesPerView){a=0;for(var f=0;f<C.snapGrid.length;f++){if(-c===C.snapGrid[f])return;if(-c>=C.snapGrid[f]&&-c<C.snapGrid[f+1]){a=C.positions.diff>0?-C.snapGrid[f+1]:-C.snapGrid[f];break}}-c>=C.snapGrid[C.snapGrid.length-1]&&(a=-C.snapGrid[C.snapGrid.length-1]),c<=-e()&&(a=-e())}else a=0>c?Math.round(c/d)*d:0;return b.scrollContainer&&(a=0>c?c:0),a<-e()&&(a=-e()),b.scrollContainer&&I>E&&(a=0),a==c?!1:(u(a,"reset"),!0)},C.swipeTo=function(a,c,d){a=parseInt(a,10),C.callPlugins("onSwipeTo",{index:a,speed:c}),b.loop&&(a+=C.loopedSlides);var f=C.getWrapperTranslate();if(!(a>C.slides.length-1||0>a)){var g;return g="auto"==b.slidesPerView?-C.slidesGrid[a]:-a*E,g<-e()&&(g=-e()),g==f?!1:(d=d===!1?!1:!0,u(g,"to",{index:a,speed:c,runCallbacks:d}),!0)}},C._queueStartCallbacks=!1,C._queueEndCallbacks=!1,C.updateActiveSlide=function(a){if(C.initialized&&0!=C.slides.length){if(C.previousIndex=C.activeIndex,"undefined"==typeof a&&(a=C.getWrapperTranslate()),a>0&&(a=0),"auto"==b.slidesPerView){if(C.activeIndex=C.slidesGrid.indexOf(-a),C.activeIndex<0){for(var c=0;c<C.slidesGrid.length-1&&!(-a>C.slidesGrid[c]&&-a<C.slidesGrid[c+1]);c++);var d=Math.abs(C.slidesGrid[c]+a),e=Math.abs(C.slidesGrid[c+1]+a);C.activeIndex=e>=d?c:c+1}}else C.activeIndex=Math[b.visibilityFullFit?"ceil":"round"](-a/E);if(C.activeIndex==C.slides.length&&(C.activeIndex=C.slides.length-1),C.activeIndex<0&&(C.activeIndex=0),C.slides[C.activeIndex]){C.calcVisibleSlides(a);for(var f=new RegExp("\\s*"+b.slideActiveClass),g=new RegExp("\\s*"+b.slideVisibleClass),c=0;c<C.slides.length;c++)C.slides[c].className=C.slides[c].className.replace(f,"").replace(g,""),C.visibleSlides.indexOf(C.slides[c])>=0&&(C.slides[c].className+=" "+b.slideVisibleClass);if(C.slides[C.activeIndex].className+=" "+b.slideActiveClass,b.loop){var h=C.loopedSlides;C.activeLoopIndex=C.activeIndex-h,C.activeLoopIndex>=C.slides.length-2*h&&(C.activeLoopIndex=C.slides.length-2*h-C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=C.slides.length-2*h+C.activeLoopIndex),C.activeLoopIndex<0&&(C.activeLoopIndex=0)}else C.activeLoopIndex=C.activeIndex;b.pagination&&C.updatePagination(a)}}},C.createPagination=function(a){if(b.paginationClickable&&C.paginationButtons&&w(),C.paginationContainer=b.pagination.nodeType?b.pagination:c(b.pagination)[0],b.createPagination){var d="",e=C.slides.length,f=e;b.loop&&(f-=2*C.loopedSlides);for(var g=0;f>g;g++)d+="<"+b.paginationElement+' class="'+b.paginationElementClass+'"></'+b.paginationElement+">";C.paginationContainer.innerHTML=d}C.paginationButtons=c("."+b.paginationElementClass,C.paginationContainer),a||C.updatePagination(),C.callPlugins("onCreatePagination"),b.paginationClickable&&x()},C.updatePagination=function(a){if(b.pagination&&!(C.slides.length<1)){var d=c("."+b.paginationActiveClass,C.paginationContainer);if(d){var e=C.paginationButtons;if(0!=e.length){for(var f=0;f<e.length;f++)e[f].className=b.paginationElementClass;var g=b.loop?C.loopedSlides:0;if(b.paginationAsRange){C.visibleSlides||C.calcVisibleSlides(a);for(var h=[],f=0;f<C.visibleSlides.length;f++){var i=C.slides.indexOf(C.visibleSlides[f])-g;b.loop&&0>i&&(i=C.slides.length-2*C.loopedSlides+i),b.loop&&i>=C.slides.length-2*C.loopedSlides&&(i=C.slides.length-2*C.loopedSlides-i,i=Math.abs(i)),h.push(i)}for(f=0;f<h.length;f++)e[h[f]]&&(e[h[f]].className+=" "+b.paginationVisibleClass);b.loop?e[C.activeLoopIndex].className+=" "+b.paginationActiveClass:e[C.activeIndex].className+=" "+b.paginationActiveClass}else b.loop?e[C.activeLoopIndex]&&(e[C.activeLoopIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass):e[C.activeIndex].className+=" "+b.paginationActiveClass+" "+b.paginationVisibleClass}}}},C.calcVisibleSlides=function(a){var c=[],d=0,e=0,f=0;M&&C.wrapperLeft>0&&(a+=C.wrapperLeft),!M&&C.wrapperTop>0&&(a+=C.wrapperTop);for(var g=0;g<C.slides.length;g++){d+=e,e="auto"==b.slidesPerView?M?C.h.getWidth(C.slides[g],!0):C.h.getHeight(C.slides[g],!0):E,f=d+e;var h=!1;b.visibilityFullFit?(d>=-a&&-a+I>=f&&(h=!0),-a>=d&&f>=-a+I&&(h=!0)):(f>-a&&-a+I>=f&&(h=!0),d>=-a&&-a+I>d&&(h=!0),-a>d&&f>-a+I&&(h=!0)),h&&c.push(C.slides[g])}0==c.length&&(c=[C.slides[C.activeIndex]]),C.visibleSlides=c};var _=void 0,ab=void 0;C.startAutoplay=function(){if(C.support.transitions){if("undefined"!=typeof _)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),z()
}else{if("undefined"!=typeof ab)return!1;if(!b.autoplay)return;C.callPlugins("onAutoplayStart"),ab=setInterval(function(){b.loop?(C.fixLoop(),C.swipeNext(!0)):C.swipeNext(!0)||(b.autoplayStopOnLast?(clearInterval(ab),ab=void 0):C.swipeTo(0))},b.autoplay)}},C.stopAutoplay=function(a){if(C.support.transitions){if(!_)return;_&&clearTimeout(_),_=void 0,a&&!b.autoplayDisableOnInteraction&&C.wrapperTransitionEnd(function(){z()}),C.callPlugins("onAutoplayStop")}else ab&&clearInterval(ab),ab=void 0,C.callPlugins("onAutoplayStop")},C.loopCreated=!1,C.removeLoopedSlides=function(){if(C.loopCreated)for(var a=0;a<C.slides.length;a++)C.slides[a].getData("looped")===!0&&C.wrapper.removeChild(C.slides[a])},C.createLoop=function(){if(0!=C.slides.length){C.loopedSlides="auto"==b.slidesPerView?b.loopedSlides||1:b.slidesPerView+b.loopAdditionalSlides,C.loopedSlides>C.slides.length&&(C.loopedSlides=C.slides.length);var a,c="",d="",e="",f=C.slides.length,g=Math.floor(C.loopedSlides/f),h=C.loopedSlides%f;for(a=0;g*f>a;a++){var i=a;if(a>=f){var j=Math.floor(a/f);i=a-f*j}e+=C.slides[i].outerHTML}for(a=0;h>a;a++)d+=t(b.slideDuplicateClass,C.slides[a].outerHTML);for(a=f-h;f>a;a++)c+=t(b.slideDuplicateClass,C.slides[a].outerHTML);var k=c+e+D.innerHTML+e+d;for(D.innerHTML=k,C.loopCreated=!0,C.calcSlides(),a=0;a<C.slides.length;a++)(a<C.loopedSlides||a>=C.slides.length-C.loopedSlides)&&C.slides[a].setData("looped",!0);C.callPlugins("onCreateLoop")}},C.fixLoop=function(){var a;C.activeIndex<C.loopedSlides?(a=C.slides.length-3*C.loopedSlides+C.activeIndex,C.swipeTo(a,0,!1)):("auto"==b.slidesPerView&&C.activeIndex>=2*C.loopedSlides||C.activeIndex>C.slides.length-2*b.slidesPerView)&&(a=-C.slides.length+C.activeIndex+C.loopedSlides,C.swipeTo(a,0,!1))},C.loadSlides=function(){var a="";C.activeLoaderIndex=0;for(var c=b.loader.slides,d=b.loader.loadAllSlides?c.length:b.slidesPerView*(1+b.loader.surroundGroups),e=0;d>e;e++)a+="outer"==b.loader.slidesHTMLType?c[e]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+e+'">'+c[e]+"</"+b.slideElement+">";C.wrapper.innerHTML=a,C.calcSlides(!0),b.loader.loadAllSlides||C.wrapperTransitionEnd(C.reloadSlides,!0)},C.reloadSlides=function(){var a=b.loader.slides,c=parseInt(C.activeSlide().data("swiperindex"),10);if(!(0>c||c>a.length-1)){C.activeLoaderIndex=c;var d=Math.max(0,c-b.slidesPerView*b.loader.surroundGroups),e=Math.min(c+b.slidesPerView*(1+b.loader.surroundGroups)-1,a.length-1);if(c>0){var f=-E*(c-d);C.setWrapperTranslate(f),C.setWrapperTransition(0)}if("reload"===b.loader.logic){C.wrapper.innerHTML="";for(var g="",h=d;e>=h;h++)g+="outer"==b.loader.slidesHTMLType?a[h]:"<"+b.slideElement+' class="'+b.slideClass+'" data-swiperindex="'+h+'">'+a[h]+"</"+b.slideElement+">";C.wrapper.innerHTML=g}else{for(var i=1e3,j=0,h=0;h<C.slides.length;h++){var k=C.slides[h].data("swiperindex");d>k||k>e?C.wrapper.removeChild(C.slides[h]):(i=Math.min(k,i),j=Math.max(k,j))}for(var h=d;e>=h;h++){if(i>h){var l=document.createElement(b.slideElement);l.className=b.slideClass,l.setAttribute("data-swiperindex",h),l.innerHTML=a[h],C.wrapper.insertBefore(l,C.wrapper.firstChild)}if(h>j){var l=document.createElement(b.slideElement);l.className=b.slideClass,l.setAttribute("data-swiperindex",h),l.innerHTML=a[h],C.wrapper.appendChild(l)}}}C.reInit(!0)}},A()}};Swiper.prototype={plugins:{},wrapperTransitionEnd:function(a,b){function c(){if(a(e),e.params.queueEndCallbacks&&(e._queueEndCallbacks=!1),!b)for(d=0;d<g.length;d++)e.h.removeEventListener(f,g[d],c)}var d,e=this,f=e.wrapper,g=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"];if(a)for(d=0;d<g.length;d++)e.h.addEventListener(f,g[d],c)},getWrapperTranslate:function(a){var b,c,d,e,f=this.wrapper;return"undefined"==typeof a&&(a="horizontal"==this.params.mode?"x":"y"),this.support.transforms&&this.params.useCSS3Transforms?(d=window.getComputedStyle(f,null),window.WebKitCSSMatrix?e=new WebKitCSSMatrix(d.webkitTransform):(e=d.MozTransform||d.OTransform||d.MsTransform||d.msTransform||d.transform||d.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),b=e.toString().split(",")),"x"==a&&(c=window.WebKitCSSMatrix?e.m41:parseFloat(16==b.length?b[12]:b[4])),"y"==a&&(c=window.WebKitCSSMatrix?e.m42:parseFloat(16==b.length?b[13]:b[5]))):("x"==a&&(c=parseFloat(f.style.left,10)||0),"y"==a&&(c=parseFloat(f.style.top,10)||0)),c||0},setWrapperTranslate:function(a,b,c){var d,e=this.wrapper.style,f={x:0,y:0,z:0};3==arguments.length?(f.x=a,f.y=b,f.z=c):("undefined"==typeof b&&(b="horizontal"==this.params.mode?"x":"y"),f[b]=a),this.support.transforms&&this.params.useCSS3Transforms?(d=this.support.transforms3d?"translate3d("+f.x+"px, "+f.y+"px, "+f.z+"px)":"translate("+f.x+"px, "+f.y+"px)",e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=d):(e.left=f.x+"px",e.top=f.y+"px"),this.callPlugins("onSetWrapperTransform",f),this.params.onSetWrapperTransform&&this.fireCallback(this.params.onSetWrapperTransform,this,f)},setWrapperTransition:function(a){var b=this.wrapper.style;b.webkitTransitionDuration=b.MsTransitionDuration=b.msTransitionDuration=b.MozTransitionDuration=b.OTransitionDuration=b.transitionDuration=a/1e3+"s",this.callPlugins("onSetWrapperTransition",{duration:a}),this.params.onSetWrapperTransition&&this.fireCallback(this.params.onSetWrapperTransition,this,a)},h:{getWidth:function(a,b){var c=window.getComputedStyle(a,null).getPropertyValue("width"),d=parseFloat(c);return(isNaN(d)||c.indexOf("%")>0)&&(d=a.offsetWidth-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),b&&(d+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-left"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-right"))),d},getHeight:function(a,b){if(b)return a.offsetHeight;var c=window.getComputedStyle(a,null).getPropertyValue("height"),d=parseFloat(c);return(isNaN(d)||c.indexOf("%")>0)&&(d=a.offsetHeight-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))-parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),b&&(d+=parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-top"))+parseFloat(window.getComputedStyle(a,null).getPropertyValue("padding-bottom"))),d},getOffset:function(a){var b=a.getBoundingClientRect(),c=document.body,d=a.clientTop||c.clientTop||0,e=a.clientLeft||c.clientLeft||0,f=window.pageYOffset||a.scrollTop,g=window.pageXOffset||a.scrollLeft;return document.documentElement&&!window.pageYOffset&&(f=document.documentElement.scrollTop,g=document.documentElement.scrollLeft),{top:b.top+f-d,left:b.left+g-e}},windowWidth:function(){return window.innerWidth?window.innerWidth:document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:void 0},windowHeight:function(){return window.innerHeight?window.innerHeight:document.documentElement&&document.documentElement.clientHeight?document.documentElement.clientHeight:void 0},windowScroll:function(){return"undefined"!=typeof pageYOffset?{left:window.pageXOffset,top:window.pageYOffset}:document.documentElement?{left:document.documentElement.scrollLeft,top:document.documentElement.scrollTop}:void 0},addEventListener:function(a,b,c,d){"undefined"==typeof d&&(d=!1),a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},removeEventListener:function(a,b,c,d){"undefined"==typeof d&&(d=!1),a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)}},setTransform:function(a,b){var c=a.style;c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=b},setTranslate:function(a,b){var c=a.style,d={x:b.x||0,y:b.y||0,z:b.z||0},e=this.support.transforms3d?"translate3d("+d.x+"px,"+d.y+"px,"+d.z+"px)":"translate("+d.x+"px,"+d.y+"px)";c.webkitTransform=c.MsTransform=c.msTransform=c.MozTransform=c.OTransform=c.transform=e,this.support.transforms||(c.left=d.x+"px",c.top=d.y+"px")},setTransition:function(a,b){var c=a.style;c.webkitTransitionDuration=c.MsTransitionDuration=c.msTransitionDuration=c.MozTransitionDuration=c.OTransitionDuration=c.transitionDuration=b+"ms"},support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var a=document.createElement("div").style;return"webkitPerspective"in a||"MozPerspective"in a||"OPerspective"in a||"MsPerspective"in a||"perspective"in a}(),transforms:window.Modernizr&&Modernizr.csstransforms===!0||function(){var a=document.createElement("div").style;return"transform"in a||"WebkitTransform"in a||"MozTransform"in a||"msTransform"in a||"MsTransform"in a||"OTransform"in a}(),transitions:window.Modernizr&&Modernizr.csstransitions===!0||function(){var a=document.createElement("div").style;return"transition"in a||"WebkitTransition"in a||"MozTransition"in a||"msTransition"in a||"MsTransition"in a||"OTransition"in a}()},browser:{ie8:function(){var a=-1;if("Microsoft Internet Explorer"==navigator.appName){var b=navigator.userAgent,c=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");null!=c.exec(b)&&(a=parseFloat(RegExp.$1))}return-1!=a&&9>a}(),ie10:window.navigator.msPointerEnabled,ie11:window.navigator.pointerEnabled}},(window.jQuery||window.Zepto)&&!function(a){a.fn.swiper=function(b){var c=new Swiper(a(this)[0],b);return a(this).data("swiper",c),c}}(window.jQuery||window.Zepto),"undefined"!=typeof module&&(module.exports=Swiper);