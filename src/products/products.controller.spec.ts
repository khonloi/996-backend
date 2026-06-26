import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: any;

  const mockProductsService = {
    findByCategory: jest.fn(),
    findBySubcategory: jest.fn(),
    findByTag: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get products by category', async () => {
    const result = [{ id: 1, name: 'Product A' }];
    mockProductsService.findByCategory.mockResolvedValue(result);

    const products = await controller.findByCategory('1');
    expect(products).toEqual(result);
    expect(mockProductsService.findByCategory).toHaveBeenCalledWith(1);
  });

  it('should get products by subcategory', async () => {
    const result = [{ id: 2, name: 'Product B' }];
    mockProductsService.findBySubcategory.mockResolvedValue(result);

    const products = await controller.findBySubcategory('2');
    expect(products).toEqual(result);
    expect(mockProductsService.findBySubcategory).toHaveBeenCalledWith(2);
  });

  it('should get products by tag', async () => {
    const result = [{ id: 3, name: 'Product C' }];
    mockProductsService.findByTag.mockResolvedValue(result);

    const products = await controller.findByTag('3');
    expect(products).toEqual(result);
    expect(mockProductsService.findByTag).toHaveBeenCalledWith(3);
  });
});
