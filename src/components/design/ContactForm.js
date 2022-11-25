import {useIntl} from 'react-intl';
import {Box, Stack, Typography, Grid, Button} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import AppTextField from '@crema/core/AppFormComponents/AppTextField';
import {Form, Formik} from 'formik';
import SendIcon from '@mui/icons-material/Send';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  email: yup
    .string()
    .email(<IntlMessages id='validation.invalidEmail' />)
    .required(<IntlMessages id='validation.eamilRequired' />),
  message: yup
    .string()
    .required(<IntlMessages id='validation.messageRequired' />),
});

const ContactForm = () => {
  const {messages} = useIntl();
  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    actions.setSubmitting(false);
  };
  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        py: 5,
      }}
    >
      <Typography
        component='h2'
        sx={{
          mb: 5,
          textAlign: 'center',
          fontSize: '30px',
          fontWeight: 'bold',
          color: (theme) => theme.palette.primary.main,
        }}
      >
        <IntlMessages id='website.contact_us' />
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
              <Grid
                container
                spacing={4}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Grid item xs={8} sm={6} md={4}>
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
                  <Box sx={{my: 5}}>
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
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default ContactForm;
