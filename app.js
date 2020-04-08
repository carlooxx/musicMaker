class Music {
  constructor() {
    this.playbtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.muteBtn = document.querySelectorAll(".mute");
    this.select = document.querySelectorAll("select");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.index = 0;
    this.playing = 0;
    this.bpm = 100;
  }
  replay() {
    const step = this.index % 8;
    const activePad = document.querySelectorAll(`.b${step}`);
    activePad.forEach((pad) => {
      pad.classList.add("anime");
      if (
        pad.classList.contains("active") &&
        pad.classList.contains("kick-pad")
      ) {
        this.kickAudio.play();
        this.kickAudio.currentTime = 0;
      }
      if (
        pad.classList.contains("active") &&
        pad.classList.contains("snare-pad")
      ) {
        this.snareAudio.play();
        this.snareAudio.currentTime = 0;
      }
      if (
        pad.classList.contains("active") &&
        pad.classList.contains("hihat-pad")
      ) {
        this.hihatAudio.play();
        this.hihatAudio.currentTime = 0;
      }
    });
    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.playing) {
      this.playing = setInterval(() => {
        this.replay();
      }, interval);
      this.playbtn.innerText = "Stop";
    } else {
      clearInterval(this.playing);
      this.playing = null;
      this.playbtn.innerText = "Play";
    }
  }
  updateSong(e) {
    const selectName = e.target.name;
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("muteclass");
    if (e.target.classList.contains("muteclass")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    this.bpm = e.target.value;
    const tempoText = document.querySelector(".tempo-nr");
    tempoText.innerText = this.bpm;
  }
  updateTempo(e) {
    clearInterval(this.playing);
    this.playing = null;
    if (this.playbtn.innerText === "Stop") {
      this.start();
    }
  }
}

const dance = new Music();

dance.pads.forEach((pad) => {
  pad.addEventListener("click", () => {
    pad.classList.toggle("active");
  });
  pad.addEventListener("animationend", function () {
    pad.classList.remove("anime");
  });
});
dance.playbtn.addEventListener("click", () => {
  dance.start();
});
dance.select.forEach((song) => {
  song.addEventListener("change", function (e) {
    dance.updateSong(e);
  });
});
dance.muteBtn.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    dance.mute(e);
  });
});
dance.tempoSlider.addEventListener("input", function (e) {
  dance.changeTempo(e);
});
dance.tempoSlider.addEventListener("change", function (e) {
  dance.updateTempo(e);
});
