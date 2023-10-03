import Head from 'next/head';
import { useState } from 'react';
import styles from '@styles/Admin.module.css';
import { Button } from './button';
import { updateUser, useMethod } from '@hooks/useUsers';
// ____--------------------------_______-----________------------
// Use a confirmation popup for these buttons

export const User = ({ setUpdating, updating, user: { _id, firstName, lastName, email, level, referrer, approved } }) => {
	async function updateUserHandler() {
		const updates = {
			approved: true,
		};

		await useMethod({ action: 'update', _id, updates });
		setUpdating(!updating);
	}

	async function deleteUserHandler() {
		await useMethod({ action: 'delete', _id });
		setUpdating(!updating);
	}

	return (
		<div className={styles.player}>
			<div className={styles.playerInfo}>
				<h3>{firstName + ' ' + lastName}</h3>
				<p className={styles.dim}>{email}</p>
				<p className={styles.dim}>Level: {level}</p>
				<p className={styles.dim}>Referrer: {referrer}</p>
			</div>
			<div className={styles.ctaCont}>
				{!approved ? (
					<>
						<Button userId={_id} actionFn={updateUserHandler} type='approve' />
						<Button userId={_id} actionFn={updateUserHandler} type='decline' />
					</>
				) : (
					<>
						<div>
							<Button userId={_id} actionFn={deleteUserHandler} type='delete' />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
