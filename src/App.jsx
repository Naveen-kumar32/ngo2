import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowRight, Search, MapPin, Users, HeartHandshake,
  ShieldCheck, Sparkles, Mail, Phone, Instagram,
  Linkedin, Facebook, Heart, CheckCircle2, Clock, Send
} from 'lucide-react';
import { motion } from 'framer-motion';
import { causes, stories } from './data';
import { CAUSE_TO_SERVICE } from './ngoDirectory';
import IndiaNetworkMap from './components/IndiaNetworkMap';
import Navbar from './components/Navbar';
import LiveTicker from './components/LiveTicker';
import DonationModal from './components/DonationModal';
import ScrollToTop from './components/ScrollToTop';
import GrassrootsMosaic from './components/GrassrootsMosaic';
import NgoSearch from './components/NgoSearch';
import Logo from './components/Logo';

function Image({ src, alt = '', className = '' }) {
  const FALLBACKS = [
    [/education|classroom|school|literacy|digital/i, 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80&auto=format&fit=crop'],
    [/health|medical|hospital|doctor/i, 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=900&q=80&auto=format&fit=crop'],
    [/environment|tree|plant|green|climate/i, 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=900&q=80&auto=format&fit=crop'],
    [/women|child|girl/i, 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=900&q=80&auto=format&fit=crop'],
    [/livelihood|work|enterprise|job/i, 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80&auto=format&fit=crop'],
    [/disab/i, 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80&auto=format&fit=crop'],
    [/story|hope|feature/i, 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=900&q=80&auto=format&fit=crop'],
    [/csr|partner|corporate/i, 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=900&q=80&auto=format&fit=crop'],
    [/volunteer/i, 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=900&q=80&auto=format&fit=crop'],
    [/resource|book|guide/i, 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900&q=80&auto=format&fit=crop'],
    [/ngo|team|foundation/i, 'https://images.unsplash.com/photo-1560523159-4a9692d222f8?w=900&q=80&auto=format&fit=crop'],
    [/project/i, 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80&auto=format&fit=crop']
  ];
  const DEFAULT = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=900&q=80&auto=format&fit=crop';
  const resolve = (s, a) => {
    if (s && !/^\/images\//i.test(s)) return s;
    const hay = `${s || ''} ${a || ''}`;
    const match = FALLBACKS.find(([re]) => re.test(hay));
    return match ? match[1] : DEFAULT;
  };
  const [resolved, setResolved] = useState(() => resolve(src, alt));
  return (
    <div className={`image-slot ${className}`}>
      <img src={resolved} alt={alt} loading="lazy" decoding="async" onError={() => setResolved(DEFAULT)} />
    </div>
  );
}

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function InnerHero({ kicker, title, em, desc, image, stats }) {
  return (
    <section className="inner-hero">
      {image && (
        <div className="inner-hero-bg">
          <Image src={image} alt={title} />
        </div>
      )}
      <div>
        <span className="eyebrow-pill">✦ {kicker}</span>
        <h1>{title} <em>{em}</em></h1>
        <p>{desc}</p>
        {stats && (
          <div className="inner-hero-meta">
            {stats.map(([n, l]) => (
              <span key={l}>
                <b>{n}</b> {l}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ClosingCta() {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div className="closing-cta-card">
        <div className="closing-cta-copy">
          <span className="eyebrow-pill">✦ The All-India Network</span>
          <h2 id="closing-cta-title">Be the change <em>your community needs.</em></h2>
          <p>Join 2,500+ verified NGOs and 50,000 volunteers already working district by district.</p>
        </div>
        <div className="closing-cta-actions">
          <span className="hand-note" aria-hidden="true">it takes 2 minutes ↘</span>
          <div className="closing-cta-buttons">
            <Link className="btn btn-primary" to="/register">
              Join the Network <ArrowRight size={15} />
            </Link>
            <Link className="btn btn-coral" to="/ngos">
              <Search size={15} /> Find an NGO
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <Logo tone="dark" size={48} />
          <p>
            A national platform that connects NGOs, volunteers and CSR partners across every state. We don't run programmes ourselves; we help people find the organisations that do.
          </p>
        </div>
        <div>
          <h4>Explore Network</h4>
          <Link to="/ngos">NGO Directory</Link>
          <Link to="/causes">Causes</Link>
          <Link to="/stories">Stories of Change</Link>
          <Link to="/resources">Toolkits &amp; Resources</Link>
        </div>
        <div>
          <h4>Get Involved</h4>
          <Link to="/volunteer">Volunteer Connect</Link>
          <Link to="/csr">CSR Partnerships</Link>
          <Link to="/register">List Your NGO</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div>
          <h4>Federation Desk</h4>
          <p><Mail size={15} /> secretariat@ngofederation.org</p>
          <p><Phone size={15} /> +91 98765 43210</p>
          <p><MapPin size={15} /> Central Secretariat, New Delhi, India</p>
          <div className="social">
            <Instagram size={17} />
            <Linkedin size={17} />
            <Facebook size={17} />
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <span>© 2026 Indian National NGO Federation. All rights reserved.</span>
          <nav className="footer-legal" aria-label="Legal">
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
            <Link to="/privacy">Privacy Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

function Page({ children, onOpenDonate, onOpenSearch }) {
  return (
    <>
      <Navbar onOpenDonate={onOpenDonate} onOpenSearch={onOpenSearch} />
      <main>{children}</main>
      <ClosingCta />
      <Footer />
    </>
  );
}

function Stats() {
  return (
    <div className="stats-container">
      <div className="stats-grid">
        {[
          ['2,500+', 'Verified NGOs', ShieldCheck],
          ['75+', 'Social Causes', HeartHandshake],
          ['150+', 'District Hubs', MapPin],
          ['₹42 Cr+', 'Impact Funds', Sparkles],
          ['50K+', 'Volunteers', Users]
        ].map(([n, l, I], i) => (
          <Reveal key={l} delay={i * 0.04}>
            <div className="stat-box">
              <div className="stat-icon-wrap">
                <I size={20} />
              </div>
              <div>
                <span className="stat-val">{n}</span>
                <span className="stat-lbl">{l}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================================
   Home Page Template
   ========================================================================== */
function Home({ onOpenDonate }) {
  const navigate = useNavigate();
  const [heroQuery, setHeroQuery] = useState('');
  const submitHeroSearch = (e) => {
    e.preventDefault();
    const q = heroQuery.trim();
    navigate(q ? `/ngos?q=${encodeURIComponent(q)}` : '/ngos');
  };

  return (
    <Page onOpenDonate={onOpenDonate}>
      {/* Modern Home Hero with Live India Network Map */}
      <div className="hero-home-wrapper">
        <section className="hero-home-section">
          <div className="hero-left-column">
            <div className="hero-eyebrow-row">
              <span className="eyebrow-pill">✦ Pan-India Social Impact Federation</span>
              <span className="hero-live-indicator">
                <span className="live-dot" /> Free for every NGO to list
              </span>
            </div>

            <h1>Empowering India's <em>Grassroots Heroes</em></h1>
            <p>
              A verified national alliance of accredited NGOs, volunteers, and CSR leaders driving real, measurable social development across all 36 States &amp; Union Territories of India.
            </p>

            {/* Hero Quick Search Engine */}
            <div className="hero-search-box">
              <form className="hero-search-input-wrap" role="search" onSubmit={submitHeroSearch}>
                <Search size={16} className="search-icon-muted" />
                <input
                  type="search"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Search NGOs by name, city or state..."
                  aria-label="Search NGOs by name, city or state"
                />
                <button type="submit" className="hero-search-btn">
                  Search <ArrowRight size={13} />
                </button>
              </form>
              <div className="hero-popular-chips">
                <small>Popular:</small>
                <Link to="/ngos?service=Education">Education</Link>
                <Link to="/ngos?service=Healthcare">Healthcare</Link>
                <Link to="/ngos?service=Water%20%26%20Sanitation">Clean Water</Link>
                <Link to="/ngos?service=Women%20%26%20Children">Women &amp; Children</Link>
              </div>
            </div>

            {/* CTAs & Social Proof */}
            <div className="hero-action-group">
              <div className="hero-btn-row">
                <Link className="btn btn-primary" to="/ngos">
                  Find an NGO <ArrowRight size={15} />
                </Link>
                <button className="btn btn-coral" onClick={onOpenDonate}>
                  <Heart size={15} /> Quick Donate
                </button>
                <Link className="btn btn-outline" to="/register">
                  Join Federation
                </Link>
              </div>

              <div className="hero-social-proof">
                <div className="avatar-stack">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" alt="Volunteer" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" alt="Changemaker" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" alt="CSR partner" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="Coordinator" />
                </div>
                <div className="proof-text">
                  <b>18,400+ Active Volunteers</b>
                  <span>&amp; 250+ CSR partners backing ground causes</span>
                </div>
              </div>
            </div>

            {/* Hero 3-Pillar Micro Badges */}
            <div className="hero-feature-trio">
              <div className="hft-item">
                <ShieldCheck size={16} className="hft-icon" />
                <div>
                  <strong>100% Audited</strong>
                  <small>12A, 80G &amp; FCRA Pre-vetted</small>
                </div>
              </div>
              <div className="hft-item">
                <Sparkles size={16} className="hft-icon amber" />
                <div>
                  <strong>Zero Intermediaries</strong>
                  <small>Direct to district escrow</small>
                </div>
              </div>
              <div className="hft-item">
                <CheckCircle2 size={16} className="hft-icon green" />
                <div>
                  <strong>Live Tax Receipts</strong>
                  <small>Instant 80G 50% deduction</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-right-column">
            <IndiaNetworkMap isHero={true} />
          </div>
        </section>
      </div>

      {/* Live Activity Ticker */}
      <LiveTicker />

      {/* Stats Counter Strip */}
      <Stats />

      {/* 3-Step Federation Trust Protocol (Soft Slate Backdrop) */}
      <div className="section-alt-slate">
        <section className="protocol-section">
          <div className="protocol-header">
            <span className="eyebrow-pill">✦ The Federation Protocol</span>
            <h2>A Trust Architecture Built for <em>Total Accountability</em></h2>
            <p>Every rupee and every volunteer hour is protected by our transparent 3-step verification engine.</p>
          </div>
          <div className="protocol-grid">
            <div className="protocol-card">
              <span className="protocol-step-num">01</span>
              <div className="protocol-icon-wrap">
                <ShieldCheck size={22} />
              </div>
              <h3>Rigorous 7-Point Audit</h3>
              <p>12A, 80G, and FCRA licenses are cross-verified alongside field audits and annual financial filings before any NGO joins.</p>
            </div>

            <div className="protocol-card">
              <span className="protocol-step-num">02</span>
              <div className="protocol-icon-wrap" style={{ background: 'var(--amber-100)', color: 'var(--amber-500)' }}>
                <Sparkles size={22} />
              </div>
              <h3>Direct District Escrow</h3>
              <p>Funds bypass central bureaucracy and route directly to verified local district hubs for on-ground project execution.</p>
            </div>

            <div className="protocol-card">
              <span className="protocol-step-num">03</span>
              <div className="protocol-icon-wrap" style={{ background: 'var(--emerald-50)', color: 'var(--emerald-600)' }}>
                <CheckCircle2 size={22} />
              </div>
              <h3>Live Ledger &amp; 80G Receipts</h3>
              <p>Instant digital tax receipts generated with real-time milestone logs, photo dispatches, and measurable beneficiary counts.</p>
            </div>
          </div>
        </section>
      </div>

      {/* Organic Wavy Transition */}
      <div className="wavy-separator">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" className="shape-fill" />
        </svg>
      </div>

      {/* Grassroots Field Changemakers Mosaic (Warm Sand Backdrop) */}
      <GrassrootsMosaic />

      {/* Cause Categories (Pure White Backdrop) */}
      <div className="section-alt-white">
        <section className="content-section">
          <div className="section-header-modern">
            <div>
              <span className="eyebrow-pill">✦ Priority Sectors</span>
              <h2>Find Causes You <em>Care About</em></h2>
              <p>From rural literacy and digital classrooms to primary healthcare and sustainable ecosystems.</p>
            </div>
            <Link className="btn btn-outline" to="/causes">
              View All 75+ Causes <ArrowRight size={14} />
            </Link>
          </div>
          <div className="cause-modern-grid">
            {causes.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.04}>
                <Link className="cause-tile" to={`/ngos?cause=${c.slug}`}>
                  <Image src={c.image} alt={c.title} />
                  <div className="cause-chip">{c.count}</div>
                  <div className="cause-tile-overlay">
                    <h3>{c.title}</h3>
                    <span>Find NGOs for this cause →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      {/* Federation Network Presence Highlights (Deep Midnight Dark Canvas) */}
      <div className="section-alt-midnight">
        <section className="content-section">
          <div className="presence-card-dark">
            <span className="eyebrow-pill on-dark">
              ✦ Nationwide Federation Presence
            </span>
            <h2>Connecting NGOs Across <em>Every Corner of India</em></h2>
            <p>
              The Indian National NGO Federation operates an active collaboration network connecting verified grassroots organizations, CSR leaders, and volunteers from Kashmir to Kanyakumari.
            </p>
            <div className="presence-highlights-grid">
              <div className="presence-hl-box">
                <span className="p-num">2,500+</span>
                <span className="p-title">Verified NGO Partners</span>
                <p>Pre-screened with legal, financial, and on-ground impact verification.</p>
              </div>
              <div className="presence-hl-box">
                <span className="p-num">150+</span>
                <span className="p-title">District Hubs</span>
                <p>Interlinked for rapid disaster relief, knowledge sharing, and resource pooling.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '26px', marginBottom: '22px', flexWrap: 'wrap' }}>
              <Link className="btn btn-coral" to="/ngos">
                Explore Directory <ArrowRight size={14} />
              </Link>
              <Link className="btn btn-outline" to="/register" style={{ background: 'transparent', color: '#ffffff', borderColor: 'rgba(255,255,255,0.3)' }}>
                Accredit Your NGO
              </Link>
            </div>
            <div className="presence-locations-strip">
              <span><b>Delhi NCR</b> 142 Active NGOs</span>
              <span><b>Mumbai</b> 185 Active NGOs</span>
              <span><b>Bengaluru</b> 134 Active NGOs</span>
              <span><b>Chennai</b> 128 Active NGOs</span>
              <span><b>Kolkata</b> 116 Active NGOs</span>
              <span><b>Hyderabad</b> 98 Active NGOs</span>
            </div>
          </div>
        </section>
      </div>

      {/* Search-first NGO finder (text only) */}
      <div className="section-alt-pearl">
        <section className="content-section">
          <div className="section-header-modern">
            <div>
              <span className="eyebrow-pill">✦ NGO Directory</span>
              <h2>Find an NGO <em>near you</em></h2>
              <p>Search by name, city or state, or filter by the service you need. We list each NGO's name and location so you can reach them directly.</p>
            </div>
            <Link className="btn btn-outline" to="/ngos">
              Open Full Directory <ArrowRight size={14} />
            </Link>
          </div>
          <NgoSearch compact />
        </section>
      </div>
    </Page>
  );
}

/* ==========================================================================
   Causes Page
   ========================================================================== */
function Causes({ onOpenDonate }) {
  const [search, setSearch] = useState('');
  const filtered = causes.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="Impact Causes"
        title="Every cause has a"
        em="community behind it."
        desc="Pick a cause to find NGOs working on it near you, anywhere in India."
        image="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1400&q=80&auto=format&fit=crop"
        stats={[['75+', 'Causes'], ['2,500+', 'NGOs'], ['150+', 'Cities']]}
      />
      <section className="content-section">
        <div className="searchbar" style={{ maxWidth: '640px', marginBottom: '32px' }}>
          <Search size={18} />
          <input
            placeholder="Search causes (e.g. Education, Healthcare, Environment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="cause-modern-grid">
          {filtered.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.04}>
              <Link className="cause-tile" to={`/ngos?cause=${c.slug}`}>
                <Image src={c.image} alt={c.title} />
                <div className="cause-chip">{c.count}</div>
                <div className="cause-tile-overlay">
                  <h3>{c.title}</h3>
                  <span>Find NGOs for this cause →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   NGOs Directory Page
   ========================================================================== */
function NGOs({ onOpenDonate }) {
  const [params] = useSearchParams();
  const initialService = params.get('service') || CAUSE_TO_SERVICE[params.get('cause')] || '';

  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="NGO Directory"
        title="Find the people doing"
        em="the ground work."
        desc="Search NGOs across India by name, city or state, and narrow by the service you're looking for."
        image="https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=1400&q=80&auto=format&fit=crop"
        stats={[['36', 'States & UTs'], ['12', 'Service areas'], ['Free', 'To search & list']]}
      />

      <section className="content-section directory-section">
        <NgoSearch
          key={params.toString()}
          initialQuery={params.get('q') || ''}
          initialService={initialService}
          initialState={params.get('state') || ''}
        />
      </section>

      {/* Map Section */}
      <section className="content-section map-section">
        <IndiaNetworkMap compact={true} />
        <div className="map-section-copy">
          <span className="eyebrow-pill">✦ Pan-India Hubs</span>
          <h2>Local work. <em>National reach.</em></h2>
          <p>Is your organisation missing? Listing is free. Add your NGO's name, location and services so people nearby can find you.</p>
          <Link className="btn btn-primary" to="/register" style={{ marginTop: '16px', display: 'inline-flex' }}>
            List Your NGO <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Volunteer Page
   ========================================================================== */
function Volunteer({ onOpenDonate }) {
  const [selectedSkill, setSelectedSkill] = useState('Teaching');

  const OPPORTUNITY_DATA = {
    Teaching: {
      role: "Digital Literacy & Community Tutor",
      match: "96%",
      desc: "Empower underprivileged children through weekend smart-learning sessions in Chennai and Delhi NCR hubs.",
      loc: "Chennai / Hybrid · Weekends · 3 hrs/week"
    },
    Design: {
      role: "Campaign Designer & Storyteller",
      desc: "Help grassroots NGOs create compelling social media assets, annual reports, and community infographics.",
      match: "94%",
      loc: "Remote · Flexible · 4 hrs/week"
    },
    Technology: {
      role: "NGO Portal & Database Mentor",
      desc: "Assist rural community centers with digital record management and open-source learning tools.",
      match: "98%",
      loc: "Bengaluru / Remote · 3 hrs/week"
    },
    Healthcare: {
      role: "Mobile Health Camp Coordinator",
      desc: "Assist doctors and nutritionists during weekend health checkup vans in rural clusters.",
      match: "91%",
      loc: "Pune / Mumbai · Bi-weekly"
    },
    Fundraising: {
      role: "CSR & Community Grant Writer",
      desc: "Help local NGOs draft impactful grant proposals and donor presentation decks.",
      match: "93%",
      loc: "Delhi NCR / Remote · Flexible"
    },
    Events: {
      role: "Community Drive & Plantation Leader",
      desc: "Lead on-ground volunteer teams for weekend ecological plantation and cleanup drives.",
      match: "89%",
      loc: "All Major Cities · Weekends"
    }
  };

  const currentMatch = OPPORTUNITY_DATA[selectedSkill] || OPPORTUNITY_DATA.Teaching;

  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="Volunteer Network"
        title="Your skills can become"
        em="someone's opportunity."
        desc="Discover volunteering opportunities that match your personal skills, interests, and availability."
        image="https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=1400&q=80&auto=format&fit=crop"
        stats={[['50K+', 'Volunteers'], ['320+', 'Open Roles'], ['150+', 'Cities']]}
      />

      <section className="content-section matcher">
        <div className="matcher-copy">
          <span className="eyebrow-pill">✦ Skill Matching Engine</span>
          <h2>What can you <em>bring?</em></h2>
          <p>Choose your skill background to find instant volunteer opportunities with verified NGOs.</p>
          <div className="skill-grid">
            {['Teaching', 'Design', 'Technology', 'Healthcare', 'Fundraising', 'Events'].map((skill) => (
              <button
                key={skill}
                type="button"
                className={selectedSkill === skill ? 'active-skill' : ''}
                onClick={() => setSelectedSkill(skill)}
                style={selectedSkill === skill ? { background: 'var(--emerald-800)', color: '#fff', borderColor: 'var(--emerald-800)' } : {}}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        <div className="matcher-result">
          <div className="match-ring">
            {currentMatch.match}
            <small>Skill Match</small>
          </div>
          <h3>{currentMatch.role}</h3>
          <p>{currentMatch.desc}</p>
          <span>{currentMatch.loc}</span>
          <Link className="btn btn-primary" to="/register" style={{ background: '#ffffff', color: 'var(--emerald-900)' }}>
            Apply as Volunteer <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   CSR Hub Page
   ========================================================================== */
function CSR({ onOpenDonate }) {
  const [budgetLakhs, setBudgetLakhs] = useState(50);

  const beneficiaries = (budgetLakhs * 55).toLocaleString('en-IN');
  const classrooms = Math.floor(budgetLakhs / 4);
  const healthVans = Math.floor(budgetLakhs / 8);

  return (
    <Page onOpenDonate={onOpenDonate}>
      <section className="csr-hero">
        <div className="csr-hero-bg">
          <Image src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1400&q=80&auto=format&fit=crop" alt="CSR partnership" />
        </div>
        <div>
          <span className="eyebrow-pill on-dark">
            ✦ Corporate CSR Connect
          </span>
          <h1>Move from CSR budgets to <em>community outcomes.</em></h1>
          <p>Discover audited district priorities, partner with 100% compliant NGOs, and track programs from allocation to verified proof of impact.</p>
          <Link className="btn btn-primary" to="/register" style={{ display: 'inline-flex', marginTop: '12px' }}>
            Initiate Corporate Partnership <ArrowRight size={15} />
          </Link>
        </div>
        <div className="csr-dashboard">
          <div>
            <span>Impact portfolio</span>
            <strong>₹12.6 Cr</strong>
            <small>tracked across verified multi-state programs</small>
          </div>
          <div className="bars">
            <i style={{ height: '68%' }} title="Education" />
            <i style={{ height: '90%' }} title="Healthcare" />
            <i style={{ height: '48%' }} title="Ecology" />
            <i style={{ height: '78%' }} title="Women Empowerment" />
            <i style={{ height: '60%' }} title="Skills" />
          </div>
        </div>
      </section>

      {/* Interactive CSR Calculator */}
      <section className="content-section csr-calculator">
        <div>
          <span className="eyebrow-pill">✦ Interactive Program Modeler</span>
          <h2>Plan your program before you <em>fund it.</em></h2>
          <p>Estimate verified community reach and potential outcomes based on your CSR allocation budget.</p>
          <div className="calculator" style={{ marginTop: '20px' }}>
            <label>
              CSR Budget Allocation: <strong>₹{budgetLakhs} Lakhs</strong>
            </label>
            <input
              type="range"
              min="5"
              max="200"
              step="5"
              value={budgetLakhs}
              onChange={(e) => setBudgetLakhs(Number(e.target.value))}
            />
            <div className="calc-result">
              <b>{beneficiaries}</b>
              <span>Estimated Direct Beneficiaries Touched</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '14px' }}>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '10px', fontSize: '13px' }}>
                <strong>{classrooms} Smart Classrooms</strong> or
              </div>
              <div style={{ padding: '12px', background: '#fff', borderRadius: '10px', fontSize: '13px' }}>
                <strong>{healthVans} Mobile Clinics</strong>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="map-hl-card" style={{ padding: '28px', background: '#fff', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-lg)' }}>
            <span className="hl-num" style={{ fontSize: '32px' }}>100% Audit Guarantee</span>
            <span className="hl-title" style={{ fontSize: '16px', margin: '4px 0 10px' }}>Statutory Schedule VII CSR Alignment</span>
            <p style={{ lineHeight: '1.6', color: 'var(--slate-600)' }}>
              All programs deployed through the Indian National NGO Federation are pre-audited under MCA guidelines, featuring quarterly third-party monitoring, geo-tagged proof of work, and direct utilization certificates.
            </p>
            <Link className="btn btn-primary" to="/register" style={{ marginTop: '20px', display: 'inline-flex' }}>
              Request CSR Consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Stories Page
   ========================================================================== */
function Stories({ onOpenDonate }) {
  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="Stories of Change"
        title="Behind every number is"
        em="a human story."
        desc="Inspiring stories from communities, volunteers and organizations creating meaningful change across India."
        image="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=1400&q=80&auto=format&fit=crop"
        stats={[['500+', 'Stories Shared'], ['12.8M', 'People Reached'], ['2,500+', 'NGOs']]}
      />
      <section className="content-section">
        <div className="story-grid story-grid-large">
          {[...stories, ...stories].map((s, i) => (
            <Link className="story-card" to="/stories" key={i}>
              <Image src={s.image} alt={s.title} />
              <div>
                <span>{s.tag}</span>
                <h3>{s.title}</h3>
                <small>Read Field Story →</small>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Resources Page
   ========================================================================== */
function Resources({ onOpenDonate }) {
  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="Knowledge Hub"
        title="Useful toolkits for"
        em="people doing the work."
        desc="Guides, templates and practical resources for NGOs, volunteers, CSR teams and community partners."
        image="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop"
        stats={[['12', 'Toolkits'], ['35+', 'Templates'], ['Free', 'Always']]}
      />
      <section className="content-section">
        <div className="resource-grid">
          {[
            ['NGO Compliance Toolkit', '12A, 80G, FCRA renewal, governance, and annual impact audit templates.'],
            ['CSR Partnership Framework', 'How to design scalable community programs with corporate partners.'],
            ['Volunteer Field Handbook', 'Practical guidance for safe, useful, and ethical community engagement.'],
            ['Impact Reporting Model', 'A clear framework for proving measurable outcomes to donors.'],
            ['Fundraising Blueprints', 'Campaign templates and communication kits for grassroots NGOs.'],
            ['Panchayat Collaboration', 'Methods for co-designing village-level development programs.']
          ].map((r, i) => (
            <article className="resource-card" key={r[0]}>
              <span>0{i + 1}</span>
              <h3>{r[0]}</h3>
              <p>{r[1]}</p>
              <Link to="/register">Open Toolkit <ArrowRight size={14} /></Link>
            </article>
          ))}
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Register Page
   ========================================================================== */
function Register({ onOpenDonate }) {
  const [step, setStep] = useState(1);

  return (
    <Page onOpenDonate={onOpenDonate}>
      <section className="register-hero">
        <div className="register-hero-bg">
          <Image src="https://images.unsplash.com/photo-1560523159-4a9692d222f8?w=1400&q=80&auto=format&fit=crop" alt="NGO team at work" />
        </div>
        <span className="eyebrow-pill on-dark">
          ✦ Join the Federation
        </span>
        <h1>Accredit your work where donors & volunteers <em>find it.</em></h1>
      </section>

      <section className="register-page">
        <div className="register-copy">
          <span className="eyebrow-pill">Accreditation Process</span>
          <h2>Put your work on India's <em>National Map.</em></h2>
          <p>Get listed in the national verified directory, gain access to corporate CSR grants, and connect with 50,000+ passionate volunteers.</p>
          <div className="register-points">
            <span>✓ Verified profile accreditation badge</span>
            <span>✓ CSR grant discovery & compliance support</span>
            <span>✓ Direct volunteer & donor routing</span>
            <span>✓ Free access to federation legal toolkits</span>
          </div>
        </div>

        <div className="register-form">
          <div className="steps">
            {['Organisation', 'Verification', 'Programs', 'Review'].map((x, i) => (
              <span className={step === i + 1 ? 'active' : ''} key={x}>
                <b>0{i + 1}</b>{x}
              </span>
            ))}
          </div>

          {step === 1 && (
            <>
              <h2>Tell us about your organization</h2>
              <label>Organization name<input placeholder="e.g. Swasthya Foundation" /></label>
              <label>Website / Social URL<input placeholder="https://" /></label>
              <label>Primary cause focus
                <select>
                  <option>Select a cause</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Environment & Climate</option>
                  <option>Women & Child Welfare</option>
                  <option>Livelihoods & Skills</option>
                </select>
              </label>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Verification & Accreditation</h2>
              <label>Registration Number (Trust / Society / Section 8)<input placeholder="e.g. 12A/XXXX/2024" /></label>
              <label>Entity Type
                <select>
                  <option>Registered Public Trust</option>
                  <option>Registered Society</option>
                  <option>Section 8 Company</option>
                </select>
              </label>
              <div className="upload-box">
                Drop registration documents / 12A / 80G here<br />
                <small>PDF, JPG or PNG (Up to 10MB)</small>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Field Presence & Reach</h2>
              <label>Primary Operating Districts / States<input placeholder="e.g. Chennai, Madurai, Salem" /></label>
              <label>Beneficiaries Reached Annually<input placeholder="e.g. 5,000" /></label>
              <label>Program Overview<textarea placeholder="Describe your key social interventions..." /></label>
            </>
          )}

          {step === 4 && (
            <>
              <h2>Submission Ready</h2>
              <div className="review-box">
                <b>Accreditation Review Pathway</b>
                <span>Your application will be verified by the Federation Secretariat within 3 business days.</span>
                <span>You will receive an official digital certification seal and listing in the national directory.</span>
              </div>
            </>
          )}

          <div className="form-actions">
            {step > 1 && <button className="btn btn-outline" onClick={() => setStep(step - 1)}>Back</button>}
            {step < 4 ? (
              <button className="btn btn-primary" onClick={() => setStep(step + 1)}>
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <Link className="btn btn-primary" to="/">
                Submit Application <CheckCircle2 size={15} />
              </Link>
            )}
          </div>
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Contact Page
   ========================================================================== */
function Contact({ onOpenDonate }) {
  const [sent, setSent] = useState(false);

  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero
        kicker="Contact"
        title="Talk to the"
        em="Federation desk."
        desc="Questions about listing your NGO, volunteering, CSR partnerships or anything else? Write to us and a coordinator will reply."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1400&q=80&auto=format&fit=crop"
      />

      <section className="content-section contact-page">
        <div className="contact-details">
          <span className="eyebrow-pill">✦ Reach us directly</span>
          <h2>We read <em>every message.</em></h2>
          <ul className="contact-list">
            <li><Mail size={18} /><div><b>Email</b><span>secretariat@ngofederation.org</span></div></li>
            <li><Phone size={18} /><div><b>Phone</b><span>+91 98765 43210</span></div></li>
            <li><MapPin size={18} /><div><b>Office</b><span>Central Secretariat, New Delhi, India</span></div></li>
            <li><Clock size={18} /><div><b>Hours</b><span>Monday to Friday, 10:00 to 18:00 IST</span></div></li>
          </ul>
          <p className="contact-note">
            We're a platform that connects people with NGOs. For help with a specific organisation's work,
            please contact that NGO directly.
          </p>
        </div>

        <div className="contact-form-card">
          {sent ? (
            <div className="contact-sent" role="status">
              <CheckCircle2 size={36} />
              <h3>Thanks, your message is with us.</h3>
              <p>A coordinator will reply by email within two working days.</p>
              <button type="button" className="btn btn-outline" onClick={() => setSent(false)}>Send another message</button>
            </div>
          ) : (
            <form
              className="contact-form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <h3>Send us a message</h3>
              <div className="form-grid-2">
                <label>Your name<input required name="name" autoComplete="name" /></label>
                <label>Email<input required type="email" name="email" autoComplete="email" /></label>
              </div>
              <label>
                I am
                <select name="role" defaultValue="">
                  <option value="" disabled>Choose one</option>
                  <option>From an NGO</option>
                  <option>A volunteer</option>
                  <option>From a company / CSR team</option>
                  <option>Someone looking for help</option>
                  <option>Other</option>
                </select>
              </label>
              <label>Message<textarea required name="message" rows={6} /></label>
              <label className="contact-consent">
                <input type="checkbox" required />
                <span>I agree to the <Link to="/privacy">Privacy Policy</Link>.</span>
              </label>
              <button type="submit" className="btn btn-primary">
                Send Message <Send size={15} />
              </button>
            </form>
          )}
        </div>
      </section>
    </Page>
  );
}

/* ==========================================================================
   Legal Pages (Terms & Privacy)
   ========================================================================== */
const LEGAL_UPDATED = '24 September 2026';

function LegalPage({ onOpenDonate, kicker, title, em, intro, sections }) {
  return (
    <Page onOpenDonate={onOpenDonate}>
      <InnerHero kicker={kicker} title={title} em={em} desc={intro} />
      <section className="content-section legal-page">
        <aside className="legal-toc" aria-label="On this page">
          <b>On this page</b>
          {sections.map(([heading], i) => (
            <a key={heading} href={`#s${i + 1}`}>{i + 1}. {heading}</a>
          ))}
        </aside>
        <article className="legal-body">
          <p className="legal-updated">Last updated: {LEGAL_UPDATED}</p>
          {sections.map(([heading, body], i) => (
            <section key={heading} id={`s${i + 1}`}>
              <h2>{i + 1}. {heading}</h2>
              {body.map((para, j) => <p key={j}>{para}</p>)}
            </section>
          ))}
          <p className="legal-contact">
            Questions about this page? <Link to="/contact">Contact us</Link> or write to secretariat@ngofederation.org.
          </p>
        </article>
      </section>
    </Page>
  );
}

function Terms({ onOpenDonate }) {
  return (
    <LegalPage
      onOpenDonate={onOpenDonate}
      kicker="Terms & Conditions"
      title="The rules for using"
      em="this platform."
      intro="Please read these terms before using the site. By using it, you agree to them."
      sections={[
        ['Who we are', [
          'Indian National NGO Federation ("the Federation", "we", "us") runs this website as a platform that connects NGOs, volunteers, companies and members of the public across India.',
          'The Federation is not itself an NGO delivering programmes. We do not run projects on the ground, and we are not responsible for the work of any organisation listed on the platform.',
        ]],
        ['Using the directory', [
          'The NGO directory shows basic information (name, location and service areas) supplied by NGOs themselves or taken from public sources. We try to keep it accurate but do not guarantee that any listing is complete, current or correct.',
          'A listing is not an endorsement. Before you volunteer with, donate to or partner with any organisation, please do your own checks, for example of its registration, 12A/80G status and FCRA status where relevant.',
        ]],
        ['Listing your NGO', [
          'If you submit a listing, you confirm that you are authorised to act for the organisation and that the information you give is true.',
          'We may edit, decline or remove any listing at our discretion, including where information appears false, misleading or outdated.',
        ]],
        ['Acceptable use', [
          'You agree not to misuse the site, including by scraping the directory in bulk, submitting false information, impersonating another person or organisation, or trying to disrupt or gain unauthorised access to the service.',
        ]],
        ['Arrangements with NGOs', [
          'Any volunteering, donation, partnership or other arrangement you make with a listed NGO is between you and that NGO. The Federation is not a party to it and is not liable for it.',
        ]],
        ['Content and trademarks', [
          'The site design, text, logo and graphics belong to the Federation or its licensors. NGO names and marks belong to their respective owners.',
        ]],
        ['Limitation of liability', [
          'The platform is provided "as is". To the extent allowed by law, the Federation is not liable for any loss arising from your use of the site or your dealings with any listed organisation.',
        ]],
        ['Changes and governing law', [
          'We may update these terms from time to time; the date at the top shows the latest version. These terms are governed by the laws of India, and the courts at New Delhi have jurisdiction.',
        ]],
      ]}
    />
  );
}

function Privacy({ onOpenDonate }) {
  return (
    <LegalPage
      onOpenDonate={onOpenDonate}
      kicker="Privacy Policy"
      title="How we handle"
      em="your information."
      intro="We collect as little as we can, use it only to run the platform, and never sell it."
      sections={[
        ['What we collect', [
          'Information you give us: your name, email, phone number and message when you contact us; organisation details when you list an NGO; and details you share when you apply to volunteer or enquire about CSR partnerships.',
          'Basic technical data: pages visited, browser type and approximate location from your IP address, used to keep the site working and secure.',
        ]],
        ['How we use it', [
          'To reply to you, publish and maintain NGO listings, connect volunteers and partners with organisations, and improve the platform. We use your data only for the purpose you gave it for.',
        ]],
        ['What we publish', [
          'For listed NGOs we publish only the organisation name, city, state and service areas. We do not publish personal contact details of individuals without consent.',
        ]],
        ['Sharing', [
          'We do not sell personal data. We share it only with service providers who help us run the site (such as hosting and email), with an NGO when you ask us to connect you to it, or where the law requires.',
        ]],
        ['Retention', [
          'We keep personal data only as long as needed for the purpose it was collected for, or as required by law, and then delete it.',
        ]],
        ['Your rights', [
          'Under the Digital Personal Data Protection Act, 2023, you can ask to access, correct or erase your personal data, withdraw consent, and raise a grievance. Write to secretariat@ngofederation.org and we will respond within the time the law requires.',
        ]],
        ['Cookies', [
          'We use only essential cookies and similar storage needed for the site to work. If we add analytics cookies, we will update this policy and ask for your consent where required.',
        ]],
        ['Grievance Officer', [
          'Grievance Officer, Indian National NGO Federation, Central Secretariat, New Delhi, India. Email: secretariat@ngofederation.org.',
        ]],
      ]}
    />
  );
}

function NotFound({ onOpenDonate }) {
  return (
    <Page onOpenDonate={onOpenDonate}>
      <section className="not-found">
        <span>404</span>
        <h1>Let's get you back to <em>the network.</em></h1>
        <Link className="btn btn-primary" to="/" style={{ display: 'inline-flex', marginTop: '16px' }}>
          Return Home <ArrowRight size={14} />
        </Link>
      </section>
    </Page>
  );
}

export default function App() {
  const [donateOpen, setDonateOpen] = useState(false);

  return (
    <>
      {/* Scroll restoration to top on any page link click */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/causes" element={<Causes onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/ngos" element={<NGOs onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/volunteer" element={<Volunteer onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/csr" element={<CSR onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/stories" element={<Stories onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/resources" element={<Resources onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/register" element={<Register onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/contact" element={<Contact onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/terms" element={<Terms onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="/privacy" element={<Privacy onOpenDonate={() => setDonateOpen(true)} />} />
        <Route path="*" element={<NotFound onOpenDonate={() => setDonateOpen(true)} />} />
      </Routes>

      {/* Global Interactive Donation Modal */}
      <DonationModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </>
  );
}
