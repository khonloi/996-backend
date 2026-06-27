"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubcategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateSubcategoryDto {
    name;
    description;
    image;
    categoryId;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, image: { required: false, type: () => String }, categoryId: { required: true, type: () => Number } };
    }
}
exports.CreateSubcategoryDto = CreateSubcategoryDto;
//# sourceMappingURL=create-subcategory.dto.js.map