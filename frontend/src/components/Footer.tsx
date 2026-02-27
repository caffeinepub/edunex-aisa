import { GraduationCap, Heart } from 'lucide-react';
import { useRouter } from '@tanstack/react-router';

const footerLinks = [
  { label: 'AI Assistant', path: '/ai-assistant' },
  { label: 'Notes', path: '/notes' },
  { label: 'PYQ & Papers', path: '/pyq' },
  { label: 'Academic Tools', path: '/tools' },
];

export default function Footer() {
  const router = useRouter();
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'edunex-ai');

  return (
    <footer className="border-t border-border/60 bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center shadow-teal">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-foreground">EduNex</span>
                <span className="text-xs font-medium" style={{ color: 'oklch(0.72 0.18 65)' }}>AI</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Empowering students with AI-powered study tools, comprehensive notes, and academic resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => router.navigate({ to: link.path })}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
              Our Mission
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Making quality education accessible to every student — from school to university — with the power of AI and community-driven resources.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} EduNex AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with{' '}
            <Heart className="w-3 h-3 fill-current" style={{ color: 'oklch(0.72 0.18 65)' }} />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline"
              style={{ color: 'oklch(0.42 0.12 195)' }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
