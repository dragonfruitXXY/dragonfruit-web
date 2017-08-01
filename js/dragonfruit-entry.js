/*
$(function(){
    //to do sth.
})为
$(document).ready(function(){

})的简写，相当于window.onload
*/

//跨域问题
$(function () {  //, headers: { 'x-requested-with': 'XMLHttpRequest' }
    $.ajaxSetup({ crossDomain: true, xhrFields: { withCredentials: true } });
    scene2();
    /*
    **测试get请求**
    $.get("http://42.96.169.172/dragonfruit/rest/v1/story/type/all", function (result) {
        alert(result[0].code);
    });
    */
});




//限制黑色背景下的星空产生量
var number_limit = 0;//限制场景2，让其不会无限制增加。
// $(function () {
// $("body").css({ "background-color": "oldlace" });
// scen1();
// })

//导航栏区分不同的页面
function clickButton(id) {
    var login = document.getElementById("login");
    var register = document.getElementById("register");
    var text = id.innerHTML;
    if (text == "注册") {
        login.className = null;
        register.className = "active";
        document.getElementById("login_block").style.display = "none";
        document.getElementById("register_block").style.display = "block";
    }
    else {
        login.className = "active";
        register.className = null;
        document.getElementById("login_block").style.display = "block";
        document.getElementById("register_block").style.display = "none";
    }
}
//登录注册按钮键盘快捷键
$(function () {
    $(document).keydown(function (event) {
        if (event.keyCode == 13 && $("#login").attr("class") == "active") {
            $("#login_btn").click();
        }
        else if (event.keyCode == 13 && $("#register").attr("class") == active) {
            $("#register_btn").click();
        }
    })
})

function getCookie(c_name) {
    if (document.cookie.length > 0) {　　//先查询cookie是否为空，为空就return ""
        c_start = document.cookie.indexOf(c_name + "=")　　//通过String对象的indexOf()来检查这个cookie是否存在，不存在就为 -1　　
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1　　//最后这个+1其实就是表示"="号啦，这样就获取到了cookie值的开始位置
            c_end = document.cookie.indexOf(";", c_start)　　//其实我刚看见indexOf()第二个参数的时候猛然有点晕，后来想起来表示指定的开始索引的位置...这句是为了得到值的结束位置。因为需要考虑是否是最后一项，所以通过";"号是否存在来判断
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))　　//通过substring()得到了值。想了解unescape()得先知道escape()是做什么的，都是很重要的基础，想了解的可以搜索下，在文章结尾处也会进行讲解cookie编码细节
        }
    }
    return ""
　　}
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

//登录注册按钮click函数
$(document).ready(function () {
    $('#login_btn').click(function () {
        var username = $("#login_block_user").val();
        var password = $("#login_block_psw").val();
        if (Varivacation(username, password)) {
            
            $.ajax
                ({
                    url: "http://42.96.169.172:80/dragonfruit/rest/v1/user/login",
                    type: "POST",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ "name": username, "password": password }),
                    crossDomain: true,
                    success: function (res) {
                        // var return_message=JSON.parse(res);
                        if (res) {
                            //登陆成功，保存tocken
                            $.cookie("tocken", res.data.tocken, { expires: 7, path: '/' });
                            // alert($.cookie("tocken"));
                            window.location.href = "../html/show.html";
                        }
                        else
                            alert("出错");
                    }
                })
            //http://42.96.169.172/dragonfruit/rest/v1/story/type/all
                
           // $.post('http://42.96.169.172/dragonfruit/rest/v1/user/login',{ "name": username, "password": password },function(res){console.log(res)})
        }
    })
    $('#register_btn').click(function () {
        var username = $("#register_block_user").val();
        var password = $("#register_block_pwd").val();
        var nickname = $("#register_block_nickname").val();
        if (Varivacation(username, password)) {
            $.ajax
                ({
                    url: "http://42.96.169.172/dragonfruit/rest/v1/user/register",
                    type: "post",
                    contentType: "application/json",
                    dataType: "json",
                    data: JSON.stringify({ "name": username, "password": password }),
                    success: function (res) {
                        // var return_message=JSON.parse(res);
                        if (res.result) {
                            //登陆成功，保存tocken
                            alert("注册成功");
                            //window.location.href="show.html";
                        }
                        else
                            alert("注册出错");
                    }
                })
        }
    })



});
function Varivacation(username, password) {
    if (!username || !password) {
        alert("账号或密码不能为空");
        return false;
    }
    else if (username[0] == ' ' || password[0] == ' ') {
        alert("首位不能为空格")
        return false;
    }
    return true;
}

