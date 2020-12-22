import React from "react";

export default function TransactionRow() {
	return (
		<div className='grid w-full h-10 grid-cols-5 px-5'>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>ID</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Sender</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Receiver</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Date</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-green-600'>Details</button>
				</div>
			</div>
		</div>
	);
}
