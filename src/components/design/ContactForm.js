import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  Collapse,
  Alert,
  IconButton,
  AlertTitle,
} from '@mui/material';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import SendIcon from '@mui/icons-material/Send';
import {Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import * as yup from 'yup';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {LoadingButton} from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.invalidEmail' />)
    .required(<IntlMessages id='validation.eamilRequired' />),
  message: yup.string(),
});

const ContactForm = () => {
  const {messages} = useIntl();
  const [open, setOpen] = useState('false');

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const resp = await jwtAxios.post(
        '/website/email_contact_messages',
        values,
      );
      if (resp.status === 200 && resp.data.result) {
        setOpen('success');
      } else {
        setOpen('error');
      }
    } catch (error) {
      setOpen('error');
    }
    setTimeout(function () {
      setOpen('false');
    }, 12000);
    actions.setSubmitting(false);
  };
  return (
    <Card sx={{p: 5, width: {xs: '100%', md: '50%', lg: '40%'}}}>
      <Box sx={{width: '100%', opacity: 1}}>
        {open == 'error' && (
          <Alert severity='error'>
            <AlertTitle>Oops!</AlertTitle>
            Something went wrong! Please try again.
          </Alert>
        )}
        {open == 'success' && (
          <Alert severity='success'>
            <AlertTitle>Thank you for getting in touch!</AlertTitle>
            We appreciate you contacting United Trading Company . One of our
            colleagues will get back in touch with you soon!Have a great time!
          </Alert>
        )}
      </Box>
      <CardContent>
        <Typography
          component='h2'
          sx={{
            textAlign: 'center',
            fontSize: '30px',
            fontWeight: 'bold',
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <IntlMessages id='website.send_message' />
        </Typography>

        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={validationSchema}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          {({values, setFieldValue, isSubmitting, setFieldError, ...rest}) => {
            return (
              <Form>
                <Stack
                  direction={{xs: 'column', md: 'row'}}
                  spacing={5}
                  sx={{my: 5}}
                >
                  <AppTextField
                    placeholder={messages['common.namePlaceholder']}
                    label={<IntlMessages id='common.name' />}
                    name='name'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                  <AppTextField
                    placeholder={messages['common.emailPlaceholder']}
                    label={<IntlMessages id='common.email' />}
                    name='email'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                </Stack>
                <Stack
                  direction={{xs: 'column', md: 'row'}}
                  spacing={5}
                  sx={{my: 5}}
                >
                  <AppTextField
                    multiline
                    rows={4}
                    placeholder={messages['common.messagePlaceholder']}
                    label={<IntlMessages id='common.message' />}
                    name='message'
                    variant='outlined'
                    size='small'
                    sx={{flex: 1}}
                  />
                </Stack>
                <Box sx={{mt: 5}}>
                  <LoadingButton
                    variant='contained'
                    color='primary'
                    type='submit'
                    endIcon={<SendIcon />}
                    loading={isSubmitting}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <IntlMessages id='common.send' />
                  </LoadingButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
