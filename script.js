const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const modal = document.querySelector("[data-modal]");
const openModalButtons = document.querySelectorAll("[data-open-modal]");
const closeModalButton = document.querySelector("[data-close-modal]");
const infoModal = document.querySelector("[data-info-modal]");
const infoButtons = document.querySelectorAll("[data-info]");
const closeInfoButtons = document.querySelectorAll("[data-close-info], [data-close-info-bottom]");
const carGrid = document.querySelector("[data-car-grid]");
const inventoryCount = document.querySelector("[data-inventory-count]");
const heroVideos = document.querySelectorAll("[data-hero-video]");
const sceneDots = document.querySelectorAll("[data-scene-dot]");
const sceneStep = document.querySelector("[data-scene-step]");
const sceneTitle = document.querySelector("[data-scene-title]");
const sceneText = document.querySelector("[data-scene-text]");

const heroScenes = [
  {
    step: "01 / 07",
    title: "Авто проходить перший шлях до перевірки",
    text: "Ми починаємо з реального сценарію: машина в русі, поведінка на дорозі, звук і перші сигнали стану.",
  },
  {
    step: "02 / 07",
    title: "Механіки обговорюють технічний стан",
    text: "Команда пояснює клієнту кузов, двигун, електроніку, ризики ремонту і чесну ціну перед покупкою.",
  },
  {
    step: "03 / 07",
    title: "Клієнти з різних країн говорять із CheckDrive",
    text: "Ми супроводжуємо підбір дистанційно: відеозв'язок, звіти, фото, документи й прозорий статус кожного етапу.",
  },
  {
    step: "04 / 07",
    title: "Діагностика двигуна перед рішенням",
    text: "Механік перевіряє підкапотний простір, рідини, сліди ремонту, витоки й те, що не видно на фото оголошення.",
  },
  {
    step: "05 / 07",
    title: "Детейлінг показує реальний стан кузова",
    text: "Чисте світло, лак, салон і дрібні дефекти допомагають зрозуміти, як за автомобілем доглядали до продажу.",
  },
  {
    step: "06 / 07",
    title: "Огляд знизу і фінальний технічний звіт",
    text: "Перевіряємо підвіску, гальма, захист, днище й складаємо короткий висновок: купувати, торгуватися чи відмовитись.",
  },
  {
    step: "07 / 07",
    title: "Після перевірки ви отримуєте зрозуміле рішення",
    text: "Ми не просто показуємо авто. Ми пояснюємо ризики, бюджет після покупки і допомагаємо довести угоду до ключів.",
  },
];

const inventoryModels = {
  sport: [
    ["Porsche", "911 Carrera"],
    ["BMW", "M4 Competition"],
    ["Audi", "RS5 Coupe"],
    ["Mercedes-AMG", "C 63 S"],
    ["Chevrolet", "Corvette Stingray"],
    ["Ford", "Mustang GT"],
    ["Toyota", "GR Supra"],
    ["Nissan", "Z Performance"],
  ],
  electric: [
    ["Tesla", "Model 3 Long Range"],
    ["Tesla", "Model Y Performance"],
    ["Porsche", "Taycan 4S"],
    ["Hyundai", "Ioniq 5"],
    ["Kia", "EV6 GT"],
    ["Audi", "Q4 e-tron"],
    ["BMW", "i4 eDrive40"],
    ["Mercedes-Benz", "EQE 350"],
  ],
  suv: [
    ["Range Rover", "Sport"],
    ["BMW", "X5 xDrive40i"],
    ["Audi", "Q7 S line"],
    ["Mercedes-Benz", "GLE 450"],
    ["Volvo", "XC90"],
    ["Toyota", "Land Cruiser"],
    ["Lexus", "RX 500h"],
    ["Porsche", "Cayenne"],
  ],
};

const categoryLabels = {
  sport: "Sport",
  electric: "Electric",
  suv: "SUV",
};

const formatUsd = (value) => `$${value.toLocaleString("en-US")}`;

const modelPhotoQueries = {
  "Porsche 911 Carrera": "assets/cars/porsche-911-carrera.jpg",
  "BMW M4 Competition": "assets/cars/bmw-m4-competition.jpg",
  "Audi RS5 Coupe": "assets/cars/audi-rs5-coupe.jpg",
  "Nissan Z Performance": "assets/cars/nissan-z-performance.jpg",
  "Tesla Model Y Performance": "assets/cars/tesla-model-y-performance.jpg",
  "Porsche Taycan 4S": "assets/cars/porsche-taycan-4s.jpg",
  "Toyota Land Cruiser": "assets/cars/toyota-land-cruiser.png",
};

