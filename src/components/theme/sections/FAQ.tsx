"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSettings {
  title?: string;
  items?: FAQItem[];
  q1?: string; a1?: string;
  q2?: string; a2?: string;
  q3?: string; a3?: string;
  paddingY?: string | number;
  titleColor?: string;
}

export default function FAQ({ settings }: { settings: FAQSettings }) {
  const { 
    title = "Frequently Asked Questions", 
    items = [],
    q1, a1, q2, a2, q3, a3,
    paddingY = 96,
    titleColor = "var(--theme-primary)"
  } = settings;

  const customItems: FAQItem[] = [];
  if (q1 || a1) customItems.push({ question: q1 || "Question 1", answer: a1 || "Answer here..." });
  if (q2 || a2) customItems.push({ question: q2 || "Question 2", answer: a2 || "Answer here..." });
  if (q3 || a3) customItems.push({ question: q3 || "Question 3", answer: a3 || "Answer here..." });

  const displayItems = customItems.length > 0 ? customItems : (items.length > 0 ? items : [
    { question: "What is your shipping policy?", answer: "We offer worldwide express shipping. Most orders arrive within 3-5 business days." },
    { question: "Do you offer returns?", answer: "Yes, we accept returns within 30 days of purchase. The item must be in its original condition." },
    { question: "Can I customize my order?", answer: "Bespoke customizations are available for select collections. Please contact our support team." }
  ]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="w-full transition-all duration-500" 
             style={{ 
               backgroundColor: "var(--theme-bg)",
               paddingTop: `${paddingY}px`,
               paddingBottom: `${paddingY}px`
             }}>
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-black mb-16 tracking-[-0.04em] text-center" style={{ color: titleColor }}>
          {title}
        </h2>

        <div className="space-y-4">
          {displayItems.map((item, idx) => {
            const isOpen = activeIndex === idx;
            return (
              <div 
                key={idx} 
                className="glass-card overflow-hidden transition-all duration-500 border border-black/5" 
                style={{ 
                  borderRadius: "var(--theme-radius, 1.5rem)", 
                  backgroundColor: isOpen ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.4)" 
                }}
              >
                <button 
                  onClick={() => setActiveIndex(isOpen ? null : idx)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-black tracking-tight" style={{ color: "var(--theme-text, #1e293b)" }}>{item.question}</span>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''} text-[#C0C0C0] group-hover:text-black`} />
                </button>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-8 pb-8 text-base opacity-70 font-medium leading-relaxed" style={{ color: "var(--theme-text, #1e293b)" }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
