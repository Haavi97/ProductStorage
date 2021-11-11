// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/Ownable.sol";

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

    modifier onlyOwnerOrInternal() {
        require(
            (owner() == _msgSender()) || (address(this) == _msgSender()),
            "Ownable: caller is not the owner"
        );
        _;
    }

    // READ CONTRACT
    function getProduct(uint256 id) public view returns (Product memory) {
        return products[id];
    }

    // WRITE CONTRACT
    function insert(uint256 id, uint256 price) external onlyOwnerOrInternal {
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

    function update(uint256 id, uint256 price) external onlyOwnerOrInternal {
        // function to update a product
        // If the product doesn't exists, then it should insert it
        if (products[id].inserted) {
            products[id].price = price;
        } else {
            this.insert(id, price);
        }
        emit UpdatedProduct(id, price);
    }

    function erase(uint256 id) external onlyOwnerOrInternal {
        // Function to erase existing product
        // first check the id exists
        if (products[id].inserted) {
            delete (products[id]);
            emit ErasedProduct(id);
        }
    }

    function insertSeveral(uint256[] memory ids, uint256[] memory prices)
        external
        onlyOwner
    {
        // function to insert new products from an array of id's
        // and an array of their correspondent prices
        // require is more convinient than assert since it returns remaining gas
        require(
            ids.length == prices.length,
            "IDs and price arrays have different length"
        );
        for (uint256 i = 0; i < ids.length; i++) {
            this.insert(ids[uint256(i)], prices[uint256(i)]);
        }
    }

    function updateSeveral(uint256[] memory ids, uint256[] memory prices)
        external
        onlyOwner
    {
        // function to update several products from an array of id's
        // and an array of their correspondent prices
        require(
            ids.length == prices.length,
            "IDs and price arrays have different length"
        );
        for (uint256 i = 0; i < ids.length; i++) {
            this.update(ids[uint256(i)], prices[uint256(i)]);
        }
    }

    function eraseSeveral(uint256[] memory ids) external onlyOwner {
        // function to erase products given an array of products id's
        for (uint256 i = 0; i < ids.length; i++) {
            this.erase(ids[uint256(i)]);
        }
    }
}
