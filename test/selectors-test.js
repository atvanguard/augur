import {assert} from 'chai';
import proxyquire from 'proxyquire';

import activePage from './app/selectors/active-page-test';
import * as loginAccount from './auth/selectors/login-account-test';
import links from './link/selectors/links-test';
import * as authForm from './auth/selectors/auth-form-test';
import marketsHeader from './markets/selectors/markets-header-test';
import markets from './markets/selectors/markets-test';
import allMarkets from './markets/selectors/markets-all-test';
import favoriteMarkets from './markets/selectors/markets-favorite-test';
import filteredMarkets from './markets/selectors/markets-filtered-test';
import unpaginatedMarkets from './markets/selectors/markets-unpaginated-test';
import marketsTotals from './markets/selectors/markets-totals-test';
import pagination from './markets/selectors/pagination-test';
import market from './market/selectors/market-test';
import filters from './markets/selectors/filters-test';
import searchSort from './markets/selectors/search-sort-test';
import keywords from './markets/selectors/keywords-test';
import transactions from './transactions/selectors/transactions-test';
import transactionsTotals from './transactions/selectors/transactions-totals-test';
import * as createMarketForm from './create-market/selectors/create-market-form-test';

import * as assertions from '../node_modules/augur-ui-react-components/test/assertions/';

