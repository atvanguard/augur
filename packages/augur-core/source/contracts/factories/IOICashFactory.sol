pragma solidity 0.5.4;

import 'ROOT/IAugur.sol';
import 'ROOT/trading/IOICash.sol';


contract IOICashFactory {
    function createOICash(IAugur _augur) public returns (IOICash);
}
