import styles from './welcomePage.module.css'
import BackgroundContainer from '../../components/ui/backgroundContainer/backgroundContainer'
import FadeIn from '../../components/ui/fadeIn/fadeIn'
import nexisLogo from '../../assets/nexis-logo.svg'
import DefaultButton from '../../components/ui/defaultButton/defaultButton'
import { useNavigate } from 'react-router-dom'


const WelcomePage = () => {
    const navigate = useNavigate();

    return(
        <main className={styles.welcomePage}>
            <BackgroundContainer>
                <div className={styles.welcomeContainer}>

                    <FadeIn delay={0}>
                        <img
                            src={nexisLogo}
                            className={styles.nexisLogo}
                            alt="NEXIS AI"
                        />
                    </FadeIn>

                    <FadeIn delay={150}>
                        <p className={styles.sloganText}>
                            Onde a psicologia encontra
                            a produtividade.
                        </p>
                    </FadeIn>

                    <FadeIn delay={300}>
                        <h1 className={styles.CTAWelcome}>
                            Vamos começar!
                        </h1>
                    </FadeIn>

                    <FadeIn delay={450}>
                        <DefaultButton
                            text="Entrar"
                            onClick={() => navigate('/login')}
                        />
                    </FadeIn>

                </div>
            </BackgroundContainer>
        </main>
    )
}

export default WelcomePage;