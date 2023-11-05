import { useState, useEffect } from 'react';

export function useLineups() {
	const [isLoading, setIsLoading] = useState(false);
	const [lineups, setLineups] = useState([]);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const getLineups = () => {
		setIsLoading(true);
		const apiUrl = '/api/lineup/get';

		const options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		};

		fetch(apiUrl)
			.then((response) => response.json())
			.then((responseData) => {
				setLineups(responseData);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	};

	const addLineup = (actionData) => {
		setIsLoading(true);
		const apiUrl = '/api/lineup/add';

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ actionData }),
		})
			.then((response) => response.json())
			.then((responseData) => {
				setMessage(responseData);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setMessage(error);
				setIsLoading(false);
			});
	};
	const updateLineup = (_ids, actionData) => {
		setIsLoading(true);
		const apiUrl = `/api/user/update`;

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _ids, actionData }),
		})
			.then((response) => response.json())
			.then((responseData) => {
				// setLineups(responseData);
				setIsLoading(false);
				setMessage('Saved...');
			})
			.then(() => {
				getUsers();
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	};

	return {
		getLineups,
		addLineup,
		updateLineup,
		lineups,
		isLoading,
		error,
		message,
	};
}
