import React, { Component } from 'react'
import Chart from "chart.js";
import classes from './chart.css';

//console.log(this.props.dataB)

export default class LineGraph extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: this.props.dataB
        }
    }
    chartRef = React.createRef();

    
    
    componentDidMount() {
        const myChartRef = this.chartRef.current.getContext("2d");
        
        new Chart(myChartRef, {
            type: "line",
            data: {
                //Bring in data
                labels: ['30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1','0'],
                datasets: [
                    {
                        label: "Sales",
                        data: this.state.data,
                    }
                ]
            },
            options: {
                //Customize chart options
            }
        });
    }
    
    render() {
        return (
            <div className={classes.graphContainer}>
                <canvas
                    id="myChart"
                    ref={this.chartRef}
                />
            </div>
        )
    }
}