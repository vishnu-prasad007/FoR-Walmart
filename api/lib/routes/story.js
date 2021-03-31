"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storyRouter = void 0;
const express = require("express");
const story_1 = require("../controllers/story");
const tokens_1 = require("../services/tokens");
const storyRouter = express.Router();
exports.storyRouter = storyRouter;
storyRouter.get('/', tokens_1.verifyAccessToken, story_1.getStory);
