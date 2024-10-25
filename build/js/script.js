'use strict'
;(function(){
    const checkWEBP = () => {
        const isSupportWebp = () => {
            const elem = document.createElement('canvas');
        
            if (!!(elem.getContext && elem.getContext('2d'))) {
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            } else {
                return false;
            }
        }
        
        document.documentElement.classList.add(!isSupportWebp() ? 'no-webp' : 'webp');
    };

    const toggleMenu = () => {
        const header = document.querySelector('.page__header');
        const control = document.querySelector('.js-toggle-menu');

        control.addEventListener('click', () => {
            header.classList.toggle('page__header--opened');
        });
    };

    const scrollMenu = () => {
        window.addEventListener("scroll", () => {
            const h = document.querySelector('.page__header');
            const b = document.body;
            let d = document.documentElement;
            d = (d.clientHeight) ? d : b;
        
            if (d.scrollTop > 1){
                if (!h.classList.contains('page__header--offset')){
                    h.classList.add('page__header--offset');
                }
            } else {
                h.classList.remove('page__header--offset')
            }
        });
    };

    const scrollTo = () => {
        const headerHeight = document.querySelector('.page__header').offsetHeight;
        
        const clickListener = (link) => {
            link.addEventListener('click', (e) => {
                if (document.body.classList.contains('page--main')) e.preventDefault();

                const section = document.querySelector(link.hash);
                let top = window.scrollY + section.getBoundingClientRect().top - headerHeight;

                if (top > 0) {
                    top -= 20;
                }

                window.scrollTo({
                    top: top,
                    left: 0,
                    behavior: "smooth"
                });

                document.querySelector('.page__header').classList.remove('page__header--opened');
            });
        };

        document.querySelectorAll('a[href*="#"]').forEach(link => clickListener(link));
        window.addEventListener('load', () => {
            if (location.hash){
                setTimeout(() => {
                    document.querySelector(`a[href*="${location.hash}"]`).click();
                }, 0);
            }
        });
    };
    
    const popupsInit = () => {
        Fancybox.bind('[data-fancybox]', {
            closeButton: false
        });

        document.addEventListener('wpcf7mailsent', (e) => {
            Fancybox.close();
            new Fancybox([
                {
                    src: document.getElementById('popupSuccess'),
                    type: 'html',
                    closeButton: false
                }
            ]);
        }, false);

        document.addEventListener('wpcf7mailfailed', (e) => {
            Fancybox.close();
            new Fancybox([
                {
                    src: document.getElementById('popupError'),
                    type: 'html',
                    closeButton: false
                }
            ]);
        }, false);
    };

    const videoPlay = () => {
        document.querySelectorAll('video').forEach(video => {
            video.addEventListener('click', () => {
                video.setAttribute('controls', "");
                video.play();
            });
        });
    };

    const collapseFaq = () => {
        document.querySelectorAll('.faq__item').forEach(faq => {
            const control = faq.querySelector('.faq__title');
            const text = faq.querySelector('.faq__text');

            control.addEventListener('click', e => {
                control.classList.toggle('faq__title--active');
                text.classList.toggle('faq__text--collapsed');
            });
        });
    }

    const carouselBlog = () => {
        const mql = window.matchMedia('(max-width: 1229px)');
        const postSlides = document.querySelectorAll('.js-post-slide');

        const slider = () => {
            let swiper;

            if (mql.matches) {
                postSlides.forEach(post => {
                    post.classList.add('swiper-slide');
                });

                swiper = new Swiper('.js-blog-carousel', {
                    loop: false,
                    spaceBetween: 20,
                    slidesPerView: 1,
                    navigation: {
                      nextEl: '.posts__control--next',
                      prevEl: '.posts__control--prev',
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 2
                        }
                    }
                });
            } else {
                if (swiper) swiper.destroy();
                
                postSlides.forEach(post => {
                    post.classList.remove('swiper-slide');
                    post.attributeStyleMap.clear();
                });
            }
        }

        window.addEventListener('load', slider);
        window.addEventListener('resize', slider);
    };

    const galleryPost = () => {
        const postGalleryThumbs = new Swiper('.js-post-gallery-thumbs', {
            loop: false,
            slidesPerView: 3,
            spaceBetween: 8,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 3,
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        draggable: true
                    }
                },
                768: {
                    slidesPerView: 6
                }
            }
        });

        const postGallery = new Swiper('.js-post-gallery', {
            loop: false,
            slidesPerView: 1,
            spaceBetween: 0,
            thumbs: {
                swiper: postGalleryThumbs
            },
        });
    };

    checkWEBP();
    // toggleMenu();
    // scrollMenu();
    // scrollTo();
    // popupsInit();
    // videoPlay();
    collapseFaq();
    // carouselBlog();
    // galleryPost();
})();