// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

import "@account-abstraction/contracts/interfaces/ISenderCreator.sol";
import "./NpubAccount.sol";

/**
 * A sample factory contract for SimpleAccount
 * A UserOperations "initCode" holds the address of the factory, and a method call (to createAccount, in this sample factory).
 * The factory's createAccount returns the target account address even if it is already installed.
 * This way, the entryPoint.getSenderAddress() can be called either before or after the account is created.
 */
contract NpubAccountFactory {
    NpubAccount public immutable accountImplementation;
    ISenderCreator public immutable senderCreator;

    constructor(IEntryPoint _entryPoint) {
        accountImplementation = new NpubAccount(_entryPoint);
        senderCreator = _entryPoint.senderCreator();
    }

    /**
     * create an account, and return its address.
     * returns the address even if the account is already deployed.
     * Note that during UserOperation execution, this method is called only if the account is not deployed.
     * This method returns an existing account address so that entryPoint.getSenderAddress() would work even after account creation
     */
    function createAccount(uint256 owner,uint256 salt) public returns (NpubAccount ret) {
        require(msg.sender == address(senderCreator), "only callable from SenderCreator");
        address addr = getAddress(owner, salt);
        uint256 codeSize = addr.code.length;
        if (codeSize > 0) {
            return NpubAccount(payable(addr));
        }
        ret = NpubAccount(payable(new ERC1967Proxy{salt : bytes32(salt)}(
                address(accountImplementation),
                abi.encodeCall(NpubAccount.initialize, (owner))
            )));
    }

    /**
     * calculate the counterfactual address of this account as it would be returned by createAccount()
     */
    function getAddress(uint256 owner,uint256 salt) public view returns (address) {
        return Create2.computeAddress(bytes32(salt), keccak256(abi.encodePacked(
                type(ERC1967Proxy).creationCode,
                abi.encode(
                    address(accountImplementation),
                    abi.encodeCall(NpubAccount.initialize, (owner))
                )
            )));
    }
}

