/**
 * SM HR Nexus — Google Apps Script Backend
 * Handles: Resume Applications + Contact Form Enquiries
 * Sends all emails TO: info@smhrnexus.com
 * Deploy as: Web App → Execute as Me → Anyone can access
 */

var RECIPIENT = "info@smhrnexus.com";
var API_TOKEN = "sm_hr_nexus_secure_token_2026_x";

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    
    // 1. Authorization check
    if (!data.apiToken || data.apiToken !== API_TOKEN) {
      return respond("error", "Unauthorized access.");
    }

    var type = data.type || "resume";

    // 2. Server-side file validation (only for resume uploads)
    if (type !== "contact") {
      var fileName = data.fileName || "";
      var fileBase64 = data.fileBase64 || "";
      
      if (fileBase64 && fileName) {
        // Validate file type (extension check)
        var ext = fileName.split('.').pop().toLowerCase();
        if (ext !== "pdf" && ext !== "doc" && ext !== "docx") {
          return respond("error", "Invalid file type. Only PDF and Word files are allowed.");
        }
        
        // Validate file size (approx size from base64 string length)
        // Base64 size = (string_length * (3/4)) bytes. 5MB = 5 * 1024 * 1024 = 5,242,880 bytes.
        var approxSizeBytes = fileBase64.length * 0.75;
        if (approxSizeBytes > 5 * 1024 * 1024) {
          return respond("error", "File size exceeds maximum limit of 5MB.");
        }
      }
    }

    if (type === "contact") {
      return handleContact(data);
    } else {
      return handleResume(data);
    }

  } catch (err) {
    return respond("error", err.toString());
  }
}

/* ── CONTACT FORM ─────────────────────────── */
function handleContact(d) {
  var name    = d.name    || "N/A";
  var email   = d.email   || "N/A";
  var phone   = d.phone   || "N/A";
  var company = d.company || "N/A";
  var service = d.service || "General Enquiry";
  var message = d.message || "N/A";

  var subject = "📩 [Website Enquiry] " + name + " — " + company;

  var html =
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0d5be;border-radius:8px;overflow:hidden'>" +
    "<div style='background:#0A1128;padding:28px 32px'>" +
    "<h1 style='color:#C9A84C;margin:0;font-size:20px;letter-spacing:2px'>SM HR NEXUS</h1>" +
    "<p style='color:#aaa;margin:4px 0 0;font-size:12px'>New Website Enquiry Received</p>" +
    "</div>" +
    "<div style='padding:32px;background:#fff'>" +
    "<table style='width:100%;border-collapse:collapse;font-size:14px'>" +
    row("Full Name",         name)    +
    row("Email Address",     "<a href='mailto:" + email + "' style='color:#C9A84C;text-decoration:underline;'>" + email + "</a>")   +
    row("Phone Number",      phone)   +
    row("Company",           company) +
    row("Service Interest",  service) +
    "</table>" +
    "<div style='margin-top:24px;background:#f9f6ef;border-left:3px solid #C9A84C;padding:16px;border-radius:4px'>" +
    "<p style='margin:0 0 6px;font-size:11px;font-weight:bold;color:#A8893A;letter-spacing:1px;text-transform:uppercase'>Message</p>" +
    "<p style='margin:0;color:#333;font-size:14px;line-height:1.7'>" + message + "</p>" +
    "</div>" +
    "</div>" +
    "<div style='background:#f3efe7;padding:16px 32px;text-align:center'>" +
    "<p style='margin:0;font-size:11px;color:#999'>This enquiry was submitted via smhrnexus.com contact form</p>" +
    "</div>" +
    "</div>";

  MailApp.sendEmail({
    to:       RECIPIENT,
    replyTo:  email,
    subject:  subject,
    htmlBody: html
  });

  return respond("success", "Contact enquiry sent to " + RECIPIENT);
}

