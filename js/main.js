
const header = document.querySelector('#header');
const sideBox = document.querySelector('.side_box');
const variableWidths = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');
const hiddenMenu = document.querySelector('.hidden_menu');


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

        let pk = elem.getAttribute('name');

        $.ajax({
            type:'POST',
            url:'data/like.json',
            data: {pk},
            dataType:'json',
            success: function(response){
                let likecount = document.querySelector('#like-count-37');
                likecount.innerHTML = '좋아요' + response.like_count + '개'
            },
            error:function (request, status, error){
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        })
    }
    else if(elem.matches('[data-name="bookmark"]')){
        console.log("북마크");

        let pk = elem.getAttribute('name');

        $.ajax({
            type:'POST',
            url:'data/bookmark.json',
            data:{pk},
            dataType:'json',
            success:function (response){
                let bookmarCount = document.querySelector('#bookmark-count-37');
                bookmarCount.innerHTML = '북마크' + response.bookmark_count + '개';
            },
            error:function (request, status, error){
                alert('로그인이 필요합니다.');
                window.location.replace('https://www.naver.com');
            }
        });
    }
    else if(elem.matches('[data-name="comment"]')){

        let content = document.querySelector('#add-comment-post37 > input[type=text]').value;

        console.log(content);

        if(content.length > 140){
            alert('댓글은 최대 140자 입력이 가능합니다. 현재 글자수 : ' + content.length);
            return;
       }

        $.ajax({
            type:'POST',
            url:'./comment.html',
            data:{
                'pk': 37,
                'content': content,
            },
            dataType:'html',
            success:function (data){
                document.querySelector('#comment-list-ajax-post37')
                    .insertAdjacentHTML('afterbegin', data);
            },
            error:function (request, status, error){
                alert('문제가 발생했습니다.');
            }
        })

        document.querySelector('#add-comment-post37 > input[type=text]').value = '';
    }
    else if(elem.matches('[data-name="comment_delete"]')){
        $.ajax({
            type:'POST',
            url:'data/delete.json',
            data:{
                'pk': 37,
            },
            dataType:'json',
            success:function (response){
                if(response.status){
                    let comt = document.querySelector('.comment-detail');
                    comt.remove();
                }
            },
            error:function (request, status, error){
                alert('문제가 발생했습니다.');
            }
        })
    }
    else if(elem.matches('[data-name="follow"]')){
        $.ajax({
            type:'POST',
            url:'data/follow.json',
            data:{
                'pk': 37,
            },
            dataType:'json',
            success:function (response){
                if(response.status){
                    document.querySelector('input.follow').value = "팔로잉";
                }else{
                    document.querySelector('input.follow').value = "팔로워";
                }
            },
            error:function (request, status, error){
                alert('문제가 발생했습니다.');
                window.location.replace('https://www.naver.com');
            }
        })
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
    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    //console.log('scrollHeight : ' + scrollHeight);
    //console.log('documentHeight : ' + documentHeight);

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

    if(scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        document.querySelector('#page').value = parseInt(page)+1;

        console.log('page : ' + page);
        callMorePostAjax(page);


    }
}

function callMorePostAjax(page){

    if(page >5) {
        return;
    }

    $.ajax({
        type:'POST',
        url:'./post.html',
        data:{
            'page':page,
        },
        dataType:'html',
        success:addMorePostAjax,
        error:function (request, status, error){
            alert('문제가 발생했습니다.');
            window.location.replace('https://www.naver.com');
        }

    })
}

function addMorePostAjax(data){
    delegation.insertAdjacentHTML('beforeend', data);
}

setTimeout(function (){
    scrollTo(0,0);
}, 100)

if(delegation){
    delegation.addEventListener('click', delegationFunc);
}

window.addEventListener('resize', resizeFunc);
window.addEventListener('scroll', scrollFunc);
