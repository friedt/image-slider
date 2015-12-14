/**
 * Created by friee on 27-10-2015.
 * image carousel made in plain javascript, so no jquery needed
 * put an 'data-images' attribute with a list of image names on element .js-image-slider
 * put an element which invokes the modal, after invoked the images start loading.
 * After loading all images the arrow buttons are displayed
 * this image carousel will work from IE9+
 *
 * the modal dialog used here can have it's own classnames, it does not rely on that
 *
 * note: addEventHandler, hasClass and removeClass are commonly used as global functions who can be moved to a generic file if you like
 */

var lpImageCarousel = (function () {

    'use strict';
    var imageSlider, sliderInvoker, modal, imageContent, next, prev, data, loadedImage = 1;

    function addEventHandler(elem, eventType, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(eventType, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + eventType, handler);
        }
    }

    function hasClass(element, cls) {
        return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
    }

    function removeClass(element, cls) {
        if (hasClass(element, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            element.className = element.className.replace(reg, ' ');
        }
    }


    function init() {
        var images = data,
            img = [],
            len = images.length,
            dir = 'images/';

        for (var i = 0; i < len; i++) {
            img[i] = document.createElement('img');
            images[i] = images[i].replace(' ', '');
            if (i === 0) {
                img[i].src = dir + images[i];
                var image = imageContent.querySelector('.current-image');
                image.src = img[i].src;

            } else {
                loadImage(img[i], len);
                img[i].src = dir + images[i];
                imageContent.innerHTML += '<img src="' + img[i].src + '" class="hidden" />';


            }

        }
    }

    function loadImage(img, len, i){
        img.onload = function () {
            imageLoaded(len);
        };
    }

    function imageLoaded(len) {
        var loader = imageSlider.querySelector('.loader');
        loader.className = 'loader';
        loader.className += ' is-visible';
        loadedImage++;

        if (loadedImage === len) {
            removeClass(loader, 'is-visible');
            startSlider();
        }
    }

    function startSlider() {
        next.className += ' is-visible';
        prev.className += ' is-visible';
        addEventHandler(imageSlider, 'click', slideImage);
    }

    function slideImage(e) {
        var target = e.target,
            currentImage = imageContent.querySelector('.current-image'),
            nextElm = currentImage.nextElementSibling,
            prevElm = currentImage.previousElementSibling;


        if (hasClass(target, 'js-next')) {
            showImage(nextElm, currentImage);
        }

        if (hasClass(target, 'js-prev')) {
            showImage(prevElm, currentImage);
        }
    }

    function showImage(elm, current){
        if (elm === null) {
            removeClass(current, 'current-image');
            current = imageContent.children[0].className = 'current-image';
        } else {
            current.className = 'hidden';
            removeClass(current, 'current-image');
            elm.className += ' current-image';
        }
    }

    function invokeSlider (e) {

        var elm = e.target,
            id = elm.hash.replace('#', '');
        document.getElementById(id).className += ' is-visible'; // show modal dialog
        imageSlider = document.getElementById(id).querySelector('.js-image-slider');
        imageContent = imageSlider.querySelector('.image-content');
        next = imageSlider.querySelector('.js-next');
        prev = imageSlider.querySelector('.js-prev');
        data = imageSlider.getAttribute('data-images').split(',');
        lpImageCarousel.init();
    }

    document.addEventListener('DOMContentLoaded',function(){

        sliderInvoker = document.querySelectorAll('.js-show-slider');
        var len = sliderInvoker.length,
            i;

        for( i = 0; i < len; i++) {
            sliderInvoker[i].addEventListener('click', invokeSlider);
        }

    });

    return {
        init: init
    };


}());

