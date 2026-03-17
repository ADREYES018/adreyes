const site = {
  logoText: "Adriel Reyes",
  logoUrl: "",

  menu: [
    { label: "Experiences", url: "https://adrielreyes.my.canva.site/adshome/experiences" },
    { label: "About Me", url: "https://adrielreyes.my.canva.site/adshome/about-me" },
    { label: "Contact Me", url: "https://adrielreyes.my.canva.site/adshome/contact" }
  ],

  sideLabel: "Categories +",
  heroWord: "my works",
  categoryWord: "Graphic Design",
  endingTitle: "you finished this category.",
  endingButtonText: "want to go to next category?",
  endingButtonUrl: "#"
};

const projects = [
  {
    category: "PORTRAIT",
    title: "Project One",
    subtitle: "Editorial Campaign",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "BRAND",
    title: "Project Two",
    subtitle: "Commercial Shoot",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "FASHION",
    title: "Project Three",
    subtitle: "Studio Portraits",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "LIFESTYLE",
    title: "Project Four",
    subtitle: "Creative Direction",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "COVER",
    title: "Project Five",
    subtitle: "Magazine Feature",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "EDITORIAL",
    title: "Project Six",
    subtitle: "Storytelling Series",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "PORTRAIT",
    title: "Project Seven",
    subtitle: "Campaign Selects",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "COMMERCIAL",
    title: "Project Eight",
    subtitle: "Brand Launch",
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "FEATURE",
    title: "Project Nine",
    subtitle: "Visual Narrative",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  },
  {
    category: "SERIES",
    title: "Project Ten",
    subtitle: "Final Collection",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=1200&q=80",
    url: "#"
  }
];

function setupSiteContent() {
  const logoText = document.getElementById("logoText");
  const logoImage = document.getElementById("logoImage");
  const navMenu = document.getElementById("navMenu");
  const sideLabel = document.getElementById("sideLabel");
  const heroWord = document.getElementById("heroWord");
  const endingTitle = document.getElementById("endingTitle");
  const endingButton = document.getElementById("endingButton");
  const categoryWord = document.getElementById("categoryWord");

  if (site.logoUrl && logoImage) {
    logoImage.src = site.logoUrl;
    logoImage.style.display = "block";
    if (logoText) {
      logoText.style.display = "none";
    }
  } else {
    if (logoImage) {
      logoImage.style.display = "none";
    }
    if (logoText) {
      logoText.style.display = "inline";
      logoText.textContent = site.logoText;
    }
  }

  if (navMenu) {
    navMenu.innerHTML = site.menu
      .map((item) => `<a href="${item.url}">${item.label}</a>`)
      .join("");
  }

  if (sideLabel) sideLabel.textContent = site.sideLabel;
  if (heroWord) heroWord.textContent = site.heroWord;
  if (categoryWord) categoryWord.textContent = site.categoryWord;
  if (endingTitle) endingTitle.textContent = site.endingTitle;

  if (endingButton) {
    endingButton.textContent = site.endingButtonText;
    endingButton.href = site.endingButtonUrl || "#";
  }
}

function setupProjects() {
  const rail = document.getElementById("rail");
  if (!rail) return;

  rail.innerHTML = projects
    .map(
      (project) => `
        <a class="card media-card" href="${project.url}" target="_blank" rel="noopener noreferrer">
          <div class="image-frame">
            <img src="${project.image}" alt="${project.title}">
          </div>

          <div class="meta">
            <div class="category">${project.category}</div>
            <div class="rule"></div>
            <h2 class="title">${project.title}</h2>
            <p class="subtitle">— ${project.subtitle}</p>
          </div>
        </a>
      `
    )
    .join("");
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function mapProgress(value, start, end) {
  return clamp((value - start) / (end - start), 0, 1);
}

function updateHorizontalScroll() {
  const section = document.getElementById("trackSection");
  const rail = document.getElementById("rail");
  const heroWord = document.querySelector(".hero-word");
  const endingScreen = document.getElementById("endingScreen");
  const endingTitle = document.querySelector(".ending-title");
  const endingButton = document.querySelector(".ending-button");

  if (!section || !rail || !heroWord || !endingScreen || !endingTitle || !endingButton) {
    return;
  }

  const rect = section.getBoundingClientRect();
  const viewportH = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const maxScroll = section.offsetHeight - viewportH;
  const progress = clamp(-rect.top / maxScroll, 0, 1);

  const totalWidth = rail.scrollWidth;
  const visibleWidth = window.innerWidth;
  const distance = Math.max(totalWidth - visibleWidth, 0);

  rail.style.transform = `translateX(${-distance * progress}px)`;

  const heroStart = 0.015;
  const heroEnd = 0.16;
  const heroProgress = mapProgress(progress, heroStart, heroEnd);
  const heroEase = 1 - Math.pow(1 - heroProgress, 2.2);

  heroWord.style.opacity = String(1 - heroEase * 0.97);
  heroWord.style.filter = `blur(${heroEase * 16}px)`;

  const endingContainerStart = 0.97;
  const endingContainerEnd = 1.0;
  const endingContainerProgress = mapProgress(progress, endingContainerStart, endingContainerEnd);
  const endingContainerEase = 1 - Math.pow(1 - endingContainerProgress, 2);

  endingScreen.style.opacity = String(endingContainerEase);

  const titleStart = 0.975;
  const titleEnd = 1.0;
  const titleProgress = mapProgress(progress, titleStart, titleEnd);
  const titleEase = 1 - Math.pow(1 - titleProgress, 2);

  endingTitle.style.opacity = String(titleEase);
  endingTitle.style.transform = `translateY(${28 - titleEase * 28}px)`;
  endingTitle.style.filter = `blur(${14 - titleEase * 14}px)`;

  const buttonStart = 0.985;
  const buttonEnd = 1.0;
  const buttonProgress = mapProgress(progress, buttonStart, buttonEnd);
  const buttonEase = 1 - Math.pow(1 - buttonProgress, 2);

  endingButton.style.opacity = String(buttonEase);
  endingButton.style.transform = `translateY(${18 - buttonEase * 18}px)`;
  endingButton.style.filter = `blur(${8 - buttonEase * 8}px)`;
  endingButton.style.pointerEvents = buttonEase > 0.9 ? "auto" : "none";
}

function setSectionHeight() {
  const section = document.getElementById("trackSection");
  const rail = document.getElementById("rail");
  if (!section || !rail) return;

  const totalWidth = rail.scrollWidth;
  const extra = Math.max(totalWidth - window.innerWidth, 0);
  const vh = window.visualViewport ? window.visualViewport.height : window.innerHeight;
  const factor = 1.8;

  section.style.height = `${Math.max(extra * factor + vh * 1.4, vh * 8)}px`;
}

function initPage() {
  setupSiteContent();
  setupProjects();
  setSectionHeight();
  updateHorizontalScroll();
}

window.addEventListener("load", initPage);
window.addEventListener("resize", () => {
  setSectionHeight();
  updateHorizontalScroll();
});
window.addEventListener("scroll", updateHorizontalScroll, { passive: true });
