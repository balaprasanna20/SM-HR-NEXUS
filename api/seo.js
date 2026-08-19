import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.smhrnexus.com';

const METADATA = {
  '/': {
    title: "Home | Recruitment & HR Consulting",
    description: "SM HR Nexus is a premier corporate management consultancy delivering end-to-end recruitment, executive search, psychometric testing, HR SOPs, and statutory compliance.",
    content: `
      <h1>SM HR Nexus — Premier Recruitment & HR Consulting Services</h1>
      <p>Drawing on over 100 years of cumulative expertise, SM HR Nexus is a trusted executive search and HR advisory partner. We help modern enterprises identify board-level leadership, implement regulatory-compliant operations, and scale talent management frameworks built on our Conceive · Create · Complete bedrock.</p>
      <h2>Our Mission & Vision</h2>
      <p><strong>Mission:</strong> Bring the 3C advantage to corporate partners, matching suitability, capability, and reliability with absolute integrity.</p>
      <p><strong>Vision:</strong> To steer corporate fortunes as India's premier multi-faceted HR advisory, recognized for SM HR Nexus executive recruitment.</p>
      <h2>Core Values</h2>
      <ul><li>Absolute Integrity — Every engagement governed by confidentiality and transparent evaluations.</li><li>Ideal Match Making — The best interest of candidate and employer drives execution.</li><li>Execution Precision — Accurate statutory calculations and detailed investigative checks.</li><li>Timely Delivery — Securing top-tier talent quickly without sacrificing quality.</li></ul>
      <h2>Six Specialized Practice Areas</h2>
      <ul><li>End-to-End Recruitment & Executive Search</li><li>HR SOPs & Corporate Consulting</li><li>Psychometric Testing & L&D</li><li>Investigative Background Inquiries</li><li>Statutory Compliance & Payroll</li><li>Educational Consultancy Services</li></ul>
      <h2>Domain Expertise</h2>
      <p>End-to-End Recruitment 98% | HR SOPs & Consulting 95% | Psychometric Testing & L&D 90% | Investigative Inquiries 94% | Statutory Compliances & Payroll 96% | Educational Placements & SSDP 88%</p>
      <h2>Trusted by Industry Leaders</h2>
      <p>Our clients include OMAX, Rebel Foods, SCYBERS, Quinte, Chai Waale, Austin Engineering, St. John GCL Logistics, SpanTag Technologies, echoVME, ProSol, Codeyoung, NVGL Visa Global Logistics, Satchmo Foods, and Mount Road Bilal.</p>
      <h2>Ready to Find Your Ideal Match?</h2>
      <p>Partner with SM HR Nexus — from end-to-end recruitment to HR SOP consulting and statutory compliance. <a href="/contact">Book a Consultation</a></p>
    `
  },
  '/about': {
    title: "About Us | Journey, Vision & Leadership",
    description: "Learn about SM HR Nexus' corporate recruitment journey, core values, mission and vision, and the partners driving our business clusters.",
    content: `
      <h1>About SM HR Nexus — Powered by People, Driven by Excellence</h1>
      <h2>Ideal Match Makers and Strategic HR Consultants</h2>
      <p>Founded on the bedrock of success — Conceive, Create, Complete — SM HR Nexus is a multi-faceted corporate management consultancy established by top-notch professionals with over 100 years of cumulative experience steering the fortunes of national and international corporations.</p>
      <p>We believe in mutual growth. By utilizing multi-pronged sourcing strategies, comprehensive psychometric profiles, and strict background checks, we connect the right candidates with the right roles while ensuring labor compliance.</p>
      <h2>Our Mission</h2>
      <p>Bring the 3C advantage to our corporate partners, matching suitability, capability, and reliability with absolute integrity.</p>
      <h2>Our Vision</h2>
      <p>To steer corporate fortunes as India's premier multi-faceted HR advisory, recognized for SM HR Nexus executive recruitment.</p>
      <h2>Core Values</h2>
      <ul><li>Absolute Integrity — Complete confidentiality, non-poaching ethics, and transparent evaluations.</li><li>Ideal Match Making — Balanced candidate-employer alignment.</li><li>Execution Precision — From statutory returns (PF/ESI) to detailed investigative checks.</li><li>Timely Delivery — Securing top-tier talent quickly without sacrificing standards.</li></ul>
      <h2>Our Team</h2>
      <ul><li>Adithya Swaminathan — HR Professional, Talent Acquisition & Advisory. 8 years of experience in recruitment, specializing in talent acquisition and client relationship management.</li><li>Rahul Raj A — Technical Recruiter, Global Talent Sourcing. BTech IT graduate with 4+ years in global technical recruiting.</li><li>Hariharan — HR Executive, APAC Recruitment & Advisory. 4.5+ years in Talent Acquisition, Ex-Cognizant Lead, Workday CHire Certified.</li><li>Lavanya Achuthamani — HR Executive, Talent Strategy & Operations. MBA graduate passionate about talent acquisition and building high-performing teams.</li><li>Praveen V — HR Professional, Talent Acquisition & Sourcing. Specializing in candidate relationship management and effective recruitment solutions.</li></ul>
      <h2>Timeline</h2>
      <ul><li>2011 — Company Founded with a focus on executive recruitment.</li><li>2015 — Launched HR SOPs & Corporate Consulting division.</li><li>2019 — Introduced Psychometric Testing and OPQ assessment tools.</li><li>2023 — Expanded corporate operations in Chennai.</li></ul>
    `
  },
  '/services': {
    title: "Our Services | Executive Search & Advisory Practice",
    description: "Explore SM HR Nexus' six specialized practice areas covering recruitment, HR SOPs, psychometric testing, background checks, statutory compliance, and educational consultancy.",
    content: `
      <h1>SM HR Nexus Services — Six Specialized Practice Areas</h1>
      <article><h2>1. End-to-End Recruitment — SM HR Nexus</h2><p>Ideal match makers employing multi-pronged sourcing strategies for entry-level to C-suite roles. We cover campus interviews, entry-level, junior to middle managers, and top executive roles.</p><p>Sub-services: Executive Search & Selection, Recruitment Process Outsourcing (RPO), Staffing & Resource Allocation, Campus Drive Management, Candidate Journey Tracking.</p></article>
      <article><h2>2. HR SOPs & Corporate Consulting</h2><p>Formulating organization-specific policies, performance management, compensation frameworks, and employee engagement structures.</p><p>Sub-services: HR Processes & Policies Drafting, Performance Management Programs, Compensation Management Frameworks, Employee Engagement Structures, Competency-Based HR Practices.</p></article>
      <article><h2>3. Psychometric Testing & L&D</h2><p>Advanced behavioral evaluations, competency profiling, and talent development programs using psychometric and OPQ assessment tools.</p><p>Sub-services: Psychometric & OPQ Assessment, Behavioral Skills Up-gradation, Cultural Sensitization & Grooming, Client Interaction Grooming, Building a Learning Organization.</p></article>
      <article><h2>4. Investigative Background Inquiries</h2><p>Impeccable qualification, family background, reference, and affiliation verifications to protect organizations from ghost and fake applicants.</p><p>Sub-services: Academic Qualifications Verification, Past Work Experience Checks, Family Background & Reference Checks, Political Affiliation Scanning, Security & Credential Auditing.</p></article>
      <article><h2>5. Statutory Compliance & Payroll</h2><p>Comprehensive statutory compliance support covering PF, ESI, and PT filing, monthly/annual returns, tax-friendly salary structuring.</p><p>Sub-services: PF, ESI & PT Statutory Compliance, Challans & Monthly/Annual Returns, Tax-Friendly Salary Band Creation, Settlement & Transfer Forms Handling, Immigrations & Consulate Interaction.</p></article>
      <article><h2>6. Educational Consultancy Services</h2><p>Assisting educational institutions in achieving international standards through brand positioning, curriculum alignment, and Student Skill Development Programs (SSDP).</p><p>Sub-services: Institutional Brand Positioning, Admission Lifecycle Optimization, Student Skill Development Programs, Curriculum Industry Alignment, Faculty Training & Leadership.</p></article>
      <h2>The 3C Framework — Our Methodology</h2>
      <p>Conceive, Create, Complete — a structured path transforming corporate challenges into verified successes. Step 1: Consultation (deep stakeholder interviews). Step 2: Planning (regulatory-compliant strategies). Step 3: Execution (deploy systems with measurable accuracy). Step 4: Delivery (quality benchmarks and long-term support).</p>
      <h2>Industries We Serve</h2>
      <p>Manufacturing & Heavy Engineering, IT Services & Cloud Technologies, Healthcare & Pharmaceuticals, Banking & Insurance Organizations, Private Colleges & Universities, Real Estate & Logistics.</p>
    `
  },
  '/careers': {
    title: "Careers | Join Our Expert Team",
    description: "Explore careers at SM HR Nexus. Join our team of domain professionals in recruitment, HR SOP consulting, and statutory compliances.",
    content: `
      <h1>Careers at SM HR Nexus — Build Corporate Excellence</h1>
      <h2>Work That Challenges & Empowers You</h2>
      <p>At SM HR Nexus, candidate insight and partner dedication are rewarded. Our flat-hierarchy culture gives recruitment consultants direct access to partners with over 100 years of cumulative experience from day one. We fund professional development — HR management certifications and compliance training.</p>
      <h2>Benefits & Culture</h2>
      <ul><li>Health & Wellness — Comprehensive medical insurance covering you and your family.</li><li>Professional Growth — Budget allocations for courses, certifications, and conferences.</li><li>Collaborative Culture — Flat hierarchy with direct mentorship under experienced partners.</li><li>Performance Rewards — Annual performance-based bonuses for placement and consulting successes.</li></ul>
      <h2>Current Opportunities</h2>
      <article><h3>Executive Search Consultant — SM HR Nexus</h3><p>Department: Talent Acquisition | Location: Chennai (On-site) | Type: Full-Time | Experience: 5+ Years</p><p>Join SM HR Nexus' exclusive talent search team to identify and place C-suite leaders and senior managers.</p></article>
      <article><h3>HR SOP & Policy Consultant</h3><p>Department: HR Advisory Services | Location: Chennai (On-site) | Type: Full-Time | Experience: 4+ Years</p><p>Formulate organization-specific HR policies, competency-based practices, and performance management programs.</p></article>
      <article><h3>Statutory Compliance Executive</h3><p>Department: Statutory & Benefits | Location: Chennai (On-site) | Type: Full-Time | Experience: 3+ Years</p><p>Manage PF, ESI, and PT filing procedures, monthly challans, returns, transfers, and year-end settlements.</p></article>
      <p><a href="/apply">Apply Now — Submit Your Application</a></p>
    `
  },
  '/apply': {
    title: "Apply Now | Submit Your Application",
    description: "Submit your application and upload your resume for open positions at SM HR Nexus.",
    content: `
      <h1>Apply Now — Submit Your Application to SM HR Nexus</h1>
      <p>Submit your resume and application details for open positions at SM HR Nexus. We are looking for talented professionals in recruitment, HR consulting, and statutory compliance.</p>
      <p>Upload your resume in PDF, DOC, or DOCX format (max 5MB). Our HR team will review your application and get back to you within 48 hours.</p>
      <p><a href="/careers">View Current Opportunities</a> | <a href="/contact">Contact Us</a></p>
    `
  },
  '/contact': {
    title: "Contact | Book a Consultation",
    description: "Contact SM HR Nexus' recruitment & consulting team to book a consultation, discuss a mandate, or enquire about any of our specialized practice clusters.",
    content: `
      <h1>Contact SM HR Nexus — Start a Conversation</h1>
      <h2>Office Details</h2>
      <address>
        <p><strong>Headquarters:</strong> 3/2 Second Street, Raghava Reddy Colony, Ashok Nagar, Chennai 600083, Tamil Nadu, India</p>
        <p><strong>Phone:</strong> <a href="tel:+916385099063">+91 6385 099 063</a> (Chennai)</p>
        <p><strong>Email:</strong> <a href="mailto:info@smhrnexus.com">info@smhrnexus.com</a></p>
        <p><strong>Hours:</strong> Monday – Saturday, 9:00 AM – 7:00 PM IST</p>
      </address>
      <h2>Book a Consultation</h2>
      <p>Fill in your details to connect directly with our advisory team. Send your enquiry via WhatsApp or email — both go directly to our partner's line. Available services: End-to-End Recruitment, HR SOPs & Corporate Consulting, Psychometric Testing & L&D, Investigative Background Inquiries, Statutory Compliance & Payroll, Educational Consultancy Services.</p>
    `
  }
};

