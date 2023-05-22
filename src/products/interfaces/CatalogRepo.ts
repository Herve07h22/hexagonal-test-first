import { Product } from '../models/Product';

export interface CatalogRepo {
    get: (sku: string) => Promise<Product | null>;
}
