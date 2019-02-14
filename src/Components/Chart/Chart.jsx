import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'
import './Chart.css'

const Chart = props => {
    return (
        <div>
            <ul className="chart-list">
                <li>
                    <NavLink exact to ='/' 
                        className="chart-list__item" activeClassName='selected'> Artists
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to ='/albums'
                        className="chart-list__item"
                        activeClassName='selected'> Albums
                    </NavLink>
                </li>
                
                <li>
                    <NavLink to ='/songs'
                        className="chart-list__item"
                        activeClassName='selected'> Songs
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

Chart.propTypes = {
    
};

export default Chart;