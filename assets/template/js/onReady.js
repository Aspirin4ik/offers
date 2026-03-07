var ui = {
  

  mainSlider: function() {
    if ($('.top-slider').length>0) {
      $('.top-slider').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 1000,
          arrows: true,
          dots: false,
          fade: true,
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                arrows: false
              }
            }]
      })
    }
  },

  carousel: function() {
    if ($('.premium-container .carousel').length>0) {
      $('.premium-container .carousel').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 800,
          arrows: false,
          swipeToSlide: false,
          draggable: false,
          adaptiveHeight: true,
          asNavFor: '.carousel-info',
          centerMode: true,
          centerPadding: '0',
            responsive: [
            {
              breakpoint: 992,
              settings: {}
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                arrows: false
              }
            }
          ]
      });
      $('.premium-container .carousel-info').slick({
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          swipeToSlide: false,
          draggable: false,
          autoplaySpeed: 6000,
          speed: 800,
          arrows: true,
          adaptiveHeight: true,
          asNavFor: '.carousel',
          centerMode: true,
          centerPadding: '0',
      });
    }
    if ($('.reviews-container  .carousel').length>0) {
      $('.reviews-container .carousel').slick({
          infinite: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: false,
          autoplaySpeed: 6000,
          speed: 800,
          arrows: false,
          adaptiveHeight: true,
          dots: true,
      });
    }
    
    if ($('.brands-carousel').length>0) {
      $('.brands-carousel').slick({
          infinite: true,
          slidesToShow: 5,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 6000,
          speed: 800,
          arrows: false,
          swipeToSlide: true,
          responsive: [
            {
              breakpoint: 992,
              settings: {
                  slidesToShow: 4
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 2
              }
            }
          ]
      });
    }
    
    
    
    
    
  },

  

  akardion: function() {
    $('.akardion .head').click(function(e){
      $(this).closest('.akardion').find('.first-open').removeClass('first-open');
      $(this).closest('.item').addClass('open').siblings().removeClass('open');
      $(this).closest('.item').find('.desc').stop().slideDown();
      $(this).closest('.item').siblings().find('.desc').stop().slideUp();
      e.preventDefault();
    });
  },


  validation: function() {
    $('.rf').each(function(){
      var item = $(this),

      btn = item.find('.btn');
      function checkInput(){
        item.find('select.required').each(function(){
          if($(this).val() == '0'){

            // Если поле пустое добавляем класс-указание
            $(this).parents('.form-group').addClass('error');
            $(this).parents('.form-group').find('.error-message').show();

          } else {
            // Если поле не пустое удаляем класс-указание
            $(this).parents('.form-group').removeClass('error');
          }
        });
        item.find('input[type=text].required').each(function(){
          if($(this).val() != ''){
            // Если поле не пустое удаляем класс-указание
            $(this).removeClass('error');
          } else {
            // Если поле пустое добавляем класс-указание
            $(this).addClass('error');
            $(this).parent('.form-group').find('.error-message').show();

          }
        });

        item.find('input[type=password].required').each(function(){
          if($(this).val() != ''){
            // Если поле не пустое удаляем класс-указание
            $(this).removeClass('error');
          } else {
            // Если поле пустое добавляем класс-указание
            $(this).addClass('error');
            $(this).parent('.form-group').find('.error-message').show();

          }
        });
        if($('.pass1',item).length != 0){
          var pass01 = item.find('.pass1').val();
          var pass02 = item.find('.pass2').val();
          if(pass01 != pass02){
            $('.pass1, .pass2',item).addClass('error');


            $('.pass1').parent('.form-group').find('.error-message').show();
            $('.pass2').parent('.form-group').find('.error-message').show();
          }
        }
        item.find('textarea.required').each(function(){
          if($(this).val() != ''){
            // Если поле не пустое удаляем класс-указание
            $(this).removeClass('error');
          } else {
            // Если поле пустое добавляем класс-указание
            $(this).addClass('error');
            $(this).parent('.form-group').find('.error-message').show();

          }
        });
        item.find('input[type=email]').each(function(){
          var regexp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/i;
          var $this = $(this);
          if($this.hasClass('required')){

            if (regexp.test($this.val())) {
              $this.removeClass('error');
            }else {
              // Если поле пустое добавляем класс-указание
              $this.addClass('error');
              $(this).parent('.form-group').find('.error-message').show();
            }
          }else{
            if($this.val() != ''){
              if (regexp.test($this.val())) {
                $this.removeClass('error');
              }else {

              $this.addClass('error');
              $(this).parent('.form-group').find('.error-message').show();
              }
            }else{
              $this.removeClass('error');
            }
          }
        });

        item.find('input[type=checkbox].required').each(function(){
          if($(this).is(':checked')){
            // Если поле не пустое удаляем класс-указание
            $(this).removeClass('error');
          } else {
            // Если поле пустое добавляем класс-указание
            $(this).addClass('error');
            $(this).parent('.form-group').find('.error-message').show();
          }
        });
      }
      btn.click(function(){
        checkInput();
        var sizeEmpty = item.find('.error:visible').size();
        if(sizeEmpty > 0){
          return false;
        } else {
          // Все хорошо, все заполнено, отправляем форму

          item.submit();
          $.fancybox.close();
        }
      });
     });
  },

  mainInit: function () {
    this.mainSlider();
    this.validation();
    this.carousel();
    this.akardion();
  }
};
$(document).ready(function(){
        ui.mainInit();
  
  
        var top_show = 280; // В каком положении полосы прокрутки начинать показ кнопки "Наверх"
        var speed = 500; // Скорость прокрутки
    	var $backButton = $('.btn-up');
        $backButton.hide();
        $(window).scroll(function () { // При прокрутке попадаем в эту функцию
    		/* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
    		if ($(this).scrollTop() > top_show) {
    			$backButton.fadeIn();
    		}
    		else {
    			$backButton.fadeOut();
    		}
            
    	});
        
        $backButton.click(function () { // При клике по кнопке "Наверх" попадаем в эту функцию
    		/* Плавная прокрутка наверх */
    		scrollto(0, speed);
            return false;
    	});
        
        
        

        // scrollto
    	window.scrollto = function(destination, speed) {
    		if (typeof speed == 'undefined') {
    			speed = 800;
    		}
    		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination-60}, speed);
    	};
    	$("a.scrollto").click(function () {
    		var elementClick = $(this).attr("href")
    		var destination = $(elementClick).offset().top;
    		scrollto(destination);
    		return false;
    	});
        // end scrollto 
        
        
        
        
        
        // Animation        
        
        if ( !$("html").hasClass("touch") ){
            
            if ( !$("body").hasClass("no-animate") ){
                
                $('.indicators-container').addClass("no-visible").viewportChecker({
                    offset: 200,
                    classToAdd: 'visible animated fadeInUp',
                    callbackFunction: function(elem, action){
                        $('.indicators-container .num').each(function(){
                            var numb = $(this).data('num');
                            var speed = $(this).data('speed');
                            if (!$(this).hasClass('worked')) {
                              $(this).addClass('worked');
                              $(this).animateNumber({ number: numb  }, speed);
                            }
                        });
                    }
                    
                });
                
            }
        }         
                        
                 
         
        
