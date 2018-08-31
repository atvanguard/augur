import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Favorites from "modules/portfolio/components/favorites/favorites";
import { toggleFavorite } from "modules/markets/actions/update-favorites";
import { loadMarketsInfo } from "modules/markets/actions/load-markets-info";
import selectAllMarkets from "modules/markets/selectors/markets-all";
import { loadMarketsInfoIfNotLoaded } from "modules/markets/actions/load-markets-info-if-not-loaded";

const mapStateToProps = state => {
  // basically just create the filtered markets based on what IDs we find in the favorites object
  const markets = selectAllMarkets();
  const { favorites } = state;

  return {
    isLogged: state.isLogged,
    markets,
    filteredMarkets: Object.keys(favorites),
    transactionsLoading: state.transactionsLoading,
    hasAllTransactionsLoaded:
      state.transactionsOldestLoadedBlock ===
      state.loginAccount.registerBlockNumber // FIXME
  };
};

const mapDispatchToProps = dispatch => ({
  loadMarketsInfo: marketIds => dispatch(loadMarketsInfo(marketIds)),
  toggleFavorite: marketId => dispatch(toggleFavorite(marketId)),
  loadMarketsInfoIfNotLoaded: marketIds =>
    dispatch(loadMarketsInfoIfNotLoaded(marketIds))
});

const FavoritesContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Favorites)
);

export default FavoritesContainer;