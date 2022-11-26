import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HighQualityIcon from '@mui/icons-material/HighQuality';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import {green, deepOrange, blue} from '@mui/material/colors';
import {Box, Divider, Typography} from '@mui/material';
import IntlMessages from '@crema/utility/IntlMessages';
import SectionWIthIcon from './SectionWIthIcon';
import {Stack} from '@mui/system';

function ChooseUsSection() {
  return (
    <Box sx={{my: 14}}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          component='h2'
          sx={{
            fontSize: '30px',
            textAlign: 'center',
            fontWeight: '500',
            textTransform: 'capitalize',
          }}
        >
          <IntlMessages id='website.why_choose_us' />
          <Divider
            sx={{
              my: 4,
              mx: 5,
              backgroundColor: (theme) => theme.palette.primary.main,
              borderRadius: 10,
              height: '4px',
            }}
          />
        </Typography>
      </Box>
      <Stack
        direction={{xs: 'column', md: 'row'}}
        spacing={10}
        sx={{
          mt: 7,
          textAlign: 'center',
        }}
      >
        <SectionWIthIcon
          icon={<EmojiEventsIcon sx={{fontSize: 35}} />}
          title={<IntlMessages id='website.moreThan500Vehicle' />}
          color={deepOrange[500]}
          bgcolor={deepOrange[100]}
          details={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.`}
        />
        <SectionWIthIcon
          icon={<AdminPanelSettingsIcon sx={{fontSize: 35}} />}
          title={<IntlMessages id='website.simple_fast_secure' />}
          color={(theme) => theme.palette.success.main}
          bgcolor={green[100]}
          details={`Lorem Ipsum is simply dummy text of the printing and typesetting industry.`}
        />
        <SectionWIthIcon
          icon={<HighQualityIcon sx={{fontSize: 35}} />}
          title={<IntlMessages id='website.quality' />}
          color={(theme) => theme.palette.info.main}
          bgcolor={blue[100]}
          details={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`}
        />
      </Stack>
    </Box>
  );
}

export default ChooseUsSection;
