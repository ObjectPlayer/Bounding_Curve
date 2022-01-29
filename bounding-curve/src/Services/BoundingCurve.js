class BoundingCurve {
    constructor() {
        this.fusdPool = 0;
        this.slope = 0.5;
        this.maxSupply = 100000000;
        this.totalSupply = 0;
        this.userBlance = 36605661082;
        this.userTokenBalance = 0;
        this.reserve = 0;
        this.fees = 0;

    }

    setUserBalance = (fusdAmount) => {
        this.userBlance += +fusdAmount
    }


    updateDataToTestBurning = (supply, fusd, tokens, balance) => {
        this.totalSupply = supply;
        this.reserve = fusd;
        this.userTokenBalance = tokens;
        this.userBlance = balance;
    }


    mintToken = (amount, fusdAmount) => {

        amount = +amount;
        fusdAmount = +fusdAmount;

        let mintPrice = this.getMintPrice(amount);
        let supply = this.totalSupply;
        let fee = (mintPrice * 15) / 100;


        this.reserve += mintPrice - fee;
        this.userBlance -= +fusdAmount;
        this.userTokenBalance += amount;
        this.totalSupply += amount;

    };

    burnToken = (amount) => {
        amount = +amount;

        let supply = this.totalSupply;
        let burnPrice = this.getBurnPrice(amount);

        this.reserve -= burnPrice;
        this.userBlance += burnPrice;
        this.userTokenBalance -= +amount;
        this.totalSupply -= amount;
    }



    getMintPrice = (amount) => {
        amount = +amount;

        let supply = this.totalSupply;
        let newSupply = supply + +amount;
        let reserve = this.reserve;

        return supply === 0 ?
            (this.slope * amount * amount) / 2 / 1e4
            :
            (((reserve * newSupply * newSupply) / (supply * supply)) - reserve);

    }

    getBurnPrice = (amount) => {
        amount = +amount;

        let supply = this.totalSupply;
        let newSupply = supply - +amount;
        let reserve = this.reserve;
        return reserve - ((reserve * newSupply * newSupply) / (supply * supply));
    }

    showUserBalance = () => {
        return { userBalance: this.userBlance, userTokens: this.userTokenBalance }
    };
}

export default BoundingCurve;
