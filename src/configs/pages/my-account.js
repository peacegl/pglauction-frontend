import IntlMessages from '@crema/utility/IntlMessages';
const phoneRegExp = CommonConfigs().phoneRegExp;
import {CommonConfigs} from 'configs';
import * as yup from 'yup';

export default function conifgs(invalidPhone, invalidWhatsapp, misMatch) {
  return {
    validationSchema: [
      yup.object({
        fullname: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.fullnameRequired' />),
        phone: yup.string().matches(phoneRegExp, invalidPhone),
        whatsapp: yup.string().matches(phoneRegExp, invalidWhatsapp),
        email: yup
          .string()
          .email(<IntlMessages id='validation.invalidEmail' />)
          .required(<IntlMessages id='validation.eamilRequired' />),
        username: yup
          .string()
          .min(3, <IntlMessages id='validation.min3Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.usernameRequired' />),
      }),
      yup.object({
        current_password: yup
          .string()
          .min(8, <IntlMessages id='validation.min8Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.passwordRequired' />),
        new_password: yup
          .string()
          .min(8, <IntlMessages id='validation.min8Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .required(<IntlMessages id='validation.passwordRequired' />),
        password_confirmation: yup
          .string()
          .min(8, <IntlMessages id='validation.min8Letter' />)
          .max(64, <IntlMessages id='validation.max64Letter' />)
          .oneOf([yup.ref('new_password'), null], misMatch)
          .required(
            <IntlMessages id='validation.passwordConfrimationRequired' />,
          ),
      }),
      yup.object({
        timezone: yup
          .string()
          .required(<IntlMessages id='validation.timezoneRequired' />),
        gender: yup
          .string()
          .required(<IntlMessages id='validation.genderRequired' />),
      }),
    ],
  };
}
