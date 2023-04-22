// import useMongoDB from '@hooks/useMongoDB';

// export default async function handler(req, res) {
//   const db = useMongoDB();

//   if (!db) {
//     res.status(500).json({ error: 'Failed to connect to database' });
//     return;
//   }

//   // const posts = await db.collection('posts').find().toArray();
//   const posts = [];

//   res.status(200).json(posts);
// }
