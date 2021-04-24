var initialBoy;
var gamer;
// var kickplayer = document.getElementById("kick");
var kickAnim;
var kicked = false;
var kicked2 = false;
var kicked3 = false;

var punched = false;
var punched2 = false;
var punched3 = false;

var isWin = false;
var iscapsule1 = false;
var iscapsule2 = false;
var iscapsule3 = false;
var iscapsule4 = false;

onload = function startAnimation() {
    
    addIdle();
    
    // var ctx = canvas.getContext("2d");
    // var anim = document.getElementById("animation");
    // ctx.(anim, 10, 10);
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    setTimeout(() => {
        initialBoy = setInterval(function () {
            frames[i % frameCount].style.display = "none";
            frames[++i % frameCount].style.display = "block";
        }, 100);
    }, 500);

}



let isPlaying = false;



var player = document.getElementById('animation');

function load_images() {
    //player , virus , gem
    corona_img = new Image();
    corona_img.src = "images/corona.png";

    capsule1 = new Image();
    capsule1.src = "images/capsules/capsule1.png";

    capsule2 = new Image();
    capsule2.src = "images/capsules/capsule2.png";

    capsule3 = new Image();
    capsule3.src = "images/capsules/capsule3.png";

    capsule4 = new Image();
    capsule4.src = "images/capsules/capsule4.png";

    injection_img = new Image();
    injection_img.src = "images/injection.png";

    life_img = new Image();
    life_img.src = "images/life/1.png";

    

}
var boyX = 0;
function RightMove() {
    if (boyX <= 850) {
        boyX += 20;
        player.style.position = "relative";
        player.style.transform = "translateX(" + boyX + "px)";
        var style = window.getComputedStyle(player);
        var matrix = new WebKitCSSMatrix(style.transform);
        var xvalue = matrix.m41;
        console.log(xvalue)
        console.log(enemy[0])

        if (xvalue == 60) {
            //iscapsule1 = true;
            capsule1.src = "images/capsules/grow1.png";
            capsule_collect.play();
            life_img.src = "images/life/2.png";
            //console.log('capsule1')
        }

        if (xvalue == 260) {
            //iscapsule2 = true;
            capsule2.src = "images/capsules/grow2.png";
            capsule_collect.play();
            life_img.src = "images/life/3.png";
            //console.log('capsule2')
        }

        if (xvalue == 560) {
            //iscapsule3 = true;
            capsule3.src = "images/capsules/grow3.png";
            capsule_collect.play();
            life_img.src = "images/life/4.png";
            //console.log('capsule3')
        }

        if (xvalue == 700) {
            //iscapsule4 = true;
            capsule4.src = "images/capsules/grow4.png";
            life_img.src = "images/life/5.png";
            capsule_collect.play();
            gameover();
            //console.log('capsule4')
        }
    }

}
function LeftMove() {
    if (boyX >= 0) {
        boyX -= 20;
        player.style.position = "relative";
        player.style.transform = "translateX(" + boyX + "px)";
        //clearInterval(gamer);
        var style = window.getComputedStyle(player);
        var matrix = new WebKitCSSMatrix(style.transform);
        var xvalue = matrix.m41;
        console.log(xvalue)
        console.log(enemy[0])
    }

}
var cvs;
var pen, H, W;
function init() {
    cvs = document.getElementById('myCanvas');
    W = cvs.width = 1252;
    H = cvs.height = 516;
    pen = cvs.getContext('2d');
    game_over = false;

    e1 = {
        x: 300,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };
    e2 = {
        x: 600,
        y: 150,
        w: 60,
        h: 60,
        speed: 35,
    };


    e3 = {
        x: 900,
        y: 300,
        w: 60,
        h: 60,
        speed: 40,
    };

    enemy = [e1, e2, e3];

    capsule1_val = {
        x: W - 1050,
        y: H - 100,
        w: 80,
        h: 80,
    }

    capsule2_val = {
        x: W - 800,
        y: H - 100,
        w: 80,
        h: 80,
    }

    capsule3_val = {
        x: W - 450,
        y: H - 100,
        w: 80,
        h: 80,
    }

    capsule4_val = {
        x: W - 250,
        y: H - 100,
        w: 80,
        h: 80,
    }

    injection = {
        x: W - 150,
        y: H - 130,
        w: 100,
        h: 100,
    }

    life = {
        x: W - 375,
        y: H- 575,
        w: 400,
        h: 200,
    }

    score = {
        x: W - 150,
        y: H / 6,
        w: 100,
        h: 100,
    }

    shoot = new Audio();
    shoot.src = "audio/shoot.mp3";
    
    capsule_collect = new Audio();
    capsule_collect.src = "Audio/capsule2.mp3";
    
    win = new Audio();
    win.src = "Audio/won.wav";

    blast = new Image;
    blast.src = "images/blast.gif";

    
}
function isOverlap(rect1, rect2) {
    // console.log(rect1);
    // console.log(rect2);
    var style = window.getComputedStyle(player);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xvalue = matrix.m41;
    if (!kicked && !punched) {
        if (xvalue < 170 && xvalue > 110) {
            return true;
        }
    }
    else if (!kicked2 && !punched2) {
        if (xvalue >= 380 && xvalue <= 460) {
            return true;
        }
    }
    else if (!kicked3 && !punched3) {
        if (xvalue >= 620 && xvalue <= 700) {
            return true;
        }
    }

}
function draw() {
    pen.clearRect(0, 0, W, H);
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_img,box.x,box.y,box.w,box.h);
    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(corona_img, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);

    }
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y > H - enemy[i].h || enemy[i].y <= 0) {
            enemy[i].speed *= -1;
        }
    }

    for (let i = 0; i < enemy.length; i++) {
        if (isOverlap(enemy[i], player)) {
            alert('You got Infected, Try Again');
            player.style.transform = "translateX(" + 0 + "px)";
            location.reload();
        }

    }
    if (!isWin) {
        pen.drawImage(injection_img, injection.x, injection.y, injection.w, injection.h);
    }

    if (!iscapsule1) {
        pen.drawImage(capsule1, capsule1_val.x, capsule1_val.y, capsule1_val.w, capsule1_val.h);
    }

    if (!iscapsule2) {
        pen.drawImage(capsule2, capsule2_val.x, capsule2_val.y, capsule2_val.w, capsule2_val.h);
    }

    if (!iscapsule3) {
        pen.drawImage(capsule3, capsule3_val.x, capsule3_val.y, capsule3_val.w, capsule3_val.h);
    }

    if (!iscapsule4) {
        pen.drawImage(capsule4, capsule4_val.x, capsule4_val.y, capsule4_val.w, capsule4_val.h);
    }

    pen.drawImage(life_img, life.x, life.y, life.w, life.h);

}
var played=0;
//function of images add in element div
function addIdle() {
    player.innerHTML = '';

    var img1 = document.createElement("img");
    img1.src = "images/idle/1.png";
    img1.id = "idle1";
    player.appendChild(img1);

    var img2 = document.createElement("img");
    img2.src = "images/idle/2.png";
    img2.id = "idle2";
    player.appendChild(img2);

    var img3 = document.createElement("img");
    img3.src = "images/idle/3.png";
    img3.id = "idle3";
    player.appendChild(img3);

    var img4 = document.createElement("img");
    img4.src = "images/idle/4.png";
    img4.id = "idle4";
    player.appendChild(img4);

    var img5 = document.createElement("img");
    img5.src = "images/idle/5.png";
    img5.id = "idle5";
    player.appendChild(img5);

    var img6 = document.createElement("img");
    img6.src = "images/idle/6.png";
    img6.id = "idle6";
    player.appendChild(img6);

    var img7 = document.createElement("img");
    img7.src = "images/idle/7.png";
    img7.id = "idle7";
    player.appendChild(img7);

    var img8 = document.createElement("img");
    img8.src = "images/idle/8.png";
    img8.id = "idle8";
    player.appendChild(img8);
}

