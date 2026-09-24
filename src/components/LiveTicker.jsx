import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, MapPin, Heart, Users, CheckCircle2 } from 'lucide-react';

const tickerItems = [
  { icon: ShieldCheck, text: "Swasthya Foundation delivered 1,200 medical kits in Chennai", tag: "Healthcare" },
  { icon: Sparkles, text: "Ujjwal Shiksha Samiti onboarded 40 new rural smart classrooms in Delhi NCR", tag: "Education" },
  { icon: Heart, text: "Green Earth Trust planted 15,000 native saplings in Western Ghats", tag: "Ecology" },
  { icon: Users, text: "₹42 Cr+ social impact funds tracked transparently on federation ledger", tag: "Transparency" },
  { icon: CheckCircle2, text: "128 newly verified NGOs approved for 80G tax exemption partnerships", tag: "Verification" },
  { icon: MapPin, text: "Sahyog Rural Initiative trained 450 women artisans in Pune cluster", tag: "Livelihood" },
  { icon: Sparkles, text: "National disaster response reserve activated for coastal districts", tag: "Disaster Relief" },
];

export default function LiveTicker() {
  return (
    <div className="live-ticker-band">
      <div className="ticker-label">
        <span className="live-badge">
          <span className="live-dot" /> LIVE UPDATES
        </span>
      </div>
      <div className="ticker-track">
        <motion.div
          className="ticker-content"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...tickerItems, ...tickerItems].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div className="ticker-item" key={idx}>
                <span className="ticker-tag">{item.tag}</span>
                <Icon size={14} className="ticker-icon" />
                <span className="ticker-text">{item.text}</span>
                <span className="ticker-bullet">✦</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

