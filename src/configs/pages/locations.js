import {appIntl} from '@crema/utility/helper/Utils';
import {Typography} from '@mui/material';
import * as yup from 'yup';
import {createdAt, createdBy, updatedAt, updatedBy} from 'configs';
import {useEffect, useState} from 'react';
import AppAutoComplete from '@crema/core/AppFormComponents/AppAutoComplete';
import jwtAxios from '@crema/services/auth/jwt-auth';
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);

  const fetchData = async (url, content, loading, setData) => {
    try {
      loading(true);
      const res = await jwtAxios.get(url, {params: content});
      if (res.status === 200 && res.data.result) {
        setData(res.data.data);
      } else {
        setData([]);
      }
      loading(false);
    } catch (error) {
      setData([]);
      loading(false);
    }
  };
  const searchLocations = (content) => {
    fetchData(`/location/auto_complete`, content, setIsLoading, setLocations);
  };

  useEffect(() => {
    searchLocations({});
  }, []);

  return [
    {
      name: 'code',
      label: messages['common.code'],
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <Typography sx={{textTransform: 'uppercase'}} noWrap={'true'}>
            {value}
            {tableMeta.tableData[tableMeta.rowIndex]['key']
              .toString()
              .padStart(5, '0')}
          </Typography>
        ),
      },
    },
    {
      name: 'name',
      label: messages['common.name'],
      options: {
        display: true,
        filterType: 'textField',
        customFilterListOptions: {
          render: (v) => {
            if (v) {
              return `Name: ${v}`;
            }
            return false;
          },
        },
      },
    },
    {
      name: 'slug',
      label: messages['common.slug'],
      options: {
        filter: false,
      },
    },
    {
      name: 'parent_name',
      label: messages['common.parent_name'],
      options: {
        filter: true,
        filterType: 'custom',
        customFilterListOptions: {
          render: (v) => {
            if (v && v.length > 0) {
              return v.map((item) => {
                return `${messages['common.parentName']}: ${item.name}`;
              });
            }
            return false;
          },
        },
        filterOptions: {
          display: (filterList, onChange, index, column) => {
            return (
              <>
                <AppAutoComplete
                  placeholder={messages['common.parentNamePlaceholder']}
                  label={messages['common.parentName']}
                  name='parent_id'
                  variant='standard'
                  size='small'
                  sx={{flex: 1, width: '100%'}}
                  dataLoading={isLoading}
                  options={locations}
                  error={false}
                  returnObject={true}
                  keyName='name'
                  onSearch={searchLocations}
                  value={
                    filterList[index]
                      ? filterList[index].map((item) => item.id)[0]
                      : null
                  }
                  handleChange={({name, value}) => {
                    filterList[index] = value ? [value] : [];
                    onChange(filterList[index], index, column);
                  }}
                />
              </>
            );
          },
        },
      },
    },
    createdBy(),
    createdAt,
    updatedBy(),
    updatedAt,
  ];
};

export default function conifgs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
