'use strict';

jQuery(window).bind('load', function () {
  
});

jQuery(document).ready(function ($) {
    console.log('hello');

    var communitySlider = $('.community__slider');

    communitySlider.slick({
        dots: true,
        arrows: false,
        slidesToShow: 1,
    });

    $('.community__arrow--left').on('click', function () {
        communitySlider.slick('slickPrev');
    });

    $('.community__arrow--right').on('click', function () {
        communitySlider.slick('slickNext');
    });
 
});

/*Заглушки для видео с ютуба*/
var iframeArea = $(".video");

iframeArea.on("click", function (e) {
    e.preventDefault();
    var videoSrc = $(this).find(".video__link").attr("data-link");
    $(this).html('<iframe width="640" height="365" src="' + videoSrc + '?&autoplay=1" frameborder="0" allowfullscreen></iframe>')
});
