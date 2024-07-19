/**
 * @module LocaleSwitcher
 * @group Component
 */
import { useTranslation } from 'react-i18next';
import { supportedLngs } from './config';
import {
  Box,
  BoxProps,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

/**
 * LocaleSwitcher component provides a dropdown menu to switch between supported languages.
 *
 * @param props - Props passed down to the Box component.
 * @returns A React component that renders a language switcher.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import LocaleSwitcher from './LocaleSwitcher';
 *
 * function App() {
 *   return (
 *     <div>
 *       <h1>My Application</h1>
 *       <LocaleSwitcher />
 *     </div>
 *   );
 * }
 *
 * export default App;
 * ```
 */
export default function LocaleSwitcher(props: BoxProps) {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  return (
    <Box
      sx={{ m: 1, width: 200 }}
      {...props}
    >
      <FormControl fullWidth>
        <InputLabel id='language-switcher'>
          {t('dialogs:buttons.language_switcher')}
        </InputLabel>
        <Select
          labelId='language-switcher'
          id='language-switcher'
          label='Language'
          value={i18n.resolvedLanguage}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
        >
          {Object.entries(supportedLngs).map(([code, name]) => (
            <MenuItem
              value={code}
              key={code}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
