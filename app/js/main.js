
const 
	body = document.querySelector('body'),
	html = document.querySelector('html'),
	menu = document.querySelectorAll('.header__burger, .header__nav, body, .header'),
	burger = document.querySelector('.header__burger'),
	header = document.querySelector('.header');


// =-=-=-=-=-=-=-=-=-=- <image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

const imageAspectRatio = document.querySelectorAll('.image-aspect-ratio, figure');
imageAspectRatio.forEach(imageAspectRatio => {
	const img = imageAspectRatio.querySelector('img'), style = getComputedStyle(imageAspectRatio);
	if(img) {
		if(img.getAttribute('width') && img.getAttribute('height') && style.position == "relative")
		imageAspectRatio.style.setProperty('--padding-aspect-ratio', Number(img.getAttribute('height')) / Number(img.getAttribute('width')) * 100 + '%');
	}
	
})

// =-=-=-=-=-=-=-=-=-=- </image-aspect-ratio> -=-=-=-=-=-=-=-=-=-=-

// =-=-=-=-=-=-=-=-=-=-=-=- <get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

function getCoords(elem) {
	let box = elem.getBoundingClientRect();

	return {
	top: box.top + window.pageYOffset,
	right: box.right + window.pageXOffset,
	bottom: box.bottom + window.pageYOffset,
	left: box.left + window.pageXOffset
	};
}

// =-=-=-=-=-=-=-=-=-=-=-=- </get-coords> -=-=-=-=-=-=-=-=-=-=-=-=

// =-=-=-=-=-=-=-=-=-=- <click events> -=-=-=-=-=-=-=-=-=-=-

