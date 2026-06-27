"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTagDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateTagDto {
    name;
    description;
    image;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, image: { required: false, type: () => String } };
    }
}
exports.CreateTagDto = CreateTagDto;
//# sourceMappingURL=create-tag.dto.js.map