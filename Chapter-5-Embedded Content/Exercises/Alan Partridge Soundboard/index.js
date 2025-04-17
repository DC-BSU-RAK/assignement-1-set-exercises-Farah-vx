const samples = [
  { name: "ah-ha", file: "ah-ha.mp3" },
  { name: "dan!", file: "dan.mp3" },
  { name: "back of the net", file: "back-of-the-net.mp3" },
  { name: "bang out of order", file: "bangoutoforder.mp3" },
  { name: "email of the evening", file: "emailoftheevening.mp3" },
  { name: "hello patridge", file: "hellopartridge.mp3" },
  { name: "i ate scotch egg", file: "iateascotchegg.mp3" },
  { name: "i’m confused", file: "imconfused.mp3" },
];

// selecting the elements needed for interaction
const grid = document.getElementById("sample-grid");
const speakBtn = document.getElementById("speak-btn");
const ttsInput = document.getElementById("tts-input");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// keeping track of the current page
let page = 0;

// setting how many samples to show per page
const pageSize = 9;

// this function loads the correct set of samples for the current page
function loadSamples() {
  // clear out anything already in the grid
  grid.innerHTML = "";

  // get the samples for the current page
  const start = page * pageSize;
  const end = start + pageSize;
  const pageSamples = samples.slice(start, end);

  // create a sample element for each audio file
  pageSamples.forEach(sample => {
    const div = document.createElement("div");
    div.className = "sample";
    div.innerHTML = `<div class="sample-title">${sample.name}</div><div class="sample-duration">loading...</div>`;
    grid.appendChild(div);

    const audio = new Audio(`audio/${sample.file}`);

    // once the audio is loaded, show its duration
    audio.addEventListener("loadedmetadata", () => {
      div.querySelector(".sample-duration").textContent = `${audio.duration.toFixed(2)}s`;
    });

    // play audio when the sample is clicked
    div.addEventListener("click", () => {
      audio.currentTime = 0;
      audio.play();
    });
  });

  // only show prev button if it's not the first page
  prevBtn.hidden = page === 0;

  // hide next button if there are no more samples to show
  nextBtn.hidden = end >= samples.length;
}

// load the first set of samples on page load
loadSamples();

// go back one page when prev is clicked
prevBtn.addEventListener("click", () => {
  if (page > 0) {
    page--;
    loadSamples();
  }
});

// go forward one page when next is clicked
nextBtn.addEventListener("click", () => {
  if ((page + 1) * pageSize < samples.length) {
    page++;
    loadSamples();
  }
});

// convert the input text into speech when the speak button is clicked
speakBtn.addEventListener("click", () => {
  const utterance = new SpeechSynthesisUtterance(ttsInput.value);
  speechSynthesis.speak(utterance);
});

  