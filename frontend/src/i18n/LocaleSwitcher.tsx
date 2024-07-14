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
