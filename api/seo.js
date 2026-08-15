const fs = require('fs');
const path = require('path');

const METADATA = {
  '/': {
    title: "Home | Recruitment & HR Consulting",
    description: "SM HR Nexus is a premier corporate management consultancy delivering end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance."
  },
  '/about': {
    title: "About Us | Journey, Vision & Leadership",
    description: "Learn about SM HR Nexus' corporate recruitment journey, core values, mission and vision, and the partners driving our business clusters."
  },
  '/services': {
    title: "Our Services | Executive Search & Advisory Practice",
    description: "Explore SM HR Nexus' six specialized practice areas covering accounting, HR, IT systems, and advisory clusters."
  },
  '/careers': {
    title: "Careers | Join Our Expert Team",
    description: "Explore careers at SM HR Nexus. Join our team of domain professionals in recruitment, HR SOP consulting, and statutory compliances."
  },
  '/apply': {
    title: "Apply Now | Submit Your Application",
    description: "Submit your application and upload your resume for open positions at SM HR Nexus."
  },
  '/contact': {
    title: "Contact | Book a Consultation",
    description: "Contact SM HR Nexus' recruitment & consulting team to book a consultation, discuss a mandate, or enquire about any of our specialized practice clusters."
  }
};

module.exports = async (req, res) => {
  const urlPath = req.url.split('?')[0] || '/';
  
  // Get corresponding metadata, default to homepage if path is unknown
  const meta = METADATA[urlPath] || METADATA['/'];
  
  // Read static index.html from dist
  const htmlPath = path.join(process.cwd(), 'dist', 'index.html');
  let htmlContent = '';
  try {
    htmlContent = fs.readFileSync(htmlPath, 'utf8');
  } catch (err) {
    // Fallback if file not found (during local preview or setup issue)
    return res.status(500).send("index.html not found: " + err.toString());
  }

  // Check if user agent is a social scraper/search engine bot
  const userAgent = req.headers['user-agent'] || '';
  const isBot = /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|whatsapp|linkedinbot|twitterbot|pinterest|slackbot/i.test(userAgent);

  // If it's a bot, inject specific page metadata before sending HTML
  if (isBot) {
    const formattedTitle = `${meta.title} | SM HR Nexus`;
    
    // Replace title
    htmlContent = htmlContent.replace(/<title>[^<]*<\/title>/i, `<title>${formattedTitle}</title>`);
    htmlContent = htmlContent.replace(/<meta[^>]*name="title"[^>]*content="[^"]*"[^>]*>/i, `<meta name="title" content="${formattedTitle}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*property="og:title"[^>]*content="[^"]*"[^>]*>/i, `<meta property="og:title" content="${formattedTitle}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*name="twitter:title"[^>]*content="[^"]*"[^>]*>/i, `<meta name="twitter:title" content="${formattedTitle}" />`);

    // Replace description
    htmlContent = htmlContent.replace(/<meta[^>]*name="description"[^>]*content="[^"]*"[^>]*>/i, `<meta name="description" content="${meta.description}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*property="og:description"[^>]*content="[^"]*"[^>]*>/i, `<meta property="og:description" content="${meta.description}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*name="twitter:description"[^>]*content="[^"]*"[^>]*>/i, `<meta name="twitter:description" content="${meta.description}" />`);

    // Replace URL
    const fullUrl = `https://www.smhrnexus.com${urlPath}`;
    htmlContent = htmlContent.replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"[^>]*>/i, `<meta property="og:url" content="${fullUrl}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*name="twitter:url"[^>]*content="[^"]*"[^>]*>/i, `<meta name="twitter:url" content="${fullUrl}" />`);
  }

  // Set standard HTML response headers and send the content
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(htmlContent);
};
