import express = require('express');
import { getStory } from '../controllers/story';
import { verifyAccessToken } from '../services/tokens';

const storyRouter = express.Router();

storyRouter.get('/',verifyAccessToken,getStory);


export {
    storyRouter
}

