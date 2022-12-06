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
              title={<IntlMessages id='website.terms&conditions' />}
              justifyContent='start'
            />
            <Box sx={{my: 3}}>
              <Typography sx={{py: 2}}>
                - Advance is not acceptable less then 1000 AED and it&apos;s not
                refundable.
              </Typography>
              <Typography sx={{py: 2}}>
                - Customers must pickup their vehicles within 5 days, otherwise
                if the problem is not from our side, the deal will be canceled
                and the advance payment will not be refunded.
              </Typography>
              <Typography sx={{py: 2}}>
                - Customers must pay all of the vehicle amount before picking it
                up.
              </Typography>
            </Box>
          </Box>
          <Box dir='rtl' sx={{flex: 1}}>
            <Title title='الشروط' justifyContent='start' />
            <Box sx={{my: 3}}>
              <Typography sx={{py: 2}}>
                - السلفة غير مقبولة بأقل من 1000 درهم وهي غير قابلة للاسترداد.
              </Typography>
              <Typography sx={{py: 2}}>
                - يجب على العملاء استلام سياراتهم في غضون 5 أيام ، وإلا إذا لم
                تكن المشكلة من جانبنا ، فسيتم إلغاء الصفقة ولن يتم رد الدفعة
                المقدمة.
              </Typography>
              <Typography sx={{py: 2}}>
                - يجب على العملاء دفع كامل مبلغ السيارة قبل استلامها.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default index;
