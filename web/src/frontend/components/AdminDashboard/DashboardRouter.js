import React from "react";
import Accounts from "./Accounts";
import Assets from "./Assets";
import MainMenu from "./MainMenu";
import { Route, useRouteMatch } from "react-router-dom";
import Transactions from "./Transactions";

export default function DashboardRouter(props) {
	const { path } = useRouteMatch();
	return (
		<>
			<Route path={path} exact render={() => <MainMenu {...props} />} />
			<Route path={`${path}/accounts`} render={() => <Accounts {...props} />} />
			<Route path={`${path}/assets`} render={() => <Assets {...props} />} />
			<Route
				path={`${path}/transactions`}
				render={() => <Transactions {...props} />}
			/>
		</>
	);
}
