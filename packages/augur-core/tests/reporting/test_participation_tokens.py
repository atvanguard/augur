from ethereum.tools import tester
from ethereum.tools.tester import TransactionFailed
from pytest import fixture, raises, mark
from utils import longToHexString, EtherDelta, TokenDelta, PrintGasUsed, BuyWithCash
from reporting_utils import generateFees

def test_participation_tokens(kitchenSinkFixture, universe, market, cash):
    reputationToken = kitchenSinkFixture.applySignature("ReputationToken", universe.getReputationToken())

    disputeWindow = kitchenSinkFixture.applySignature("DisputeWindow", universe.getOrCreateNextDisputeWindow(False))

    # Generate Fees
    generateFees(kitchenSinkFixture, universe, market)

    # We can't buy participation tokens until the window starts
    with raises(TransactionFailed):
        disputeWindow.buy(300)

    # Fast forward time until the new dispute window starts and we can buy some tokens
    assert reputationToken.transfer(tester.a1, 100)
    kitchenSinkFixture.contracts["Time"].setTimestamp(disputeWindow.getStartTime() + 1)
    with TokenDelta(reputationToken, -300, tester.a0, "Buying sisnt take REP"):
        with TokenDelta(disputeWindow, 300, tester.a0, "Buying didnt give PTs"):
            assert disputeWindow.buy(300)
    with TokenDelta(reputationToken, -100, tester.a1, "Buying sisnt take REP"):
        with TokenDelta(disputeWindow, 100, tester.a1, "Buying didnt give PTs"):
            assert disputeWindow.buy(100, sender = tester.k1)

    # We can't redeem until the window is over
    with raises(TransactionFailed):
        disputeWindow.redeem()

    # Fast forward time until the new dispute window is over and we can redeem
    kitchenSinkFixture.contracts["Time"].setTimestamp(disputeWindow.getEndTime() + 1)

    totalFees = cash.balanceOf(disputeWindow.address)

    with TokenDelta(reputationToken, 300, tester.a0, "Redeeming didn't refund REP"):
        with TokenDelta(cash, totalFees * 3 / 4, tester.a0, "Redeeming didn't give fees"):
            with TokenDelta(disputeWindow, -300, tester.a0, "Redeeming didn't burn PTs"):
                assert disputeWindow.redeem()

    with TokenDelta(reputationToken, 100, tester.a1, "Redeeming didn't refund REP"):
        with TokenDelta(cash, totalFees * 1 / 4, tester.a1, "Redeeming didn't give fees"):
            with TokenDelta(disputeWindow, -100, tester.a1, "Redeeming didn't burn PTs"):
                assert disputeWindow.redeem(sender = tester.k1)