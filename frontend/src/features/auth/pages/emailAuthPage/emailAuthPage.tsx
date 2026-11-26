import { useState } from 'react';
import { LockKeyhole, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import nexisIcon from '../../../../assets/nexis-icon.svg';
import BackgroundContainer from '../../../../components/ui/backgroundContainer/backgroundContainer';
import DefaultButton from '../../../../components/ui/defaultButton/defaultButton';
import DefaultInput from '../../../../components/ui/defaultInput/defaultInput';
import FadeIn from '../../../../components/ui/fadeIn/fadeIn';
import { apiRequest, type AuthSession } from '../../../../services/api';
import { saveAuthSession } from '../../authStorage';
import styles from '../loginPage/loginPage.module.css';

interface EmailAuthLocationState {
  email?: string;
}

const EmailAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as EmailAuthLocationState | null;
  const [email, setEmail] = useState(locationState?.email ?? '');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const session = await apiRequest<AuthSession>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim(), senha }),
      });
      saveAuthSession(session);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Não foi possível fazer login.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={styles.loginPage}>
      <BackgroundContainer>
        <div className={styles.loginContainer}>
          <FadeIn delay={0}>
            <section className={styles.topSection}>
              <img className={styles.nexisIcon} alt="" src={nexisIcon} />
              <h1 className={styles.CTALogin}>Acesse sua conta</h1>
              <p className={styles.loginPageText}>
                Continue a decolagem do seu negócio.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={150} className={styles.fullWidth}>
            <form
              className={styles.authForm}
              onSubmit={(event) => {
                event.preventDefault();
                void handleLogin();
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
              />
              <DefaultInput
                type="password"
                name="senha"
                placeholder="Digite sua senha"
                icon={<LockKeyhole size={20} />}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete="current-password"
                minLength={8}
                required
              />

              {errorMessage && (
                <p className={styles.errorMessage} role="alert">
                  {errorMessage}
                </p>
              )}

              <DefaultButton
                type="submit"
                text={isSubmitting ? 'Entrando...' : 'Entrar'}
                disabled={isSubmitting}
              />
            </form>
          </FadeIn>

          <FadeIn delay={250}>
            <p className={styles.secondaryAction}>
              Ainda não tem conta? <Link to="/register">Cadastre-se</Link>
            </p>
          </FadeIn>
        </div>
      </BackgroundContainer>
    </main>
  );
};

export default EmailAuthPage;
