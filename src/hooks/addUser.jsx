import { useState } from 'react';

export default function useAddUser() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [message, setMessage] = useState(null);

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
				setMessage(null)
				throw new Error(data.message);
			}

			const data = await response.json();
			setError(null)
			setMessage(data.message);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(error);
		}
	};

	return [addUser, isLoading, message, error];
}
