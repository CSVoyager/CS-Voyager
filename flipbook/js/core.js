var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

//calcolo la proporzione del viewport
var proporzioneViewport = x / y;

	var larghezzaMinimaViewport = 0;
			
//se il viewport è più stretto di 640 lo imposto a 640
	if (x < larghezzaMinimaViewport) {
		//alert('schermo troppo piccolo (' + x + ' x ' + y + ')');
		y = (larghezzaMinimaViewport * y) / x;
		x = larghezzaMinimaViewport;
		//alert('reimpostato a ' + x + ' x ' + y);
	}

// imposto i margini attorno allo sfogliabile
	var margineX = 35;
	var margineY = 25;

//console.log(proporzioneViewport);
	if(proporzioneViewport<1){
		var sfogliabileX = 615.00;
		//console.log('vertical mobile' );
	} else {
		var sfogliabileX = 1230.00;
		//console.log('horizontal mobile' );
	}

var sfogliabileY = 870.00;

 
//calcolo la proporzione dello sfogliabile
var proporzioneSfogliabile = sfogliabileX / sfogliabileY;

//se la proporzione dello sfogliabile è maggiore della proporzione del viewport tengo fissa l'altezza
if (proporzioneSfogliabile < proporzioneViewport){
	altezzaEffettiva 	= y - margineY;
	larghezzaEffettiva 	= (altezzaEffettiva * (proporzioneSfogliabile));
} else {
	larghezzaEffettiva 	= x - margineX;
	altezzaEffettiva 	= ((larghezzaEffettiva) / proporzioneSfogliabile);
}



jQuery(function () {
    $('.close-icon').click(function () {
        $('#flipbook', window.parent.document).hide();
        $('#flipbook', window.parent.document).attr("src", "");
    });
  
    applyConfig();
});
    
function applyConfig()
{
    $('.logo-backs2').hide();
    $('#slider-bar').show();
    $('#at-expanding-share-button').show();    
    $('.down-pdf').show();
    $('.flipbook-title').hide();
    $('.flipbook-title p').html("");
    $('.flipbook-title h2').html("");
    $('.flipbook-title h1').html("");    
    
    if (flipbookcfg.cover > 0) {
        $('#slider-bar').hide();
    }

    if (flipbookcfg.background!=null && $.trim(flipbookcfg.background)!='') {
        $('.logo-backs').css('background-image', "url('"+flipbookcfg.background+"')");
    } 

    if (flipbookcfg.showSlider!=null && $.trim(flipbookcfg.showSlider)==0) {
        $('#slider-bar').hide();
    }
    
    if (flipbookcfg.showSocial!=null && $.trim(flipbookcfg.showSocial)==0) {
        $('#at-expanding-share-button').hide();
    }
    
    if (flipbookcfg.companyLogo!=null && $.trim(flipbookcfg.companyLogo)!='') {
       // $('.logo-backs2').attr('src', flipbookcfg.companyLogo);
        $('.logo-backs2').show();
    } else {
      //  $('.logo-backs2').attr('src', '');
        $('.logo-backs2').hide();        
    }  
    
    if (flipbookcfg.title!=null && $.trim(flipbookcfg.title)!='') {
        $('.flipbook-title h1').html(flipbookcfg.title);
        $('.flipbook-title').show();
    }
    
    if (flipbookcfg.subtitle!=null && $.trim(flipbookcfg.subtitle)!='') {
        $('.flipbook-title h2').html(flipbookcfg.subtitle);
        $('.flipbook-title').show();
    }
    
    if (flipbookcfg.description!=null && $.trim(flipbookcfg.description)!='') {
        $('.flipbook-title p').html(flipbookcfg.description);
        $('.flipbook-title').show();
    }    
    
    if (flipbookcfg.showDownload!=null && $.trim(flipbookcfg.showDownload)==0) {
        $('.down-pdf').hide();
    }    
}

//Load normal page
function loadPage(page, pageElement) {
    var img = $('<img />');
    img.mousedown(function (e) {
        e.preventDefault();
    });

    img.load(function () {
        $(this).css({width: '100%', height: '100%'});
        $(this).appendTo(pageElement);
        pageElement.find('.loader').remove();
    });

    img.attr('src', flipbookcfg.url + (page - flipbookcfg.cover) + '.jpg');
    loadRegions(page, pageElement);
}

//Load large page
function loadLargePage(page, pageElement) {
    var img = $('<img />');
    img.load(function () {
        var prevImg = pageElement.find('img');
        $(this).css({width: '100%', height: '100%'});
        $(this).appendTo(pageElement);
        prevImg.remove();

    });
    img.attr('src', flipbookcfg.url + (page - flipbookcfg.cover) + '.jpg');
}

//Load small page
function loadSmallPage(page, pageElement) {
    var img = pageElement.find('img');
    img.css({width: '100%', height: '100%'});
    img.unbind('load');

    img.attr('src', flipbookcfg.url + (page - flipbookcfg.cover) + '.jpg');

}

function requestFullScreen(element) {
    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element);
    } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}

