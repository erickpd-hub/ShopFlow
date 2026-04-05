import React from 'react';

export default function Hero({ title, subtitle, button_text }: { title: string, subtitle: string, button_text: string }) {
  return (
    <section className="bg-[var(--background)] text-[var(--text)] py-20 px-10 text-center">
      <h1 className="text-6xl font-black mb-4 tracking-tighter">{title}</h1>
      <p className="text-xl mb-8 opacity-80">{subtitle}</p>
      <button className="bg-[var(--primary)] text-white px-8 py-4 rounded-full font-bold">
        {button_text}
      </button>
    </section>
  );
}
