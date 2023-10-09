import Head from 'next/head';
import { useState } from 'react';
import styles from '@styles/Admin.module.css';
import { Button } from './button';
import { usePlayers } from '@hooks/players';
// ____--------------------------_______-----________------------
// Use a confirmation popup for these buttons

export const User = ({ deleteUserHandler, updateUserHandler, user: { _id, firstName, lastName, email, level, referrer, approved } }) => {

	const actionData = {
		approved: true,
	};

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
						<Button userId={_id} actionFn={async()=>await updateUserHandler(_id, actionData)} type='approve' />
						<Button userId={_id} actionFn={async()=>await deleteUserHandler(_id)} type='decline' />
					</>
				) : (
					<>
						<div>
							<Button userId={_id} actionFn={async()=>await deleteUserHandler(_id)} type='delete' />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
