import type { ReactNode, ButtonHTMLAttributes } from 'react'
import styles from './defaultButton.module.css'

interface DefaultButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement> {
        text: string;
        icon?: ReactNode;
    }

const DefaultButton = ({
    icon, 
    text,
    type = 'button',
    ...props
}:DefaultButtonProps) => {
     return (
        <button
            className={styles.defaultButton}
            type={type}
            {...props}
        >

            {icon && (
                <span className={styles.buttonIcon}>
                    {icon}
                </span>
            )}
            {/* button icon / if needed */}
            <span className={styles.textButton}>
                {text}
            </span> 


        </button>
    );
};

export default DefaultButton;