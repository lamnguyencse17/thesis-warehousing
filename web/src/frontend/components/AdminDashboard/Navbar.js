import React from "react";
import { useRouteMatch, Link } from "react-router-dom";

export default function Navbar() {
	const { path } = useRouteMatch();
	return (
		<div className='h-full w-full flex-col flex-1 py-20 space-y-10'>
			<div className='flex justify-center'>
				<Link to={`${path}/accounts`}>
					<button>Accounts</button>
				</Link>
			</div>
			<div className='flex justify-center'>
				<Link to={`${path}/assets`}>
					<button>Assets</button>
				</Link>
			</div>
			<div className='flex justify-center'>
				<Link to={`${path}/transactions`}>
					<button>Transactions</button>
				</Link>
			</div>
		</div>
	);
}