export default async (req, res) => {
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
  const isBot = /bot|googlebot|bingbot|yandex|baiduspider|crawler|spider|robot|crawling|facebookexternalhit|whatsapp|linkedinbot|twitterbot|pinterest|slackbot|chatgpt|gptbot|claudebot|perplexity|anthropic|cohere|bytespider/i.test(userAgent);

  // If it's a bot, inject specific page metadata AND full content before sending HTML
  if (isBot) {
    const formattedTitle = `${meta.title} | SM HR Nexus`;
    const canonicalUrl = `${SITE_URL}${urlPath === '/' ? '' : urlPath}`;
    
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
    htmlContent = htmlContent.replace(/<meta[^>]*property="og:url"[^>]*content="[^"]*"[^>]*>/i, `<meta property="og:url" content="${canonicalUrl}" />`);
    htmlContent = htmlContent.replace(/<meta[^>]*name="twitter:url"[^>]*content="[^"]*"[^>]*>/i, `<meta name="twitter:url" content="${canonicalUrl}" />`);

    // Replace canonical
    htmlContent = htmlContent.replace(/<link[^>]*rel="canonical"[^>]*href="[^"]*"[^>]*>/i, `<link rel="canonical" href="${canonicalUrl}" />`);

    // ── CRITICAL FIX: Inject actual page content into the #root div ──
    // This ensures bots see real content instead of an empty div
    if (meta.content) {
      const seoContent = `<div id="root"><div id="seo-content" style="max-width:960px;margin:0 auto;padding:40px 20px;font-family:system-ui,sans-serif;">${meta.content}<footer><nav><a href="/">Home</a> | <a href="/about">About</a> | <a href="/services">Services</a> | <a href="/careers">Careers</a> | <a href="/contact">Contact</a> | <a href="/apply">Apply Now</a></nav><p>© ${new Date().getFullYear()} SM HR Nexus. All rights reserved. | 3/2 Second Street, Raghava Reddy Colony, Ashok Nagar, Chennai 600083 | Phone: +91 6385 099 063 | Email: info@smhrnexus.com</p></footer></div></div>`;
      htmlContent = htmlContent.replace(/<div id="root"><\/div>/i, seoContent);
    }
  }

  // Set standard HTML response headers and send the content
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
  res.status(200).send(htmlContent);
};