describe(`![ SELECTORS TESTS - UI Integration ]!`, () => {
	proxyquire.noPreserveCache().noCallThru();

	// this may be redundant, will refactor after I get this all working.
	const selectors = proxyquire('../src/selectors.js', {
		'./modules/app/selectors/active-page': activePage,
		'./modules/auth/selectors/login-account': loginAccount.default.loginAccount,
		'./modules/link/selectors/links': links,
		'./modules/auth/selectors/auth-form': authForm.default.authForm,
		'./modules/markets/selectors/markets-header': marketsHeader,
		'./modules/markets/selectors/markets': markets,
		'./modules/markets/selectors/markets-all': allMarkets,
		'./modules/markets/selectors/markets-favorite': favoriteMarkets,
		'./modules/markets/selectors/markets-filtered': filteredMarkets,
		'./modules/markets/selectors/markets-unpaginated': unpaginatedMarkets,
		'./modules/markets/selectors/markets-totals': marketsTotals,
		'./modules/markets/selectors/pagination': pagination,
		'./modules/market/selectors/market': market,
		'./modules/markets/selectors/filters': filters,
		'./modules/markets/selectors/search-sort': searchSort,
		'./modules/markets/selectors/keywords': keywords,
		'./modules/transactions/selectors/transactions': transactions,
		'./modules/transactions/selectors/transactions-totals': transactionsTotals,
		'./modules/create-market/selectors/create-market-form': createMarketForm.default.createMarketForm
	});

	it(`should be able to load the auth page`, () => {
			// siteheader, authForm
			const siteHeader = {
				activePage: selectors.activePage,
				loginAccount: selectors.loginAccount,
				positionsSummary: selectors.marketsTotals.positionsSummary,
				transactionsTotals: selectors.transactionsTotals,
				isTransactionsWorking: selectors.isTransactionsWorking
			};
			assertions.siteHeader(siteHeader);
			assertions.authForm(selectors.authForm);
	});

	it(`should be able to load the create market page`, () => {
		// siteHeader, createMarketForm
		const siteHeader = {
			activePage: selectors.activePage,
			loginAccount: selectors.loginAccount,
			positionsSummary: selectors.marketsTotals.positionsSummary,
			transactionsTotals: selectors.transactionsTotals,
			isTransactionsWorking: selectors.isTransactionsWorking
		};
		assertions.siteHeader(siteHeader);
		assertions.createMarketForm(selectors.createMarketForm);
		// first import will be whatever the selector makes given the test state.
		// after that subsequent imports should be trying to imprint the state with the new selector to modify the outcome.

		// set the internal state of the selector to the initial step
		createMarketForm.default.state.createMarketInProgress = selectors.createMarketForm;

		// Binary createMarket Tests
		createMarketForm.default.state.createMarketInProgress.step = 2;
		createMarketForm.default.state.createMarketInProgress.type = 'binary';
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 3;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 4;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		// Scalar createMarket Tests
		createMarketForm.default.state.createMarketInProgress = selectors.createMarketForm;
		createMarketForm.default.state.createMarketInProgress.step = 2;
		createMarketForm.default.state.createMarketInProgress.type = 'scalar';
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 3;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 4;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		// Categorical createMarket Tests
		createMarketForm.default.state.createMarketInProgress = selectors.createMarketForm;
		createMarketForm.default.state.createMarketInProgress.step = 2;
		createMarketForm.default.state.createMarketInProgress.type = 'categorical';
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 3;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 4;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		// Combinatorial createMarket Tests
		createMarketForm.default.state.createMarketInProgress = selectors.createMarketForm;
		createMarketForm.default.state.createMarketInProgress.step = 2;
		createMarketForm.default.state.createMarketInProgress.type = 'combinatorial';
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 3;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);

		createMarketForm.default.state.createMarketInProgress.step = 4;
		createMarketForm.default.state.createMarketInProgress = createMarketForm.default.createMarketForm();
		assertions.createMarketForm(createMarketForm.default.state.createMarketInProgress);
	});

	it(`should be able to load a market page`, () => {
		// siteHeader, market, marketsTotals.numPendingReports
		const siteHeader = {
			activePage: selectors.activePage,
			loginAccount: selectors.loginAccount,
			positionsSummary: selectors.marketsTotals.positionsSummary,
			transactionsTotals: selectors.transactionsTotals,
			isTransactionsWorking: selectors.isTransactionsWorking
		};
		assertions.siteHeader(siteHeader);
		assertions.market.marketAssertion(selectors.market);
		assert.isDefined(selectors.marketsTotals.numPendingReports, `selectors.marketsTotals.numPendingReports isn't defined`);
		assert.isNumber(selectors.marketsTotals.numPendingReports, `selectors.marketsTotals.numPendingReports isn't a number`);
	});

	it(`should be able to load the markets page`, () => {
		// siteHeader, links.createMarketLink, keywords, markets,
		// marketsHeader, favoriteMarkets, filters, pagination, searchSort
		const siteHeader = {
			activePage: selectors.activePage,
			loginAccount: selectors.loginAccount,
			positionsSummary: selectors.marketsTotals.positionsSummary,
			transactionsTotals: selectors.transactionsTotals,
			isTransactionsWorking: selectors.isTransactionsWorking
		};
		assertions.siteHeader(siteHeader);
		assertions.markets(selectors.markets);
		assertions.keywords(selectors.keywords);
		assertions.links(selectors.links);
		assertions.marketsHeader(selectors.marketsHeader);
		assertions.filters(selectors.filters);
		assertions.pagination(selectors.pagination);
		assertions.searchSort(selectors.searchSort);
	});

	it(`should be able to load the transactions page`, () => {
		// siteHeader, transactions, transactionsTotals
		const siteHeader = {
			activePage: selectors.activePage,
			loginAccount: selectors.loginAccount,
			positionsSummary: selectors.marketsTotals.positionsSummary,
			transactionsTotals: selectors.transactionsTotals,
			isTransactionsWorking: selectors.isTransactionsWorking
		};
		assertions.siteHeader(siteHeader);
		assertions.transactions(selectors.transactions);
		assertions.transactionsTotals(selectors.transactionsTotals);
	});

	it(`should be able to laod the positions page`, () => {
		// siteHeader, markets, marketsTotals.positionsSummary
		const siteHeader = {
			activePage: selectors.activePage,
			loginAccount: selectors.loginAccount,
			positionsSummary: selectors.marketsTotals.positionsSummary,
			transactionsTotals: selectors.transactionsTotals,
			isTransactionsWorking: selectors.isTransactionsWorking
		};
		assertions.siteHeader(siteHeader);
		assertions.markets(selectors.markets);
		assertions.marketsTotals.positionsSummaryAssertion(selectors.marketsTotals.positionsSummary);
	});
});
