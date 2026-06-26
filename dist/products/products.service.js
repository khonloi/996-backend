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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./entities/product.entity");
let ProductsService = class ProductsService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    create(createProductDto) {
        const { subcategoryId, tagIds, ...rest } = createProductDto;
        const product = this.productsRepository.create({
            ...rest,
            subcategory: { id: subcategoryId },
            tags: tagIds ? tagIds.map(id => ({ id })) : [],
        });
        return this.productsRepository.save(product);
    }
    findAll() {
        return this.productsRepository.find({ relations: { subcategory: true, tags: true } });
    }
    async findOne(id) {
        const product = await this.productsRepository.findOne({
            where: { id },
            relations: { subcategory: true, tags: true }
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product #${id} not found`);
        }
        return product;
    }
    async update(id, updateProductDto) {
        const { subcategoryId, tagIds, ...rest } = updateProductDto;
        const product = await this.productsRepository.preload({
            id: id,
            ...rest,
            ...(subcategoryId && { subcategory: { id: subcategoryId } }),
        });
        if (!product) {
            throw new common_1.NotFoundException(`Product #${id} not found`);
        }
        if (tagIds !== undefined) {
            product.tags = tagIds.map(tagId => ({ id: tagId }));
        }
        return this.productsRepository.save(product);
    }
    findByCategory(categoryId) {
        return this.productsRepository.find({
            where: {
                subcategory: {
                    category: { id: categoryId }
                }
            },
            relations: { subcategory: { category: true }, tags: true }
        });
    }
    findBySubcategory(subcategoryId) {
        return this.productsRepository.find({
            where: {
                subcategory: { id: subcategoryId }
            },
            relations: { subcategory: true, tags: true }
        });
    }
    findByTag(tagId) {
        return this.productsRepository.find({
            where: {
                tags: { id: tagId }
            },
            relations: { subcategory: true, tags: true }
        });
    }
    async remove(id) {
        const product = await this.findOne(id);
        await this.productsRepository.remove(product);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductsService);
//# sourceMappingURL=products.service.js.map