import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Menu from './menu';


import CerchiSemplici from './GraficoCerchiSemplice/mainCerchiSemplici';
import Linea from './graficoLineare/mainGraficoLienare';
import BarAnimate from './GraficoBarreAnimato/mainGraficoBarreAnimato';

export default class Home extends React.Component{

    render(){
        return(
            <BrowserRouter>
                <Menu></Menu>
                <Switch>
                    <Route path="/Csem"  component={CerchiSemplici} />
                    <Route path="/line"  component={Linea} />
                    <Route path="/barani"  component={BarAnimate} />
                </Switch>
            </BrowserRouter>
        )
    }
}