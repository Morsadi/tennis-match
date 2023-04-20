import { useState, useEffect } from 'react';
import connectMongo from '@utils/connectDB';
import User from '@models/user';

async function getMembers() {
	const [members, setMembers] = useState([]);
	const [error, setError] = useState(null);

	try {
		await connectMongo();

		const allMembers = await User.find();
		setMembers(allMembers);

		return [members, error];
	} catch (err) {
		setError(err);
	}
	return [db, error];
}

export { getMembers };
