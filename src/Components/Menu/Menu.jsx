import React from 'react';
import PropTypes from 'prop-types';
import './Menu.css';
import {NavLink, Route, Switch} from 'react-router-dom';

const Menu = ({menu}) => {

    return (
       <ul>
           {menu.map(el => el.submenu.length === 0 ? 
           
           <li className='menu__item' key={el.text}>
                <a href={el.link}  className="menu__link">{el.text}</a>
            </li> : 

            <li className='menu__item' key={el.text}>
                <a href={el.link}  className="menu__link">
                    {el.text}
                </a>

                <ul className='sub-menu'>
                    {el.submenu.map(sub=> <li className='sub-menu__item' key={`${el.text} ${sub.text}`}>

                        <NavLink to={`${sub.link}`} className="sub-menu__link">
                            {sub.text}
                        </NavLink>
                        
                    </li>)}
                </ul>
            </li>)}
       </ul>
    )
}

Menu.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
            submenu: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    link: PropTypes.string,
                })
            )
        })
    )
}


export default Menu;

