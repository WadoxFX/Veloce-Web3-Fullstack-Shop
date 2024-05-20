// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Shopping {
    address payable public owner;
    mapping (address => Order[]) orders;

    enum Status { Paid, Sent, Delivered, Accepted, Rejected }

    struct Order {
        uint256 id;
        string[] productsId;
        uint256 totalPrice;
        address payable buyer;
        Status status;
        bool paid;
    }

    event Payed(address _buyer, uint256 _newOrderId, string _message);
    event Sent(address _buyer, uint256 _newOrderId, string _message);
    event Delivered(address _buyer, uint256 _newOrderId, string _message);
    event Accepted(address _buyer, uint256 _newOrderId, string _message);
    event Rejected(address _buyer, uint256 _newOrderId, string _message);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }

    modifier onlyCustomer() {
        require(owner != msg.sender, "Only customers can pay for products");
        _;
    }

    modifier correctPrice(uint _price) {
        require(msg.value >= _price, "The price for the products does not match the amount you sent");
        _;
    }

    function pay(string[] memory _productsId, uint256 _price) external payable onlyCustomer correctPrice(_price) {
        uint256 remainder = msg.value - _price;
        if(remainder > 0) payable(msg.sender).transfer(remainder);
        
        uint256 id = uuid();
        orders[msg.sender].push(Order(id, _productsId, _price, payable(msg.sender), Status.Paid, true));

        emit Payed(msg.sender, id, "Payment was successful");
    }

    function send(address _buyer, uint256 _id) external onlyOwner {
        Order storage order = findOrder(_buyer, _id);
        require(order.status == Status.Paid, "Order status must be paid");

        order.status = Status.Sent;
        emit Sent(_buyer, _id, "The item was sent to the post office");
    }

    function delivered(address _buyer, uint256 _id) external onlyOwner {
        Order storage order = findOrder(_buyer, _id);
        require(order.status == Status.Sent, "Order status must be send");

        order.status = Status.Delivered;
        emit Delivered(_buyer, _id, "The product was delivered to the post office");
    }

    function accepted(address _buyer, uint256 _id) external onlyOwner {
        Order storage order = findOrder(_buyer, _id);
        require(order.status == Status.Delivered, "Order status must be delivered");

        order.status = Status.Accepted;
        owner.transfer(order.totalPrice);
        deleteOrder(_buyer, _id);
        emit Accepted(_buyer, _id, "The order is accepted, the money is transferred to the seller's account");
    }

    function rejected(address _buyer, uint256 _id) external onlyOwner {
        Order storage order = findOrder(_buyer, _id);
        require(order.status == Status.Delivered, "Order status must be delivered");

        payable(_buyer).transfer(order.totalPrice);
        order.status = Status.Rejected;
        deleteOrder(_buyer, _id);

        emit Rejected(_buyer, _id, "The amount of goods refunded to the buyer");
    }

    function findOrder(address _user, uint256 _id) internal view returns(Order storage) {
        Order[] storage userOrders = orders[_user];
        for(uint256 i = 0; i < userOrders.length; i++) {
            if(userOrders[i].id == _id) {
                return userOrders[i];
            }
        }
        revert("Order not found");
    }

    function deleteOrder(address _buyer, uint256 _id) internal {
        Order[] storage userOrders = orders[_buyer];
        uint256 index;
        for(uint256 i = 0; i < userOrders.length; i++) {
            if(userOrders[i].id == _id) {
                index = i;
                break;
            }
        }
        if (index < userOrders.length - 1) {
            userOrders[index] = userOrders[userOrders.length - 1];
        }
        userOrders.pop();
    }

    function uuid() public view returns(uint256) {
        return block.timestamp;
    }

    function getTotalBalance() external view onlyOwner returns(uint256) {
        return address(this).balance;
    }

    function getMyOrders() external view returns(Order[] memory) {
        return orders[msg.sender];
    }

    function getOrderStatus(address _buyer, uint256 _id) external view returns(string memory) {
        Order storage order = findOrder(_buyer, _id);
        return statusToString(order.status);
    }

    function statusToString(Status _status) internal pure returns(string memory) {
        if (_status == Status.Paid) return "Paid";
        if (_status == Status.Sent) return "Sent";
        if (_status == Status.Delivered) return "Delivered";
        if (_status == Status.Accepted) return "Accepted";
        if (_status == Status.Rejected) return "Rejected";
        return "";
    }
}