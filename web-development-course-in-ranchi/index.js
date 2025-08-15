// iframe YT code start

let ashInterval;
let count1 = 0;

const players = [
    { id: 'player1', videoId: 'JFtMkRVQ-fo', player: null },
    { id: 'player2', videoId: 'KIdPfuf8n_E', player: null },
    { id: 'player3', videoId: '79annCWsSdU', player: null }
];
function onYouTubeIframeAPIReady() {
    players.forEach(item => {
        item.player = new YT.Player(item.id, {
            height: '315',
            width: '560',
            videoId: item.videoId,
            events: {
                'onReady': onPlayerReady
            }
        });
    });
}


function onPlayerReady(event) {
    const player = event.target;
    player.mute();
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const playerId = entry.target.id;
            const playerData = players.find(item => item.id === playerId);

            if (entry.isIntersecting && playerData) {
                playerData.player.playVideo();
                ashInterval = setInterval(()=>{
                    if ( checkElement(document.getElementById(playerData.id)) ) {
                        playerData.player.unMute();
                        playerData.player.playVideo();
                        if (playerData.player.getPlayerState() == 1) {
                            count1++;
                            if(count1 == 5) {
                                clearInterval(ashInterval);
                                count1 = 1 ;
                            }
                        }
                    } 
                },1000);
            } else {
                playerData.player.pauseVideo();
            }
        });
    }, { threshold: 0.5, passive: true });
    observer.observe(player.getIframe());
}


function checkElement(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while(el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  );
}


// navbar2 js

const sections = document.querySelectorAll('.section');

const navLinks = {
  StudentReview: document.getElementById('home-link'),
  Syllabus: document.getElementById('about-link'),
  Placements: document.getElementById('contact-link'),
  faq: document.getElementById('faq-link')
};

function checkSectionInView() {
    let scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            Object.values(navLinks).forEach(link => link.classList.remove('active'));
            let id = section.getAttribute('id');
            navLinks[id].classList.add('active');
        }
    });
}
window.addEventListener('scroll', checkSectionInView);
window.addEventListener('load', checkSectionInView);