body.addEventListener('click', function (event) {

	function $(elem) {
		return event.target.closest(elem)
	}

	// =-=-=-=-=-=-=-=-=-=- <open menu in header> -=-=-=-=-=-=-=-=-=-=-

	if ($('.header__burger') || $('.header__nav--close') || $('.header__nav--bg')) {
		menu.forEach(element => {
			element.classList.toggle('_mob-menu-active')
		})
	}

	// =-=-=-=-=-=-=-=-=-=- </open menu in header> -=-=-=-=-=-=-=-=-=-=-


	// =-=-=-=-=-=-=-=-=-=-=-=- <scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=

	let scrollTo = $('.scroll-to');
	if(scrollTo) {
		event.preventDefault();
		let section;
	
		section = scrollTo.getAttribute('href').length > 1 ? document.querySelector(scrollTo.getAttribute('href')) : false;
	
		menu.forEach(elem => {
			elem.classList.remove('_mob-menu-active')
		})
	
		if(section) {
			section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
		} else {
			if(scrollTo.classList.contains('_scroll-down')) {
				let add = (windowSize < 992) ? header.offsetHeight : 0;
				window.scrollTo({
					left:0,
					top: getCoords(scrollTo.closest('section').nextElementSibling).top - add,
					behavior: "smooth",
				})
				//scrollTo.closest('section').nextElementSibling.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			} else {
				body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
			}
			
		}
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </scroll on click to section> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <accordion> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const ourServiceItemTarget = $(".our-service__item--target, .footer__nav > ul > li > button")
	if(ourServiceItemTarget) {
	
		if(ourServiceItemTarget.parentElement.classList.contains('_active')) {
			ourServiceItemTarget.parentElement.classList.remove('_active');
		} else {
			const activeItem = ourServiceItemTarget.closest('ul').querySelector('._active');
			if(activeItem) {
				activeItem.classList.remove('_active')
			}

			ourServiceItemTarget.parentElement.classList.add('_active');
		}
		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </accordion> -=-=-=-=-=-=-=-=-=-=-=-=



	// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
	const filterTarget = $(".filter__target")
	if(filterTarget) {
	
		filterTarget.closest('.filter').classList.toggle('_active');
	
	} else if(!$('.filter')) {
		document.querySelectorAll('.filter._active').forEach(filter => {
			filter.classList.remove('_active')
		})
	}

	const filterBlockTarget = $(".filter__block--target")
	if(filterBlockTarget) {
	
		if(filterBlockTarget.parentElement.classList.contains('_active')) {
			filterBlockTarget.parentElement.classList.toggle('_active');
		} else {
			const activeItem = filterBlockTarget.parentElement.parentElement.querySelector('._active');
			if(activeItem) {
				activeItem.classList.remove('_active')
			}

			filterBlockTarget.parentElement.classList.add('_active');
		}
		
	
	}
	
	// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=
	
	

})

// =-=-=-=-=-=-=-=-=-=- </click events> -=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let windowSize = 0;

function resize() {

	html.style.setProperty("--height-header", header.offsetHeight + "px");
	html.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
	if(windowSize != window.innerWidth) {
		html.style.setProperty("--svh", window.innerHeight * 0.01 + "px");
	}
	
	windowSize = window.innerWidth;
	if(!body.classList.contains('._mob-menu-active')) {
		html.style.setProperty('--scrollbar-width', window.innerWidth - body.offsetWidth + 'px');
	}
	
}

resize();

window.addEventListener('resize', resize)

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.index-hero__slider')) {

	document.querySelectorAll('.index-hero__slider').forEach((sliderEl, index) => {
		
		const slider = new Splide(sliderEl, {

			type: "loop",
			perPage: 2,
			gap: 16,
			direction: 'ttb',
			height: "max((var(--svh,1vh)*100),100%)",
			drag: false,
			pagination: false,
			arrows: false,
			autoScroll: {
				pauseOnHover: false,
				speed: index % 2 ? -0.7 : 1.1 + index * 0.3,
			},
			breakpoints: {
				992: {
					// params
				},
	
				550: {
					// params
				}
			}
	
		});
	
		slider.mount(window.splide.Extensions);
		
	})

}

if(document.querySelector('.trusted-by__slider')) {

	const slider = new Splide('.trusted-by__slider', {

		grid: {
			rows: 2,
			cols: 2,
			gap : {
				row: '1rem',
				col: '1rem',
			},
	  	},
		autoScroll: false,
		arrows: false,
		mediaQuery: "min",

		breakpoints: {
			768: {
				destroy: true
			}
		}

	});
	
	slider.mount(window.splide.Extensions);

}

const trustedBySlideLogo = document.querySelectorAll('.trusted-by__slide--logo img');
trustedBySlideLogo.forEach(logo => {
	logo.style.setProperty('--width', logo.getAttribute('width') + 'px')
	logo.style.setProperty('--height', logo.getAttribute('height') + 'px')

	logo.style.setProperty('--mob-width', logo.getAttribute('width') / 1.5 + 'px')
	logo.style.setProperty('--mob-height', logo.getAttribute('height') / 1.5 + 'px')
})

if(document.querySelector('.recent-work__slider')) {

	const slider = new Splide('.recent-work__slider', {

		type: "loop",
		perPage: 1,
		perMove: 1,
		gap: 10,
		speed: 500,
		easing: "ease",
		pagination: false,
		mediaQuery: "min",

		breakpoints: {
			550: {
				perPage: 2,
			},

			992: {
				perPage: 3,
				gap: 23,
			},

			
		}

	});

	slider.mount();

}

if(document.querySelector('.quotations__slider')) {

	const slider = new Splide('.quotations__slider', {

		perPage: 1,
		arrows: false,
		gap: 40,

	});

	slider.mount();

}

if(document.querySelector('.curated-insider__slider')) {

	const slider = new Splide('.curated-insider__slider', {

		type: "loop",
		perPage: 1,
		perMove: 1,
		pagination: false,
		gap: 15,
		mediaQuery: "min",

		breakpoints: {
			550: {
				perPage: 2,
			},
			768: {
				perPage: 3,
			},
			1200: {
				perPage: 4,
				gap: 28,
			},
		}

	});

	slider.mount();

}

if(document.querySelector('.our-team__slider')) {

	const slider = new Splide('.our-team__slider', {

		//perPage: "auto",
		autoWidth: true,
		pagination: false,
		gap: 16,
		mediaQuery: "min",
		easing: "ease",

		breakpoints: {
			768: {
				gap: 34,
			}
		}

	});

	slider.mount();

}

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <lazyload> -=-=-=-=-=-=-=-=-=-=-=-=

new LazyLoad();

// =-=-=-=-=-=-=-=-=-=-=-=- </lazyload> -=-=-=-=-=-=-=-=-=-=-=-=
 */

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <animation> -=-=-=-=-=-=-=-=-=-=-=-=

AOS.init({
	disable: "mobile",
});

// =-=-=-=-=-=-=-=-=-=-=-=- </animation> -=-=-=-=-=-=-=-=-=-=-=-=

*/

// =-=-=-=-=-=-=-=-=-=-=-=- <filter> -=-=-=-=-=-=-=-=-=-=-=-=

const filterInputs = document.querySelectorAll('.filter__block--list input'),
filterUrl = new URL(window.location.href),
filterUrlParams = new URLSearchParams(filterUrl.search);

filterInputs.forEach(input => {
	
	if(filterUrlParams.get(input.name) == "on") {
		input.checked = true;
	}

	input.addEventListener('change', function () {
		if(input.checked) {
			filterUrlParams.set(input.name, 'on');
		} else {
			filterUrlParams.delete(input.name);
		}

		filterUrl.search = filterUrlParams.toString();
		history.pushState(null,null,filterUrl.href)
		
	})
})

// =-=-=-=-=-=-=-=-=-=-=-=- </filter> -=-=-=-=-=-=-=-=-=-=-=-=




// =-=-=-=-=-=-=-=-=-=-=-=- <scroll> -=-=-=-=-=-=-=-=-=-=-=-=

function scroll() {

	let scrollProgress = window.pageYOffset;
	if(scrollProgress > 50) {
		header.classList.remove('_on-top');
	} else {
		header.classList.add('_on-top');
	}
	
}

scroll();

window.addEventListener('scroll', scroll)

// =-=-=-=-=-=-=-=-=-=-=-=- </scroll> -=-=-=-=-=-=-=-=-=-=-=-=
