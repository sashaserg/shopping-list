import express from 'express';
import router from './router/index';
import cors from 'cors';
import errorHandler from './utils/errorHandler';
require('./db/mongoose');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
