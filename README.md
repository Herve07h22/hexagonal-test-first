# Hexagonal architecture sample

This repository shows how to organize an easy to test codebase.

The starting point is this simple but expressive test :

```
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
```

How to design the code that will make the test passed ?

It turns out that the more expressive the test is, and the cleanest is the implementation.

Theses 15 lines test adress several features, like user-session, authentication, payment.
There are common features for an e-commerce plateform, but we rarely start their design from a testing point of view.

By thinking first about the use-cases (like "login", "add to cart"), we look first at the behaviour instead of looking at the data. 
The data model is built to be just enough to fit what the use-cases need. Nothing more.
