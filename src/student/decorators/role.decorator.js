"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.ROLES_KEY = void 0;
const common_1 = require("@nestjs/common");
const student_entity_1 = require("../entities/student.entity");
exports.ROLES_KEY = 'roles';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, [...roles, student_entity_1.Role.Admin]);
exports.Roles = Roles;
//# sourceMappingURL=role.decorator.js.map