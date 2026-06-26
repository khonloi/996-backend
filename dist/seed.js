"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./categories/entities/category.entity");
const subcategory_entity_1 = require("./subcategories/entities/subcategory.entity");
async function bootstrap() {
    console.log('Starting database seeding...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        const dataSource = app.get(typeorm_1.DataSource);
        const categoryRepo = dataSource.getRepository(category_entity_1.Category);
        const subcategoryRepo = dataSource.getRepository(subcategory_entity_1.Subcategory);
        let category = await categoryRepo.findOne({ where: { name: 'Grocery' } });
        if (!category) {
            category = categoryRepo.create({
                name: 'Grocery',
                description: 'Fresh groceries, beverages, pantry items, and more',
            });
            category = await categoryRepo.save(category);
            console.log(`[Success] Created category: "${category.name}"`);
        }
        else {
            console.log(`[Info] Category "${category.name}" already exists.`);
        }
        const subcategoriesToSeed = [
            'Fresh Produce',
            'Dairy & Eggs',
            'Meat & Seafood',
            'Pantry',
            'Canned',
            'Beverages',
            'Snack',
        ];
        for (const subcategoryName of subcategoriesToSeed) {
            let subcategory = await subcategoryRepo.findOne({
                where: {
                    name: subcategoryName,
                    category: { id: category.id },
                },
            });
            if (!subcategory) {
                subcategory = subcategoryRepo.create({
                    name: subcategoryName,
                    category: category,
                });
                await subcategoryRepo.save(subcategory);
                console.log(`[Success] Created subcategory: "${subcategoryName}" under Grocery`);
            }
            else {
                console.log(`[Info] Subcategory "${subcategoryName}" already exists under Grocery.`);
            }
        }
        console.log('Seeding completed successfully!');
    }
    catch (error) {
        console.error('[Error] Seeding failed:', error);
    }
    finally {
        await app.close();
        console.log('Nest application context closed.');
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map