import {Avatar, Typography} from '@mui/material';

export default function conifgs() {
  return {
    columns: [
      {
        name: 'profile',
        label: 'Profile',
        options: {
          filter: false,
          download: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Avatar alt={' profile picture.'} src={value} />
          ),
        },
      },
      {
        name: 'code',
        label: 'Code',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography sx={{textTransform: 'uppercase'}} noWrap={true}>
              {value}
              {tableMeta.tableData[tableMeta.rowIndex]['key']}
            </Typography>
          ),
        },
      },
      {
        name: 'login',
        label: 'Username',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => value.username,
        },
      },
      {
        name: 'firstname',
        label: 'First Name',
      },
      {
        name: 'lastname',
        label: 'Last Name',
      },
      {
        name: 'phone',
        label: 'Phone Number',
      },
      {
        name: 'whatsapp',
        label: 'WhatsApp',
      },
      {
        name: 'gender',
        label: 'Gender',
      },
      {
        name: 'login',
        label: 'Email',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography>
              {value.email} <br />
              {tableMeta.tableData[tableMeta.rowIndex]['second_email']}
            </Typography>
          ),
        },
      },
      {
        name: 'login',
        label: 'Status',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => value.status,
        },
      },
      {
        name: 'birth_date',
        label: 'Birthday',
        options: {
          display: 'false',
        },
      },
      {
        name: 'address',
        label: 'Address',
        options: {
          display: 'false',
        },
      },
      {
        name: 'created_by',
        label: 'Created by',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
      },
      {
        name: 'updated_by',
        label: 'Updated by',
        options: {
          customBodyRender: (value, tableMeta, updateValue) => value?.username,
        },
      },
    ],
  };
}
