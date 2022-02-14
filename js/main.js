
const hearts = document.querySelector('.heart_button');
const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');
const variableWidths = document.querySelectorAll('.contents_box .contents');

hearts.addEventListener('click', function (){
    console.log('hit');
    hearts.classList.toggle('on');
})

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
            variableWidths[i].removeAttribute('style');
        }
    }
}

function scrollFunc(){
    console.log(pageYOffset);

    if(pageYOffset >= 10){
        header.classList.add('on');
        sideBox.classList.add('on');
        resizeFunc();
    }else{
        header.classList.remove('on');
        sideBox.classList.remove('on');
        sideBox.removeAttribute('style');
    }
}

window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
