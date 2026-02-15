import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaComments, FaXmark, FaPaperPlane } from 'react-icons/fa6';

type Message = {
    id: number;
    text: string;
    sender: 'user' | 'bot';
};

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: 'Hallo! Wie kann ich helfen?', sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simple Q&A Logic
        setTimeout(() => {
            let replyText = "Danke für Ihre Nachricht. Wir melden uns in Kürze.";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes('reifen') || lowerInput.includes('gumi')) {
                replyText = "Wir haben eine große Auswahl an Reifen. Schauen Sie unter 'Dienstleistungen' oder nutzen Sie das Kontaktformular für ein Angebot.";
            } else if (lowerInput.includes('felgen') || lowerInput.includes('felni')) {
                replyText = "Wir führen Alu- und Stahlfelgen vieler Marken. Senden Sie uns eine Anfrage für Details.";
            } else if (lowerInput.includes('kontakt') || lowerInput.includes('adresse') || lowerInput.includes('telefon')) {
                replyText = "Sie erreichen uns unter +49 123 456 789 oder per Email an info@laslo-reifen.de.";
            } else if (lowerInput.includes('hallo') || lowerInput.includes('hi')) {
                replyText = "Hallo! Wie kann ich Ihnen heute helfen?";
            }

            setMessages(prev => [...prev, { id: Date.now() + 1, text: replyText, sender: 'bot' }]);
        }, 800);
    };

    return (
        <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-brand-gray border border-gray-700 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[400px]"
                    >
                        {/* Header */}
                        <div className="bg-brand-orange p-4 flex justify-between items-center text-white">
                            <h3 className="font-bold flex items-center gap-2"><FaComments /> Laslo Chat</h3>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-orange-700 p-1 rounded transition-colors"><FaXmark /></button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-brand-dark/50">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-brand-orange text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-brand-gray border-t border-gray-700 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ihre Frage..."
                                className="flex-1 bg-brand-dark border border-gray-600 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-orange transition-colors"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-brand-orange hover:bg-orange-600 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                            >
                                <FaPaperPlane />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            {!isOpen && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-orange hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
                >
                    <FaComments />
                </motion.button>
            )}
        </div>
    );
};

export default ChatWidget;
