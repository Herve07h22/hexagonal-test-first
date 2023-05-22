import { Product } from '../models/Product';
import { CatalogRepo } from '../interfaces/CatalogRepo';

export class MemoryCatalogRepo implements CatalogRepo {
    _products: Map<string, Product> = new Map([
        ["teeshirt-123456", { sku: "teeshirt-123456", price: 12.20 }],
        ["shoes-123456", { sku: "shoes-123456", price: 35 }],
    ]);
    async get(sku: string) { return this._products.get(sku) || null; }
}
