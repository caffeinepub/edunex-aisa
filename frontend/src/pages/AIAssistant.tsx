import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: "That's a great question! Let me help you understand this concept better.\n\nThis topic involves several key principles that are important to grasp. I'd recommend breaking it down into smaller parts and tackling each one systematically. Start with the fundamentals, then build up to more complex ideas.\n\n**Key Points to Remember:**\n• Focus on understanding the core concept first\n• Practice with examples to reinforce learning\n• Connect new knowledge to what you already know\n\nWould you like me to explain any specific aspect in more detail?",
};

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('math') || q.includes('calculus') || q.includes('algebra') || q.includes('equation')) {
    return "Great math question! 📐\n\nMathematics is all about logical reasoning and pattern recognition. Here's how to approach this:\n\n**Step-by-step approach:**\n1. Identify what you're given and what you need to find\n2. Choose the appropriate formula or method\n3. Substitute values carefully\n4. Simplify step by step\n5. Verify your answer\n\nFor algebra and calculus problems, always remember to check your work by substituting back into the original equation. Practice is key — the more problems you solve, the more intuitive it becomes!";
  }
  if (q.includes('physics') || q.includes('force') || q.includes('energy') || q.includes('motion')) {
    return "Physics is fascinating! ⚡\n\nPhysics connects mathematical principles to the real world. Here's a structured approach:\n\n**Core Concepts:**\n• Newton's Laws govern most classical mechanics\n• Energy conservation is a powerful problem-solving tool\n• Always draw a free body diagram for force problems\n\n**Problem-Solving Strategy:**\n1. Read the problem carefully and identify known/unknown quantities\n2. Draw a diagram\n3. Apply relevant laws (Newton's, conservation of energy, etc.)\n4. Solve mathematically\n5. Check units and reasonableness of answer\n\nRemember: Physics is about understanding *why* things happen, not just memorizing formulas!";
  }
  if (q.includes('chemistry') || q.includes('element') || q.includes('reaction') || q.includes('molecule')) {
    return "Chemistry is the science of matter! 🧪\n\n**Key Principles:**\n• The periodic table is your best friend — learn to read it\n• Balancing equations requires equal atoms on both sides\n• Mole concept connects microscopic atoms to measurable quantities\n\n**Tips for Success:**\n1. Memorize common polyatomic ions and their charges\n2. Practice balancing equations daily\n3. Understand oxidation states for redox reactions\n4. Use dimensional analysis for unit conversions\n\nChemistry becomes much easier once you understand the underlying patterns. Would you like help with a specific reaction or concept?";
  }
  if (q.includes('history') || q.includes('war') || q.includes('civilization') || q.includes('century')) {
    return "History is the story of humanity! 📜\n\n**Effective History Study Techniques:**\n• Create timelines to visualize chronological relationships\n• Understand cause and effect — events don't happen in isolation\n• Connect events to their broader social, economic, and political context\n\n**Memory Techniques:**\n1. Use mnemonics for dates and names\n2. Create mind maps connecting related events\n3. Tell the story in your own words\n4. Relate historical events to modern parallels\n\nHistory is not just about memorizing dates — it's about understanding human behavior and societal change. What specific period or event would you like to explore?";
  }
  if (q.includes('biology') || q.includes('cell') || q.includes('dna') || q.includes('evolution') || q.includes('organism')) {
    return "Biology — the science of life! 🧬\n\n**Core Areas to Master:**\n• Cell biology: structure and function of cells\n• Genetics: DNA, inheritance, and mutations\n• Ecology: relationships between organisms and environment\n• Evolution: natural selection and adaptation\n\n**Study Tips:**\n1. Use diagrams extensively — biology is very visual\n2. Understand processes (like photosynthesis, respiration) as sequences\n3. Learn terminology systematically — many terms share roots\n4. Connect structure to function always\n\nBiology is interconnected — understanding one system helps you understand others. Which topic would you like to dive deeper into?";
  }
  if (q.includes('english') || q.includes('grammar') || q.includes('essay') || q.includes('literature') || q.includes('writing')) {
    return "English Language & Literature! ✍️\n\n**Writing Excellence Tips:**\n• Structure: Introduction → Body Paragraphs → Conclusion\n• Each paragraph should have one main idea (topic sentence)\n• Use evidence and examples to support every claim\n• Vary sentence structure for engaging writing\n\n**Grammar Essentials:**\n1. Subject-verb agreement\n2. Proper use of tenses\n3. Punctuation rules (commas, semicolons, apostrophes)\n4. Active vs. passive voice\n\n**For Literature Analysis:**\n• Identify themes, motifs, and symbols\n• Analyze character development\n• Consider historical and cultural context\n• Use PEEL structure: Point, Evidence, Explanation, Link\n\nWould you like help with a specific writing task or literary analysis?";
  }
  return MOCK_RESPONSES.default;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "Hello! 👋 I'm your EduNex AI Study Assistant. I can help you with any academic subject — Mathematics, Physics, Chemistry, Biology, History, English, and more!\n\nJust type your question or describe the topic you're struggling with, and I'll provide a detailed explanation to help you understand.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response delay
    await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getMockResponse(question),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold text-foreground mt-2 mb-1">{line.slice(2, -2)}</p>;
      }
      if (line.startsWith('• ')) {
        return <li key={i} className="ml-4 list-disc">{line.slice(2)}</li>;
      }
      if (/^\d+\. /.test(line)) {
        return <li key={i} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      }
      if (line === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  const suggestedQuestions = [
    'Explain Newton\'s laws of motion',
    'How does photosynthesis work?',
    'What is the quadratic formula?',
    'Explain the French Revolution',
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl gradient-teal flex items-center justify-center shadow-teal">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground">AI Study Assistant</h1>
          <p className="text-muted-foreground text-sm">Ask any academic question and get instant help</p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-700">Online</span>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="border border-border/60 shadow-card mb-4 overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'assistant' ? 'gradient-teal shadow-teal' : 'gradient-amber shadow-amber'
                }`}
              >
                {message.role === 'assistant' ? (
                  <Bot className="w-4 h-4 text-white" />
                ) : (
                  <User className="w-4 h-4 text-white" />
                )}
              </div>

              {/* Bubble */}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'gradient-teal text-white rounded-tr-sm'
                    : 'bg-secondary text-foreground rounded-tl-sm'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  {formatContent(message.content)}
                </div>
                <div
                  className={`text-xs mt-2 ${
                    message.role === 'user' ? 'text-white/60 text-right' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="w-8 h-8 rounded-xl gradient-teal flex items-center justify-center flex-shrink-0 shadow-teal">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-secondary rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'oklch(0.42 0.12 195)' }} />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q) => (
              <button
                key={q}
                onClick={() => setInput(q)}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors text-muted-foreground hover:text-foreground"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <Card className="border border-border/60 shadow-card">
        <CardContent className="p-3">
          <div className="flex gap-3 items-end">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask any academic question... (Press Enter to send, Shift+Enter for new line)"
              className="flex-1 min-h-[60px] max-h-[160px] resize-none border-0 focus-visible:ring-0 bg-transparent text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              className="gradient-teal text-white border-0 shadow-teal hover:opacity-90 transition-opacity h-10 w-10 p-0 rounded-xl flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <div className="flex items-center gap-1.5 mt-2 px-1">
            <Sparkles className="w-3 h-3" style={{ color: 'oklch(0.78 0.16 75)' }} />
            <span className="text-xs text-muted-foreground">AI responses are for educational guidance only</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
