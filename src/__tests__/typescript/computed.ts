import { Computed, computed, ResolvedState1, ResolvedState2 } from 'easy-peasy';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductsModel {
  products: Product[];
  totalPrice: Computed<ProductsModel, number>;
  totalPriceVerbose: Computed<ProductsModel, number, ResolvedState1<Product[]>>;
}

interface BasketModel {
  productIds: number[];
  products: Computed<
    BasketModel,
    Product[],
    ResolvedState2<number[], Product[]>,
    StoreModel
  >;
}

interface StoreModel {
  products: ProductsModel;
  baskets: BasketModel;
}

const mode: StoreModel = {
  products: {
    products: [{ id: 1, name: 'boots', price: 20 }],
    totalPrice: computed(state =>
      state.products.reduce((total, product) => total + product.price, 0),
    ),
    totalPriceVerbose: computed(
      products => products.reduce((total, product) => total + product.price, 0),
      [state => state.products],
    ),
  },
  baskets: {
    productIds: [1],
    products: computed(
      (productIds, products) =>
        productIds.reduce<Product[]>((acc, id) => {
          const product = products.find(p => p.id === id);
          if (product) {
            acc.push(product);
          }
          return acc;
        }, []),
      [
        state => state.productIds,
        (state, storeState) => storeState.products.products,
      ],
    ),
  },
};
