import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import nexisLogo from '../../assets/nexis-logo.svg';
import BackgroundContainer from '../../components/ui/backgroundContainer/backgroundContainer';
import DefaultButton from '../../components/ui/defaultButton/defaultButton';
import FadeIn from '../../components/ui/fadeIn/fadeIn';
import { clearAuthSession, getAuthSession } from '../../features/auth/authStorage';
import { saveAuthSession } from '../../features/auth/authStorage';
import { apiRequest, type User } from '../../services/api';
import styles from './dashboardPage.module.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(getAuthSession);
  const accessToken = session?.accessToken;

  useEffect(() => {
    if (!accessToken) return;

    let isActive = true;
    void apiRequest<User>('/auth/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((user) => {
        if (!isActive) return;
        setSession((currentSession) => {
          if (!currentSession) return null;
          const updatedSession = { ...currentSession, user };
          saveAuthSession(updatedSession);
          return updatedSession;
        });
      })
      .catch(() => {
        if (!isActive) return;
        clearAuthSession();
        setSession(null);
      });

    return () => {
      isActive = false;
    };
  }, [accessToken]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login', { replace: true });
  };

  return (
    <main className={styles.dashboardPage}>
      <BackgroundContainer>
        <section className={styles.dashboardContent}>
          <FadeIn delay={0}>
            <img className={styles.logo} src={nexisLogo} alt="Nexis AI" />
          </FadeIn>
          <FadeIn delay={120}>
            <p className={styles.eyebrow}>SESSÃO CONECTADA</p>
            <h1>Olá, {session.user.nome}.</h1>
            <p className={styles.description}>
              Seu cadastro e login foram validados com os dados persistidos no PostgreSQL.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <dl className={styles.userCard}>
              <div><dt>E-mail</dt><dd>{session.user.email}</dd></div>
              <div><dt>Perfil</dt><dd>{session.user.perfil}</dd></div>
              <div><dt>Status</dt><dd>{session.user.status}</dd></div>
            </dl>
          </FadeIn>
          <FadeIn delay={360}>
            <DefaultButton text="Sair" onClick={handleLogout} />
          </FadeIn>
        </section>
      </BackgroundContainer>
    </main>
  );
};

export default DashboardPage;
