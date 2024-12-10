"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
(0, dotenv_1.config)({
    path: '.env'
});
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.TYPEORM_URL,
    entities: [process.env.ENTITIES],
    migrations: [process.env.MIGRATIONS],
    migrationsTableName: "migrations",
});
//# sourceMappingURL=dbconfig.js.map