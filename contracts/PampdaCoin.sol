// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

// "@openzeppelin/contracts": "5.0.2",
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Burnable } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { IPampdaCoin } from "./interfaces/IPampdaCoin.sol";

/**
 * @title PampdaCoin
 * @dev A ERC20 token implementation with buy and sell fees. All buy and sell fees will be burned.
 * This contract allows owner for updating liquidity pools and exception fee wallets, and applies fees on transfers.
 * Buy and sell fees are immutable.
 */
contract PampdaCoin is IPampdaCoin, ERC20, ERC20Burnable, Ownable {
    uint256 public constant MAX_SUPPLY = 999_999_999_999 * 1e18;
    uint256 public constant BUY_FEE_BPS = 100; // Buy fee in basis points (1%)
    uint256 public constant SELL_FEE_BPS = 300; // Sell fee in basis points (3%)
    uint256 public constant HUNDRED_PERCENT_IN_BPS = 10_000; // 100% in basis points

    mapping(address => bool) public liquidityPools;
    mapping(address => bool) public exceptFeeWallets;

    /**
     * @dev Initializes the PampdaCoin contract.
     * @param initialOwner The initial owner of the contract.
     */
    constructor(address initialOwner) ERC20("Pamp Da Coin", "PAMP") Ownable(initialOwner) {
        _mint(initialOwner, MAX_SUPPLY);
        exceptFeeWallets[initialOwner] = true;
    }

    /**
     * @dev Reverts any direct payments to the contract.
     */
    receive() external payable {
        revert NotAllowedSendGasToToken();
    }

    /**
     * @dev Updates the status of a liquidity pool.
     * @param pool The address of the liquidity pool.
     * @param status The new status of the liquidity pool.
     * Emits LiquidityPoolsUpdated event upon successful update.
     */
    function updateLiquidityPool(address pool, bool status) external override onlyOwner {
        if (liquidityPools[pool] == status) return;

        liquidityPools[pool] = status;

        emit LiquidityPoolsUpdated(pool, status);
    }

    /**
     * @dev Updates the status of an exception fee wallet.
     * @param target The address of the exception fee wallet.
     * @param status The new status of the exception fee wallet.
     * Emits ExceptFeeWalletsUpdated event upon successful update.
     */
    function updateExceptFeeWallet(address target, bool status) external override onlyOwner {
        if (exceptFeeWallets[target] == status) return;

        exceptFeeWallets[target] = status;

        emit ExceptFeeWalletsUpdated(target, status);
    }

    /**
     * @dev Overrides transfer function to apply fees.
     */
    function _update(address from, address to, uint256 value) internal override {
        // Skip fee for exception wallets
        if (exceptFeeWallets[from] || exceptFeeWallets[to]) {
            super._update(from, to, value);
            return;
        }

        uint256 feeAmount = 0;

        if (liquidityPools[from]) {
            feeAmount = (value * BUY_FEE_BPS) / HUNDRED_PERCENT_IN_BPS; // Apply buy fee
        } else if (liquidityPools[to]) {
            feeAmount = (value * SELL_FEE_BPS) / HUNDRED_PERCENT_IN_BPS; // Apply sell fee
        } else {
            super._update(from, to, value); // Normal transfer
            return;
        }

        super._update(from, address(0), feeAmount); // Burn all fees
        super._update(from, to, value - feeAmount); // Transfer value after deducting the fee
    }
}
