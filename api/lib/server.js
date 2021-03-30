"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express = require("express");
const process_1 = require("process");
const app = express();
exports.app = app;
const port = process_1.env.PORT || 5000;
/**Parse HTTP Json Request body */
app.use(express.json());
/**Server listening on port : */
app.listen(port, () => {
    console.log(`Code Brewing api server listening on port : ${port}, http://localhost:${port}`);
});
