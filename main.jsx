import React, { useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, getRedirectResult, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, signOut, getAdditionalUserInfo, reload } from "firebase/auth";
import "./styles.css";

const firebaseConfig = {
  // Firebase Web App config is public client configuration and is safe to ship in the browser.
  // These values match the SIPZA Firebase project supplied by the owner.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBciIb2j0In-pRw3_68kMX6M2peTrRpMCA",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "passwords-for-sipza.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "passwords-for-sipza",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "passwords-for-sipza.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "554261466249",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:554261466249:web:d35fb186c17d085bdc4a58",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-KJX8FW0TH1",
};
const firebaseReady = Object.values(firebaseConfig).filter((_, i) => i < 6).every(Boolean);
const firebaseApp = firebaseReady ? initializeApp(firebaseConfig) : null;
const auth = firebaseApp ? getAuth(firebaseApp) : null;
const googleProvider = new GoogleAuthProvider();
const NOTIFY_EMAIL = import.meta.env.VITE_NOTIFY_EMAIL || "2wenty9ine2929@gmail.com";
const API_ENDPOINT = "/api";

const products = [
  {
    "id": 1,
    "name": "Angel Cola",
    "bulk": 41.0,
    "single": 4.0,
    "category": "Cola",
    "image": "https://pbs.twimg.com/media/FuOpIcKWIAAxrg5.jpg"
  },
  {
    "id": 2,
    "name": "Awake 1L (Large)",
    "bulk": 8.0,
    "single": null,
    "category": "Water",
    "image": "https://www.asadwasoshop.com/media/catalog/product/cache/d9ddc473ae54d47d9008a7c7b1b5a786/a/w/awake_purified_water_500ml_pet.png"
  },
  {
    "id": 3,
    "name": "Awake (Tiny Bottles)",
    "bulk": 25.0,
    "single": null,
    "category": "Water",
    "image": "https://www.asadwasoshop.com/media/catalog/product/cache/d9ddc473ae54d47d9008a7c7b1b5a786/a/w/awake_purified_water_500ml_pet.png"
  },
  {
    "id": 4,
    "name": "Awake (Small)",
    "bulk": 35.0,
    "single": 3.0,
    "category": "Water",
    "image": "https://www.asadwasoshop.com/media/catalog/product/cache/d9ddc473ae54d47d9008a7c7b1b5a786/a/w/awake_purified_water_500ml_pet.png"
  },
  {
    "id": 5,
    "name": "Awake (Medium)",
    "bulk": 45.0,
    "single": 4.0,
    "category": "Water",
    "image": "https://www.asadwasoshop.com/media/catalog/product/cache/d9ddc473ae54d47d9008a7c7b1b5a786/a/w/awake_purified_water_500ml_pet.png"
  },
  {
    "id": 6,
    "name": "Bel Active",
    "bulk": 50.0,
    "single": null,
    "category": "Cola",
    "image": ""
  },
  {
    "id": 7,
    "name": "Bel Aqua (Small)",
    "bulk": 35.0,
    "single": null,
    "category": "Water",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1509560755237437441-800x800.jpg"
  },
  {
    "id": 8,
    "name": "Bel Aqua (Medium)",
    "bulk": 45.0,
    "single": null,
    "category": "Water",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1509560755237437441-800x800.jpg"
  },
  {
    "id": 9,
    "name": "Bel Aqua (1 Litre)",
    "bulk": 45.0,
    "single": null,
    "category": "Water",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1509560755237437441-800x800.jpg"
  },
  {
    "id": 10,
    "name": "Bel Cola",
    "bulk": 45.0,
    "single": 4.0,
    "category": "Cola",
    "image": "https://www.amoragh.com/storage/products/grocery/beverages/bel-cola.jpg"
  },
  {
    "id": 11,
    "name": "Beta Malt",
    "bulk": 95.0,
    "single": null,
    "category": "Malt",
    "image": "https://konzoom.shop/cdn/shop/products/beta-malt_5a71c2fe-dd38-4a98-aadc-c36e3b55328c.jpg?v=1640172670"
  },
  {
    "id": 12,
    "name": "Bigoo",
    "bulk": 50.0,
    "single": 4.0,
    "category": "Cola",
    "image": "https://www.amoragh.com/storage/products/grocery/beverages/bigoo-cola.jpg"
  },
  {
    "id": 13,
    "name": "Breeze",
    "bulk": 47.0,
    "single": null,
    "category": "Cola",
    "image": "https://www.amoragh.com/storage/products/grocery/beverages/bel-breeze.jpg"
  },
  {
    "id": 14,
    "name": "Can Coke",
    "bulk": 165.0,
    "single": null,
    "category": "Cola",
    "image": "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 15,
    "name": "Can Fanta",
    "bulk": 165.0,
    "single": null,
    "category": "Fanta",
    "image": "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=900&q=85"
  },
  {
    "id": 16,
    "name": "Can Malt Ghana (Slim)",
    "bulk": 240.0,
    "single": 14.0,
    "category": "Malt",
    "image": ""
  },
  {
    "id": 17,
    "name": "Can Malt Nigeria",
    "bulk": 190.0,
    "single": 10.0,
    "category": "Malt",
    "image": ""
  },
  {
    "id": 18,
    "name": "Ceres (Medium)",
    "bulk": 16.0,
    "single": null,
    "category": "Juice",
    "image": "https://www.supermart.ng/cdn/shop/files/OkeA1037x.webp?v=1706176283&width=460"
  },
  {
    "id": 19,
    "name": "Ceres (Large)",
    "bulk": 35.0,
    "single": null,
    "category": "Juice",
    "image": "https://www.supermart.ng/cdn/shop/files/OkeA1037x.webp?v=1706176283&width=460"
  },
  {
    "id": 20,
    "name": "ChocoMalt",
    "bulk": 75.0,
    "single": null,
    "category": "Malt",
    "image": "https://konzoom.shop/cdn/shop/files/choco_malt_533x.jpg?v=1713430126"
  },
  {
    "id": 21,
    "name": "Coke Bottle (Large)",
    "bulk": 25.0,
    "single": null,
    "category": "Cola",
    "image": "https://hillcrestkwikspar.co.za/shop/public/6/images/products/resize_vU1GmsqK_1663497894_826.jpg"
  },
  {
    "id": 22,
    "name": "Coke Bottle (Medium, 450ml)",
    "bulk": 90.0,
    "single": null,
    "category": "Cola",
    "image": "https://hillcrestkwikspar.co.za/shop/public/6/images/products/resize_vU1GmsqK_1663497894_826.jpg"
  },
  {
    "id": 23,
    "name": "Coke Bottle (Small)",
    "bulk": 65.0,
    "single": null,
    "category": "Cola",
    "image": "https://hillcrestkwikspar.co.za/shop/public/6/images/products/resize_vU1GmsqK_1663497894_826.jpg"
  },
  {
    "id": 24,
    "name": "Communion Wine",
    "bulk": 40.0,
    "single": null,
    "category": "Wine & Champagne",
    "image": "https://oss.tospinomall.com.gh/product_pic/1ca1f4cbda74456a8bbceebf0ea16aea.jpg"
  },
  {
    "id": 25,
    "name": "Dj Cocktail",
    "bulk": 40.0,
    "single": null,
    "category": "Wine & Champagne",
    "image": "https://oss.tospinomall.com.gh/product_pic/42f3b80b0f9c4f3eb06e35214a827447.png"
  },
  {
    "id": 26,
    "name": "Don Simon (Large, 1L)",
    "bulk": 30.0,
    "single": 30.0,
    "category": "Juice",
    "image": "https://konzoom.shop/cdn/shop/products/20230111_224948_0000_1445x.jpg?v=1673548810"
  },
  {
    "id": 27,
    "name": "Don Simon (Medium)",
    "bulk": 17.0,
    "single": null,
    "category": "Juice",
    "image": "https://melcom.com/media/catalog/product/cache/8757aa1374eaaf34b9fd32f9e760ba0b/9/1/91457a.jpg"
  },
  {
    "id": 28,
    "name": "Eden (Medium)",
    "bulk": 45.0,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 29,
    "name": "Fanta Bottle",
    "bulk": 65.0,
    "single": 9.0,
    "category": "Fanta",
    "image": "https://mama-t.de/cdn/shop/files/fanta-orange-ghana.jpg"
  },
  {
    "id": 30,
    "name": "Fruitful Grapes",
    "bulk": 15.0,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 31,
    "name": "Jingo",
    "bulk": 40.0,
    "single": null,
    "category": "Other",
    "image": "https://pbs.twimg.com/media/FzKmYcKXwAMxmsv.jpg"
  },
  {
    "id": 32,
    "name": "Kaesar",
    "bulk": 50.0,
    "single": null,
    "category": "Wine & Champagne",
    "image": ""
  },
  {
    "id": 33,
    "name": "Kalyppo",
    "bulk": 97.0,
    "single": 5.0,
    "category": "Juice",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1483835088669061121-800x800.jpg"
  },
  {
    "id": 34,
    "name": "Kangen (Small)",
    "bulk": 30.0,
    "single": null,
    "category": "Water",
    "image": "https://www.jiomart.com/images/product/original/rvwjfwhgl4/kangen-water-bottle-500-ml-pack-of-24-product-images-orvwjfwhgl4-p605440042-0-202310041626.jpg?im=Resize%3D%281000%2C1000%29"
  },
  {
    "id": 35,
    "name": "Kangen (Big)",
    "bulk": 30.0,
    "single": null,
    "category": "Water",
    "image": "https://www.jiomart.com/images/product/original/rvwjfwhgl4/kangen-water-bottle-500-ml-pack-of-24-product-images-orvwjfwhgl4-p605440042-0-202310041626.jpg?im=Resize%3D%281000%2C1000%29"
  },
  {
    "id": 36,
    "name": "Lucozade (6 pieces)",
    "bulk": 80.0,
    "single": null,
    "category": "Energy",
    "image": "https://shop.africanfoodsupermarket.com/cdn/shop/products/IMG_4519_600x.jpg?v=1571610324"
  },
  {
    "id": 37,
    "name": "Malt Guinness Bottle",
    "bulk": 120.0,
    "single": null,
    "category": "Malt",
    "image": "https://ghbasket.com/wp-content/uploads/2020/04/MALTA-GUINNESS-PET-330ML.jpg"
  },
  {
    "id": 38,
    "name": "Multi Fruit (Big Red)",
    "bulk": 75.0,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 39,
    "name": "Multi Fruit (Small)",
    "bulk": null,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 40,
    "name": "Multi Fruit Kiki (6)",
    "bulk": 20.0,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 41,
    "name": "Niche",
    "bulk": null,
    "single": 6.0,
    "category": "Other",
    "image": "https://i.pinimg.com/originals/24/56/d9/2456d9c2103ccc9ca2b643507045da9f.jpg"
  },
  {
    "id": 42,
    "name": "Perla",
    "bulk": 35.0,
    "single": null,
    "category": "Other",
    "image": "https://maxmartonline.com/images/thumbs/0008314_perla-mineral-water-500ml.jpeg"
  },
  {
    "id": 43,
    "name": "PET Malt",
    "bulk": 120.0,
    "single": null,
    "category": "Malt",
    "image": "https://ghbasket.com/wp-content/uploads/2020/04/MALTA-GUINNESS-PET-330ML.jpg"
  },
  {
    "id": 44,
    "name": "Planet",
    "bulk": 42.0,
    "single": 4.0,
    "category": "Energy",
    "image": "https://www.rireelstore.com/cdn/shop/files/1681738980392.jpg?v=1707895589&width=416"
  },
  {
    "id": 45,
    "name": "Puma",
    "bulk": 42.0,
    "single": null,
    "category": "Energy",
    "image": ""
  },
  {
    "id": 46,
    "name": "Rendez Vous",
    "bulk": 35.0,
    "single": null,
    "category": "Wine & Champagne",
    "image": "https://www.drinksghana.com/web/image/product.template/541/image_1920?unique=d3996a9"
  },
  {
    "id": 47,
    "name": "Royal Apple and Drinks",
    "bulk": 45.0,
    "single": null,
    "category": "Other",
    "image": ""
  },
  {
    "id": 48,
    "name": "Run",
    "bulk": 72.0,
    "single": null,
    "category": "Energy",
    "image": "https://www.modernghana.com/images/content/11142017154707_1.jpg"
  },
  {
    "id": 49,
    "name": "Squeeze",
    "bulk": 50.0,
    "single": 4.0,
    "category": "Energy",
    "image": "https://www.namidor.com/namidor/products/fi96m56q9z4m/FMT-IMG-1754431257.jpg"
  },
  {
    "id": 50,
    "name": "Storm (Big)",
    "bulk": 75.0,
    "single": 7.0,
    "category": "Energy",
    "image": "https://melcom.com/media/catalog/product/cache/1/image/1200x/040ec09b1e35df139433887a97daa66f/s/t/storm-energy-drink-350ml.jpg"
  },
  {
    "id": 51,
    "name": "Storm (Small)",
    "bulk": 52.0,
    "single": 5.0,
    "category": "Energy",
    "image": "https://melcom.com/media/catalog/product/cache/1/image/1200x/040ec09b1e35df139433887a97daa66f/s/t/storm-energy-drink-350ml.jpg"
  },
  {
    "id": 52,
    "name": "Tampico (Medium)",
    "bulk": 67.0,
    "single": null,
    "category": "Juice",
    "image": "https://vepaar.b-cdn.net/uploads/c-172202/product/14694065/media_16983308252019319648.jpg?aspect_ratio=1%3A1&crop_gravity=center&height=500&quality=70&width=500"
  },
  {
    "id": 53,
    "name": "U-Fresh Choco or Soy",
    "bulk": 67.0,
    "single": null,
    "category": "Juice",
    "image": "https://www.beksghana.com/cdn/shop/files/u-fresh-choco.jpg"
  },
  {
    "id": 54,
    "name": "U-Fresh Grapes (Medium)",
    "bulk": 38.0,
    "single": null,
    "category": "Juice",
    "image": "https://www.beksghana.com/cdn/shop/files/u-fresh-grsape-drink-350ml.jpg"
  },
  {
    "id": 55,
    "name": "Verna 36 (Small)",
    "bulk": 60.0,
    "single": null,
    "category": "Water",
    "image": "https://www.melcom.com/media/catalog/product/v/e/verna-mineral-water-500ml.jpg"
  },
  {
    "id": 56,
    "name": "Vitamilk (Singles-14)",
    "bulk": 80.0,
    "single": 14.0,
    "category": "Other",
    "image": "https://www.drinksghana.com/web/image/product.template/593/image_1024?unique=d0e293e5"
  },
  {
    "id": 57,
    "name": "Vitamilk Kallypo Champion (25 per 6)",
    "bulk": null,
    "single": 25.0,
    "category": "Other",
    "image": ""
  },
  {
    "id": 58,
    "name": "Voltic (Medium)",
    "bulk": 35.0,
    "single": null,
    "category": "Water",
    "image": "https://www.drinksghana.com/web/image/product.template/599/image_1024?unique=b0680dd"
  },
  {
    "id": 59,
    "name": "Voltic (Big)",
    "bulk": 35.0,
    "single": null,
    "category": "Water",
    "image": "https://www.drinksghana.com/web/image/product.template/599/image_1024?unique=b0680dd"
  },
  {
    "id": 60,
    "name": "Wheat Drink (Medium)",
    "bulk": 160.0,
    "single": null,
    "category": "Juice",
    "image": ""
  },
  {
    "id": 61,
    "name": "5 Star",
    "bulk": 47.0,
    "single": 5.0,
    "category": "Other",
    "image": "https://www.nehasupermarket.com/storage/products/5-star-energy-drink-350ml-neha-supermarket.jpg"
  }
];
const categories = ["All", "Water", "Cola", "Fanta", "Energy", "Malt", "Juice", "Wine & Champagne", "Other"];

