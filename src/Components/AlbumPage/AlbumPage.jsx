import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card/Card'
import FlipMove from "react-flip-move";
import './AlbumPage.css';

const AlbumPage = (props) => {

    return (
        <div className='content'>
            {props.albumArr.map ((el,idx) => <Card url={el.image[2]['#text']} 
            name={el.name} 
            artist={el.artist}
            info={el.artist} 
            key={el.name + el.url}
            addFavourite={props.addFavourite}
            index={idx}
            type='favouriteAlbums'
            interesting='interestingAlbums'
            checkType='albumArr'
            handlerYtube={props.handlerYtube}
            />)}
        </div>
    )
}

AlbumPage.propTypes = {

}

export default AlbumPage;