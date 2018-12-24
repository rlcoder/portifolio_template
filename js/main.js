/* PRE-LOADER
================================================== */
window.addEventListener('DOMContentLoaded', function() {
    processLine.init();
    /* Loader - Remove it to disable loader
        ================================================== */
    jQuery("body").queryLoader2({
        onComplete: function () {

            $(".ut-loader-overlay").fadeOut(500, "easeInOutExpo", function() {
                $(this).remove();
            });

            /* TYPIST - ANIMATED TYPING TEXT
                ================================================== */
            $('.typist1')
                .typist({
                    speed: 10,
                    cursor: true,
                })
                .typistPause(800) // 0 sec
                .typistAdd('Desenvolvedor Café, OPS...')
                .typistRemove(12)
                .typistPause(1500)
                .typistAdd(' Web')
                .typistStop(2000);

            $('.typist2')
                .typist({
                    speed: 14
                })
                .typistPause(7000) // 4 sec
                .typistAdd('Aplicativos Desktop - Sistemas E-commerce - Sites Intitucionais')
                .typistStop();

        },
        showbar: "on",
        barColor: "#fff",
        textColor: "#fff",
        backgroundColor: "rgba(0, 0, 0, 0.96)",
        overlayId: 'qLoverlay',
        barHeight: 12,
        percentage: true,
        deepSearch: true,
        completeAnimation: "fade",
        minimumTime: 500
    });

    //SET VISIBLE BODY ON LOAD HTML
    $('body').show();

});

$('#intro-bgslide').vegas({
    overlay: true,
    transition: 'fade',
    transitionDuration: 4000,
    delay: 10000,
    color: 'red',
    animation: 'random',
    animationDuration: 20000,
    slides: [
        {
            src: './img/bg01.jpeg'
        },
        {
            src: './img/bg02.jpeg'
        },
        {
            src: './img/bg03.jpg'
        },
  ]
});


/* PORTFOLIO GRID - INIT CONFIG.
================================================== */

var containerEl = document.querySelector('[data-ref~="mixitup-container"]');

var mixer = mixitup(containerEl, {
    selectors: {
        control: '[data-mixitup-control]'
    }
});


/* PROCESS CREATIVE - TIME LINE - INIT CONFIG.
================================================== */



var processLine = {
    el: ".process-node",
    init: function() {
        processLine.bind()
    },
    bind: function() {
        $(window).scroll(function() {
            processLine.check()
        })
    },
    check: function() {
        $(processLine.el).each(function() {
            if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 200) {
                $(this).closest("li").addClass("active").find(".line").addClass("active");
                $(this).addClass("active")
            } else {
                $(this).removeClass("active");
                $(this).closest("li").removeClass("active").find(".line").removeClass("active")
            }
        })
    }
};



$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').focus();
});


$('#contact').on('submit', function () {
    let dataForm = new FormData($(this)[0]);
    $.ajax({
        url: "../pages/contato.php",
        type: "POST",
        data: dataForm,
        processData: false,
        success: function(result){
            alert('deu bom');
            $("#htmlform").html(result);
        },
        error: function(error){
            alert('deu erro')
        }
    });
});

/* VISIBILITY - INIT CONFIG.
================================================== */

Visibility.onVisible(function () {
    setTimeout(function () {
        $(".introducao h1").addClass("animated fadeInDown");
    }, 400);
    setTimeout(function () {
        $(".introducao p").addClass("animated fadeInDown");
    }, 800);


    setTimeout(function () {
        $(".introducao .intro-atendimento h3").addClass("animated fadeInDown");
    }, 1200);

    setTimeout(function () {
        $(".introducao .intro-atendimento ul li").addClass("animated fadeInDown");
    }, 1220);


    setTimeout(function () {
        $(".animar").addClass("animated fadeInDown");
    }, 1600);

    setTimeout(function () {
        $(".introducao-interna h1").addClass("animated fadeInDown");
    }, 400);
    setTimeout(function () {
        $(".introducao-interna p").addClass("animated fadeInDown");
    }, 800);
    setTimeout(function () {
        $(".animar-interno").addClass("animated fadeInDown");
    }, 1200);
});

/* CONTROLS RESPONSIVE MENU - CONFIG.
================================================== */


$('.menu ul').origamidMenu({
    breakpoint: 768,
    top: 50,
    background: "rgba(00,00,00,0.7);",
    color: "#fff"
});

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 220) {
        $(".menu-principal").addClass("menu-principal-ativo");
        $(".logo-large").hide();
        $(".logo-small").show();
    } else {
        //remove the background property so it comes transparent again (defined in your css)
        $(".menu-principal").removeClass("menu-principal-ativo");
        $(".logo-large").show();
        $(".logo-small").hide();
    }
});


