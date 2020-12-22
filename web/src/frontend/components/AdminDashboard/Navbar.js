import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function Navbar() {
	const { path } = useRouteMatch();
	return (
		<div className='h-full w-full flex-col flex-1 pb-20 pt-5 space-y-10 bg-indigo-300'>
			<div className='flex justify-center items-center h-10'>
				<Link to={`${path}`}>
					<button>DASHBOARD</button>
				</Link>
			</div>
			<div className='flex justify-center items-center h-10'>
				<Link to={`${path}/accounts`}>
					<button>Accounts</button>
				</Link>
			</div>
			<div className='flex justify-center items-center h-10'>
				<Link to={`${path}/assets`}>
					<button>Assets</button>
				</Link>
			</div>
			<div className='flex justify-center items-center h-10'>
				<Link to={`${path}/transactions`}>
					<button>Transactions</button>
				</Link>
			</div>
		</div>
	);
}
