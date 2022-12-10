import IntlMessages from '@crema/utility/IntlMessages';
import {Box, Paper, Typography} from '@mui/material';
import Container from '@mui/material/Container';
import Title from 'components/design/Title';

const index = () => {
  return (
    <Container maxWidth='xl'>
      <Paper sx={{my: 14, py: 8, px: 5, mb: 50}}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Box sx={{flex: 1}}>
            <Title
              title={<IntlMessages id='website.privacy_policy' />}
              justifyContent='start'
            />
            <Box sx={{my: 3}}>
              <Typography sx={{py: 2}}>
                We may use the phone number and e-mail address that are given by
                customers to sent transaction-oriented updates and messages
                through Whatsapp, E-mail, and text message. And furtheremore, we
                may use it to send promotional-oriented messages so as to keep
                our customers aware of our inventory or new products that are
                received with us.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default index;
