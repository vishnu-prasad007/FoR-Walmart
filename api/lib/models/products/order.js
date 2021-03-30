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
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../user");
const category_1 = require("./category");
const items_1 = require("./items");
let Orders = class Orders {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Orders.prototype, "id", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Orders.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_1.User, user => user.orders),
    __metadata("design:type", user_1.User)
], Orders.prototype, "orderedBy", void 0);
__decorate([
    typeorm_1.ManyToOne(() => category_1.Category, category => category.orders),
    __metadata("design:type", category_1.Category)
], Orders.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToOne(() => items_1.Item, item => item.orders),
    __metadata("design:type", items_1.Item)
], Orders.prototype, "item", void 0);
__decorate([
    typeorm_1.Column({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], Orders.prototype, "isPublic", void 0);
Orders = __decorate([
    typeorm_1.Entity()
], Orders);
exports.Orders = Orders;
