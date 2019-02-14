import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import './ArtistPage.css';

const ArtistPage = (props) => {

    return (
        <div className='content'>
            {props.artistsData.map ((el,idx) => <Card url={el.image[2]['#text']} 
            name={el.name} 
            info={`Listeners: ${(+el.listeners).toLocaleString()}`} key={el.name} 
            addFavourite={props.addFavourite}
            index={idx}
            type='favouriteArtists'
            interesting='interestingArtists'
            checkType='artistsData'
            handlerYtube={props.handlerYtube}/>)}
        </div>
    )
}

ArtistPage.propTypes = {

};

export default ArtistPage;