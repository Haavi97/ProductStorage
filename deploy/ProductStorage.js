module.exports = async function({
    getNamedAccounts,
    deployments,
}) {

    const { deploy } = deployments;

    const { deployer, dev } = await getNamedAccounts();

    const chainId = await getChainId();

    console.log("Deploying contracts with the account:", deployer);
    // console.log("Account balance:", (await deployer.getBalance()).toString());
    console.log("On chain:", chainId.toString());
    if (deployer) {
        const { address } = await deploy("ProductStorage", {
            from: dev,
            log: true,
            deterministicDeployment: false,
        });

        console.log("ProductStorage address:", address);
    } else {
        console.log("Didn't get any deployer")
    }
}

module.exports.tags = ["ProductStorage"];