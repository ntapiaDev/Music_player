import tracks from '/assets/js/tracks.js';

const artist = document.querySelector('.artist-name');
const title = document.querySelector('.title-name');

const volume = document.querySelector('.controls input');
const avancement = document.querySelector('.infos input');
avancement.value = 0;

//Affichage des pistes
tracks.forEach(track => {
    let clone = document.importNode(document.querySelector('template').content, true);
    clone.querySelector('img').src = `/assets/pochettes/150/${track.image}`;
    clone.querySelector('img').alt = `pochette de la piste ${track.title}`;
    clone.querySelector('p:nth-child(2)').textContent = track.artist;
    clone.querySelector('p:nth-child(3)').textContent = track.title;
    document.querySelector('.grid').appendChild(clone);
});

//PLAYER
let curr_track = document.createElement('audio');
let track_index = -1;
let isPlaying = false;

const button = document.querySelector('.play span')
const setPlay = () => {
    curr_track.play();
    isPlaying = true;
    button.classList.remove('fa-circle-play');
    button.classList.add('fa-circle-pause');
}
const setPause = () => {
    curr_track.pause();
    isPlaying = false;
    button.classList.remove('fa-circle-pause');
    button.classList.add('fa-circle-play');
}
const play = (i, change) => {
    if(track_index !== i || change === true) {
        track_index = i;
        curr_track.src = `/assets/media/${tracks[track_index].path}`;
        artist.textContent = tracks[track_index].artist;
        title.textContent = tracks[track_index].title;
        curr_track.volume = volume.value / 100
        avancement.value = 0;
        curr_track.load();
        setPlay();
        setTimeout(displayTime, 10);
        curr_track.addEventListener('timeupdate', () => {
            setTimeout(() => avancement.value = curr_track.currentTime / curr_track.duration * 100, 10);
            setTimeout(displayTime, 10);
            if(avancement.value == 100) {
                track_index = track_index >= (tracks.length - 1) ? 0 : (track_index + 1);
                play(track_index, true);
            }
        });
    } else if(isPlaying === false) {
        setPlay();
    } else {
        setPause();
    }
}

//Lancement de la musique !
    //Click sur les titres
const titles = document.querySelectorAll('.title');
titles.forEach((title, i) => title.addEventListener('click', () => play(i, false)))
    //Boutons
const playBtn = document.querySelector('.play');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

playBtn.addEventListener('click', () => {
    track_index === -1 ? play(0, false) : play(track_index, false);
});
prev.addEventListener('click', () => {
    track_index = track_index <= 0 ? (tracks.length - 1) : (track_index - 1);
    play(track_index, true);
});
next.addEventListener('click', () => {
    track_index = track_index >= (tracks.length - 1) ? 0 : (track_index + 1);
    play(track_index, true);
});

//Changement volume
volume.addEventListener('change', () => curr_track.volume = volume.value / 100);

//Barre d'avancement
avancement.addEventListener('change', () => {
    curr_track.currentTime = curr_track.duration * avancement.value / 100;
    displayTime();
});

const displayTime = () => document.querySelector('.time-left').textContent = Math.round(curr_track.duration - curr_track.currentTime) + ' sec';