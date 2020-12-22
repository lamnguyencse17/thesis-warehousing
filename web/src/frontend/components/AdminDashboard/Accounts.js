import React from "react";
import AccountRow from "./Account/AccountRow";

export default function Accounts() {
	return (
		<div className='flex-row p-5'>
			<div className='flex justify-center'>
				<h1>ACCOUNT MANAGEMENT</h1>
			</div>
			<div
				className='grid w-full h-10 grid-cols-7 px-5 mt-10 text-center'
				id='Accounts-Header'
			>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>ID</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>Name</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>Email</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>Date</div>
				</div>
				<div className='col-span-3 border border-white'>
					<div className='flex items-center justify-center h-full'>ACTIONS</div>
				</div>
			</div>
			<AccountRow />
		</div>
	);
}
