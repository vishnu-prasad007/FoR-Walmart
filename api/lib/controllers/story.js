"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStory = exports.addToStory = void 0;
const http_status_codes_1 = require("http-status-codes");
const connection_1 = require("../config/connection");
const story_1 = require("../models/story");
const followers_1 = require("../services/followers");
const addToStory = (user, item) => __awaiter(void 0, void 0, void 0, function* () {
    let storyRepository = connection_1.connection.getRepository(story_1.Story);
    let newStory = storyRepository.create({
        user: user,
        item: item
    });
    yield connection_1.queryRunner.connect();
    newStory = yield connection_1.queryRunner.manager.save(newStory);
});
exports.addToStory = addToStory;
const getStory = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let userId = response.locals.userId;
    let user = yield followers_1.getFollowingUsers(userId);
    let storyRepository = connection_1.connection.getRepository(story_1.Story);
    let stories = yield storyRepository.find({ where: { user: user }, relations: ['item', 'user'] });
    if (stories.length == 0)
        return response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ message: "No stories found" });
    else {
        return response.status(http_status_codes_1.StatusCodes.OK).json({ data: stories });
    }
});
exports.getStory = getStory;
