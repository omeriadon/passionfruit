"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
}

const GREETINGS = [
  "What's on your mind today?",
  "Where should we start?",
  "What are you working on?",
  "Moof!"
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [greeting, setGreeting] = useState(GREETINGS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasStarted = messages.length > 0;

  useEffect(() => {
    setGreeting(GREETINGS[Math.floor(Math.random() * GREETINGS.length)]);
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { id: Date.now(), role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const assistantId = Date.now() + 1;
    setMessages((prev) => [
      ...prev,
      { id: assistantId, role: 'assistant', content: '', reasoning: '' },
    ]);

    try {
      const res = await fetch('/clarus/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok || !res.body) throw new Error(`Request failed: ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const payload = line.slice(6);
          if (payload === '[DONE]') continue;

          let parsed: { content?: string; reasoning?: string; error?: string };
          try {
            parsed = JSON.parse(payload);
          } catch {
            continue;
          }

          if (parsed.error) {
            throw new Error(parsed.error);
          }

          if (parsed.reasoning) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, reasoning: (m.reasoning ?? '') + parsed.reasoning }
                  : m
              )
            );
          }

          if (parsed.content) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? { ...m, content: m.content + parsed.content }
                  : m
              )
            );
          }
        }
      }
    } catch (err) {
      console.error('OpenRouter request failed:', err);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: 'Something went wrong contacting the model. Please try again.' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const InputBar = (
    <div className="flex items-center gap-2 bg-white border border-[#E3DFD3] rounded-2xl px-4 py-3 shadow-sm focus-within:border-[#D97757] transition-colors">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Wow"
        rows={1}
        disabled={isLoading}
        className="flex-1 resize-none bg-transparent outline-none text-[15px] leading-relaxed placeholder-[#9A9588] max-h-[200px] disabled:opacity-60"
      />
      <button
        onClick={sendMessage}
        disabled={!input.trim() || isLoading}
        aria-label="Send message"
        className={`shrink-0 rounded-full p-2 transition-colors ${
          input.trim() && !isLoading
            ? 'bg-[#D97757] text-white hover:bg-[#C56A4B]'
            : 'bg-[#E3DFD3] text-[#B5AFA0] cursor-not-allowed'
        }`}
      >
        <ArrowUp size={16} strokeWidth={2.5} />
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 flex flex-col text-[#2D2A26] overflow-hidden">
      {!hasStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6 min-h-0">
          <h1 className="text-4xl font-bold text-center max-w-3xl font-panchang">
            {greeting}
          </h1>
          <div className="w-full max-w-2xl">{InputBar}</div>
        </div>
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-y-auto mt-10">
            <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={
                    m.role === 'user'
                      ? 'self-end max-w-[80%] bg-[#E8E4DA] rounded-2xl px-4 py-2.5'
                      : 'self-start max-w-[85%] px-1'
                  }
                >
                  {m.role === 'assistant' && m.reasoning && (
                    <details className="text-xs text-[#9A9588] mb-1.5">
                      <summary className="cursor-pointer select-none">Thinking</summary>
                      <p className="whitespace-pre-wrap mt-1 leading-relaxed">
                        {m.reasoning}
                      </p>
                    </details>
                  )}
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
                    {m.content}
                    {isLoading &&
                      m.role === 'assistant' &&
                      m.id === messages[messages.length - 1].id && (
                        <span className="inline-block w-1.5 h-4 ml-0.5 bg-[#9A9588] animate-pulse align-middle" />
                      )}
                  </p>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>
          </div>

          <div className="px-4 pb-6 pt-2 shrink-0">
            <div className="max-w-2xl mx-auto">{InputBar}</div>
          </div>
        </>
      )}
    </div>
  );
}