// client slider 
if ('.client-slider-active') {
    var client_slider_active = new Swiper(".client-slider-active", {
        slidesPerView: 'auto',
        loop: true,
        autoplay: true,
        spaceBetween: 110,
        speed: 3000,
        autoplay: {
            delay: 1,
        },
    });
}

// project slider
if (('.project-slider').length) {
    var project_slider = new Swiper(".project-slider", {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 40,
        speed: 1800,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".project-button-prev",
            nextEl: ".project-button-next",
        },
        pagination: {
            el: '.project-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
        // when window width is >= px
        576: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
        1201: {
            slidesPerView: 3,
        },
        1367: {
            slidesPerView: 4,
        },
        }
    });
}


// testimonial slider
if (('.testimonial-slider').length) {
    var testimonial_slider = new Swiper(".testimonial-slider", {
        loop: true,
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 60,
        speed: 1800,
        watchSlidesProgress: true,
        navigation: {
            prevEl: ".testimonial-button-prev",
            nextEl: ".testimonial-button-next",
        },
        breakpoints: {
            // when window width is >= px
            576: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 2,
            },
            1201: {
                slidesPerView: 3,
            },
            1367: {
                slidesPerView: 3,
            },
            1441: {
                slidesPerView: 3,
            },
        }
    });
}

// text slider
if ('.text-slider-active') {
    var text_slider_active = new Swiper(".text-slider-active", {
        slidesPerView: '1',
        loop: true,
        autoplay: true,
        spaceBetween: 30,
        speed: 10000,
        autoplay: {
            delay: 1,
        },
    });
}

$( document ).ready(function() {
    var wdth   = $(document).width();
    
    if(wdth < 568){
        document.getElementById('slider_txt1').classList.remove("fade");
    }
});

    // banner slider
    if (('.banner-slider').length) {
        let divs = document.querySelectorAll('.slider-text');
        
        var banner_slider = new Swiper(".banner-slider", {
            loop: false,
            autoplay: false,
            slidesPerView: 1,
            spaceBetween: 20,
            speed: 2000,
            navigation: {
                prevEl: ".banner-button-prev",
                nextEl: ".banner-button-next",
            },
            on: {
                slideChangeTransitionEnd: function () {
                    var activeSlide = $(".swiper-slide-active");
                    var slideText = activeSlide.attr("data-div");
                    
                    divs.forEach(div => div.classList.add('fade'));
                    document.getElementById(slideText).classList.remove("fade");
                }
            }
        });
    }


// info slider
if (('.intro-slider').length) {
    var intro_slider = new Swiper(".intro-slider", {
        loop: true,
        autoplay: true,
        centeredSlides: true,
        watchSlidesVisibility: true,
        slidesPerView: 1,
        spaceBetween: 20,
        speed: 2000,
        autoplay: {
            delay: 10000,
        },
        navigation: {
            prevEl: ".intro-button-prev",
            nextEl: ".intro-button-next",
        },
    });
}

// function to validate email
function isEmail(email) 
{
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// function to accept digits only
function isNumber(evt) 
{
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}

// function to validate contact us form
function valid_contact()
{
    var name			= $('#ec_name').val();
    var email			= $('#ec_email').val();
    var message			= $('#ec_messages').val();
    var captcharesponse	= grecaptcha.getResponse();
    var flag = true;
    
    $('#ec_name').css('border-bottom','');
    $('#ec_email').css('border-bottom','');
    $('#ec_messages').css('border-bottom','');
    $('#captcha_err_msg').html('');
    
    if(name=='')
    {
        $('#ec_name').css('border-bottom','1px solid #f00');
        flag = false;
    }
    
    if(email=='' || !isEmail(email))
    {
        $('#ec_email').css('border-bottom','1px solid #f00');
        flag = false;
    }
    
    if(message=='')
    {
        $('#ec_messages').css('border-bottom','1px solid #f00');
        flag = false;
    }
    
    if(captcharesponse.length == 0){
        flag = false;
        $('#captcha_err_msg').html('Please verify that you are not robot!');
    }
    
    if(flag==false)
    {
        $('#ec_err').html('Please fill all the required fields.');
        $('#ec_err').show();
        $('#ec_err').fadeOut(5000);
        return false;
    }
    else
    {
        $.ajax({
            url: 'inc/form_emails.php',
            type: 'post',
            data: {
                'action': 'marvels_contact_form',
                'name': name,
                'email': email,
                'message': message,
                "g-recaptcha-response"	: captcharesponse,
            },
            success: function(response) {
                if(response=='success')
                {
                    var inputht = $('#form-inputs').height();
                    
                    $('#contact-form').trigger('reset');
                    $('#ec_err').html('');
                    $('#ec_err').hide();
                    grecaptcha.reset();
                    
                    $('#contact-form').before('<p id="thank_you_message" style="height:'+ inputht +'px" class="thankyou-msg text-success">Thank you for pre-registering! Your exclusive link to the VR Puzzle Game will arrive soon. Stay tuned for the ultimate engineering challenge!</p>');
                    $('#form-inputs').addClass('d-none');
                    setTimeout(function() {
                        $('#thank_you_message').fadeOut(5000, function() {
                            $(this).remove();
                            $('#form-inputs').removeClass('d-none');
                        });
                    }, 5000);
                }
                else
                {
                    $('#ec_err').html('Something went wrong. Please try again later.');
                    $('#ec_err').show();
                    $('#ec_err').fadeOut(5000);
                    grecaptcha.reset();
                }
            }
        });
    }
}

// function to scroll to section by section id
function scroll_to_id(id) {
    var t = 70;
    
    if(id == "featuredkits"){
        t	= t + 100;
    }
    
    $('html, body').animate({
        scrollTop: $("#" + id).offset().top - t
    }, 500);
}