import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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
    "image": "https://www.pngkit.com/png/detail/110-1100836_guinness-png.png"
  },
  {
    "id": 17,
    "name": "Can Malt Nigeria",
    "bulk": 190.0,
    "single": 10.0,
    "category": "Malt",
    "image": "https://www.pngkit.com/png/detail/110-1100836_guinness-png.png"
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
    "image": "https://www.supermart.ng/cdn/shop/files/OkeA1037x.webp?v=1706176283&width=460"
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
    "image": "https://www.amoragh.com/storage/products/grocery/beverages/kalyppo-multifruit.jpg"
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
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1483835088669061121-800x800.jpg"
  },
  {
    "id": 39,
    "name": "Multi Fruit (Small)",
    "bulk": null,
    "single": null,
    "category": "Juice",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1483835088669061121-800x800.jpg"
  },
  {
    "id": 40,
    "name": "Multi Fruit Kiki (6)",
    "bulk": 20.0,
    "single": null,
    "category": "Juice",
    "image": "https://www.tospinomall.com.gh/image/cache/catalog/1483835088669061121-800x800.jpg"
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
  const [checkout, setCheckout] = useState(false);
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = useMemo(() => products.filter(p =>
    (active === "All" || p.category === active) &&
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [active, query]);

  const price = p => mode === "single" ? p.single : p.bulk;
  const add = (id, type = mode) => setCart(c => {
    const key = `${id}-${type}`;
    return {...c, [key]: (c[key] || 0) + 1};
  });
  const remove = (id, type) => setCart(c => {
    const key = `${id}-${type}`;
    const n={...c};
    if (!n[key] || n[key] <= 1) delete n[key]; else n[key]--;
    return n;
  });

  const cartItems = Object.entries(cart).map(([key, qty]) => {
    const [id, type] = key.split("-");
    const p = products.find(x => String(x.id) === id);
    return p ? {p, type, qty, key} : null;
  }).filter(Boolean);
  const count = cartItems.reduce((a,item)=>a+item.qty,0);
  const total = cartItems.reduce((sum,item) => {
    const unit = Number(item.type === "single" ? item.p.single : item.p.bulk) || 0;
    return sum + unit * item.qty;
  }, 0);

  return <div className="app">
    <header className="header">
      <div className="brand">
        <div className="logo">S</div>
        <div><div className="brand-name">SIPZA</div><div className="tag">YOUR DRINKS. ONE CART.</div></div>
      </div>
      <button className="cart-icon" onClick={() => setCartOpen(true)}>
        <Icon size={23}><path d="M3 4h2l2 12h10l2-8H6"/><circle cx="9" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></Icon>
        {count > 0 && <b>{count}</b>}
      </button>
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
              <div className="price active"><small>Bulk</small><strong>{money(p.bulk)}</strong><button className="mini-add" onClick={()=>add(p.id,"bulk")}>+</button></div>
              <div className="price"><small>Single</small><strong>{money(p.single)}</strong><button className="mini-add" disabled={p.single == null} onClick={()=>add(p.id,"single")}>+</button></div>
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

    {checkout && <div className="overlay" onClick={()=>setCheckout(false)}>
      <aside className="sheet checkout-sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-head"><div><div className="eyebrow">CHECKOUT</div><h2>Delivery details</h2></div><button className="close" onClick={()=>setCheckout(false)}>×</button></div>
        <div className="checkout-form">
          <label>Full name<input placeholder="Enter your name"/></label>
          <label>Phone number<input placeholder="024 XXX XXXX" inputMode="tel"/></label>
          <label>Delivery location<textarea placeholder="Enter delivery address or location"></textarea></label>
          <div className="checkout-summary"><span>Order total</span><strong>{money(total)}</strong></div>
          <button className="pay-btn" onClick={()=>alert("Payment gateway will be connected next. Your checkout details are ready.")}>Proceed to Payment</button>
        </div>
      </aside>
    </div>}

    {cartOpen && <div className="overlay" onClick={()=>setCartOpen(false)}>
      <aside className="sheet" onClick={e=>e.stopPropagation()}>
        <div className="sheet-head"><div><div className="eyebrow">YOUR ORDER</div><h2>Your cart <small>({count})</small></h2></div><button className="close" onClick={()=>setCartOpen(false)}>×</button></div>
        <div className="cart-list">
          {cartItems.length===0 ? <div className="empty">Your cart is empty.</div> : cartItems.map(item=><div className="cart-row" key={item.key}>
            <div className="thumb"><ProductImage product={item.p}/></div>
            <div className="cart-name"><strong>{item.p.name}</strong><small>{item.type === "single" ? "Single" : "Bulk"} · {money(item.type === "single" ? item.p.single : item.p.bulk)}</small>
              <div className="qty"><button onClick={()=>remove(item.p.id,item.type)}>−</button><b>{item.qty}</b><button onClick={()=>add(item.p.id,item.type)}>+</button></div>
            </div>
            <strong>{money((Number(item.type === "single" ? item.p.single : item.p.bulk)||0)*item.qty)}</strong>
          </div>)}
        </div>
        <div className="total"><div><span>Total</span><strong>{money(total)}</strong></div><button onClick={()=>setCheckout(true)}>Checkout</button></div>
      </aside>
    </div>}
  </div>
}

createRoot(document.getElementById("root")).render(<App />);
