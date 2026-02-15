import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';

interface TypewriterTextProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    delay?: number;
    speed?: number;
}

const TypewriterText = ({ text, className = '', tag = 'p', delay = 0, speed = 0.05 }: TypewriterTextProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const Tag = motion[tag as keyof typeof motion] as any; // Cast to any to avoid complex dynamic component typing issues

    const characters = Array.from(text);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: speed, delayChildren: delay * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: -20,
            y: 10,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };


    return (
        <Tag
            ref={ref}
            className={className}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            aria-label={text} // Accessible label since we're breaking up the text
        >
            {characters.map((char, index) => (
                <motion.span variants={child} key={index}>
                    {char === " " ? " " : char}
                </motion.span>
            ))}
        </Tag>
    );
};

export default TypewriterText;
