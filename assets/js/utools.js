var resourceUri = 'https://resource.u-tools.cn/currentversion/'

function getWin64Client(){
    $.get(resourceUri + "latest.yml?t=" + new Date().getTime(), null, function(resp){
        let obj = jsyaml.load(resp)
        obj.url = obj.files[0].url
        render('win64', obj)
    })
}

function getWin32Client(){
    $.get(resourceUri + "latest-ia32.yml?t=" + new Date().getTime(), null, function(resp){
        let obj = jsyaml.load(resp)
        obj.url = obj.files[0].url
        render('win32', obj)
    })
}

function getMacosClient(){
    $.get(resourceUri + "latest-mac.yml?t=" + new Date().getTime(), null, function(resp){
        let obj = jsyaml.load(resp)
        obj.url = obj.files[1].url
        render('macos', obj)
    })
}

function getLinuxClient(){
    $.get(resourceUri + "latest-linux.yml?t=" + new Date().getTime(), null, function(resp){
        let obj = jsyaml.load(resp)
        obj.url = obj.files[0].url
        render('linux', obj)
    })
}

function render(os, obj){
    $('.v-' + os).text(obj.version)
    $('.u-' + os).text(timeFormate(obj.releaseDate))
    $('.d-' + os).attr('href', resourceUri + obj.url)
}

function timeFormate(time){
    return time.substr(0, 10)
}

function init(){
    getWin64Client()
    getMacosClient()
    getWin32Client()
    getLinuxClient()
}

$.fn.seamlessRolling = function (option) {
    function mixinsAnimationFrame(type) {
        if (type === 'request') {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    var currTime = +new Date,
                        delay = Math.max(1000 / 60, 1000 / 60 - (currTime - lastTime));
                    lastTime = currTime + delay;
                    return setTimeout(callback, delay);
                };
        } else {
            return window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
        }
    }
    function seamlessRolling($El, speed) {
        // 目标位置
        var $items = $El,
            target = $items.width();
        // clone 元素
        $items.html($items.html() + $items.html());
        var timer = null, scrollX = 0;
        function adAni() {
            timer = nextFrame(function () {
                scrollX += speed;
                if (scrollX >= target) {
                    scrollX = 0;
                }
                $items.scrollLeft(scrollX);
                adAni();
            });
        }
        adAni();
    }
    var lastTime = 0, nextFrame = mixinsAnimationFrame('request'), cancelFrame = mixinsAnimationFrame();
    var _option = $.extend({
        speed: 2
    }, option);
    seamlessRolling(this, _option.speed);
    return this;
};



$(".video-cover .video-play-icon").on("click", function() {
    var a = $(this)
      , c = a.closest(".video-cover");
    if (c.find("video").length) {
        var d = c.find("video").get(0);
        return c.addClass("reveal-video"),
        d.play(),
        !1
    }
    if (c.find("iframe").length) {
        var e = c.find("iframe");
        return e.attr("src", e.attr("data-src")),
        c.addClass("reveal-video"),
        !1
    }
})