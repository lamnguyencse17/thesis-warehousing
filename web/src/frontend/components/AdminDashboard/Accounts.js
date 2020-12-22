import React from "react";

export default function Accounts() {
	return (
		<div className='p-5 flex-row'>
			<div className='flex justify-center'>
				<h1>ACCOUNT MANAGEMENT</h1>
			</div>
			<div
				className='w-full h-10 grid grid-cols-6 mt-10 px-5 text-center'
				id='Accounts-Header'
			>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>ID</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>Name</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>Email</div>
				</div>
				<div className='col-span-3 border border-white'>
					<div className='h-full flex justify-center items-center'>ACTIONS</div>
				</div>
			</div>
			<div className='w-full h-10 grid grid-cols-6 px-5'>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>ID</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>Name</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>Email</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>
						<button className='w-full h-full bg-green-600'>Edit</button>
					</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>
						<button className='w-full h-full bg-orange-600'>Rights</button>
					</div>
				</div>
				<div className='col-span-1 border border-white'>
					<div className='h-full flex justify-center items-center'>
						<button className='w-full h-full bg-red-600'>Delete</button>
					</div>
				</div>
			</div>
		</div>
	);
}
