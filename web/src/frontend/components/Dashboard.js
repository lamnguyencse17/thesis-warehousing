import React from "react";
import DashboardRouter from "./AdminDashboard/DashboardRouter";
import Navbar from "./AdminDashboard/Navbar";

export default function Dashboard(props) {
	return (
		<div className='grid grid-cols-12'>
			<div className='col-span-1'>
				<Navbar />
			</div>
			<div className='col-span-11'>
				<DashboardRouter {...props} />
			</div>
		</div>
	);
}
