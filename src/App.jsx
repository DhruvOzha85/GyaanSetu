/**
 * GyaanSetu — Root App Component
 *
 * Handles:
 * - Dynamic dark/light theme class application on <html>
 * - Global font class
 * - Route rendering (will integrate routes in Part 3)
 */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

function App() {
  const theme = useSelector((state) => state?.ui?.theme || 'light');

  // Apply dark mode class to <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <>
      <Helmet>
        <title>GyaanSetu — Learn by Doing in Your Language</title>
        <meta
          name="description"
          content="India's first bilingual practical EdTech platform. Learn by doing with hands-on labs in English, Hindi, and Gujarati."
        />
      </Helmet>

      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <main id="main-content">
        {/* Temporary test content — will be replaced by Router in Part 3 */}
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '32px',
            background: 'var(--bg-secondary)',
          }}
        >
          {/* Logo */}
          <img src="/logo.svg" alt="GyaanSetu Logo" style={{ width: 80, height: 80 }} />

          {/* Title with gradient */}
          <h1
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '3rem',
              fontWeight: 800,
              textAlign: 'center',
            }}
          >
            GyaanSetu
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-body)',
              fontSize: '1.125rem',
              textAlign: 'center',
              maxWidth: '500px',
            }}
          >
            Bridging the Gap Between Education and Industry — In Every Indian Language
          </p>

          {/* Test: Tailwind classes */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              className="bg-[#F97316] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#EA6C0A] transition-all duration-200 shadow-md hover:shadow-lg"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Start Learning Free
            </button>
            <button
              className="border-2 border-[#0D9488] text-[#0D9488] font-semibold px-6 py-3 rounded-lg hover:bg-[#0D9488] hover:text-white transition-all duration-200"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              Explore Courses
            </button>
          </div>

          {/* Test: Color swatches */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <div
              className="w-10 h-10 rounded-full bg-[#F97316]"
              title="Primary — Saffron Orange"
            />
            <div
              className="w-10 h-10 rounded-full bg-[#0D9488]"
              title="Secondary — Teal Green"
            />
            <div
              className="w-10 h-10 rounded-full bg-[#F59E0B]"
              title="Accent — Amber Yellow"
            />
            <div
              className="w-10 h-10 rounded-full bg-[#EF4444]"
              title="Error — Coral Red"
            />
            <div
              className="w-10 h-10 rounded-full bg-[#10B981]"
              title="Success — Emerald Green"
            />
          </div>

          {/* Test: Font stacks */}
          <div style={{ textAlign: 'center', marginTop: '8px' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--text-heading)' }}>
              Plus Jakarta Sans — Display Font
            </p>
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-body)' }}>
              Inter — Body Font
            </p>
            <p style={{ fontFamily: 'var(--font-code)', color: 'var(--text-light)', fontSize: '0.875rem' }}>
              JetBrains Mono — Code Font
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-code)',
              fontSize: '0.75rem',
              color: 'var(--text-placeholder)',
              marginTop: '24px',
            }}
          >
            ✅ Part 1 Complete — Foundation verified. Routes will be added in Part 3.
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
