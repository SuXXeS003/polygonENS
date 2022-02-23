const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("Domains");
    const domainContract = await domainContractFactory.deploy("Kappa");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("lord", {value: hre.ethers.utils.parseEther("0.1")});
    await txn.wait();
    console.log("Minted domain lord.kappa");

    txn = await domainContract.setRecord("lord", "Kappa Record");
    await txn.wait();
    console.log("Set record for lord.kappa");

    const address = await domainContract.getAddress("lord");
    console.log("Owner of domain lord:", address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();