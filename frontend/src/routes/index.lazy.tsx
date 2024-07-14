import { createLazyFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import {
  createLocalLanguageBundle,
  useLocalLanguageBundle,
} from '../i18n/languageBundle';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

const languageBundle = createLocalLanguageBundle({
  de: {
    p1: 'P1 von lokalem Sprachpaket auf Deutsch',
    p2: { title: 'P2 Titel', description: 'Beschreibung für p2.' },
  },
  en: {
    p1: 'P1 for local language package in english',
    p2: { title: 'P2 title', description: 'Description for p2.' },
  },
});

function Index() {
  const messages = useLocalLanguageBundle(languageBundle);

  const { t } = useTranslation('main', {
    keyPrefix: 'page.nested',
  });

  return (
    <div className='p-2'>
      <h3>{t('header')}</h3>
      <div>
        <h5>{messages.p1}</h5>
      </div>
      <div>
        <h5>{messages.p2.title}</h5>
        <p>{messages.p2.description}</p>
      </div>
    </div>
  );
}
