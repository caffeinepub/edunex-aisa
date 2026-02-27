import { useState } from 'react';
import { useRouter, useLocation } from '@tanstack/react-router';
import { Menu, X, BookOpen, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'AI Assistant', path: '/ai-assistant' },
  { label: 'Notes', path: '/notes' },
  { label: 'PYQ & Papers', path: '/pyq' },
  { label: 'Academic Tools', path: '/tools' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const location = useLocation();

  const navigate = (path: string) => {
    router.navigate({ to: path });
    setMobileOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-card/95 backdrop-blur-md shadow-xs">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl gradient-teal flex items-center justify-center shadow-teal">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-lg text-foreground tracking-tight">
                EduNex
              </span>
              <span className="text-xs font-medium text-accent-foreground" style={{ color: 'oklch(0.72 0.18 65)' }}>
                AI
              </span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                style={isActive(link.path) ? { color: 'oklch(0.42 0.12 195)' } : {}}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              className="hidden md:flex gradient-teal text-white border-0 shadow-teal hover:opacity-90 transition-opacity"
              onClick={() => navigate('/ai-assistant')}
            >
              <BookOpen className="w-4 h-4 mr-1.5" />
              Study Now
            </Button>
            <button
              className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/60 py-3 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary/10 font-semibold'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  }`}
                  style={isActive(link.path) ? { color: 'oklch(0.42 0.12 195)' } : {}}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 px-1">
                <Button
                  size="sm"
                  className="w-full gradient-teal text-white border-0"
                  onClick={() => navigate('/ai-assistant')}
                >
                  <BookOpen className="w-4 h-4 mr-1.5" />
                  Study Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
