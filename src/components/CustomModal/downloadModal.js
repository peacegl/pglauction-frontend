import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import ExcelExportComponent from 'components/exports/exportExcel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IntlMessages from '@crema/utility/IntlMessages';
import ExportPdf from 'components/exports/exportPdf';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import {styled} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {useState, useRef} from 'react';
import {LoadingButton} from '@mui/lab';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import {useIntl} from 'react-intl';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material';
import {useEffect} from 'react';

const ExportSelect = styled('div')(({theme}) => ({
  position: 'absolute',
  right: 2,
  bottom: 10,
  zIndex: 1,
  width: 25,
  height: 25,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.primary.contrastText,
  borderRadius: '50%',
  border: `solid 3px ${theme.palette.primary.contrastText}`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: 14,
  },
}));

const ExportWrapper = styled('div')(({theme}) => ({
  position: 'relative',
  '& .MuiAvatar-root': {
    width: 70,
    height: 70,
    margin: '0 10px 10px 10px',
  },
}));

const ExportInfo = styled('div')(({theme}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  marginBottom: 20,
  [theme.breakpoints.up('xl')]: {
    marginBottom: 30,
  },
}));

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

const DownloadModal = ({
  open = false,
  toggleOpen,
  title,
  onDownloadData,
  setExportType,
  setExportDataAmount,
  exportType,
  filterData,
  exportData,
  columns,
  exportTitle,
  ...rest
}) => {
  const [loading, setLoading] = useState(false);
  const [downloadClick, setDownloadClick] = useState(false);
  const isExportDataEmpty = (objectName) => {
    return JSON.stringify(objectName) === '{}';
  };
  const childRef = useRef();
  const childRefPdf = useRef();
  const {messages} = useIntl();

  useEffect(() => {
    if (downloadClick) {
      onDownload();
      setExportType('pdf');
      setExportDataAmount('current_page');
      setLoading(false);
      setDownloadClick(false);
      toggleOpen();
    }
  }, [downloadClick]);

  const onDownload = () => {
    if (exportType == 'excel') {
      childRef.current.exportExcel();
    } else {
      childRefPdf.current.exportPDF();
    }
    return false;
  };

  return (
    <>
      <Modal {...rest} open={open} sx={{mx: 2}}>
        <Fade in={open} timeout={50}>
          <Card
            sx={{
              mt: {xs: 2, sm: 8, md: 15},
              borderRadius: 2,
              mx: 'auto',
              maxWidth: {
                xs: '400px',
                sm: '350px',
              },
              bgcolor: 'background.paper',
              boxShadow: 24,
              position: 'relative',
            }}
          >
            <IconButton
              aria-label='close'
              onClick={() => {
                setExportDataAmount('current_page');
                setExportType('pdf');
                toggleOpen();
              }}
              sx={{float: 'right', mt: 1}}
            >
              <CloseIcon sx={{fontSize: 18}} />
            </IconButton>
            <CardHeader
              title={
                <Box display='flex' columnGap={3}>
                  <DownloadForOfflineIcon />
                  <Typography variant='h1'>{title}</Typography>
                </Box>
              }
            />
            <Divider />
            <CardContent>
              <Box
                component='p'
                sx={{
                  marginBottom: 2,
                  color: (theme) => theme.palette.info.main,
                }}
              >
                Types of report
              </Box>
              <Box
                component='div'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ExportInfo
                  onClick={() => {
                    setExportType('pdf');
                  }}
                >
                  <ExportWrapper>
                    <Avatar
                      sx={{
                        p: 3,
                        fontSize: {xs: 30, md: 48},
                        height: {xs: 20, md: 30, xl: 40},
                        width: {xs: 20, md: 30, xl: 40},
                        backgroundColor: 'primary',
                        border: `solid 2px`,
                        borderColor:
                          exportType == 'pdf'
                            ? (theme) => theme.palette.success.main
                            : 'transparent',
                      }}
                    >
                      <img alt='Excel' src={'/assets/images/pdf.svg'} />
                    </Avatar>
                    {exportType == 'pdf' ? (
                      <ExportSelect>
                        <CheckCircleIcon />
                      </ExportSelect>
                    ) : (
                      <></>
                    )}
                  </ExportWrapper>
                </ExportInfo>

                <ExportInfo
                  onClick={() => {
                    setExportType('excel');
                  }}
                >
                  <ExportWrapper>
                    <Avatar
                      sx={{
                        p: 3,
                        fontSize: {xs: 30, md: 48},
                        height: {xs: 20, md: 30, xl: 40},
                        width: {xs: 20, md: 30, xl: 40},
                        backgroundColor: 'primary',
                        border: `solid 2px`,
                        borderColor:
                          exportType == 'excel'
                            ? (theme) => theme.palette.success.main
                            : 'transparent',
                      }}
                    >
                      <img alt='Pdf' src={'/assets/images/excel.svg'} />
                    </Avatar>
                    {exportType == 'excel' ? (
                      <ExportSelect>
                        <CheckCircleIcon />
                      </ExportSelect>
                    ) : (
                      <></>
                    )}
                  </ExportWrapper>
                </ExportInfo>
              </Box>

              <Box component='div'>
                <FormControl component='fieldset'>
                  <FormLabel component='legend'>
                    {' '}
                    <IntlMessages id='common.amountOfData' />
                  </FormLabel>
                  <RadioGroup
                    aria-label='amount'
                    defaultValue='current_page'
                    name='radio-buttons-group'
                  >
                    <FormControlLabel
                      value='current_page'
                      control={<Radio />}
                      label={<IntlMessages id='common.currentPage' />}
                      onClick={() => {
                        setExportDataAmount('current_page');
                      }}
                    />

                    {isExportDataEmpty(filterData) ? (
                      <></>
                    ) : (
                      <FormControlLabel
                        value='filtered_data'
                        control={<Radio />}
                        label={<IntlMessages id='common.filteredData' />}
                        onClick={() => {
                          setExportDataAmount('filtered_data');
                        }}
                      />
                    )}

                    <FormControlLabel
                      value='all'
                      control={<Radio />}
                      label={<IntlMessages id='common.allData' />}
                      onClick={() => {
                        setExportDataAmount('all');
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
              {/* <FormControl fullWidth sx={{m: 1}}>
              <InputLabel htmlFor='outlined-adornment-amount'>
                Amount
              </InputLabel>
              <OutlinedInput
                size='small'
                id='outlined-adornment-amount'
                endAdornment={
                  <InputAdornment position='start'>.pdf</InputAdornment>
                }
                label='File name'
              />
            </FormControl> */}
            </CardContent>
            <Divider />
            <CardActions sx={{justifyContent: 'end', mx: 2}}>
              <Button
                size='small'
                variant='outlined'
                color='primary'
                onClick={() => {
                  setExportDataAmount('current_page');
                  setExportType('pdf');
                  toggleOpen();
                }}
              >
                <IntlMessages id='common.cancel' />
              </Button>

              <LoadingButton
                size='small'
                loading={loading}
                loadingPosition='start'
                startIcon={<DownloadForOfflineIcon />}
                variant='contained'
                onClick={async () => {
                  setLoading(true);
                  await onDownloadData();
                  setDownloadClick(true);
                }}
              >
                <IntlMessages id='common.download' />
              </LoadingButton>
            </CardActions>
          </Card>
        </Fade>
      </Modal>

      <ExcelExportComponent
        ref={childRef}
        data={exportData}
        columns={columns}
        title={messages[exportTitle?.props?.id]}
      />
      <ExportPdf
        ref={childRefPdf}
        data={exportData}
        columns={columns}
        titlePdf={messages[exportTitle?.props?.id] ?? 'no_name'}
      />
    </>
  );
};

DownloadModal.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDownloadData: PropTypes.func,
  setExportType: PropTypes.func,
  setExportDataAmount: PropTypes.func,
  exportType: PropTypes.string,
  filterData: PropTypes.any,
  exportData: PropTypes.array,
  exportType: PropTypes.string,
  columns: PropTypes.array.isRequired,
  exportTitle: PropTypes.any,
};

export default DownloadModal;
