import {it, expect} from 'vitest'
import { FakeUserRepo } from '../../users/tests/FakeUserRepo';
import { MemoryCatalogRepo } from '../../products/tests/MemoryCatalogRepo';
import { MemoryOrdersRepo } from './MemoryOrdersRepo';
import { FakePaymentMethod } from '../../payment/tests/FakePaymentMethod';

import { login } from '../../users/usescases/login';
import { checkout } from '../usecases/checkout';
import { addToCart } from '../../cart/usecases/addToCart';

import { App } from '../../App';

it("An order with a correct amount is created after checkout", async () => {
    const app = new App({
        users: new FakeUserRepo(),
        catalog: new MemoryCatalogRepo(),
        orders: new MemoryOrdersRepo()
    })

    await app.run([
        login({email:"john.doe@camilab.co", password:"pwd"}),
        addToCart({sku:"teeshirt-123456", qty:2}),
        addToCart({sku:"shoes-123456", qty:1}),
        checkout({payment:new FakePaymentMethod()})
    ])

    const orders = await app.dependencies.orders.list()
    expect(orders).toHaveLength(1)
    expect(orders[0].amount).toBe(59.4)
    expect(orders[0].billingEmail).toBe("john.doe@camilab.co")
})