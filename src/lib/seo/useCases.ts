import type { FaqItem } from "@/components/seo/Faq";

export type UseCase = {
  slug: string;
  title: string;
  summary: string;
  why: string;
  recommendedTool: "url" | "wifi" | "vcard" | "whatsapp" | "email" | "phone" | "sms" | "text";
  steps: string[];
  tips: string[];
  faqs: FaqItem[];
  related: string[];
};

const baseFaqs = (topic: string): FaqItem[] => [
  {
    question: `Do ${topic} QR codes expire?`,
    answer: "No. Static QR codes encode the destination directly, so they do not expire.",
  },
  {
    question: "Can I change the link after printing?",
    answer: "Not in v1. Static QR codes cannot be edited after creation.",
  },
  {
    question: "Is my data uploaded to the server?",
    answer: "No. All QR generation runs locally in your browser.",
  },
];

const withFaqs = (topic: string, extras: FaqItem[]) => [...baseFaqs(topic), ...extras];

export const useCases: UseCase[] = [
  {
    slug: "qr-code-for-wedding-invitation",
    title: "QR Code for Wedding Invitation",
    summary: "Share your wedding website, RSVP form, or venue map in one scan.",
    why: "Guests can access details instantly from print or digital invites.",
    recommendedTool: "url",
    steps: [
      "Paste your wedding site or RSVP link.",
      "Choose print-ready size and strong contrast.",
      "Download PNG for print and SVG for designers.",
    ],
    tips: [
      "Use a short URL to keep the QR light.",
      "Keep the quiet zone at least 4 modules.",
      "Test the code on multiple phones before printing.",
    ],
    faqs: withFaqs("wedding invitation", [
      {
        question: "Can I include a QR on the RSVP card?",
        answer: "Yes. Use a 512px or larger export for small prints.",
      },
      {
        question: "Should I link to a PDF invitation?",
        answer: "A mobile-friendly page is usually faster than a large PDF.",
      },
    ]),
    related: ["qr-code-for-event-checkin", "qr-code-for-forms", "qr-code-for-google-review"],
  },
  {
    slug: "qr-code-for-restaurant-menu",
    title: "QR Code for Restaurant Menu",
    summary: "Let diners open your menu without downloading an app.",
    why: "Reduce printing costs and make menu updates instant.",
    recommendedTool: "url",
    steps: [
      "Host your menu as a web page or PDF link.",
      "Generate a URL QR with a clean margin.",
      "Print and place on tables or counters.",
    ],
    tips: [
      "Use a mobile-friendly menu URL.",
      "Export at 512px or 1024px for print.",
      "Keep logos small to avoid scan failures.",
    ],
    faqs: withFaqs("restaurant menu", [
      {
        question: "Should I link to a PDF or a web menu?",
        answer: "A responsive web menu loads faster on phones.",
      },
      {
        question: "Where should I place the QR?",
        answer: "Table tents, counters, and takeaway bags work well.",
      },
    ]),
    related: ["qr-code-for-google-review", "qr-code-for-paypal", "qr-code-for-feedback"],
  },
  {
    slug: "qr-code-for-business-card",
    title: "QR Code for Business Card",
    summary: "Share your contact info or portfolio in one tap.",
    why: "Make it easy for new contacts to save your details instantly.",
    recommendedTool: "vcard",
    steps: [
      "Enter your contact details in the vCard form.",
      "Preview the vCard text before exporting.",
      "Download a high-res QR for printing.",
    ],
    tips: [
      "Keep only essential fields for faster scans.",
      "Use a clean black-on-white contrast.",
      "Test on iOS and Android contacts apps.",
    ],
    faqs: withFaqs("business card", [
      {
        question: "Will the contact save automatically?",
        answer: "Most phones show a prompt to add the contact after scanning.",
      },
      {
        question: "Can I include a logo on the QR?",
        answer: "Yes, enable safe mode and use error correction Q.",
      },
    ]),
    related: ["qr-code-for-portfolio", "qr-code-for-resume", "qr-code-for-instagram"],
  },
  {
    slug: "qr-code-for-instagram",
    title: "QR Code for Instagram",
    summary: "Send people straight to your Instagram profile in one scan.",
    why: "Perfect for posters, packaging, and storefronts.",
    recommendedTool: "url",
    steps: [
      "Copy your Instagram profile URL.",
      "Generate a URL QR code.",
      "Download and place it wherever followers scan.",
    ],
    tips: [
      "Use the exact profile URL.",
      "Keep the QR at least 2 cm wide on print.",
      "Add a short label like Follow us.",
    ],
    faqs: withFaqs("Instagram", [
      {
        question: "Can I link to a specific post?",
        answer: "Yes. Paste the post URL instead of the profile URL.",
      },
      {
        question: "Does Instagram block QR scans?",
        answer: "No. The QR simply opens the link in a browser or app.",
      },
    ]),
    related: ["qr-code-for-facebook", "qr-code-for-linktree", "qr-code-for-youtube"],
  },
  {
    slug: "qr-code-for-pdf",
    title: "QR Code for PDF",
    summary: "Share PDF brochures, catalogs, or instructions via QR.",
    why: "Give people instant access to downloadable documents.",
    recommendedTool: "url",
    steps: [
      "Upload your PDF to a public link.",
      "Generate a URL QR code.",
      "Test the PDF on mobile before printing.",
    ],
    tips: [
      "Use a lightweight PDF for fast loads.",
      "Consider a landing page with a download button.",
      "Use high contrast colors for print.",
    ],
    faqs: withFaqs("PDF", [
      {
        question: "Should I use a landing page instead of a direct PDF?",
        answer: "Landing pages allow updates without reprinting the QR.",
      },
      {
        question: "What if the PDF link changes?",
        answer: "Static QR codes cannot be edited, so keep the URL stable.",
      },
    ]),
    related: ["qr-code-for-portfolio", "qr-code-for-real-estate-listing", "qr-code-for-forms"],
  },
  {
    slug: "qr-code-for-google-review",
    title: "QR Code for Google Review",
    summary: "Invite customers to leave a review with a quick scan.",
    why: "Faster reviews lead to more ratings and visibility.",
    recommendedTool: "url",
    steps: [
      "Copy your Google review link.",
      "Generate a URL QR code.",
      "Print on receipts or table tents.",
    ],
    tips: [
      "Use the direct review link, not your homepage.",
      "Place it where customers wait or pay.",
      "Ask politely with a short CTA.",
    ],
    faqs: withFaqs("Google review", [
      {
        question: "Where can I find the review link?",
        answer: "Use the Google Business Profile dashboard to copy the review URL.",
      },
      {
        question: "Will it open the review form on mobile?",
        answer: "Yes, it opens the review flow in the Google app or browser.",
      },
    ]),
    related: ["qr-code-for-restaurant-menu", "qr-code-for-feedback", "qr-code-for-paypal"],
  },
  {
    slug: "qr-code-for-paypal",
    title: "QR Code for PayPal",
    summary: "Send customers to a PayPal payment link quickly.",
    why: "Speed up payments without typing long URLs.",
    recommendedTool: "url",
    steps: [
      "Create a PayPal.me or payment link.",
      "Generate a URL QR code.",
      "Place it at checkout or on invoices.",
    ],
    tips: [
      "Test the payment link on mobile devices.",
      "Keep the quiet zone at least 4 modules.",
      "Print at 512px or higher for posters.",
    ],
    faqs: withFaqs("PayPal", [
      {
        question: "Can I use other payment links?",
        answer: "Yes, any HTTPS payment URL works the same.",
      },
      {
        question: "Do I need a dynamic QR for payments?",
        answer: "Not if the payment link stays the same.",
      },
    ]),
    related: ["qr-code-for-contactless-checkout", "qr-code-for-coupon", "qr-code-for-feedback"],
  },
  {
    slug: "qr-code-for-event-checkin",
    title: "QR Code for Event Check-in",
    summary: "Speed up entry by linking to tickets or check-in forms.",
    why: "Reduce lines and make arrivals smoother.",
    recommendedTool: "url",
    steps: [
      "Create a ticket or check-in link.",
      "Generate a URL QR code.",
      "Post it at the venue entrance.",
    ],
    tips: [
      "Use a large print size for distance scanning.",
      "Keep the QR on a plain background.",
      "Have a backup printed copy on site.",
    ],
    faqs: withFaqs("event check-in", [
      {
        question: "Can this link to Eventbrite?",
        answer: "Yes. Any ticketing link works with a URL QR code.",
      },
      {
        question: "What if the ticket URL changes?",
        answer: "Static QR codes cannot update, so keep the link stable.",
      },
    ]),
    related: ["qr-code-for-ticketing", "qr-code-for-forms", "qr-code-for-conference-badge"],
  },
  {
    slug: "qr-code-for-forms",
    title: "QR Code for Forms",
    summary: "Collect RSVPs or feedback using Google Forms or Typeform.",
    why: "Remove friction and boost form completions.",
    recommendedTool: "url",
    steps: [
      "Copy the form share URL.",
      "Generate a URL QR code.",
      "Place it on print or digital channels.",
    ],
    tips: [
      "Shorten the form URL for faster scans.",
      "Use a 512px export for flyers.",
      "Test the form on mobile before publishing.",
    ],
    faqs: withFaqs("form", [
      {
        question: "Can I use Microsoft Forms?",
        answer: "Yes, any HTTPS form link works.",
      },
      {
        question: "Should I embed the form or use a link?",
        answer: "A direct link is simplest for QR scans.",
      },
    ]),
    related: ["qr-code-for-feedback", "qr-code-for-event-checkin", "qr-code-for-wedding-invitation"],
  },
  {
    slug: "qr-code-for-whatsapp-business",
    title: "QR Code for WhatsApp Business",
    summary: "Let customers start a WhatsApp Business chat instantly.",
    why: "Fast messaging drives quicker sales and support.",
    recommendedTool: "whatsapp",
    steps: [
      "Enter your WhatsApp number in E.164 format.",
      "Add a friendly prefilled message.",
      "Download and place on packaging or signage.",
    ],
    tips: [
      "Use a short greeting to speed up responses.",
      "Keep the QR large for storefronts.",
      "Test on both Android and iOS.",
    ],
    faqs: withFaqs("WhatsApp Business", [
      {
        question: "Does it work with regular WhatsApp?",
        answer: "Yes, the wa.me link opens either WhatsApp app.",
      },
      {
        question: "Do I need a separate business account?",
        answer: "No, but a business profile adds useful details.",
      },
    ]),
    related: ["qr-code-for-whatsapp-group", "qr-code-for-instagram", "qr-code-for-contactless-checkout"],
  },
  {
    slug: "qr-code-for-hotel-wifi",
    title: "QR Code for Hotel WiFi",
    summary: "Help guests connect to WiFi without typing long passwords.",
    why: "Better guest experience and fewer support requests.",
    recommendedTool: "wifi",
    steps: [
      "Enter the hotel SSID and password.",
      "Choose the correct encryption type.",
      "Print the QR on room cards or desk stands.",
    ],
    tips: [
      "Use the stickers preset for small prints.",
      "Keep the QR away from glossy reflections.",
      "Reprint if the password changes.",
    ],
    faqs: withFaqs("hotel WiFi", [
      {
        question: "Does it work on all phones?",
        answer: "Most modern iOS and Android devices support WiFi QR scans.",
      },
      {
        question: "What if the network is hidden?",
        answer: "Enable the hidden network option in the generator.",
      },
    ]),
    related: ["qr-code-for-restaurant-menu", "qr-code-for-real-estate-listing", "qr-code-for-conference-badge"],
  },
  {
    slug: "qr-code-for-retail-shelf",
    title: "QR Code for Retail Shelf",
    summary: "Link shoppers to product details, specs, or videos.",
    why: "Give customers more info without extra staff time.",
    recommendedTool: "url",
    steps: [
      "Choose the product page or demo video URL.",
      "Generate a URL QR code.",
      "Print and attach to shelf tags.",
    ],
    tips: [
      "Use high contrast for quick scans.",
      "Keep the QR on a flat matte surface.",
      "Test distance scanning before rollout.",
    ],
    faqs: withFaqs("retail shelf", [
      {
        question: "Can I link to a product video?",
        answer: "Yes, any HTTPS link works including YouTube and Vimeo.",
      },
      {
        question: "How big should the QR be?",
        answer: "Aim for at least 2 cm wide for shelf labels.",
      },
    ]),
    related: ["qr-code-for-youtube", "qr-code-for-coupon", "qr-code-for-feedback"],
  },
  {
    slug: "qr-code-for-real-estate-listing",
    title: "QR Code for Real Estate Listing",
    summary: "Send visitors to property details, photos, or a virtual tour.",
    why: "Boost inquiries from drive-by traffic.",
    recommendedTool: "url",
    steps: [
      "Paste the listing or tour URL.",
      "Generate a URL QR code.",
      "Print and add to yard signs.",
    ],
    tips: [
      "Use a short URL so the QR is less dense.",
      "Export at 1024px for large signs.",
      "Place the QR at eye level for easy scans.",
    ],
    faqs: withFaqs("real estate listing", [
      {
        question: "Can I link to multiple properties?",
        answer: "Use a landing page that lists all properties.",
      },
      {
        question: "Does it work on outdoor signs?",
        answer: "Yes, but use a large size and weather-safe printing.",
      },
    ]),
    related: ["qr-code-for-pdf", "qr-code-for-portfolio", "qr-code-for-event-checkin"],
  },
  {
    slug: "qr-code-for-conference-badge",
    title: "QR Code for Conference Badge",
    summary: "Share attendee details or LinkedIn with a quick scan.",
    why: "Networking becomes faster and more accurate.",
    recommendedTool: "vcard",
    steps: [
      "Enter attendee contact details.",
      "Generate a vCard QR code.",
      "Print on badges or lanyards.",
    ],
    tips: [
      "Use minimal fields for quick scans.",
      "Export at 512px for badge printing.",
      "Add a short label like Scan to save.",
    ],
    faqs: withFaqs("conference badge", [
      {
        question: "Can I use a URL instead of vCard?",
        answer: "Yes, if you prefer linking to a profile or bio.",
      },
      {
        question: "Is it safe to include phone numbers?",
        answer: "Only include details you are comfortable sharing publicly.",
      },
    ]),
    related: ["qr-code-for-business-card", "qr-code-for-portfolio", "qr-code-for-event-checkin"],
  },
  {
    slug: "qr-code-for-app-download",
    title: "QR Code for App Download",
    summary: "Send users to the App Store or Google Play instantly.",
    why: "Remove friction from mobile installs.",
    recommendedTool: "url",
    steps: [
      "Choose the store URL or a smart link page.",
      "Generate a URL QR code.",
      "Use the print preset for posters.",
    ],
    tips: [
      "Use a smart link that detects device type.",
      "Keep the QR large for outdoor signage.",
      "Test both iOS and Android before launch.",
    ],
    faqs: withFaqs("app download", [
      {
        question: "Can I use one QR for both stores?",
        answer: "Yes, use a landing page that routes to each store.",
      },
      {
        question: "Should I include a call to action?",
        answer: "Yes, a simple Scan to install improves conversions.",
      },
    ]),
    related: ["qr-code-for-youtube", "qr-code-for-instagram", "qr-code-for-linktree"],
  },
  {
    slug: "qr-code-for-youtube",
    title: "QR Code for YouTube",
    summary: "Send viewers directly to a video or channel.",
    why: "Great for posters, packaging, and presentations.",
    recommendedTool: "url",
    steps: [
      "Copy the YouTube video or channel URL.",
      "Generate a URL QR code.",
      "Print or share digitally.",
    ],
    tips: [
      "Link to a specific video for campaigns.",
      "Use high contrast for reliable scans.",
      "Include a short CTA like Watch now.",
    ],
    faqs: withFaqs("YouTube", [
      {
        question: "Can I link to a playlist?",
        answer: "Yes, playlists work just like video links.",
      },
      {
        question: "Do YouTube QR codes expire?",
        answer: "No, static QR codes do not expire.",
      },
    ]),
    related: ["qr-code-for-podcast", "qr-code-for-instagram", "qr-code-for-retail-shelf"],
  },
  {
    slug: "qr-code-for-podcast",
    title: "QR Code for Podcast",
    summary: "Send listeners to your podcast on any platform.",
    why: "Grow subscriptions from print and live events.",
    recommendedTool: "url",
    steps: [
      "Create a podcast landing page or smart link.",
      "Generate a URL QR code.",
      "Use it on flyers or merch.",
    ],
    tips: [
      "Use a single link that supports all platforms.",
      "Add a short label like Listen now.",
      "Export at 512px for stickers.",
    ],
    faqs: withFaqs("podcast", [
      {
        question: "Should I link to Spotify or Apple?",
        answer: "Use a smart link that lets listeners choose their app.",
      },
      {
        question: "Can I update the podcast link later?",
        answer: "Only if the URL stays the same. Static QR codes cannot be edited.",
      },
    ]),
    related: ["qr-code-for-youtube", "qr-code-for-instagram", "qr-code-for-linktree"],
  },
  {
    slug: "qr-code-for-coupon",
    title: "QR Code for Coupon",
    summary: "Share coupon codes or discount pages in one scan.",
    why: "Boost redemption without manual typing.",
    recommendedTool: "url",
    steps: [
      "Create a coupon landing page or short link.",
      "Generate a URL QR code.",
      "Print on receipts, posters, or packaging.",
    ],
    tips: [
      "Keep the URL short for a cleaner QR.",
      "Use a high contrast color scheme.",
      "Test redemption flow on mobile.",
    ],
    faqs: withFaqs("coupon", [
      {
        question: "Can I embed the coupon code in the QR?",
        answer: "Yes, you can encode plain text, but URLs are easier to redeem.",
      },
      {
        question: "Do I need tracking?",
        answer: "Not for v1. Static QR codes do not include analytics.",
      },
    ]),
    related: ["qr-code-for-retail-shelf", "qr-code-for-paypal", "qr-code-for-feedback"],
  },
  {
    slug: "qr-code-for-feedback",
    title: "QR Code for Feedback",
    summary: "Collect customer feedback quickly with a QR scan.",
    why: "Higher response rates when feedback is frictionless.",
    recommendedTool: "url",
    steps: [
      "Create a short feedback form link.",
      "Generate a URL QR code.",
      "Place on receipts, tables, or packaging.",
    ],
    tips: [
      "Keep the form short for better completion.",
      "Use a clear CTA like Tell us how we did.",
      "Test on phones before printing.",
    ],
    faqs: withFaqs("feedback", [
      {
        question: "Can I connect it to Google Forms?",
        answer: "Yes, any form link works.",
      },
      {
        question: "Should I offer an incentive?",
        answer: "Small rewards often increase feedback rates.",
      },
    ]),
    related: ["qr-code-for-forms", "qr-code-for-google-review", "qr-code-for-coupon"],
  },
  {
    slug: "qr-code-for-portfolio",
    title: "QR Code for Portfolio",
    summary: "Show your work in one scan for interviews or networking.",
    why: "Perfect for printed resumes and business cards.",
    recommendedTool: "url",
    steps: [
      "Paste your portfolio URL.",
      "Generate a URL QR code.",
      "Use the print preset for clean exports.",
    ],
    tips: [
      "Keep the URL stable for long-term use.",
      "Use a short label like View portfolio.",
      "Test the link on mobile and desktop.",
    ],
    faqs: withFaqs("portfolio", [
      {
        question: "Should I link to a PDF portfolio?",
        answer: "A responsive website generally loads faster on phones.",
      },
      {
        question: "Can I include the QR on a resume?",
        answer: "Yes, a 2 cm QR works well on standard resumes.",
      },
    ]),
    related: ["qr-code-for-resume", "qr-code-for-business-card", "qr-code-for-pdf"],
  },
  {
    slug: "qr-code-for-resume",
    title: "QR Code for Resume",
    summary: "Give recruiters a quick way to see your work.",
    why: "Add a portfolio or LinkedIn link without clutter.",
    recommendedTool: "url",
    steps: [
      "Choose your portfolio or LinkedIn URL.",
      "Generate a URL QR code.",
      "Place the QR in the header or footer of your resume.",
    ],
    tips: [
      "Use a high contrast black-on-white QR.",
      "Keep the QR size around 2 cm.",
      "Test printed scans before sending.",
    ],
    faqs: withFaqs("resume", [
      {
        question: "Should I use a vCard instead?",
        answer: "vCard QR codes are great for contact details, but a URL is better for portfolios.",
      },
      {
        question: "Is it ATS friendly?",
        answer: "Yes, QR codes do not affect ATS parsing of your resume text.",
      },
    ]),
    related: ["qr-code-for-portfolio", "qr-code-for-business-card", "qr-code-for-linktree"],
  },
  {
    slug: "qr-code-for-contactless-checkout",
    title: "QR Code for Contactless Checkout",
    summary: "Send customers to a self-checkout or payment page.",
    why: "Speed up lines and reduce staff workload.",
    recommendedTool: "url",
    steps: [
      "Create a checkout or payment link.",
      "Generate a URL QR code.",
      "Place near the register or tables.",
    ],
    tips: [
      "Use large prints for easy scanning.",
      "Test the flow on slow networks.",
      "Keep the QR away from glossy glare.",
    ],
    faqs: withFaqs("contactless checkout", [
      {
        question: "Does it work with mobile payment apps?",
        answer: "Yes, as long as the app accepts HTTPS links.",
      },
      {
        question: "Do I need a dynamic QR?",
        answer: "Not if the checkout URL stays the same.",
      },
    ]),
    related: ["qr-code-for-paypal", "qr-code-for-restaurant-menu", "qr-code-for-feedback"],
  },
  {
    slug: "qr-code-for-ticketing",
    title: "QR Code for Ticketing",
    summary: "Link to ticket purchase or entry validation pages.",
    why: "Keep ticket access simple for attendees.",
    recommendedTool: "url",
    steps: [
      "Copy the ticketing platform link.",
      "Generate a URL QR code.",
      "Use the print preset for signage.",
    ],
    tips: [
      "Use a large QR for distance scanning.",
      "Keep the background clean and matte.",
      "Test with multiple devices before the event.",
    ],
    faqs: withFaqs("ticketing", [
      {
        question: "Can I link to multiple ticket types?",
        answer: "Use a landing page that lists all ticket options.",
      },
      {
        question: "Does it work for mobile tickets?",
        answer: "Yes, it simply opens the ticket URL on mobile.",
      },
    ]),
    related: ["qr-code-for-event-checkin", "qr-code-for-conference-badge", "qr-code-for-forms"],
  },
  {
    slug: "qr-code-for-facebook",
    title: "QR Code for Facebook",
    summary: "Send visitors to your Facebook page or event.",
    why: "Grow your community with offline traffic.",
    recommendedTool: "url",
    steps: [
      "Copy your Facebook page or event URL.",
      "Generate a URL QR code.",
      "Print it on flyers or store signage.",
    ],
    tips: [
      "Use a short CTA like Like us on Facebook.",
      "Keep the QR at least 2 cm wide.",
      "Test on both iOS and Android browsers.",
    ],
    faqs: withFaqs("Facebook", [
      {
        question: "Can I link to a Facebook event?",
        answer: "Yes, event URLs work the same as page URLs.",
      },
      {
        question: "Will it open the Facebook app?",
        answer: "Most phones open the app if installed, otherwise the browser.",
      },
    ]),
    related: ["qr-code-for-instagram", "qr-code-for-youtube", "qr-code-for-linktree"],
  },
  {
    slug: "qr-code-for-linktree",
    title: "QR Code for Linktree",
    summary: "Share one QR that links to all your key links.",
    why: "Great for creators and brands with multiple destinations.",
    recommendedTool: "url",
    steps: [
      "Copy your Linktree or bio link URL.",
      "Generate a URL QR code.",
      "Place it on business cards or posters.",
    ],
    tips: [
      "Keep the QR simple for fast scans.",
      "Add a short CTA like Scan for links.",
      "Export SVG for crisp printing.",
    ],
    faqs: withFaqs("Linktree", [
      {
        question: "Can I use another bio link tool?",
        answer: "Yes, any HTTPS bio link works the same.",
      },
      {
        question: "Does it track clicks?",
        answer: "Tracking depends on your bio link provider, not the QR.",
      },
    ]),
    related: ["qr-code-for-instagram", "qr-code-for-podcast", "qr-code-for-youtube"],
  },
  {
    slug: "qr-code-for-whatsapp-group",
    title: "QR Code for WhatsApp Group",
    summary: "Invite people to join a WhatsApp group with one scan.",
    why: "Perfect for communities, classes, and events.",
    recommendedTool: "url",
    steps: [
      "Create a WhatsApp group invite link.",
      "Generate a URL QR code.",
      "Share it in print or digital channels.",
    ],
    tips: [
      "Reset the invite link if it gets abused.",
      "Use a 512px export for flyers.",
      "Add a clear label like Join our group.",
    ],
    faqs: withFaqs("WhatsApp group", [
      {
        question: "Can anyone join with the QR?",
        answer: "Yes, anyone with the invite link can join.",
      },
      {
        question: "Should I use a dynamic QR for groups?",
        answer: "If you rotate invite links, a static QR requires reprints.",
      },
    ]),
    related: ["qr-code-for-whatsapp-business", "qr-code-for-event-checkin", "qr-code-for-forms"],
  },
];
