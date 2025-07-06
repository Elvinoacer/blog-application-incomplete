// class VisitorTracker {
//   constructor(options = {}) {
//     // Default options
//     this.options = {
//       cookieName: "visitor_id",
//       localStorageName: "visitor_data",
//       daysToExpire: 365,
//       trackPageViews: true,
//       showWelcomeMessage: false,
//       ...options,
//     };

//     this.visitorData = null;
//     this.init();
//   }

//   init() {
//     this.loadVisitorData();
//     this.trackVisit();

//     if (this.options.trackPageViews) {
//       this.trackPageView();
//     }

//     // Sync across tabs
//     window.addEventListener("storage", this.handleStorageEvent.bind(this));
//   }

//   generateId() {
//     return (
//       "vid_" +
//       Date.now().toString(36) +
//       Math.random().toString(36).substring(2, 10) +
//       performance.now().toString(36).replace(".", "")
//     );
//   }

//   loadVisitorData() {
//     // Try to get from cookie first
//     let visitorId = this.getCookie(this.options.cookieName);
//     let isFirstVisit = false;

//     // If no cookie, check localStorage
//     if (!visitorId) {
//       const lsData = localStorage.getItem(this.options.localStorageName);
//       if (lsData) {
//         try {
//           const data = JSON.parse(lsData);
//           visitorId = data.id;
//           // Update cookie with the ID from localStorage
//           this.setCookie(
//             this.options.cookieName,
//             visitorId,
//             this.options.daysToExpire
//           );
//         } catch (e) {
//           console.error("Error parsing visitor data:", e);
//         }
//       }
//     }

//     // If still no ID, generate new one
//     if (!visitorId) {
//       visitorId = this.generateId();
//       isFirstVisit = true;
//     }

//     this.visitorData = {
//       id: visitorId,
//       isFirstVisit,
//       firstVisitDate: isFirstVisit ? new Date() : null,
//       lastVisitDate: new Date(),
//       visitCount: 1,
//     };

//     // If we had localStorage data, merge it
//     const lsData = localStorage.getItem(this.options.localStorageName);
//     if (lsData && !isFirstVisit) {
//       try {
//         const existingData = JSON.parse(lsData);
//         this.visitorData.firstVisitDate =
//           existingData.firstVisitDate || new Date();
//         this.visitorData.visitCount = (existingData.visitCount || 0) + 1;
//       } catch (e) {
//         console.error("Error merging visitor data:", e);
//       }
//     }

//     this.saveVisitorData();
//   }

//   saveVisitorData() {
//     // Save to cookie
//     this.setCookie(
//       this.options.cookieName,
//       this.visitorData.id,
//       this.options.daysToExpire
//     );

//     // Save extended data to localStorage
//     localStorage.setItem(
//       this.options.localStorageName,
//       JSON.stringify(this.visitorData)
//     );

//     // Notify other tabs
//     localStorage.setItem("visitor_sync", Date.now());
//   }

//   trackVisit() {
//     console.log(
//       this.visitorData.isFirstVisit
//         ? `First visit! Visitor ID: ${this.visitorData.id}`
//         : `Welcome back! Visitor ID: ${this.visitorData.id}. This is visit #${this.visitorData.visitCount}`
//     );

//     if (this.options.showWelcomeMessage) {
//       this.showNotification(
//         this.visitorData.isFirstVisit
//           ? "Welcome! We're glad you're here."
//           : `Welcome back!`
//       );
//     }

//     // Send to analytics (implement your own sendToAnalytics method)
//     this.sendToAnalytics({
//       type: this.visitorData.isFirstVisit ? "first_visit" : "return_visit",
//       ...this.visitorData,
//     });
//   }

//   trackPageView() {
//     const now = new Date();
//     const pageData = {
//       url: window.location.href,
//       timestamp: now.toISOString(),
//       title: document.title,
//     };

//     // Get existing page views or initialize
//     const allPageViews = JSON.parse(
//       localStorage.getItem(`${this.options.localStorageName}_pageviews`) || "[]"
//     );

//     // Add new page view
//     allPageViews.push(pageData);

//     // Store (keep last 50 page views)
//     localStorage.setItem(
//       `${this.options.localStorageName}_pageviews`,
//       JSON.stringify(allPageViews.slice(-50))
//     );

