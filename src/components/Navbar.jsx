import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Heart } from 'lucide-react';
import Logo from './Logo';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Directory', path: '/ngos' },
  { name: 'Causes', path: '/causes' },
  { name: 'Volunteer', path: '/volunteer' },
  { name: 'CSR Hub', path: '/csr' },
  { name: 'Stories', path: '/stories' },
  { name: 'Resources', path: '/resources' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar({ onOpenDonate, onOpenSearch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Top Banner */}
      <div className="top-banner">
        <div className="top-banner-inner">
          <div className="top-banner-left">
            <span className="live-status-dot" />
            <span className="top-banner-tag">PAN-INDIA FEDERATION</span>
            <span className="top-banner-text">
              Unifying <strong>2,500+ Verified NGOs</strong> across 28 States & 8 Union Territories
            </span>
          </div>
          <Link to="/register" className="top-banner-link">
            <span>Accredit Your NGO</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className={`navbar-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="navbar-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" aria-label="Indian National NGO Federation — Home">
            <Logo />
          </Link>

          {/* Desktop Nav Items */}
          <nav className="nav-menu desktop-only">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-menu-item ${isActive ? 'is-active' : ''}`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Action Area */}
          <div className="nav-actions">
            <button
              className="btn-donate-quick"
              onClick={onOpenDonate}
              aria-label="Make a contribution"
            >
              <Heart size={14} className="heart-pulse" />
              <span>Donate</span>
            </button>

            <Link className="btn-join-network" to="/register">
              <span>Join Network</span>
              <ArrowRight size={14} />
            </Link>

            <button
              className="mobile-hamburger"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="mobile-drawer-content">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `mobile-drawer-link ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{item.name}</span>
                    <ArrowRight size={14} className="link-arrow" />
                  </NavLink>
                ))}
                <div className="mobile-drawer-buttons">
                  <button className="btn-donate-quick full-width" onClick={onOpenDonate}>
                    <Heart size={15} /> Quick Donate to Causes
                  </button>
                  <Link className="btn-join-network full-width" to="/register">
                    Join the Federation <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
