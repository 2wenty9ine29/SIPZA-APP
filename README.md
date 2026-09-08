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

### v17 — customer accounts + notifications
- Restored the **password** field for normal SIPZA accounts.
- Email/password sign-up creates a real Firebase account and **automatically signs the customer in** after successful registration.
- Added **Continue with Google** to both Sign up and Log in.
- New sign-up notifications send only the customer's **name, email and phone** to `2wenty9ine2929@gmail.com`. Passwords are never emailed.
- Complaints send the customer's **name, phone, email and complaint** to the same address.
- Call Us is set to **0205987053**.

#### Firebase setup (required for live accounts)
1. Create a Firebase project and add a Web App.
2. In Firebase Authentication → Sign-in method, enable **Email/Password** and **Google**.
3. Add your deployed SIPZA domain to Firebase Authentication → Settings → Authorized domains.
4. Copy the Firebase Web App config into the Vercel environment variables listed in `.env.example`.
5. Redeploy on Vercel.

The notification form uses FormSubmit's AJAX endpoint; the first notification may require a one-time confirmation of `2wenty9ine2929@gmail.com`.


## v19 — Email verification

- Email/password signup keeps the password field.
- Firebase automatically signs the customer in immediately after successful signup.
- Firebase automatically sends a verification email to the customer's email address.
- SIPZA receives only the customer's name, phone and email via the notification form; passwords are never included.
- Google sign-in remains available for both signup and login.
- Google users who are new to SIPZA are prompted for a phone number so the owner notification can include name, email and phone.

### Firebase
Email/Password and Google providers must be enabled in Firebase Authentication. The Firebase Web App configuration is already included as the public client configuration for the SIPZA project.

## v19.1 — verification + notifications
- Added show/hide password controls to password fields.
- Email/password signup now sends both Firebase's verification link and a 6-digit code.
- Signup cannot be finished until the Firebase email is verified and the 6-digit code is entered.
- Email/password login blocks unverified accounts and sends fresh verification instructions.
- New customer notifications and complaints now use the server-side `/api (action: notify)` endpoint with Resend; the Resend API key is never exposed to the browser.
- Verification codes are generated and checked server-side with a signed, expiring token.

### Vercel variables required
Set these in Vercel Project Settings → Environment Variables:
- `RESEND_API_KEY` — your Resend API key.
- `SIPZA_NOTIFY_EMAIL` — `2wenty9ine2929@gmail.com`.
- `SIPZA_FROM_EMAIL` — a sender address allowed by Resend. For production, verify your domain in Resend and use an address on that domain.
- `VERIFICATION_SECRET` — a long random secret used to sign verification sessions.

The Firebase `VITE_*` values can remain as shown in `.env.example`.
