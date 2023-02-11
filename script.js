//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  
  makePageForEpisodes(allEpisodes);
}


function makePageForEpisodes(episodeList) {
  const allEpisodesEl = document.getElementById("allEpisodes");
  episodeList.forEach(episode =>{
    const epDiv = document.createElement("div");
    epDiv.classList.add("episodes");
    const p = document.createElement("p");
    
    p.innerText = episode.name;
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

window.onload = setup;
