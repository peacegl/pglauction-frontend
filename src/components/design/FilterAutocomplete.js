import AppAutoComplete from '@crema/core/AppFormComponents/AppAutoComplete';
import {useEffect, useState} from 'react';
import {Box, Stack} from '@mui/material';
import jwtAxios from '@crema/services/auth/jwt-auth';
import PropTypes from 'prop-types';

const merge = (a, b, p) =>
  a.filter((aa) => !b.find((bb) => aa[p] === bb[p])).concat(b);

async function getData(url, content, loading, setData, options) {
  try {
    loading(true);
    const res = await jwtAxios.get(url, {params: content});
    if (res.status === 200 && res.data.result) {
      setData((state) =>
        options ? merge(options, res.data.data, 'id') : res.data.data,
      );
    }
    loading(false);
  } catch (error) {
    loading(false);
  }
}

export default function FilterAutocomplete({
  url,
  label,
  name,
  keyName,
  values,
  onChange,
  ...rest
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');
  const searchItems = (content) => {
    if (content[keyName]) {
      setInput(content[keyName]);
      getData(url, content, setIsLoading, setOptions, options);
    }
  };

  return (
    <Stack direction='column' spacing={5}>
      <AppAutoComplete
        onFocus={() =>
          options.length == 0
            ? getData(url, {}, setIsLoading, setOptions, options)
            : null
        }
        multiple={true}
        placeholder={label}
        label={label}
        name={name}
        variant='outlined'
        size='small'
        dataLoading={isLoading}
        options={options}
        keyName={keyName}
        inputValue={input}
        onSearch={searchItems}
        value={values ?? []}
        error={false}
        handleChange={({name, value}) => {
          setInput('');
          console.log(name, value);
          onChange(value);
        }}
      />
    </Stack>
  );
}

FilterAutocomplete.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  keyName: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.instanceOf(PropTypes.object, PropTypes.array),
  label: PropTypes.instanceOf(PropTypes.string, PropTypes.node),
  items: PropTypes.instanceOf(PropTypes.string, PropTypes.array),
};
