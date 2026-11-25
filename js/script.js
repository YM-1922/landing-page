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

  // 6. Farm Inspection & Contact Modal (Google Apps Script Integration)
  const modal = document.getElementById("inspectionModal");
  const openModalBtns = document.querySelectorAll(".open-inspection-modal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const inspectionForm = document.getElementById("inspectionForm");
  const formFeedback = document.getElementById("formFeedback");
  const submitBtn = document.getElementById("submitInspectionBtn") || (inspectionForm ? inspectionForm.querySelector('button[type="submit"]') : null);
  const submitBtnText = document.getElementById("submitBtnText") || (submitBtn ? submitBtn.querySelector("span") : null);

  const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxOGKMGak4JKRczcuQqNPTOh9kkMoVLgzpXYJwTI7deZ7rr0Y6mjPFSkrmcU8d-uqAh/exec";

  let isSubmitting = false;

  function openModal() {
    if (!modal) return;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    if (formFeedback) {
      formFeedback.hidden = true;
      formFeedback.textContent = "";
      formFeedback.className = "form-feedback";
    }
    const firstInput = document.getElementById("farmerName");
    if (firstInput) firstInput.focus();
  }

  function closeModal() {
    if (!modal) return;
    if (isSubmitting) return; // Prevent closing while request is in flight
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

  function showFormError(message, inputToFocus) {
    if (formFeedback) {
      formFeedback.textContent = message;
      formFeedback.className = "form-feedback error";
      formFeedback.hidden = false;
    }
    if (inputToFocus) {
      inputToFocus.focus();
    }
  }

  function toggleFormState(loading) {
    if (submitBtn) {
      submitBtn.disabled = loading;
      if (loading) {
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span><span>جاري إرسال الطلب...</span>';
      } else {
        submitBtn.removeAttribute("aria-busy");
        submitBtn.innerHTML = '<span id="submitBtnText">إرسال طلب المعاينة</span>';
      }
    }

    if (inspectionForm) {
      const formElements = inspectionForm.querySelectorAll("input, select, textarea");
      formElements.forEach((el) => {
        el.disabled = loading;
      });
    }
  }

  if (inspectionForm) {
    inspectionForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (isSubmitting) return;

      const nameInput = document.getElementById("farmerName");
      const phoneInput = document.getElementById("farmerPhone");
      const locationInput = document.getElementById("farmLocation");
      const serviceSelect = document.getElementById("serviceNeed");
      const notesInput = document.getElementById("farmNotes");

      const name = nameInput ? nameInput.value.trim() : "";
      const phone = phoneInput ? phoneInput.value.trim() : "";
      const location = locationInput ? locationInput.value.trim() : "";
      const serviceValue = serviceSelect ? serviceSelect.value : "";
      const selectedOption = serviceSelect && serviceSelect.selectedIndex >= 0 ? serviceSelect.options[serviceSelect.selectedIndex] : null;
      const problem = (selectedOption && selectedOption.value) ? selectedOption.text.trim() : "";
      const notes = notesInput ? notesInput.value.trim() : "";

      // Validation
      if (!name) {
        showFormError("برجاء إدخال الاسم بالكامل.", nameInput);
        return;
      }
      if (name.length < 3) {
        showFormError("برجاء إدخال اسم صحيح مكون من 3 أحرف على الأقل.", nameInput);
        return;
      }

      if (!phone) {
        showFormError("برجاء إدخال رقم الهاتف للتواصل.", phoneInput);
        return;
      }
      const phoneDigits = phone.replace(/\D/g, "");
      if (phoneDigits.length < 8 || phoneDigits.length > 15) {
        showFormError("برجاء إدخال رقم هاتف صحيح للتواصل (مثال: 01xxxxxxxxx).", phoneInput);
        return;
      }

      if (!location) {
        showFormError("برجاء إدخال المحافظة أو موقع المزرعة.", locationInput);
        return;
      }

      if (!serviceValue || !problem) {
        showFormError("برجاء اختيار المشكلة الأساسية أو الخدمة المطلوبة.", serviceSelect);
        return;
      }

      // Hide prior errors
      if (formFeedback) {
        formFeedback.hidden = true;
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
      }

      isSubmitting = true;
      toggleFormState(true);

      const payload = {
        name,
        phone,
        location,
        problem,
        notes
      };

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35000);

        const response = await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          redirect: "follow",
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        let data;
        try {
          data = await response.json();
        } catch (jsonErr) {
          throw new Error("تعذر قراءة استجابة الخادم.");
        }

        if (!data || (data.success !== true && data.status !== "success")) {
          const serverMsg = data && data.message ? data.message : "لم يتم تأكيد حفظ الطلب في النظام.";
          throw new Error(serverMsg);
        }

        // Confirmed Success
        if (formFeedback) {
          formFeedback.textContent = `تم تسجيل طلب المعاينة بنجاح يا ${name}! سيتواصل معك فريق Green Flow في أقرب وقت لتحديد موعد الزيارة لموقعك في (${location}).`;
          formFeedback.className = "form-feedback success";
          formFeedback.hidden = false;
        }

        // Reset form ONLY on confirmed success
        inspectionForm.reset();
        showToast("تم استلام طلب المعاينة بنجاح!");
      } catch (err) {
        console.error("Submission failed:", err);

        let userMsg = "حدث خطأ أثناء إرسال الطلب. برجاء التأكد من اتصال الإنترنت والمحاولة مرة أخرى.";
        if (err.name === "AbortError") {
          userMsg = "استغرق الخادم وقتاً أطول من المتوقع للاستجابة. برجاء المحاولة مجدداً.";
        } else if (err.message && !err.message.includes("fetch")) {
          userMsg = err.message;
        }

        if (formFeedback) {
          formFeedback.textContent = userMsg;
          formFeedback.className = "form-feedback error";
          formFeedback.hidden = false;
        }
        showToast("تعذر إرسال الطلب، برجاء المحاولة لاحقاً.");
      } finally {
        isSubmitting = false;
        toggleFormState(false);
      }
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
