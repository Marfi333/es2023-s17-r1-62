let landingVideos = [
    // ! "assets/media/video/Cheering crowd.mp4",
    // "assets/media/video/Concert - 1630.mp4", // ?
    "assets/media/video/Live music concert.mp4",
    // "assets/media/video/Performing trio.mp4",
    "assets/media/video/Pexels Videos 2044181.mp4", // ?
    // "assets/media/video/pexels-anthony-shkraba-production-8043626.mp4",
    "assets/media/video/pexels-big-bag-films-8514052.mp4",
    // "assets/media/video/pexels-c-technical-7095064.mp4",
    "assets/media/video/pexels-kelly-lacy-9481012.mp4",
    //"assets/media/video/pexels-yan-krukov-9006153.mp4",
    "assets/media/video/Rock Band Concert.mp4" // ?
];

let currentVideo = 0;
let landingAP = true;

const getLandingPlayer = ( num ) => {
    if ( num !== undefined )
    {
        return num == 1 ? document.getElementsByClassName( "vplayer-1" )[0] : document.getElementsByClassName( "vplayer-2" )[0];
    }
}

const getCurrentLandingPlayer = ( num ) => {
    if ( num )
    {
        return landingAP ? document.getElementsByClassName( "vplayer-1" )[0] : document.getElementsByClassName( "vplayer-2" )[0];
    }
    else
    {
        return landingAP ? document.getElementsByClassName( "vplayer-2" )[0] : document.getElementsByClassName( "vplayer-1" )[0];
    }
}

const toggleCurrentLandingPlayer = () => {
    landingAP = !landingAP;
    return getCurrentLandingPlayer( true );
}


const landingVideo = ( num ) => {
    getCurrentLandingPlayer( true ).setAttribute( "src", landingVideos[num] );
    getCurrentLandingPlayer( false ).setAttribute( "src", landingVideos[(num+1 >= landingVideos.length ? 0 : num+1)] );

    getCurrentLandingPlayer( true ).load();
    getCurrentLandingPlayer( false ).load();

    getCurrentLandingPlayer( true ).autoplay = true;
    getCurrentLandingPlayer( false ).autoplay = false;

    getCurrentLandingPlayer( true ).hidden = false;
    getCurrentLandingPlayer( false ).hidden = true;
}

const landingVideoHandler = ( event ) => {
    currentVideo++;

    if ( currentVideo == landingVideos.length )
    {
        currentVideo = 0;
    }

    toggleCurrentLandingPlayer();
    landingVideo(currentVideo);
}

getLandingPlayer(1).addEventListener("ended", landingVideoHandler, false);
getLandingPlayer(2).addEventListener("ended", landingVideoHandler, false);

landingVideo(0);






const landingVideoPlayer = ( player, num ) => {
    player.setAttribute( "src", landingVideos[num] );
    player.autoplay = true;
    player.load();
}

const landingVideoHandler1 = ( event ) => {
    let player = event.target;
    currentVideo++;

    if ( currentVideo == landingVideos.length )
    {
        currentVideo = 0;
        landingVideoPlayer( player, currentVideo );
    }
    else 
    {
        landingVideoPlayer( player, currentVideo );
    }
}

const landingVideoMonitor = ( player ) => {
    if ( !player ) return;

    const promise = player.play();

    if ( promise !== undefined )
    {
        promise.then(() => {
            
        })
        .catch((err) => {
            player.muted = true;
            player.play();
        });
    }
}


let landingPlayer = document.getElementsByClassName( "landing-video-player" )[0];




/**
 * Countdown timer for the website reveal
 */
if ( document.getElementById( "info-countdown" ) !== null )
{
    let countdown = setInterval(() => {
        let countdownDate = new Date("2022-03-19 0:0:0").getTime();
        let currentDate = new Date().getTime();
    
        let distance = countdownDate - currentDate;
    
        if ( distance > 0 )
        {
            document.getElementById( "info-countdown" ).innerText = "- " +
                Math.floor( distance / (1000 * 60 * 60 * 24)) + " d " +
                Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + " h " +
                Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + " m " +
                Math.floor((distance % (1000 * 60)) / 1000) + " s";
        }
        else 
        {
            clearInterval( countdown );
            document.getElementById( "info-countdown" ).innerText = "available now";
        }
    }, 1000 );
}

/**
 * Social media button animation
 */
