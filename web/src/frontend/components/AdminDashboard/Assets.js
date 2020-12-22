import React from "react";
import AssetRow from "./Assets/AssetRow";

export default function Assets() {
	return (
		<div className='flex-row p-5'>
			<div className='flex justify-center'>
				<h1>ASSET MANAGEMENT</h1>
			</div>
			<div
				className='grid w-full h-10 grid-cols-6 px-5 mt-10 text-center'
				id='Accounts-Header'
			>
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
				<div className='col-span-2 border border-white'>
					<div className='flex items-center justify-center h-full'>ACTIONS</div>
				</div>
			</div>
			<AssetRow />
		</div>
	);
}
