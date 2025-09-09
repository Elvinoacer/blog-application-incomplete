const fs = require("fs");
const data = require("../data.json");

function generateTechReportHTML(data, reportId = null) {
  // Generate a report ID if not provided
  const generatedReportId =
    reportId ||
    `techrep_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedDateTime = currentDate.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });

  // Function to convert markdown to HTML (simplified version)
  function markdownToHTML(markdown) {
    return (
      markdown
        // Headers
        .replace(/^# (.*$)/gim, "<h1>$1</h1>")
        .replace(/^## (.*$)/gim, "<h2>$1</h2>")
        .replace(/^### (.*$)/gim, "<h3>$1</h3>")
        .replace(/^#### (.*$)/gim, "<h4>$1</h4>")
        // Bold
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Lists
        .replace(/^- (.*$)/gim, "<li>$1</li>")
        .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>")
        // Paragraphs
        .replace(/^\s*(\n)?(.+)/gim, function (m) {
          return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
            ? m
            : "<p>" + m + "</p>";
        })
        // Line breaks
        .replace(/\n$/g, "<br/>")
    );
  }

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${data.topic}</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
    />
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      }

      body {
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        color: #333;
        line-height: 1.6;
        padding: 15px;
        min-height: 100vh;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      /* Header Styles */
      .header {
        text-align: center;
        padding: 25px 15px;
        margin-bottom: 25px;
        background: linear-gradient(120deg, #2c3e50, #4ca1af);
        color: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      }

      .header h1 {
        font-size: 1.8rem;
        margin-bottom: 12px;
        font-weight: 700;
        line-height: 1.3;
        word-wrap: break-word;
      }

      .header p {
        font-size: 1rem;
        opacity: 0.9;
        margin-bottom: 15px;
      }

      .metadata {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 15px;
        font-size: 0.85rem;
        align-items: center;
      }

      .metadata span {
        background: rgba(255, 255, 255, 0.2);
        padding: 6px 12px;
        border-radius: 20px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
      }

      /* Content Layout */
      .content {
        display: grid;
        grid-template-columns: 1fr;
        gap: 25px;
      }

      /* Main Content */
      .report-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        padding: 20px;
        margin-bottom: 25px;
      }

      .report-card h2 {
        color: #2c3e50;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border-bottom: 2px solid #4ca1af;
        font-size: 1.4rem;
      }

      .report-content {
        font-size: 1rem;
        line-height: 1.7;
      }

      .report-content h1 {
        font-size: 1.6rem;
        color: #2c3e50;
        margin: 25px 0 15px;
        line-height: 1.3;
      }

      .report-content h2 {
        font-size: 1.4rem;
        color: #2c3e50;
        margin: 25px 0 15px;
        line-height: 1.3;
      }

      .report-content h3 {
        font-size: 1.2rem;
        color: #3498db;
        margin: 20px 0 12px;
        line-height: 1.3;
      }

      .report-content h4 {
        font-size: 1.1rem;
        color: #2c3e50;
        margin: 18px 0 10px;
        line-height: 1.3;
      }

      .report-content p {
        margin-bottom: 15px;
        color: #444;
        line-height: 1.7;
        text-align: justify;
      }

      .report-content ul {
        margin: 15px 0;
        padding-left: 20px;
      }

      .report-content li {
        margin-bottom: 10px;
        line-height: 1.6;
      }

      .highlight {
        background: linear-gradient(120deg, #a8e063, #56ab2f);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
        font-size: 0.95rem;
      }

      .highlight ul {
        margin: 10px 0;
        padding-left: 20px;
      }

      .highlight li {
        margin-bottom: 8px;
      }

      .news-item {
        border-left: 4px solid #3498db;
        padding: 12px 15px;
        margin: 18px 0;
        background: #f8f9fa;
        border-radius: 0 8px 8px 0;
      }

      .news-date {
        font-weight: 600;
        color: #2c3e50;
        margin-bottom: 5px;
        font-size: 0.9rem;
      }

      .news-source a {
        color: #3498db;
        text-decoration: none;
        transition: color 0.3s;
        font-size: 0.9rem;
      }

      .news-source a:hover {
        color: #2980b9;
        text-decoration: underline;
      }

      /* Sidebar */
      .sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
        padding: 20px;
      }

      .card h3 {
        color: #2c3e50;
        margin-bottom: 15px;
        padding-bottom: 8px;
        border-bottom: 2px solid #4ca1af;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1.2rem;
      }

      .link-item,
      .image-item {
        padding: 10px;
        margin: 8px 0;
        border-radius: 8px;
        background: #f8f9fa;
        transition: all 0.3s ease;
      }

      .link-item:hover {
        transform: translateX(3px);
        background: #e8f4fc;
      }

      .link-item a {
        color: #3498db;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.95rem;
        word-break: break-word;
      }

      .link-item a:hover {
        text-decoration: underline;
      }

      .image-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 12px;
        margin-top: 12px;
      }

      .image-item {
        overflow: hidden;
        border-radius: 8px;
        height: 150px;
        position: relative;
      }

      .image-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      .image-item:hover img {
        transform: scale(1.05);
      }

      .image-description {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 5px 8px;
        font-size: 0.75rem;
        line-height: 1.3;
      }

      /* Footer */
      .footer {
        text-align: center;
        margin-top: 35px;
        padding: 15px;
        color: #7f8c8d;
        font-size: 0.85rem;
      }

      .tag {
        display: inline-block;
        background: #e8f4fc;
        color: #3498db;
        padding: 4px 10px;
        border-radius: 20px;
        font-size: 0.75rem;
        margin: 3px;
        white-space: nowrap;
      }

      .divider {
        height: 1px;
        background: linear-gradient(to right, transparent, #ccc, transparent);
        margin: 20px 0;
      }

      /* Mobile First Media Queries */
      @media (min-width: 480px) {
        body {
          padding: 20px;
        }
        
        .header h1 {
          font-size: 2rem;
        }
        
        .metadata {
          flex-direction: row;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .image-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 768px) {
        .header {
          padding: 30px 20px;
        }
        
        .header h1 {
          font-size: 2.2rem;
        }
        
        .header p {
          font-size: 1.1rem;
        }
        
        .content {
          grid-template-columns: 2fr 1fr;
          gap: 30px;
        }
        
        .report-card {
          padding: 25px;
        }
        
        .card {
          padding: 25px;
        }
        
        .report-content h1 {
          font-size: 1.8rem;
        }
        
        .report-content h2 {
          font-size: 1.6rem;
        }
        
        .report-content h3 {
          font-size: 1.3rem;
        }
      }

      @media (min-width: 1024px) {
        .header h1 {
          font-size: 2.5rem;
        }
        
        .header p {
          font-size: 1.2rem;
        }
        
        .report-card {
          padding: 30px;
        }
        
        .card {
          padding: 25px;
        }
        
        .report-content {
          font-size: 1.05rem;
        }
        
        .image-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .image-item {
          height: 120px;
        }
      }

      @media (min-width: 1200px) {
        .header h1 {
          font-size: 2.8rem;
        }
        
        .content {
          gap: 40px;
        }
      }

      /* Touch device optimizations */
      @media (hover: none) {
        .link-item:hover {
          transform: none;
        }
        
        .image-item:hover img {
          transform: none;
        }
      }

      /* High contrast mode support */
      @media (prefers-contrast: high) {
        .header {
          background: #2c3e50;
        }
        
        .highlight {
          background: #2c3e50;
        }
        
        .link-item a {
          color: #0056b3;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
          animation: none !important;
        }
        
        .link-item:hover {
          transform: none;
        }
        
        .image-item img {
          transition: none;
        }
      }

      /* Print styles */
      @media print {
        body {
          background: white !important;
          color: black !important;
          padding: 0;
        }
        
        .container {
          max-width: none;
          box-shadow: none;
        }
        
        .header {
          background: white !important;
          color: black !important;
          box-shadow: none;
          border: 2px solid black;
        }
        
        .report-card, .card {
          box-shadow: none;
          border: 1px solid #ccc;
        }
        
        .link-item a::after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          color: #666;
        }
        
        .image-item {
          break-inside: avoid;
        }
        
        .footer {
          border-top: 1px solid #ccc;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>${data.topic}</h1>
        <p>Comprehensive analysis and insights on the latest developments</p>
        <div class="metadata">
          <span><i class="fas fa-calendar-alt"></i> ${formattedDate}</span>
          <span><i class="fas fa-id-card"></i> Report ID: ${generatedReportId}</span>
        </div>
      </div>

      <div class="content">
        <div class="main-content">
          <div class="report-card">
            <h2><i class="fas fa-newspaper"></i> Detailed Report</h2>
            <div class="report-content">
              ${markdownToHTML(data.detailedReport)}
            </div>
          </div>
        </div>

        <div class="sidebar">
          <div class="card">
            <h3><i class="fas fa-link"></i> Related Links</h3>
            ${data.links
              .map(
                (link) => `
              <div class="link-item">
                <a href="${link.url}" target="_blank" rel="noopener noreferrer">
                  <i class="fas fa-external-link-alt"></i> ${link.description}
                </a>
              </div>
            `
              )
              .join("")}
          </div>

          ${
            data.images && data.images.length > 0
              ? `
          <div class="card">
            <h3><i class="fas fa-image"></i> Related Images</h3>
            <div class="image-grid">
              ${data.images
                .map(
                  (image) => `
                <div class="image-item">
                  <img src="${image.url}" alt="${image.description}" loading="lazy" />
                  <div class="image-description">${image.description}</div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
          `
              : ""
          }

          <div class="card">
            <h3><i class="fas fa-video"></i> Related Videos</h3>
            ${
              data.videos && data.videos.length > 0
                ? data.videos
                    .map(
                      (video) => `
                <div class="link-item">
                  <a href="${
                    video.url
                  }" target="_blank" rel="noopener noreferrer">
                    <i class="fas fa-play-circle"></i> ${
                      video.description || "Watch video"
                    }
                  </a>
                </div>
              `
                    )
                    .join("")
                : "<p>No videos available at the moment.</p>"
            }
          </div>

          <div class="card">
            <h3><i class="fas fa-tags"></i> Tags</h3>
            <div>
              <span class="tag">Technology</span>
              <span class="tag">Quantum Computing</span>
              <span class="tag">Error Correction</span>
              <span class="tag">Innovation</span>
              <span class="tag">Research</span>
              <span class="tag">Algorithms</span>
            </div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="footer">
        <p>Report generated on ${formattedDateTime}</p>
        <p>© ${currentDate.getFullYear()} Tech Industry Report. All rights reserved.</p>
      </div>
    </div>

    <script>
      // Enhanced mobile touch interactions
      document.addEventListener('DOMContentLoaded', function() {
        // Add touch feedback for mobile devices
        const linkItems = document.querySelectorAll('.link-item');
        linkItems.forEach(item => {
          item.addEventListener('touchstart', function() {
            this.style.backgroundColor = '#e8f4fc';
          });
          
          item.addEventListener('touchend', function() {
            this.style.backgroundColor = '#f8f9fa';
          });
        });

        // Lazy loading for images
        if ('loading' in HTMLImageElement.prototype) {
          const images = document.querySelectorAll('img[loading="lazy"]');
          images.forEach(img => {
            img.src = img.src;
          });
        }

        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        });
      });
    </script>
  </body>
</html>`;

  return htmlContent;
}

// Function to save the generated HTML to a file
function generateAndSaveReport(data, filename = "tech-report.html") {
  try {
    const htmlContent = generateTechReportHTML(data);
    fs.writeFileSync(filename, htmlContent, "utf8");
    console.log(`✅ Report successfully generated and saved as ${filename}`);
    console.log(`📱 Mobile-optimized with responsive design`);
    return true;
  } catch (error) {
    console.error("❌ Error generating report:", error);
    return false;
  }
}

// Export the function for use in other modules
module.exports = { generateTechReportHTML, generateAndSaveReport };
