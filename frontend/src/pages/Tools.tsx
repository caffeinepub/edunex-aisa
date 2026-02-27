import { useEffect } from 'react';
import { Wrench, ExternalLink, Plus, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { type Tool } from '../backend';
import { useGetAllTools, useInitializeTools } from '../hooks/useQueries';
import { toast } from 'sonner';

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Card className="group border border-border/60 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
            {tool.icon}
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="font-display font-semibold text-base leading-snug">
              {tool.name}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {tool.description}
        </p>
        {tool.url ? (
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl transition-all hover:opacity-90 text-white"
            style={{ background: 'linear-gradient(135deg, oklch(0.42 0.12 195), oklch(0.35 0.1 200))' }}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Launch Tool
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl bg-secondary text-muted-foreground">
            Coming Soon
          </span>
        )}
      </CardContent>
    </Card>
  );
}

export default function Tools() {
  const { data: tools = [], isLoading, refetch } = useGetAllTools();
  const initializeTools = useInitializeTools();

  // Auto-initialize tools if none exist
  useEffect(() => {
    if (!isLoading && tools.length === 0) {
      initializeTools.mutate(undefined, {
        onSuccess: () => {
          refetch();
        },
        onError: () => {
          // Tools may already be initialized
        },
      });
    }
  }, [isLoading, tools.length]);

  const handleInitialize = async () => {
    try {
      await initializeTools.mutateAsync();
      toast.success('Tools initialized successfully!');
    } catch {
      toast.error('Failed to initialize tools. They may already be set up.');
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl gradient-teal flex items-center justify-center shadow-teal">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">Academic Tools</h1>
            <p className="text-muted-foreground text-sm">
              {tools.length} tool{tools.length !== 1 ? 's' : ''} available — more coming soon
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {tools.length === 0 && !isLoading && (
            <Button
              onClick={handleInitialize}
              disabled={initializeTools.isPending}
              variant="outline"
              className="border-primary/30 hover:bg-primary/5"
            >
              {initializeTools.isPending ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Initialize Tools
            </Button>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div
        className="rounded-xl p-4 mb-8 flex items-start gap-3 border"
        style={{
          background: 'oklch(0.97 0.02 195)',
          borderColor: 'oklch(0.85 0.07 195)',
        }}
      >
        <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center flex-shrink-0 mt-0.5">
          <Plus className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground mb-0.5">Extensible Tool Platform</p>
          <p className="text-sm text-muted-foreground">
            This section is designed to grow. New academic tools can be added to the backend at any time and will automatically appear here — no code changes needed.
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      {isLoading || initializeTools.isPending ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="border border-border/60">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <Skeleton className="w-12 h-12 rounded-2xl" />
                  <Skeleton className="h-5 w-2/3 mt-2" />
                </div>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-9 w-28 rounded-xl" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : tools.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
            <Wrench className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-2">No tools yet</h3>
          <p className="text-muted-foreground text-sm mb-6">
            Initialize the default tools to get started.
          </p>
          <Button
            onClick={handleInitialize}
            disabled={initializeTools.isPending}
            className="gradient-teal text-white border-0 shadow-teal hover:opacity-90"
          >
            {initializeTools.isPending ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Initialize Default Tools
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      )}

      {/* Coming Soon Section */}
      {tools.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display font-semibold text-lg text-foreground mb-4">Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '📊', name: 'Grade Calculator', description: 'Calculate your GPA and track academic performance across subjects.' },
              { icon: '⏱️', name: 'Study Timer', description: 'Pomodoro-style study timer to boost focus and productivity.' },
              { icon: '🗂️', name: 'Flashcard Maker', description: 'Create and review digital flashcards for efficient memorization.' },
            ].map((item) => (
              <Card key={item.name} className="border border-dashed border-border/60 opacity-60">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-display font-semibold text-base text-foreground">{item.name}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-muted-foreground">
                    Coming Soon
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
