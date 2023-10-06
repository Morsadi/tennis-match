import { useState } from 'react';

export default function useAddUser() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState(null);
	const [error, setError] = useState(null);

	const addUser = async (userData) => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/user/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.message);
			}

			const data = await response.json();
			setMessage(data.message);
			setError(null);
		} catch (error) {
			setError(error.message);
			setMessage(null);
		} finally {
			setIsLoading(false);
		}
	};

	return [addUser, isLoading, message, error];
}
