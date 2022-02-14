

const heart = document.querySelector('.heart_button');

heart.addEventListener('click', function (){
    console.log('hit');
    heart.classList.toggle('on');
})