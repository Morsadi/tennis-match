import Head from 'next/head';
import { useState } from 'react';
import styles from '@styles/Admin.module.css';
import { Button } from './button';
import { usePlayers } from '@hooks/players';
// ____--------------------------_______-----________------------
// Use a confirmation popup for these buttons

export const User = ({
	deleteUserHandler,
	updateUserHandler,
	user: { _id, first_name, last_name, email, level, referrer, approved },
}) => {
	const actionData = {
		approved: true,
		// is_playing_this_week: false
	};

	return (
		<div className={styles.player}>
			<div className={styles.playerInfo}>
				<div className={styles.profileImgCont}></div>
				<h3>{first_name + ' ' + last_name}</h3>
				<p className={styles.dim}>{email}</p>
				<p className={styles.dim + ' ' + styles.level}>{level}</p>
				<p className={styles.dim}>Referrer: {referrer}</p>
			</div>
			<div className={styles.ctaCont}>
				{!approved ? (
					<>
						<Button
							userId={_id}
							actionFn={async () => await updateUserHandler(_id, actionData)}
							type='approve'
						/>
						<Button userId={_id} actionFn={async () => await deleteUserHandler(_id)} type='decline' />
					</>
				) : (
					<>
						<div>
							<Button userId={_id} actionFn={async () => await deleteUserHandler(_id)} type='delete' />
						</div>
					</>
				)}
			</div>
		</div>
	);
};
