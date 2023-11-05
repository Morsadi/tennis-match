import connectMongo from '@utils/connectDB';
import Lineup from '../../../models/lineup';

export default async function handler(req, res) {
	try {
		await connectMongo();

		const lineups = await Lineup.findOne({}, {}, { sort: { created: -1 } }, (err, data) => data);

		return res.status(200).json(lineups);
	} catch (error) {
		console.error('Error:', error);
		return res.status(500).json({ error });
	}
}