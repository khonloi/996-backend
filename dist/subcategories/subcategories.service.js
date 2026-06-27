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
exports.SubcategoriesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subcategory_entity_1 = require("./entities/subcategory.entity");
let SubcategoriesService = class SubcategoriesService {
    subcategoriesRepository;
    constructor(subcategoriesRepository) {
        this.subcategoriesRepository = subcategoriesRepository;
    }
    create(createSubcategoryDto) {
        if (Array.isArray(createSubcategoryDto)) {
            const subcategoriesData = createSubcategoryDto.map(dto => ({
                ...dto,
                category: { id: dto.categoryId }
            }));
            const subcategories = this.subcategoriesRepository.create(subcategoriesData);
            return this.subcategoriesRepository.save(subcategories);
        }
        const subcategory = this.subcategoriesRepository.create({
            ...createSubcategoryDto,
            category: { id: createSubcategoryDto.categoryId }
        });
        return this.subcategoriesRepository.save(subcategory);
    }
    findAll() {
        return this.subcategoriesRepository.find({ relations: { category: true } });
    }
    async findOne(id) {
        const subcategory = await this.subcategoriesRepository.findOne({
            where: { id },
            relations: { category: true }
        });
        if (!subcategory) {
            throw new common_1.NotFoundException(`Subcategory #${id} not found`);
        }
        return subcategory;
    }
    async update(id, updateSubcategoryDto) {
        const subcategory = await this.subcategoriesRepository.preload({
            id: id,
            ...updateSubcategoryDto,
            ...(updateSubcategoryDto.categoryId && { category: { id: updateSubcategoryDto.categoryId } })
        });
        if (!subcategory) {
            throw new common_1.NotFoundException(`Subcategory #${id} not found`);
        }
        return this.subcategoriesRepository.save(subcategory);
    }
    async remove(id) {
        const subcategory = await this.findOne(id);
        await this.subcategoriesRepository.remove(subcategory);
    }
};
exports.SubcategoriesService = SubcategoriesService;
exports.SubcategoriesService = SubcategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subcategory_entity_1.Subcategory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubcategoriesService);
//# sourceMappingURL=subcategories.service.js.map