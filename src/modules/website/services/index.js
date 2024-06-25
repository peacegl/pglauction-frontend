import DirectionsBoatFilledIcon from '@mui/icons-material/DirectionsBoatFilled';
import MultipleContentSection from 'components/design/MultipleContentSection';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {green, deepOrange, blue} from '@mui/material/colors';
import IntlMessages from '@crema/utility/IntlMessages';
import Container from '@mui/material/Container';
import {Paper, Typography} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';

const contents = [
  {
    icon: <EmojiEventsIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.firstService' />,
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: (
      <Typography>
        UTC’s affiliate, Peace Global Logistics LLC is a FMC approved shipping
        company which has shipped over 66,000 vehicles shipped from USA to
        worldwide. For more information, please click
        <Link
          href='https://peacegl.com'
          target='_blank'
          style={{
            textDecoration: 'none',
            paddingLeft: 3,
          }}
        >
          here.
        </Link>
      </Typography>
    ),
  },
  {
    icon: <StarIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.secondService' />,
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: (
      <Typography component='p'>
        United Used Cars presents used cars with affordable rate which you can
        check out in
        <Link
          href='/all-vehicles'
          style={{
            textDecoration: 'none',
            paddingLeft: 3,
          }}
        >
          here.
        </Link>
      </Typography>
    ),
  },
  {
    icon: <DirectionsBoatFilledIcon sx={{fontSize: 35}} />,
    title: <IntlMessages id='website.thirdService' />,
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: (
      <Typography component='p'>
        UTC’s affiliate, PGLC Shipping LLC does clearance, land transport and
        has its own unique computer lab for customers to come and bid on cars in
        USA auctions for their convenience. The computer lab is equipped with
        computers, internet and they provide the auction account where you can
        buy your favorite car from USA and PGL will ship it for you! You can
        learn more about them<span></span>
        <Link
          href='https://pglcshipping.com'
          target='_blank'
          style={{
            textDecoration: 'none',
            paddingLeft: 3,
          }}
        >
          in here.
        </Link>
      </Typography>
    ),
  },
];

const index = () => {
  return (
    <Container maxWidth='xl'>
      <Paper sx={{my: 14, py: 1}}>
        <MultipleContentSection
          title={<IntlMessages id='website.services' />}
          contents={contents}
        />
      </Paper>
    </Container>
  );
};

export default index;
