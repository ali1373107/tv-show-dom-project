//You can edit ALL of the code here
const url = "https://api.tvmaze.com/shows/82/episodes"
let allEpisodes = [];
const selectInput = document.getElementById("select-input");
const searchInput = document.getElementById("search-input");
const selectShow = document.getElementById("select-show");
async function setup() {
  makeShowDropdown();
  try{
    const res = await fetch(url);
    const data =await res.json();
    allEpisodes = data;

    makePageForEpisodes(allEpisodes);

  } catch (err){
    console.log(err);
  }
  

  
}


function makeSeasonAndEpisode(episode){
  const {season, number} = episode;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;
}

function makePageForEpisodes(episodeList) {
  const allEpisodesEl = document.getElementById("allEpisodes");

  console.log(selectInput);
  
  clearElement(allEpisodesEl);
  makeEpisodeCount(allEpisodesEl,episodeList)
  clearElement(selectInput);
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
    selectInput.appendChild(option);
  })
  console.log(episodeList);
}

searchInput.addEventListener("input",(event) => {
const searchString = event.target.value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode)=> {
    return (episode.summary.toLowerCase().includes(searchString) || 
            episode.name.toLowerCase().includes(searchString));
 
  });
  makePageForEpisodes(filteredEpisodes)
});

selectInput.addEventListener("change",(e) => {
  const idSelectedByUser = Number(e.target.value);
  console.log({idSelectedByUser});
  const selectedEpisode = allEpisodes.find(
    (ep)=> ep.id ===idSelectedByUser);
    if(selectedEpisode){
      makePageForEpisodes([selectedEpisode]);
    }
});
selectShow.addEventListener("change",async(e)=>{
  const showIdSeleUrlctedByUser = Number(e.target.value);
  const nextFetchUrl= getUrlFromId(showIdSeleUrlctedByUser);
  try{
    const res = await fetch(nextFetchUrl);
    const data =await res.json();
    allEpisodes = data;

    makePageForEpisodes(allEpisodes);

  } catch (err){
    console.log(err);
  };
  searchInput.value = "";
});

window.onload = setup;
function clearElement(el){
  el.innerHTML = '';
}
function makeEpisodeCount(el,list){
  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${list.length} episodes`
  el.appendChild(countParagraph);
}
function makeShowDropdown(){
  
  const allShows = getAllShows();
  allShows.forEach((show)=>{
    const option =document.createElement("option");
    option.textContent = show.name;
    option.value = show.id;
    selectShow.appendChild(option);
  });
  
}
function getUrlFromId(id) {
  return `https://api.tvmaze.com/shows/${id}/episodes`;
}
