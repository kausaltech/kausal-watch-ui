// Default form fields for the first city using pledges.
import type { TFunction } from '@/common/i18n';

// In future for scale and customisation across cities, these will be defined on the backend.
export function getDefaultFormFields(t: TFunction) {
  return [
    {
      id: 'zip_code',
      label: t('pledge-form-zip-code'),
      helpText: t('pledge-form-zip-code-help'),
      required: false,
      placeholder: '',
    },
  ];
}
