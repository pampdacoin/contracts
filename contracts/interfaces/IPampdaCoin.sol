// SPDX-License-Identifier: MIT
pragma solidity 0.8.25;

interface IPampdaCoin {
    error NotAllowedSendGasToToken();

    event LiquidityPoolsUpdated(address indexed pool, bool status);
    event ExceptFeeWalletsUpdated(address indexed target, bool status);

    function updateLiquidityPool(address pool, bool status) external;

    function updateExceptFeeWallet(address target, bool status) external;
}
