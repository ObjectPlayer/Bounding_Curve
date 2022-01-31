import React from 'react';
import BoundingCurve from '../Services/BoundingCurve';
import Chart from 'react-apexcharts'

class MintingGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userTempBalance: 0,
            userActualBlance: 0,
            userActualtokens: 0,
            mintPrice: 0,
            mintingAmount: 0,
            burningPrice: 0,
            burningAmount: 0,
            reserveAmount: 0,
            totalSupply: 0,
            adminFee: 0.03,
            artistFee: 0.12,
            adminBalance: 0.0,
            artistBalance: 0.0,

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
                    text: 'Token Graph',
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

    showBlanace = () => {
        let { userBalance, userTokens, adminBalance, artistBalance } = this.boudningCurve.showUserBalance()
        this.setState({ userActualBlance: userBalance, userActualtokens: userTokens, adminBalance, artistBalance })
    }

    setUserBalance = () => {
        this.boudningCurve.setUserBalance(this.state.userTempBalance)
        this.showBlanace()
    }

    mintTokens = () => {
        if (this.state.userActualBlance - this.state.mintPrice >= 0) {
            debugger;
            this.boudningCurve.mintToken(this.state.mintingAmount, this.state.mintPrice);
            this.updateData()
            this.updateMintPrice(this.state.mintingAmount)
        } else {
            alert("Enough Balance, kindly get some $")
        }
    }

    burnTokens = () => {
        debugger;
        if (this.state.userActualtokens - this.state.burningAmount >= 0) {
            this.boudningCurve.burnToken(this.state.burningAmount);
            this.updateData()
            this.updateBurningPrice(this.state.burningAmount)
        } else {
            alert("Enough Tokens, kindly get some Token")
        }
    }


    updateMintPrice = (amount) => {
        let mintPrice = this.boudningCurve.getMintPrice(amount);
        this.setState({ mintPrice, mintingAmount: amount })
    }

    updateBurningPrice = (amount) => {
        let burningPrice = this.boudningCurve.getBurnPrice(amount);
        this.setState({ burningPrice, burningAmount: amount })
    }

    updateData = () => {
        this.showBlanace();

        let options = this.state.options;
        let series = this.state.series;

        let newCategories = options.xaxis.categories.push(options.xaxis.categories.length);

        let mintPrice = this.boudningCurve.getMintPrice(1);

        series[0].data.push(mintPrice)

        this.setState({ series, options: { ...this.state.options, xaxis: { categories: newCategories } } })

        let reserveAmount = this.boudningCurve.reserve;
        let totalSupply = this.boudningCurve.totalSupply;

        this.setState({ reserveAmount, totalSupply })
    }

    componentDidMount() {
        this.boundingDataUpdate()
    }

    boundingDataUpdate = () => {
        let boundingData = {
            slope: this.props.slope,
            maxSupply: this.props.maxSupply,
            userBalance: this.props.userBalance,
            artistFee: this.props.artistFee,
            adminFee: this.props.adminFee
        }

        this.setState({
            userActualBlance: boundingData.userBalance, adminFee: boundingData.adminFee, artistFee: boundingData.artistFee
        })

        this.boudningCurve.updateData(boundingData.slope, boundingData.maxSupply, boundingData.userBalance, boundingData.artistFee, boundingData.adminFee)

    }

    render() {
        return (
            <div className="App" style={{ marginTop: 20, marginBottom: 30, borderStyle: "solid", padding: 5 }}>
                <input type="button" value={"Refresh"} onClick={this.boundingDataUpdate} />
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
                        <label>Artist Fee = </label>
                        <label>{this.state.artistFee}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>Admin Fee = </label>
                        <label>{this.state.adminFee}</label>
                    </span>
                </p>

                <p style={{ marginBottom: 40 }}>
                    <span>
                        <label>User Balance = </label>
                        <label>{this.state.userActualBlance}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>User Tokens = </label>
                        <label>{this.state.userActualtokens}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>Admin Balance = </label>
                        <label>{this.state.adminBalance}</label>
                    </span>
                    &nbsp; &nbsp;
                    <span>
                        <label>Artis Balance = </label>
                        <label>{this.state.artistBalance}</label>
                    </span>

                    <p>
                        <label>User Balance : </label>
                        <input type="text" value={this.state.userTempBalance} onChange={(e) => this.setState({ userTempBalance: e.target.value })} />
                        <input type="button" value={"Add USD"} onClick={this.setUserBalance} />
                    </p>

                </p>


                <p>
                    <label>Mint Tokens : </label>
                    <input type="text" value={this.state.mintingAmount} onChange={(e) => this.updateMintPrice(e.target.value)} />
                    &nbsp; &nbsp;
                    <label>You will pay: ${this.state.mintPrice}</label>
                    &nbsp; &nbsp;
                    <input type="button" value={"Mint"} onClick={this.mintTokens} />
                </p>

                <p>
                    <label>Burn Tokens : </label>
                    <input type="text" value={this.state.burningAmount} onChange={(e) => this.updateBurningPrice(e.target.value)} />
                    &nbsp; &nbsp;
                    <label>You will get: ${this.state.burningPrice}</label>
                    &nbsp; &nbsp;
                    <input type="button" value={"Burn"} onClick={this.burnTokens} />
                </p>

                <Chart options={this.state.options} series={this.state.series} type="line" height={350} />

            </div>
        );
    }
}

export default MintingGraph;
