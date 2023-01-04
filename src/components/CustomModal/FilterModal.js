import React, {useState} from 'react';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import IntlMessages from '@crema/utility/IntlMessages';
import PropTypes from 'prop-types';
import FilterAutocomplete from 'components/design/FilterAutocomplete';
import FilterCheckbox from 'components/design/FilterCheckbox';
import FilterDateRange from 'components/design/FilterDateRange';
import FilterNumberRange from 'components/design/FilterNumberRange';

const SectionItem = ({title, children, ...reset}) => {
  return (
    <Card
      variant='outlined'
      sx={{
        borderRadius: 1,
        width: '100%',
        maxWidth: '400px',
        height: {sm: '450px'},
        overflow: 'auto',
      }}
      flex={1}
    >
      <CardHeader
        title={
          <Typography sx={{textAlign: 'center'}} variant='h4'>
            {title}
          </Typography>
        }
      />
      <CardContent {...reset}>{children}</CardContent>
    </Card>
  );
};

SectionItem.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default function FilterModal({
  open = false,
  toggleOpen,
  title,
  content,
  initialData,
  updateFilterData,
  ...rest
}) {
  const [filterData, setFilterData] = useState(initialData);

  return (
    <Modal {...rest} open={open} sx={{mx: 2}}>
      <Fade in={open} timeout={50}>
        <Card
          sx={{
            mt: {xs: 2, sm: 8, md: 15},
            borderRadius: 2,
            mx: 'auto',
            maxWidth: {xs: '400px', sm: 340 * content.length + 'px'},
            bgcolor: 'background.paper',
            boxShadow: 24,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label='close'
            onClick={toggleOpen}
            sx={{float: 'right', mt: 1}}
          >
            <CloseIcon sx={{fontSize: 18}} />
          </IconButton>
          <CardHeader
            title={
              <Box display='flex' columnGap={3}>
                <FilterListRoundedIcon />
                <Typography variant='h1'>{title}</Typography>
              </Box>
            }
          />
          <Divider />
          <CardContent
            sx={{
              maxHeight: {xs: '65vh'},
              overflowY: 'auto',
              p: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                columnGap: 3,
                rowGap: 3,
                justifyContent: 'space-around',
                flexDirection: {xs: 'column', sm: 'row'},
              }}
            >
              {content.map((section) => (
                <SectionItem
                  title={<IntlMessages id={'common.' + section.title} />}
                  key={section.title}
                >
                  {section.items.map((item, index) => (
                    <Box mb={5} key={index + 'items'}>
                      {item.type == 'autocomplete' && (
                        <FilterAutocomplete
                          url={item.url}
                          label={item.label}
                          name={item.name}
                          keyName={item.keyName ?? item.name}
                          values={filterData[item.name] ?? []}
                          onChange={(event) => {
                            setFilterData((state) => {
                              return {
                                ...state,
                                [item.name]: event,
                              };
                            });
                          }}
                        />
                      )}
                      {item.type == 'checkbox' && (
                        <FilterCheckbox
                          label={item.label}
                          items={item.items}
                          values={filterData[item.name] ?? []}
                          changeHandler={(checkedItems) => {
                            setFilterData((state) => {
                              return {
                                ...state,
                                [item.name]: checkedItems,
                              };
                            });
                          }}
                        />
                      )}
                      {item.type == 'textfield' && (
                        <Stack sx={{direction: 'column', my: 2}} spacing={3}>
                          <TextField
                            size='small'
                            label={item.label}
                            variant='outlined'
                            value={filterData[item.name] ?? ''}
                            onChange={(event) => {
                              setFilterData((state) => {
                                return {
                                  ...state,
                                  [item.name]: event.target.value,
                                };
                              });
                            }}
                          />
                        </Stack>
                      )}
                      {item.type == 'number_range' && (
                        <FilterNumberRange
                          item={item}
                          values={filterData[item.name] ?? []}
                          changeHandler={(numberRange) => {
                            setFilterData((state) => {
                              return {
                                ...state,
                                [item.name]: numberRange,
                              };
                            });
                          }}
                        />
                      )}
                      {item.type == 'date_range' && (
                        <>
                          <FilterDateRange
                            label={item.label}
                            values={filterData[item.name] ?? []}
                            changeHandler={(dateRange) => {
                              setFilterData((state) => {
                                return {
                                  ...state,
                                  [item.name]: dateRange,
                                };
                              });
                            }}
                          />
                          {section.items.length - 1 != index && (
                            <Divider sx={{my: 4}} />
                          )}
                        </>
                      )}
                    </Box>
                  ))}
                </SectionItem>
              ))}
            </Box>
          </CardContent>
          <Divider />
          <CardActions sx={{justifyContent: 'end', mx: 2}}>
            <Button
              size='small'
              variant='contained'
              onClick={() => {
                updateFilterData(filterData);
                toggleOpen();
              }}
            >
              <IntlMessages id='common.apply' />
            </Button>
            <Button
              size='small'
              variant='contained'
              color='warning'
              onClick={() => {
                setFilterData({});
                updateFilterData({});
              }}
            >
              <IntlMessages id='common.reset' />
            </Button>
            <Button
              size='small'
              variant='outlined'
              color='primary'
              onClick={toggleOpen}
            >
              <IntlMessages id='common.cancel' />
            </Button>
          </CardActions>
        </Card>
      </Fade>
    </Modal>
  );
}

FilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  updateFilterData: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  initialData: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};
