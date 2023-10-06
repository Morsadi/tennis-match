import { useState, useEffect } from 'react';

export const fetchUsers = (url, updating) => {
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const res = await fetch(url);
				const data = await res.json();

				setData(data);
				setIsLoading(false);
			} catch (err) {
				setError(err);
				setIsLoading(false);
			}
		};

		fetchData();
	}, [url, updating]);

	return [data, isLoading, error];
};

export async function useMethod(value) {
	try {
		const response = await fetch('/api/user/method', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(value),
		});
	} catch (err) {
		console.log(err);
	}
}
