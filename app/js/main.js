// Header nav
///////////////////////////////////////////////////////////////////////////////////////////////////
jQuery(document).ready(function() {
	const menu = $('button.menu');
	const body = $('body');
	const nav  = $('nav');
	menu.click(function() {
		body.toggleClass("lock");
		nav.toggleClass("active");
		menu.toggleClass("active");
		$('.logo').toggleClass("active"); 
	});

	$("[name=phone]").mask("+7 (499) 999-99-99"); 

});
///////////////////////////////////////////////////////////////////////////////////////////////////
// Brends slider
///////////////////////////////////////////////////////////////////////////////////////////////////
	const owl = $('.owl-carousel');

	owl.owlCarousel({
		loop: true,
		autoplay: true,
		margin: 20,
		dots: true,
		responsive:{
				0:{
            items: 2
        },
        768:{
            items: 3
        },
        1160:{
            items: 4,
            margin: 30,
        }
    }
	});

	$('.slider-nav__btn--prev').click(function() {
	    owl.trigger('prev.owl.carousel', [300]);
	});

	$('.slider-nav__btn--next').click(function() {
	    owl.trigger('next.owl.carousel');
	})


///////////////////////////////////////////////////////////////////////////////////////////////////
// Modal
///////////////////////////////////////////////////////////////////////////////////////////////////
const allModals 		= document.querySelectorAll('[data-modal]');
			modalBtn 			= document.querySelectorAll('[data-modal-btn]'); 
			modalCloseBtn = document.querySelectorAll('[data-modal-close]');
			body					= document.querySelector('body');

modalBtn.forEach(function(i) {

	i.addEventListener("click", function() {

		body.classList.add('lock');

		const modal = document.querySelector('#' + this.dataset.modalBtn);

		modal.classList.remove('hidden');

		modal.querySelector('.modal').addEventListener("click", function(e) {

			e.stopPropagation();

		});

		modal.style.opacity = "1";

	});

});

modalCloseBtn.forEach(function(i) {

	i.addEventListener("click", function() {

		body.classList.remove('lock');

		this.closest('[data-modal]').classList.add('hidden');

		this.closest('[data-modal]').style.opacity = "0";

	});

});

allModals.forEach(function(i) {

	i.addEventListener("click", function() {

		body.classList.remove('lock');

		this.classList.add('hidden');

		this.style.opacity = "0";

	});

});
///////////////////////////////////////////////////////////////////////////////////////////////////
