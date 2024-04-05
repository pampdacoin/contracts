# PampdaCoin
PampdaCoin is an ERC20 token implementation built on the Arbitrum blockchain with buy and sell fees. This contract enables users to buy and sell tokens while applying fees specifically to trading activities. All buy and sell fees are burned, contributing to the deflationary nature of the token. Additionally, it allows the owner to update liquidity pools and exception fee wallets.

## Features

- **Buy and Sell Fees**: Buy and sell fees are implemented at a rate of 1% and 3% respectively, calculated in basis points.
- **Liquidity Pools**: Liquidity pools can be managed by the owner. Tokens transferred to or from liquidity pools will be subjected to the respective buy or sell fee.
- **Exception Fee Wallets**: Certain wallets can be exempted from fees, allowing for specific exceptions to the fee mechanism.

## Usage

### Requirements

- Solidity 0.8.25
- OpenZeppelin Contracts v5.0.2 (Ownable, ERC20, ERC20Burnable)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pampdacoin/contracts.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Compile the contracts:

   ```bash
   npx hardhat compile
   ```

### Deploying the Contract

Deploy the PampdaCoin contract to the Ethereum network of your choice. Ensure that you specify the initial owner address during deployment.

### Interacting with the Contract

- **Update Liquidity Pool**: Call the `updateLiquidityPool` function to update the status of a liquidity pool, specifying the pool address and the new status.
- **Update Exception Fee Wallet**: Use the `updateExceptFeeWallet` function to update the status of an exception fee wallet by providing the target address and the new status.

### Example

```solidity
// Deploy the contract
PampdaCoin pampdaCoin = new PampdaCoin(msg.sender);

// Update liquidity pool status
pampdaCoin.updateLiquidityPool(liquidityPoolAddress, true);

// Update exception fee wallet status
pampdaCoin.updateExceptFeeWallet(exceptionWalletAddress, true);

```

## License

This project is licensed under the MIT License.

## Disclaimer

Please note that this code is provided as-is, without any warranties or guarantees. Use it at your own risk.

## Contributing

Contributions to improve the codebase or add new features are welcome. Feel free to open issues or submit pull requests.

## Acknowledgements

- OpenZeppelin for their comprehensive smart contract libraries.
- Ethereum and the Solidity community for providing the necessary tools and resources.
  
---
Created by [Pampda Team](https://github.com/pampdacoin)