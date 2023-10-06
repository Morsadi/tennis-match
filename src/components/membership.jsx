import React, { useState } from 'react';
import Head from 'next/head';
import UseAddUser from '@hooks/addUser';
import styles from '@styles/Membership.module.css';

export default function Membership() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [level, setLevel] = useState('');
	const [referrer, setReferrer] = useState('');

	const [addUser, isLoading, message, error] = UseAddUser(null);

	const saveUser = async (event) => {
		event.preventDefault();

		const newUser = {
			firstName,
			lastName,
			email,
			level,
			referrer,
		};
		addUser(newUser);
	};
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.register}>
				<form onSubmit={saveUser}>
					<label>
						<input
							type='text'
							placeholder='First Name'
							onChange={(event) => setFirstName(event.target.value)}
							required
						/>
					</label>
					<label>
						<input
							type='text'
							placeholder='Last Name'
							onChange={(event) => setLastName(event.target.value)}
							required
						/>
					</label>
					<label>
						<input
							type='email'
							placeholder='Email'
							onChange={(event) => setEmail(event.target.value)}
							required
						/>
					</label>
					<label>
						<input
							type='number'
							placeholder='level'
							onChange={(event) => setLevel(event.target.value)}
							required
						/>
					</label>
					<label>
						<input type='text' placeholder='Referrer' onChange={(event) => setReferrer(event.target.value)} />
					</label>
					<input type='submit' disabled={isLoading} />
				</form>
				{error && <p>{error.message}</p>}
				{message && <p>{message}</p>}
			</main>
		</>
	);
}
