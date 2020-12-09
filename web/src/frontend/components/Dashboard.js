import React from "react";
import { useRouteMatch, Link } from "react-router-dom";
import DashboardRouter from "./AdminDashboard/DashboardRouter";

export default function Dashboard(props) {
	const { path } = useRouteMatch();
	return (
		<>
			<DashboardRouter {...props} />
			<div className='space-x-3'>
				<Link to={`${path}/accounts`}>
					<button>Accounts</button>
				</Link>
				<Link to={`${path}/assets`}>
					<button>Assets</button>
				</Link>
			</div>
		</>
	);
}
