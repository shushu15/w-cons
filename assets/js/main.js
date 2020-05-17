jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).load(function(){
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height() >  845?  845: $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home-slider .item').css('height',slideHeight);
	});
	
	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop()>slideHeight ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});
	
	// Navigation Scroll
	$(window).scroll(function(event) {
		Scroll();
	});

	$('.navbar-collapse ul .scroll a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	
	/*
	// Carousel events
	$(document).ready(function(){
		$('#home-slider').on('slide.bs.carousel', function () {
			// This variable contains all kinds of data and methods related to the carousel
				var carouselData = $(this).data('bs.carousel');
				var currentIndex = carouselData.getItemIndex(carouselData.$element.find('.item.active'));
				var total = carouselData.$items.length;
				var currentItem = carouselData.$element.find('.item.active');
				var animatedIts = currentItem[0].getElementsByClassName("animated");  // find all animated tags inside
				var lastAttr, wipeClass;
				for (var i = 0; i < animatedIts.length && animatedIts[i] != undefined; i++) {
					wipeClass = animatedIts[i].getAttribute('data-animation-wipe');		
					lastAttr = animatedIts[i].getAttribute('class');		// store class
					animatedIts[i].setAttribute('class', wipeClass );
					animatedIts[i].setAttribute('data-animation-wipe', lastAttr );
					animatedIts[i].addEventListener("webkitAnimationEnd", animationToggle(animatedIts[i]));
					animatedIts[i].addEventListener("animationend", animationToggle(animatedIts[i]));
				
				}

  // Create the text we want to display.
  // We increment the index because humans don't count like machines
  var text = (currentIndex + 1) + " of " + total;

  // You have to create a HTML element <div id="carousel-index"></div>
  // under your carousel to make this work
  $('#carousel-index').text(text);			
	});
	});
	
	function animationToggle(obj) {
			var storeClass = obj.getAttribute('data-animation-wipe');		
			obj.setAttribute('data-animation-wipe', obj.getAttribute('class')); 
			obj.setAttribute('class', storeClass );
			obj.removeEventListener("webkitAnimationEnd", animationToggle);
			obj.removeEventListener("animationend", animationToggle);
}
*/
	
	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			contentTop.push( $( $(this).attr('href') ).offset().top);
			contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		})
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		})
	};

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
	
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();
	
	// Progress Bar
	$('#about-us').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$.each($('div.progress-bar'),function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).unbind('inview');
		}
	});

	//Countdown
	$('#features').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).unbind('inview');
		}
	});

	// Portfolio Single View
	$('#portfolio').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_top = $("#"+trgt).offset().top;

		var $this = $(this),
        url = $this.attr("href"),
        title = $this.text();
	// we will add history only if portfolio not on the screen
		if ( /*$('#portfolio-details').length > 0 */ portfolio_on ) {
			window.history.replaceState({
				url: url,
				title: title
			}, title, url);
		} else {
			window.history.pushState({
				url: url,
				title: title
			}, title, url);
		}

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#portfolio-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
		portfolio_on = true;  // 
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
		ClosePortfolio(event);
		window.history.back();   // clear added history (if we have 
	});
	
	var portfolio_on = false;   // is Portfolio on screen

	function ClosePortfolio(event){
		event.preventDefault();
		var full_url = '#portfolio',
		parts = full_url.split("#"),
		trgt = parts[1],
		target_offset = $("#"+trgt).offset(),
		target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#portfolio-single").slideUp(500);
		if (portfolio_on) {
			portfolio_on = false;
		}
	}
	
	// prevent closing page on 'back' with the open portfolio page
	/*$(window).on("navigate", function (event, data) {
		var direction = data.state.direction;
		if (direction == 'back') {
			if ($('#portfolio-details').length > 0) {
			// exists.
				ClosePortfolio(event);
			}
		}
		if (direction == 'forward') {
			// do something else
		}
	});	*/
	
	 $(window).on('popstate', function (e) {
		 if ($('#portfolio-details').length > 0) {
			// exists.
			ClosePortfolio(e);
		}
    });


	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		// Serialize the form data.
		var formData = $(form).serialize(); 
		
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			cache: false,
			type: 'POST', 
			url: $(this).attr('action'),
			data: formData, 
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		})
		.done(function(response){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible we will contact you</p>').delay(3000).fadeOut();
			// Clear the form. - not whole
			//$('#name').val('');
			//$('#email').val('');
			$('#subject').val(''); 
			$('#message').val(''); 
			
		})
		.fail(function(response) {
			// Set the message text.
			if (response.responseText !== '') {
				form_status.html('<p class="text-warning">${response.responseText}</p>').delay(3000).fadeOut();
			} else {
				form_status.html('<p class="text-warning">Oops! An error occured and your message could not be sent.</p>').delay(3000).fadeOut();
			}
		}); 		
	});

	//Google Map
	/*** switched off
	var latitude = $('#google-map').data('latitude')
	var longitude = $('#google-map').data('longitude')
	function initialize_map() {
		var myLatlng = new google.maps.LatLng(latitude,longitude);
		var mapOptions = {
			zoom: 14,
			scrollwheel: false,
			center: myLatlng
		};
		var map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
		var contentString = '';
		var infowindow = new google.maps.InfoWindow({
			content: '<div class="map-content"><ul class="address">' + $('.address').html() + '</ul></div>'
		});
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map
		});
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);
	*/
	
});

