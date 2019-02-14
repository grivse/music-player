import React from 'react';
import PropTypes from 'prop-types';
import SongsCard from '../SongsCard/SongsCard';
import './SongsPage.css'

const SongsPage = (props) => {

    return (
        <div className='content'>
            {props.songsArr.map((el,idx) => <SongsCard url={el.image[1]['#text']} 
            name={el.name} 
            artist={el.artist} 
            key={el.url}
            addFavourite={props.addFavourite}
            index={idx}
            type='favouriteSongs'
            interesting='interestingSongs' 
            checkType='songsArr'
            handlerYtube={props.handlerYtube}/>)}
        </div>
    )
}

SongsPage.propTypes = {

};

export default SongsPage;