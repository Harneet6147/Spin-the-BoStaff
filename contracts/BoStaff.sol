// SPDX-License-Identifier: UNLICENSED
// Uncomment this line to use console.log
// import "hardhat/console.sol";
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BoStaff {
    uint256 public low_speed_price = 5 * (10 ** 18);
    uint256 public med_speed_price = 10 * (10 ** 18);
    uint256 public high_speed_price = 20 * (10 ** 18);
    address payable owner;
    IERC20 public token;
    event WithDraw(address indexed to, uint256 indexed amt);
    event Deposit(address indexed from, uint256 indexed amount);

    constructor(address tokenAddress) {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    // function Approvetokens(uint256 _tokenamount) public returns (bool) {
    //     token.approve(address(this), _tokenamount * (10 ** 18));
    //     return true;
    // }

    // function GetAllowance(address spender) public view returns (uint256) {
    //     return token.allowance(spender, address(this));
    // }

    // To Spin the Staff at Low Speed

    function request_low_speed() external {
        require(
            token.balanceOf(msg.sender) >= low_speed_price,
            "Insufficient tokens to spin the staff"
        );
        require(
            token.allowance(msg.sender, address(this)) >= low_speed_price,
            "Not enough allowance to spin the wheel"
        );
        token.transferFrom(msg.sender, address(this), low_speed_price);
    }

    // To Spin the Staff at Medium Speed

    function request_med_speed() external {
        require(
            token.balanceOf(msg.sender) >= med_speed_price,
            "Insufficient tokens to spin the staff"
        );
        require(
            token.allowance(msg.sender, address(this)) >= med_speed_price,
            "Not enough allowance to spin the wheel"
        );
        token.transferFrom(msg.sender, address(this), med_speed_price);
    }

    // To Spin the Staff at High Speed

    function request_high_speed() external {
        require(
            token.balanceOf(msg.sender) >= high_speed_price,
            "Insufficient tokens to spin the staff"
        );
        require(
            token.allowance(msg.sender, address(this)) >= high_speed_price,
            "Not enough allowance to spin the wheel"
        );
        token.transferFrom(msg.sender, address(this), high_speed_price);
    }

    // To WithDraw the Tokens Deposited in the Contract (BoStaff)

    function withdraw() external onlyOwner {
        emit WithDraw(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    // To Get the Balance of Contract (BoStaff)

    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }

    // To Get the Balance of any Account

    function getBalanceOfAddress(address user) public view returns (uint256) {
        return token.balanceOf(user);
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Access Denied");
        _;
    }
}
