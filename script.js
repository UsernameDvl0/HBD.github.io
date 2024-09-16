const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById ('current-time'),
durationEl = document.getElementById ('duration'),
progress = document.getElementById ('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play');

const music = new Audio();

const songs = [
    {
        path: '1.mp3',
        displayName: 'Happy Birthday To You',
        cover: '1.jpg',
        artist: 'Nayeon',
    },
    {
        path: '2.mp3',
        displayName: 'About You',
        cover: '2.jpg',
        artist: 'The living 1975',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    //Change Play button Icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    //Change Pause button Icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;  // Updates the image dynamically
}

function ChangeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgessBar() {
    const { duration, currentTime } = music;
    if (!isNaN(duration)) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
    
        const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
        durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
        currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
    }
}

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => ChangeMusic(-1));
nextBtn.addEventListener('click', () => ChangeMusic(1));
music.addEventListener('ended', () => ChangeMusic(1));
music.addEventListener('timeupdate', updateProgessBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);


