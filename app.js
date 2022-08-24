const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const repeatBtn = $('.btn-repeat')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const progress = $('#progress') 
const playlist = $('.playlist')
const songOptionBtn = $('.option')
const playListPlay = $$('.song')


const app = {
  currentIndex: 0,
  isPlaying: false,
  isRepeat: false,
  isRandom: false,
  songs: [
    {
      name: "Đau nhất là lặng im",
      singer: "ERIK",  
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e023773a7a98e633ec280827956",
    },
    {
      name: "Chạy về khóc với anh (REMIX)",
      singer: "ERIK, TA Remix",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e0258bd0ccf93c328b7383f9c50",
    },
    {
      name: "Đừng xin lỗi nữa",
      singer: "Min, Erik",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e026dd6b6d059bebe51534f461c",
    },
    {
      name: "Mình chia tay đi",
      singer: "ERIK",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e029500527343b36cf97c066806",
    },
    {
      name: "Đau nhất là lặng im",
      singer: "ERIK",  
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e023773a7a98e633ec280827956",
    },
    {
      name: "Chạy về khóc với anh (REMIX)",
      singer: "ERIK, TA Remix",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e0258bd0ccf93c328b7383f9c50",
    },
    {
      name: "Đừng xin lỗi nữa",
      singer: "Min, Erik",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e026dd6b6d059bebe51534f461c",
    },
    {
      name: "Mình chia tay đi",
      singer: "ERIK",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e029500527343b36cf97c066806",
    },
    {
      name: "Đau nhất là lặng im",
      singer: "ERIK",  
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e023773a7a98e633ec280827956",
    },
    {
      name: "Chạy về khóc với anh (REMIX)",
      singer: "ERIK, TA Remix",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e0258bd0ccf93c328b7383f9c50",
    },
    {
      name: "Đừng xin lỗi nữa",
      singer: "Min, Erik",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e026dd6b6d059bebe51534f461c",
    },
    {
      name: "Mình chia tay đi",
      singer: "ERIK",
      path: "./assets/music/erik-cukak-remix-audio-lyrics-video.mp3",
      image: "https://i.scdn.co/image/ab67616d00001e029500527343b36cf97c066806",
    },
  ],
  render: function() {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="song ${index === this.currentIndex ? 'playing' : ''}" data-index="${index}">
        <div class="thumb"
          style="background-image: url('${song.image}');">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
          <div class="option__list">
            <ul>
              <li>Download</li>
              <li>Share</li>
              <li>Delete</li>
            </ul>
          </div>
        </div>
      </div>
      `
    })
    playlist.innerHTML = htmls.join('')
  },
  
  renderRandom: function() {
    Array.prototype.myMap = function(cb) {
      var result = [];
      for (var i= 0; i < this.length; i++) {
        result.push(cb(this[i], i));
      }
      return result;
    }
    const htmls = this.songs.myMap((song,index) => {
      return `
      <div class="song" data-index="${index === this.currentIndex ? 'playing' : ''}">
        <div class="thumb"
          style="background-image: url('${song.image}');">
        </div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>
      `
    })
    playlist.innerHTML = htmls.join('')
  },

  defineProperties: function() {
    Object.defineProperty(this, 'currentSong', {
      get: function() {
        return this.songs[this.currentIndex]
      }
    })
  },

  handleEvents: function() {
    const _this = this 
    const cdWidth = cd.offsetWidth

    // Xử lí CD quay/ dừng
    const cdThumbAnimate = cdThumb.animate([
      {transform: 'rotate(360deg)'}
    ], {
      duration: 10000,
      iterations: Infinity
    })

    cdThumbAnimate.pause()
    
    // Xử lí thu phóng CD
    document.onscroll = function() {
      const scrollTop = window.scrollY
      const newCdWidth = cdWidth - scrollTop

      cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
      cd.style.opacity = newCdWidth / cdWidth
    }

    // Xử lí khi click play
    playBtn.onclick = function() {
      if (_this.isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    // Khi bài hát dược phát
    audio.onplay = function() {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbAnimate.play()
    }

    // Khi bài hát bị dừng
    audio.onpause = function() {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbAnimate.pause()
    }

    // Xử lí next/previous
    nextBtn.onclick = function() {
      _this.nextSong()
      audio.play()
      _this.render()
      _this.scrollSongIntoView()
    } 

    prevBtn.onclick = function() {
      _this.prevSong()
      audio.play()
      _this.render()
      _this.scrollSongIntoView()
    }     

    // Xử lí khi click random
    randomBtn.onclick = function() {
      _this.randomSong()
      _this.isRandom = !_this.isRandom
      randomBtn.classList.toggle('active')
    }

    // Xử lí khi click repeat
    repeatBtn.onclick = function() {
      _this.loopSong()
      _this.isRepeat = !_this.isRepeat
      repeatBtn.classList.toggle('active')
    }

    // Khi tiến độ bài hát thay đổi
    audio.ontimeupdate = function() {
      if (audio.duration) {
        const progressPercent = audio.currentTime / audio.duration * 100
        progress.value = progressPercent
      }
    }

    // Xử lí tua bài hát
    progress.onchange = function(e) {
      const seek = e.target.value
      progress.onclick = function() {
        const seekTime = seek / 100 * audio.duration
        audio.currentTime = seekTime
      }
    }
    
    // Xử lí khi hết bài
    audio.onended = function() {
      nextBtn.click()
    }

    // Lắng nghe hành vi click vào playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest('.song:not(.playing)')
      const songOption = e.target.closest('.option')
      if (songNode || songOption) {
        // Xử lý khi click vào song
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index)
          _this.loadCurrentSong()
          _this.render()
          _this.scrollSongIntoView()
      audio.play()
        }
        // Xử lý khi click vào option
        if (songOption) {
          songOptionBtn.onclick = function() {
            songOptionBtn.classList.add('option__list--open')
          }
        }
      }
    }
  },

  scrollSongIntoView: function() {
    $('.song.playing').scrollIntoView({behavior: "smooth", block: "end"});
  },

  loadCurrentSong: function() {
    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
    audio.src = this.currentSong.path
  },

  nextSong: function() {
    this.currentIndex++
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadCurrentSong()
  },

  prevSong: function() {
    this.currentIndex--
    this.loadCurrentSong()
  },
  
  loopSong: function() {
    if (this.isRepeat) {
      this.isRepeat = true
      audio.loop = false 
    } else {
      this.isRepeat = false
      audio.loop = true
    }
  },

  randomSong: function() {

  },

  start: function() {
    // Định nghĩa các thuộc tính cho Object
    this.defineProperties()

    // Lắng nghe xử lí các sự kiện
    this.handleEvents()

    // Tải bài hát đầu tiên vào UI
    this.loadCurrentSong()

    // Render playlist
    this.render()

    // Render random playlist
    // this.renderRandom()

  }
}

app.start()