import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import "hardhat-contract-sizer";
import type { HardhatUserConfig } from "hardhat/config";
import type { NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";

// import "./tasks/accounts";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

const chainIds = {
  // Ethereum
  mainnet: 1,
  sepolia: 11155111,
  // Arbitrum
  arbitrum: 42161,
  arbitrumSepolia: 421614,
  // Avalanche
  avalanche: 43114,
  fuji: 43113,
  routescan: 43114,
  // Binance Smart Chain
  bsc: 56,
  bscTestnet: 97,
  // Optimism
  optimism: 10,
  optimismSepolia: 11155420,
  // Polygon
  polygon: 137,
  mumbai: 80001,
  // Base
  base: 8453,
  baseSepolia: 84532,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    // Ethereum
    case "mainnet":
      jsonRpcUrl = process.env.MAINNET_URL || "";
      break;
    case "sepolia":
      jsonRpcUrl = process.env.SEPOLIA_URL || "";
      break;
    // Arbitrum
    case "arbitrum":
      jsonRpcUrl = process.env.ARBITRUM_URL || "";
      break;
    case "arbitrumSepolia":
      jsonRpcUrl = process.env.ARBITRUM_T_URL || "";
      break;
    // Avalanche
    case "avalanche":
      jsonRpcUrl = process.env.AVAX_URL || ";
      break;
    case "routescan":
      jsonRpcUrl = process.env.AVAX_URL || "";
      break;
    case "fuji":
      jsonRpcUrl = process.env.FUJI_URL || "";
      break;
    // Binance Smart Chain
    case "bsc":
      jsonRpcUrl = process.env.BSC_URL || "";
      break;
    // Polygon
    case "polygon":
      jsonRpcUrl = process.env.POLYGON || "";
      break;
    case "mumbai":
      jsonRpcUrl = process.env.MUMBAI || "";
      break;
    default:
      jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + "";
  }
  return {
    accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    chainId: chainIds[chain],
    url: jsonRpcUrl,
    // gasPrice: 147000000000,
  };
}
const config: HardhatUserConfig = {
  etherscan: {
    apiKey: {
      // Ethereum
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      // Arbitrum
      arbitrumOne: process.env.ARBITRUM_API_KEY || "",
      arbitrumSepolia: process.env.ARBITRUM_API_KEY || "",
      // Avalanche
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY || "",
      routescan: "routescan", // apiKey is not required, just set a placeholder
      // Binance Smart Chain
      bsc: process.env.BSCSCAN_API_KEY || "",
      // Polygon
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      // Optimism
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
    },
  },
  networks: {
    // Ethereum
    mainnet: getChainConfig("mainnet"),
    sepolia: getChainConfig("sepolia"),
    // Arbitrum
    arbitrum: getChainConfig("arbitrum"),
    arbitrumSepolia: getChainConfig("arbitrumSepolia"),
    // Avalanche
    avalanche: getChainConfig("avalanche"),
    fuji: getChainConfig("fuji"),
    routescan: getChainConfig("routescan"),
    // Binance Smart Chain
    bsc: getChainConfig("bsc"),
    // Optimism
    optimism: getChainConfig("optimism"),
    // Polygon
    polygon: getChainConfig("polygon"),
    mumbai: getChainConfig("mumbai"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.25",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
};

export default config;
