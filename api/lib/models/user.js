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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const authentication_1 = require("./authentication");
const follower_1 = require("./follower");
const order_1 = require("./products/order");
let User = class User {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "varchar" }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    typeorm_1.OneToOne(() => authentication_1.UserAuthentication, userAuthentication => userAuthentication.user),
    __metadata("design:type", authentication_1.UserAuthentication)
], User.prototype, "userAuthentication", void 0);
__decorate([
    typeorm_1.OneToMany(() => order_1.Orders, order => order.orderedBy),
    __metadata("design:type", Array)
], User.prototype, "orders", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "termsandConditionStatus", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isProfilePublic", void 0);
__decorate([
    typeorm_1.OneToMany(type => follower_1.Follower, follower => follower.followedBy),
    __metadata("design:type", follower_1.Follower)
], User.prototype, "followedBy", void 0);
__decorate([
    typeorm_1.OneToMany(type => follower_1.Follower, follower => follower.following),
    __metadata("design:type", Array)
], User.prototype, "followers", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
