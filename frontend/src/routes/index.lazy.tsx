import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const { t } = useTranslation('main', {
    keyPrefix: 'page.nested',
  });

  return (
    <div className='p-2'>
      <h3>{t('header')}</h3>
    </div>
  );
}
