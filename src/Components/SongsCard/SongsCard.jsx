import React from 'react';
import SongImg from './song.png'
import PropTypes from 'prop-types';
import Favourite from './favorite.svg';
import Add from './add.svg';
import Youtube from './youtube.svg';
import './SongsCard.css';

const SongsCard = props => {
    return (
        <div className="songs-item">
            <figure className="songs-item__figure">
            
                    <img className="songs-item__img" 
                        src={props.url !== '' ? props.url : SongImg} alt="image"/>

                <figcaption className="songs-item__discription" >
                    <p className="songs-item__music-name">{props.name}</p>
                    <p className="songs-item__singer">{typeof props.artist === 'object' ? props.artist.name: props.artist}</p>
                        
                    <div className='songSvgCont'>

                        <img src={Youtube} alt="youtube"                   className='songSvg YT'
                            onClick={props.handlerYtube}
                            data-name={props.name}
                            data-artist={typeof props.artist === 'object' ? props.artist.name : props.artist}/>

                        <img src={Add} alt="add" 
                            className='songSvg'
                            onClick={props.addFavourite}
                            data-index={props.index}
                            data-type={props.interesting}
                            data-check={props.checkType}/>

                        <img src={Favourite} alt="favourite"               className='songSvg'
                            onClick={props.addFavourite}
                            data-index={props.index}
                            data-type={props.type}
                            data-check={props.checkType}/>
                    </div>

                </figcaption>
            </figure>
        </div>
    );
};

SongsCard.propTypes = {
    
};

export default SongsCard;