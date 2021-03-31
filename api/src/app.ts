import {app} from './server';
import {dbConnection} from './config/dbConnection';
import "reflect-metadata";

/**Establish connection with database */
dbConnection();

import { authRouter } from './routes/auth';
import { userRouter } from './routes/users';
import { productRouter } from './routes/product';
import { orderRouter } from './routes/order';
import { shareRouter } from './routes/share';
import { storyRouter } from './routes/story';

/**Router */

app.use('/auth',authRouter);
app.use('/users',userRouter);
app.use('/category',productRouter);
app.use('/orders',orderRouter);
app.use('/share',shareRouter);
app.use('/story',storyRouter);