require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");

require('dotenv').config()

const accounts = {
    mnemonic: process.env.MNEMONIC || "test test test test test test test test test test test junk",
}

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sparta: {
            url: `https://sparta-rpc.polis.tech`,
            accounts,
            chainId: 333888,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
            gasPrice: 2000000000,
            gasMultiplier: 2,
            timeout: 100000
        },
        mumbai: {
            url: "https://rpc-mumbai.maticvigil.com/",
            accounts,
            chainId: 80001,
            live: true,
            saveDeployments: true,
            tags: ["staging"],
            gasMultiplier: 2,
        },
        hardhat: {
            forking: {
                enabled: process.env.FORKING === "true",
                url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`,
            },
            live: false,
            saveDeployments: true,
            tags: ["test", "local"],
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        dev: {
            default: 1,
        },
    },
    solidity: {
        compilers: [{
            version: "0.6.12",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }]
    },
    mocha: {
        timeout: 2000000
    }
};