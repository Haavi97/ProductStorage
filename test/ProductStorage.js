const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("ProductStorage contract", function() {
    let ProductStorage;
    let productStorage;
    let owner;

    beforeEach(async function() {

        [owner] = await ethers.getSigners();

        const ProductStorage = await ethers.getContractFactory("ProductStorage");

        productStorage = await ProductStorage.deploy();
        // console.log(await productStorage.owner());

        await productStorage.insert(1, 1000000000000);
        await productStorage.insert(2, 2000000000000);
        await productStorage.insert(3, 3000000000000);
        await productStorage.insert(4, 4000000000000);
        await productStorage.insert(7, 7000000000000);
        // console.log((await productStorage.getProduct(1)).price)
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function() {
            expect(await productStorage.owner()).to.equal(owner.address);
        });
    });

    describe("Methods", function() {
        // Testing insert
        it("Should insert 5 different products", async function() {
            expect((await productStorage.getProduct(1)).price).to.equal(1000000000000);
            expect((await productStorage.getProduct(2)).price).to.equal(2000000000000);
            expect((await productStorage.getProduct(3)).price).to.equal(3000000000000);
            expect((await productStorage.getProduct(4)).price).to.equal(4000000000000);
            expect((await productStorage.getProduct(7)).price).to.equal(7000000000000);
        });

        it("Should insert erase product with id 1", async function() {
            // Testing erase
            await productStorage.erase(1);

            expect((await productStorage.getProduct(1)).price).to.equal(0);
            expect((await productStorage.getProduct(1)).inserted).to.equal(false);
            expect((await productStorage.getProduct(101)).inserted).to.equal(false);
        });

        it("Should update erase product with id 2 to have a price 4000000000000", async function() {
            // Testing update
            await productStorage.update(2, 4000000000000);

            expect((await productStorage.getProduct(2)).price).to.equal(4000000000000);
        });
    });
});