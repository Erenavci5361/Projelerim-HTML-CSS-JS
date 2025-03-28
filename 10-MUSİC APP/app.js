const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Mabel Matiz',
        cover: 'assets/1.JPG',
        artist: 'Kömür',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Evdeki Saat',
        cover: 'assets/2.JPG',
        artist: 'Uzunlar V1',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Simge',
        cover: 'assets/3.JPG',
        artist: 'Önümüz Yaz',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Dedüblüman',
        cover: 'assets/4.jpg',
        artist: 'Sen Bilmezsin',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Can Ozan',
        cover: 'assets/5.JPG',
        artist: 'Toprak Yağmura',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Emircan İğrek',
        cover: 'assets/6.jpg',
        artist: 'Bir Karanfil',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'Melike Şahin',
        cover: 'assets/7.jpg',
        artist: 'Ortak',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Yalın',
        cover: 'assets/8.jpg',
        artist: 'Halbuki',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (duration) {
        durationEl.textContent = formatTime(duration);
    }
    currentTimeEl.textContent = formatTime(currentTime);
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);



