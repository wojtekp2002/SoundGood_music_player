const music = new Audio('audio/1.mp3');

const songs = [
    {
        id: '1',
        songName: `THANK GOD <br>
        <div class="subtitle">Travis Scott</div>`,
        poster:'img/img1.jpg',
        profile: 'artists/face1.jpg'
    },
    {
        id: '2',
        songName: `The Box <br>
        <div class="subtitle">Roddy Ricch</div>`,
        poster:'img/img2.jpg',
        profile: 'artists/face2.jpg'
    },
    {
        id: '3',
        songName: `St.Chroma <br>
        <div class="subtitle">Tayler, The Creator</div>`,
        poster:'img/img3.jpg',
        profile: 'artists/face3.jpg'
    },
    {
        id: '4',
        songName: `Nothing Burn Like The Cold <br>
        <div class="subtitle">Snoh Alegra</div>`,
        poster:'img/img4.jpg',
        profile: 'artists/face4.jpg'
    },
    {
        id: '5',
        songName: `Jackie Chan <br>
        <div class="subtitle">Tiesto, Dzeko, Preme</div>`,
        poster:'img/img5.jpg',
        profile: 'artists/face5.jpg'
    },
    {
        id: '6',
        songName: `NIGHTS LIKE THIS <br>
        <div class="subtitle">The Kid LAROI</div>`,
        poster:'img/img6.jpg',
        profile: 'artists/face6.jpg'
    },
    {
        id: '7',
        songName: `First Person Shooter <br>
        <div class="subtitle">Drake</div>`,
        poster:'img/img7.jpg',
        profile: 'artists/face7.jpg'
    }
]

//add data to element
Array.from(document.getElementsByClassName('songItem')).forEach((element, index) => {
    element.getElementsByTagName('img')[0].src = songs[index]?.poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[index]?.songName;
});


//play-pause button
const masterPlay = document.getElementById('masterPlay');
const wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        wave.classList.add('active2');
        
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-circle-fill');
        masterPlay.classList.remove('bi-pause-circle-fill');
        wave.classList.remove('active2');
        makeAllPlays();
    }
})

//playlist songs 
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    });
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
            element.style.background = "rgb(105, 105, 170, 0)";
    });
}

const posterMasterPlay = document.getElementById('poster_master_play');
const title = document.getElementById('title');

let index = 1;

Array.from(document.getElementsByClassName('playListPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;

        if (index === "masterPlay") {
            return;
        }

        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        posterMasterPlay.src = `img/img${index}.jpg`;
        music.play();
        let songTitle = songs.filter((ele) => {
            return ele.id == index;
        })

        songTitle.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-circle-fill');
        masterPlay.classList.add('bi-pause-circle-fill');
        wave.classList.add('active2');

        music.addEventListener('ended', () => {
            masterPlay.classList.add('bi-play-circle-fill');
            masterPlay.classList.remove('bi-pause-circle-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
});

//bar logic
const currentStart = document.getElementById('currentStart');
const currentEnd = document.getElementById('currentEnd');
const seek = document.getElementById('seek');
const bar2 = document.getElementById('bar2');
const dot = document.getElementsByClassName('dot')[0];
 
music.addEventListener('timeupdate', () => {
    let musicCurr = music.currentTime;
    let musicDur = music.duration;

    let min = Math.floor(musicDur/60);
    let sec = Math.floor(musicDur%60);

    if(sec<10) {
        sec = `0${sec}`; 
    } 

    currentEnd.innerText = `${min}:${sec}`;
    
    let min1 = Math.floor(musicCurr/60);
    let sec1 = Math.floor(musicCurr%60);

    if(sec1<10) {
        sec1 = `0${sec1}`; 
    } 

    currentStart.innerText = `${min1}:${sec1}`;

    let progressBar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressBar;
    let seekBar = seek.value;
    bar2.style.width = `${seekBar}%`;
    dot.style.left = `${seekBar}%`;
})

//click on bar change
seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100;
})

//end music logic
music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-circle-fill');
    masterPlay.classList.remove('bi-pause-circle-fill');
    wave.classList.remove('active2');
})

//vol logic
const volIcon = document.getElementById('vol_icon');
const vol = document.getElementById('vol');
const volDot = document.getElementById('vol_dot');
const volBar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', () => {
    if(vol.value == 0) {
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.add('bi-volume-mute-fill');
        volIcon.classList.remove('bi-volume-up-fill');
    }

    if(vol.value > 0) {
        volIcon.classList.add('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-mute-fill');
        volIcon.classList.remove('bi-volume-up-fill');
    }

    if(vol.value > 50) {
        volIcon.classList.remove('bi-volume-down-fill');
        volIcon.classList.remove('bi-volume-mute-fill');
        volIcon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    volBar.style.width = `${vol_a}%`;
    volDot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

//next-back buttons
const back = document.getElementById('back');
const next = document.getElementById('next');

back.addEventListener('click', () => {
    index--;
    if(index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    music.src = `audio/${index}.mp3`;
    posterMasterPlay.src = `img/img${index}.jpg`;
    music.play();
    let songTitle = songs.filter((ele) => {
        return ele.id == index;
    })

    songTitle.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');

    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
});

next.addEventListener('click', () => {
    index++;

    if(index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 0;
    }

    music.src = `audio/${index}.mp3`;
    posterMasterPlay.src = `img/img${index}.jpg`;
    music.play();
    let songTitle = songs.filter((ele) => {
        return ele.id == index;
    })

    songTitle.forEach(ele => {
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays();

    document.getElementById(`${index}`).classList.remove('bi-play-circle-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-circle-fill');

    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})
