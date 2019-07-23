import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import MarketCard from "modules/market-cards/market-card";
import { toggleFavorite } from "modules/markets/actions/update-favorites";

const mapStateToProps = state => ({
  isLogged: state.authStatus.isLogged,
  isMobile: state.appStatus.isMobile,
  pendingLiquidityOrders: state.pendingLiquidityOrders
});

const mapDispatchToProps = dispatch => ({
  toggleFavorite: () => dispatch(toggleFavorite()),
});

const MarketCardContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MarketCard)
);

export default MarketCardContainer;
