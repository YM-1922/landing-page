/* ==========================================================================
   GREEN FLOW - Interactive Landing Page Scripts
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const toast = document.getElementById("toast");

  // 1. Sticky Header Scroll Shadow & Active Section Highlighting
  const sections = document.querySelectorAll("main section[id]");

  function updateHeaderAndNav() {
    if (window.scrollY > 12) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    const scrollPos = window.scrollY + 130;
    let currentId = "home";

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute("href").replace("#", "");
      link.classList.toggle("active", target === currentId);
    });
  }

  window.addEventListener("scroll", updateHeaderAndNav, { passive: true });
  updateHeaderAndNav();

  // 2. Mobile Navigation Drawer
  function closeMobileMenu() {
    mainNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // 3. Toast Helper
  let toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 4200);
  }

  // 4. App Download Buttons (Android Direct Link + iOS Coming Soon)
  const androidDownloadBtn = document.getElementById("androidDownloadBtn");
  const iosComingSoonBtn = document.getElementById("iosComingSoonBtn");
  const iosNotice = document.getElementById("iosNotice");

  if (androidDownloadBtn) {
    androidDownloadBtn.addEventListener("click", () => {
      showToast("جاري بدء تحميل تطبيق Green Flow للأندرويد...");
    });
  }

  if (iosComingSoonBtn) {
    iosComingSoonBtn.addEventListener("click", () => {
      if (iosNotice) {
        iosNotice.hidden = false;
      }
      showToast("نسخة iOS قيد التطوير وستتوفر قريباً! يمكنك تحميل نسخة Android الآن.");
    });
  }

  // 5. Interactive Farm Telemetry Preview Tabs (About Section)
  const zoneData = {
    a: {
      badge: "قطاع أ - محصول خضروات",
      ec: "2.1 dS/m",
      ecStatus: "ضمن المعدل الآمن",
      ecClass: "status-good",
      moisture: "68%",
      moistureStatus: "رطوبة مثالية",
      moistureClass: "status-good",
      water: "420 ppm",
      waterStatus: "مياه معالجة",
      waterClass: "status-good",
      pump: "نشط تلقائياً",
      pumpStatus: "توفير 34% مياه",
      pumpClass: "status-info",
    },
    b: {
      badge: "قطاع ب - أشجار فاكهة",
      ec: "2.9 dS/m",
      ecStatus: "تم تفعيل الغسيل الذكي",
      ecClass: "status-warn",
      moisture: "54%",
      moistureStatus: "ري مبرمج بعد ساعة",
      moistureClass: "status-info",
      water: "460 ppm",
      waterStatus: "جودة مستقرة",
      waterClass: "status-good",
      pump: "وضع المراقبة",
      pumpStatus: "توفير 29% مياه",
      pumpClass: "status-info",
    },
    c: {
      badge: "محطة المياه - وحدة المعالجة",
      ec: "1.4 dS/m",
      ecStatus: "كفاءة فلترة 96%",
      ecClass: "status-good",
      moisture: "100%",
      moistureStatus: "مخزون الخزان ممتلئ",
      moistureClass: "status-good",
      water: "380 ppm",
      waterStatus: "صالحة لكل المحاصيل",
      waterClass: "status-good",
      pump: "ضخ مستقر",
      pumpStatus: "طاقة شمسية 100%",
      pumpClass: "status-good",
    },
  };

  const zoneTabs = document.querySelectorAll(".zone-tab");
  const zoneBadge = document.getElementById("zoneBadge");
  const metricEc = document.getElementById("metricEc");
  const statusEc = document.getElementById("statusEc");
  const metricMoisture = document.getElementById("metricMoisture");
  const statusMoisture = document.getElementById("statusMoisture");
  const metricWater = document.getElementById("metricWater");
  const statusWater = document.getElementById("statusWater");
  const metricPump = document.getElementById("metricPump");
  const statusPump = document.getElementById("statusPump");

  zoneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const zoneKey = tab.dataset.zone;
      const data = zoneData[zoneKey];
      if (!data) return;

      zoneTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("active", active);
        t.setAttribute("aria-selected", String(active));
      });

      zoneBadge.textContent = data.badge;
      metricEc.textContent = data.ec;
      statusEc.textContent = data.ecStatus;
      statusEc.className = `metric-status ${data.ecClass}`;

      metricMoisture.textContent = data.moisture;
      statusMoisture.textContent = data.moistureStatus;
      statusMoisture.className = `metric-status ${data.moistureClass}`;

      metricWater.textContent = data.water;
      statusWater.textContent = data.waterStatus;
      statusWater.className = `metric-status ${data.waterClass}`;

      metricPump.textContent = data.pump;
      statusPump.textContent = data.pumpStatus;
      statusPump.className = `metric-status ${data.pumpClass}`;
    });
  });

  // 6. Farm Inspection & Contact Modal
  const modal = document.getElementById("inspectionModal");
  const openModalBtns = document.querySelectorAll(".open-inspection-modal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const inspectionForm = document.getElementById("inspectionForm");
  const formFeedback = document.getElementById("formFeedback");

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    const firstInput = document.getElementById("farmerName");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = "";
  }

  openModalBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeModal();
    }
  });

  if (inspectionForm) {
    inspectionForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("farmerName").value.trim();
      const phone = document.getElementById("farmerPhone").value.trim();
      const location = document.getElementById("farmLocation").value.trim();
      const service = document.getElementById("serviceNeed").value;

      if (!name || !phone || !location || !service) {
        formFeedback.textContent = "برجاء استكمال كافة الحقول المطلوبة لإرسال طلب المعاينة.";
        formFeedback.className = "form-feedback error";
        formFeedback.hidden = false;
        return;
      }

      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 8) {
        formFeedback.textContent = "برجاء إدخال رقم هاتف صحيح للتواصل.";
        formFeedback.className = "form-feedback error";
        formFeedback.hidden = false;
        return;
      }

      formFeedback.textContent = `شكراً لك يا ${name}! تم تسجيل طلب المعاينة لمنطقة (${location}) بنجاح، وسيتواصل معك فريق Green Flow قريباً.`;
      formFeedback.className = "form-feedback success";
      formFeedback.hidden = false;
      inspectionForm.reset();
      showToast("تم استلام طلب المعاينة بنجاح!");
    });
  }

  // 7. IntersectionObserver for Smooth Reveal Animations
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // 8. Dynamic Footer Year
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
});
