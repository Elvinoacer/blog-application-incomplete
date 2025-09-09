
const axios = require('axios');
const fs = require('fs');
const { marked } = require('marked');

const generateHTML = (data) => {
  const { topic, detailedReport, links, images, videos, createdAt } = data;

  const reportHtml = marked(detailedReport);

  const linksHtml = links.map(link => `
    <a href="${link.url}" class="list-group-item list-group-item-action bg-transparent border-light text-light" target="_blank" rel="noopener noreferrer">${link.description}</a>
  `).join('');

  const imagesHtml = images.map(image => `
    <div class="col-md-6 mb-4">
      <div class="card bg-dark text-white border-light shadow-lg h-100">
        <img src="${image.url}" class="card-img-top img-fluid constrained-image" alt="${image.description || ''}">
        <div class="card-body">
          ${image.description ? `<p class="card-text text-center">${image.description}</p>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  const videosHtml = videos.map(video => `
    <div class="col-md-6 mb-4">
      <div class="card bg-dark text-white border-light shadow-lg h-100">
        <div class="card-body">
          <video controls class="w-100">
            <source src="${video.url}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="card-footer text-center">
          <p class="card-text">${video.description}</p>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${topic}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Poppins', sans-serif;
          background: #121212;
          color: #e0e0e0;
        }
        .gradient-text {
          background: -webkit-linear-gradient(45deg, #ff8a00, #e52e71);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .report-header {
          position: relative;
          padding: 4rem 0;
          text-align: center;
          overflow: hidden;
        }
        .report-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 138, 0, 0.8), rgba(229, 46, 113, 0.8)), url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80') no-repeat center center;
          background-size: cover;
          filter: blur(10px);
          transform: scale(1.1);
        }
        .report-header .container {
          position: relative;
          z-index: 1;
        }
        .report-header h1 {
          font-size: 3.5rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        }
        .report-header .timestamp {
          font-size: 1rem;
          color: white;
          opacity: 0.9;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          padding: 2rem;
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
        }
        .report-content h1, .report-content h2, .report-content h3, .report-content h4, .report-content h5, .report-content h6 {
            color: #ff8a00;
        }
        .report-content img {
            max-width: 100%;
            height: auto;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        .card {
            border-radius: 15px;
        }
        .constrained-image {
            height: 200px;
            object-fit: cover;
        }
        .list-group-item {
            transition: background 0.3s ease;
        }
        .list-group-item:hover {
            background: rgba(255, 255, 255, 0.1)!important;
        }

        @media (max-width: 768px) {
            .report-header h1 {
                font-size: 2.5rem;
            }
        }
      </style>
    </head>
    <body>
        <header class="report-header">
            <div class="container">
                <h1 class="gradient-text">${topic}</h1>
                <p class="timestamp">Published on: ${new Date(createdAt).toLocaleDateString()}</p>
            </div>
        </header>

      <div class="container my-5">
        <div class="row">
            <div class="col-lg-8 col-md-12">
                <div class="glass-card mb-4">
                    <div class="report-content">
                        ${reportHtml}
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-12">
                ${images.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="mb-3 gradient-text">Images</h3>
                        <div class="row">
                            ${imagesHtml}
                        </div>
                    </div>
                ` : ''}
                ${videos.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="mb-3 gradient-text">Videos</h3>
                        <div class="row">
                            ${videosHtml}
                        </div>
                    </div>
                ` : ''}
                ${links.length > 0 ? `
                    <div class="mb-4">
                        <h3 class="mb-3 gradient-text">Related Links</h3>
                        <div class="list-group">
                            ${linksHtml}
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
      </div>

      <footer class="text-white text-center p-4 mt-5">
        <div class="container">
            <p class="mb-0">&copy; ${new Date().getFullYear()} Report Generator. All Rights Reserved.</p>
        </div>
      </footer>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;
};

const fetchReport = async (topic) => {
    try {
        console.log(`Fetching report for topic: "${topic}"`);
        const response = await axios.post('http://localhost:3000/scrape', { topic });
        return response.data;
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            console.error('Error: Connection refused. Is the backend server running at http://localhost:3000 ?');
        } else {
            console.error(`An unexpected error occurred: ${error.message}`);
        }
        return null;
    }
};

const main = async () => {
    const topic = process.argv[2];

    if (!topic) {
        console.error('Please provide a topic as a command-line argument.');
        process.exit(1);
    }

    const reportData = await fetchReport(topic);

    if (reportData && !reportData.error) {
        const html = generateHTML(reportData);
        const outputFileName = `report-${topic.replace(/\s+/g, '-').toLowerCase()}.html`;
        fs.writeFileSync(outputFileName, html);
        console.log(`Successfully generated ${outputFileName}`);
    } else if (reportData && reportData.error) {
        console.error(`Error from backend: ${reportData.details}`);
        console.error('Failed to fetch report. Aborting.');
    } else {
        console.error('Failed to fetch report. Aborting.');
    }
};

main();
