import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShieldCheck, Check, Sparkles, ArrowRight, Lock } from 'lucide-react';

const AMOUNTS = [500, 1000, 2500, 5000, 10000];

const IMPACT_MAP = {
  500: "Provides 1 month of learning supplies and nutritional supplements for 2 rural students.",
  1000: "Funds clean drinking water and sanitation kits for a family of 5 in remote villages.",
  2500: "Equips a government school classroom with digital learning materials and books.",
  5000: "Supports a community mobile medical checkup camp serving up to 50 elders.",
  10000: "Funds vocational skill certification for 3 women micro-entrepreneurs."
};

export default function DonationModal({ isOpen, onClose }) {
  const [selectedAmount, setSelectedAmount] = useState(2500);
  const [customAmount, setCustomAmount] = useState('');
  const [cause, setCause] = useState('All Causes (Highest Need)');
  const [isMonthly, setIsMonthly] = useState(false);
  const [step, setStep] = useState('amount'); // 'amount' | 'details' | 'success'

  const activeAmount = customAmount ? Number(customAmount) : selectedAmount;

  const handleSelectPreset = (amt) => {
    setSelectedAmount(amt);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const getImpactMessage = () => {
    if (IMPACT_MAP[activeAmount]) {
      return IMPACT_MAP[activeAmount];
    }
    if (activeAmount < 1000) {
      return "Directly supplies vital learning and nutrition essentials to underserved community centers.";
    }
    if (activeAmount < 5000) {
      return `Powers continuous education and preventive healthcare programs for over ${Math.floor(activeAmount / 350)} beneficiaries.`;
    }
    return `Creates a transformative community impact footprint touching over ${Math.floor(activeAmount / 200)} lives across verified NGO projects.`;
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-card donation-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {/* Modal Header */}
          <div className="modal-header">
            <div className="modal-badge">
              <Heart size={14} className="badge-heart" />
              <span>Verified 80G Tax Exemption Eligible</span>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          {step === 'amount' && (
            <div className="modal-body">
              <div className="modal-title-area">
                <h2>Support Verified Grassroots <em>Change</em></h2>
                <p>100% of your donation is routed transparently to verified NGOs with real-time impact tracking.</p>
              </div>

              {/* Frequency Toggle */}
              <div className="donation-frequency">
                <button
                  type="button"
                  className={`freq-pill ${!isMonthly ? 'active' : ''}`}
                  onClick={() => setIsMonthly(false)}
                >
                  One-time Support
                </button>
                <button
                  type="button"
                  className={`freq-pill ${isMonthly ? 'active' : ''}`}
                  onClick={() => setIsMonthly(true)}
                >
                  <Sparkles size={13} /> Monthly Changemaker (2x Impact)
                </button>
              </div>

              {/* Cause Selector */}
              <div className="form-field">
                <label>Direct my contribution to:</label>
                <select value={cause} onChange={(e) => setCause(e.target.value)} className="modal-select">
                  <option>All Causes (Highest Need)</option>
                  <option>Education & Rural Schools</option>
                  <option>Healthcare & Mobile Clinics</option>
                  <option>Environment & Tree Plantation</option>
                  <option>Women & Child Empowerment</option>
                  <option>Disaster Relief Fund</option>
                </select>
              </div>

              {/* Amount Grid */}
              <div className="amount-grid">
                {AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    className={`amount-chip ${selectedAmount === amt && !customAmount ? 'active' : ''}`}
                    onClick={() => handleSelectPreset(amt)}
                  >
                    <span>₹{amt.toLocaleString('en-IN')}</span>
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="custom-amount-wrap">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  placeholder="Or enter custom amount in INR"
                  value={customAmount}
                  onChange={handleCustomChange}
                  min="100"
                />
              </div>

              {/* Dynamic Impact Display */}
              <div className="impact-calculator-box">
                <div className="impact-calc-head">
                  <Sparkles size={15} color="#f4c95d" />
                  <strong>Your Impact:</strong>
                </div>
                <p>{getImpactMessage()}</p>
              </div>

              {/* Trust Callout */}
              <div className="modal-trust-strip">
                <span><ShieldCheck size={14} color="#0d7859" /> 100% Tax Deductible (80G)</span>
                <span><Lock size={14} color="#0d7859" /> 256-bit Encrypted</span>
              </div>

              {/* Action Button */}
              <button
                className="btn btn-primary full modal-submit-btn"
                onClick={() => setStep('details')}
              >
                Proceed with ₹{(activeAmount || 2500).toLocaleString('en-IN')} {isMonthly ? '/ month' : ''}
                <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 'details' && (
            <div className="modal-body">
              <div className="modal-title-area">
                <h2>Donor Information for <em>80G Receipt</em></h2>
                <p>Please enter your details to receive an instant tax exemption certificate.</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setStep('success');
                }}
                className="donor-form"
              >
                <div className="form-grid-2">
                  <label>
                    Full Name *
                    <input required placeholder="e.g. Ramesh Sharma" />
                  </label>
                  <label>
                    Email Address (for receipt) *
                    <input required type="email" placeholder="you@domain.com" />
                  </label>
                </div>

                <div className="form-grid-2">
                  <label>
                    Mobile Phone *
                    <input required placeholder="+91 98765 43210" />
                  </label>
                  <label>
                    PAN Number (for 80G Tax Exemption)
                    <input placeholder="ABCDE1234F" style={{ textTransform: 'uppercase' }} />
                  </label>
                </div>

                <div className="modal-summary-box">
                  <div>
                    <span>Selected Allocation:</span>
                    <strong>{cause}</strong>
                  </div>
                  <div>
                    <span>Donation Amount:</span>
                    <strong className="summary-amt">₹{(activeAmount || 2500).toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                <div className="modal-actions-row">
                  <button type="button" className="btn outline" onClick={() => setStep('amount')}>
                    Back
                  </button>
                  <button type="submit" className="btn btn-primary flex-1">
                    Complete Donation <Lock size={15} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="modal-body text-center success-view">
              <div className="success-icon-wrap">
                <Check size={36} />
              </div>
              <h2>Thank You for Empowering <em>Communities!</em></h2>
              <p>Your pledge of <strong>₹{(activeAmount || 2500).toLocaleString('en-IN')}</strong> to <em>{cause}</em> has been initiated.</p>
              <div className="success-receipt-card">
                <span>Receipt #INNF-2026-{Math.floor(100000 + Math.random() * 900000)}</span>
                <p>A formal 80G certificate has been queued for your email with real-time milestone tracking.</p>
              </div>
              <button className="btn btn-primary" onClick={onClose}>
                Return to Federation Network
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

