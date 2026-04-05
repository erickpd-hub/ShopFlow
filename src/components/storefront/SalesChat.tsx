"use client";

import { useState } from "react";
import { MessageSquare, Send, X, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

// Build a proper initial UIMessage with parts array
function makeWelcomeMessage(storeName: string): UIMessage {
    return {
        id: "welcome",
        role: "assistant",
        parts: [
            {
                type: "text",
                text: `¡Hola! Bienvenido a **${storeName}**. Soy tu asistente IA de ventas. ¿En qué puedo ayudarte hoy?`,
            },
        ],
    };
}

// Helper to extract the text content from a UIMessage (reads all text parts)
function getMessageText(message: UIMessage): string {
    return message.parts
        .filter((p) => p.type === "text")
        .map((p) => (p as { type: "text"; text: string }).text)
        .join("");
}

export default function SalesChat({
    storeId,
    storeName,
}: {
    storeId: string;
    storeName: string;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: "/api/ai/chat",
            body: { storeId, storeName },
        }),
        messages: [makeWelcomeMessage(storeName)],
    });

    const isLoading = status === "streaming" || status === "submitted";

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        sendMessage({ text: input });
        setInput("");
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Trigger Button */}
            {!isOpen && (
                <Button
                    size="icon"
                    className="h-16 w-16 rounded-full shadow-2xl hover:scale-110 transition-transform bg-[var(--store-primary)]"
                    onClick={() => setIsOpen(true)}
                >
                    <MessageSquare className="h-8 w-8" />
                </Button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="w-80 md:w-96 h-[500px] flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 border-none bg-background/95 backdrop-blur-xl">
                    <CardHeader
                        className="border-b py-4 flex flex-row items-center justify-between"
                        style={{ backgroundColor: "var(--store-primary)", color: "white" }}
                    >
                        <div className="flex items-center gap-2">
                            <Bot className="h-5 w-5" />
                            <CardTitle className="text-sm font-bold">Asistente {storeName}</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-white/10"
                            onClick={() => setIsOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((m: UIMessage) => {
                            const text = getMessageText(m);
                            return (
                                <div
                                    key={m.id}
                                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                            m.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                                : "bg-muted text-foreground rounded-tl-none border shadow-sm"
                                        }`}
                                    >
                                        {text}
                                    </div>
                                </div>
                            );
                        })}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-muted p-3 rounded-2xl rounded-tl-none border animate-pulse">
                                    <div className="flex gap-1">
                                        <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce" />
                                        <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce delay-75" />
                                        <div className="w-1 h-1 bg-foreground/30 rounded-full animate-bounce delay-150" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </CardContent>

                    <CardFooter className="p-4 border-t">
                        <form onSubmit={handleSubmit} className="flex w-full gap-2">
                            <Input
                                placeholder="Pregúntame algo..."
                                value={input}
                                onChange={handleInputChange}
                                className="flex-1 h-10 border-none bg-muted"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="h-10 w-10 shrink-0"
                                style={{ backgroundColor: "var(--store-primary)" }}
                            >
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
