import express = require('express');
import {env} from 'process';

const app: express.Application = express();

const port = env.PORT || 5000;

/**Parse HTTP Json Request body */
app.use(express.json());

/**Server listening on port : */
app.listen(port, () => {
    console.log(`Code Brewing api server listening on port : ${port}, http://localhost:${port}`);
})

export{
    app
};