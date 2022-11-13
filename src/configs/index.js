import {appIntl} from '@crema/utility/helper/Utils';
import {FormLabel, Stack, TextField} from '@mui/material';
import AppAutoComplete from '@crema/core/AppFormComponents/AppAutoComplete';
import {DatePicker} from '@mui/x-date-pickers';
const {messages = []} = appIntl() ? appIntl() : {};

export default function CommonConfigs() {
  return {
    phoneRegExp: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
    emailReqExp: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  };
}

export const createdBy = (function () {
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
              return `${messages['common.created_by']} ${item.name}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          const optionValues = [
            {id: 1, name: 'ALi'},
            {id: 2, name: 'Ahmad'},
            {id: 3, name: 'Jamal'},
            {id: 4, name: 'Hakim'},
          ];
          return (
            <AppAutoComplete
              multiple={true}
              placeholder={messages['common.created_by']}
              label={messages['common.created_by']}
              name='created_by'
              variant='standard'
              size='small'
              sx={{flex: 1, width: '100%'}}
              dataLoading={false}
              options={optionValues}
              keyName='name'
              onSearch={() => {}}
              value={filterList[index].map((item) => item.id)}
              error={false}
              handleChange={({name, value}) => {
                filterList[index] = optionValues.filter((item) => {
                  return value.includes(item.id) ? item.name : false;
                });
                onChange(filterList[index], index, column);
              }}
            />
          );
        },
      },
    },
  };
})();

export const updatedBy = (function () {
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
              return `${messages['common.updated_by']} ${item.name}`;
            });
          }
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          const optionValues = [
            {id: 1, name: 'ALi'},
            {id: 2, name: 'Ahmad'},
            {id: 3, name: 'Jamal'},
            {id: 4, name: 'Hakim'},
          ];
          return (
            <AppAutoComplete
              multiple={true}
              placeholder={messages['common.updated_by']}
              label={messages['common.updated_by']}
              name='updated_by'
              variant='standard'
              size='small'
              sx={{flex: 1, width: '100%'}}
              dataLoading={false}
              options={optionValues}
              keyName='name'
              onSearch={() => {}}
              value={filterList[index].map((item) => item.id)}
              error={false}
              handleChange={({name, value}) => {
                filterList[index] = optionValues.filter((item) => {
                  return value.includes(item.id) ? item.name : false;
                });
                onChange(filterList[index], index, column);
              }}
            />
          );
        },
      },
    },
  };
})();

export const createdAt = (function () {
  return {
    name: 'created_at',
    label: messages['common.created_at'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v[0] && v[1]) {
            return `${messages['common.created_at']} from: ${v[0]}, To: ${v[1]}`;
          } else if (v[0]) {
            return `${messages['common.created_at']} from: ${v[0]}`;
          } else if (v[1]) {
            return `${messages['common.created_at']} To: ${v[1]}`;
          }
          console.log(v);
          v = undefined;
          return false;
        },
        update: (filterList, filterPos, index) => {
          if (filterPos === 0) {
            filterList[index].splice(filterPos, 1, '');
          } else if (filterPos === 1) {
            filterList[index].splice(filterPos, 1);
          } else if (filterPos === -1) {
            filterList[index] = [];
          }
          console.log(filterList);
          return filterList;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <FormLabel>{messages['common.created_at']}</FormLabel>
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
                        name='created_at_from_date'
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
                        name='created_at_to_date'
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
})();
export const updatedAt = (function () {
  return {
    name: 'updated_at',
    label: messages['common.updated_at'],
    options: {
      filter: true,
      display: true,
      filterType: 'custom',
      customFilterListOptions: {
        render: (v) => {
          if (v[0] && v[1]) {
            return `${messages['common.updated_at']} from: ${v[0]}, To: ${v[1]}`;
          } else if (v[0]) {
            return `${messages['common.updated_at']} from: ${v[0]}`;
          } else if (v[1]) {
            return `${messages['common.updated_at']} To: ${v[1]}`;
          }
          console.log(v);
          v = undefined;
          return false;
        },
      },
      filterOptions: {
        fullWidth: true,
        display: (filterList, onChange, index, column) => {
          return (
            <>
              <FormLabel>{messages['common.updated_at']}</FormLabel>
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
                        name='updated_at_from_date'
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
                        name='updated_at_to_date'
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
})();
