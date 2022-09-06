'use strict';

require('script-loader!./plugins/lazyYT');

(function($) {

    const header = document.getElementById('masthead');
    const body = document.getElementsByTagName('body')[0];

    const spaceName = {};

    spaceName.init = function() {
        this.ajaxLoading();
        this.slider();
        this.smartMenu();
        this.closeCartDrawer();
        this.navTree();
        this.stickySidebar();
        this.accordion();
        this.tab();
        this.lazyYoutube();
        this.initIsotope();
    };

    /**
     * 判断是否为移动端
     */
    spaceName.isMobile = function(opts) {
        const mobileRE = /(android|bb\d+|meego).+mobile|armv7l|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series[46]0|samsungbrowser|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i;
        const notMobileRE = /CrOS/;

        const tabletRE = /android|ipad|playbook|silk/i;

        if (!opts) opts = {};
        let ua = opts.ua;
        if (!ua && typeof navigator !== 'undefined') ua = navigator.userAgent;
        if (ua && ua.headers && typeof ua.headers['user-agent'] === 'string') {
            ua = ua.headers['user-agent'];
        }
        if (typeof ua !== 'string') return false;

        let result =
                (mobileRE.test(ua) && !notMobileRE.test(ua)) ||
                (!!opts.tablet && tabletRE.test(ua));

        if (
            !result &&
            opts.tablet &&
            opts.featureDetect &&
            navigator &&
            navigator.maxTouchPoints > 1 &&
            ua.indexOf('Macintosh') !== -1 &&
            ua.indexOf('Safari') !== -1
        ) {
            result = true;
        }

        return result;
    };

    /**
     * Ajax loading style
     */
    spaceName.ajaxLoading = function() {
        const $loading = $('#ajax-loading').hide();

        $(document).ajaxStart(function() {
            $loading.show();
        }).ajaxStop(function() {
            $loading.hide();
        });
    };

    /**
     * Smart dropdown menu
     */
    spaceName.smartMenu = function() {
        //@see https://www.smartmenus.org/docs/
        $('.sm, .product-categories').smartmenus({
            showFunction: function($ul, complete) {
                $ul.slideDown(100, complete);
            },
            hideFunction: function($ul, complete) {
                $ul.hide();
            },
            showTimeout : 0,
            hideTimeout : 100,
        });
    };


    spaceName.slider = function(){
        /*------------------------------------
     3. Slider
 --------------------------------------*/

        /*---------------------
        Main Slider
        -----------------------*/
        if ($(".swiper-main-slider").length !== 0) {
            //Slider Animated Caption
            var swiper = new Swiper('.wprs-swiper-container', {
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                simulateTouch: true,
                autoplay: 5000,
                speed: 1000,
                onSlideChangeEnd: function (swiper) {

                }
            });

            swiper.on('slideChange', function () {
                $('.swiper-slide').each(function () {
                    if ($(this).index() === swiper.activeIndex) {
                        // Fadein in active slide
                        $(this).find('.slider-content').fadeIn(300);
                    } else {
                        // Fadeout in inactive slides
                        $(this).find('.slider-content').fadeOut(300);
                    }
                });
            });
        }

        /*---------------------
        Main Slider Fade Effect
        -----------------------*/
        if ($(".swiper-main-slider-fade").length !== 0) {
            //Slider Animated Caption
            var swiper = new Swiper('.wprs-swiper-container', {
                effect: 'fade',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 0,
                loop: true,
                simulateTouch: true,
                autoplay: 5000,
                speed: 1000,
            });

            swiper.on('slideChange', function () {
                $('.swiper-slide').each(function () {
                    if ($(this).index() === swiper.activeIndex) {
                        // Fadein in active slide
                        $(this).find('.slider-content').fadeIn(300);
                    } else {
                        // Fadeout in inactive slides
                        $(this).find('.slider-content').fadeOut(300);
                    }
                });
            });
        }

        /*---------------------
        Parallax Slider
        -----------------------*/
        if ($("#swiper-parallax").length !== 0) {
            var swiper = new Swiper('.wprs-swiper-container', {
                parallax: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true,
                },
                paginationClickable: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 0,
                loop: false,
                simulateTouch: true,
                autoplay: false,
                speed: 1000,
            });
        }
    };


    spaceName.initIsotope = function(){
        if ($(".rs-gallery-items").length > 0) {

            var jQuerygrid = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                resizable: true,
                transformsEnabled: true,
                transitionDuration: "700ms"
            });

            jQuerygrid.imagesLoaded(function () {
                jQuerygrid.isotope("layout");
            });

            $(".gallery-filters").on("click", "a.gallery-filter", function (b) {
                b.preventDefault();
                var c = $(this).attr("data-filter");
                jQuerygrid.isotope({
                    filter: c
                });
                $(".gallery-filters a").removeClass("gallery-filter-active");
                $(this).addClass("gallery-filter-active");
            });

        }
    }


    /**
     * Sticky Sidebar
     *
     * div.js-sticky-left>div.theiaStickySidebar | div.js-sticky-right>div
     */
    spaceName.stickySidebar = function() {
        if ($(document).width() > 1024 && $.isFunction($.fn.theiaStickySidebar)) {
            $('.rs-sticky-left, .rs-sticky-right').theiaStickySidebar({
                additionalMarginTop: 32,
            });
        }
    };

    /**
     * Accordion
     *
     * ul.rs-accordion>li>h3+div.rs-accordion__content
     */
    spaceName.accordion = function() {
        $('.rs-accordion > li > .rs-accordion__content').hide();

        $('.rs-accordion > li').click(function() {
            if ($(this).hasClass('active')) {
                $(this).
                    removeClass('active').
                    find('.rs-accordion__content').
                    slideUp();
            } else {
                $('.rs-accordion > li.active .rs-accordion__content').slideUp();
                $('.rs-accordion > li.active').removeClass('active');
                $(this).
                    addClass('active').
                    find('.rs-accordion__content').
                    slideDown();
            }
            return false;
        });
    };

    /**
     * Simple tab
     *
     * ul.rs-tab__nav>li*3>a[href=#rs-$]>{Nav-$}
     * div.rs-tab__contents>div.rs-tab__content#rs-$*3>{Content-$}
     */
    spaceName.tab = function() {
        // Show the first tab and hide the rest
        $('.rs-tab__nav li:first-child').addClass('active');
        $('.rs-tab__content').hide();
        $('.rs-tab__contents').find('.rs-tab__content:first').show();

        // Click function
        $('.rs-tab__nav li').click(function() {
            $('.rs-tab__nav li').removeClass('active');
            $(this).addClass('active');
            $('.rs-tab__content').hide();

            var activeTab = $(this).find('a').attr('href');
            $(activeTab).fadeIn();
            return false;
        });
    };

    /**
     * Lazy Load Youtube Video
     */
    spaceName.lazyYoutube = function() {

        if ($.isFunction($.fn.lazyYT)) {
            $('.rs-lazyYT').lazyYT({
                youtube_parameters: 'rel=0',
                loading_text      : 'Loading...',
                display_title     : false,
                default_ratio     : '16:9',
                display_duration  : false,
                video_loaded_class: 'lazyYT-video-loaded',
                container_class   : 'lazyYT-container',
            });
        }


        // 给 iframe 添加 wrap, 以实现自适应
         $('.type-docs iframe').wrap("<div class='rs-iframe-wrap' />");

    };


    /**
     * Play video in manigicPopup
     */
    spaceName.popup = function() {
        if ($.isFunction($.fn.magnificPopup)) {
            $('.js-popup-youtube').magnificPopup({
                disableOn   : 700,
                type        : 'iframe',
                mainClass   : 'mfp-fade',
                removalDelay: 160,
                preloader   : false,

                fixedContentPos: false,
            });
        }
    };

    /**
     * Header sticky
     */
    spaceName.navSticky = function() {
        const sticky = header.offsetTop + 100;

        if (window.scrollY > sticky) {
            header.classList.add('is-sticky');
            body.classList.add('is-sticky');
        } else {
            header.classList.remove('is-sticky');
            body.classList.remove('is-sticky');
        }
    };

    /**
     * Close cart drawer
     */
    spaceName.closeCartDrawer = function() {
        $('.close-drawer').on('click', function() {
            $('body').removeClass('mobile-toggled').removeClass('drawer-open');
        });
    };

    /**
     * Nav accordion
     */
    spaceName.navTree = function() {
        const $navTreeEl = $(
            '.widget_nav_menu, .widget_product_categories, .widget-nav_menu');
        if ($navTreeEl.length > 0) {
            $navTreeEl.each(function() {

                let element        = $(this),
                    elementSpeed   = element.attr('data-speed'),
                    elementEasing  = element.attr('data-easing'),
                    currentChild   = element.find(
                        'ul li.current_page_parent .children, ul > li.current_page_item .children, ul > li.current-menu-item .children,  ul > li.current-menu-parent .children, ul > li.current-cat-parent .children, ul > li.current-cat.cat-parent .children'),
                    currentSubmenu = element.find(
                        'ul li.current_page_parent .sub-menu, ul > li.current_page_item .sub-menu, ul > li.current-menu-item .sub-menu, ul > li.current-menu-parent .sub-menu, ul > li.current-cat-parent .sub-menu, ul > li.current-cat.cat-parent .sub-menu');

                // 动画速度
                if (!elementSpeed) {
                    elementSpeed = 250;
                }

                // 动画效果
                if (!elementEasing) {
                    elementEasing = 'swing';
                }

                // 添加 sub-menu 类，添加箭头
                element.find('ul li:has(ul)').addClass('sub-menu');
                element.find('ul li:has(ul) > a').
                    append(
                        '<span class="icon"><i class="wpion-angle-down"></i></span>');

                // 打开当前菜单的父级
                element.find(
                    'ul li.current_page_ancestor, ul li.current_page_parent, ul > li.current_page_item, ul > li.current-menu-parent, ul > li.current-cat-parent').
                    addClass('active');

                currentChild.slideDown(Number(elementSpeed), elementEasing);
                currentSubmenu.slideDown(Number(elementSpeed), elementEasing);

                element.find('ul > li.current-menu-item').
                    parent().
                    parent().
                    slideDown(Number(elementSpeed), elementEasing);
                element.find('ul > li.current-menu-item').
                    parent().
                    parent('li').
                    addClass('active');
                element.find('ul > li.current-cat').
                    parent().
                    parent('li').
                    addClass('active');

                // 鼠标划过还是点击显示子菜单
                if (element.hasClass('on-hover')) {
                    element.find('ul li:has(ul):not(.active)').
                        hover(function() {
                            $(this).
                                children('ul').
                                stop(true, true).
                                slideDown(Number(elementSpeed), elementEasing);
                        }, function() {
                            $(this).
                                children('ul').
                                delay(250).
                                slideUp(Number(elementSpeed), elementEasing);
                        });
                } else {
                    // 如果需要父级菜单不能点击，把点击元素设置为 a
                    element.find('ul li:has(ul) > a .icon').click(function(e) {
                        const childElement = $(this).parent();
                        element.find('ul li').
                            not(childElement.parents()).
                            removeClass('active');
                        childElement.parent().
                            children('ul').
                            slideToggle(Number(elementSpeed), elementEasing,
                                function() {
                                    $(this).find('ul').hide();
                                    $(this).
                                        find('li.active').
                                        removeClass('active');
                                });
                        element.find('ul li > ul').
                            not(childElement.parent().children('ul')).
                            not(childElement.parents('ul')).
                            slideUp(Number(elementSpeed), elementEasing);
                        childElement.parent('li:has(ul)').toggleClass('active');
                        e.preventDefault();
                    });
                }
            });
        }
    };


    /**
     * Play video in manigicPopup
     */
    spaceName.wow = function() {
        if ($.isClass('WOW')) {
            new WOW().init();
        }
    };

    $(document).ready(function() {
        spaceName.init();
    });

    window.onscroll = function() {
        spaceName.navSticky();
    };

})(jQuery);
