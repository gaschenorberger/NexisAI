import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';

import styles from './loginPage.module.css'

import BackgroundContainer from '../../../../components/ui/backgroundContainer/backgroundContainer';
import DefaultButton from '../../../../components/ui/defaultButton/defaultButton';
import DefaultInput from '../../../../components/ui/defaultInput/defaultInput';
import FadeIn from '../../../../components/ui/fadeIn/fadeIn';

import nexisIcon from '../../../../assets/nexis-icon.svg'
import googleIcon from '../../../../assets/google-icon.svg'
import appleIcon from '../../../../assets/apple-icon.svg'
import telephoneIcon from '../../../../assets/telephone-icon.svg'


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

     const isValidEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

        const handleContinue = () => {
            if (!isValidEmail) return;

            navigate('/auth/email', {
                state: {email: email.trim() }
            });
        };

    return (
        <main className={styles.loginPage}>
            <BackgroundContainer>
                <div className={styles.loginContainer}>

                    <FadeIn delay={0}>
                        <section className={styles.topSection}>
                            <img 
                                className={styles.nexisIcon}
                                alt=''
                                src={nexisIcon}
                            />

                            <h1 className={styles.CTALogin}>Fazer login</h1>

                            <p className={styles.loginPageText}>
                                Faça seu login e comece a <br/> decolagem do seu negócio.
                            </p>
                        </section>
                    </FadeIn>

                    
                    <FadeIn delay={200}>
                        <DefaultButton 
                            text='Continuar com o Google'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFF" class="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                                </svg>
                            }
                        />
                    </FadeIn>
                    
                    <FadeIn delay={300}>
                        <DefaultButton 
                            text='Continuar com a Apple'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFFF" class="bi bi-apple" viewBox="0 0 16 16">
                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                                    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"/>
                                </svg>
                            }
                        />
                    </FadeIn>

                    <FadeIn delay={400}>
                        <DefaultButton 
                            text='Continuar com o telefone'
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                </svg>
                            }
                        />
                    </FadeIn>

                    <FadeIn delay={500}>
                        <span className={styles.divider}>OU</span>
                    </FadeIn>

                    <FadeIn delay={600} className={styles.fullWidth}>
                        <form
                            className={styles.emailForm}
                            onSubmit={(event) => {
                                event.preventDefault();
                                handleContinue();
                            }}
                        >
                            <DefaultInput
                                type="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                icon={<Mail size={20} />}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                autoComplete="email"
                                required
                                endElement={
                                    <button
                                        type="submit"
                                        className={styles.emailNextButton}
                                        disabled={!isValidEmail}
                                        aria-label="Continuar com e-mail"
                                    >
                                        <ArrowRight size={22} />
                                    </button>
                                }
                            />
                        </form>
                    </FadeIn>

                    

                    

                    

                    
                </div>
            </BackgroundContainer>
        </main>
    )
    
}

export default LoginPage;