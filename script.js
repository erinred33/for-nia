const character = document.getElementById("character");
const backgroundMusic = document.getElementById("background-music");
const kissSound = document.getElementById("kiss-sound");
const welcomeScreen = document.getElementById("welcome-screen");
const tapMessage = document.getElementById("tap-message");


function playAudio(audio) {
    if (!audio) {
        return;
    }

    audio.volume = 0.6;

    const playPromise = audio.play();

    if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch((error) => {
            console.warn("Audio could not start:", error);
        });
    }
}


const frames = [
    "frame1.png",
    "frame2.png",
    "frame3.png",
    "frame4.png",
    "frame6.png",
    "frame7.png",
    "frame8.png"
];


frames.forEach((src) => {

    const image = new Image();

    image.src = src;

});

let isAnimating = false;
let hasShownCharacter = false;

const frameDuration = 120;

if (backgroundMusic) {
    backgroundMusic.src = "kiss%20me.mp3";
    backgroundMusic.load();
    backgroundMusic.muted = true;
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.6;
    backgroundMusic.autoplay = true;
    playAudio(backgroundMusic);

    document.addEventListener("pointerdown", () => {
        backgroundMusic.muted = false;
        backgroundMusic.volume = 0.6;
        playAudio(backgroundMusic);
    }, { once: true });
}

if (welcomeScreen) {
    welcomeScreen.addEventListener("pointerdown", (event) => {
        event.stopPropagation();

        if (hasShownCharacter) {
            return;
        }

        welcomeScreen.style.opacity = "0";
        welcomeScreen.style.visibility = "hidden";
        welcomeScreen.style.pointerEvents = "none";

        if (tapMessage) {
            tapMessage.style.opacity = "1";
            tapMessage.style.visibility = "visible";
        }

        character.src = frames[0];
        hasShownCharacter = true;
    });
}

document.addEventListener("pointerdown", (event) => {

    if (!hasShownCharacter) {
        return;
    }

    if (tapMessage) {
        tapMessage.style.opacity = "1";
        tapMessage.style.visibility = "visible";
    }

    if (isAnimating) {
        return;
    }

    isAnimating = true;
    playAudio(backgroundMusic);
    playAudio(kissSound);

    let currentFrame = 0;
    character.src = frames[0];
    const animation = setInterval(() => {
        currentFrame++;
        if (currentFrame >= frames.length) {

            clearInterval(animation);
            character.src = frames[0];
            isAnimating = false;
            return;
        }
        character.src = frames[currentFrame];

    }, frameDuration);


});