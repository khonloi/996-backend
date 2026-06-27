"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateCategoryDto {
    name;
    description;
    image;
    subcategories;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, image: { required: false, type: () => String }, subcategories: { required: false, type: () => [({ name: { required: true, type: () => String }, description: { required: false, type: () => String }, image: { required: false, type: () => String } })] } };
    }
}
exports.CreateCategoryDto = CreateCategoryDto;
//# sourceMappingURL=create-category.dto.js.map