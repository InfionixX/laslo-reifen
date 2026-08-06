import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

const ChatWidget = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Hallo! Wie kann ich helfen?', sender: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');

        // Simple keyword routing — this is a front desk, not an assistant
        setTimeout(() => {
            let replyText = 'Danke für Ihre Nachricht. Wir melden uns in Kürze.';
            const lower = userMsg.text.toLowerCase();

            if (lower.includes('reifen') || lower.includes('gumi')) {
                replyText =
                    "Wir haben eine große Auswahl an Reifen. Schauen Sie unter 'Reifentypen' oder nutzen Sie das Kontaktformular für ein Angebot.";
            } else if (lower.includes('felgen') || lower.includes('felni')) {
                replyText =
                    'Wir führen Alu- und Stahlfelgen vieler Marken. Senden Sie uns eine Anfrage für Details.';
            } else if (
                lower.includes('kontakt') ||
                lower.includes('adresse') ||
                lower.includes('telefon')
            ) {
                replyText =
                    'Sie erreichen uns unter +49 123 456 789 oder per Email an info@laslo-reifen.de.';
            } else if (lower.includes('hallo') || lower.includes('hi')) {
                replyText = 'Hallo! Wie kann ich Ihnen heute helfen?';
            }

            setMessages((prev) => [
                ...prev,
                { id: Date.now() + 1, text: replyText, sender: 'bot' },
            ]);
        }, 800);
    };

    return (
        <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 16 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 16 }}
                        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-4 flex h-[420px] w-80 flex-col overflow-hidden rounded-2xl border border-bone/10 bg-graphite shadow-2xl sm:w-96"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-bone/10 px-5 py-4">
                            <h2 className="flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-bone">
                                <MessageSquare className="h-3.5 w-3.5 text-copper" />
                                {t('brand_1')} {t('brand_2')}
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Chat schließen"
                                className="text-ash transition-colors hover:text-bone"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 space-y-3 overflow-y-auto bg-obsidian/60 p-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${
                                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'rounded-br-sm bg-copper text-obsidian'
                                                : 'rounded-bl-sm bg-slate text-bone-dim'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="flex gap-2 border-t border-bone/10 p-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ihre Frage…"
                                aria-label="Ihre Frage"
                                className="flex-1 rounded-full border border-bone/15 bg-obsidian px-4 py-2.5 text-sm text-bone placeholder-ash-dim transition-colors focus:border-copper focus:outline-none"
                            />
                            <button
                                onClick={handleSend}
                                aria-label="Senden"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper text-obsidian transition-colors hover:bg-copper-hi"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setIsOpen(true)}
                    aria-label="Chat öffnen"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-copper text-obsidian shadow-lg transition-colors hover:bg-copper-hi"
                >
                    <MessageSquare className="h-5 w-5" />
                </motion.button>
            )}
        </div>
    );
};

export default ChatWidget;