function scene1() {
    var num = 200;
    var w = window.innerWidth;
    var h = window.innerHeight;
    var max = 100;
    var _x = 0;
    var _y = 0;
    var _z = 150;
    var dtr = function (d) {
        return d * Math.PI / 180;
    };

    var rnd = function () {
        return Math.sin(Math.floor(Math.random() * 360) * Math.PI / 180);
    };
    var dist = function (p1, p2, p3) {
        return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2) + Math.pow(p2.z - p1.z, 2));
    };

    var cam = {
        obj: {
            x: _x,
            y: _y,
            z: _z
        },
        dest: {
            x: 0,
            y: 0,
            z: 1
        },
        dist: {
            x: 0,
            y: 0,
            z: 200
        },
        ang: {
            cplane: 0,
            splane: 0,
            ctheta: 0,
            stheta: 0
        },
        zoom: 1,
        disp: {
            x: w / 2,
            y: h / 2,
            z: 0
        },
        upd: function () {
            cam.dist.x = cam.dest.x - cam.obj.x;
            cam.dist.y = cam.dest.y - cam.obj.y;
            cam.dist.z = cam.dest.z - cam.obj.z;
            cam.ang.cplane = -cam.dist.z / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
            cam.ang.splane = cam.dist.x / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z);
            cam.ang.ctheta = Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.z * cam.dist.z) / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
            cam.ang.stheta = -cam.dist.y / Math.sqrt(cam.dist.x * cam.dist.x + cam.dist.y * cam.dist.y + cam.dist.z * cam.dist.z);
        }
    };

    var trans = {
        parts: {
            sz: function (p, sz) {
                return {
                    x: p.x * sz.x,
                    y: p.y * sz.y,
                    z: p.z * sz.z
                };
            },
            rot: {
                x: function (p, rot) {
                    return {
                        x: p.x,
                        y: p.y * Math.cos(dtr(rot.x)) - p.z * Math.sin(dtr(rot.x)),
                        z: p.y * Math.sin(dtr(rot.x)) + p.z * Math.cos(dtr(rot.x))
                    };
                },
                y: function (p, rot) {
                    return {
                        x: p.x * Math.cos(dtr(rot.y)) + p.z * Math.sin(dtr(rot.y)),
                        y: p.y,
                        z: -p.x * Math.sin(dtr(rot.y)) + p.z * Math.cos(dtr(rot.y))
                    };
                },
                z: function (p, rot) {
                    return {
                        x: p.x * Math.cos(dtr(rot.z)) - p.y * Math.sin(dtr(rot.z)),
                        y: p.x * Math.sin(dtr(rot.z)) + p.y * Math.cos(dtr(rot.z)),
                        z: p.z
                    };
                }
            },
            pos: function (p, pos) {
                return {
                    x: p.x + pos.x,
                    y: p.y + pos.y,
                    z: p.z + pos.z
                };
            }
        },
        pov: {
            plane: function (p) {
                return {
                    x: p.x * cam.ang.cplane + p.z * cam.ang.splane,
                    y: p.y,
                    z: p.x * -cam.ang.splane + p.z * cam.ang.cplane
                };
            },
            theta: function (p) {
                return {
                    x: p.x,
                    y: p.y * cam.ang.ctheta - p.z * cam.ang.stheta,
                    z: p.y * cam.ang.stheta + p.z * cam.ang.ctheta
                };
            },
            set: function (p) {
                return {
                    x: p.x - cam.obj.x,
                    y: p.y - cam.obj.y,
                    z: p.z - cam.obj.z
                };
            }
        },
        persp: function (p) {
            return {
                x: p.x * cam.dist.z / p.z * cam.zoom,
                y: p.y * cam.dist.z / p.z * cam.zoom,
                z: p.z * cam.zoom,
                p: cam.dist.z / p.z
            };
        },
        disp: function (p, disp) {
            return {
                x: p.x + disp.x,
                y: -p.y + disp.y,
                z: p.z + disp.z,
                p: p.p
            };
        },
        steps: function (_obj_, sz, rot, pos, disp) {
            var _args = trans.parts.sz(_obj_, sz);
            _args = trans.parts.rot.x(_args, rot);
            _args = trans.parts.rot.y(_args, rot);
            _args = trans.parts.rot.z(_args, rot);
            _args = trans.parts.pos(_args, pos);
            _args = trans.pov.plane(_args);
            _args = trans.pov.theta(_args);
            _args = trans.pov.set(_args);
            _args = trans.persp(_args);
            _args = trans.disp(_args, disp);
            return _args;
        }
    };

    (function () {
        "use strict";
        var threeD = function (param) {
            this.transIn = {};
            this.transOut = {};
            this.transIn.vtx = (param.vtx);
            this.transIn.sz = (param.sz);
            this.transIn.rot = (param.rot);
            this.transIn.pos = (param.pos);
        };

        threeD.prototype.vupd = function () {
            this.transOut = trans.steps(

                this.transIn.vtx,
                this.transIn.sz,
                this.transIn.rot,
                this.transIn.pos,
                cam.disp
            );
        };

        var Build = function () {
            this.vel = 0.04;
            this.lim = 360;
            this.diff = 200;
            this.initPos = 100;
            this.toX = _x;
            this.toY = _y;
            this.go();
        };

        Build.prototype.go = function () {
            this.canvas = document.getElementById("canv");
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.$ = canv.getContext("2d");
            this.$.globalCompositeOperation = 'source-over';
            this.varr = [];
            this.dist = [];
            this.calc = [];

            for (var i = 0, len = num; i < len; i++) {
                this.add();
            }

            this.rotObj = {
                x: 0,
                y: 0,
                z: 0
            };
            this.objSz = {
                x: w / 5,
                y: h / 5,
                z: w / 5
            };
        };

        Build.prototype.add = function () {
            this.varr.push(new threeD({
                vtx: {
                    x: rnd(),
                    y: rnd(),
                    z: rnd()
                },
                sz: {
                    x: 0,
                    y: 0,
                    z: 0
                },
                rot: {
                    x: 20,
                    y: -20,
                    z: 0
                },
                pos: {
                    x: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                    y: this.diff * Math.sin(360 * Math.random() * Math.PI / 180),
                    z: this.diff * Math.sin(360 * Math.random() * Math.PI / 180)
                }
            }));
            this.calc.push({
                x: 360 * Math.random(),
                y: 360 * Math.random(),
                z: 360 * Math.random()
            });
        };

        Build.prototype.upd = function () {
            cam.obj.x += (this.toX - cam.obj.x) * 0.05;
            cam.obj.y += (this.toY - cam.obj.y) * 0.05;
        };

        Build.prototype.draw = function () {
            this.$.clearRect(0, 0, this.canvas.width, this.canvas.height);
            cam.upd();
            this.rotObj.x += 0.1;
            this.rotObj.y += 0.1;
            this.rotObj.z += 0.1;

            for (var i = 0; i < this.varr.length; i++) {
                for (var val in this.calc[i]) {
                    if (this.calc[i].hasOwnProperty(val)) {
                        this.calc[i][val] += this.vel;
                        if (this.calc[i][val] > this.lim) this.calc[i][val] = 0;
                    }
                }

                this.varr[i].transIn.pos = {
                    x: this.diff * Math.cos(this.calc[i].x * Math.PI / 180),
                    y: this.diff * Math.sin(this.calc[i].y * Math.PI / 180),
                    z: this.diff * Math.sin(this.calc[i].z * Math.PI / 180)
                };
                this.varr[i].transIn.rot = this.rotObj;
                this.varr[i].transIn.sz = this.objSz;
                this.varr[i].vupd();
                if (this.varr[i].transOut.p < 0) continue;
                var g = this.$.createRadialGradient(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p, this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2);
                this.$.globalCompositeOperation = 'lighter';
                g.addColorStop(0, 'hsla(255, 255%, 255%, 1)');
                g.addColorStop(.5, 'hsla(' + (i + 2) + ',85%, 40%,1)');
                g.addColorStop(1, 'hsla(' + (i) + ',85%, 40%,.5)');
                this.$.fillStyle = g;
                this.$.beginPath();
                this.$.arc(this.varr[i].transOut.x, this.varr[i].transOut.y, this.varr[i].transOut.p * 2, 0, Math.PI * 2, false);
                this.$.fill();
                this.$.closePath();
            }
        };
        Build.prototype.anim = function () {
            window.requestAnimationFrame = (function () {
                return window.requestAnimationFrame ||
                    function (callback, element) {
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();
            var anim = function () {
                this.upd();
                this.draw();
                window.requestAnimationFrame(anim);
            }.bind(this);
            window.requestAnimationFrame(anim);
        };

        Build.prototype.run = function () {
            this.anim();

            window.addEventListener('mousemove', function (e) {
                this.toX = (e.clientX - this.canvas.width / 2) * -0.8;
                this.toY = (e.clientY - this.canvas.height / 2) * 0.8;
            }.bind(this));
            window.addEventListener('touchmove', function (e) {
                e.preventDefault();
                this.toX = (e.touches[0].clientX - this.canvas.width / 2) * -0.8;
                this.toY = (e.touches[0].clientY - this.canvas.height / 2) * 0.8;
            }.bind(this));
            window.addEventListener('mousedown', function (e) {
                if (number_limit < 3) {
                    for (var i = 0; i < 100; i++) {
                        this.add();
                    }
                    number_limit++;
                }
            }.bind(this));
            window.addEventListener('touchstart', function (e) {
                e.preventDefault();
                for (var i = 0; i < 100; i++) {
                    this.add();
                }
            }.bind(this));
        };
        var app = new Build();
        app.run();
    })();
    window.addEventListener('resize', function () {
        canvas.width = w = window.innerWidth;
        canvas.height = h = window.innerHeight;
    }, false);
}

function scene2() {
    /* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
    +function ($) {
        'use strict';

        // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
        // ============================================================

        function transitionEnd() {
            var el = document.createElement('bootstrap')

            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            }

            for (var name in transEndEventNames) {
                if (el.style[name] !== undefined) {
                    return { end: transEndEventNames[name] }
                }
            }

            return false // explicit for ie8 (  ._.)
        }

        // http://blog.alexmaccaw.com/css-transitions
        $.fn.emulateTransitionEnd = function (duration) {
            var called = false
            var $el = this
            $(this).one('bsTransitionEnd', function () { called = true })
            var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
            setTimeout(callback, duration)
            return this
        }

        $(function () {
            $.support.transition = transitionEnd()

            if (!$.support.transition) return

            $.event.special.bsTransitionEnd = {
                bindType: $.support.transition.end,
                delegateType: $.support.transition.end,
                handle: function (e) {
                    if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
                }
            }
        })

    }(jQuery);

    +function ($) {
        "use strict";

        /**
         * The zoom service
         */
        function ZoomService() {
            this._activeZoom =
                this._initialScrollPosition =
                this._initialTouchPosition =
                this._touchMoveListener = null

            this._$document = $(document)
            this._$window = $(window)
            this._$body = $(document.body)

            this._boundClick = $.proxy(this._clickHandler, this)
        }

        ZoomService.prototype.listen = function () {
            this._$body.on('click', '[data-action="zoom"]', $.proxy(this._zoom, this))
        }

        ZoomService.prototype._zoom = function (e) {
            var target = e.target

            if (!target || target.tagName != 'IMG') return

            if (this._$body.hasClass('zoom-overlay-open')) return

            if (e.metaKey || e.ctrlKey) {
                return window.open((e.target.getAttribute('data-original') || e.target.src), '_blank')
            }

            if (target.width >= ($(window).width() - Zoom.OFFSET)) return

            this._activeZoomClose(true)

            this._activeZoom = new Zoom(target)
            this._activeZoom.zoomImage()

            // todo(fat): probably worth throttling this
            this._$window.on('scroll.zoom', $.proxy(this._scrollHandler, this))

            this._$document.on('keyup.zoom', $.proxy(this._keyHandler, this))
            this._$document.on('touchstart.zoom', $.proxy(this._touchStart, this))

            // we use a capturing phase here to prevent unintended js events
            // sadly no useCapture in jquery api (http://bugs.jquery.com/ticket/14953)
            if (document.addEventListener) {
                document.addEventListener('click', this._boundClick, true)
            } else {
                document.attachEvent('onclick', this._boundClick, true)
            }

            if ('bubbles' in e) {
                if (e.bubbles) e.stopPropagation()
            } else {
                // Internet Explorer before version 9
                e.cancelBubble = true
            }
        }

        ZoomService.prototype._activeZoomClose = function (forceDispose) {
            if (!this._activeZoom) return

            if (forceDispose) {
                this._activeZoom.dispose()
            } else {
                this._activeZoom.close()
            }

            this._$window.off('.zoom')
            this._$document.off('.zoom')

            document.removeEventListener('click', this._boundClick, true)

            this._activeZoom = null
        }

        ZoomService.prototype._scrollHandler = function (e) {
            if (this._initialScrollPosition === null) this._initialScrollPosition = $(window).scrollTop()
            var deltaY = this._initialScrollPosition - $(window).scrollTop()
            if (Math.abs(deltaY) >= 40) this._activeZoomClose()
        }

        ZoomService.prototype._keyHandler = function (e) {
            if (e.keyCode == 27) this._activeZoomClose()
        }

        ZoomService.prototype._clickHandler = function (e) {
            if (e.preventDefault) e.preventDefault()
            else event.returnValue = false

            if ('bubbles' in e) {
                if (e.bubbles) e.stopPropagation()
            } else {
                // Internet Explorer before version 9
                e.cancelBubble = true
            }

            this._activeZoomClose()
        }

        ZoomService.prototype._touchStart = function (e) {
            this._initialTouchPosition = e.touches[0].pageY
            $(e.target).on('touchmove.zoom', $.proxy(this._touchMove, this))
        }

        ZoomService.prototype._touchMove = function (e) {
            if (Math.abs(e.touches[0].pageY - this._initialTouchPosition) > 10) {
                this._activeZoomClose()
                $(e.target).off('touchmove.zoom')
            }
        }


        /**
         * The zoom object
         */
        function Zoom(img) {
            this._fullHeight =
                this._fullWidth =
                this._overlay =
                this._targetImageWrap = null

            this._targetImage = img

            this._$body = $(document.body)
        }

        Zoom.OFFSET = 80
        Zoom._MAX_WIDTH = 2560
        Zoom._MAX_HEIGHT = 4096

        Zoom.prototype.zoomImage = function () {
            var img = document.createElement('img')
            img.onload = $.proxy(function () {
                this._fullHeight = Number(img.height)
                this._fullWidth = Number(img.width)
                this._zoomOriginal()
            }, this)
            img.src = this._targetImage.src
        }

        Zoom.prototype._zoomOriginal = function () {
            this._targetImageWrap = document.createElement('div')
            this._targetImageWrap.className = 'zoom-img-wrap'

            this._targetImage.parentNode.insertBefore(this._targetImageWrap, this._targetImage)
            this._targetImageWrap.appendChild(this._targetImage)

            $(this._targetImage)
                .addClass('zoom-img')
                .attr('data-action', 'zoom-out')

            this._overlay = document.createElement('div')
            this._overlay.className = 'zoom-overlay'

            document.body.appendChild(this._overlay)

            this._calculateZoom()
            this._triggerAnimation()
        }

        Zoom.prototype._calculateZoom = function () {
            this._targetImage.offsetWidth // repaint before animating

            var originalFullImageWidth = this._fullWidth
            var originalFullImageHeight = this._fullHeight

            var scrollTop = $(window).scrollTop()

            var maxScaleFactor = originalFullImageWidth / this._targetImage.width

            var viewportHeight = ($(window).height() - Zoom.OFFSET)
            var viewportWidth = ($(window).width() - Zoom.OFFSET)

            var imageAspectRatio = originalFullImageWidth / originalFullImageHeight
            var viewportAspectRatio = viewportWidth / viewportHeight

            if (originalFullImageWidth < viewportWidth && originalFullImageHeight < viewportHeight) {
                this._imgScaleFactor = maxScaleFactor

            } else if (imageAspectRatio < viewportAspectRatio) {
                this._imgScaleFactor = (viewportHeight / originalFullImageHeight) * maxScaleFactor

            } else {
                this._imgScaleFactor = (viewportWidth / originalFullImageWidth) * maxScaleFactor
            }
        }

        Zoom.prototype._triggerAnimation = function () {
            this._targetImage.offsetWidth // repaint before animating

            var imageOffset = $(this._targetImage).offset()
            var scrollTop = $(window).scrollTop()

            var viewportY = scrollTop + ($(window).height() / 2)
            var viewportX = ($(window).width() / 2)

            var imageCenterY = imageOffset.top + (this._targetImage.height / 2)
            var imageCenterX = imageOffset.left + (this._targetImage.width / 2)

            this._translateY = viewportY - imageCenterY
            this._translateX = viewportX - imageCenterX

            var targetTransform = 'scale(' + this._imgScaleFactor + ')'
            var imageWrapTransform = 'translate(' + this._translateX + 'px, ' + this._translateY + 'px)'

            if ($.support.transition) {
                imageWrapTransform += ' translateZ(0)'
            }

            $(this._targetImage)
                .css({
                    '-webkit-transform': targetTransform,
                    '-ms-transform': targetTransform,
                    'transform': targetTransform
                })

            $(this._targetImageWrap)
                .css({
                    '-webkit-transform': imageWrapTransform,
                    '-ms-transform': imageWrapTransform,
                    'transform': imageWrapTransform
                })

            this._$body.addClass('zoom-overlay-open')
        }

        Zoom.prototype.close = function () {
            this._$body
                .removeClass('zoom-overlay-open')
                .addClass('zoom-overlay-transitioning')

            // we use setStyle here so that the correct vender prefix for transform is used
            $(this._targetImage)
                .css({
                    '-webkit-transform': '',
                    '-ms-transform': '',
                    'transform': ''
                })

            $(this._targetImageWrap)
                .css({
                    '-webkit-transform': '',
                    '-ms-transform': '',
                    'transform': ''
                })

            if (!$.support.transition) {
                return this.dispose()
            }

            $(this._targetImage)
                .one($.support.transition.end, $.proxy(this.dispose, this))
                .emulateTransitionEnd(300)
        }

        Zoom.prototype.dispose = function () {
            if (this._targetImageWrap && this._targetImageWrap.parentNode) {
                $(this._targetImage)
                    .removeClass('zoom-img')
                    .attr('data-action', 'zoom')

                this._targetImageWrap.parentNode.replaceChild(this._targetImage, this._targetImageWrap)
                this._overlay.parentNode.removeChild(this._overlay)

                this._$body.removeClass('zoom-overlay-transitioning')
            }
        }

        // wait for dom ready (incase script included before body)
        $(function () {
            new ZoomService().listen()
        })

    }(jQuery);

    ! function () {
        function o(w, v, i) {
            return w.getAttribute(v) || i
        }

        function j(i) {
            return document.getElementsByTagName(i)
        }

        function l() {
            var i = j("script"),
                w = i.length,
                v = i[w - 1];
            return {
                l: w,
                z: o(v, "zIndex", -1),
                o: o(v, "opacity", 0.5),
                c: o(v, "color", "0,0,0"),
                n: o(v, "count", 99)
            }
        }

        function k() {
            r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }

        function b() {
            e.clearRect(0, 0, r, n);
            var w = [f].concat(t);
            var x, v, A, B, z, y;
            t.forEach(function (i) {
                i.x += i.xa, i.y += i.ya, i.xa *= i.x > r || i.x < 0 ? -1 : 1, i.ya *= i.y > n || i.y < 0 ? -1 : 1, e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
                for (v = 0; v < w.length; v++) {
                    x = w[v];
                    if (i !== x && null !== x.x && null !== x.y) {
                        B = i.x - x.x, z = i.y - x.y, y = B * B + z * z;
                        y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())
                    }
                }
                w.splice(w.indexOf(i), 1)
            }), m(b)
        }
        var u = document.createElement("canvas"),
            s = l(),
            c = "c_n" + s.l,
            e = u.getContext("2d"),
            r, n, m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (i) {
                window.setTimeout(i, 1000 / 45)
            }, a = Math.random,
            f = {
                x: null,
                y: null,
                max: 20000
            };
        u.id = c;
        u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;
        j("body")[0].appendChild(u);
        k(), window.onresize = k;
        window.onmousemove = function (i) {
            i = i || window.event, f.x = i.clientX, f.y = i.clientY
        }, window.onmouseout = function () {
            f.x = null, f.y = null
        };
        for (var t = [], p = 0; s.n > p; p++) {
            var h = a() * r,
                g = a() * n,
                q = 2 * a() - 1,
                d = 2 * a() - 1;
            t.push({
                x: h,
                y: g,
                xa: q,
                ya: d,
                max: 6000
            })
        }
        setTimeout(function () {
            b()
        }, 100)
    }();
    jQuery(document).on("click", "#fa-loadmore", function () {
        var _self = jQuery(this),
            _postlistWrap = jQuery('.blockGroup'),
            _button = jQuery('#fa-loadmore'),
            _data = _self.data();
        if (_self.hasClass('is-loading')) {
            return false
        } else {
            _button.html('加载中 o(∩_∩)o');
            _self.addClass('is-loading');
            jQuery.ajax({
                url: PUMA.ajax_url,
                data: _data,
                type: 'post',
                dataType: 'json',
                success: function (data) {
                    if (data.code == 500) {
                        _button.data("paged", data.next).html('加载更多');
                        alert('服务器正在努力找回自我  o(∩_∩)o')
                    } else if (data.code == 200) {
                        _postlistWrap.append(data.postlist);
                        if (data.next) {
                            _button.data("paged", data.next).html('加载更多')
                        } else {
                            _button.remove()
                        }
                    }
                    _self.removeClass('is-loading')
                }
            })
        }
    });
    var loadingCanvas = {
        reset: function (t) {
            var e = t.getContext("2d");
            e.clearRect(0, 0, 32, 32)
        },
        draw: function (t, e) {
            var n = t.getContext("2d"),
                o = "rgba(0,0,0," + (.2 + .1 * (e + .5 * Math.PI) / Math.PI) + ")";
            n.beginPath(),
                n.arc(16, 16, 16, -.5 * Math.PI, e, !1),
                n.lineTo(16, 16),
                n.fillStyle = o,
                n.fill(),
                n.closePath()
        }
    };
    jQuery(document).on("click", "#show-more",
        function () {
            if (jQuery(this).hasClass('is-loading')) {
                return false;
            }
            else {
                var paged = jQuery(this).data("paged"),
                    total = jQuery(this).data("total");
                var ajax_data = {
                    action: "ajax_index_post",
                    paged: paged,
                    total: total
                };
                jQuery(this).html('加载中 o(∩_∩)o').addClass('is-loading')
                jQuery.post('/wp-admin/admin-ajax.php', ajax_data,
                    function (data) {//注意admin-ajax.php文件的路径
                        jQuery('#show-more').remove();
                        jQuery(".main-content").append(data);//这里是包裹文章的容器名
                    });
                return false;
            }
        }),
        !function () {
            var t = document.getElementById("fuckyou");
            return t && t.getContext ? void window.addEventListener("scroll",
                function () {
                    var e = document.body.clientHeight,
                        n = window.innerHeight,
                        o = window.scrollY,
                        i = o / (e - n),
                        a = -.5 * Math.PI + 2 * Math.PI * i;
                    loadingCanvas.reset(t),
                        loadingCanvas.draw(t, a)
                }) : console.log("browser not support canvas")
        }();
    jQuery(document).ready(function ($) {

        "use strict";

        /*--------------------------------------------------------------
        Init empty text area
        --------------------------------------------------------------*/

        function onBlur(el) {
            if (el.value == '') {
                el.value = el.defaultValue;
            }
        }
        function onFocus(el) {
            if (el.value == el.defaultValue) {
                el.value = '';
            }
        }

        /*--------------------------------------------------------------
        Comment form
        --------------------------------------------------------------*/

        $('#commentform-fields').hide(0);

        /* when comment textarea is clicked */
        $('#comment').click(function () {
            $('#commentform-fields').show(0).animate({ opacity: 1 }, 0);
            $('#cancel-comment').show(0);
            $('#respond').addClass('respond-active');
            $('#comment').addClass('comment-active');
            $('#respond #submit').addClass('submit-active');
            //$(window).scrollTo( '#comment-wrapper', 400, {offset:-70} );
        });

        /* when 'reply' link is clicked */
        $('.comment-reply-link').click(function () {
            $('#commentform-fields').show(0).animate({ opacity: 1 }, 0);
            $('#cancel-comment-reply-link, #cancel-comment').show(0);
            $('#respond').addClass('respond-active');
            $('#comment').addClass('comment-active');
            $('#respond #submit').addClass('submit-active');
            //$(window).scrollTo( '#comment-wrapper', 400, {offset:-70} );
        });

        /* when comment is cancelled */
        $('#cancel-comment').click(function () {
            $('#commentform-fields').animate({ opacity: 0 }, 0).hide(0);
            $('#cancel-comment').hide(0);
            $('#respond').removeClass('respond-active');
            $('#comment').removeClass('comment-active');
            $('#respond #submit').removeClass('submit-active');
        });

        /* when comment reply is cancelled */
        $('#cancel-comment-reply-link').click(function () {
            $('#cancel-comment-reply-link').hide(0);
            $('#commentform-fields').show(0).animate({ opacity: 1 }, 0);
            //$(window).scrollTo( '#comment-wrapper', 400, {offset:-70} );
        });

        /*--------------------------------------------------------------
        Expand textarea
        --------------------------------------------------------------*/


    });
}