import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectShopCollection = (collectionUrlParam) =>
  createSelector(
    [selectShopCollections],
    (collections) => collections[collectionUrlParam]
  );

export const selectShopCollectionsPreview = createSelector(
  [selectShopCollections],
  (collections) => Object.entries(collections).map(([key, value]) => value)
);
