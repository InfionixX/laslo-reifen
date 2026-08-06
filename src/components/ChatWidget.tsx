import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

/* Fixed chrome, so it reads the journey's --tone-* variables rather than
   committing to one half of the palette. */

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

        // Simple keyword routing - this is a front desk, not an assistant
        setTimeout(() => {
            let replyText = 'Danke für Ihre Nachricht. Wir melden uns in Kürze.';
            const lower = userMsg.text.toLowerCase();

            if (lower.includes('reifen') || lower.includes('gumi')) {
                replyText =
                    'Wir führen vier Reifenarten mit je vier Optionen. Scrollen Sie durch den Laden oder nutzen Sie das Formular am Empfang.';
            } else if (lower.includes('felgen') || lower.includes('felni')) {
                replyText =
                    'An der Felgenwand finden Sie Alu, Stahl und RDKS. Senden Sie uns eine Anfrage für Details.';
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
                        className="tone-bd mb-4 flex h-[420px] w-80 flex-col overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-xl sm:w-96"
                        style={{ background: 'var(--tone-panel)' }}
                    >
                        {/* Header */}
                        <div className="tone-bd flex items-center justify-between border-b px-5 py-4">
                            <h2 className="tone-text flex items-center gap-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.18em]">
                                <MessageSquare className="h-3.5 w-3.5 text-copper" />
                                {t('brand_1')} {t('brand_2')}
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                aria-label="Chat schließen"
                                className="tone-text-dim hover:!text-copper"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 space-y-3 overflow-y-auto p-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${
                                        msg.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div
                                        className={
                                            msg.sender === 'user'
                                                ? 'max-w-[80%] rounded-xl rounded-br-sm bg-copper px-3.5 py-2.5 text-sm leading-relaxed text-showroom'
                                                : 'tone-text tone-bd max-w-[80%] rounded-xl rounded-bl-sm border px-3.5 py-2.5 text-sm leading-relaxed'
                                        }
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="tone-bd flex gap-2 border-t p-3">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ihre Frage…"
                                aria-label="Ihre Frage"
                                className="tone-text tone-bd flex-1 rounded-full border bg-transparent px-4 py-2.5 text-sm transition-colors focus:border-copper focus:outline-none"
                            />
                            <button
                                onClick={handleSend}
                                aria-label="Senden"
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-copper text-showroom transition-colors hover:bg-copper-lo"
                            >
                                <Send className="h-4 w-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle - copper reads on both halves of the journey */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => setIsOpen(true)}
                    aria-label="Chat öffnen"
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-copper text-showroom shadow-lg transition-colors hover:bg-copper-lo"
                >
                    <MessageSquare className="h-5 w-5" />
                </motion.button>
            )}
        </div>
    );
};

export default ChatWidget;
