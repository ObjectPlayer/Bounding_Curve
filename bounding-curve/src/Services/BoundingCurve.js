class BoundingCurve {
    constructor() {
        this.fusdPool = 0;
        this.reserveRatio = 0.0005;
        this.totalSupply = 0;
        this.userBlance = 10000.0;
        this.userTokenBalance = 0;
    }

    amountShouldBeMinted = (fusdAmount) => {
        let amount = 0;
        if (this.totalSupply)
            amount =
                this.totalSupply *
                ((Math.pow((1 + fusdAmount) / this.fusdPool), this.reserveRatio) - 1);
        else amount = fusdAmount * this.reserveRatio;
        return amount;
    };

    purchaseToken = (fusdAmount) => {
        let tokenAmountMinted = this.amountShouldBeMinted(fusdAmount);
        this.userBlance -= fusdAmount;
        this.userTokenBalance += tokenAmountMinted;
    };

    showUserBalance = () => {
        return { userBalance: this.userBlance, userTokens: this.userTokenBalance }
    };
}

export default BoundingCurve;
