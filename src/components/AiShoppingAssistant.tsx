import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, Leaf, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface AiShoppingAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  suggestedProductIds?: string[];
}

export const AiShoppingAssistant: React.FC<AiShoppingAssistantProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onAddToCart
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Lumina, your AI Eco Shopping Concierge. What are you looking for today? I can recommend gifts, zero-waste gear, or style ideas from our store!",
      suggestedProductIds: ['p-1', 'p-4', 'p-10']
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    "Find a gift under $50 for a coffee lover",
    "Suggest a sustainable outfit for summer",
    "What are your top-rated zero-waste items?",
    "Show me solar gadgets for travel"
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          products: products.map((p) => ({
            id: p.id,
            name: p.name,
            price: p.price,
            category: p.category,
            ecoRating: p.ecoRating,
            description: p.description
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to reach AI service');
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.recommendation || "Here are a few sustainable products from our catalog:",
          suggestedProductIds: data.suggestedProductIds || []
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I recommend checking out our Artisan Bamboo Wireless Charger or Thermal Water Bottle — both are customer favorites!",
          suggestedProductIds: ['p-1', 'p-4']
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-hidden">
      <div className="relative w-full max-w-2xl bg-stone-900 border border-stone-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[80vh] max-h-[700px]">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-stone-950 shadow-md">
              <Sparkles className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <h3 className="font-bold text-stone-100 text-base flex items-center gap-2">
                Lumina AI Shopping Concierge
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                  Gemini Powered
                </span>
              </h3>
              <p className="text-xs text-stone-400">Ask for eco recommendations, gift guides, or product advice</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-full bg-stone-800 hover:bg-stone-750 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-stone-850 text-stone-200 border border-stone-800 rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>

              {/* Recommended Product Cards Grid */}
              {msg.suggestedProductIds && msg.suggestedProductIds.length > 0 && (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {msg.suggestedProductIds.map((id) => {
                    const prod = products.find((p) => p.id === id);
                    if (!prod) return null;
                    return (
                      <div
                        key={prod.id}
                        className="p-3 bg-stone-800 hover:bg-stone-750 rounded-xl border border-stone-700/80 flex items-center gap-3 transition-all cursor-pointer group"
                        onClick={() => {
                          onSelectProduct(prod);
                          onClose();
                        }}
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 object-cover rounded-lg bg-stone-900 flex-shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-stone-100 truncate group-hover:text-emerald-300">
                            {prod.name}
                          </h4>
                          <span className="text-xs font-extrabold text-emerald-400 block mt-0.5">
                            ${prod.price}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(prod);
                          }}
                          className="p-2 bg-emerald-500 hover:bg-emerald-400 text-stone-950 rounded-lg text-xs font-bold"
                          title="Add to cart"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-stone-400 p-3 bg-stone-850 rounded-xl max-w-xs border border-stone-800">
              <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
              Lumina is crafting your custom eco selection...
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-stone-800/80 bg-stone-900/90 flex gap-2 overflow-x-auto scrollbar-none">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-stone-100 text-[11px] font-medium rounded-lg whitespace-nowrap border border-stone-700/60 transition-colors flex items-center gap-1.5"
            >
              <Leaf className="w-3 h-3 text-emerald-400" />
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-stone-900 border-t border-stone-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask Lumina anything about products or gift ideas..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-stone-800 text-stone-100 text-xs sm:text-sm px-4 py-3 rounded-xl border border-stone-700 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
