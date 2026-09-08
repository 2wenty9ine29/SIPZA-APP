# SIPZA

YOUR DRINKS. ONE CART.

## Version 7
- Bulk and Single prices are shown together on every product.
- Each product has one clean Add button.
- The Add button follows the selected Bulk/Singles mode, so both types can be added to the same cart.
- Cart keeps Bulk and Single quantities/prices separate.
- Checkout collects name, phone, email and delivery location.
- Paystack checkout is wired into the frontend. Add `VITE_PAYSTACK_PUBLIC_KEY` in Vercel to activate it.
- Never put a Paystack secret key in the frontend.

## GitHub / Vercel
Upload the contents of this ZIP to the repository, then redeploy on Vercel.

For payment, add this Vercel Environment Variable:
`VITE_PAYSTACK_PUBLIC_KEY` = your Paystack public key.

Paystack secret keys must stay server-side.


### v10 UI update
- Removed Bulk/Single labels from product price cards.
- Kept the Bulk/Singles selector and one clean circular + button per product.
- Refined the + button for a cleaner premium mobile UI.
