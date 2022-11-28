import {
  Link,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import PropTypes from 'prop-types';

const Department = (props) => {
  return (
    <Card
      sx={{
        mb: 5,
        mt: 7,
        mx: 3,
        borderTop: props.department?.borderTop,
        borderRadius: '7px',
        py: 4,
        width: '300px',
        transition: 'all 300ms ease-out',
        '&:hover': {
          transform: 'translateY(-20px)',
        },
      }}
    >
      <CardContent
        sx={{
          py: 2,
          px: 0,
          height: '100%',
        }}
      >
        <Stack sx={{height: '100%'}}>
          <Typography
            component='h2'
            sx={{fontSize: '20px', fontWeight: '500', textAlign: 'center'}}
          >
            {props.department?.title}
          </Typography>
          <Stack spacing={3} sx={{mt: 3, mx: 'auto', height: '100%'}}>
            {props.department?.details?.map((detail, index) => (
              <Stack direction='row' alignItems='center' key={index}>
                <Button
                  variant='raised'
                  href={detail.url}
                  target='_blank'
                  sx={{
                    backgroundColor: 'transparent',
                    color: (theme) => theme.palette.text.primary,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {detail.icon}
                  <Typography
                    component='p'
                    sx={{
                      ml: 5,
                      '&:hover': {
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    {detail.content}
                  </Typography>
                </Button>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default Department;
Department.propTypes = {
  department: PropTypes.any,
};
