import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import IntlMessages from '@crema/utility/IntlMessages';
import Title from '../../../components/design/Title';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import {deepPurple} from '@mui/material/colors';
import Department from './Department';
import {Box, Stack} from '@mui/material';

const departments = [
  {
    borderTop: (theme) => `4px solid ${theme.palette.info.main}`,
    title: 'Dispatch Department',
    details: [
      {
        icon: <EmailIcon sx={{color: (theme) => theme.palette.info.main}} />,
        content: 'dispatch@peacegl.com',
        url: 'mailto:samim.hamza@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon sx={{color: (theme) => theme.palette.info.main}} />
        ),
        content: '+1 (912) 228 8160',
        url: 'tel:+93749740202',
      },
      {
        icon: <WhatsAppIcon sx={{color: (theme) => theme.palette.info.main}} />,
        content: '+1 (912) 228 8160',
        url: 'https://wa.me/+93749740202',
      },
      {
        icon: <PersonIcon sx={{color: (theme) => theme.palette.info.main}} />,
        content: 'M. Hussain',
      },
    ],
  },
  {
    borderTop: (theme) => `4px solid ${theme.palette.success.main}`,
    title: 'Finance / Accounting Department',
    details: [
      {
        icon: <EmailIcon sx={{color: (theme) => theme.palette.success.main}} />,
        content: 'dispatch@peacegl.com',
        url: 'mailto:samim.hamza@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{color: (theme) => theme.palette.success.main}}
          />
        ),
        content: '+1 (912) 228 8160',
        url: 'tel:+93749740202',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{color: (theme) => theme.palette.success.main}}
          />
        ),
        content: '+1 (912) 228 8160',
        url: 'tel:+93749740202',
      },
      {
        icon: (
          <WhatsAppIcon sx={{color: (theme) => theme.palette.success.main}} />
        ),
        content: '+1 (912) 228 8160',
        url: 'https://wa.me/+93749740202',
      },
      {
        icon: (
          <PersonIcon sx={{color: (theme) => theme.palette.success.main}} />
        ),
        content: 'M. Hussain',
      },
    ],
  },
  {
    borderTop: `4px solid ${deepPurple[400]}`,
    title: 'Title Department',
    details: [
      {
        icon: <EmailIcon sx={{color: deepPurple[400]}} />,
        content: 'dispatch@peacegl.com',
        url: 'mailto:samim.hamza@peacegl.com',
      },
      {
        icon: <PhoneEnabledIcon sx={{color: deepPurple[400]}} />,
        content: '+1 (912) 228 8160',
        url: 'tel:+93749740202',
      },
      {
        icon: <WhatsAppIcon sx={{color: deepPurple[400]}} />,
        content: '+1 (912) 228 8160',
        url: 'https://wa.me/+93749740202',
      },
      {
        icon: <PersonIcon sx={{color: deepPurple[400]}} />,
        content: 'M. Hussain',
      },
    ],
  },
  {
    borderTop: (theme) => `4px solid ${theme.palette.secondary.dark}`,
    title: 'Loading Department',
    details: [
      {
        icon: (
          <EmailIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: 'dispatch@peacegl.com',
        url: 'mailto:samim.hamza@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{color: (theme) => theme.palette.secondary.dark}}
          />
        ),
        content: '+1 (912) 228 8160',
        url: 'tel:+93749740202',
      },
      {
        icon: (
          <WhatsAppIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: '+1 (912) 228 8160',
        url: 'https://wa.me/+93749740202',
      },
      {
        icon: (
          <PersonIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: 'M. Hussain',
      },
    ],
  },
];

const Departments = () => {
  return (
    <>
      <Title title={<IntlMessages id='website.contact_us' />} />
      <Stack
        direction='row'
        spacing={7}
        alignItems='stretch'
        justifyContent='center'
        sx={{
          mt: 7,
          textAlign: 'center',
          flexWrap: 'wrap',
        }}
      >
        {departments.map((department, index) => (
          <Department department={department} key={index} />
        ))}
      </Stack>
    </>
  );
};

export default Departments;
