# Grocery Shopping Platform MVP Scope

## Customer App

The customer should be able to:

1. Browse products.
2. Browse products by category.
3. Search products.
4. View product detail page.
5. Add product to cart.
6. Update quantity in cart.
7. Remove product from cart.
8. Cart should persist after page refresh.
9. Mark product as favourite.
10. View favourites.
11. Add address before checkout.
12. Checkout only after address is available.
13. Pay through Razorpay Checkout.
14. Use Indian payment methods supported by Razorpay such as UPI, cards, net banking and wallets.
15. View order history.
16. View payment/order status.
17. View membership/free delivery option.
18. Subscribe to membership/free delivery plan through Razorpay Subscription.

## Admin App

Admin should be able to:

1. Access admin dashboard only if Clerk public metadata role is admin.
2. View dashboard overview.
3. Manage categories.
4. Manage products.
5. Manage inventory/stock.
6. View customers.
7. View orders.
8. View Razorpay payment status.
9. View Razorpay order/payment reference IDs.
10. View stock reduction after successful payment.
11. View customer membership/free shipping status.

## Payments

1. Use Razorpay Payment Gateway for one-time grocery checkout.
2. Use Razorpay Orders API to create payment orders from the backend.
3. Use Razorpay Checkout on the frontend.
4. Use Razorpay webhooks through Convex HTTP routes.
5. Payment success should not be trusted only from the frontend.
6. Final payment confirmation must come from Razorpay webhook.
7. Convex should verify Razorpay webhook signature.
8. Payment success should update order status.
9. Payment success should reduce stock.
10. Cart should clear only after verified successful payment.
11. If payment fails, order should remain pending or failed.

## Membership

1. Use Razorpay Subscriptions for membership/free-delivery plan.
2. Membership should provide free shipping.
3. Store membership status in Convex.
4. Store free shipping eligibility in Convex.
5. User should be treated as a member only after Razorpay subscription/payment confirmation.
6. Razorpay subscription webhook should update membership status.
7. During grocery checkout, Convex should check whether the user has active free shipping.
8. If active membership exists, delivery fee should be ₹0.
9. If no active membership exists, normal delivery fee should apply.

## Backend

Use Convex for:

1. Users
2. Addresses
3. Categories
4. Products
5. Inventory
6. Favourites
7. Orders
8. Order items
9. Payments
10. Razorpay order creation
11. Razorpay payment verification
12. Razorpay payment webhooks
13. Razorpay subscription webhooks
14. Membership status
15. Free shipping eligibility
16. Admin operations

## UI

Use ShadCN for:

1. Buttons
2. Inputs
3. Forms
4. Tables
5. Dialogs
6. Sidebar
7. Toasts
8. Admin dashboard components

## Build Rule

Functionality first. Design can be improved later.
Do not add extra features outside this MVP.
Do not use Stripe or Clerk Billing because this app is being built for India.
Use Clerk only for authentication and admin role control.
Use Razorpay for payments and membership billing.
Use Convex as the source of truth for orders, payments, inventory and membership status.
