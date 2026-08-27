import { useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../services/api';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '', mobile: '', role: '', comment: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted,  setSubmitted]  = useState(false);
  const [error,      setError]      = useState('');

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    // Ensure mobile is in +91XXXXXXXXXX format
    const rawMobile = form.mobile.trim().replace(/\s/g, '');
    const mobile = rawMobile.startsWith('+')
      ? rawMobile
      : `+91${rawMobile.replace(/^0+/, '')}`;

    try {
      await api.post('/api/v1/users/contactUs', {
        name:        form.name.trim(),
        mobile,
        description: form.comment.trim(),
      });
      setSubmitted(true);
      setForm({ name: '', mobile: '', role: '', comment: '' });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = "w-full border border-gray-300 rounded px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* ── Heading ── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">You can find us here</h1>
          <p className="text-sm text-gray-500">Find help for your queries here:</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Left — Contact Form ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Name <span className="text-red-500">*</span>
                </label>
                <input required type="text" placeholder="Enter your name"
                  value={form.name} onChange={e => set('name', e.target.value)}
                  className={inputCls} />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input required type="tel" placeholder="e.g. 9876543210 or +919876543210"
                  value={form.mobile} onChange={e => set('mobile', e.target.value)}
                  className={inputCls} />
              </div>

              {/* Comment */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea required rows={5} placeholder="Enter your comment"
                  value={form.comment} onChange={e => set('comment', e.target.value)}
                  className={`${inputCls} resize-none`} />
              </div>

              {/* Submit feedback */}
              {submitted && (
                <p className="text-sm text-green-600 font-semibold bg-green-50 px-4 py-3 rounded">
                  ✓ Your message has been submitted. We'll get back to you soon!
                </p>
              )}
              {error && (
                <p className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded">
                  ⚠ {error}
                </p>
              )}
              <button type="submit" disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-4 text-sm tracking-widest uppercase rounded-sm transition-colors flex items-center justify-center gap-2">
                {submitting && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {submitting ? 'Submitting...' : 'Submit'}
              </button>

              {/* ── Divider — Moveryy blue theme, same as Our Services section ── */}
              <div className="pt-6">
                {/* Blue accent top bar */}
                <div className="flex items-center gap-0 mb-0">
                  <div className="w-10 h-1 bg-blue-700 rounded-full" />
                  <div className="flex-1 h-px bg-blue-100" />
                </div>
              </div>

              {/* Support */}
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-2">Support:</h3>
              <p className="text-sm text-gray-600">
                Email:{' '}
                <a href="mailto:support@moveryy.com" className="text-blue-600 hover:underline">
                  support@moveryy.com
                </a>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Phone:{' '}
                <a href="tel:+911800123456" className="text-blue-600 hover:underline">
                  1800-123-456 (Toll Free)
                </a>
              </p>
            </div>

            </form>
          </motion.div>

          {/* ── Right — Address Info ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-8">

            {/* Decorative dots grid */}
            <div className="flex justify-end mb-4 pointer-events-none select-none">
              <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(12, 8px)' }}>
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-300 opacity-70" />
                ))}
              </div>
            </div>


            

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
