import type { ReactNode, InputHTMLAttributes } from 'react';
import styles from './defaultInput.module.css';

interface DefaultInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    icon?: ReactNode;
    endElement?: ReactNode;
}

const DefaultInput = ({
    icon,
    endElement,
    type = 'text',
    placeholder,
    className,
    ...props
}: DefaultInputProps) => {
    return (
        <div className={styles.inputContainer}>
            {icon && (
                <span className={styles.inputIcon}>
                    {icon}
                </span>
            )}

            <input
                className={`${styles.defaultInput} ${className ?? ''}`}
                type={type}
                placeholder={placeholder}
                {...props}
            />

            {endElement && (
                <span className={styles.endElement}>
                    {endElement}
                </span>
            )}
        </div>
    );
};

export default DefaultInput;