function addKick() {
    player.innerHTML = '';

    var img1 = document.createElement("img");
    img1.src = "images/kick/1.png";
    img1.id = "kick1";
    player.appendChild(img1);

    var img2 = document.createElement("img");
    img2.src = "images/kick/2.png";
    img2.id = "kick2";
    player.appendChild(img2);

    var img3 = document.createElement("img");
    img3.src = "images/kick/3.png";
    img3.id = "kick3";
    player.appendChild(img3);

    var img4 = document.createElement("img");
    img4.src = "images/kick/4.png";
    img4.id = "kick4";
    player.appendChild(img4);

    var img5 = document.createElement("img");
    img5.src = "images/kick/5.png";
    img5.id = "kick5";
    player.appendChild(img5);

    var img6 = document.createElement("img");
    img6.src = "images/kick/6.png";
    img6.id = "kick6";
    player.appendChild(img6);

    var img7 = document.createElement("img");
    img7.src = "images/kick/7.png";
    img7.id = "kick7";
    player.appendChild(img7);
}

function addPunch() {
    player.innerHTML = '';

    var img1 = document.createElement("img");
    img1.src = "images/punch/1.png";
    img1.id = "punch1";
    player.appendChild(img1);

    var img2 = document.createElement("img");
    img2.src = "images/punch/2.png";
    img2.id = "punch2";
    player.appendChild(img2);

    var img3 = document.createElement("img");
    img3.src = "images/punch/3.png";
    img3.id = "punch3";
    player.appendChild(img3);

    var img4 = document.createElement("img");
    img4.src = "images/punch/4.png";
    img4.id = "punch4";
    player.appendChild(img4);

    var img5 = document.createElement("img");
    img5.src = "images/punch/5.png";
    img5.id = "punch5";
    player.appendChild(img5);

    var img6 = document.createElement("img");
    img6.src = "images/punch/6.png";
    img6.id = "punch6";
    player.appendChild(img6);

    var img7 = document.createElement("img");
    img7.src = "images/punch/7.png";
    img7.id = "punch7";
    player.appendChild(img7);
}