const createCarPhotoUrl = ({ title, index }) => {
  const photo = modelPhotoQueries[title];

  if (!photo) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 430">
        <rect width="700" height="430" fill="#171b20"/>
        <text x="42" y="205" fill="#ffffff" font-family="Arial, sans-serif" font-size="34" font-weight="800">${title}</text>
        <text x="42" y="250" fill="#d8a84b" font-family="Arial, sans-serif" font-size="20" font-weight="700">Фото очікує перевірки</text>
      </svg>
    `)}`;
  }

  return photo;
};

const refreshCarArtwork = () => {
  if (!carGrid) return;

  carGrid.querySelectorAll(".car-card").forEach((card, index) => {
    const category = card.dataset.category || "sport";
    const title = card.querySelector("h3")?.textContent || `CheckDrive ${index + 1}`;
    const image = card.querySelector("img");

    if (!image) return;

    image.src = createCarPhotoUrl({ title, index });
    image.alt = title;
    image.loading = "lazy";
  });
};

const buildInventory = () => {
  if (!carGrid) return;

  const fragment = document.createDocumentFragment();
  const categories = ["sport", "electric", "suv"];
  const currentCards = carGrid.querySelectorAll(".car-card").length;
  const targetCount = 500;

  for (let index = currentCards; index < targetCount; index += 1) {
    const category = categories[index % categories.length];
    const models = inventoryModels[category];
    const [brand, model] = models[index % models.length];
    const year = 2018 + (index % 9);
    const mileage = 8 + ((index * 7) % 118);
    const price = 24000 + ((index * 1370) % 126000);
    const power = category === "electric" ? `${260 + ((index * 11) % 360)} кВт` : `${210 + ((index * 13) % 420)} к.с.`;
    const drivetrain = category === "sport" ? "RWD" : index % 2 === 0 ? "AWD" : "4x4";

    const card = document.createElement("article");
    card.className = "car-card";
    card.dataset.category = category;

    const image = document.createElement("img");
    image.src = createCarPhotoUrl({ title: `${brand} ${model}`, index });
    image.alt = `${brand} ${model}`;
    image.loading = "lazy";

    const body = document.createElement("div");

    const label = document.createElement("span");
    label.textContent = categoryLabels[category];

    const title = document.createElement("h3");
    title.textContent = `${brand} ${model}`;

    const details = document.createElement("p");
    details.textContent = `${year} · ${mileage} тис. км · ${power} · ${drivetrain}`;

    const meta = document.createElement("div");
    meta.className = "car-meta";

    const status = document.createElement("small");
    status.textContent = index % 5 === 0 ? "Під замовлення" : "У наявності";

    const priceTag = document.createElement("strong");
    priceTag.className = "car-price";
    priceTag.textContent = formatUsd(price);

    meta.append(status, priceTag);
    body.append(label, title, details, meta);
    card.append(image, body);
    fragment.append(card);
  }

  carGrid.append(fragment);
  refreshCarArtwork();

  if (inventoryCount) {
    inventoryCount.textContent = carGrid.querySelectorAll(".car-card").length;
  }
};

buildInventory();

