import express = require('express');
import { agreeToTerms, shareTerms } from '../controllers/share';
import { verifyAccessToken } from '../services/tokens';

const shareRouter = express.Router();


shareRouter.post("/terms",verifyAccessToken,shareTerms);
shareRouter.post("/agree",verifyAccessToken,agreeToTerms);


export {
    shareRouter
}