function initializeSlider(slider) {
    let sliderList = slider.querySelector('.slider-list'),
        sliderTrack = slider.querySelector('.slider-track'),
        slides = slider.querySelectorAll('.slidei'),
        arrows = slider.querySelector('.slider-arrows'),
        prev = arrows.children[0],
        next = arrows.children[1],
        slideWidth = slides[0].offsetWidth,
        slideIndex = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posFinal = 0,
        isSwipe = false,
        isScroll = false,
        allowSwipe = true,
        transition = true,
        nextTrf = 0,
        prevTrf = 0,
        lastTrf = --slides.length * slideWidth,
        posThreshold = slides[0].offsetWidth * 0.35,
        trfRegExp = /([-0-9.]+(?=px))/,
        swipeStartTime = 0,
        swipeEndTime = 0;

    const getEvent = function () {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        },
        slide = function () {
            if (transition) {
                sliderTrack.style.transition = 'transform .5s';
            }
            sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

            prev.classList.toggle('disabled', slideIndex === 0);
            next.classList.toggle('disabled', slideIndex === --slides.length);

            updateActiveClass(); // Update active class after slide change
        },
        swipeStart = function () {
            let evt = getEvent();

            if (allowSwipe) {

                swipeStartTime = Date.now();

                transition = true;

                nextTrf = (slideIndex + 1) * -slideWidth;
                prevTrf = (slideIndex - 1) * -slideWidth;

                posInit = posX1 = evt.clientX;
                posY1 = evt.clientY;

                sliderTrack.style.transition = '';

                document.addEventListener('touchmove', swipeAction);
                document.addEventListener('mousemove', swipeAction);
                document.addEventListener('touchend', swipeEnd);
                document.addEventListener('mouseup', swipeEnd);

                sliderList.classList.remove('grab');
                sliderList.classList.add('grabbing');
            }
        },
        swipeAction = function () {

            let evt = getEvent(),
                style = sliderTrack.style.transform,
                transform = +style.match(trfRegExp)[0];

            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;

            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;

            if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2);
                if (posY > 7 || posX2 === 0) {
                    isScroll = true;
                    allowSwipe = false;
                } else if (posY < 7) {
                    isSwipe = true;
                }
            }

            if (isSwipe) {
                if (slideIndex === 0) {
                    if (posInit < posX1) {
                        setTransform(transform, 0);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                if (slideIndex === --slides.length) {
                    if (posInit > posX1) {
                        setTransform(transform, lastTrf);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                    reachEdge();
                    return;
                }

                sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
            }

        },
        swipeEnd = function () {
            posFinal = posInit - posX1;

            isScroll = false;
            isSwipe = false;

            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);

            sliderList.classList.add('grab');
            sliderList.classList.remove('grabbing');

            if (allowSwipe) {
                swipeEndTime = Date.now();
                if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
                    if (posInit < posX1) {
                        slideIndex--;
                    } else if (posInit > posX1) {
                        slideIndex++;
                    }
                }

                if (posInit !== posX1) {
                    allowSwipe = false;
                    slide();
                } else {
                    allowSwipe = true;
                }

            } else {
                allowSwipe = true;
            }

        },
        setTransform = function (transform, comapreTransform) {
            if (transform >= comapreTransform) {
                if (transform > comapreTransform) {
                    sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
                }
            }
            allowSwipe = false;
        },
        reachEdge = function () {
            transition = false;
            swipeEnd();
            allowSwipe = true;
        };

    const updateActiveClass = function () {
        slides.forEach((slide, index) => {
            slide.classList.toggle('activei', index === slideIndex);
        });
    };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    sliderList.classList.add('grab');

    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);

    arrows.addEventListener('click', function () {
        let target = event.target;

        if (target.classList.contains('next')) {
            slideIndex++;
        } else if (target.classList.contains('prev')) {
            slideIndex--;
        } else {
            return;
        }

        slide();
    });

    updateActiveClass(); // Initial call to set the active class
    document.addEventListener("DOMContentLoaded", function (e) {
            document.getElementById('nxt').click();
    });

}  


document.querySelectorAll('.slideri').forEach(slider => {
    initializeSlider(slider);
});


const popupdata = [
    {
     "imgUrl":"../newAssests/img/google2.png"
    },
    {
     "imgUrl":"../newAssests/img/hindustan.jpg"
    },
    {
     "imgUrl":"../newAssests/img/prabhat.png"
    },
    {
     "imgUrl":"../newAssests/img/google.jpg"
    },
    {
     "imgUrl":"../newAssests/img/jagran.jpg"
    },
    {
     "imgUrl":"../newAssests/img/durdarshan.png"
    }
    
 ]
 
 function Poppup(i) {
    var item = document.getElementById('popupData');
    item.innerHTML = `<img src="${popupdata[i].imgUrl}" alt="">`  
}
var btns = document.querySelectorAll('.award_popup');
var btnsBox = document.getElementById('hide');
var close = document.getElementById('close');

btns.forEach(function(btn) {
    btn.addEventListener("click", function(){
        btnsBox.style.display = "block";
        document.body.style.overflow = 'hidden';
    });
});

close.addEventListener("click", function(){
    btnsBox.style.display = "none";
    document.body.style.overflow = 'auto';

});


document.addEventListener("DOMContentLoaded", function() {
    let lazyloadImages = document.querySelectorAll("img.lazyload");

    function lazyLoad() {
        lazyloadImages.forEach(function(image) {
            if (image.getBoundingClientRect().top < window.innerHeight && image.getBoundingClientRect().bottom > 0) {
                image.src = image.dataset.src;
                image.classList.remove("lazyload");
            }
        });

        // Optionally remove event listener once all images are loaded
        lazyloadImages = document.querySelectorAll("img.lazyload");
        if (lazyloadImages.length === 0) {
            window.removeEventListener("scroll", lazyLoad);
        }
    }

    // Run on scroll and initial page load
    window.addEventListener("scroll", lazyLoad);
    window.addEventListener("resize", lazyLoad);
    lazyLoad(); // To load images immediately in the viewport on page load
});
