class BoundingCurve {
    constructor() {
        this.slope = 0.0005;
        this.maxSupply = 100000000;
        this.totalSupply = 0;
        this.userBlance = 36605661082;
        this.userTokenBalance = 0;
        this.reserve = 0;
        this.fees = 0;
        this.artistFeePercentage = 0.15;
        this.adminFeePercentage = 0.03;
        this.adminBalance = 0.0;
        this.artistBalance = 0.0;

    }

    setUserBalance = (fusdAmount) => {
        this.userBlance += +fusdAmount
    }


    updateData = (slope, maxSupply, userBalance, artistFee, adminFee) => {
        this.slope = slope;
        this.maxSupply = maxSupply;
        this.userBlance = userBalance;
        this.artistFee = artistFee;
        this.adminFee = adminFee;
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
        let fees = this.distributeFee(fusdAmount);
        this.reserve += mintPrice - fees;
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
        return {
            userBalance: this.userBlance,
            userTokens: this.userTokenBalance,
            adminBalance: this.adminBalance,
            artistBalance: this.artistBalance
        }
    };

    distributeFee = (amount) => {
        let adminFee = amount * this.adminFeePercentage / 100;
        let artistFee = amount * this.artistFeePercentage / 100;

        this.adminBalance += adminFee;
        this.artistBalance += artistFee;

        return adminFee + artistFee
    }
}

export default BoundingCurve;