const fallback = {
  "Water": { emoji: "💧", cls: "water" },
  "Cola": { emoji: "🥤", cls: "cola" },
  "Fanta": { emoji: "🍊", cls: "fanta" },
  "Energy": { emoji: "⚡", cls: "energy" },
  "Malt": { emoji: "🍺", cls: "malt" },
  "Juice": { emoji: "🧃", cls: "juice" },
  "Wine & Champagne": { emoji: "🍾", cls: "wine" },
  "Other": { emoji: "🥂", cls: "other" }
};

const money = v => v == null ? "—" : `₵${Number(v).toFixed(2)}`;

function Icon({ children, size=22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
}

function ProductImage({ product }) {
  const f = fallback[product.category] || fallback.Other;
  const [failed, setFailed] = useState(false);
  if (product.image && !failed) {
    return <img src={product.image} alt={product.name} loading="lazy" onError={() => setFailed(true)} />;
  }
  return <div className={`photo-fallback ${f.cls}`}><span>{f.emoji}</span><small>{product.category}</small></div>;
}

function App() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("bulk");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactView, setContactView] = useState("menu");
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const [verificationToken, setVerificationToken] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationEmail, setVerificationEmail] = useState("");
  const [authUser, setAuthUser] = useState(null);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [undoCart, setUndoCart] = useState(null);
  const [undoSeconds, setUndoSeconds] = useState(0);
  const [stateHydrated, setStateHydrated] = useState(false);
  const sipzaPhone = import.meta.env.VITE_SIPZA_PHONE || "0205987053";
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "pk_test_b07abafc3c971a0fca3087a6846393f0327595f2";

  const filtered = useMemo(() => products.filter(p =>
    (active === "All" || p.category === active) &&
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);

  const fractionProducts = p =>
    /kalyppo|u-fresh|fanta|^can\s/i.test(p.name);

  const [pickerProduct, setPickerProduct] = useState(null);

  // Restore the customer's browsing state and cart before rendering the live app.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("sipza_app_state") || "null");
      if (saved?.active) setActive(saved.active);
      if (typeof saved?.query === "string") setQuery(saved.query);
      if (saved?.mode === "single" || saved?.mode === "bulk") setMode(saved.mode);
      if (saved?.cart && typeof saved.cart === "object") setCart(saved.cart);
      if (saved?.scrollY) {
        requestAnimationFrame(() => setTimeout(() => window.scrollTo(0, Number(saved.scrollY) || 0), 0));
      }
    } catch {} finally {
      setStateHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!stateHydrated) return;
    try {
      localStorage.setItem("sipza_app_state", JSON.stringify({ active, query, mode, cart, scrollY: window.scrollY }));
    } catch {}
  }, [active, query, mode, cart, stateHydrated]);

  useEffect(() => {
    if (!stateHydrated) return;
    const saveScroll = () => {
      try {
        const current = JSON.parse(localStorage.getItem("sipza_app_state") || "{}");
        localStorage.setItem("sipza_app_state", JSON.stringify({ ...current, active, query, mode, cart, scrollY: window.scrollY }));
      } catch {}
    };
    window.addEventListener("scroll", saveScroll, { passive: true });
    return () => window.removeEventListener("scroll", saveScroll);
  }, [active, query, mode, cart, stateHydrated]);

  useEffect(() => {
    if (!undoSeconds) return;
    const timer = window.setInterval(() => setUndoSeconds(s => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(timer);
  }, [undoSeconds]);

  useEffect(() => {
    if (undoSeconds === 0 && undoCart) {
      setUndoCart(null);
      try {
        const current = JSON.parse(localStorage.getItem("sipza_app_state") || "{}");
        localStorage.setItem("sipza_app_state", JSON.stringify({ ...current, cart: {} }));
      } catch {}
    }
  }, [undoSeconds, undoCart]);

  useEffect(() => {
    if (!auth) return;
    let activeAuth = true;
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!activeAuth) return;
      setAuthUser(user);
    });

    // Google uses redirect auth on mobile. Firebase resolves the redirect result
    // after returning to the app, then the auth observer keeps the UI in sync.
    getRedirectResult(auth).then(async result => {
      if (!result || !activeAuth) return;
      const isNewUser = getAdditionalUserInfo(result)?.isNewUser;
      const googleIntent = sessionStorage.getItem("sipza_google_intent") || "login";
      try {
        if (isNewUser) {
          // Only a Google signup asks for SIPZA-specific information. Google login
          // never asks for name, email, or phone just to let an existing user in.
          let phone = "Not provided";
          if (googleIntent === "signup") {
            phone = window.prompt(
              "Welcome to SIPZA! Please enter your phone number to complete your new account:",
              localStorage.getItem("sipza_customer_phone") || ""
            ) || "Not provided";
            localStorage.setItem("sipza_customer_phone", phone);
          }
          await notifySIPZA({
            _subject: "New SIPZA Google customer sign-up",
            name: result.user.displayName || "Google customer",
            email: result.user.email || "",
            phone
          });
        }
        setAuthError("");
        setContactSubmitted(true);
        setAuthBusy(false);
        setContactOpen(false);
        setContactView("menu");
      } catch (error) {
        setAuthBusy(false);
        setAuthError(error.message || "Google sign-in was completed, but the SIPZA notification could not be sent.");
        setContactOpen(false);
      } finally {
        sessionStorage.removeItem("sipza_google_intent");
      }
    }).catch(error => {
      if (!activeAuth) return;
      sessionStorage.removeItem("sipza_google_intent");
      setAuthError(error.message || "Google sign-in was not completed.");
      setAuthBusy(false);
    });

    return () => {
      activeAuth = false;
      unsubscribe();
    };
  }, []);

  const add = (id, type = mode, portion = "full") => setCart(c => {
    const key = `${id}|${type}|${portion}`;
    return {...c, [key]: (c[key] || 0) + 1};
  });

  const handleProductAdd = (p) => {
    if (mode === "bulk" && fractionProducts(p)) {
      setPickerProduct(p);
      return;
    }
    add(p.id, mode, "full");
  };

  const addFraction = (portion) => {
    if (!pickerProduct) return;
    add(pickerProduct.id, "bulk", portion);
    setPickerProduct(null);
  };

  const clearCart = () => {
    if (!count) return;
    setUndoCart(cart);
    setCart({});
    setUndoSeconds(3);
  };

  const restoreCart = () => {
    if (!undoCart) return;
    setCart(undoCart);
    setUndoCart(null);
    setUndoSeconds(0);
  };

  const remove = (id, type, portion = "full") => setCart(c => {
    const key = `${id}|${type}|${portion}`;
    const n={...c};
    if (!n[key] || n[key] <= 1) delete n[key]; else n[key]--;
    return n;
  });

  const cartItems = Object.entries(cart).map(([key, qty]) => {
    const [id, type, portion = "full"] = key.split("|");
    const p = products.find(x => String(x.id) === id);
    return p ? {p, type, portion, qty, key} : null;
  }).filter(Boolean);

  const count = cartItems.reduce((a,item)=>a+item.qty,0);

  const portionMultiplier = portion =>
    portion === "half" ? 0.5 : portion === "quarter" ? 0.25 : 1;

  const itemUnitPrice = item =>
    Number(item.type === "single" ? item.p.single : item.p.bulk * portionMultiplier(item.portion)) || 0;

  const total = cartItems.reduce((sum,item) =>
    sum + itemUnitPrice(item) * item.qty, 0
  );

  const PAYMENT_FEE_RATE = 0.0195;
  const paymentFee = Number((total / (1 - PAYMENT_FEE_RATE) - total).toFixed(2));
  const paymentTotal = Number((total + paymentFee).toFixed(2));

  const openContact = (view = "menu") => {
    setContactSubmitted(false);
    setContactView(view);
    setContactOpen(true);
  };

  const closeContact = () => {
    setContactOpen(false);
    setContactView("menu");
    setContactSubmitted(false);
  };

  const notifySIPZA = async (payload) => {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "notify", ...payload })
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(result.error || `SIPZA notification failed (${response.status}).`);
    }
    return result;
  };

  const sendVerificationCode = async (email, name) => {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "send-code", email, name })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Could not send verification code.");
    setVerificationToken(result.token);
  };

  const checkVerificationCode = async () => {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify-code", email: verificationEmail, code: verificationCode, token: verificationToken })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Invalid verification code.");
    return true;
  };

  const resendFirebaseVerification = async () => {
    if (!auth?.currentUser) return;
    setAuthBusy(true); setAuthError("");
    try { await sendEmailVerification(auth.currentUser); setContactSubmitted(true); }
    catch (error) { setAuthError(error.message || "Could not resend the verification email."); }
    finally { setAuthBusy(false); }
  };

  const finishVerification = async () => {
    setAuthBusy(true); setAuthError("");
    try {
      await checkVerificationCode();
      await reload(auth.currentUser);
      if (!auth.currentUser?.emailVerified) {
        throw new Error("Please click the verification link in your email first, then tap ‘I verified my email’.");
      }
      const phone = localStorage.getItem("sipza_customer_phone") || "Not provided";
      await notifySIPZA({ _subject: "New SIPZA customer sign-up", name: auth.currentUser.displayName || "SIPZA customer", email: auth.currentUser.email || verificationEmail, phone });
      setVerificationPending(false);
      setContactSubmitted(true);
    } catch (error) { setAuthError(error.message || "Verification could not be completed."); }
    finally { setAuthBusy(false); }
  };

  const handleContactSubmit = async (event) => {
    event.preventDefault();
    setAuthError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    if (contactView === "signup") {
      if (!auth) {
        setAuthError("Account sign-up is not configured yet. Add the Firebase environment variables in Vercel.");
        return;
      }
      if (data.password !== data.confirmPassword) { setAuthError("Passwords do not match."); return; }
      setAuthBusy(true);
      try {
        const credential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        await updateProfile(credential.user, { displayName: data.name });
        await sendEmailVerification(credential.user);
        await sendVerificationCode(data.email, data.name);
        localStorage.setItem("sipza_customer_phone", data.phone);
        setVerificationEmail(data.email);
        setVerificationCode("");
        setVerificationPending(true);
        setContactSubmitted(false);
      } catch (error) {
        setAuthError(error.code === "auth/email-already-in-use" ? "That email already has a SIPZA account. Try Log in." : (error.message || "Unable to create your account."));
      } finally { setAuthBusy(false); }
      return;
    }

    if (contactView === "login") {
      if (!auth) {
        setAuthError("Login is not configured yet. Add the Firebase environment variables in Vercel.");
        return;
      }
      setAuthBusy(true);
      try {
        const credential = await signInWithEmailAndPassword(auth, data.email, data.password);
        await reload(credential.user);
        if (!credential.user.emailVerified) {
          await sendEmailVerification(credential.user);
          await sendVerificationCode(data.email, credential.user.displayName || "SIPZA customer");
          setVerificationEmail(data.email);
          setVerificationCode("");
          setVerificationPending(true);
          throw new Error("Please verify your email before logging in. We sent you a verification link and a 6-digit code.");
        }
        setContactSubmitted(true);
        setContactOpen(false);
        setContactView("menu");
      } catch (error) {
        setAuthError(error.code === "auth/invalid-credential" ? "Email or password is incorrect." : (error.message || "Unable to log in."));
      } finally { setAuthBusy(false); }
      return;
    }

    if (contactView === "complaint") {
      setAuthBusy(true);
      await notifySIPZA({ _subject: "New SIPZA complaint", name: data.name, phone: data.phone, email: data.email, complaint: data.complaint });
      setContactSubmitted(true);
      setAuthBusy(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthError("");
    if (!auth) {
      setAuthError("Google sign-in is not configured yet. Add the Firebase environment variables in Vercel.");
      return;
    }
    setAuthBusy(true);
    try {
      // Redirect is preferred by Firebase on mobile devices and avoids popup-closed errors.
      sessionStorage.setItem("sipza_google_intent", contactView === "signup" ? "signup" : "login");
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      sessionStorage.removeItem("sipza_google_intent");
      setAuthBusy(false);
      setAuthError(error.message || "Google sign-in was not completed.");
    }
  };

  const handleLogout = async () => { if (auth) await signOut(auth); setContactView("menu"); };

  const startPayment = () => {
    if (!total) return;
    if (!paystackKey) return alert("Payment is ready, but the Paystack public key still needs to be added in Vercel as VITE_PAYSTACK_PUBLIC_KEY.");
    if (!window.PaystackPop) return alert("Payment checkout is still loading. Please try again.");

    setCartOpen(false);
    const popup = new window.PaystackPop();
    popup.checkout({
      key: paystackKey,
      email: "customer@sipza.app",
      amount: Math.round(paymentTotal * 100),
      currency: "GHS",
      metadata: {
        custom_fields: [{ display_name: "SIPZA Order", variable_name: "sipza_order", value: String(count) + " items" }]
      },
      onSuccess: (transaction) => {
        alert("Payment successful. Reference: " + transaction.reference);
        setCart({});
        setCartOpen(false);
      },
      onCancel: () => {}
    });
  };

  return <div className="app">
    <header className="header">
      <div className="brand">
        <div className="logo">S</div>
        <div><div className="brand-name">SIPZA</div><div className="tag">YOUR DRINKS. ONE CART.</div></div>
      </div>
      <div className="header-actions">
        <button className="contact-button" onClick={() => openContact()} aria-label="Contact SIPZA">
          <Icon size={18}><path d="M21 11.5a8.4 8.4 0 0 1-9 8.5 9.6 9.6 0 0 1-4.1-.9L3 20l1.1-4A8.4 8.4 0 0 1 3 11.5 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z"/><path d="M8 10h8M8 14h5"/></Icon>
          <span>Contact</span>
        </button>
        <button className="cart-icon" onClick={() => setCartOpen(true)} aria-label="Open cart">
          <Icon size={23}><path d="M3 4h2l2 12h10l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></Icon>
          {count > 0 && <b>{count}</b>}
        </button>
      </div>
    </header>

    <main>
      <section className="hero">
        <div>
          <div className="eyebrow">DRINKS CATALOGUE</div>
          <h1>Pick your <em>sip.</em></h1>
          <p>Tap <strong>+</strong> on anything you want. Your cart keeps count.</p>
        </div>
        <div className="hero-art"><span>🥤</span><i>✦</i></div>
      </section>

      <div className="tools">
        <div className="search">
          <Icon size={20}><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></Icon>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search drinks..." />
          {query && <button onClick={()=>setQuery("")}>×</button>}
        </div>
        <div className="mode">
          <button className={mode==="single"?"active":""} onClick={()=>setMode("single")}>Singles</button>
          <button className={mode==="bulk"?"active":""} onClick={()=>setMode("bulk")}>Bulk</button>
        </div>
      </div>

      <nav className="categories">
        {categories.map(c=><button key={c} className={active===c?"active":""} onClick={()=>setActive(c)}>{c}</button>)}
      </nav>

      <div className="heading">
        <div><div className="eyebrow">{active==="All"?"ALL DRINKS":active.toUpperCase()}</div><h2>{active==="All"?"The collection":active}</h2></div>
        <span>{filtered.length} products</span>
      </div>

      <section className="grid">
        {filtered.map(p => <article className="card" key={p.id}>
          <div className="photo">
            <ProductImage product={p}/>
          </div>
          <div className="info">
            <div className="name"><h3>{p.name}</h3><p>{p.category}</p></div>
            <div className="prices">
              <strong className="active-price">{money(mode === "single" ? p.single : p.bulk)}</strong>
              <button className="item-add clean-plus" aria-label={`Add ${mode}`} title={`Add ${mode}`} disabled={mode==="single" && p.single == null} onClick={()=>handleProductAdd(p)}>
                <Icon size={16}><path d="M12 5v14M5 12h14"/></Icon>
              </button>
            </div>
          </div>
        </article>)}
      </section>

      {filtered.length===0 && <div className="empty"><span>🔎</span><h3>Nothing found</h3><p>Try another drink or category.</p></div>}
    </main>

    {count>0 && <button className="cart-bar" onClick={()=>setCartOpen(true)}>
      <span><Icon size={19}><path d="M3 4h2l2 12h10l2-8H6"/></Icon> Cart</span>
      <strong>{count} items</strong><b>{money(total)}</b>
    </button>}

    {contactOpen && <div className="overlay contact-overlay" onClick={closeContact}>
      <aside className="contact-sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-head">
          <div><div className="eyebrow">SIPZA SUPPORT</div><h2>{contactView === "menu" ? "How can we help?" : contactView === "signup" ? "Create an account" : contactView === "login" ? "Welcome back" : "Make a complaint"}</h2></div>
          <button className="close" onClick={closeContact}>×</button>
        </div>

        {contactView === "menu" && <div className="contact-menu">
          {authUser ? <>
            <div className="signed-in-card"><span className="contact-option-icon">✓</span><span><strong>Signed in</strong><small>{authUser.displayName || authUser.email}</small></span><button onClick={handleLogout}>Log out</button></div>
          </> : <>
            <button className="contact-option" onClick={()=>openContact("signup")}><span className="contact-option-icon">＋</span><span><strong>Sign up</strong><small>Create an account with your name, phone, email and password.</small></span><b>›</b></button>
            <button className="contact-option" onClick={()=>openContact("login")}><span className="contact-option-icon">↪</span><span><strong>Log in</strong><small>Use your SIPZA email and password.</small></span><b>›</b></button>
          </>}
          {sipzaPhone ? <a className="contact-option" href={`tel:${sipzaPhone}`}><span className="contact-option-icon">☎</span><span><strong>Call us</strong><small>{sipzaPhone}</small></span><b>›</b></a> : null}
          <button className="contact-option" onClick={()=>openContact("complaint")}><span className="contact-option-icon">!</span><span><strong>Make a complaint</strong><small>Tell us what went wrong and we'll follow up.</small></span><b>›</b></button>
        </div>}

        {contactView !== "menu" && <div className="contact-form-wrap">
          <button className="back-contact" onClick={()=>openContact()}>← Back to contact options</button>
          {contactView === "signup" && !verificationPending && <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Full name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>Phone<input required type="tel" name="phone" autoComplete="tel" placeholder="024 000 0000" /></label>
            <label>Password<div className="password-field"><input required minLength="6" type={showPassword ? "text" : "password"} name="password" autoComplete="new-password" placeholder="Create a password" /><button type="button" className="password-eye" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "◉" : "◌"}</button></div></label>
            <label>Confirm password<div className="password-field"><input required minLength="6" type={showConfirmPassword ? "text" : "password"} name="confirmPassword" autoComplete="new-password" placeholder="Confirm password" /><button type="button" className="password-eye" onClick={()=>setShowConfirmPassword(v=>!v)} aria-label={showConfirmPassword ? "Hide password" : "Show password"}>{showConfirmPassword ? "◉" : "◌"}</button></div></label>
            {authError && <p className="contact-error">{authError}</p>}
            <button className="contact-submit" disabled={authBusy} type="submit">{authBusy ? "Creating account…" : "Create account & verify"}</button>
            <div className="auth-divider"><span>or</span></div>
            <button className="google-btn" disabled={authBusy} type="button" onClick={handleGoogleAuth}><span className="google-icon" aria-hidden="true">G</span> Continue with Google</button>
          </form>}

          {contactView === "signup" && verificationPending && <div className="verification-card">
            <h3>Verify your email</h3>
            <p>We sent <strong>{verificationEmail}</strong> a Firebase verification link and a 6-digit verification code.</p>
            <p className="verification-note">You must complete both steps before your SIPZA signup is finished.</p>
            <label>6-digit code<input inputMode="numeric" maxLength="6" value={verificationCode} onChange={e=>setVerificationCode(e.target.value.replace(/\D/g, "").slice(0,6))} placeholder="000000" /></label>
            {authError && <p className="contact-error">{authError}</p>}
            <button className="contact-submit" disabled={authBusy || verificationCode.length !== 6} onClick={finishVerification}>{authBusy ? "Checking…" : "Verify & finish signup"}</button>
            <button className="resend-btn" disabled={authBusy} onClick={resendFirebaseVerification}>Resend verification link</button>
            {contactSubmitted && <p className="contact-success">Verification email resent.</p>}
          </div>}

          {contactView === "login" && <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="you@example.com" /></label>
            <label>Password<div className="password-field"><input required type={showPassword ? "text" : "password"} name="password" autoComplete="current-password" placeholder="Your password" /><button type="button" className="password-eye" onClick={()=>setShowPassword(v=>!v)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? "◉" : "◌"}</button></div></label>
            {authError && <p className="contact-error">{authError}</p>}
            {contactSubmitted && <p className="contact-success">You're logged in.</p>}
            <button className="contact-submit" disabled={authBusy} type="submit">{authBusy ? "Logging in…" : "Log in"}</button>
            <div className="auth-divider"><span>or</span></div>
            <button className="google-btn" disabled={authBusy} type="button" onClick={handleGoogleAuth}><span className="google-icon" aria-hidden="true">G</span> Continue with Google</button>
          </form>}

          {contactView === "complaint" && <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>Name<input required name="name" autoComplete="name" defaultValue={authUser?.displayName || ""} placeholder="Your name" /></label>
            <label>Phone<input required type="tel" name="phone" placeholder="024 000 0000" /></label>
            <label>Email<input required type="email" name="email" autoComplete="email" defaultValue={authUser?.email || ""} placeholder="you@example.com" /></label>
            <label>Complaint<textarea required name="complaint" placeholder="Tell us what happened..." /></label>
            {contactSubmitted && <p className="contact-success">Thanks — your complaint has been sent to SIPZA.</p>}
            <button className="contact-submit" disabled={authBusy} type="submit">{authBusy ? "Sending…" : "Submit complaint"}</button>
          </form>}
        </div>}
      </aside>
    </div>}

    {undoCart && undoSeconds > 0 && <div className="undo-cart-toast" role="status">
      <span>Cart cleared</span>
      <button onClick={restoreCart}>Undo</button>
      <small>{undoSeconds}s</small>
    </div>}

    {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}>
      <aside className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-head"><div><div className="eyebrow">YOUR ORDER</div><h2>Your cart <small>({count})</small></h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>
        <div className="cart-list">
          {cartItems.length===0 ? <div className="empty">Your cart is empty.</div> : cartItems.map(item=><div className="cart-row" key={item.key}>
            <div className="thumb"><ProductImage product={item.p}/></div>
            <div className="cart-name"><strong>{item.p.name}</strong><small>{item.type === "single" ? "Single" : (item.portion === "half" ? "Half" : item.portion === "quarter" ? "¼" : "Full")} · {money(itemUnitPrice(item))}</small>
              <div className="qty"><button onClick={()=>remove(item.p.id,item.type,item.portion)}>−</button><b>{item.qty}</b><button onClick={()=>add(item.p.id,item.type,item.portion)}>+</button></div>
            </div>
            <strong>{money(itemUnitPrice(item)*item.qty)}</strong>
          </div>)}
        </div>
        <div className="total"><div className="cart-fee-row"><span>Subtotal</span><strong>{money(total)}</strong></div>
<div className="cart-fee-row"><span>Payment fee (1.95%)</span><strong>{money(paymentFee)}</strong></div>
<div><span>Total</span><strong>{money(paymentTotal)}</strong></div><div className="total-actions"><button className="clear-cart" onClick={clearCart} disabled={!count}>Clear</button><button className="checkout-btn" onClick={startPayment} disabled={!count}>Checkout</button></div></div>
      </aside>
    </div>}
    {pickerProduct && <div className="overlay fraction-overlay" onClick={()=>setPickerProduct(null)}>
      <aside className="fraction-sheet" onClick={e=>e.stopPropagation()}>
        <div className="fraction-head">
          <div>
            <div className="eyebrow">CHOOSE QUANTITY</div>
            <h2>{pickerProduct.name}</h2>
            <p>Select how much of the bulk pack you want.</p>
          </div>
          <button className="close" onClick={()=>setPickerProduct(null)}>×</button>
        </div>
        <div className="fraction-options">
          {[
            ["full","Full",1],
            ["half","Half",0.5],
            ["quarter","¼",0.25]
          ].map(([portion,label,mult]) =>
            <button key={portion} className="fraction-option" onClick={()=>addFraction(portion)}>
              <span>{label}</span>
              <strong>{money(pickerProduct.bulk * mult)}</strong>
            </button>
          )}
        </div>
      </aside>
    </div>}

  </div>
}

createRoot(document.getElementById("root")).render(<App />);
