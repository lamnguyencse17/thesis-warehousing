import React from "react";

export default function AssetRow() {
	return (
		<div className='grid w-full h-10 grid-cols-6 px-5'>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>ID</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Name</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Date</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>Owner</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-green-600'>Details</button>
				</div>
			</div>
			<div className='col-span-1 border border-white'>
				<div className='flex items-center justify-center h-full'>
					<button className='w-full h-full bg-orange-600'>Edit</button>
				</div>
			</div>
		</div>
	);
}
