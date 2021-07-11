import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css'


export default class Menu extends React.Component{

    render(){
        return(
            <nav className="navBar">
                <NavLink  to="/Csem">
                    <span className="titoloMenu">
                    Cerchi semplici
                    </span>
                </NavLink>
                <NavLink  to="/line">
                    <span className="titoloMenu">
                    Linea
                    </span>
                </NavLink>
                <NavLink  to="/barani">
                    <span className="titoloMenu">
                    Grafico a barre animato
                    </span>
                </NavLink>
            </nav>
        )
    }
}