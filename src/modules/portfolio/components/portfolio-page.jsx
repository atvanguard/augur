import React, { PropTypes } from 'react';
import SiteHeader from '../../../modules/site/components/site-header';
import SiteFooter from '../../../modules/site/components/site-footer';
import MyPositions from '../../../modules/portfolio/components/my-positions';
import MyMarkets from '../../../modules/my-markets/components/markets';
import MyReports from '../../../modules/portfolio/components/my-reports';
import TabNavigation from '../../../modules/common/components/tab-navigation';
import { MY_POSITIONS, MY_MARKETS, MY_REPORTS } from '../../../modules/site/constants/pages';

const PortfolioPage = (p) => {
	let node;

	switch (p.siteHeader.activePage) {
	default:
	case MY_POSITIONS:
		node = <MyPositions positions={p.positions} />;
		break;
	case MY_MARKETS:
		node = <MyMarkets markets={p.markets} />;
		break;
	case MY_REPORTS:
		node = <MyReports reports={p.reports} />;
		break;
	}

	return (
		<main className="page portfolio">
			<SiteHeader {...p.siteHeader} />

			<header className="page-header portfolio-header">
				<div className="l-container">
					{!!p.navItems && !!p.navItems.length &&
						<TabNavigation
							activePage={p.siteHeader.activePage}
							navItems={p.navItems}
						/>
					}
				</div>
			</header>

			<div className="page-content">
				<section className="page-content portfolio-content">
					<div className="portfolio-item">
						{node}
					</div>
				</section>
			</div>

			<SiteFooter />
		</main>
	);
};

PortfolioPage.propTypes = {
	siteHeader: PropTypes.object.isRequired,
	navItems: PropTypes.array.isRequired,
	totals: PropTypes.object.isRequired,
	positions: PropTypes.object.isRequired,
	markets: PropTypes.array.isRequired,
	reports: PropTypes.array.isRequired
};

export default PortfolioPage;
