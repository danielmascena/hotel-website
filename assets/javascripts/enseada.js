/* global ref */
$(function() {
    
    $.simpleWeather({
        location: 'Natal, RN',
        woeid: '',
        unit: 'c',
        success: function(weather) {
            html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
            html += '<ul><li>'+weather.city+', '+weather.region+'</li>';
            html += '<li class="humidity"><img class="dropicon" src="assets/imagens/Droplet.svg">'+weather.humidity+' %</li>';
            html += '<li><img class="windicon" src="assets/imagens/Wind.svg">'+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
            $("#weather").html(html);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
    var menu = $( "#menu" );
    var header = $('#headerMobile');
    var hideMenu = function() {
        menu.slideToggle( "slow", function() {
            $( ".cross" ).hide();
            $( ".hamburger" ).show();
        });
    };
    
    $('a[href*=#]:not([href=#])').click(function() {
        if (header.css('display') == 'block' && window.matchMedia("(max-width: 480px)").matches) {
            hideMenu();
        }
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
    });
    
    /*
    if (window.matchMedia("(min-width: 400px)").matches) {
    // the viewport is at least 400 pixels wide 
    } else {
    // the viewport is less than 400 pixels wide 
    } */
    $( ".hamburger" ).click(function() {
        menu.slideToggle( "slow", function() {
            $( ".hamburger" ).hide();
            $( ".cross" ).show();
        });
    });
    $( ".cross" ).click(function() {
        hideMenu();
    });

    ref = new Firebase("https://inbox-enseada.firebaseio.com/");
});

function enviar() {
    var nome = $("#nome").val();
    var email = $("#email").val();
    var msg = $("#msg").val();
    var data = Date.now();

    ref.push({nomecliente: nome, emailcliente: email,
     pergunta: msg, dataEnvio: data}, function(status) {
        var mensagem, cor_fundo;
        if (!status) {
            mensagem = "Sua pergunta foi enviada com sucesso";
            cor_fundo = "#4DB275";
            document.forms[0].reset();
        } else {
            mensagem = "Houve um erro ao enviar a pergunta: tente novamente";
            cor_fundo = "#FF6A4A";
        }
        var msgResul = $("#msg-status");
        msgResul.css('background-color', cor_fundo);
        msgResul.text(mensagem);
        msgResul.show();
        window.setTimeout(function() {
            msgResul.fadeOut("slow");
        }, 5000);
     });    
}


