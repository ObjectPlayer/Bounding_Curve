# Bounding_Curve
Bonding curves are built upon one of the most fundamental concepts in economics: price being a function of supply and demand. This tried and tested economic law is the complex study of a more familiar adage: an asset is only worth what someone is willing to pay for it. The core concept of a bonding curve is quite simple: The price of a token is determined by its supply. The more tokens that have been distributed, the higher the price. Bonding curves allow for a fix and predetermined price discovery mechanism, that is set in blockchain stone and cannot be cheated.
Every minter needs to deposit some amount to mint spcific amount of tokens and next minter will pay more amount the previsou minter. Same for the bunner, if a user wants to burn his tokens, he can burn and get repective amount of tokens from pool. The price of each token is defined by the curve / formula itself, every market participant knows exactly how much each token will cost at any given time. As tokens have the lowest price at the lowest part of the curve, there is a price advantage for early adopters. 


# Basic methods

## GetMintPrice 
This is the method, which will provide you that how much about you have to pay for a specific amount of token, that you want to mint on your account. 


## GetBurnPrice 
This is the method, which will provide you that how much amount you will get if you burn that specific amount of tokens. 


## MintTokens 
This method, will get fiat or reserved-token amount from you and mint tokens on your account. Once tokens are minted it will increament the reserve tokens in pool, total supply of token, distribute fee to among multiple parties. 


## BurnTokens 
This method, will get token amount from you which you want to burn and send you reserved-token to your account according to bounding curve. Once tokens are burned it will withdraw the tokens from pool, decrement total supply of token and deposite fiat or reserve-token amount to your account. In this method, we don't need to charge any fee.  
