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


### v16 — Contact access
- Added a **Contact** button directly beside the cart in the header, instead of placing contact actions on the right-hand side of the page.
- Contact menu includes **Sign up**, **Log in**, **Call us**, and **Make a complaint**.
- Sign-up, login, and complaint screens are frontend-ready forms; connect them to the project's authentication/support backend to make submissions live.
- Add `VITE_SIPZA_PHONE` in Vercel to enable the one-tap **Call us** action.


### v17 — Contact notifications
- **Call us** now uses **0205987053** and opens the phone dialer on supported devices.
- **Sign up** sends a notification to **2wenty9ine2929@gmail.com** containing the customer's name, phone and email.
- **Make a complaint** sends the complaint plus the customer's name, phone and email to the same address.
- Notifications use FormSubmit's AJAX endpoint, so no private email/API secret is stored in the frontend.
- On the first live submission, FormSubmit may ask the mailbox owner to confirm/activate the receiving email address.
- Signup no longer asks for or emails a password; a real password-based account system should be connected server-side when live authentication is added.

Vercel environment variables:
- `VITE_CONTACT_EMAIL=2wenty9ine2929@gmail.com`
- `VITE_SIPZA_PHONE=0205987053`
