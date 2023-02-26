import {alpha, Box, colors, Container, IconButton} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import PropTypes from 'prop-types';

function ItemHeader({title, extra, onBack}) {
  return (
    <Box
      display='flex'
      alignItems='center'
      width='100%'
      position='static'
      zIndex='1'
      sx={{
        my: 5,
        py: 2,
        minHeight: '70px',
        backgroundColor: 'white',
        border: '0',
        borderBottom: '1px',
        borderStyle: 'solid',
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
        color: colors.grey[800],
      }}
    >
      <Container maxWidth='xl'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {onBack && (
              <IconButton color='primary' onClick={onBack} sx={{mr: 1}}>
                <ArrowBack />
              </IconButton>
            )}
            <Box>{title}</Box>
          </Box>
          {extra && <Box>{extra}</Box>}
        </Box>
      </Container>
    </Box>
  );
}

export default ItemHeader;
ItemHeader.propTypes = {
  title: PropTypes.any,
  extra: PropTypes.any,
  onBack: PropTypes.func,
};
