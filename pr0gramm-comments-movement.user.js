// ==UserScript==
// @name         pr0gramm-comments-resize
// @namespace    http://pr0gramm.com/user/Lukariuss
// @version      1.0.0
// @description  resize Comments
// @author       Lukariuss
// @match        http://pr0gramm.com/*
// @match        https://pr0gramm.com/*
// @grant        none
// ==/UserScript==


function init(){

    $(".comments-switch").hide();

    var commentCount;
    var itemComments;
    var resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizer.style.width = '5px';
    resizer.style.height = '52px';
    resizer.style.background = '#ee4d2e';
    resizer.style.position = 'absolute';
    resizer.style.right = 0;
    resizer.style.bottom = 0;
    resizer.style.cursor = 'ew-resize';
    resizer.style.marginRight = '0px';
    resizer.addEventListener('mousedown', initResize, false);

    var widthCommentCount = $(".comment-count").width();
    var widthItemComments = $(".item-comments").width() + 20;

    refreshElements();

    window.addEventListener('commentsLoaded', refreshElements);


    function refreshElements()
    {
        commentCount = $(".comment-count").get(0);
        itemComments = $(".item-comments").get(0);

        commentCount.append(resizer);

        itemComments.style.width = widthCommentCount;
        commentCount.style.width = widthItemComments;
    }


    function initResize(e) {
        window.addEventListener('mousemove', Resize, false);
        window.addEventListener('mouseup', stopResize, false);
    }
    function Resize(e) {
        window.getSelection().removeAllRanges();
        commentCount.style.width  = widthCommentCount = (e.clientX - commentCount.offsetLeft) + 'px';
        itemComments.style.width = widthItemComments = (e.clientX - itemComments.offsetLeft+20) + 'px';

    }
    function stopResize(e) {
        window.removeEventListener('mousemove', Resize, false);
        window.removeEventListener('mouseup', stopResize, false);
    }
}

(function() {

    applyWhenElementExists(".comment-count", init, 50);

    function applyWhenElementExists(selector, myFunction, intervalTime) {
        var interval = setInterval(function() {
            if (jQuery(selector).length > 0) {
                myFunction();
                clearInterval(interval);
            }
        }, intervalTime);
    }

})();
