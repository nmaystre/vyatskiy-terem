var $window = $(window),
    $carouselMobile = $('.carousel-mobile'),
    toggleSlick;

$(document).ready(function () {
	
	//Slick-slider

	var $slider = $('.slider');

	$slider.slick({
		focusOnSelect: false,
		dots: false,
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
    centerMode: true,
		variableWidth: true,
		draggable: true,
		touchMove: true,
		touchThreshold: 5,
		prevArrow: '<button type="button" class="slick-prev slick-arrow" aria-label="Previous"><span class="icon icon-arrow-prev"></span></button>',
		nextArrow: '<button type="button" class="slick-next slick-arrow" aria-label="Next"><span class="icon icon-arrow-next"></span></button>',
		speed: 400,
		autoplay: true,
		fade: false,
		cssEase: 'ease-in-out',
		responsive: [
			{
				breakpoint: 1023,
				settings: {
          variableWidth: true,
          slidesToShow: 1,
					slidesToScroll: 1,
					swipe: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
					swipe: true,
          arrows: false,
          autoplay: false
        }
			}
		]
	});

	//Slide down

	var $teamList = $(".team-list-js");
	var $teamMembersAll = $teamList.children(".team__member");
	var $teamBtn = $(".team-slidebtn-js");

	if ($window.width() < 1024) {
    $teamMembersAll.slice(2,20).addClass("team-slide-js");
	} else {
    $teamMembersAll.slice(3,20).addClass("team-slide-js");
  }

  $teamBtn.on("click", function (e) {
    e.preventDefault();
    $(".team-slide-js").slideToggle("slow");
  });

    
    //Popup
	$('.js-popup-link').magnificPopup({
		type: 'inline',

		fixedContentPos: true,
		fixedBgPos: true,

		overflowY: 'auto',

		closeBtnInside: false,
		preloader: false,
		focus: 'input[name="name"]',
		modal: false,

		midClick: true,
		removalDelay: 400,
		mainClass: 'my-mfp-zoom-in'
	});

    $('.popup__close').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
    
	$('.popup__button_close').on('click', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });

	//Inpumask
	$('input[name*="phone"]').inputmask({
		mask: '+7 (999) 999-99-99',
		showMaskOnHover: false
	});
    
    //Form
    var validateEmail = function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    var validatePhone = function(phone) {
        var re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{3,10}$/;
        return re.test(phone);
    };

    $('.form_feedback').submit(function(e){

        var name = $('input[name="name"]').val(),
            phone = $('input[name="phone"]').val(),
            email = $('input[name="email"]'),
            errorFlag1 = false,
            data = $(this).serialize();

        e.preventDefault();

        if(name == '') {
            name = '-';
        }

        if(email.length) {
            if (!validateEmail(email.val())) {
                $(this).find('input[name="email"]').closest('.form-data__parametr').addClass('form-data__parametr_error');
            } else {
                $(this).find('input[name="email"]').closest('.form-data__parametr').removeClass('form-data__parametr_error');
            }
        }

        if ( !validatePhone(phone) || phone == '' ) {
            $(this).find('input[name="phone"]').closest('.form-data__parametr').addClass('form-data__parametr_error');
            errorFlag1 = true;
        } else{
            $(this).find('input[name="phone"]').closest('.form-data__parametr').removeClass('form-data__parametr_error');
            errorFlag1 = false;
        }

        
		$.magnificPopup.open({
			items: {
				src: '#modal_success'
			}
		});
        
        // if ( !errorFlag1 ) {
        //     $.ajax({
        //         url: "send.php",
        //         type: "post",
        //         dataType: "text",
        //         data: data,
        //         success: function (ans) {
        //             $('.form_feedback')[0].reset();
		//
        //             $.magnificPopup.open({
        //                 items: {
        //                     src: '#modal_success'
        //                 }
        //             });
        //         }
        //     });
        // }


    });
	
});
