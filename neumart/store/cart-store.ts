import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "sonner";

export interface CartItem {
  productId: string; // Id<"products"> at runtime; plain string for localStorage serialization
  name: string;
  price: number; // paise
  quantity: number;
  unit: string;
  imageUrl?: string;
}

export interface AppliedCoupon {
  code: string;
  couponId: string;
  discountAmount: number;   // paise
  discountValue: number;    // percentage, e.g. 10
  maximumDiscount: number | null;
  minimumOrderValue: number | null;
}

interface CartStore {
  items: CartItem[];
  appliedCoupon: AppliedCoupon | null;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (productId: string, qty: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (coupon: AppliedCoupon) => void;
  removeCoupon: () => void;
}

function getSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedCoupon: null,

      addItem: (newItem) =>
        set((state) => {
          const qty = newItem.quantity ?? 1;
          const existing = state.items.find((i) => i.productId === newItem.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId
                  ? { ...i, quantity: i.quantity + qty }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...newItem, quantity: qty }] };
        }),

      updateQuantity: (productId, qty) => {
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter((i) => i.productId !== productId)
              : state.items.map((i) =>
                  i.productId === productId ? { ...i, quantity: qty } : i
                ),
        }));
        checkCouponMinimum(get, set);
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
        checkCouponMinimum(get, set);
      },

      clearCart: () => set({ items: [], appliedCoupon: null }),

      applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    { name: "nuemart-cart" }
  )
);

function checkCouponMinimum(
  get: () => CartStore,
  set: (partial: Partial<CartStore>) => void,
) {
  const { appliedCoupon, items } = get();
  if (!appliedCoupon || !appliedCoupon.minimumOrderValue) return;
  const subtotal = getSubtotal(items);
  if (subtotal < appliedCoupon.minimumOrderValue) {
    set({ appliedCoupon: null });
    toast("Coupon removed — cart is below the minimum order value.");
  }
}

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));
}

export function useCartSubtotal() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
}
