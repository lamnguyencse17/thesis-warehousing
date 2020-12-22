import React from "react";
import DashboardRouter from "./AdminDashboard/DashboardRouter";
import Navbar from "./AdminDashboard/Navbar";

export default function Dashboard(props) {
	return (
		<div className='grid grid-cols-12 h-full bg-blue-800'>
			<div className='col-span-1'>
				<Navbar />
			</div>
			<div className='col-span-11 text-white'>
				<DashboardRouter {...props} />
			</div>
		</div>
	);
}
