const searchSong = () => {
    const searchText = document.getElementById('search-feild').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Server is down!! Please try again later'));
}
const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    songs.forEach(songs => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${songs.title}</h3>
                        <p class="author lead">Album by <span>${songs.artist.name}</span></p>
                        <audio controls>
                            <source src="${songs.preview}" type="audio/mpeg"
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${songs.artist.name}', '${songs.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `
        songContainer.appendChild(songDiv);
    });
}
const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLyrics(data.lyrics))
        .error(displayError('Server is down..!! faild to lyrics load, Please try again later...!!'))
}
const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}