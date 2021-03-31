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
exports.addToStory = void 0;
const connection_1 = require("../config/connection");
const story_1 = require("../models/story");
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