function loadApp()
{
    $('#canvas').fadeIn(1000);
    var flipbook = $('.magazine');

    // Check if the CSS was already loaded
    if (flipbook.width() == 0 || flipbook.height() == 0) {
        setTimeout(loadApp, 10);
        return;
    }

  //  $('.logo-backs2').show();
  
  			if(proporzioneViewport<1){
				display_style = 'single';
				width_new = larghezzaEffettiva;
        height_new = altezzaEffettiva;
				} else {
				display_style = 'double';
				width_new = 1230;
        height_new = 870;
				}	
	///////					

    flipbook.turn({
        width: width_new,
        height: height_new,
        duration: 1000,
        cornerSize: 200,
        gradients: true,
        autoCenter: true,
        elevation: 50,
        acceleration: !isChrome(),
        pages: flipbookcfg.numPages,
        direction: flipbookcfg.direction,
        //mostra una pagina singola oppure due classico
			display: display_style,
        // Events
        when: {
            turning: function (event, page, view)
            {
            
                      
                var book = $(this),
                        currentPage = book.turn('page'),
                        pages = book.turn('pages');

                Hash.go('page/' + page).update();

                disableControls(page);
                
                var audio = document.getElementById("audio");
                audio.play();
            },
            turned: function (event, page, view)
            {
                disableControls(page);
                $(this).turn('center');
                $('#slider').slider('value', getViewNumber($(this), page));

                if (page == 1) {
                    $(this).turn('peel', 'br');
                }
            },
            missing: function (event, pages)
            {
                for (var i = 0; i < pages.length; i++)
                    addPage(pages[i], $(this));
            }
        }

       
    });
    
$("#prev").click(function(e){
    e.preventDefault();
   if (flipbookcfg.direction == 'rtl') {
    flipbook.turn("next"); } else {
    flipbook.turn("previous"); }
});

$("#next").click(function(e){
    e.preventDefault();
   if (flipbookcfg.direction == 'rtl') {
    flipbook.turn("previous"); } else {
    flipbook.turn("next"); }
});

    $('.magazine-viewport').zoom({
        flipbook: $('.magazine'),
        max: function () {
          //  return largeMagazineWidth() / $('.magazine').width();
          if (display_style == 'double') { 
 return largeMagazineWidth() / $('.magazine').width(); } else { return 1.9; }
        },
        when: {
            swipeLeft: function () {
                $(this).zoom('flipbook').turn('next');
            },
            swipeRight: function () {
                $(this).zoom('flipbook').turn('previous');
            },
            resize: function (event, scale, page, pageElement) {
                if (scale == 1)
                    loadSmallPage(page, pageElement);
                else
                    loadLargePage(page, pageElement);
            },
            zoomIn: function () {
                $('#slider-bar').hide();
                $('.at-expanding-share-button').hide();
                $('.made').hide();
                $('.magazine').removeClass('animated').addClass('zoom-in');
                $('.zoom-icon').removeClass('zoom-icon-in').addClass('zoom-icon-out');
                $('.controlzoom').show();
                if (!window.escTip && !$.isTouch) {
                    escTip = true;

                    $('<div />', {'class': 'exit-message'}).
                            html('<div>' + flipbookcfg.textTip + '</div>').
                            appendTo($('body')).
                            delay(4000).
                            animate({opacity: 0}, 500, function () {
                                $(this).remove();
                            });
                }
            },
            zoomOut: function () {
                $('#slider-bar').fadeIn();
                $('.at-expanding-share-button').fadeIn();
                $('.exit-message').hide();
                $('.made').fadeIn();
                $('.zoom-icon').removeClass('zoom-icon-out').addClass('zoom-icon-in');
                $('.controlzoom').hide();
                
                setTimeout(function () {
                    $('.magazine').addClass('animated').removeClass('zoom-in');
                    resizeViewport();
                }, 0);
            }
        }
    });
    
 
$("#zoomin").click(function(e){
e.preventDefault();
$(".magazine").turn("zoom", 3.3);

}); 

$("#zoomout").click(function(e){
e.preventDefault();
$('.magazine-viewport').zoom('zoomOut');
$(".controlzoom").hide();
});    
       


    //Zoom event
    if ($.isTouch)
        $('.magazine-viewport').bind('zoom.doubleTap', zoomTo);
    else
        $('.magazine-viewport').bind('zoom.tap', zoomTo);


    //Using arrow keys to turn the page
    $(document).keydown(function (e) {
        var previous = 37, next = 39, esc = 27;
        switch (e.keyCode) {
            case previous:
                //left arrow
                $('.magazine').turn('previous');
                e.preventDefault();

                break;
            case next:
                //right arrow
                $('.magazine').turn('next');
                e.preventDefault();

                break;
            case esc:
                $('.magazine-viewport').zoom('zoomOut');
                e.preventDefault();
                break;
        }
    });

    // URIs - Format #/page/1 

    Hash.on('^page\/([0-9]*)$', {
        yep: function (path, parts) {
            var page = parts[1];

            if (page !== undefined) {
                if ($('.magazine').turn('is'))
                    $('.magazine').turn('page', page);
            }

        },
        nop: function (path) {
            if ($('.magazine').turn('is'))
                $('.magazine').turn('page', 1);
        }
    });


    $(window).resize(function () {
        resizeViewport();
    }).bind('orientationchange', function () {
        location.reload();
    });

    //Regions
    if ($.isTouch) {
        $('.magazine').bind('touchstart', regionClick);
    } else {
        $('.magazine').click(regionClick);
    }

    // Events for the next button
    $('.next-button').bind($.mouseEvents.over, function () {

        $(this).addClass('next-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('next-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('next-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('next-button-down');

    }).click(function () {

      //  $('.magazine').turn('next');
      
    if (flipbookcfg.direction == 'rtl') {
    $('.magazine').turn('previous'); } else {
    $('.magazine').turn('next'); }
      

    });

    // Events for the next button

    $('.previous-button').bind($.mouseEvents.over, function () {

        $(this).addClass('previous-button-hover');

    }).bind($.mouseEvents.out, function () {

        $(this).removeClass('previous-button-hover');

    }).bind($.mouseEvents.down, function () {

        $(this).addClass('previous-button-down');

    }).bind($.mouseEvents.up, function () {

        $(this).removeClass('previous-button-down');

    }).click(function () {

      //  $('.magazine').turn('previous');
      
          if (flipbookcfg.direction == 'rtl') {
    $('.magazine').turn('next'); } else {
    $('.magazine').turn('previous'); }

    });


    $("#slider").slider({
        min: 1,
        max: numberOfViews(flipbook),
        start: function (event, ui) {

            if (!window._thumbPreview) {
                _thumbPreview = $('<div />', {'class': 'thumbnail'}).html('<div></div>');
                setPreview(ui.value);
                _thumbPreview.appendTo($(ui.handle));
            } else
                setPreview(ui.value);

            var nps = flipbookcfg.numPages;
            var lst;

            if (nps % 2 == 0) lst = (nps - 2) / 2 + 2;
            if (nps % 2 != 0) lst = (nps - 1) / 2 + 1;

            console.log(ui.value);
            if (ui.value == 1) {
                $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ui.value + '-thumb.jpg" style="width: 100%; height: 100%;" />');
            } else if (ui.value == lst) {
                $(ui.handle).find('.thumbnail div').html('');
                if (nps % 2 != 0) {
                    $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 49%; height: 100%;" /><img src="' + flipbookcfg.url + ((ui.value - 1) * 2 + 1) + '-thumb.jpg" style="width: 49%; height: 100%;" />');
                } else {
                    $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 100%; height: 100%;" />');
                }
            } else {
                $(ui.handle).find('.thumbnail div').html('');
                $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 49%; height: 100%;" /><img src="' + flipbookcfg.url + ((ui.value - 1) * 2 + 1) + '-thumb.jpg" style="width: 49%; height: 100%;" />');
            }

            moveBar(false);
        },
        slide: function (event, ui) {

            setPreview(ui.value);

            var nps = flipbookcfg.numPages;
            var lst;

            if (nps % 2 == 0) lst = (nps - 2) / 2 + 2;
            if (nps % 2 != 0) lst = (nps - 1) / 2 + 1;

            console.log(ui.value);
            if (ui.value == 1) {
                $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ui.value + '-thumb.jpg" style="width: 100%; height: 100%;" />');
            } else if (ui.value == lst) {
                $(ui.handle).find('.thumbnail div').html('');
                if (nps % 2 != 0) {
                    $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 49%; height: 100%;" /><img src="' + flipbookcfg.url + ((ui.value - 1) * 2 + 1) + '-thumb.jpg" style="width: 49%; height: 100%;" />');
                } else {
                    $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 100%; height: 100%;" />');
                }
            } else {
                $(ui.handle).find('.thumbnail div').html('');
                $(ui.handle).find('.thumbnail div').html('<img src="' + flipbookcfg.url + ((ui.value - 1) * 2) + '-thumb.jpg" style="width: 49%; height: 100%;" /><img src="' + flipbookcfg.url + ((ui.value - 1) * 2 + 1) + '-thumb.jpg" style="width: 49%; height: 100%;" />');
            }

        },
        stop: function () {

            if (window._thumbPreview)
                _thumbPreview.removeClass('show');

            $('.magazine').turn('page', Math.max(1, $(this).slider('value') * 2 - 2));

        }
    });

    resizeViewport();

    $('.magazine').addClass('animated');
    
    if ($('.modal-config')[0]) {
        $('.modal-config').fadeIn();
        $('.modal-config').draggable();  
    }
    
    

    
}

// Zoom icon

$('.zoom-icon').bind('mouseover', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).addClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).addClass('zoom-icon-out-hover');

}).bind('mouseout', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $(this).removeClass('zoom-icon-in-hover');

    if ($(this).hasClass('zoom-icon-out'))
        $(this).removeClass('zoom-icon-out-hover');

}).bind('click', function () {

    if ($(this).hasClass('zoom-icon-in'))
        $('.magazine-viewport').zoom('zoomIn');
    else if ($(this).hasClass('zoom-icon-out'))
        $('.magazine-viewport').zoom('zoomOut');

});

$('#canvas').hide();
