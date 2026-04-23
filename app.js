const tg = window.Telegram.WebApp;
tg.expand();
tg.ready();

// Mahsulotlar ro'yxati (Electro Club Uzbekistan maxsus)
const products = [
    {
        id: 1,
        name: "ECU Smart Controller",
        desc: "BYD Seal / Han miya bloki",
        price: 1450,
        img: "images/zaryatka.jpg.jpg"
    },
    {
        id: 2,
        name: "Voyah Battery Module",
        desc: "Litiy-ion 100kW modullar",
        price: 2200,
        img: "images/batareka.jpg.jpg"
    },
    {
        id: 3,
        name: "Inverter Cooling Fan",
        desc: "Sovutish tizimi datchigi bilan",
        price: 180,
        img: "images/inverter.jpg.jpg"
    }
];

// Navigatsiya funksiyasi
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(pageId).classList.remove('hidden');
    
    // Nav bar ikonkalari rangini o'zgartirish
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('text-gray-500');
    });
    event.currentTarget.classList.add('active');
    event.currentTarget.classList.remove('text-gray-500');

    // Vibratsiya
    tg.HapticFeedback.impactOccurred('light');
}

// Katalogga mahsulotlarni chiqarish
function initCatalog() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = products.map(p => 
        <div class="glass p-4 rounded-[2rem] flex items-center gap-4 border border-white/5">
            <div class="w-20 h-20 rounded-2xl bg-slate-800 overflow-hidden border border-white/10">
                <img src="${p.img}" class="w-full h-full object-cover opacity-80" alt="${p.name}" />
            </div>
            <div class="flex-1">
                <h4 class="font-bold text-base">${p.name}</h4>
                <p class="text-[10px] text-gray-500">${p.desc}</p>
                <div class="flex justify-between items-center mt-2">
                    <span class="text-cyan-400 font-black">$${p.price}</span>
                    <button onclick="buy('${p.name}')" class="w-9 h-9 rounded-xl bg-cyan-500 text-black flex items-center justify-center">
                        <i class="fa-solid fa-plus text-xs"></i>
                    </button>
                </div>
            </div>
        </div>
    ).join('');
}

// Sotib olish funksiyasi
function buy(name) {
    tg.HapticFeedback.notificationOccurred('success');
    tg.MainButton.text = `Buyurtma: ${name}`;
    tg.MainButton.show();
    
    tg.MainButton.onClick(() => {
        tg.sendData(JSON.stringify({order: name, club: "ECU"}));
        tg.close();
    });
}

// Ilovani boshlash
initCatalog();