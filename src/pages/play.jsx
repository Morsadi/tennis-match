import Head from 'next/head';
import Membership from '@components/membership';
import { useState } from 'react';

export default function Play() {
	
	return (
		<>
			<Head>
				<title></title>
				<meta name='description' content='' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Membership />
		</>
	);
}
