let startAudio;
let bgAudio;
let endAudio;
let stripe;
let img;
let bg;
let img_cont;

let currLevel = 0;

let coords = [
    {
        x0: 1219,
        y0: 1969,
        x1: 1315,
        y1: 2071
    },
    {
        x0: 9,
        y0: 694,
        x1: 100,
        y1: 785
    },
    {
        x0: 2201,
        y0: 423,
        x1: 2246,
        y1: 458
    }
]

function changeText(header, text) {
    while (stripe.firstChild) {
        stripe.removeChild(stripe.lastChild);
    }
    let h2 = document.createElement('h2');
    h2.textContent = header;
    let p = document.createElement('p');
    p.textContent = text;
    stripe.appendChild(h2);
    stripe.appendChild(p);
}

function showStripe() {
    stripe.style.opacity = '100%';
    setTimeout(() => stripe.style.display = 'block', 750);
}

function hideStripe() {
    stripe.style.opacity = '0';
    setTimeout(() => stripe.style.display = 'none', 750);
}

function changeImg(url) {
    img.style.opacity = '0';
    setTimeout(() => img.style.opacity = '100%', 810);
    setTimeout(() => {
        img.src = url;
    }, 750);
}

function check(event) {
    let bounds = this.getBoundingClientRect();
    let x = event.clientX - bounds.left;
    let y = event.clientY - bounds.top;
    let cw = this.clientWidth;
    let ch = this.clientHeight;
    let nw = this.naturalWidth;
    let nh = this.naturalHeight;
    let px = x / cw * nw;
    let py = y / ch * nh;
    /*console.log('x: ' + x);
    console.log('y: ' + y);
    console.log('cw: ' + cw);
    console.log('ch: ' + ch);
    console.log('nw: ' + nw);
    console.log('nh: ' + nh);
    console.log('px: ' + px);
    console.log('py: ' + py);*/

    if (px >= coords[currLevel - 1].x0 && px <= coords[currLevel - 1].x1
        && py >= coords[currLevel - 1].y0 && py <= coords[currLevel - 1].y1) {
        win();
    }
}

function nextLevel() {
    if (currLevel === 3) {
        changeText('Фигасе, ты прошёл игру!', 'ну чел, с днём рождения тебя!');
        endAudio.play();
        changeImg('/assets/denmogus.png');
        bg.style.backgroundImage = 'url("/assets/raigor.png")';
        //img.src = '/assets/denmogus.png';
        img.removeEventListener('click', check);
        return;
    }

    hideStripe();
    if (currLevel === 0) {
        setTimeout(() => changeText('Поздравляем! Ты нашёл денмогуса!', 'нифига он умный'), 1000);
    }
    ++currLevel;
    changeImg('/assets/levels/level_' + currLevel + '/level.png');
    bg.style.backgroundImage = 'url("/assets/levels/level_' + currLevel + '/level.png")';
    //img.src = '/assets/levels/level_' + currLevel + '/level.png';
    bgAudio.play();
}

function win() {
    bgAudio.pause();
    let lvlAudio = document.querySelector('#lvl_snd' + currLevel);
    lvlAudio.play();
    changeImg('/assets/levels/level_' + currLevel + '/win.png');
    bg.style.backgroundImage = 'url("/assets/levels/level_' + currLevel + '/win.png")';
    //img.src = '/assets/levels/level_' + currLevel + '/win.png';
    showStripe();
    lvlAudio.addEventListener('ended', nextLevel);
}

window.onload = () => {
    document.body.style.display = 'block';
    startAudio = document.querySelector('#start_snd');
    bgAudio = document.querySelector('#bg_snd');
    endAudio = document.querySelector('#end_snd');
    stripe = document.querySelector('#stripe');
    img = document.querySelector('#img');
    bg = document.querySelector('#bg');
    img_cont = document.querySelector('#img_cont');
    img.addEventListener('click', () => startAudio.play(), {once: true})
    stripe.addEventListener('click', () => {
        startAudio.pause();
        nextLevel();
        img.addEventListener('click', check);
    }, {once: true});
}