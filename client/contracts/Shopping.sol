// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Shopping {
    address payable public owner;

    enum State { Paid, Sent, Delivered, Accepted, Rejected }
    State currentState;

    struct Order {
        address buyer;
        string[] items;
        uint256 price;
        bool paid;
        State state;
    }

    constructor() {
        owner = payable(msg.sender);
    }
}