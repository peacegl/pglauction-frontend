import {appIntl} from '@crema/utility/helper/Utils';
import * as yup from 'yup';
const {messages = []} = appIntl() ? appIntl() : {};

export const tableColumns = function () {
  return [
    {
      name: 'code',
      label: messages['common.code'],
    },
    {
      name: 'name',
      label: messages['common.name'],
    },
    {
      name: 'slug',
      label: messages['common.slug'],
    },
    {
      name: 'parent_name',
      label: messages['common.parent_name'],
    },
    {
      name: 'created_by',
      label: messages['common.created_by'],
    },
    {
      name: 'updated_by',
      label: messages['common.updated_by'],
    },
    {
      name: 'created_at',
      label: messages['common.created_at'],
    },
    {
      name: 'updated_at',
      label: messages['common.updated_at'],
    },
  ];
};
export const filterContent = [
  {
    title: 'id_filtering',
    items: [
      {
        name: 'locations.id',
        label: 'Code',
        type: 'autocomplete',
        url: '/codes/auto_complete?model=Location',
        keyName: 'code',
      },
      {
        name: 'locations.parent_id',
        label: 'Parent',
        type: 'autocomplete',
        url: '/location/auto_complete',
        keyName: 'name',
      },
      {
        name: 'customers.created_by',
        label: 'Created By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
      {
        name: 'customers.updated_by',
        label: 'Updated By',
        type: 'autocomplete',
        url: '/user/auto_complete',
        keyName: 'username',
      },
    ],
  },
  {
    title: 'date_range',
    items: [
      {
        name: 'customers.created_at',
        label: 'Created At',
        type: 'date_range',
      },
      {
        name: 'customers.updated_at',
        label: 'Updated At',
        type: 'date_range',
      },
    ],
  },
];

export default function conifgs() {
  return {
    exportColumns: [],
    validationSchema: yup.object({
      name: yup.string().required(messages['validation.nameRequired']),
    }),
    insertColumns: ['name', 'parent_id', 'description'],
  };
}
