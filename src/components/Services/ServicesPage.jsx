import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useLocalContext } from "../../context/LocalContext";
import "./ServicesPage.css";
import {
  faChartLine,
  faTrafficLight,
  faFileAlt,
  faBullhorn,
  faChartPie,
  faBolt,
  faGlobe,
  faUserPlus,
  faGaugeHigh,
  faHandshake,
  faStar,
  faRocket,
  faMobileAlt,
  faPenNib,
  faShareAlt,
  faSearch,
  faEnvelopeOpenText,
  faUsers,
  faChartBar,
  faArrowTrendUp,
  faMousePointer,
  faTachometerAlt,
  faLightbulb,
  faProjectDiagram
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServicesPage = () => {
  const { serviceId } = useParams();
  const { webinfo } = useLocalContext();

  // ---- your same data (unchanged) ----
    const serviceData = [

    {
  id: "seo",
  title: "SEO Services",
  description:
    "Improve your search rankings, drive qualified traffic, and increase visibility across platforms with performance-focused SEO strategies.",
  details:
    "SEO is more than keywords — it’s a long-term growth strategy. Our SEO service covers everything from technical audits and on-page optimization to content marketing and backlink strategies. Whether you’re a local business or an enterprise, we tailor SEO that aligns with your goals and converts traffic into action.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990215/business-employees-analyzing-search-improvement-seo-search-engine-optimization-top-ranking_530733-3445_im94jb.jpg",
  features: [
    "Comprehensive site audits and technical SEO fixes.",
    "On-page optimization for all key landing pages.",
    "Keyword research tailored to your industry and audience.",
    "High-authority link-building and outreach strategies.",
    "SEO-driven content planning and publishing.",
    "Monthly performance reports: keyword rank, traffic, conversions."
  ],
  testimonials: [
    {
      name: "Priya Mehta",
      feedback:
        "Our website went from page 5 to the top of page 1 on Google. The organic leads just keep coming in."
    },
    {
      name: "Ankur Jain",
      feedback:
        "They don’t just promise rankings — they deliver. Our traffic and revenue have both doubled."
    },
    {
      name: "Meenal Singh",
      feedback:
        "Their SEO game is tight. Clean audits, solid backlinks, and real insights each month. Highly recommend."
    }
  ],
  faqs: [
    {
      question: "How long does it take to see SEO results?",
      answer:
        "Typically, noticeable improvements occur within 2–3 months, with stronger results over 6–12 months depending on your site and competition."
    },
    {
      question: "Do you offer local SEO for small businesses?",
      answer:
        "Yes, we specialize in local SEO strategies, including Google Business optimization and location-based keyword targeting."
    },
    {
      question: "Can you help with content for SEO?",
      answer:
        "Absolutely. We provide SEO-optimized blog writing, landing page content, and full content calendars aligned with keyword strategy."
    }
  ],
  growth: {
    title: "SEO Growth Metrics",
    chartData: [
      { label: "Keyword Ranking", value: 78 },
      { label: "Organic Traffic", value: 84 },
      { label: "Backlink Authority", value: 67 },
      { label: "Conversion Rate", value: 73 }
    ],
    highlights: [
      { icon: faChartLine, text: "Top 3 rank for 20+ target keywords" },
      { icon: faTrafficLight, text: "84% organic traffic increase in 90 days" },
      { icon: faFileAlt, text: "2x more leads from SEO-optimized landing pages" }
    ]
  }
},
{
  id: "ads",
  title: "Ad Services",
  description:
    "Launch and manage conversion-driven ad campaigns on Google, Meta, and more — backed by data and real-time performance optimization.",
  details:
    "Advertising isn't just about spending money — it's about making every click count. Our Ad Services deliver full-funnel campaigns across Google, Facebook, Instagram, and YouTube. We handle everything: strategy, creatives, targeting, A/B testing, and daily optimizations — so you get results, not guesswork.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990266/male-web-designer-8621249-6838917_zsyfrr.png",
  features: [
    "Cross-platform ad campaigns: Google, Meta, LinkedIn, YouTube.",
    "Full-funnel setup: awareness, interest, conversion, retargeting.",
    "Ad copywriting, creative design, and video ad production.",
    "Advanced audience segmentation and geo-targeting.",
    "A/B testing and real-time bid optimization.",
    "Detailed reports: CPC, ROAS, CTR, impressions, conversions."
  ],
  subcategories: [
    {
      name: "Meta Ads",
      route: "/services/ads/meta-ads",
      img:"https://res.cloudinary.com/dqdngisww/image/upload/v1754990294/6033716_o4df5g_xutys6.png"
    },
    {
      name: "Google Ads",
      route: "/services/ads/google-ads",
      img:"https://res.cloudinary.com/dqdngisww/image/upload/v1754990310/google-ads_sqagqu_grogx6.svg"
    }
  ],
  testimonials: [
    {
      name: "Sahil Bansal",
      feedback:
        "Our ROAS improved by 4x in the first month. Their ad team knows exactly how to get high-value traffic."
    },
    {
      name: "Neha Verma",
      feedback:
        "From creatives to performance — everything feels premium. We scaled our monthly leads with the same ad spend."
    },
    {
      name: "Jayesh Kumar",
      feedback:
        "They took over our Google Ads and it’s been smooth scaling since. The numbers speak for themselves."
    }
  ],
  faqs: [
    {
      question: "Which platforms do you run ads on?",
      answer:
        "We run campaigns on Google Ads (Search, Display, YouTube), Meta (Facebook & Instagram), LinkedIn, and more depending on your goals."
    },
    {
      question: "What’s your minimum ad budget requirement?",
      answer:
        "We usually recommend a starting monthly ad budget of ₹15,000–₹25,000 for meaningful results, depending on your industry."
    },
    {
      question: "Do you create ad creatives too?",
      answer:
        "Yes — we handle everything from copywriting to designing high-converting banners, videos, and carousel ads."
    }
  ],
  growth: {
    title: "Ad Campaign Growth Metrics",
    chartData: [
      { label: "Click-Through Rate (CTR)", value: 79 },
      { label: "Conversion Rate", value: 75 },
      { label: "Cost per Click (CPC)", value: 65 },
      { label: "Return on Ad Spend (ROAS)", value: 83 }
    ],
    highlights: [
      { icon: faBullhorn, text: "4x ROAS for multiple campaigns in Q2" },
      { icon: faChartPie, text: "35% lower CPC with optimized bidding" },
      { icon: faBolt, text: "Rapid A/B testing improved CTR by 2.6x" }
    ]
  }
},
{
  id: "digital",
  title: "Digital Marketing",
  description:
    "From brand building to lead generation — scale your digital presence with our full-suite digital marketing services and analytics.",
  details:
    "We combine strategy, content, design, and data to create marketing that doesn’t just look good — it performs. From SEO and ads to content, analytics, and CRO, our digital marketing service is the full stack your business needs to grow online. Whether you want awareness, traffic, or conversions — we deliver, track, and improve at every step.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990499/digital-marketing-vector-illustration5_cwsulu.jpg",
  features: [
    "Comprehensive strategy: SEO, SEM, email, content, and analytics.",
    "Website optimization: speed, UX, CRO (conversion rate optimization).",
    "Content marketing: blogs, videos, guides, newsletters.",
    "Marketing automation setup for funnels and workflows.",
    "Detailed monthly reporting and analytics dashboards.",
    "Audience persona building and behavior analysis."
  ],
  testimonials: [
    {
      name: "Ankita S.",
      feedback:
        "This isn’t just marketing — it’s digital transformation. We’re now getting consistent leads every week, organically and through campaigns."
    },
    {
      name: "Rohan Desai",
      feedback:
        "They planned and executed our entire funnel from scratch — now we’re tracking every step from click to conversion. Super organized."
    },
    {
      name: "Pooja Nair",
      feedback:
        "Our site, ads, SEO, and email — all managed under one roof. Saved us time and money, and improved performance massively."
    }
  ],
  faqs: [
    {
      question: "Do you handle both organic and paid strategies?",
      answer:
        "Yes — we offer a full-stack approach that includes SEO, content, paid ads, email marketing, analytics, and more."
    },
    {
      question: "Can you work with our in-house team?",
      answer:
        "Absolutely — we collaborate with internal teams or handle marketing end-to-end depending on your preference."
    },
    {
      question: "What industries do you specialize in?",
      answer:
        "We’ve worked across SaaS, retail, education, real estate, healthcare, and more. We tailor strategies to each niche."
    }
  ],
  growth: {
    title: "Digital Marketing Growth Metrics",
    chartData: [
      { label: "Traffic Increase", value: 88 },
      { label: "Lead Generation", value: 74 },
      { label: "Conversion Rate", value: 79 },
      { label: "Audience Retention", value: 69 }
    ],
    highlights: [
      { icon: faGlobe, text: "300% website traffic boost in 90 days" },
      { icon: faUserPlus, text: "Steady 2x monthly leads across campaigns" },
      { icon: faGaugeHigh, text: "Enhanced retention with CRO and remarketing" }
    ]
  }
},

{
  id: "brand-strategy",
  title: "Brand Strategy",
  description:
    "Define your brand’s voice, vision, and value — and create a consistent identity that connects with your audience across every touchpoint.",
  details:
    "Your brand is more than a logo — it’s the story, promise, and perception you build in the minds of your audience. We help you articulate your purpose, position your business in the market, and craft a cohesive brand identity that stands out. From naming and messaging to design systems and brand guidelines, we ensure every element works together to strengthen trust, loyalty, and recognition.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990560/building-brand-marketing-strategy-9535821-7825671_tt0rb2.png",
  features: [
    "Comprehensive brand audits to assess strengths and gaps.",
    "Clear positioning and messaging framework.",
    "Unique visual identity including logo, color palette, and typography.",
    "Brand voice guidelines for tone and communication style.",
    "Market research and competitor analysis.",
    "Launch strategy for brand rollout or rebranding."
  ],
  testimonials: [
    {
      name: "Neeraj K.",
      feedback:
        "They didn’t just design a logo — they built the backbone of our brand. Now everything we create feels connected and intentional."
    },
    {
      name: "Ritu Sharma",
      feedback:
        "From our pitch deck to our website, the new brand identity elevated how clients perceive us. We’ve closed bigger deals since."
    },
    {
      name: "Manoj Verma",
      feedback:
        "Our brand went from scattered to consistent. The guidelines they gave us are now our marketing bible."
    }
  ],
  faqs: [
    {
      question: "Do you work on rebranding as well as new brands?",
      answer:
        "Yes — whether you’re building from scratch or refreshing an existing brand, we tailor the strategy to your needs."
    },
    {
      question: "Will you provide brand guidelines?",
      answer:
        "Absolutely. Every project includes a comprehensive brand guideline document covering visual and verbal identity."
    },
    {
      question: "Can you help align branding with marketing campaigns?",
      answer:
        "Yes — we ensure that the brand identity integrates seamlessly with your ongoing marketing and advertising efforts."
    }
  ],
  growth: {
    title: "Brand Strategy Impact Metrics",
    chartData: [
      { label: "Brand Recognition", value: 85 },
      { label: "Customer Trust", value: 80 },
      { label: "Market Differentiation", value: 78 },
      { label: "Engagement Lift", value: 72 }
    ],
    highlights: [
      { icon: faBullhorn, text: "2.5x increase in brand recall post-launch" },
      { icon: faHandshake, text: "Higher client trust and repeat business" },
      { icon: faStar, text: "Consistent identity across all customer touchpoints" }
    ]
  }
},
{
  id: "web-development",
  title: "Web Development",
  description:
    "Build high-performance, visually stunning websites that are optimized for user experience, conversions, and scalability.",
  details:
    "Your website is your digital storefront — and we make sure it’s built to impress and perform. From concept to launch, we design and develop websites that are fast, secure, mobile-responsive, and tailored to your brand’s goals. Whether it’s an informational site, eCommerce store, or custom web application, we combine design excellence with modern development standards to deliver a seamless online experience that drives results.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990627/web-development-team-illustration-ozzgkiub8q3jff8p_rbrctt.png",
  features: [
    "Custom website design and development tailored to your brand.",
    "Responsive layouts for flawless performance across all devices.",
    "SEO-friendly architecture and clean code structure.",
    "eCommerce solutions with secure payment integration.",
    "Content management systems (CMS) like WordPress, Shopify, or custom builds.",
    "Ongoing maintenance, updates, and performance optimization."
  ],
  testimonials: [
    {
      name: "Amit R.",
      feedback:
        "Our new website loads lightning fast and works perfectly on every device. It’s helped us convert more visitors into customers."
    },
    {
      name: "Sana Mehra",
      feedback:
        "They turned our vision into reality. The site is beautiful, functional, and easy for our team to update."
    },
    {
      name: "Karan Patel",
      feedback:
        "From the design to the backend, every detail was handled with care. Our bounce rate has dropped, and leads have gone up."
    }
  ],
  faqs: [
    {
      question: "Do you handle both design and development?",
      answer:
        "Yes — we offer end-to-end website services including UI/UX design, development, testing, and deployment."
    },
    {
      question: "Can you work with our existing website?",
      answer:
        "Absolutely — we can redesign, upgrade, or optimize your current site to meet modern performance and design standards."
    },
    {
      question: "Which technologies do you use?",
      answer:
        "We work with modern tech stacks like React, Node.js, WordPress, Shopify, and more, depending on your needs."
    }
  ],
  growth: {
    title: "Web Development Success Metrics",
    chartData: [
      { label: "Load Speed Improvement", value: 90 },
      { label: "Conversion Rate Increase", value: 82 },
      { label: "Mobile Optimization Score", value: 95 },
      { label: "User Engagement Boost", value: 78 }
    ],
    highlights: [
      { icon: faRocket, text: "Up to 3x faster website load times" },
      { icon: faMobileAlt, text: "100% mobile-friendly design" },
      { icon: faChartLine, text: "Significant boost in on-site engagement" }
    ]
  }
},
{
  id: "content-creation",
  title: "Content Creation",
  description:
    "Craft high-quality, engaging content that captures attention, builds trust, and drives meaningful action across all platforms.",
  details:
    "Great content is the heartbeat of your digital presence. We create compelling, brand-aligned content that speaks to your audience’s needs and inspires action. From blog articles and videos to social media posts, email campaigns, and visual assets, we ensure your message is clear, consistent, and impactful. Every piece is optimized for SEO, shareability, and engagement — so your brand stays top-of-mind.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990726/content-creator-5597780-4680827_yfe8eg.png",
  features: [
    "Custom blog posts, articles, and long-form content.",
    "Social media content calendars with graphics and captions.",
    "Video scripts, storyboards, and production planning.",
    "Email newsletters and drip campaign content.",
    "SEO-focused copywriting for web pages and landing pages.",
    "Branded visuals, infographics, and marketing creatives."
  ],
  testimonials: [
    {
      name: "Priya Menon",
      feedback:
        "Our blog engagement and shares have doubled. The tone, style, and topics match our audience perfectly."
    },
    {
      name: "Vikram S.",
      feedback:
        "They manage our content end-to-end — from idea to publishing. Consistency and quality are top-notch."
    },
    {
      name: "Sonal Gupta",
      feedback:
        "From social posts to in-depth guides, the content has improved our visibility and helped us connect better with our audience."
    }
  ],
  faqs: [
    {
      question: "Do you create content for all platforms?",
      answer:
        "Yes — we create platform-specific content for blogs, social media, email, video, and more."
    },
    {
      question: "Will the content be SEO-friendly?",
      answer:
        "Absolutely. We optimize every piece with relevant keywords, meta descriptions, and best practices for discoverability."
    },
    {
      question: "Can you match our brand voice?",
      answer:
        "Yes — we study your brand tone, audience, and goals to ensure the content aligns perfectly."
    }
  ],
  growth: {
    title: "Content Creation Performance Metrics",
    chartData: [
      { label: "Engagement Rate Increase", value: 85 },
      { label: "Organic Traffic Growth", value: 78 },
      { label: "Brand Visibility Boost", value: 82 },
      { label: "Lead Generation from Content", value: 74 }
    ],
    highlights: [
      { icon: faPenNib, text: "200+ high-quality pieces delivered monthly" },
      { icon: faShareAlt, text: "Higher share rates across all channels" },
      { icon: faSearch, text: "Optimized for discoverability and SEO" }
    ]
  }
},
{
  id: "email-marketing",
  title: "Email Marketing",
  description:
    "Engage, nurture, and convert your audience with targeted email campaigns that deliver measurable results.",
  details:
    "Email remains one of the most powerful channels for building customer relationships and driving conversions. We create personalized, visually appealing, and mobile-optimized email campaigns that speak directly to your audience’s needs. From welcome sequences and newsletters to promotional blasts and drip automations, every email is crafted to maximize open rates, click-throughs, and ROI — all backed by data-driven insights.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990788/Email-Marketing-Illustration-1024x844_wcadxm.jpg",
  features: [
    "Custom-designed, mobile-friendly email templates.",
    "Automated drip campaigns for nurturing leads.",
    "Personalized messaging based on user behavior.",
    "A/B testing for subject lines, content, and CTAs.",
    "Detailed performance analytics and reporting.",
    "Integration with CRM and marketing automation tools."
  ],
  testimonials: [
    {
      name: "Rakesh Sinha",
      feedback:
        "Our open rates jumped by 40% after they redesigned our emails and improved segmentation."
    },
    {
      name: "Meera Joshi",
      feedback:
        "They set up an entire automated funnel that now generates leads for us 24/7. Brilliant execution!"
    },
    {
      name: "Arjun Kapoor",
      feedback:
        "The weekly newsletters keep our customers engaged and informed — we’ve seen a direct impact on repeat sales."
    }
  ],
  faqs: [
    {
      question: "Do you handle email automation?",
      answer:
        "Yes — we set up automated campaigns for onboarding, nurturing, re-engagement, and more."
    },
    {
      question: "Can you integrate with our CRM?",
      answer:
        "Absolutely. We work with platforms like HubSpot, Mailchimp, ActiveCampaign, Klaviyo, and others."
    },
    {
      question: "Will you manage the content and design?",
      answer:
        "Yes — we handle everything from copywriting to template design, ensuring consistency with your brand."
    }
  ],
  growth: {
    title: "Email Marketing Performance Metrics",
    chartData: [
      { label: "Open Rate Increase", value: 84 },
      { label: "Click-Through Rate Boost", value: 76 },
      { label: "Lead Nurturing Efficiency", value: 81 },
      { label: "Revenue from Email", value: 73 }
    ],
    highlights: [
      { icon: faEnvelopeOpenText, text: "40%+ higher open rates for segmented lists" },
      { icon: faUsers, text: "Automated workflows that run 24/7" },
      { icon: faChartBar, text: "Data-backed improvements every month" }
    ]
  }
},
{
  id: "conversion-optimization",
  title: "Conversion Optimization",
  description:
    "Turn more visitors into customers by improving your website’s user experience, trust signals, and performance.",
  details:
    "Getting traffic is only half the battle — the real win is converting that traffic into leads or sales. Our Conversion Rate Optimization (CRO) service uses analytics, user behavior tracking, A/B testing, and persuasive design to increase the percentage of visitors who take action. We refine every step of your funnel, from landing pages to checkout, ensuring your audience moves seamlessly toward conversion.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754991421/tips-to-increase-conversion-rates-strategy-1320x879_rqqnt5.jpg",
  features: [
    "In-depth funnel analysis and user behavior tracking.",
    "A/B and multivariate testing for layouts, CTAs, and copy.",
    "Optimized landing pages with persuasive content.",
    "Improved site speed and mobile responsiveness.",
    "Enhanced trust signals and social proof placement.",
    "Detailed monthly reports with actionable insights."
  ],
  testimonials: [
    {
      name: "Shalini Verma",
      feedback:
        "We thought our site was fine — but after CRO, our sales shot up by 35% without increasing ad spend."
    },
    {
      name: "Rahul Jain",
      feedback:
        "Their testing approach uncovered small tweaks that made a huge impact on our lead forms and checkout pages."
    },
    {
      name: "Tanya Malhotra",
      feedback:
        "Our bounce rate dropped significantly, and we’re seeing more engaged visitors turning into customers."
    }
  ],
  faqs: [
    {
      question: "Do you test changes before implementing?",
      answer:
        "Yes — we run A/B or multivariate tests to ensure improvements are backed by real data."
    },
    {
      question: "Will CRO affect our SEO?",
      answer:
        "No — in fact, improving page speed, mobile experience, and engagement can have positive SEO benefits."
    },
    {
      question: "Can you work with our existing design team?",
      answer:
        "Absolutely. We can either execute the changes or collaborate with your internal team to implement them."
    }
  ],
  growth: {
    title: "Conversion Optimization Performance Metrics",
    chartData: [
      { label: "Conversion Rate Increase", value: 88 },
      { label: "Bounce Rate Reduction", value: 72 },
      { label: "Lead Quality Improvement", value: 80 },
      { label: "Checkout Completion Rate", value: 77 }
    ],
    highlights: [
      { icon: faArrowTrendUp, text: "Up to 3x improvement in conversions" },
      { icon: faMousePointer, text: "Better CTA engagement rates" },
      { icon: faTachometerAlt, text: "Faster page loads for improved UX" }
    ]
  }
},
{
  id: "analytics",
  title: "Analytics & Insights",
  description:
    "Turn raw data into actionable insights to track performance, measure ROI, and make smarter business decisions.",
  details:
    "Data tells the real story of your business performance. Our analytics service helps you understand where your traffic comes from, how users behave, and what drives conversions. We set up advanced tracking, create interactive dashboards, and provide regular reports that reveal opportunities for growth. From Google Analytics and Tag Manager to heatmaps and funnel tracking, we make sure every decision you take is backed by solid data.",
  image:
    "https://res.cloudinary.com/dqdngisww/image/upload/v1754990950/interactive-whiteboard-with-diagrams-notes-vector-illustration_1253202-1279_d9ehif.jpg",
  features: [
    "Custom Google Analytics 4 (GA4) setup and configuration.",
    "Event, goal, and conversion tracking for campaigns.",
    "Interactive dashboards for real-time insights.",
    "User behavior analysis with heatmaps and session recordings.",
    "Attribution modeling to understand conversion paths.",
    "Monthly performance reports with recommendations."
  ],
  testimonials: [
    {
      name: "Harshita Rao",
      feedback:
        "We used to make guesses — now we make decisions based on data. The clarity we have now is a game changer."
    },
    {
      name: "Rohit Mehra",
      feedback:
        "They helped us set up tracking for every touchpoint. We finally know which campaigns are worth scaling."
    },
    {
      name: "Ananya Sen",
      feedback:
        "The dashboards are simple to understand yet detailed enough for deep analysis. Saves us hours every week."
    }
  ],
  faqs: [
    {
      question: "Do you provide ongoing reporting?",
      answer:
        "Yes — we deliver monthly reports along with quarterly deep-dive sessions to review performance."
    },
    {
      question: "Can you integrate with our CRM or ad platforms?",
      answer:
        "Absolutely. We can connect analytics with Google Ads, Meta Ads, HubSpot, and more for unified insights."
    },
    {
      question: "Will you help us set KPIs?",
      answer:
        "Yes — we define clear, measurable KPIs based on your business goals and track progress against them."
    }
  ],
  growth: {
    title: "Analytics & Insights Impact Metrics",
    chartData: [
      { label: "Data Accuracy Improvement", value: 92 },
      { label: "ROI Tracking Efficiency", value: 85 },
      { label: "Conversion Path Clarity", value: 80 },
      { label: "Decision-Making Speed", value: 88 }
    ],
    highlights: [
      { icon: faChartPie, text: "100% accurate tracking setup" },
      { icon: faLightbulb, text: "Data-backed decision making" },
      { icon: faProjectDiagram, text: "Clear view of multi-channel performance" }
    ]
  }
}








  ];
  const service = serviceData.find((s) => s.id === serviceId);
  if (!service) return <div className="svcpg-wrap"><h1>Service Not Found</h1></div>;

  const fadeUp = (d = 0) => ({
    initial: { opacity: 0, y: 30 },
    // whileInView: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3,margin: "-80px 0px -80px 0px"  },
    transition: { duration: 0.6, ease: "easeOut", delay: d },
  });

  return (
    <div className="svcpg-wrap">
      {/* HERO */}
      <motion.header className="svcpg-hero" {...fadeUp(.05)}>
        <div className="svcpg-hero-inner">
          <div className="svcpg-hero-text">
            <span className="svcpg-badge">Service</span>
            <h1>{service.title}</h1>
            <p>{service.description}</p>

            <div className="svcpg-stats">
              <div className="stat">
                <strong>+100%</strong>
                <span>Avg. Growth</span>
              </div>
              <div className="stat">
                <strong>90 Days</strong>
                <span>To First Wins</span>
              </div>
              <div className="stat">
                <strong>ROI‑Led</strong>
                <span>Strategy</span>
              </div>
            </div>
          </div>

          <div className="svcpg-hero-cta">
            <button className="svcpg-btn" onClick={() => (window.location.href = "tel:" + webinfo.phone)}>
              Call Us: {webinfo.phone}
            </button>
            <span className="svcpg-help">No sales fluff—just solutions.</span>
          </div>
        </div>
      </motion.header>

      {/* SUBCATEGORIES */}
      {service.subcategories && (
        <motion.section className="svcpg-subcats" {...fadeUp(.05)}>
          <h3>Explore Related Services</h3>
          <div className="svcpg-subgrid">
            {service.subcategories.map((sub, i) => (
              <a key={i} href={sub.route} className="svcpg-subcard">
                <div className="imgbox">
                  {sub.img ? <img src={sub.img} alt={sub.name} /> : <div className="imgph" />}
                </div>
                <div className="meta">
                  <span>{sub.name}</span>
                  <em>Learn more →</em>
                </div>
              </a>
            ))}
          </div>
        </motion.section>
      )}

      {/* MAIN SPLIT */}
      <section className="svcpg-main">
        <motion.article className="svcpg-about glass" {...fadeUp(.1)}>
          <h2>About the Service</h2>
          <p className="lede">{service.details}</p>

          <h3>Key Features</h3>
          <ul className="svcpg-feats">
            {service.features.map((f, i) => (
              <li key={i}>
                <span className="tick">✔</span>
                {f}
              </li>
            ))}
          </ul>

          <div className="svcpg-inline-cta">
            <button className="svcpg-btn secondary" onClick={() => (window.location.href = "/contact")}>
              Talk to an Expert
            </button>
            <button className="svcpg-btn ghost" onClick={() => (window.location.href = "tel:" + webinfo.phone)}>
              Call Now
            </button>
          </div>
        </motion.article>

        <motion.figure className="svcpg-visual" {...fadeUp(.15)}>
          <img src={service.image} alt={service.title} />
          <figcaption>Execution + Insights = Compounding Growth</figcaption>
        </motion.figure>
      </section>

      {/* GROWTH */}
      {service.growth && (
        <motion.section className="svcpg-growth" {...fadeUp(.1)}>
          <h2><FontAwesomeIcon icon={faChartLine} /> {service.growth.title}</h2>

          <div className="bars">
            {service.growth.chartData.map((d, i) => (
              <div className="bar" key={i}>
                <div className="bar-head">
                  <label>{d.label}</label>
                  <span className="val">{d.value}%</span>
                </div>
                <div className="bar-rail">
                  <div className="bar-fill" style={{ width: `${d.value}%` }} />
                </div>
              </div>
            ))}
          </div>

          <ul className="hi-list">
            {service.growth.highlights.map((h, i) => (
              <li key={i}>
                <FontAwesomeIcon icon={h.icon} />
                {h.text}
              </li>
            ))}
          </ul>
        </motion.section>
      )}

      {/* TESTIMONIALS */}
      <motion.section className="svcpg-testis" {...fadeUp(.1)}>
        <h2>What Our Clients Say</h2>
        <div className="tgrid">
          {service.testimonials.map((t, i) => (
            <motion.blockquote
              key={i}
              className="tcard"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .45, delay: i * .05 }}
            >
              <p>“{t.feedback}”</p>
              <footer>— {t.name}</footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default ServicesPage;
