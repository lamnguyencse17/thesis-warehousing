import React from "react";
import TransactionRow from "./Transaction/TransactionRow";

export default function Transactions() {
	return (
		<div className='flex-row p-5'>
			<div className='flex justify-center'>
				<h1>ASSET MANAGEMENT</h1>
			</div>
			<div
				className='grid w-full h-10 grid-cols-5 px-5 mt-10 text-center'
				id='Accounts-Header'
			>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>ID</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>Sender</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>
						Receiver
					</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>Date</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='flex items-center justify-center h-full'>ACTIONS</div>
				</div>
			</div>
			<TransactionRow />
		</div>
	);
}
