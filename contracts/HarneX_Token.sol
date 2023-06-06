// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HarneXToken is ERC20 {
    address payable public owner;

    constructor() ERC20("HarneX", "HRX") {
        owner = payable(msg.sender);
        _mint(owner, 10000 * (10 ** decimals()));
    }
}
