import React from 'react';
import './YouTube.css'

const YouTube = (props) => {
    return (
        <div>
            <p className='close' onClick={props.handlerYtube}>&#10006;</p>
            
            <iframe src={`https://www.youtube.com/embed/${props.youTubeResult}?autoplay=1`} frameborder="0" allow="autoplay; encrypted-media" allowFullScreen>
            </iframe> 
        </div>
    );
};

export default YouTube;