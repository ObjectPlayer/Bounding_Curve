import React from 'react';
import BoundingCurve from '../Services/BoundingCurve';
import Chart from 'react-apexcharts'

class BurningGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            reserveAmount: 0,
            totalSupply: 0,
            userBalancce: 0,


            series: [{
                name: "Price",
                data: []
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Minting Graph',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: [],
                }
            }

        }

        this.boudningCurve = new BoundingCurve()
    }

    componentDidMount() {
        this.boudningCurve.updateDataToTestBurning(this.boudningCurve.maxSupply, 18896687408.33174, this.boudningCurve.maxSupply, 1.3272819519042969)
        this.showGraph()
    }

    getGraphValue = () => {
        let totalSupply = this.boudningCurve.totalSupply;


        let series = this.state.series;
        let categories = [];
        let supply = 0.5;

        for (let i = 0; totalSupply > 0; i++) {
            let tokenShouldBurn = supply * 2;
            let burningPrice = this.boudningCurve.getBurnPrice(1);


            if (this.boudningCurve.totalSupply - tokenShouldBurn >= 0) {
                this.boudningCurve.burnToken(tokenShouldBurn)
            } else {
                tokenShouldBurn = this.boudningCurve.totalSupply;
                this.boudningCurve.burnToken(tokenShouldBurn)
            }


            totalSupply = this.boudningCurve.totalSupply;
            supply = tokenShouldBurn;

            series[0].data.push(burningPrice);
            categories.push(supply);
        }

        console.log("series = ", series[0].data)

        return { series, categories }
    }


    showGraph = () => {
        let res = this.getGraphValue();


        let series = res.series;
        let newCategories = res.categories;

        this.setState({ series, options: { ...this.state.options, xaxis: { categories: newCategories } } })

        this.setState({ reserveAmount: this.boudningCurve.reserve, totalSupply: this.boudningCurve.totalSupply, userBalancce: this.boudningCurve.userBlance })

    }

    render() {
        return (
            <div className="App" style={{ marginTop: 20, marginBottom: 30, borderStyle: "solid", padding: 5 }}>

                <p style={{ marginBottom: 20 }}>
                    <span>
                        <label>Pool Balance (Reserve) = </label>
                        <label>{this.state.reserveAmount}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>Token Supply = </label>
                        <label>{this.state.totalSupply}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>User Balance = </label>
                        <label>{this.state.userBalancce}</label>
                    </span>

                </p>

                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />

            </div>
        );
    }
}

export default BurningGraph;
