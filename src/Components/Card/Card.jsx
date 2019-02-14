import React from 'react';
import PropTypes from 'prop-types';
import CardImg from './music.png';
import Favourite from './favorite.svg';
import Add from './add.svg';
import Youtube from './youtube.svg';
import './Card.css'

const Card = props => {

    return (
            <div className="artist-card">
                <figure>
                    <div className='mainCont'>
                        <img src={props.url !== '' ? props.url : CardImg} alt="artist" className="artist-card__img"/>
                        <div className="overlay">
                            <div className='svgCont'>
                                
                                <img src={Youtube} alt="youtube" className='svg YT'
                                onClick={props.handlerYtube}
                                data-name={props.name}
                                data-artist={typeof props.info === 'object' ? props.info.name : props.info.includes('Listeners')? '' : props.info }/>
                                
                                <img src={Add} alt="add" className='svg'
                                onClick={props.addFavourite} data-index={props.index}
                                data-type={props.interesting}
                                data-check={props.checkType}/>

                                <img src={Favourite} alt="favourite" className='svg' 
                                onClick={props.addFavourite} data-index={props.index}
                                data-type={props.type}
                                data-check={props.checkType}/>
                            </div>
                        </div>
                    </div>

                    <figcaption>
                        <p className="artist-card__name">{props.name}</p>
                        <p className="artist-card__number-albums">{typeof props.info === 'object' ? props.info.name : props.info}</p>
                    </figcaption>
                </figure>
            </div>
    )
};

Card.propTypes = {
    
}

export default Card