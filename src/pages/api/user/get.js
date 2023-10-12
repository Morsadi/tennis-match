import connectMongo from '@utils/connectDB';
import User from '../../../models/user';

export default async function handler(req, res) {
	try {
		await connectMongo();

		const { query, projection, sort } = req.query;
		const queryOptions = {
			query: JSON.parse(query),
			projection: JSON.parse(projection),
			sort: JSON.parse(sort),
		};

		const users = await User.find(queryOptions.query).select(queryOptions.projection).sort(queryOptions.sort);

		return res.status(200).json(users);
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ error: 'Internal server error' });
	}
}
