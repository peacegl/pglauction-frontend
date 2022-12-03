import {Box, Stack, Typography, Button, Card, CardContent} from '@mui/material';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import IntlMessages from '@crema/utility/IntlMessages';
import SendIcon from '@mui/icons-material/Send';
import {Form, Formik} from 'formik';
import {useIntl} from 'react-intl';
import * as yup from 'yup';

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
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    actions.setSubmitting(false);
  };
  return (
    <Card sx={{p: 5, width: {xs: '100%', md: '50%', lg: '40%'}}}>
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
                  <Button
                    sx={{width: '100%'}}
                    loading={isSubmitting}
                    endIcon={<SendIcon />}
                    variant='contained'
                    type='submit'
                  >
                    <IntlMessages id='common.send' />
                  </Button>
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
