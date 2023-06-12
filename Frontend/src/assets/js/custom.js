jQuery(document).ready(function($) {

    // var widthWindow = $(window).width();
    // $('.overflow-hidden-js').css({ 'width': widthWindow, 'overflow': 'hidden' });
    // $(window).resize(function() {
    //     var widthWindow = $(window).width();
    //     $('.overflow-hidden-js').css({ 'width': widthWindow, 'overflow': 'hidden' });
    // });

    // $('.loader').delay(1500).fadeOut("slow");
    // $('.loading').delay(2000).fadeOut("slow");

    // $('.pr-header').load('components/pr-header.html');
    // $('.pr-sidenav').load('components/pr-sidenav.html');

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="popover"]').on('click', function (e) {
      $('[data-toggle="popover"]').not(this).popover('hide');
    });
    $('.carousel').carousel();

    // $('.pr-custom-dropdown-menu').on('click', function(event){
    //   event.stopPropagation();
    //   event.preventDefault();
    // });
    $('.pr-custom-dropdown > .dropdown-toggle').on('click', function (event) {
      $('.pr-custom-dropdown > .dropdown-toggle').not(this).next('.pr-custom-dropdown-menu').removeClass('show');
      $('.pr-custom-dropdown > .dropdown-toggle').not(this).removeClass('active');
      if ($(this).next('.pr-custom-dropdown-menu').hasClass('show')) {
        $(this).next('.pr-custom-dropdown-menu').removeClass('show');
        $(this).removeClass('active');
      } else {
        $(this).toggleClass('active');
        $(this).next('.pr-custom-dropdown-menu').toggleClass('show');
      }      
    });

    $('.pr-accordion2 > .card').on('click', function (event) {
      // if ($(this).not(this).hasClass('actv')) {
      //   $(this).toggleClass('actv');
      // } else {
      //   alert('do something');
      //   $('.pr-accordion2 > .card').addClass('actv');
      // }
      $('.pr-accordion2 > .card').not(this).addClass('actv');
      $(this).toggleClass('actv');
      $(this).find('.collapse').toggleClass('show');
    });


    //Range slider setup
    $('input[type=range]').rangeslider({
      polyfill: false,
      rangeClass: 'rangeslider',
      disabledClass: 'rangeslider--disabled',
      horizontalClass: 'rangeslider--horizontal',
      verticalClass: 'rangeslider--vertical',
      fillClass: 'rangeslider__fill',
      handleClass: 'rangeslider__handle'
    });

    //Functionality for a value feedback
    var output = $('output')[0];

    $(document).on('input', 'input[type="range"]', function(e) {
      output.innerHTML = e.currentTarget.value;
    });

    // alert("working");
      
});

// (function($) {
//   "use strict";
//   var fullHeight = function() {
//       $('.js-fullheight').css('height', $(window).height());
//       $(window).resize(function(){
//           $('.js-fullheight').css('height', $(window).height());
//       });
//   };
//   fullHeight();
//   $('#sidebarcollapse').on('click', function () {
//       $('body').toggleClass('pr-sidebar-active');
//   });
// })(jQuery);
