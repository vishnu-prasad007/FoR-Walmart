"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Story = void 0;
const typeorm_1 = require("typeorm");
const items_1 = require("./products/items");
const user_1 = require("./user");
let Story = class Story {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Story.prototype, "id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, user => user.storys),
    __metadata("design:type", user_1.User)
], Story.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToOne(() => items_1.Item, item => item),
    __metadata("design:type", items_1.Item)
], Story.prototype, "item", void 0);
Story = __decorate([
    typeorm_1.Entity()
], Story);
exports.Story = Story;
