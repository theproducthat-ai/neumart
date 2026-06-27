/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as addresses from "../addresses.js";
import type * as categories from "../categories.js";
import type * as coupons from "../coupons.js";
import type * as delivery from "../delivery.js";
import type * as favourites from "../favourites.js";
import type * as helpers from "../helpers.js";
import type * as inventory from "../inventory.js";
import type * as orderItems from "../orderItems.js";
import type * as orders from "../orders.js";
import type * as payments from "../payments.js";
import type * as products from "../products.js";
import type * as seed from "../seed.js";
import type * as users from "../users.js";
import type * as utils_coupon from "../utils/coupon.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  addresses: typeof addresses;
  categories: typeof categories;
  coupons: typeof coupons;
  delivery: typeof delivery;
  favourites: typeof favourites;
  helpers: typeof helpers;
  inventory: typeof inventory;
  orderItems: typeof orderItems;
  orders: typeof orders;
  payments: typeof payments;
  products: typeof products;
  seed: typeof seed;
  users: typeof users;
  "utils/coupon": typeof utils_coupon;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
