import express from 'express';
import path from 'path';
import { createRestApiServer, connectToDBServer, db } from 'core/servers';
import { envConstants } from 'core/constants';
import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from 'common/middlewares';
import { listingsAndReviewsApi } from 'pods/listingAndReviews';

const restApiServer = createRestApiServer();

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use('/', express.static(staticFilesPath));

restApiServer.use(logRequestMiddleware);

restApiServer.use('/api/listingsAndReviews', listingsAndReviewsApi);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, async () => {
  if (!envConstants.isApiMock) {
    await connectToDBServer(envConstants.MONGODB_URI);
    //await db.collection('listings').insertOne({ description: 'Listing 1', bedrooms: 3, beds: 4 });
    //const listings = await db.collection('listings').find().toArray();
    console.log('Running API database');
    // console.log({ listings });
  } else {
    console.log('Running API mock');
  }
  console.log(`Server ready at port ${envConstants.PORT}`);
});