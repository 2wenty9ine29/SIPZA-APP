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


### v11 UI fix
- Removed the unwanted Bulk/Single labels from product cards.
- Kept the Bulk/Singles selector and one clean circular + button per product.
- Shows only the active price and one clean circular + button.
- Removed the old conflicting add-button styling so the clean + style is actually used.


### v15
- Added a quantity picker for Fanta, Kalyppo, U-Fresh and can drinks in Bulk mode.
- Bulk picker supports Full, Half and ¼ with calculated prices before adding to cart.
- Preserved direct Paystack checkout and 1.95% fee gross-up.
