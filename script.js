//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  
  makePageForEpisodes(allEpisodes);
}

function makeSeasonAndEpisode(episode){
  const {season, number} = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const allEpisodesEl = document.getElementById("allEpisodes");
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
  })
  console.log(episodeList);
}
const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input",(event) => {
const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = getAllEpisodes().filter((episode)=> {
    return (episode.summary.toLowerCase().includes(searchString) || 
            episode.name.toLowerCase().includes(searchString));
 
  });
  makePageForEpisodes(filteredEpisodes)
});

window.onload = setup;
