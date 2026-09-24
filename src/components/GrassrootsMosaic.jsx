import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MapPin, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GrassrootsMosaic() {
  const cards = [
    {
      img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80&auto=format&fit=crop',
      title: 'Digital Literacy in Bastar',
      hub: 'Odisha & CG Hub',
      badge: '50 Solar Tablets',
      rotate: -3,
      tapeColor: '#f59e0b',
      note: 'Empowering 400+ adivasi girls with vernacular tech education.'
    },
    {
      img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=700&q=80&auto=format&fit=crop',
      title: 'Mobile Clinics in Nilgiris',
      hub: 'Tamil Nadu Hub',
      badge: '1,200 Screened',
      rotate: 4,
      tapeColor: '#2563eb',
      note: 'Doorstep preventive diagnostics for remote tea plantation workers.'
    },
    {
      img: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=700&q=80&auto=format&fit=crop',
      title: 'Mangrove Revival Cluster',
      hub: 'Sundarbans Hub',
      badge: '15,000 Saplings',
      rotate: -2,
      tapeColor: '#10b981',
      note: 'Shielding delta villages from cyclones with coastal biosheilds.'
    },
    {
      img: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=700&q=80&auto=format&fit=crop',
      title: 'Artisan Micro-Enterprise',
      hub: 'Rajasthan Hub',
      badge: '320 Women Led',
      rotate: 3,
      tapeColor: '#f97316',
      note: 'Direct market linkages cutting out middle-men for handloom weavers.'
    }
  ];

  return (
    <section className="grassroots-section">
      <div className="grassroots-container">
        {/* Left Storyteller Info */}
        <div className="grassroots-content">
          <span className="eyebrow-pill">✦ Grassroots Ground Reality</span>
          <h2>Not Just Numbers.<br /><em>Faces of Transformation.</em></h2>
          <p>
            Behind every verified NGO in our federation is a team of tireless community leaders working in India's most underserved hamlets. We connect their ground-level courage with institutional capital and passionate volunteers.
          </p>
          
          <div className="grassroots-feature-list">
            <div className="gf-item">
              <div className="gf-icon-wrap">
                <ShieldCheck size={18} />
              </div>
              <div>
                <b>100% On-Site Audits</b>
                <p>Every project undergoes geo-tagged photo verification and beneficiary feedback.</p>
              </div>
            </div>

            <div className="gf-item">
              <div className="gf-icon-wrap amber">
                <Sparkles size={18} />
              </div>
              <div>
                <b>Zero Intermediary Loss</b>
                <p>94.2% of total allocated funds go directly into grassroots execution.</p>
              </div>
            </div>
          </div>

          <div className="grassroots-action-row">
            <Link to="/stories" className="btn btn-primary">
              Read Field Dispatches <ArrowRight size={15} />
            </Link>
            <Link to="/ngos" className="btn btn-coral">
              <Search size={15} /> Find NGOs Near You
            </Link>
          </div>
        </div>

        {/* Right Juggled Photo Mosaic with Organic Tilted Cards */}
        <div className="grassroots-mosaic-grid">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              className="polaroid-card"
              style={{ '--rotate-deg': `${c.rotate}deg` }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="polaroid-tape" style={{ background: c.tapeColor }} />
              <div className="polaroid-img-wrap">
                <img src={c.img} alt={c.title} loading="lazy" />
                <span className="polaroid-hub-tag">
                  <MapPin size={11} /> {c.hub}
                </span>
                <span className="polaroid-impact-stamp">{c.badge}</span>
              </div>
              <div className="polaroid-body">
                <h4>{c.title}</h4>
                <p>{c.note}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

