window.addEventListener('DOMContentLoaded', () => {
    $(document).ready(function(){
        $('.carousel__inner').slick(
            {                
                speed: 1200,
                // adaptiveHeight: true,
                fade: true,
                cssEase: 'linear',
                prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
                nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"</button>'
             }
        );
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
          $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });

     
      function toggleSlide(item) {
        $(item).each(function(i) {
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        })
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      $('[data-modal=concultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
      });

      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow')
      });
 
      $('.button_mini').each(function(i) {
        $(this).on('click', function() {
          $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
          $('.overlay, #order').fadeIn('slow');
        })
      });

   

      function ValideForms(form) {
        $(form).validate( {
          rules: {
            name: {
                required: true,
                maxlength: 10
              },
            phone: 'required',
            email: {
              required: true,
              email: true
            }
          },
          messages: {
            name: {
                required: "Введите Ваше имя",
                maxlength: jQuery.validator.format("Можно ввести не более {0} символов !")
            },
            phone: "Введите Ваш номер телефона",
            email: {
              required: "Нам нужен ваш адрес электронной почты, чтобы с вами связаться",
              email: "Ваш адрес электронной почты должен быть в формате name@domain.com."
            }
          }
        });
      };

      ValideForms('#consultation form');
      ValideForms('#consultation-form');
      ValideForms('#order form');

      $('input[name=phone]').mask("+7(999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('#thanks').fadeIn('slow');

          $('form').trigger('reset');
        });
        return false;
      });

      //pageup
      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
          $('.pageup').fadeIn();
        } else {
          $('.pageup').fadeOut();
        }
        $("a[href='#up']").click(function(){
          const _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
          return false;
  });
      });

      new WOW().init();


      });
});

