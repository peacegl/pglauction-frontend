import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import Title from '../../../components/design/Title';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { deepPurple } from '@mui/material/colors';
import Department from './Department';
import { Box, Stack } from '@mui/material';

const departments = [
  {
    borderTop: (theme) => `4px solid ${theme.palette.info.main}`,
    title: 'Department',
    details: [
      {
        icon: <EmailIcon sx={{ color: (theme) => theme.palette.info.main }} />,
        content: 'youremail@email.com',
        url: 'mailto:youremail@email.com',
      },
      {
        icon: <EmailIcon sx={{ color: (theme) => theme.palette.info.main }} />,
        content: 'youremail@email.com',
        url: 'mailto:youremail@email.com',
      },
      {
        icon: <WhatsAppIcon sx={{ color: (theme) => theme.palette.info.main }} />,
        content: '+1 000000000000',
        url: 'https://wa.me/+1000000000000',
      },
      {
        icon: <WhatsAppIcon sx={{ color: (theme) => theme.palette.info.main }} />,
        content: '+1 000000000000',
        url: 'https://wa.me/+1000000000000',
      },
      // {
      //   icon: <PersonIcon sx={{color: (theme) => theme.palette.info.main}} />,
      //   content: 'M. Hussain',
      // },
    ],
  },
  {
    borderTop: (theme) => `4px solid ${theme.palette.success.main}`,
    title: 'Sales',
    details: [
      {
        icon: <EmailIcon sx={{ color: (theme) => theme.palette.success.main }} />,
        content: 'support@peaceglobaltech.com',
        url: 'mailto:support@peaceglobaltech.com',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{ color: (theme) => theme.palette.success.main }}
          />
        ),
        content: '+183 27809429',
        url: 'tel:+18327809429',
      },
      {
        icon: (
          <WhatsAppIcon sx={{ color: (theme) => theme.palette.success.main }} />
        ),
        content: '+183 27809429',
        url: 'https://wa.me/+18327809429',
      },
      // {
      //   icon: (
      //     <PersonIcon sx={{color: (theme) => theme.palette.success.main}} />
      //   ),
      //   content: 'Samirullah',
      // },
    ],
  },
];

const Departments = () => {
  return (
    <>
      <Title title={<IntlMessages id='website.contact_us' />} />
      <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {departments.map((department, index) => (
          <Department department={department} key={'depart_' + index} />
        ))}
      </Box>
    </>
  );
};

export default Departments;
