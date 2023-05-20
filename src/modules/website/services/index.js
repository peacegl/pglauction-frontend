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
    // title: <IntlMessages id='website.firstService' />,
    title: 'Services',
    color: deepOrange[500],
    bgcolor: deepOrange[100],
    details: (
      <Typography>
        Veniam nisi cupidatat qui occaecat laboris laborum officia nisi ex sint
        cupidatat do. Nisi eu mollit culpa aliquip in reprehenderit tempor elit
        sint. Qui do quis dolore dolore. Ad eu nostrud reprehenderit ad laborum
        occaecat esse ad minim id. Aute mollit duis duis eiusmod velit officia
        non proident incididunt. Ad sit nisi commodo velit anim enim officia id.
        Veniam commodo culpa labore quis exercitation qui Lorem.
      </Typography>
    ),
  },
  {
    icon: <StarIcon sx={{fontSize: 35}} />,
    // title: <IntlMessages id='website.secondService' />,
    title: 'Services',
    color: (theme) => theme.palette.success.main,
    bgcolor: green[100],
    details: (
      <Typography component='p'>
        Excepteur quis non veniam ex fugiat ea minim. Anim voluptate aliqua anim
        ipsum et sunt esse sint cupidatat tempor aliquip nostrud. Reprehenderit
        eu dolore qui ullamco culpa pariatur. Ex non mollit do eiusmod est nisi
        sunt aliquip culpa cillum.
      </Typography>
    ),
  },
  {
    icon: <DirectionsBoatFilledIcon sx={{fontSize: 35}} />,
    // title: <IntlMessages id='website.thirdService' />,
    title: 'Services',
    color: (theme) => theme.palette.info.main,
    bgcolor: blue[100],
    details: (
      <Typography component='p'>
        In amet mollit voluptate amet. Pariatur mollit incididunt occaecat
        voluptate in. Sunt fugiat eu Lorem cillum nulla anim excepteur voluptate
        commodo et nulla veniam. Eiusmod proident nostrud anim sint exercitation
        labore incididunt nulla in commodo laboris eiusmod. Sint ullamco esse et
        nostrud et esse fugiat proident.
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
