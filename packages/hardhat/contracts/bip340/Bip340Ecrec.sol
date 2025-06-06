// SPDX-License-Identifier: MIT

pragma solidity >=0.8.0;

import "./EllipticCurve.sol";
import "./Secp256k1.sol";

library Bip340Util {
    /// BIP340 challenge function.
    ///
    /// Hopefully the first SHA256 call gets inlined.
    function computeChallenge(bytes32 rx, bytes32 px, bytes32 m) internal pure returns (uint256) {
        // Precomputed `sha256("BIP0340/challenge")`.
        //
        // Saves ~10k gas, mostly from byte shuffling to prepare the call.
        //bytes32 tag = sha256("BIP0340/challenge");
        bytes32 tag = 0x7bb52d7a9fef58323eb1bf7a407db382d2f3f2d81bb1224f49fe518f6d48d37c;

        // Let e = int(hashBIP0340/challenge(bytes(r) || bytes(P) || m)) mod n.
        return uint256(sha256(abi.encodePacked(tag, tag, rx, px, m))) % Secp256k1.NN;
    }

    /// Given an x coordinate, returns the y coordinate of an even point on
    /// the secp256k1 curve.  This can be used to precompute the pubkey Y as
    /// mentioned in a few places.
    ///
    /// The second return value specifies if the operation was successful.
    function liftX(uint256 _x) internal pure returns (uint256, bool) {
        uint256 _pp = Secp256k1.PP;
        uint256 _aa = Secp256k1.AA;
        uint256 _bb = Secp256k1.BB;

        if (_x >= _pp) {
            return (0, false);
        }
        
        // Taken from the EllipticCurve code.
        uint256 y2 = addmod(mulmod(_x, mulmod(_x, _x, _pp), _pp), addmod(mulmod(_x, _aa, _pp), _bb, _pp), _pp);
        y2 = EllipticCurve.expMod(y2, (_pp + 1) / 4, _pp);
        uint256 y = (y2 & 1) == 0 ? y2 : _pp - y2;

        //require(y % 2 == 0, "not even???");

        return (y, true);
    }

    /// Internal function for doing the affine conversion for only the x coordinate.
    function xToAffine(uint256 _x, uint256 _z, uint256 _pp) internal pure returns (uint256) {
        uint256 zInv = EllipticCurve.invMod(_z, _pp);
        uint256 zInv2 = mulmod(zInv, zInv, _pp);
        return mulmod(_x, zInv2, _pp);
    }

    /// Converts a BIP340 pubkey X coord to what it would look like as an
    /// Ethereum address.
    function convToFakeAddr(uint256 px) internal pure returns (address, bool) {
        (uint256 py, bool ok) = liftX(px);
        if (!ok) {
            return (address(0), false);
        }
        bytes32 h = keccak256(abi.encodePacked(bytes32(px), bytes32(py)));
        return (address(uint160(uint256(h))), true);
    }
}

library Bip340Ecrec {
    /// Uses the ecrecover hack to verify a schnorr signature more efficiently than it should.
    ///
    // Based on `https://hackmd.io/@nZ-twauPRISEa6G9zg3XRw/SyjJzSLt9`
    // ^ this line is un-doc-commented because solc is annoying
    function verify(uint256 px, uint256 rx, uint256 s, bytes32 m) internal pure returns (bool) {
        // Check pubkey, rx, and s are in-range.
        if (px >= Secp256k1.PP || rx >= Secp256k1.PP || s >= Secp256k1.NN) {
            return false;
        }

        (address exp, bool ok) = Bip340Util.convToFakeAddr(rx);
        if (!ok) {
            return false;
        }

        uint256 e = Bip340Util.computeChallenge(bytes32(rx), bytes32(px), m);
        bytes32 sp = bytes32(Secp256k1.NN - mulmod(s, px, Secp256k1.NN));
        bytes32 ep = bytes32(Secp256k1.NN - mulmod(e, px, Secp256k1.NN));

        // 27 apparently used to signal even parity (which it will always have).
        address rvh = ecrecover(sp, 27, bytes32(px), ep);
        return rvh == exp; // if recovery fails we fail anyways
    }
}