//You can edit ALL of the code here
const url = "https://api.tvmaze.com/shows/82/episodes"
let allEpisodes = []

function setup() {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
     
      allEpisodes = data;
      makePageForEpisodes(allEpisodes);
    })
    .catch((err) => console.error(err));
}

function makeSeasonAndEpisode(episode){
  const {season, number} = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const allEpisodesEl = document.getElementById("allEpisodes");

  const selectElem = document.getElementById("select-input");
  console.log(selectElem);
  allEpisodesEl.innerHTML = "";
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${episodeList.length} episodes`
  allEpisodesEl.appendChild(countParagraph);
  episodeList.forEach(episode =>{
    const epDiv = document.createElement("div");
    epDiv.classList.add("episodes");
    const p = document.createElement("p");
    
    p.innerText =`${makeSeasonAndEpisode(episode)} ${episode.name}`;
    epDiv.appendChild(p);
    
    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.classList.add("epImg")
    epDiv.appendChild(img);
    epDiv.innerHTML+=episode.summary;



    allEpisodesEl.appendChild(epDiv);
    const option = document.createElement("option");
    option.textContent = `${makeSeasonAndEpisode(episode)} - ${episode.name}`;
    option.value = episode.id;
    selectElem.appendChild(option);
  })
  console.log(episodeList);
}
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input",(event) => {
const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode)=> {
    return (episode.summary.toLowerCase().includes(searchString) || 
            episode.name.toLowerCase().includes(searchString));
 
  });
  makePageForEpisodes(filteredEpisodes)
});
const selectInput = document.getElementById("select-input");
selectInput.addEventListener("change",(e) => {
  const idSelectedByUser = Number(e.target.value);
  console.log({idSelectedByUser});
  const selectedEpisode = allEpisodes.find(
    (ep)=> ep.id ===idSelectedByUser);
    if(selectedEpisode){
      makePageForEpisodes([selectedEpisode]);
    }
});


window.onload = setup;
