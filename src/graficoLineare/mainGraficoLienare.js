import React from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear, axisLeft, max } from 'd3'


import './mainGraficoLineare.css'





export default class MainCerchiSemplici extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxWidth: 1200,
            maxHeight: 300,
            maxRadius: 100,
            data: [{}
            ]
        };

        this.graphRefa = React.createRef();
    }

    aggiornaDati = () => {
        let numItems = 20 + Math.floor(100 * Math.random())
        let data = []

        for (let i = 0; i < numItems; i++) {
            data.push({
                x: i * 20,
                y: Math.random() * this.state.maxHeight,
            })
        }
        this.setState({
            data: data
        })
    }









    componentDidMount() {

        /**
         * FUNZIONE PER IMPLEMENTARE UNA SCALA DEL GRAFICO 
         */
        const xScale = scaleLinear()
            /**
             * IL DOMINIO RAPPRESENTA IL DOMINIO DEI DATI NELLO SPECIFICO IL VALORE PIÙ GRANDE CHE BISOGNA GRAFICARE,
             * NEL NOSTRO CASO LA GENERAZIONE DEI VALORI DI X E PROPORZIONALE ALLA POZIOZIONE QUINDI PRELEVIAMO L'ULTIMO ELEMENTO
             */
            .domain([0, this.state.data[this.state.data.length - 1].x])
            /**
             * RANGE È LO SPAZIO CHE IL COMPONENTE DEVE OCCUPARE NEL NOSTRO CASO ABBIAMO LASCIATO TUTTO LO SPAZIO DEFINITO DALL'SVG
             */
            .range([0, this.state.maxWidth])
            /**
             * IL METODO NICE CONSIDERA DEI MARGINI DI ARROTONDAMENTO PER DIFETTO COSI DA NON AVERE CHE IL GRAFICO ESCA DALLO SPAZIO DI DEFINIZIONE
             */
            .nice()

        /**
         * YSCALE È L'EQUIVALENTE DI XSCALE SOLO PER L'ASSE VERTICALE
         */
        const yScale = scaleLinear()
            .domain([0, max(this.state.data.map(el => el.y))])
            /**
             * IL DOMINIO È INVERTITO POICHÉ IL PUNTO (0,0) DELL'SVG È NELL'ANGOLO IN ALTO A SISNISTA CIÒ NON FA VARIARE L'ASSE X MA INVERTE L'ASSE Y
             */
            .range([this.state.maxHeight, 0])
            .nice()

        /**
         * FUNZIONE CHE GENERA I VALORI DEL GRAFICO IN PROPORIONE ALLE SCALE
         */
        const myLine = line()
            .x(value => xScale(value.x))
            .y(value => yScale(value.y))
            .curve(curveCardinal)

        /**
         * ASSE DELLE ASCISSE 
         */
        const xAsse = axisBottom(xScale)

        /**
         * ASSE DELLE ORFINATE
         */
        const yAsse = axisLeft(yScale)

        const svg = select(this.graphRefa.current)

        /**
         * APPLICAZIONE DELL'ASSE X ALL'ELEMENTO CHE HA COME NOME DELLA CLASSE ".xAsse" E POI VIENE CHIAMATA LA FUNZIONE CALL PER APPLICARE 
         * L'ELEMENTO ASSE
         */
        svg.select(".xAsse")
            .call(xAsse)

        /**
         * UGUALE PER L'ASSE Y CON L'AGGIUNTA DELL TRASLATE PER ESSERE VISIBILE
         */
        svg.select(".yAsse")
            .style("transform", "translateX(50px)")
            .call(yAsse)

        /**
         * APPLICAZIONE DEL GRAFICO VERO E PROPRIO
         */
        svg.selectAll("path")
            .data([this.state.data])
            .join("path")
            .attr("class", "line")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "blue")

    }

    componentDidUpdate() {

        const xScale = scaleLinear()
            .domain([0, this.state.data[this.state.data.length - 1].x])
            .range([50, this.state.maxWidth-20])
            .nice()

        const yScale = scaleLinear()
            .domain([0, max(this.state.data.map(el => el.y))])
            .range([this.state.maxHeight -20, 20])
            .nice()

        const myLine = line()
            .x(value => xScale(value.x))
            .y(value => yScale(value.y))
            .curve(curveCardinal)
           

        const yAsse = axisLeft(yScale)
        const xAsse = axisBottom(xScale)




        const svg = select(this.graphRefa.current)

        svg.select(".yAsse")

            .call(yAsse)

        svg.select(".xAsse")

            .call(xAsse)

        svg.selectAll("path")
            .data([this.state.data])
            .join("path")
            .attr("class", "line")
            .attr("d", value => myLine(value))
            .attr("fill", "none")
            .attr("stroke", "blue")
    }

    render() {
        console.log(this.state.data, max(this.state.data.map(el => el.y)))
        return (
            <div id="MainBox">

                <svg
                    id="BoxGrafico"
                    viewBox={`0 0  ${this.state.maxWidth} ${this.state.maxHeight}`}
                    ref={this.graphRefa}>
                    <g className="xAsse" />
                    <g className="yAsse" />


                </svg>
                <button
                    id="Pulsante"
                    onClick={() => {
                        this.aggiornaDati()
                    }}
                >Update line</button>

            </div>
        )
    }
}