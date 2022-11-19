import {appIntl} from '@crema/utility/helper/Utils';
import {FormLabel, Stack, TextField} from '@mui/material';
import AppAutoComplete from '@crema/core/AppFormComponents/AppAutoComplete';
import {DatePicker} from '@mui/x-date-pickers';
import {useEffect, useState} from 'react';
import jwtAxios from '@crema/services/auth/jwt-auth';
import {useSelector} from 'react-redux';
const {messages = []} = appIntl() ? appIntl() : {};
const merge = (a, b, p) =>
  a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b);

export default function CommonConfigs() {
  return {
    phoneRegExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    emailReqExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    youtubeRegExp:
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/,
  };
}

export const createdBy = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const {userAutocompleteOptions} = useSelector(({common}) => common);

  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData((state) =>
          merge(
            options.length > 0 ? options : userAutocompleteOptions,
            res.data.data,
            'id',
          ),
        );
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchUsers = (content) => {
    setInput(content.username);
    fetchData(`/user/auto_complete`, content, setIsLoading, setOptions);
  };
  return {
    name: 'created_by',
    label: messages['common.created_by'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v && v.length > 0) {
            return v.map((item) => {
              return `${messages['common.created_by']}: ${item.username}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <AppAutoComplete
                multiple={true}
                placeholder={messages['common.created_by']}
                label={messages['common.created_by']}
                name='created_by'
                variant='standard'
                size='small'
                sx={{flex: 1, width: '100%'}}
                dataLoading={isLoading}
                options={options.length > 0 ? options : userAutocompleteOptions}
                keyName='username'
                returnObject={true}
                inputValue={input}
                onSearch={searchUsers}
                value={filterList[index].map((item) => item.id) ?? []}
                error={false}
                handleChange={({name, value}) => {
                  setInput('');
                  filterList[index] = value;
                  onChange(filterList[index], index, column);
                }}
              />
            </>
          );
        },
      },
    },
  };
};

export const updatedBy = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const {userAutocompleteOptions} = useSelector(({common}) => common);
  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData((state) =>
          merge(
            options.length > 0 ? options : userAutocompleteOptions,
            res.data.data,
            'id',
          ),
        );
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchUsers = (content) => {
    setInput(content.username);
    fetchData(`/user/auto_complete`, content, setIsLoading, setOptions);
  };
  return {
    name: 'updated_by',
    label: messages['common.updated_by'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v && v.length > 0) {
            return v.map((item) => {
              return `${messages['common.updated_by']}: ${item.username}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <AppAutoComplete
              multiple={true}
              placeholder={messages['common.updated_by']}
              label={messages['common.updated_by']}
              name='updated_by'
              variant='standard'
              size='small'
              sx={{flex: 1, width: '100%'}}
              dataLoading={isLoading}
              options={options.length > 0 ? options : userAutocompleteOptions}
              keyName='username'
              returnObject={true}
              onSearch={searchUsers}
              value={filterList[index].map((item) => item.id) ?? []}
              inputValue={input}
              error={false}
              handleChange={({name, value}) => {
                setInput('');
                filterList[index] = value;
                onChange(filterList[index], index, column);
              }}
            />
          );
        },
      },
    },
  };
};

export const dateColumn = (name, label) => {
  return {
    name: name,
    label: label,
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v[0] && v[1]) {
            return `${label} from: ${v[0]}, To: ${v[1]}`;
          } else if (v[0]) {
            return `${label} from: ${v[0]}`;
          } else if (v[1]) {
            return `${label} To: ${v[1]}`;
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <FormLabel>{label}</FormLabel>
              <Stack direction={{xs: 'column', md: 'row'}} spacing={5}>
                <DatePicker
                  value={filterList[index][0] || null}
                  onChange={(event) => {
                    if (event) {
                      filterList[index][0] =
                        event.getFullYear() +
                        '-' +
                        event.getMonth() +
                        '-' +
                        event.getDate();
                    } else {
                      filterList[index].splice(0, 1);
                    }
                    onChange(filterList[index], index, column);
                  }}
                  label={messages['common.from_date']}
                  renderInput={(params) => {
                    return (
                      <TextField
                        variant='standard'
                        name={name + '_from_date'}
                        size='small'
                        sx={{flex: 1}}
                        {...params}
                        error={false}
                      />
                    );
                  }}
                />
                <DatePicker
                  value={filterList[index][1] || null}
                  onChange={(event) => {
                    if (event) {
                      filterList[index][1] =
                        event.getFullYear() +
                        '-' +
                        event.getMonth() +
                        '-' +
                        event.getDate();
                    } else {
                      filterList[index].splice(1, 1);
                    }
                    onChange(filterList[index], index, column);
                  }}
                  label={messages['common.to_date']}
                  renderInput={(params) => {
                    return (
                      <TextField
                        variant='standard'
                        name={name + '_to_date'}
                        size='small'
                        sx={{flex: 1}}
                        {...params}
                        error={false}
                      />
                    );
                  }}
                />
              </Stack>
            </>
          );
        },
      },
    },
  };
};

export const vehicleVin = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const searchVin = (content) => {
    setInput(content.vin);
    getData(`/vehicle_vins/auto_complete`, content, setIsLoading, setOptions);
  };
  useEffect(() => {
    getData(`/vehicle_vins/auto_complete`, {}, setIsLoading, setOptions);
  }, []);
  return {
    name: 'vin',
    label: messages['common.vin'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v && v.length > 0) {
            return v.map((item) => {
              return `${messages['common.vin']}: ${item.vin}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <AppAutoComplete
                multiple={true}
                placeholder={messages['common.vin']}
                label={messages['common.vin']}
                name='vin'
                variant='standard'
                size='small'
                sx={{flex: 1, width: '100%'}}
                dataLoading={isLoading}
                options={options}
                keyName='vin'
                returnObject={true}
                inputValue={input}
                onSearch={searchVin}
                value={filterList[index].map((item) => item.id) ?? []}
                error={false}
                handleChange={({name, value}) => {
                  setInput('');
                  filterList[index] = value;
                  onChange(filterList[index], index, column);
                }}
              />
            </>
          );
        },
      },
    },
  };
};

export const vehicleLot = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');

  const searchLot = (content) => {
    setInput(content.lot_number);
    getData(`/vehicle_lots/auto_complete`, content, setIsLoading, setOptions);
  };

  useEffect(() => {
    getData(`/vehicle_lots/auto_complete`, {}, setIsLoading, setOptions);
  }, []);
  return {
    name: 'lot_number',
    label: messages['common.lot_number'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v && v.length > 0) {
            return v.map((item) => {
              return `${messages['common.lot_number']}: ${item.lot_number}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <AppAutoComplete
                multiple={true}
                placeholder={messages['common.lot_number']}
                label={messages['common.lot_number']}
                name='lot_number'
                variant='standard'
                size='small'
                sx={{flex: 1, width: '100%'}}
                dataLoading={isLoading}
                options={options}
                keyName='lot_number'
                returnObject={true}
                inputValue={input}
                onSearch={searchLot}
                value={filterList[index].map((item) => item.id) ?? []}
                error={false}
                handleChange={({name, value}) => {
                  setInput('');
                  filterList[index] = value;
                  onChange(filterList[index], index, column);
                }}
              />
            </>
          );
        },
      },
    },
  };
};
export async function getData(url, content, loading, setData) {
  try {
    loading(true);
    const res = await jwtAxios.get(url, {params: content});
    if (res.status === 200 && res.data.result) {
      setData(res.data.data);
    }
    loading(false);
  } catch (error) {
    loading(false);
  }
}

export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type: mime});
}