/* ── RESUME UPLOAD FORM ───────────────────── */
function handleResume(d) {
  var name       = d.fullName    || "N/A";
  var email      = d.email       || "N/A";
  var phone      = d.phone       || "N/A";
  var role       = d.role        || "Spontaneous Application";
  var experience = d.experience  || "N/A";
  var note       = d.note        || "N/A";
  var fileName   = d.fileName    || "";
  var fileBase64 = d.fileBase64  || "";
  var fileMime   = d.fileMimeType || "application/pdf";

  var subject = "📄 [Resume Application] " + name + " — " + role;

  var attachments = [];
  var driveLink   = "";

  // 1. Process Attachment & Save to Google Drive first to generate the link
  if (fileBase64 && fileName) {
    var bytes = Utilities.base64Decode(fileBase64);
    var blob  = Utilities.newBlob(bytes, fileMime, fileName);
    attachments.push(blob);

    try {
      var folders = DriveApp.getFoldersByName("SM_HR_Nexus_Resumes");
      var folder  = folders.hasNext() ? folders.next() : DriveApp.createFolder("SM_HR_Nexus_Resumes");
      var fileObj = folder.createFile(blob);
      fileObj.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      driveLink = fileObj.getUrl();
    } catch (driveErr) {
      // Silently catch drive upload errors
    }
  }

  // 2. Construct Branded HTML Email Template
  var html =
    "<div style='font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #e0d5be;border-radius:8px;overflow:hidden'>" +
    "<div style='background:#0A1128;padding:28px 32px'>" +
    "<h1 style='color:#C9A84C;margin:0;font-size:20px;letter-spacing:2px'>SM HR NEXUS</h1>" +
    "<p style='color:#aaa;margin:4px 0 0;font-size:12px'>New Resume Application Received</p>" +
    "</div>" +
    "<div style='padding:32px;background:#fff'>" +
    "<table style='width:100%;border-collapse:collapse;font-size:14px'>" +
    row("Candidate Name",  name)       +
    row("Email Address",   "<a href='mailto:" + email + "' style='color:#C9A84C;text-decoration:underline;'>" + email + "</a>")      +
    row("Phone Number",    phone)      +
    row("Applied Role",    role)       +
    row("Experience",      experience) +
    "</table>" +

    // If driveLink exists, render a Call-to-Action button to View/Download
    (driveLink ?
      "<div style='margin-top:24px;text-align:center'>" +
      "<a href='" + driveLink + "' target='_blank' style='display:inline-block;background:#C9A84C;color:#0A1128;text-decoration:none;padding:12px 24px;border-radius:4px;font-size:13px;font-weight:bold;letter-spacing:1px;text-transform:uppercase'>📄 View & Download Resume CV</a>" +
      "</div>" : "") +

    (note !== "N/A" ?
      "<div style='margin-top:24px;background:#f9f6ef;border-left:3px solid #C9A84C;padding:16px;border-radius:4px'>" +
      "<p style='margin:0 0 6px;font-size:11px;font-weight:bold;color:#A8893A;letter-spacing:1px;text-transform:uppercase'>Notes</p>" +
      "<p style='margin:0;color:#333;font-size:14px;line-height:1.7'>" + note + "</p>" +
      "</div>" : "") +
    "</div>" +
    "<div style='background:#f3efe7;padding:16px 32px;text-align:center'>" +
    "<p style='margin:0;font-size:11px;color:#999'>Resume is attached directly to this email & saved in your Google Drive folder</p>" +
    "</div>" +
    "</div>";

  MailApp.sendEmail({
    to:          RECIPIENT,
    replyTo:     email,
    subject:     subject,
    htmlBody:    html,
    attachments: attachments
  });

  return respond("success", "Resume sent to " + RECIPIENT);
}

/* ── HELPERS ──────────────────────────────── */
function row(label, value) {
  return "<tr>" +
    "<td style='padding:10px 0;border-bottom:1px solid #f0ebe0;color:#A8893A;font-size:11px;font-weight:bold;text-transform:uppercase;letter-spacing:1px;width:35%;vertical-align:top'>" + label + "</td>" +
    "<td style='padding:10px 0;border-bottom:1px solid #f0ebe0;color:#222;font-size:14px'>" + value + "</td>" +
    "</tr>";
}

function respond(status, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: status, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
