import app from './app';
import { PORT } from './config';
import { logger } from './utils';

const port = PORT || 3000;
app.set('port', port);
app.listen(app.get('port'), () => {
    return logger.info(`server is listening on ${port}`);
});
