import { useState } from 'react';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import nexisIcon from '../../../../assets/nexis-icon.svg';
import BackgroundContainer from '../../../../components/ui/backgroundContainer/backgroundContainer';
import DefaultButton from '../../../../components/ui/defaultButton/defaultButton';
import DefaultInput from '../../../../components/ui/defaultInput/defaultInput';
import FadeIn from '../../../../components/ui/fadeIn/fadeIn';
import { apiRequest, type AuthSession, type User } from '../../../../services/api';
import { saveAuthSession } from '../../authStorage';
import styles from '../loginPage/loginPage.module.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    setErrorMessage('');
    if (senha !== confirmacaoSenha) {
      setErrorMessage('As senhas precisam ser iguais.');
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest<User>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nome: nome.trim(), email: email.trim(), senha }),
      });
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
          : 'Não foi possível criar a conta.',
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
              <h1 className={styles.CTALogin}>Crie sua conta</h1>
              <p className={styles.loginPageText}>
                Comece a transformar desempenho em resultado.
              </p>
            </section>
          </FadeIn>

          <FadeIn delay={150} className={styles.fullWidth}>
            <form
              className={styles.authForm}
              onSubmit={(event) => {
                event.preventDefault();
                void handleRegister();
              }}
            >
              <DefaultInput
                name="nome"
                placeholder="Seu nome"
                icon={<UserRound size={20} />}
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                autoComplete="name"
                minLength={2}
                maxLength={120}
                required
              />
              <DefaultInput
                type="email"
                name="email"
                placeholder="Seu e-mail"
                icon={<Mail size={20} />}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
              <DefaultInput
                type="password"
                name="senha"
                placeholder="Crie uma senha (mínimo 8 caracteres)"
                icon={<LockKeyhole size={20} />}
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <DefaultInput
                type="password"
                name="confirmacaoSenha"
                placeholder="Repita sua senha"
                icon={<LockKeyhole size={20} />}
                value={confirmacaoSenha}
                onChange={(event) => setConfirmacaoSenha(event.target.value)}
                autoComplete="new-password"
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
                text={isSubmitting ? 'Criando conta...' : 'Criar conta'}
                disabled={isSubmitting}
              />
            </form>
          </FadeIn>

          <FadeIn delay={250}>
            <p className={styles.secondaryAction}>
              Já tem conta? <Link to="/login">Faça login</Link>
            </p>
          </FadeIn>
        </div>
      </BackgroundContainer>
    </main>
  );
};

export default RegisterPage;
