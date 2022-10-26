export default function () {
  return {
    columns: [
      {
        name: 'profile',
        label: 'Profile',
        options: {
          filter: false,
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
        name: 'email',
        label: 'Email',
      },
      {
        name: 'birth_date',
        label: 'Birthday',
      },
      {
        name: 'address',
        label: 'Address',
      },
    ],
  };
}
