
const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');
const variableWidths = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');


function delegationFunc(e) {
    let elem = e.target;
    console.log(elem);

    while(!elem.getAttribute("data-name")){
        elem = elem.parentNode;

        if(elem.nodeName === 'BODY'){
            elem = null;
            return;
        }
    }

    if(elem.matches('[data-name="heartbeat"]')){
        console.log("하트");
    }
    else if(elem.matches('[data-name="bookmark"]')){
        console.log("북마크");
    }
    else if(elem.matches('[data-name="share"]')){
        console.log("공유");
    }
    else if(elem.matches('[data-name="more"]')){
        console.log("더보기");
    }

    elem.classList.toggle('on');
}

function resizeFunc(){
    if(pageYOffset >= 10){
        let calcWidth = window.innerWidth*0.5 + 167;

        sideBox.style.left = calcWidth + 'px';
    }

    if(matchMedia('screen and (max-width : 800px)').matches){
        for(let i=0; i< variableWidths.length; i++){
            variableWidths[i].style.width = window.innerWidth -20 + 'px';
        }
    }else{
        for(let i=0; i< variableWidths.length; i++){
            if(window.innerWidth > 600){
                variableWidths[i].removeAttribute('style');
            }
        }
    }
}

function scrollFunc(){
    console.log(pageYOffset);

    if(pageYOffset >= 10){
        header.classList.add('on');

        if(sideBox){
            sideBox.classList.add('on');
        }

        resizeFunc();
    }else{
        header.classList.remove('on');

        if(sideBox){
            sideBox.classList.remove('on');
            sideBox.removeAttribute('style');
        }
    }
}

setTimeout(function (){
    scrollTo(0,0);
}, 100)

if(delegation){
    delegation.addEventListener('click', delegationFunc);
}

window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
