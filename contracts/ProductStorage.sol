// SPDX-License-Identifier: MIT

pragma solidity ^0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract ProductStorage is Ownable {
    struct Product {
        uint256 price;
        bool inserted;
    }

    mapping(uint256 => Product) public products;

    // Events
    event NewInsertedProduct(uint256 id, uint256 price);
    event UpdatedProduct(uint256 id, uint256 price);
    event ErasedProduct(uint256 id);

    // READ CONTRACT
    function getProduct(uint256 id) public view returns (Product memory) {
        return products[id];
    }


    // WRITE CONTRACT
    function insert(uint256 id, uint256 price) external onlyOwner {
        // function to insert a new product
        // first check the id is not taken
        // Then add the product
        if (!products[id].inserted) {
            Product memory inserting;
            inserting.price = price;
            inserting.inserted = true;
            products[id] = inserting;
            emit NewInsertedProduct(id, price);
        }
    }

    function update(uint256 id, uint256 price) external onlyOwner {
        // function to update a product
        // If the product doesn't exists, then it should insert it
        if (products[id].inserted) {
            products[id].price = price;
        } else {
            this.insert(id, price);
        }
        emit UpdatedProduct(id, price);
    }

    function erase(uint256 id) external onlyOwner {
        // Function to erase existing product
        // first check the id exists
        if (products[id].inserted) {
            products[id].price = 0;
            products[id].inserted = false;
            emit ErasedProduct(id);
        }
    }
}
