import React from 'react';
import PropTypes from 'prop-types';
import YouTube from '../YouTube/YouTube';
import Chart from '../Chart/Chart'
import './Search.css'

const Search = props => {
    return (
        <div className='search'>

            <div className="player">
                {props.ytubeIsActive ?
                    <YouTube handlerYtube={props.handlerYtube} 
                            value={props.value}
                            youTubeResult={props.youTubeResult}/> : null}
            </div>

            <span className='showSidebarr' onClick={props.showHideSideBarrFunc}>&#9776;</span>
            <form action="#" method="post" className="search__form" onSubmit={props.searchData}>

                <input type="text" className="search__input" placeholder="Search music" value={props.value} name='searchValue' onChange={props.onChange}/>

                <input type="submit" value="search" className="search__btn"/>
            </form>
            <Chart/>
        </div>
    );
};

Search.propTypes = {
    
};

export default Search;