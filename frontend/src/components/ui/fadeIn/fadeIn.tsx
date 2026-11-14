
import type { ReactNode, CSSProperties } from 'react';
import styles from './fadeIn.module.css';

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

const FadeIn = ({
    children,
    delay = 0,
    duration = 600,
    className = ''
}: FadeInProps) => {

    const animationStyle = {
        '--delay': `${delay}ms`,
        '--duration': `${duration}ms`
    } as CSSProperties;

    return (
        <div
            className={`${styles.fadeIn} ${className}`}
            style={animationStyle}
        >
            {children}
        </div>
    );
};

export default FadeIn;
