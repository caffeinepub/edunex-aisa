import { useRouter } from '@tanstack/react-router';
import { Bot, BookOpen, FileText, Wrench, ArrowRight, Sparkles, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Bot,
    title: 'AI Study Assistant',
    description: 'Get instant answers to any academic question. Our AI assistant helps you understand complex topics across all subjects.',
    path: '/ai-assistant',
    color: 'teal',
    badge: 'Powered by AI',
  },
  {
    icon: BookOpen,
    title: 'Notes Library',
    description: 'Access comprehensive notes for all classes — from school to university. Organized by subject, grade, and level.',
    path: '/notes',
    color: 'amber',
    badge: 'All Classes',
  },
  {
    icon: FileText,
    title: 'PYQ & Sample Papers',
    description: 'Practice with previous year questions and sample papers. Filter by subject, year, and exam type.',
    path: '/pyq',
    color: 'teal',
    badge: 'Exam Ready',
  },
  {
    icon: Wrench,
    title: 'Academic Tools',
    description: 'A growing collection of tools to supercharge your studies — unit converters, formula references, citation generators, and more.',
    path: '/tools',
    color: 'amber',
    badge: 'Expanding',
  },
];

const stats = [
  { icon: Users, value: '10,000+', label: 'Students' },
  { icon: BookOpen, value: '500+', label: 'Notes' },
  { icon: FileText, value: '200+', label: 'Papers' },
  { icon: Star, value: '4.9/5', label: 'Rating' },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative overflow-hidden gradient-hero min-h-[520px] flex items-center"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1440x600.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 gradient-hero opacity-90" />

        <div className="relative container mx-auto px-4 sm:px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white/90 text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" style={{ color: 'oklch(0.78 0.16 75)' }} />
            AI-Powered Academic Platform
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight">
            Your Smart Study
            <br />
            <span style={{ color: 'oklch(0.78 0.16 75)' }}>Companion</span>
          </h1>

          <p className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            EduNex AI brings together AI tutoring, comprehensive notes, past papers, and academic tools — everything you need to excel in your studies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="gradient-amber text-white border-0 shadow-amber font-semibold px-8 hover:opacity-90 transition-opacity"
              onClick={() => router.navigate({ to: '/ai-assistant' })}
            >
              <Bot className="w-5 h-5 mr-2" />
              Ask AI Assistant
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold px-8"
              onClick={() => router.navigate({ to: '/notes' })}
            >
              Browse Notes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-card border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-5 h-5" style={{ color: 'oklch(0.42 0.12 195)' }} />
                </div>
                <div>
                  <div className="font-display font-bold text-xl text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-4">
            Everything You Need to{' '}
            <span className="text-gradient-teal">Succeed</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Four powerful sections designed to support every stage of your academic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.path}
              className="group cursor-pointer border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              onClick={() => router.navigate({ to: feature.path })}
            >
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      feature.color === 'teal' ? 'gradient-teal shadow-teal' : 'gradient-amber shadow-amber'
                    }`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={
                      feature.color === 'teal'
                        ? { background: 'oklch(0.93 0.04 195)', color: 'oklch(0.35 0.1 195)' }
                        : { background: 'oklch(0.93 0.08 78)', color: 'oklch(0.50 0.14 55)' }
                    }
                  >
                    {feature.badge}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className="flex items-center gap-1 text-sm font-medium mt-auto"
                  style={{ color: feature.color === 'teal' ? 'oklch(0.42 0.12 195)' : 'oklch(0.62 0.17 60)' }}
                >
                  Explore
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 sm:px-6 pb-16">
        <div className="gradient-teal rounded-2xl p-8 sm:p-12 text-center shadow-teal">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white mb-4">
            Ready to Transform Your Studies?
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-8 max-w-lg mx-auto">
            Join thousands of students using EduNex AI to study smarter, not harder.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="gradient-amber text-white border-0 shadow-amber font-semibold px-8 hover:opacity-90"
              onClick={() => router.navigate({ to: '/ai-assistant' })}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold px-8"
              onClick={() => router.navigate({ to: '/notes' })}
            >
              Browse Resources
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
