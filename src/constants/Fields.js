const signupFields = [
  {
    name: 'fullname',
    label: 'Full Name',
    type: 'text',
    placeholder: 'John Doe',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    toggle: true,
  },
  {
    name: 'confirm_password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '••••••••',
    toggle: true,
  },
];
const loginFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'your@email.com',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    toggle: true,
  },
];

export {signupFields , loginFields}