const infoContent = {
  sport: {
    label: "Гайд",
    title: "Як вибрати спортивне авто, яке не з'їсть бюджет на сервісі",
    intro:
      "Спортивна машина має дарувати емоції, але перед купівлею важливо дивитися не тільки на розгін і звук. Найкращий варіант - той, де історія обслуговування така ж переконлива, як і зовнішній вигляд.",
    points: [
      "Перевірте сервісну історію: регулярне ТО, заміна гальм, шин, рідин і робота з підвіскою часто важливіші за пробіг.",
      "Оцініть реальну вартість володіння: страховка, шини, витрата пального, податки, деталі й частота планового сервісу.",
      "Попросіть діагностику двигуна, коробки, турбіни або повного приводу, якщо вони є. Дорогі вузли краще перевірити до торгу.",
      "Зверніть увагу на тюнінг. Якісні доопрацювання можуть бути плюсом, але невідомі прошивки й дешеві деталі збільшують ризик.",
    ],
    noteTitle: "Порада CheckDrive",
    note: "Для першого спорткара часто розумніше брати не найекстремальнішу версію, а збалансовану комплектацію з прозорою історією й живою ліквідністю.",
  },
  inspection: {
    label: "Сервіс",
    title: "Передпродажна діагностика: 18 пунктів, які не можна пропустити",
    intro:
      "Передпродажна перевірка потрібна не для того, щоб знайти ідеальне авто. Вона допомагає зрозуміти реальний стан машини, чесну ціну й те, що доведеться зробити одразу після покупки.",
    points: [
      "Кузов: товщина фарби, зазори, сліди ремонту, корозія, стан скла, фар, кріплень і силових елементів.",
      "Техніка: холодний запуск, робота двигуна, коробки, підвіски, гальм, рульового управління й систем охолодження.",
      "Електроніка: помилки в блоках, робота асистентів, клімату, мультимедіа, камер, датчиків і ключів.",
      "Документи: VIN, історія ДТП, застави, обмеження, кількість власників, сервісні записи й відповідність комплектації.",
    ],
    noteTitle: "Що дає перевірка",
    note: "Після діагностики можна або спокійно купувати, або аргументовано торгуватися, або вчасно відмовитися від проблемного автомобіля.",
  },
  electric: {
    label: "Electric",
    title: "Електрокар у 2026: коли він справді вигідніший за бензин",
    intro:
      "Електрокар стає вигідним, коли його сценарій збігається з вашим життям: щоденні поїздки, доступ до зарядки, прогнозований маршрут і розуміння деградації батареї.",
    points: [
      "Порахуйте домашню або офісну зарядку. Якщо заряджаєтесь переважно там, економія відчутна вже в перші місяці.",
      "Перевірте батарею: залишкова ємність, швидкість зарядки, історія швидких зарядок і температурний режим дуже впливають на ресурс.",
      "Оцініть зимовий запас ходу. Реальний пробіг у холодну погоду може бути нижчим, особливо без теплового насоса.",
      "Порівняйте сервіс: менше витрат на масло й гальма, але дорожчі кузовні деталі, електроніка й страхування в окремих моделях.",
    ],
    noteTitle: "Коли це найкращий вибір",
    note: "Якщо ви проїжджаєте багато містом і маєте зручну зарядку, електрокар часто дає найкращий баланс тиші, динаміки й витрат.",
  },
};

const setHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
});

let activeHeroScene = 0;
let heroSceneTimer;

const setHeroScene = (sceneIndex) => {
  if (!heroVideos.length) return;

  activeHeroScene = sceneIndex % heroScenes.length;
  const scene = heroScenes[activeHeroScene];

  heroVideos.forEach((video, index) => {
    const isActive = index === activeHeroScene;
    video.classList.toggle("is-active", isActive);

    if (isActive) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });

  sceneDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeHeroScene);
  });

  if (sceneStep) sceneStep.textContent = scene.step;
  if (sceneTitle) sceneTitle.textContent = scene.title;
  if (sceneText) sceneText.textContent = scene.text;
};

const startHeroScenes = () => {
  window.clearInterval(heroSceneTimer);
  heroSceneTimer = window.setInterval(() => {
    setHeroScene(activeHeroScene + 1);
  }, 6500);
};

setHeroScene(0);
startHeroScenes();

sceneDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    setHeroScene(Number(dot.dataset.sceneDot));
    startHeroScenes();
  });
});

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    document.querySelectorAll(".car-card").forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const statsObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const number = entry.target;
      const target = Number(number.dataset.count);
      const duration = 900;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        number.textContent = `${Math.round(target * eased)}+`;

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
      observer.unobserve(number);
    });
  },
  { threshold: 0.45 },
);

document.querySelectorAll("[data-count]").forEach((number) => statsObserver.observe(number));

const openModal = () => {
  if (typeof modal.showModal === "function") {
    modal.showModal();
    document.body.classList.add("modal-open");
  }
};

openModalButtons.forEach((button) => button.addEventListener("click", openModal));

closeModalButton.addEventListener("click", () => {
  modal.close();
  document.body.classList.remove("modal-open");
});

modal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

infoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const content = infoContent[button.dataset.info];
    if (!content || typeof infoModal.showModal !== "function") return;

    infoModal.querySelector("[data-info-label]").textContent = content.label;
    infoModal.querySelector("[data-info-title]").textContent = content.title;
    infoModal.querySelector("[data-info-intro]").textContent = content.intro;
    infoModal.querySelector("[data-info-note-title]").textContent = content.noteTitle;
    infoModal.querySelector("[data-info-note]").textContent = content.note;

    const list = infoModal.querySelector("[data-info-list]");
    list.replaceChildren(
      ...content.points.map((point) => {
        const item = document.createElement("li");
        item.textContent = point;
        return item;
      }),
    );

    infoModal.showModal();
    document.body.classList.add("modal-open");
  });
});

closeInfoButtons.forEach((button) => {
  button.addEventListener("click", () => {
    infoModal.close();
    document.body.classList.remove("modal-open");
  });
});

infoModal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.reset();

    if (form.closest("dialog")) {
      modal.close();
    }
  });
});
