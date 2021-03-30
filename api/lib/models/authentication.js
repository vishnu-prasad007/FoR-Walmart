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
exports.UserAuthentication = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let UserAuthentication = class UserAuthentication {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], UserAuthentication.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], UserAuthentication.prototype, "emailPhoneNo", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar' }),
    __metadata("design:type", String)
], UserAuthentication.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToOne(() => user_1.User, user => user.userAuthentication),
    typeorm_1.JoinColumn(),
    __metadata("design:type", user_1.User)
], UserAuthentication.prototype, "user", void 0);
UserAuthentication = __decorate([
    typeorm_1.Entity()
], UserAuthentication);
exports.UserAuthentication = UserAuthentication;
