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
        url: 'mailto:dispatch@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon sx={{color: (theme) => theme.palette.info.main}} />
        ),
        content: '+1 (912) 228-8160',
        url: 'tel:+19122288160',
      },
      {
        icon: (
          <PhoneEnabledIcon sx={{color: (theme) => theme.palette.info.main}} />
        ),
        content: '+1 (912) 239-5184',
        url: 'tel:+19122395184',
      },
      {
        icon: <WhatsAppIcon sx={{color: (theme) => theme.palette.info.main}} />,
        content: '+1 (912) 239-5182',
        url: 'https://wa.me/+19122395182',
      },
      {
        icon: <WhatsAppIcon sx={{color: (theme) => theme.palette.info.main}} />,
        content: '+1 (912) 239-5184 ',
        url: 'https://wa.me/+19122395184 ',
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
        content: 'accounting@peacegl.com',
        url: 'mailto:accounting@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{color: (theme) => theme.palette.success.main}}
          />
        ),
        content: '+1 (912) 376-1405',
        url: 'tel:+19123761405',
      },
      {
        icon: (
          <WhatsAppIcon sx={{color: (theme) => theme.palette.success.main}} />
        ),
        content: '+1 (912) 376-1405',
        url: 'https://wa.me/+19123761405',
      },
      {
        icon: (
          <PersonIcon sx={{color: (theme) => theme.palette.success.main}} />
        ),
        content: 'Samirullah',
      },
    ],
  },
  {
    borderTop: `4px solid ${deepPurple[400]}`,
    title: 'Title Department',
    details: [
      {
        icon: <EmailIcon sx={{color: deepPurple[400]}} />,
        content: 'title@peacegl.com',
        url: 'mailto:title@peacegl.com',
      },
      {
        icon: <PhoneEnabledIcon sx={{color: deepPurple[400]}} />,
        content: '+1 (912) 228-8160',
        url: 'tel:+19122288160',
      },
      {
        icon: <WhatsAppIcon sx={{color: deepPurple[400]}} />,
        content: '+1 (912) 376-0020',
        url: 'https://wa.me/+19123760020',
      },
      {
        icon: <PersonIcon sx={{color: deepPurple[400]}} />,
        content: 'M. Faisal',
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
        content: 'docs@peacegl.com',
        url: 'mailto:docs@peacegl.com',
      },
      {
        icon: (
          <PhoneEnabledIcon
            sx={{color: (theme) => theme.palette.secondary.dark}}
          />
        ),
        content: '+1 (912) 239-5160',
        url: 'tel:+19122395160',
      },
      {
        icon: (
          <WhatsAppIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: '+1 (912) 376-1024',
        url: 'https://wa.me/+19123761024',
      },
      {
        icon: (
          <WhatsAppIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: '+1 (912) 376-1021',
        url: 'https://wa.me/+19123761021',
      },
      {
        icon: (
          <PersonIcon sx={{color: (theme) => theme.palette.secondary.dark}} />
        ),
        content: 'M. Haris',
      },
    ],
  },
];

const Departments = () => {
  return (
    <>
      <Title title={<IntlMessages id='website.contact_us' />} />
      <Box sx={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
        {departments.map((department, index) => (
          <Department department={department} key={index} />
        ))}
      </Box>
    </>
  );
};

export default Departments;
