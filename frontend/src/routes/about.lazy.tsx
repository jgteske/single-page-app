import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/about')({
  component: About,
});

function About() {
  const { t } = useTranslation();
  return (
    <div className='p-2'>
      <h3>{t('main:page.about.title')}</h3>
      <p>{t('main:page.about.description')}</p>
    </div>
  );
}
