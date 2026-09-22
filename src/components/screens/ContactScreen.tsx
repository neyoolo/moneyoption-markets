import React, { useState } from 'react';
import {
  ShieldCheck,
  Zap,
  UserCheck,
  PhoneCall,
  Mail,
  Building,
  MapPin,
  Send,
  Lock,
  ChevronDown,
  CheckCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Headphones,
} from 'lucide-react';
import { FAQ_ITEMS } from '../../data/mockData';

interface ContactScreenProps {
  onOpenCallDesk: () => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onOpenCallDesk }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    department: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate instant dispatch to dealing desk
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setSubmittedName(formData.fullName || 'Alexander Vance');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        department: '',
        message: '',
      });
    }, 900);
  };

  const toggleFaq = (id: string) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div id="contact-screen" className="flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-16">
      {/* Subtle ambient decorative glow */}
      <div className="relative w-full overflow-hidden pt-2 pb-2">
        <div className="flex flex-col items-start gap-1 relative z-10">
          <div
            id="desk-status-pill"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF4FF] text-[#0053d4] text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-[#00C48C] animate-pulse"></span>
            <span>Desk Open • Instant Response</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#0b1b38] font-bold tracking-tight mt-1">
            Contact &amp; Call Us
          </h1>
          <p className="text-sm sm:text-base text-[#4A5878] max-w-md">
            Our licensed support team and trading specialists are here 24/7.
          </p>
        </div>
      </div>

      {/* Reassurance Trust Badges */}
      <div className="flex flex-wrap items-center gap-2 py-2 mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f3ff] shadow-xs border border-[#E2E8F4]">
          <ShieldCheck className="w-4 h-4 text-[#0053d4]" />
          <span className="text-xs text-[#0b1b38] font-semibold">Licensed agents</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f3ff] shadow-xs border border-[#E2E8F4]">
          <Zap className="w-4 h-4 text-[#00C48C]" />
          <span className="text-xs text-[#0b1b38] font-semibold">Instant routing</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f1f3ff] shadow-xs border border-[#E2E8F4]">
          <UserCheck className="w-4 h-4 text-[#00677d]" />
          <span className="text-xs text-[#0b1b38] font-semibold">No automated bots</span>
        </div>
      </div>

      {/* 'Prefer to talk?' Highlight Banner */}
      <section
        id="prefer-to-talk-card"
        className="relative w-full rounded-2xl bg-[#0b1b38] text-white p-5 sm:p-6 shadow-xl overflow-hidden mb-6"
      >
        <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-[#1e6bff]/25 blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#1e6bff]/20 flex items-center justify-center text-[#dbe1ff] shadow-inner flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-[#50d9fe] animate-bounce" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#50d9fe] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00C48C]"></span>
                  Live Priority Queue
                </div>
                <h2 className="text-lg sm:text-xl text-white font-bold leading-tight">
                  Prefer to talk?
                </h2>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#c2c6d8] leading-relaxed">
            Speak to a human trader now. Skip phone trees and connect straight to our floor dealing desk in under 30 seconds.
          </p>

          <div className="pt-1 flex flex-col sm:flex-row gap-2">
            <button
              id="call-desk-priority-btn"
              onClick={onOpenCallDesk}
              className="w-full sm:flex-1 h-12 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-white text-sm font-bold shadow-lg shadow-[#1e6bff]/30 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call +1 (800) 555-0199</span>
            </button>
            <a
              href="tel:+18005550199"
              className="sm:w-auto h-12 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <span>Direct Dial</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Live Status & Direct Contact Info Stack */}
      <section className="flex flex-col gap-3 mb-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold text-[#0b1b38] uppercase tracking-wider">
            Direct Reach Channels
          </h3>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF4FF] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#00C48C]"></span>
            <span className="text-[11px] text-[#0053d4] font-semibold">Online • Avg reply: 45s</span>
          </div>
        </div>

        {/* Phone Card */}
        <div
          onClick={onOpenCallDesk}
          className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F4] shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
        >
          <div className="w-11 h-11 rounded-xl bg-[#EEF4FF] flex items-center justify-center text-[#0053d4] flex-shrink-0 group-hover:bg-[#0053d4] group-hover:text-white transition-colors">
            <Headphones className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#4A5878] uppercase font-bold tracking-wider">Phone Hotline</span>
              <span className="text-[#0053d4] group-hover:translate-x-1 transition-transform text-sm font-semibold">
                Call &rarr;
              </span>
            </div>
            <span className="text-lg text-[#0b1b38] font-bold truncate">+1 (800) 555-0199</span>
            <span className="text-xs text-[#4A5878]">Available 24/7 toll-free worldwide</span>
          </div>
        </div>

        {/* Email Card */}
        <a
          href="mailto:support@moneyoptionmarkets.com"
          className="group flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F4] shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
        >
          <div className="w-11 h-11 rounded-xl bg-[#E6F8FB] flex items-center justify-center text-[#00677d] flex-shrink-0 group-hover:bg-[#00677d] group-hover:text-white transition-colors">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#4A5878] uppercase font-bold tracking-wider">Official Support Email</span>
              <span className="text-[#00677d] group-hover:translate-x-1 transition-transform text-sm font-semibold">
                Write &rarr;
              </span>
            </div>
            <span className="text-sm sm:text-base text-[#0b1b38] font-bold truncate">support@moneyoptionmarkets.com</span>
            <span className="text-xs text-[#00C48C] font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Under 15 min response time guaranteed
            </span>
          </div>
        </a>

        {/* Headquarters Card */}
        <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#E2E8F4] shadow-sm">
          <div className="w-11 h-11 rounded-xl bg-[#e1e8ff] flex items-center justify-center text-[#4e5d7f] flex-shrink-0">
            <Building className="w-5 h-5" />
          </div>
          <div className="flex flex-col flex-grow min-w-0">
            <span className="text-xs text-[#4A5878] uppercase font-bold tracking-wider">Global Headquarters</span>
            <span className="text-sm font-bold text-[#0b1b38]">123 Financial District, Suite 500</span>
            <span className="text-xs text-[#4A5878]">New York, NY 10005, United States</span>
          </div>
        </div>
      </section>

      {/* Office & Trading Floor Visual Preview */}
      <section className="flex flex-col gap-1.5 mb-6">
        <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-[#E2E8F4]">
          <img
            className="w-full h-full object-cover"
            alt="NYC Dealing Desk & Execution Command"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQNN3mFDDyghJxHssXkbe4wSuWdQS81mlIQi6bhzlxcihdbzc3dLKvUMiFqfr7KdvdEOnyRnCO1fmDCwM0GNVMfp8FMEuQuspEeOqcLC7TESAwMwCNWrIXV3T7WfZadL66zcNmmigeJ-KRVWSzrwiDqBxR3lpD3mX8DXS9o7MlQxJCATuJgR58so8jk00wTD8sjeJuGpG8tZmWyTkvjXQi1SBg5L0WGTWivwQtkNmIwDsXHHSOTZfb"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b38]/85 via-[#0b1b38]/20 to-transparent flex items-end p-4">
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-4 h-4 text-[#50d9fe]" />
              <span className="text-xs sm:text-sm font-semibold tracking-wide">
                NYC Dealing Desk &amp; Execution Command (Equinix NY4 Connected)
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form Section */}
      <section className="flex flex-col rounded-3xl bg-white p-5 sm:p-7 shadow-md border border-[#E2E8F4] mb-6 relative overflow-hidden">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-bold text-[#0b1b38]">
            Send Us a Message
          </h3>
          <p className="text-xs sm:text-sm text-[#4A5878]">
            Direct routing to our senior trading specialists. We reply swiftly.
          </p>
        </div>

        {/* Success Feedback Overlay */}
        {isSuccess && (
          <div
            id="form-success-banner"
            className="flex flex-col items-center justify-center text-center p-6 bg-[#EEF4FF] rounded-2xl mb-4 border border-[#b3c5ff] animate-fadeIn"
          >
            <div className="w-12 h-12 rounded-full bg-[#00C48C] flex items-center justify-center text-white mb-2 shadow-sm">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h4 className="text-lg font-bold text-[#0b1b38]">Message Dispatched to Floor Desk!</h4>
            <p className="text-xs sm:text-sm text-[#4A5878] mt-1 max-w-sm">
              Thank you, <span className="font-semibold text-[#0b1b38]">{submittedName}</span>. A licensed institutional options broker is reviewing your request. Expected response in ~12 mins.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setIsSuccess(false)}
                className="px-4 py-2 bg-white text-[#0053d4] text-xs font-semibold rounded-xl shadow-xs border border-[#E2E8F4] hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Send Another Note
              </button>
              <button
                onClick={onOpenCallDesk}
                className="px-4 py-2 bg-[#0053d4] text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-[#003fa5] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Call Desk Immediately</span>
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1A1F36] flex items-center justify-between" htmlFor="contact-name">
              <span>Full Name <span className="text-[#FF3B30]">*</span></span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#4A5878] pointer-events-none text-sm">
                👤
              </span>
              <input
                id="contact-name"
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Alexander Vance"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f1f3ff] text-[#0b1b38] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e6bff] border border-transparent focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1A1F36] flex items-center justify-between" htmlFor="contact-email">
              <span>Email Address <span className="text-[#FF3B30]">*</span></span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#4A5878] pointer-events-none text-sm">
                ✉️
              </span>
              <input
                id="contact-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="alex@capitalfund.com"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f1f3ff] text-[#0b1b38] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e6bff] border border-transparent focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1A1F36] flex items-center justify-between" htmlFor="contact-phone">
              <span>Phone Number</span>
              <span className="text-[11px] text-[#4A5878] font-normal">Optional (for instant broker callback)</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#4A5878] pointer-events-none text-sm">
                📞
              </span>
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#f1f3ff] text-[#0b1b38] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e6bff] border border-transparent focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Subject Dropdown */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1A1F36]" htmlFor="contact-subject">
              Department / Subject <span className="text-[#FF3B30]">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-[#4A5878] pointer-events-none text-sm">
                ⚙️
              </span>
              <select
                id="contact-subject"
                required
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full h-12 pl-11 pr-10 rounded-xl bg-[#f1f3ff] text-[#0b1b38] text-sm appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e6bff] border border-transparent focus:border-transparent transition-all"
              >
                <option value="" disabled>Select reason for contact</option>
                <option value="general">General Inquiry</option>
                <option value="account">Account Opening &amp; Verification</option>
                <option value="tech">Technical &amp; Execution Support</option>
                <option value="institutional">Institutional Partnership &amp; API</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3.5 text-[#4A5878] pointer-events-none" />
            </div>
          </div>

          {/* Message Area */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#1A1F36]" htmlFor="contact-message">
              Message <span className="text-[#FF3B30]">*</span>
            </label>
            <textarea
              id="contact-message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can our trading desk assist you today? Feel free to ask about contracts, platform connectivity, or account configurations..."
              className="w-full p-3.5 rounded-xl bg-[#f1f3ff] text-[#0b1b38] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1e6bff] border border-transparent focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>

          {/* Submit CTA Button */}
          <button
            id="contact-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 rounded-xl bg-[#1e6bff] hover:bg-[#0053d4] active:scale-[0.98] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#1e6bff]/25 transition-all mt-1 cursor-pointer disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>Dispatching to Trading Desk...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Security / Encryption Reassurance */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            <Lock className="w-3.5 h-3.5 text-[#00C48C]" />
            <span className="text-[11px] text-[#4A5878] text-center">
              Your privacy is protected by 256-bit SSL institutional encryption.
            </span>
          </div>
        </form>
      </section>

      {/* Interactive FAQ micro-accordion for delight */}
      <section className="flex flex-col gap-2 mt-2 mb-2">
        <span className="text-xs uppercase tracking-wider text-[#4A5878] px-1 font-bold">
          Quick Answers
        </span>
        <div className="flex flex-col gap-2.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = activeFaq === item.id;
            return (
              <div
                key={item.id}
                className="rounded-2xl bg-white border border-[#E2E8F4] shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  className="w-full p-4 flex items-center justify-between text-left font-semibold text-sm text-[#0b1b38] hover:text-[#0053d4] transition-colors cursor-pointer"
                >
                  <span>{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#737687] transition-transform duration-200 flex-shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-[#0053d4]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#4A5878] leading-relaxed border-t border-slate-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
