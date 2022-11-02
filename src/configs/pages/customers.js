import {Avatar, Typography} from '@mui/material';
export default function conifgs() {
  return {
    columns: [
      {
        name: 'profile',
        label: 'Profile',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Avatar alt={' profile picture.'} src={value} />
          ),
        },
      },
      {
        name: 'code',
        label: 'Code',
      },
      {
        name: 'username',
        label: 'Username',
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
        name: 'email',
        label: 'Email',
        options: {
          filter: false,
          customBodyRender: (value, tableMeta, updateValue) => (
            <Typography>
              {value} <br />
              {tableMeta.tableData[tableMeta.rowIndex]['second_email']}
            </Typography>
          ),
        },
      },
      {
        name: 'status',
        label: 'Status',
      },
      {
        name: 'created_by',
        label: 'Created by',
      },
      {
        name: 'updated_by',
        label: 'Updated by',
      },
    ],
  };
}
