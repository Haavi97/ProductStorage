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
            expect((await productStorage.getProduct(1)).price).to.equal(
                1000000000000
            );
            expect((await productStorage.getProduct(2)).price).to.equal(
                2000000000000
            );
            expect((await productStorage.getProduct(3)).price).to.equal(
                3000000000000
            );
            expect((await productStorage.getProduct(4)).price).to.equal(
                4000000000000
            );
            expect((await productStorage.getProduct(7)).price).to.equal(
                7000000000000
            );
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

            expect((await productStorage.getProduct(2)).price).to.equal(
                4000000000000
            );
        });

        it("Should fail to insert anything since arrays have different length", async function() {
            // Testing insertSeveral error handling
            await expect(productStorage.insertSeveral(
                [10, 20, 30, 40, 70], [1000, 2000, 3000, 4000, 5000, 7000]
            )).to.be.revertedWith('IDs and price arrays have different length');
        });

        it("Should insert several products", async function() {
            // Testing insertSeveral
            await productStorage.insertSeveral(
                [10, 20, 30, 40, 70], [1000, 2000, 3000, 4000, 7000]
            );

            expect((await productStorage.getProduct(10)).price).to.equal(1000);
            expect((await productStorage.getProduct(10)).inserted).to.equal(true);
            expect((await productStorage.getProduct(20)).price).to.equal(2000);
            expect((await productStorage.getProduct(20)).inserted).to.equal(true);
            expect((await productStorage.getProduct(30)).price).to.equal(3000);
            expect((await productStorage.getProduct(30)).inserted).to.equal(true);
            expect((await productStorage.getProduct(40)).price).to.equal(4000);
            expect((await productStorage.getProduct(40)).inserted).to.equal(true);
            expect((await productStorage.getProduct(70)).price).to.equal(7000);
            expect((await productStorage.getProduct(70)).inserted).to.equal(true);
        });

        it("Should fail to update several products since arrays lengths are different", async function() {
            // Testing updateSeveral
            await expect(productStorage.updateSeveral(
                [10, 20, 30, 40, 70], [1000000, 1000000, 1000000, 1000000, 1000000, 1000000]
            )).to.be.revertedWith('IDs and price arrays have different length');
        })

        it("Should update several products", async function() {
            // Testing updateSeveral
            await productStorage.updateSeveral(
                [10, 20, 30, 40, 70], [1000000, 1000000, 1000000, 1000000, 1000000]
            );

            expect((await productStorage.getProduct(10)).price).to.equal(1000000);
            expect((await productStorage.getProduct(10)).inserted).to.equal(true);
            expect((await productStorage.getProduct(20)).price).to.equal(1000000);
            expect((await productStorage.getProduct(20)).inserted).to.equal(true);
            expect((await productStorage.getProduct(30)).price).to.equal(1000000);
            expect((await productStorage.getProduct(30)).inserted).to.equal(true);
            expect((await productStorage.getProduct(40)).price).to.equal(1000000);
            expect((await productStorage.getProduct(40)).inserted).to.equal(true);
            expect((await productStorage.getProduct(70)).price).to.equal(1000000);
            expect((await productStorage.getProduct(70)).inserted).to.equal(true);
        });

        it("Should erase several all products and not give error trying to erase existing id", async function() {
            // Testing eraseSeveral
            await productStorage.eraseSeveral([1, 2, 3, 4, 5, 7]);

            expect((await productStorage.getProduct(1)).price).to.equal(0);
            expect((await productStorage.getProduct(1)).inserted).to.equal(false);
            expect((await productStorage.getProduct(2)).price).to.equal(0);
            expect((await productStorage.getProduct(2)).inserted).to.equal(false);
            expect((await productStorage.getProduct(3)).price).to.equal(0);
            expect((await productStorage.getProduct(3)).inserted).to.equal(false);
            expect((await productStorage.getProduct(4)).price).to.equal(0);
            expect((await productStorage.getProduct(4)).inserted).to.equal(false);
            expect((await productStorage.getProduct(5)).price).to.equal(0);
            expect((await productStorage.getProduct(5)).inserted).to.equal(false);
            expect((await productStorage.getProduct(7)).price).to.equal(0);
            expect((await productStorage.getProduct(7)).inserted).to.equal(false);
        });
    });
});