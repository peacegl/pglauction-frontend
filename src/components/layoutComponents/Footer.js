import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/styles';
import { webPages } from 'configs';
import Link from 'next/link';
import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';

export default function Footer() {
  const theme = useTheme();
  const router = useRouter();

  const title = (title) => (
    <Typography variant='h2' pb='12px'>
      {title}
    </Typography>
  );
  const link = (text, link, target = '_self', key) => (
    <Box marginBottom='10px' key={key}>
      <Link
        href={link}
        target={target}
        style={{
          alignItems: 'center',
          textDecoration: 'none',
          fontSize: '14px',
          color: theme.palette.text.secondary,
        }}
      >
        {text}
      </Link>
    </Box>
  );
  return (
    <Box
      sx={{
        mt: 10,
        backgroundColor: (theme) => theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          py: { xs: 10, sm: 15 },
        }}
      >
        <Container maxWidth='xl'>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent='space-between'
            alignItems={{ xs: 'center', sm: 'start' }}
            color={theme.palette.text.secondary}
          >
            {/* <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: {xs: 'column', sm: 'row'},
                textAlign: 'center',
              }}
            >
              <Box sx={{flex: {md: 3}, mb: 5}}>
                <Box
                  component='img'
                  sx={{
                    width: {xs: '120px', md: '140px', lg: '150px', xl: '160px'},
                  }}
                  alt='united logo'
                  src={logoImage.src}
                />
                <Typography sx={{m: 4, ml: 0}} variant='body1'>
                Ut quis culpa pariatur pariatur consectetur non do exercitation reprehenderit mollit dolor. Dolor culpa mollit amet enim. Anim tempor in nulla voluptate. Dolor eu eu dolor pariatur laborum laboris commodo velit pariatur dolor et commodo aute laborum. Reprehenderit laboris incididunt excepteur aliqua aute mollit laborum excepteur. Occaecat laborum aliquip duis laboris consequat aute.
                </Typography>
              </Box>
            </Box> */}
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                textAlign: 'center',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'start' },
                  mb: 5,
                }}
              >
                {title('Quick Links')}
                {webPages.map((page, index) => {
                  if (page.link) {
                    return link(page.title, page.link, page?.target, index);
                  }
                })}
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: { xs: 'center', sm: 'start' },
                  mb: 5,
                }}
              >
                {title('About Us')}
                {link('About Us', '/contact-us')}
                {title('Support')}
                {link('Support', '/')}
                {link('Terms & Condations', '/terms')}
                {link('Privacy Policy', '/policy')}
              </Box>
              <Box
                sx={{
                  flex: 1.2,
                  textAlign: { xs: 'center', sm: 'start' },
                  mb: 5,
                }}
              >
                {title('Location')}

                <Box
                  marginBottom='10px'
                  display='flex'
                  alignItems='center'
                  sx={{
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  <LocationOnOutlinedIcon />
                  <Typography
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    mx='5px'
                  >
                   Sharjah Industrial Area 2
                   Sharjah-U.A.E.
                  </Typography>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  alignItems='center'
                  sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                >
                  <PhoneOutlinedIcon />
                  <MuiLink
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='tel:+18438138685'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    +971 56 592 9272
                  </MuiLink>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                >
                  <EmailOutlinedIcon />
                  <MuiLink
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='mailto:info@unitedtradingcars.com'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    info@unitedtradingcars.com
                  </MuiLink>
                </Box>
                <Box
                  marginBottom='10px'
                  display='flex'
                  sx={{ justifyContent: { xs: 'center', sm: 'flex-start' } }}
                >
                  <EmailOutlinedIcon />
                  <MuiLink
                    variant='body2'
                    fontSize='14px'
                    underline='none'
                    href='mailto:info@unitedtradingcars.com'
                    mx='5px'
                    color={theme.palette.text.secondary}
                  >
                    info@unitedtradingcars.com
                  </MuiLink>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box>
        <Typography
          color={theme.palette.primary.main}
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            backgroundColor: (theme) => theme.palette.background.paper,
            py: 3,
          }}
        >
          &copy;{new Date().getFullYear()} Your Company Name. All Rights
          Reserved
        </Typography>
      </Box>
    </Box>
  );
}
