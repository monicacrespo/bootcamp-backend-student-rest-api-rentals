import express from 'express';
import path from 'path';
import { createRestApiServer, connectToDBServer, db } from 'core/servers';
import { envConstants } from 'core/constants';
import {
  logRequestMiddleware,
  logErrorRequestMiddleware,
} from 'common/middlewares';
import { listingsAndReviewsApi } from 'pods/listingAndReviews';
import { authenticationMiddleware, securityApi } from 'pods/security';

const restApiServer = createRestApiServer();

const staticFilesPath = path.resolve(__dirname, envConstants.STATIC_FILES_PATH);
restApiServer.use('/', express.static(staticFilesPath));

restApiServer.use(logRequestMiddleware);

restApiServer.use('/api/security', securityApi);
restApiServer.use('/api/listingsAndReviews', authenticationMiddleware, listingsAndReviewsApi);

restApiServer.use(logErrorRequestMiddleware);

restApiServer.listen(envConstants.PORT, async () => {
  if (!envConstants.isApiMock) {
    await connectToDBServer(envConstants.MONGODB_URI);
    await db.collection('users').findOneAndUpdate(
      {
      _id: '123456',
      },
      {
        $set: { 
          email: 'admin@email.com', 
          // password: 'test', 
          password: 'f9aafef201002163b4d661e82593691bdce2e487637e6499660a5367c1bc31ecbad06dfc568a60b757c7491424fa169307ed14cfdf7454f68178225f141b7621',
          salt: '', role: 'admin' 
        }
      },     
      { upsert: true }
    );
    await db.collection('users').findOneAndUpdate(
      {
      _id: '654321',
      },
      {
        $set: { 
          email: 'user@email.com', 
          // password: 'test', 
          password: 'f9aafef201002163b4d661e82593691bdce2e487637e6499660a5367c1bc31ecbad06dfc568a60b757c7491424fa169307ed14cfdf7454f68178225f141b7621',
          salt: '', 
          role: 'standard-user' }
      },     
      { upsert: true }
    );
    const users = await db.collection('users').find().toArray();
    console.log('Running API database');
    console.log({ users });
  } else {
    console.log('Running API mock');
  }
  console.log(`Server ready at port ${envConstants.PORT}`);
});