import { useState, useEffect } from 'react';

export function usePlayers() {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

	const getUsers = () => {
		setIsLoading(true);
		const apiUrl = '/api/user/get';

		fetch(apiUrl, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((response) => response.json())
			.then((responseData) => {
				setData(responseData);
				setIsLoading(false);
			})
			.catch((error) => {
				setError(error);
				setIsLoading(false);
			});
	};

	const addUser = (actionData) => {
		setIsLoading(true);
		const apiUrl = '/api/user/add';

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

	const updateUser = (_id, actionData) => {
		setIsLoading(true);
		const apiUrl = `/api/user/update`;

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _id, actionData }),
		})
			.then((response) => response.json())
			.then((responseData) => {
				// setData(responseData);
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

	const deleteUser = (_id) => {
		setIsLoading(true);
		const apiUrl = `/api/user/delete`;

		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ _id }),
		})
			.then((response) => response.json())
			.then((responseData) => {
				// setData(responseData);
				setIsLoading(false);
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
		getUsers,
		updateUser,
		deleteUser,
		addUser,
		data,
		isLoading,
		error,
		message,
	};
}
