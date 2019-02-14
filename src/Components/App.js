import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import {fetchData, getLocal} from './helpers/fetch';
import YouTube from './YouTube/YouTube';
import Sidebar from './Sidebar/Sidebar';
import Search from './Search/Search';
import ArtistPage from './ArtistPage/ArtistPage';
import SongsPage from './SongsPage/SongsPage';
import AlbumPage from './AlbumPage/AlbumPage';
import './App.css';
import axios from 'axios'

class App extends React.Component {

    state = {
        artistsData: [],
        songsArr: [],
        albumArr: [],
        searchValue: '',
        isLoading: true,

        favouriteArtists: [],
        favouriteAlbums: [],
        favouriteSongs:[],

        interestingArtists: [],
        interestingAlbums: [],
        interestingSongs:[],

        ytubeIsActive: false,
        youTubeResult: '',
        showHideSideBarr: false
    }

    searchData = (e) => {
        e.preventDefault();

        if (this.state.searchValue === '') {return}

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&limit=28&format=json`)
        .then(response => {

            this.setState({
                artistsData: response.results.artistmatches.artist
            })
        })

        fetchData(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&limit=28&format=json`)
        .then(response => {

            this.setState({
                albumArr: response.results.albummatches.album
            })
        })
        
        fetchData(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${this.state.searchValue}&api_key=412e51e107155c7ffabd155a02371cbd&limit=28&format=json`)
        .then(response => {
            
            this.setState({
                songsArr: response.results.trackmatches.track
            })
        })
    }

    componentDidMount() {

        fetchData ('http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=e900a41307805d11c3527e8aeebf5d4b&limit=48&format=json').
            then(data => {

               const sort = data.artists.artist.sort((a,b)=> +b.listeners - +a.listeners)

                this.setState({
                    artistsData: sort,
                    isLoading: false,
                    favouriteArtists: getLocal('favouriteArtists'),
                    interestingArtists: getLocal('interestingArtists')
                })
            })
        
        fetchData ('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=e900a41307805d11c3527e8aeebf5d4b&format=json').
            then(data => {

                this.setState({
                    songsArr: data.tracks.track,
                    favouriteSongs: getLocal('favouriteSongs'),
                    interestingSongs: getLocal('interestingSongs')
                })
            })

        fetchData('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=rap&api_key=e900a41307805d11c3527e8aeebf5d4b&limit=48&format=json')
            .then(data => (

                this.setState({
                    albumArr: data.albums.album,
                    favouriteAlbums: getLocal('favouriteAlbums'),
                    interestingAlbums: getLocal('interestingAlbums'),
                })
            ))
    } 

    inputChange = (e) => {

        const value = e.target.value.toLowerCase();
        const name = e.target.name;

        this.setState ({
            [name]: value
        })
    }

    addFavourite = (e) => {

        const index = e.target.dataset.index;
        const arrForAdd = e.target.dataset.type;
        const check = e.target.dataset.check;

        const currentArtist = this.state[check][index]

        if(!this.state[arrForAdd].includes(currentArtist)) {
            this.setState(prev => ({
                [arrForAdd]: [currentArtist, ...prev[arrForAdd]]

            }), () => {
                localStorage.setItem(`${arrForAdd}`, JSON.stringify(this.state[arrForAdd]))
            })
        }
    }

    handlerYtube = (e) => {
        const name = e.target.dataset.name;
        const artist = e.target.dataset.artist;
        const svg = e.target.className.includes('YT');
        const colse = e.target.className==='close';
        console.log(name);
        console.log(artist);
        axios.get(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyAecHJZnOuuNBUl4UaHRSqJEot9xHIuNXI&q=${name}${artist}&type=video&maxResults=1&part=snippet`)
            .then(response => response.data.items[0].id.videoId)
            .then(id => {
                
                if(svg) {
                this.setState(prev => ({
                    ytubeIsActive: true,
                    youTubeResult: id,
                }))} else if (colse) {
                    this.setState(prev => ({
                        ytubeIsActive: !prev.ytubeIsActive,
                        youTubeResult: id,
                    }))
                }
            }) 
    }

    showHideSideBarrFunc = () => {
        this.setState(prev => ({
            showHideSideBarr: !prev.showHideSideBarr
        }))
    }

    

render() {

    const {artistsData, songsArr, albumArr, searchValue, isLoading, favouriteArtists, favouriteAlbums, favouriteSongs,  interestingArtists, interestingAlbums, interestingSongs, ytubeIsActive, youTubeResult, showHideSideBarr} = this.state;

    return(
        <div className='wrapper'>
            <div className="container">
                
                <Sidebar showHideSideBarr={showHideSideBarr}/>
                
                <main className='main'>
 
                    <Search value={searchValue} 
                            onChange={this.inputChange} 
                            searchData={this.searchData}
                            handlerYtube={this.handlerYtube}
                            ytubeIsActive={ytubeIsActive}
                            youTubeResult={youTubeResult}
                            showHideSideBarrFunc={this.showHideSideBarrFunc}
                            />

                    {isLoading ? <div className='loader'><Loader type="Audio" color='var(--red)' height='80' width='80' /></div> : 

                        <div>
                            <Switch>
                                <Route exact path='/' render={() => <ArtistPage 
                                    artistsData={artistsData} addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path='/albums' render={() => <AlbumPage 
                                    albumArr={albumArr}
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path='/songs' render={() => <SongsPage 
                                    songsArr={songsArr}
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>




                                <Route path ='/favouriteArtist' render={() => 
                                    <ArtistPage 
                                    artistsData={favouriteArtists} 
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path ='/favouriteAlbums' render={() => 
                                    <AlbumPage 
                                    albumArr={favouriteAlbums} 
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path ='/favouriteSongs' render={() => 
                                    <SongsPage 
                                    songsArr={favouriteSongs} 
                                    addFavouriter={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>




                                <Route path ='/interestingArtist' render={() => 
                                    <ArtistPage 
                                    artistsData={interestingArtists} 
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path ='/interestingAlbums' render={() => 
                                    <AlbumPage 
                                    albumArr={interestingAlbums} 
                                    addFavourite={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>

                                <Route path ='/interestingSongs' render={() => 
                                    <SongsPage 
                                    songsArr={interestingSongs} 
                                    addFavouriter={this.addFavourite}
                                    handlerYtube={this.handlerYtube}
                                    />}/>
                            </Switch>
                        </div>
                    }
                    
                </main>
            </div>
        </div>
    )
}
}

export default App; 

