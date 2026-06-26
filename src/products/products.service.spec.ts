import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: any;

  const mockProductsRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductsRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repository = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find products by category', async () => {
    const result = [{ id: 1, name: 'Product A' }];
    mockProductsRepository.find.mockResolvedValue(result);

    const products = await service.findByCategory(1);
    expect(products).toEqual(result);
    expect(mockProductsRepository.find).toHaveBeenCalledWith({
      where: {
        subcategory: {
          category: { id: 1 },
        },
      },
      relations: { subcategory: { category: true }, tags: true },
    });
  });

  it('should find products by subcategory', async () => {
    const result = [{ id: 2, name: 'Product B' }];
    mockProductsRepository.find.mockResolvedValue(result);

    const products = await service.findBySubcategory(2);
    expect(products).toEqual(result);
    expect(mockProductsRepository.find).toHaveBeenCalledWith({
      where: {
        subcategory: { id: 2 },
      },
      relations: { subcategory: true, tags: true },
    });
  });

  it('should find products by tag', async () => {
    const result = [{ id: 3, name: 'Product C' }];
    mockProductsRepository.find.mockResolvedValue(result);

    const products = await service.findByTag(3);
    expect(products).toEqual(result);
    expect(mockProductsRepository.find).toHaveBeenCalledWith({
      where: {
        tags: { id: 3 },
      },
      relations: { subcategory: true, tags: true },
    });
  });
});
