import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, CreditCard, CheckCircle, Shield, FileText, Mail, DollarSign, Image, ArrowLeft, ArrowRight, Send, AlertCircle, Loader, User, Phone, ChevronDown, Download } from 'lucide-react';
import { jsPDF } from 'jspdf';
import './Phiverse.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const services = [
  { id: 'plagiarism-check', name: 'Plagiarism Check', price: 400, turnaround: '3 hours', badge: 'Check' },
  { id: 'plagiarism-removal', name: 'Plagiarism Removal', price: 2000, turnaround: '24 hours', badge: 'Removal' },
  { id: 'ai-check', name: 'AI Check', price: 350, turnaround: '3 hours', badge: 'Check' },
  { id: 'ai-removal', name: 'AI Removal', price: 2000, turnaround: '24 hours', badge: 'Removal' },
  { id: 'plagiarism-ai-check', name: 'Plagiarism + AI Check', price: 450, turnaround: '3 hours', badge: 'Check' },
  { id: 'plagiarism-ai-removal', name: 'Plagiarism + AI Removal', price: 2500, turnaround: '24 hours', badge: 'Removal' },
];

const stepsList = [
  { num: 1, icon: FileText, label: 'Service & Upload' },
  { num: 2, icon: CreditCard, label: 'Payment' },
  { num: 3, icon: Image, label: 'Upload Screenshot' },
  { num: 4, icon: Send, label: 'Submit' },
];

const GOOGLE_DRIVE_UPLOAD_URL = 'https://script.google.com/macros/s/AKfycbybnccY2m1d6v12qQi3LEv1I0zPxke0aNNlE9jm2sHVCwrS7m4j1mx2Fe_bIaPxRxPX/exec';