function addInjection() {
    player.innerHTML = '';

    var img1 = document.createElement("img");
    img1.src = "images/inject/1.png";
    img1.id = "idle1";
    player.appendChild(img1);

    var img2 = document.createElement("img");
    img2.src = "images/inject/2.png";
    img2.id = "idle2";
    player.appendChild(img2);

    var img3 = document.createElement("img");
    img3.src = "images/inject/3.png";
    img3.id = "idle3";
    player.appendChild(img3);

    var img4 = document.createElement("img");
    img4.src = "images/inject/4.png";
    img4.id = "idle4";
    player.appendChild(img4);

    var img5 = document.createElement("img");
    img5.src = "images/inject/5.png";
    img5.id = "idle5";
    player.appendChild(img5);

    var img6 = document.createElement("img");
    img6.src = "images/inject/6.png";
    img6.id = "idle6";
    player.appendChild(img6);

    var img7 = document.createElement("img");
    img7.src = "images/inject/7.png";
    img7.id = "idle7";
    player.appendChild(img7);

    var img8 = document.createElement("img");
    img8.src = "images/inject/8.png";
    img8.id = "idle8";
    player.appendChild(img8);
}

function resume() {
    addIdle();
    clearTimeout(kickAnim);
    player.hidden = false;
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    initialBoy = setInterval(function () {
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);
}

function kick() {
    addKick();
    player.style.transform = "translateX(" + boyX + "px)";
    clearTimeout(initialBoy);
    clearTimeout(kickAnim);
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    kickAnim = setInterval(function () {
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);
    setTimeout(() => {
        resume();
    }, 1400);
}

function punch() {
    addPunch();
    player.style.transform = "translateX(" + boyX + "px)";
    clearTimeout(initialBoy);
    clearTimeout(kickAnim);
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    kickAnim = setInterval(function () {
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);
    setTimeout(() => {
        resume();
    }, 1400);
}

function inject() {
    isWin = true;
    addInjection();
    player.style.transform = "translateX(" + boyX + "px)";
    clearTimeout(initialBoy);
    clearTimeout(kickAnim);
    var frames = document.getElementById("animation").children;
    var frameCount = frames.length;
    var i = 0;
    var injectAnim = setInterval(function () {
        frames[i % frameCount].style.display = "none";
        frames[++i % frameCount].style.display = "block";
    }, 100);
    
    setTimeout(() => {
        life_img.src = "images/life/6.png";
        clearInterval(injectAnim);
        setTimeout(() => {
            alert('Congratulations, You are Vaccinated, Want to Play Again!');
            player.style.transform = "translateX(" + 0 + "px)";
            location.reload();
        }, 1000)
    }, 750)
}
//function call
document.onkeypress = function (evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    if (charStr == 'a' || charStr == 'A') {
        LeftMove();
    }
    else if (charStr == 'd' || charStr == 'D') {
        RightMove();
    }
    else if (charStr == 'w' || charStr == 'W') {
        kick();
        var style = window.getComputedStyle(player);
        var matrix = new WebKitCSSMatrix(style.transform);
        var xvalue = matrix.m41;
        console.log(xvalue);


        if (xvalue >= 60 && xvalue <= 160 && !kicked && !punched) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);

            blast.hidden = false;
            shoot.play();
            enemy.splice(0, 1);
            console.log(enemy);
            kicked = true;
        }
        else if (xvalue >= 300 && xvalue <= 360 && !kicked2 && !punched2) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);
            shoot.play();
            enemy.splice(0, 1);
            kicked2 = true;
        }
        else if (xvalue >= 540 && xvalue <= 580 && !kicked3 && !punched3) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);
            shoot.play();
            enemy.splice(0, 1);
            kicked3 = true;
        }
    }
    else if (charStr == 's' || charStr == 'S') {
        punch();
        var style = window.getComputedStyle(player);
        var matrix = new WebKitCSSMatrix(style.transform);
        var xvalue = matrix.m41;
        console.log(xvalue);
        if (xvalue >= 60 && xvalue <= 160 && !punched && !kicked) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);

            shoot.play();
            enemy.splice(0, 1);
            console.log(enemy);
            punched = true;
        }
        else if (xvalue >= 300 && xvalue <= 360 && !punched2 && !kicked2) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);

            shoot.play();
            enemy.splice(0, 1);
            punched2 = true;
        }
        else if (xvalue >= 540 && xvalue <= 580 && !punched3 && !kicked3) {
            var i1 = enemy[0].x;
            var i2 = enemy[0].y;
            var i3 = enemy[0].w;
            var i4 = enemy[0].h;
            var blast1 = setInterval(function () {

                pen.drawImage(blast, i1, i2, i3, i4);
            }, 50);

            setTimeout(function () {

                clearInterval(blast1);
            }, 1500);

            shoot.play();
            enemy.splice(0, 1);
            punched3 = true;
        }
    }
};

function gameover() {
    setTimeout(() => {
        win.play();
        inject();
    }, 1500);
}
gamer = setInterval(() => {
    draw();
}, 100);
load_images();
init();

function audio_play()
{

    setTimeout(()=>{    
        game_aud = new Audio();
        game_aud.src = "Audio/capsule2.mp3";
        game_aud.play();
    },500);

}


