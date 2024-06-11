import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import PropTypes from 'prop-types';
import {Box} from '@mui/material';
import {Fonts} from '../../../../shared/constants/AppEnums';
import AppScrollbar from '../../../../@crema/core/AppScrollbar';
import AppList from '../../../../@crema/core/AppList';
import moment from 'moment';

const NewsList = (props) => {
  const {newsData} = props;

  return (
    <AppScrollbar>
      <List>
        <AppList
          data={newsData}
          renderRow={(news) => {
            return (
              <ListItem
                key={news.id}
                className='item-hover'
                sx={{
                  px: 5,
                  minHeight: '70px',
                  display: 'flex',
                  alignItems: 'flex-center',

                  flexDirection: {xs: 'column', sm: 'row'},
                }}
              >
                <ListItemText
                  sx={{
                    flex: '1 1 0',
                  }}
                  primary={
                    <Box
                      component='span'
                      sx={{
                        mb: 1,
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: 14,
                      }}
                    >
                      <Box
                        sx={{
                          color: 'text.secondary',
                        }}
                      >
                        {moment(news.created, 'YYYYMMDD').fromNow()}
                      </Box>
                      <Box
                        sx={{
                          ml: 2,
                          color: 'primary.main',
                        }}
                      >
                        {news.by}
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box
                      component='span'
                      sx={{
                        color: 'text.secondary',
                        fontWeight: Fonts.MEDIUM,
                        fontSize: 14,
                      }}
                    >
                      {news.news}
                    </Box>
                  }
                />
                <Box
                  sx={{
                    ml: {sm: 3, xl: 5},
                    width: {xs: '100%', sm: 'auto'},
                    '& .newsImg': {
                      width: {xs: '100%', sm: '10rem'},
                      display: 'block',
                    },
                  }}
                >
                  <img height={'70px'} src={news.image} alt='Vehicle image' />
                </Box>
              </ListItem>
            );
          }}
        />
      </List>
    </AppScrollbar>
  );
};

export default NewsList;

NewsList.defaultProps = {
  newsData: [],
};

NewsList.propTypes = {
  newsData: PropTypes.array,
};
