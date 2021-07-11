import React from 'react';
import { select } from 'd3'


import './mainCerchiSemplici.css'

export default class MainCerchiSemplici extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            maxWidth: 1000,
            maxHeight: 300,
            maxRadius: 100,
            data: [{
                x: 500,
                y: 150,
                r: 50
            }
            ]
        }
        /**
         * riferimento all'oggetto che verrà modificato dalla libreria d3
         */
        this.graphRef = React.createRef()
    }

    // FUNZIONE CHE GENERERÀ I DATI RANDOMICI CHE VERRANNO VISUALIZZATI 
    aggiornaDati = () => {
        let numItems = 20 + Math.floor(100 * Math.random())
        let data = []
        
        for (let i = 0; i < numItems; i++) {
            data.push({
                x: Math.random() * this.state.maxWidth,
                y: Math.random() * this.state.maxHeight,
                r: Math.random() * this.state.maxRadius,
                colour: i % 5
            })
        }
        this.setState({
            data: data
        })
    }

    componentDidMount() {
        /**
         * SELEZIONIAMO L'ELEMENTO DA MODIFICARE
         */
        const svg = select(this.graphRef.current)

        /**
         * SELEZIONIAMO TUTTI GLI ELEMENTI DI TIPO CIRCLE INTERNI ALL'SVG, IN QUESTA FASE NON CE NE SONO POICHÉ L'ELEEMNTO È STATO APPENA CREATO 
         */
        svg.selectAll("circle")
        /**
         * SELEZIONA I DATI DA GRAFICARE (FUNZIONA IN MANIERA SIMILE AD UN map)
         */
            .data(this.state.data)
            /**
             * CREA UNA SERIE DI ELEMENTI CIRCLE IN FUNZIONE DEI DATI
             */
            .join("circle"
            /**
             * QUESTE FUNZIONI VENGONO UTILIZZATE QUANDO DIAMO LA RESPONSABILITÀ DEL COMPONENTE A D3 
             * 
             * ENTER RAPPRESENTA LA CREAZIONE DEL COMPONENTE E CIÒ CHE BISONGA FARE PER IMPLEMENTARLO LA PRIMA VOLTA
             * enter => enter.append("circle"),
             * 
             * UPDATE RAPPRESENTA L'AGGIORNAMENTO DEL COMPONENTE GIÀ ESISTENTE 
             * update => update.attr("class", "update"),
             * 
             * EXIT RAPPRESENTA LA DEALLOCAZIONE DEL COMPONENTE, NELLO SPECIFICO LA FUNZIONE REMOVE VIENE RICHIAMATA IN AUTOMATICO
             * ANCHE SE NON ESPRESSAMENTE DICHIARATA, MA QUESTA FUNZIONE VIENE UTILIZZATA ANCHE PER AD ESEMPIO TERMINARE TIMER O ELEMENTI CHE 
             * VENGONO CREATI DURANTE L'UTILIZZO DEL COMPONENTE
             * exit => exit.remove()
             */
            )

            /**
             * SERIE DI ATTIBUTI DA APPLICARE AGLI ELEMENTI CREATI ED AGGIORNATI
             */
            .attr("r", value => value.r)
            .attr("cx", value => value.x)
            .attr("cy", value => value.y)
            .attr("stroke", "red")
    }

    componentDidUpdate() {
        /**
         * STESSA FUNZIONE DI COMPONENT DID MOUNT CHE AGGIORNA GLI OGGETTI IN CAMPO (IN QUESTE IMPLEMENTAZIONI LASCIAMO A REACT LA RESPONSABILITÀ DELL'AGGIORNAMENTO)
         */
        const svg = select(this.graphRef.current)

        svg.selectAll("circle")
            .data(this.state.data)
            .join("circle")

            .attr("r", value => value.r)
            .attr("cx", value => value.x * 2)
            .attr("cy", value => value.y * 2)
            .attr("stroke", "red")
    }

    render() {
        
        return (
            <div id="MainBox">

                <svg
                    id="BoxGraficoCerchi"
                    viewBox={`0 0  ${this.state.maxWidth} ${this.state.maxHeight}`}
                    ref={this.graphRef}></svg>
                <button
                    id="Pulsante"
                    onClick={() => {
                        this.aggiornaDati()
                    }}
                >Update circle</button>

            </div>
        )
    }
}