let socialTransitionState = {};
for ( let item of document.getElementsByClassName( "social-item" ) )
{
    socialTransitionState[item.dataset.social] = true;

    item.addEventListener( "transitionend", e => {
        if ( e.propertyName == "color" && e.target.localName == "i" )
        {
            //if ( !socialTransitionState[e.target.parentNode.dataset.social] )
            if ( !socialTransitionState[item.dataset.social] )
            {
                let tmpTransition = item.style.transition;
                item.style.transition = "none";

                item.classList.toggle( "radial-out" );
                item.classList.toggle( "radial-out-" + item.dataset.social );
                item.classList.toggle( "linear-in" );

                setTimeout(() => {
                    item.style.transition = tmpTransition;
                    item.classList.toggle( "linear-in" );
                }, 500);
            }
            else
            {
                item.classList.toggle( "radial-out" );
                item.classList.toggle( "radial-out-" + item.dataset.social );
            }

            //socialTransitionState[e.target.parentNode.dataset.social] = !socialTransitionState[e.target.parentNode.dataset.social];
            socialTransitionState[item.dataset.social] = !socialTransitionState[item.dataset.social];
        }
    });
}


/**
 * Scroll to functions
 */
const scrollToAnchor = event => {
    if ( event !== null )
    {
        let element = document.getElementById( event.target.parentNode.dataset.link );
        let offset = element.offsetTop - 50 < 0 ? 0 : element.offsetTop - 50;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}

let scrollToTopBtn = document.getElementsByClassName( "scroll-to-top" )[0];
scrollToTopBtn.addEventListener( "click", e => {
    window.scrollTo( {top: 0, behavior: 'smooth'} );
}, false );


/**
 * FAQ collapsible box handler
 */
for ( let item of document.getElementsByClassName( "collapsible" ) )
{
    item.addEventListener( "click", e => {
        e.target.classList.toggle( "active" );

        let content = e.target.nextElementSibling;
        content.style.display = content.style.display === "block" ? "none" : "block";
    });
}


/**
 * Page scroll link setup
 */
for ( let item of document.getElementsByClassName( "scroll-link" ) )
{
    if ( item.nodeName === "DIV" || item.nodeName === "BUTTON" )
    {
        item.addEventListener( "click", scrollToAnchor, false );
    }
}


/**
 * Navbar active link selectors
 */
let anchors = [];
let navItems = {};
for ( let item of document.getElementsByTagName( "section" ) )
{
    anchors.push({
        offset: item.offsetTop,
        name: item.id
    });
}

for ( let item of document.getElementsByClassName( "navigation" )[0].children )
{
    navItems[item.dataset.link] = item;
}


/**
 * Scrolling tracker
 */
let scrollTrigger = 90;
const scrollChange = e => {
    // Navigation show, scroll to top button show
    if ( document.body.scrollTop > scrollTrigger || document.documentElement.scrollTop > scrollTrigger )
    {
        document.getElementsByTagName( "header" )[0].classList.add( "navigation-scroll" );
        document.getElementsByClassName( "scroll-to-top" )[0].style.right = "20px";
    }
    else
    {
        document.getElementsByTagName( "header" )[0].classList.remove( "navigation-scroll" );
        document.getElementsByClassName( "scroll-to-top" )[0].style.right = "-50px";
    }

    // Scroll button color change
    let scrollBtn = document.getElementsByClassName( "scroll-to-top" )[0];
    scrollBtn.style.pointerEvents = "none";

    let x = scrollBtn.offsetLeft + scrollBtn.clientWidth;
    let y = scrollBtn.offsetTop + scrollBtn.clientHeight;
    scrollBtn.style.pointerEvents = "all";

    console.log(scrollBtn)
    if ( document.elementFromPoint( x, y ) !== null && document.elementFromPoint( x, y ).dataset.bg == "dark" )
    {
        scrollBtn.classList.add( "bg-inverse" );
    }
    else
    {
        scrollBtn.classList.remove( "bg-inverse" );
    }

    // Navbar active effect
    for ( let i = anchors.length-1; i >= 0; i-- )
    {
    if ( document.body.scrollTop > anchors[i].offset || document.documentElement.scrollTop > anchors[i].offset-60 )
    {
        for ( let tmp in navItems )
        {
            navItems[tmp].classList.remove( "active" );
        }
        navItems[anchors[i].name].classList.add( "active" );

        break;
    }
    }
}
window.addEventListener( "scroll", scrollChange, false );


/**
 * Mobile navigation handler
 */
document.getElementById( "hamburger-nav" ).addEventListener( "click", () => {
    document.getElementById( "full-page-navigation" ).classList.toggle( "active" );
    document.getElementsByTagName( "body" )[0].classList.toggle( "active-hamburger" );
});

for ( let item of document.getElementsByClassName( "nav-exit" ) )
{
    item.addEventListener( "click", () => {
        document.getElementById( "full-page-navigation" ).classList.toggle( "active" );
        document.getElementsByTagName( "body" )[0].classList.toggle( "active-hamburger" );
    })
}