// End animation    



        $('.fancybox').fancybox({
            padding: 0,
            openEffect  : 'fade',
            closeEffect : 'fade',
            nextEffect  : 'none',
            prevEffect  : 'none',
            helpers: {
            overlay: {
              locked: false
            }
            }
        });
        
        $('.fancyboxModal').fancybox({
            autoResize:true,            
            padding: 0,
            openEffect  : 'fade',
            closeEffect : 'fade',
            nextEffect  : 'none',
            prevEffect  : 'none',
            fitToView : false, 
            maxWidth: '100%',
            scrolling : "no",
            helpers: {
            overlay: {
              locked: false
            }
            }
        });
        
        
        var theme;
        $('.fancyboxModal').click(function(){
            theme = $(this).data('theme');
            $('.theme-input').val(theme);
        });
        
        
        
        // инициализация плагина jquery.inputmask.js
        
        $('.tel').inputmask('+7 (999) 999 99 99',{
	    	clearMaskOnLostFocus: true
	    });
        
        // end
        
        
        
        var dates = $( "#datepicker, #datepicker2" ).datepicker({
        dateFormat: 'dd.mm.yy',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            firstDay: 1,
            changeYear: false,
            changeMonth: false,
            yearRange: '-100:+0',
            minDate: 0,
        onSelect: function( selectedDate ) {
        var option = this.id == "datepicker" ? "minDate" : "maxDate",
        instance = $( this ).data( "datepicker" ),
        date = $.datepicker.parseDate(
        instance.settings.dateFormat ||
        $.datepicker._defaults.dateFormat,
        selectedDate, instance.settings );
        dates.not( this ).datepicker( "option", option, date );
        $(this).change();
        }
        });
        
        
        $('#birthday').datepicker({
            dateFormat: 'dd.mm.yy',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            firstDay: 1,
            changeYear: true,
            changeMonth: true,
            yearRange: '-100:+0'
        });
        
        
        
        $('.navbar-toggle').click(function(){
            $(this).toggleClass('active');
            $('.navbar-wrapper').toggle();
        });
        
        $('.navbar-nav li > a').click(function(){
            $('.navbar-toggle').removeClass('active');
            $('.navbar-wrapper').hide();
        });
        
        
        var speed = 800; 
        
        // scrollto
    	window.scrollto = function(destination, speed) {
    		if (typeof speed == 'undefined') {
    			speed = 800;
    		}
    		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination-60}, speed);
    	};
    	$(".index-template a.scrollto").click(function () {
    		var elementClick = $(this).attr("href")
    		var destination = $(elementClick).offset().top;
    		scrollto(destination);
    		return false;
    	});
    	// end scrollto 
        
        $('.search-switch-btn').click(function(){
            $('.search-form-block').addClass('active');
        });
        
        $('.search-form-block-after, .search-form-block-close').click(function(){
            $('.search-form-block').removeClass('active');
        });  
        
        $('.splitter1').easyListSplitter({ colNumber: 4, direction: 'horizontal'});
        
        
        $('.menu-button').click(function() {
            $('.menu-button').toggleClass('active');
            $('.mobile-menu').toggleClass('open');
        });
        $('.mobile-menu, .menu-button').click(function(e) {
            if ($(e.target).hasClass('fancyboxModal') == false) {
                e.stopPropagation();
            }
        });
        $('body').click(function() {
            $('.mobile-menu').removeClass('open');
            $('.menu-button').removeClass('active');
        });
    
    
        $('.mobile-menu ul > li').has('ul').addClass('down');
        $('.mobile-menu .down > ul').before('<span class="dropdown-button"></span>');
    
    
    
        $('.mobile-menu .dropdown-button').click(function() {
            $(this).toggleClass('active');
            if ($(this).siblings('ul').is(':visible')) {
                $(this).siblings('ul').slideUp();
            } else {
                $(this).siblings('ul').slideDown();
            }
    
        });
        
        
        // ASIDE MENU
        
        
        $('.aside-menu li').has('ul').addClass('down');
        
        $('.aside-menu > ul li.down > ul').before('<span class="dropdown-button"></span>');
        
        
        $('.aside-menu .down .dropdown-button').each(function(){
            if($(this).siblings('ul').is(':visible')){
                $(this).addClass('active');
            }
        });
        
        
        
        $('.aside-menu .down .dropdown-button').click(function(){
            
            
            
            $(this).parent().toggleClass('open');
            if($(this).siblings('ul').is(':visible')){
                $(this).siblings('ul').slideUp();
                $(this).removeClass('active');
            }else{
                $(this).siblings('ul').slideDown();
                $(this).addClass('active');
            }
            
        });
        
        
        $('.aside-menu-title').click(function(){
            $('.aside-menu').toggleClass('active');
        });
        
        
        // ASIDE MENU END
        
        var thisHeight,windWidth = window.innerWidth;;
        
        function figureScrollPane(){
            if(windWidth > 992){
                $('.aside-accordeon figure').each(function(){
                    thisHeight = $(this).height();
                    if(thisHeight > 169){
                        $(this).jScrollPane({
                            verticalDragMinHeight: 30,
                            verticalDragMaxHeight: 50
                        });   
                    }
                });
            }
        }
        figureScrollPane();
        
        
        $('.aside-accordeon > li .switch').click(function(){
            if($(this).parents('li').children('ul').is(':visible')){
                $(this).parents('li').removeClass('active');
            }else{
                $(this).parents('li').addClass('active');
                figureScrollPane(); 
            }
        });
        
        
        
        $('.aside-filters-title').click(function(){
            $(this).parents('.aside-filters-block').toggleClass('active');
        });
        
        
        $('.similar-carousel').slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 800,
            arrows: true,
            prevArrow: '<a href="#" class="slick-prev"></a>',
            nextArrow: '<a href="#" class="slick-next"></a>',
            responsive:[
                {
                  breakpoint: 890,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
            ]
        });
  
  
}); // end document.ready








$(window).load(function() { 
    setTimeout(function() { 
        $('.preloader').addClass('hid');
    }, 10);
    
});