const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64 = reader.result.split(',')[1];
    resolve({ content: base64, mimeType: file.type, fileName: file.name });
  };
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const Phiverse = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    document: null,
    paymentScreenshot: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef(null);
  const screenshotInputRef = useRef(null);

  const selectedService = services.find(s => s.id === formData.service);
  const amount = selectedService ? selectedService.price : 0;

  const updateField = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: null }));
  };

  const validateStep1 = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email address';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone)) errs.phone = 'Invalid phone number';
    if (!formData.service) errs.service = 'Please select a service';
    if (!formData.document) errs.document = 'Please upload your document';
    else if (formData.document.type !== 'application/pdf') errs.document = 'Only PDF files are accepted';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs = {};
    if (!formData.paymentScreenshot) errs.paymentScreenshot = 'Please upload payment screenshot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, document: 'Only PDF files are accepted' }));
        return;
      }
      updateField('document', file);
    }
  };

  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateField('paymentScreenshot', file);
    }
  };

  const formRef = useRef(null);
  const frameRef = useRef(null);

  const handleSubmit = () => {
    if (!validateStep3()) return;
    setSubmitting(true);

    Promise.all([
      fileToBase64(formData.document),
      fileToBase64(formData.paymentScreenshot),
    ]).then(([docData, screenshotData]) => {
      const payload = JSON.stringify({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        serviceName: selectedService ? selectedService.name : '',
        amount: amount,
        document: docData,
        paymentScreenshot: screenshotData,
      });

      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'payload';
      input.value = payload;

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_DRIVE_UPLOAD_URL;
      form.target = 'phiverse-frame';
      form.appendChild(input);
      formRef.current = form;

      document.body.appendChild(form);
      form.submit();
    }).catch(() => {
      setSubmitting(false);
      setErrors({ submit: 'Error preparing files. Please try again.' });
    });
  };

  const onFrameLoad = () => {
    if (formRef.current) {
      document.body.removeChild(formRef.current);
      formRef.current = null;
    }
    setSubmitted(true);
  };

  const copyUPI = () => {
    navigator.clipboard.writeText('naveenjvl18-1@okicici').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const generateReceipt = () => {
    const s = selectedService;
    const timestamp = Date.now();
    const receiptNo = 'PHI/' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '/' + String(timestamp).slice(-6);
    const dateStr = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = 210;
    const margin = 20;
    const contentW = pageW - 2 * margin;
    let y = margin;

    const red = [220, 38, 38];
    const dark = [26, 26, 26];
    const gray = [102, 102, 102];
    const lightGray = [245, 245, 245];

    const centerX = (text) => (pageW - doc.getTextWidth(text)) / 2;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...red);
    doc.text('PHIMIND PRIVATE LIMITED', centerX('PHIMIND PRIVATE LIMITED'), y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...gray);
    doc.text('Plagiarism & AI Content Services', centerX('Plagiarism & AI Content Services'), y);
    y += 6;

    doc.setDrawColor(...red);
    doc.setLineWidth(1.2);
    doc.line(margin, y, pageW - margin, y);
    y += 10;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...red);
    doc.text('TAX INVOICE / RECEIPT', centerX('TAX INVOICE / RECEIPT'), y);
    y += 12;

    const rowH = 9;
    const leftX = margin;
    const labelW = 55;
    const drawRow = (label, value, fill) => {
      if (fill) {
        doc.setFillColor(...lightGray);
        doc.rect(leftX, y - 5, contentW, rowH, 'F');
      }
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...dark);
      doc.text(label, leftX + 4, y + 1);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...dark);
      doc.text(String(value), leftX + labelW + 4, y + 1);
      y += rowH + 1;
    };

    drawRow('Receipt No.', receiptNo, true);
    drawRow('Date', dateStr, false);
    drawRow('Customer Name', formData.name, true);
    drawRow('Email', formData.email, false);
    drawRow('Phone', formData.phone, true);
    drawRow('Service', s ? s.name : 'N/A', false);
    drawRow('Amount Paid', 'Rs.' + (amount || 0).toLocaleString(), true);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(0, 204, 76);
    doc.text('PAID', leftX + labelW + 4, y + 1);
    y += rowH + 10;

    doc.setDrawColor(...red);
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageW - margin, y);
    y += 8;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...gray);
    doc.text('This is a computer-generated receipt.', centerX('This is a computer-generated receipt.'), y);
    y += 5;
    doc.text('For queries: phiVerse@phimind.com', centerX('For queries: phiVerse@phimind.com'), y);

    doc.save('Receipt_' + receiptNo + '.pdf');
  };

  const receiptDownloaded = useRef(false);
  useEffect(() => {
    if (submitted && !receiptDownloaded.current) {
      receiptDownloaded.current = true;
      setTimeout(() => generateReceipt(), 500);
    }
  }, [submitted]);

  if (submitted) {
    const s = selectedService;
    return (
      <div className="phiverse-container">
        <section className="phiverse-hero">
          <div className="hero-bg-glow"></div>
          <div className="container hero-content">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="success-wrapper"
            >
              <div className="success-icon">
                <CheckCircle size={64} />
              </div>
              <h1 className="section-title" style={{ textAlign: 'center', marginTop: '2rem' }}>
                Submission <span className="gradient-text">Successful!</span>
              </h1>
              <p className="section-subtitle" style={{ textAlign: 'center', maxWidth: '500px', margin: '1rem auto' }}>
                Thank you, {formData.name}! Your <strong>{s ? s.name : 'document'}</strong> has been received. Our team will process it and send the results to <strong>{formData.email}</strong> within <strong>{s ? s.turnaround : '24-48 hours'}</strong>.
              </p>
              <button className="btn" style={{ margin: '1rem auto 0', display: 'inline-flex' }} onClick={generateReceipt}>
                <Download size={18} /> Download Receipt
              </button>
              <Link to="/" className="btn" style={{ margin: '1rem auto 0', display: 'inline-flex' }}>
                <ArrowLeft size={18} /> Back to phiMind
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="phiverse-container">
      <section className="phiverse-hero">
        <div className="hero-bg-glow"></div>
        <div className="container hero-content">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hero-text-content"
          >
            <motion.div variants={itemVariants} className="badge">
              <span className="glow-text">Plagiarism & AI Services</span> — Fast & Reliable
            </motion.div>
            <motion.h1 variants={itemVariants} className="hero-title">
              Phi<span className="text-accent-gradient">Verse</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="hero-subtitle">
              Upload your thesis, report, or research paper — choose from plagiarism check, AI detection, removal, or combined services. Starting at just ₹350.
            </motion.p>
            <motion.div variants={itemVariants} className="hero-stats">
              <div className="hero-stat">
                <span className="stat-value">₹350+</span>
                <span className="stat-label">Starting Price</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">3 hrs</span>
                <span className="stat-label">Check Turnaround</span>
              </div>
              <div className="hero-stat">
                <span className="stat-value">100%</span>
                <span className="stat-label">Original Content</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="phiverse-steps-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Services</span>
            <h2 className="section-title">Choose Your <span className="gradient-text">Service</span></h2>
            <div className="section-divider" />
          </motion.div>

          <div className="how-it-works">
            {services.map((s, i) => (
              <motion.div
                key={s.id}
                className={`service-card glass-panel ${formData.service === s.id ? 'selected' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => updateField('service', s.id)}
              >
                <div className="service-badge" data-type={s.badge.toLowerCase()}>{s.badge}</div>
                <h3>{s.name}</h3>
                <div className="service-details">
                  <div className="service-price">₹{s.price.toLocaleString()}</div>
                  <div className="service-time">{s.turnaround}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="phiverse-form-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Get Started</span>
            <h2 className="section-title">Submit Your <span className="gradient-text">Request</span></h2>
            <div className="section-divider" />
          </motion.div>

          <div className="form-wrapper">
            <iframe name="phiverse-frame" onLoad={onFrameLoad} style={{ display: 'none' }} title="submit-frame"></iframe>
            <div className="step-indicators">
              {stepsList.map((s, i) => {
                const StepIcon = s.icon;
                const isActive = step === s.num;
                const isDone = step > s.num;
                return (
                  <div key={s.num} className={`step-indicator ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}>
                    <div className="step-dot">
                      {isDone ? <CheckCircle size={18} /> : <StepIcon size={18} />}
                    </div>
                    <span className="step-label">{s.label}</span>
                    {i < stepsList.length - 1 && <div className={`step-line ${isDone ? 'done' : ''}`} />}
                  </div>
                );
              })}
            </div>

            <motion.div
              className="form-card glass-panel"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="form-step-content"
                  >
                    <h3 className="form-step-title">Your Details & Document</h3>
                    <p className="form-step-desc">Select a service, fill your details, and upload your document (PDF only).</p>

                    <div className="form-group">
                      <label className="form-label">
                        <DollarSign size={16} /> Service
                      </label>
                      <div className={`select-wrap ${errors.service ? 'error' : ''}`}>
                        <select
                          className={`form-select ${errors.service ? 'error' : ''}`}
                          value={formData.service}
                          onChange={(e) => updateField('service', e.target.value)}
                        >
                          <option value="">— Select a service —</option>
                          {services.map(s => (
                            <option key={s.id} value={s.id}>
                              {s.name} — ₹{s.price.toLocaleString()} ({s.turnaround})
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} className="select-arrow" />
                      </div>
                      {errors.service && <span className="form-error">{errors.service}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} /> Full Name
                      </label>
                      <input
                        type="text"
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                      />
                      {errors.name && <span className="form-error">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Mail size={16} /> Email Address
                      </label>
                      <input
                        type="email"
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                      />
                      {errors.email && <span className="form-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Phone size={16} /> Phone Number
                      </label>
                      <input
                        type="tel"
                        className={`form-input ${errors.phone ? 'error' : ''}`}
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                      />
                      {errors.phone && <span className="form-error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <FileText size={16} /> Upload Document (PDF)
                      </label>
                      <div
                        className={`file-upload-area ${formData.document ? 'has-file' : ''} ${errors.document ? 'error' : ''}`}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handleDocumentUpload}
                          hidden
                        />
                        {formData.document ? (
                          <div className="file-info">
                            <FileText size={24} />
                            <div>
                              <strong>{formData.document.name}</strong>
                              <span>{(formData.document.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <button className="file-change" onClick={(e) => { e.stopPropagation(); updateField('document', null); }}>Change</button>
                          </div>
                        ) : (
                          <div className="file-placeholder">
                            <Upload size={32} />
                            <span>Click to upload or drag & drop</span>
                            <small>PDF only, max 50 MB</small>
                          </div>
                        )}
                      </div>
                      {errors.document && <span className="form-error">{errors.document}</span>}
                    </div>

                    <div className="form-actions">
                      <button className="btn" onClick={nextStep}>
                        Next — Payment <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="form-step-content"
                  >
                    <h3 className="form-step-title">Complete Payment — ₹{amount.toLocaleString()}</h3>
                    <p className="form-step-desc">
                      Selected service: <strong>{selectedService ? selectedService.name : ''}</strong>.
                      Scan the QR code below using any UPI app and pay exactly <strong>₹{amount.toLocaleString()}</strong>.
                      After payment, proceed to upload the screenshot.
                    </p>

                    <div className="payment-section">
                      <div className="qr-wrapper">
                        <img src="/QR.jpeg" alt="UPI QR Code" className="qr-image" />
                        <div className="qr-amount">₹{amount.toLocaleString()}</div>
                      </div>

                      <div className="payment-details">
                        <div className="payment-detail-item">
                          <span className="detail-label">Service</span>
                          <span className="detail-value">{selectedService ? selectedService.name : ''}</span>
                        </div>
                        <div className="payment-detail-item">
                          <span className="detail-label">Amount</span>
                          <span className="detail-value">₹{amount.toLocaleString()}</span>
                        </div>
                        <div className="payment-detail-item">
                          <span className="detail-label">Turnaround</span>
                          <span className="detail-value">{selectedService ? selectedService.turnaround : ''}</span>
                        </div>
                        <div className="payment-detail-item">
                          <span className="detail-label">UPI ID</span>
                          <div className="upi-copy" onClick={copyUPI}>
                            <span>naveenjvl18-1@okicici</span>
                            <button className="copy-btn">{copied ? 'Copied!' : 'Copy'}</button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions between">
                      <button className="btn-secondary" onClick={prevStep}>
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button className="btn" onClick={() => setStep(3)}>
                        I Have Paid — Next <ArrowRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="form-step-content"
                  >
                    <h3 className="form-step-title">Upload Payment Screenshot</h3>
                    <p className="form-step-desc">Upload a screenshot of the successful ₹{amount.toLocaleString()} payment transaction for verification.</p>

                    <div className="form-group">
                      <label className="form-label">
                        <Image size={16} /> Payment Screenshot
                      </label>
                      <div
                        className={`file-upload-area ${formData.paymentScreenshot ? 'has-file' : ''} ${errors.paymentScreenshot ? 'error' : ''}`}
                        onClick={() => screenshotInputRef.current?.click()}
                      >
                        <input
                          ref={screenshotInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleScreenshotUpload}
                          hidden
                        />
                        {formData.paymentScreenshot ? (
                          <div className="file-info">
                            <Image size={24} />
                            <div>
                              <strong>{formData.paymentScreenshot.name}</strong>
                              <span>{(formData.paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB</span>
                            </div>
                            <button className="file-change" onClick={(e) => { e.stopPropagation(); updateField('paymentScreenshot', null); }}>Change</button>
                          </div>
                        ) : (
                          <div className="file-placeholder">
                            <Image size={32} />
                            <span>Click to upload payment screenshot</span>
                            <small>JPG, PNG accepted</small>
                          </div>
                        )}
                      </div>
                      {errors.paymentScreenshot && <span className="form-error">{errors.paymentScreenshot}</span>}
                    </div>

                    <div className="payment-summary">
                      <div className="summary-row">
                        <span>Service</span>
                        <span>{selectedService ? selectedService.name : ''}</span>
                      </div>
                      <div className="summary-row">
                        <span>Amount Paid</span>
                        <span>₹{amount.toLocaleString()}</span>
                      </div>
                      <div className="summary-row">
                        <span>Name</span>
                        <span>{formData.name}</span>
                      </div>
                      <div className="summary-row">
                        <span>Email</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="summary-row">
                        <span>Turnaround</span>
                        <span>{selectedService ? selectedService.turnaround : ''}</span>
                      </div>
                    </div>

                    {errors.submit && (
                      <div className="form-submit-error">
                        <AlertCircle size={16} /> {errors.submit}
                      </div>
                    )}

                    <div className="form-actions between">
                      <button className="btn-secondary" onClick={prevStep}>
                        <ArrowLeft size={18} /> Back
                      </button>
                      <button className="btn" onClick={handleSubmit} disabled={submitting}>
                        {submitting ? (
                          <><Loader size={18} className="spinner" /> Submitting...</>
                        ) : (
                          <><Send size={18} /> Submit</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="phiverse-guarantee">
        <div className="container">
          <motion.div
            className="guarantee-content glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Shield size={48} className="guarantee-icon" />
            <h3>Your Data is Safe with Us</h3>
            <p>All uploaded documents are treated with strict confidentiality. We use encrypted channels and never share your data with third parties. Your content is processed solely for the selected service and is permanently deleted after delivery.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Phiverse;
