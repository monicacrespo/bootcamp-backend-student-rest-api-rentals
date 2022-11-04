import { envConstants } from 'core/constants';
import { connectToDBServer, disconnectFromDBServer } from 'core/servers';
import { getListingAndReviewsContext } from 'dals/listingAndReviews/listingAndReviews.context';

const runQueries = async () => {
  const result = await getListingAndReviewsContext()
    .find({
      bedrooms: { $gte: 1 },
    })
    .toArray();
};

export const run = async () => {
  await connectToDBServer(envConstants.MONGODB_URI);
  await runQueries();
  await disconnectFromDBServer();
};