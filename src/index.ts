import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import { testCreate, testDelete, testGetUserFeed } from './tests/testdb';
import { testGetGlobalFeed } from './tests/testdb';

// Start the server
const port = Number(process.env.PORT || 3000);

//testCreate();
//testGetGlobalFeed();
//testDelete();
testGetUserFeed();

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
