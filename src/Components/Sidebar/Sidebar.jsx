import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import './Sidebar.css'

const Sidebar = (props) => {
    return (
        <aside className={props.showHideSideBarr ?  'aside aside-show': 'aside'}>
            <Logo/>
            <Menu menu={[
                {text: 'Main', link: '#', submenu: []},
        
                {text: 'Interesting', link: '#', submenu: [
                    {text: 'Artist', link: 'interestingArtist'},
                    {text: 'Albums', link: 'interestingAlbums'},
                    {text: 'Songs', link: 'interestingSongs'},                        
                ]},
        
                {text: 'Favourite', link: '#', submenu: [
                    {text: 'Artist', link: 'favouriteArtist'},
                    {text: 'Albums', link: 'favouriteAlbums'},
                    {text: 'Songs', link: 'favouriteSongs'},  
                ]},

                // {text: 'Playlist', link: '#', submenu: []},
                // {text: 'Pay', link: '#', submenu: []},
            ]}/>
        </aside>
    )
};

export default Sidebar;