import React from "react";

export default function AccountRow() {
	return (
		<div className='grid w-full h-10 grid-cols-7 px-5'>
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
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-green-600'>Edit</button>
				</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-orange-600'>Rights</button>
				</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-red-600'>Delete</button>
				</div>
			</div>
		</div>
	);
}
