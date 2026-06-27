"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
const openapi = require("@nestjs/swagger");
class CreateProductDto {
    name;
    description;
    price;
    count;
    images;
    status;
    subcategoryId;
    tagIds;
    static _OPENAPI_METADATA_FACTORY() {
        return { name: { required: true, type: () => String }, description: { required: false, type: () => String }, price: { required: false, type: () => Number }, count: { required: false, type: () => Number }, images: { required: false, type: () => [String] }, status: { required: false, enum: require("../enums/product-status.enum").ProductStatus }, subcategoryId: { required: true, type: () => Number }, tagIds: { required: false, type: () => [Number] } };
    }
}
exports.CreateProductDto = CreateProductDto;
//# sourceMappingURL=create-product.dto.js.map