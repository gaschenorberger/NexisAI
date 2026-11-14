import type { ReactNode } from 'react';
import styles from './backgroundContainer.module.css';
import waveImage from '../../../assets/wave-effect-image.png'

interface BackgroundContainerProps {
    children: ReactNode;
}

const BackgroundContainer = ({ children }: BackgroundContainerProps) => {
    return (
        <div className={styles.backgroundContainer}>
            <div className={styles.waveContainer}>
                <img 
                    className={styles.waveImage} 
                    src={waveImage}
                    alt=''
                />
            </div>

            <div className={styles.contentContainer}>
                {children}
            </div>
        </div>  
    )
}

export default BackgroundContainer;