//     this.sendToAnalytics({
//       type: "page_view",
//       ...pageData,
//       visitorId: this.visitorData.id,
//     });
//   }

//   handleStorageEvent(event) {
//     if (event.key === "visitor_sync") {
//       // Reload data when another tab updates it
//       this.loadVisitorData();
//     }
//   }

//   showNotification(message) {
//     // Simple notification - replace with your UI framework's notification system
//     const notice = document.createElement("div");
//     notice.style.position = "fixed";
//     notice.style.bottom = "20px";
//     notice.style.right = "20px";
//     notice.style.padding = "10px 20px";
//     notice.style.background = "#333";
//     notice.style.color = "white";
//     notice.style.borderRadius = "5px";
//     notice.style.zIndex = "10000";
//     notice.textContent = message;

//     document.body.appendChild(notice);

//     setTimeout(() => {
//       document.body.removeChild(notice);
//     }, 5000);
//   }

//   // Basic cookie utilities
//   setCookie(name, value, days) {
//     const date = new Date();
//     date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//     document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
//   }

//   getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(";").shift();
//   }

//   // Override this with your actual analytics implementation
//   sendToAnalytics(data) {
//     console.log("Analytics event:", data);
//     /*
//         // Example implementation:
//         fetch('/api/track', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(data)
//         });
//         */
//   }
// }

// // Usage example:
// document.addEventListener("DOMContentLoaded", () => {
//   const tracker = new VisitorTracker({
//     showWelcomeMessage: true,
//     trackPageViews: true,
//     // Add other options here
//   });

//   // You can access the visitor data anytime via:
//   // tracker.visitorData
// });

class VisitorTracker {
  constructor(options = {}) {
    // Default options
    this.options = {
      cookieName: "visitor_id",
      localStorageName: "visitor_data",
      daysToExpire: 365,
      trackPageViews: true,
      showWelcomeMessage: false,
      trackCountry: true, // New option to enable/disable country tracking
      ...options,
    };

    this.visitorData = null;
    this.init();
  }

  async init() {
    this.loadVisitorData();
    this.trackVisit();

    if (this.options.trackPageViews) {
      this.trackPageView();
    }

    if (this.options.trackCountry) {
      await this.detectAndLogCountry();
    }

    // Sync across tabs
    window.addEventListener("storage", this.handleStorageEvent.bind(this));
  }

  async detectAndLogCountry() {
    try {
      const countryData = await this.getCountryData();
      if (countryData) {
        console.log(
          `Visitor country detected: ${countryData.country} (${countryData.countryCode})`
        );

        // Store country data in visitorData
        this.visitorData.country = countryData.country;
        this.visitorData.countryCode = countryData.countryCode;
        this.saveVisitorData();
      }
    } catch (error) {
      console.error("Error detecting country:", error);
    }
  }

