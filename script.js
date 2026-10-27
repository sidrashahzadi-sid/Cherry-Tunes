const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-Btn");
const playIcon = playBtn.querySelector("i");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress-container");
const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");
const songs = [
    {
        title: "Midnight Dreams",
        artist: "Lofi Vibes",
        file: "music1.mp3"
    },
{
        title: "Midnight Dream1",
        artist: "Lofi Vibes",
        file: "music2.mp3"
    },
{
        title: "Midnight Dreams2",
        artist: "Lofi Vibes",
        file: "music3.mp3"
    },
{
        title: "Midnight Dreams3",
        artist: "Lofi Vibes",
        file: "music4.mp3"
    },
{
        title: "Midnight Dreams4",
        artist: "Lofi Vibes",
        file: "music5.mp3"
    },
{
        title: "Midnight Dreams5",
        artist: "Lofi Vibes",
        file: "music6.mp3"
    },
{
        title: "Midnight Dreams6",
        artist: "Lofi Vibes",
        file: "music7.mp3"
    },
    {
        title: "Midnight Dreams7",
        artist: "Lofi Vibes",
        file: "music8.mp3"
    }
];
let songIndex = 0;

function formatTime(seconds){
    if(!Number.isFinite(seconds)){
        return "0:00";
    }
    const minutes = Math.floor(seconds/60);
    const remainingSeconds = Math.floor(seconds%60);
    return `${minutes}:${String(remainingSeconds).padStart(2,"0")}`;
}

function updatePlayButton(isPlaying){
    if (isPlaying) {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        playBtn.setAttribute("aria-label", "Pause Music");
    } else {
        playIcon.classList.remove("fa-pause");
        playIcon.classList.add("fa-play");

        playBtn.setAttribute("aria-label","Play Music");
    }
};
function loadSong(index){
    const song = songs[index];
    audio.src = song.file;
    songTitle.textContent = song.title;
    artistName.textContent = song.artist;
progressBar.style.width = "0%";
currentTimeText.textContent = "0:00";
durationText.textContent = "0:00";

audio.load();
}
async function playMusic(){
    try{
        await audio.play();
        updatePlayButton(true);
    } catch (error) {
        console.error("Could Not Play the Audio:", error);
        updatePlayButton(false);
    }
}
function pauseMusic() {
    audio.pause();
    updatePlayButton(false);
}
playBtn.addEventListener("click", () => {
    if(audio.paused){
        playMusic();
    }
    else {
        pauseMusic();
    }
});
audio.addEventListener("timeupdate", () => {
    if(!Number.isFinite(audio.duration) || audio.duration <= 0) {
        return;
    }
    const progress = (audio.currentTime/audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
    currentTimeText.textContent = formatTime(audio.currentTime);
});
audio.addEventListener("loadedmetadata", () => {
    durationText.textContent = formatTime(audio.duration);
});
progressContainer.addEventListener("click", (event) => {
    if(!Number.isFinite(audio.duration) || audio.duration <= 0) {
        return;
    }
    const rect = progressContainer.getBoundingClientRect();
    const clickPosition = event.clientX - rect.left;

    const percentage= Math.max(
        0,
        Math.min(1, clickPosition / rect.width)
    );
    audio.currentTime = percentage * audio.duration;
});
function changeSong(index) {
    const wasPlaying = !audio.paused;
    songIndex = (index + songs.length) % songs.length;
    loadSong(songIndex);
    if(wasPlaying){
        playMusic();
    } else {
        updatePlayButton(false);
    }
}
previousBtn.addEventListener("click", () => {
    changeSong(songIndex - 1);

});
nextBtn.addEventListener("click", () => {
    changeSong(songIndex + 1)
});
audio.addEventListener("ended", () =>{
     changeSong(songIndex + 1);
});
audio.addEventListener("play", () =>{
     updatePlayButton(true);
});
audio.addEventListener("paused", () =>{
     updatePlayButton(false);
});
loadSong(songIndex);