  async getCountryData() {
    try {
      // First try IP-based geolocation
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country_name,
          countryCode: data.country,
        };
      }
    } catch (ipApiError) {
      console.log("IP-based geolocation failed, trying browser language...");
    }

    // Fallback to browser language detection
    try {
      const userLang = navigator.language || navigator.userLanguage;
      if (userLang) {
        // Get the country part (after the - in en-US)
        const countryCode = userLang.split("-")[1] || userLang.split("_")[1];
        if (countryCode) {
          const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
          const countryName = regionNames.of(countryCode) || countryCode;
          return {
            country: countryName,
            countryCode: countryCode.toUpperCase(),
          };
        }
      }
    } catch (langError) {
      console.error("Language-based detection failed:", langError);
    }

    return null;
  }

  generateId() {
    return (
      "vid_" +
      Date.now().toString(36) +
      Math.random().toString(36).substring(2, 10) +
      performance.now().toString(36).replace(".", "")
    );
  }

  loadVisitorData() {
    // Try to get from cookie first
    let visitorId = this.getCookie(this.options.cookieName);
    let isFirstVisit = false;

    // If no cookie, check localStorage
    if (!visitorId) {
      const lsData = localStorage.getItem(this.options.localStorageName);
      if (lsData) {
        try {
          const data = JSON.parse(lsData);
          visitorId = data.id;
          // Update cookie with the ID from localStorage
          this.setCookie(
            this.options.cookieName,
            visitorId,
            this.options.daysToExpire
          );
        } catch (e) {
          console.error("Error parsing visitor data:", e);
        }
      }
    }

    // If still no ID, generate new one
    if (!visitorId) {
      visitorId = this.generateId();
      isFirstVisit = true;
    }

    this.visitorData = {
      id: visitorId,
      isFirstVisit,
      firstVisitDate: isFirstVisit ? new Date() : null,
      lastVisitDate: new Date(),
      visitCount: 1,
      country: null,
      countryCode: null,
    };

    // If we had localStorage data, merge it
    const lsData = localStorage.getItem(this.options.localStorageName);
    if (lsData && !isFirstVisit) {
      try {
        const existingData = JSON.parse(lsData);
        this.visitorData.firstVisitDate =
          existingData.firstVisitDate || new Date();
        this.visitorData.visitCount = (existingData.visitCount || 0) + 1;
        this.visitorData.country = existingData.country || null;
        this.visitorData.countryCode = existingData.countryCode || null;
      } catch (e) {
        console.error("Error merging visitor data:", e);
      }
    }

    this.saveVisitorData();
  }

  saveVisitorData() {
    // Save to cookie
    this.setCookie(
      this.options.cookieName,
      this.visitorData.id,
      this.options.daysToExpire
    );

    // Save extended data to localStorage
    localStorage.setItem(
      this.options.localStorageName,
      JSON.stringify(this.visitorData)
    );

    // Notify other tabs
    localStorage.setItem("visitor_sync", Date.now());
  }

  trackVisit() {
    const message = this.visitorData.isFirstVisit
      ? `First visit! Visitor ID: ${this.visitorData.id}`
      : `Welcome back! Visitor ID: ${this.visitorData.id}. This is visit #${this.visitorData.visitCount}`;

    console.log(message);

    if (this.visitorData.country) {
      console.log(
        `Country: ${this.visitorData.country} (${this.visitorData.countryCode})`
      );
    }

    if (this.options.showWelcomeMessage) {
      this.showNotification(
        this.visitorData.isFirstVisit
          ? "Welcome! We're glad you're here."
          : `Welcome back!`
      );
    }

    // Send to analytics
    this.sendToAnalytics({
      type: this.visitorData.isFirstVisit ? "first_visit" : "return_visit",
      ...this.visitorData,
    });
  }

  trackPageView() {
    const now = new Date();
    const pageData = {
      url: window.location.href,
      timestamp: now.toISOString(),
      title: document.title,
    };

    // Get existing page views or initialize
    const allPageViews = JSON.parse(
      localStorage.getItem(`${this.options.localStorageName}_pageviews`) || "[]"
    );

    // Add new page view
    allPageViews.push(pageData);

    // Store (keep last 50 page views)
    localStorage.setItem(
      `${this.options.localStorageName}_pageviews`,
      JSON.stringify(allPageViews.slice(-50))
    );

    this.sendToAnalytics({
      type: "page_view",
      ...pageData,
      visitorId: this.visitorData.id,
    });
  }

  handleStorageEvent(event) {
    if (event.key === "visitor_sync") {
      // Reload data when another tab updates it
      this.loadVisitorData();
    }
  }

  showNotification(message) {
    // Simple notification - replace with your UI framework's notification system
    const notice = document.createElement("div");
    notice.style.position = "fixed";
    notice.style.bottom = "20px";
    notice.style.right = "20px";
    notice.style.padding = "10px 20px";
    notice.style.background = "#333";
    notice.style.color = "white";
    notice.style.borderRadius = "5px";
    notice.style.zIndex = "10000";
    notice.textContent = message;

    document.body.appendChild(notice);

    setTimeout(() => {
      document.body.removeChild(notice);
    }, 5000);
  }

  // Basic cookie utilities
  setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
  }

  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  // Override this with your actual analytics implementation
  sendToAnalytics(data) {
    console.log("Analytics event:", data);
    /*
    // Example implementation:
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    */
  }
}

// Usage example:
document.addEventListener("DOMContentLoaded", () => {
  const tracker = new VisitorTracker({
    showWelcomeMessage: true,
    trackPageViews: true,
    trackCountry: true,
  });
});
