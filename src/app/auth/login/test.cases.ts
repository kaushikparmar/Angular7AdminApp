export const TestCases = {
  'loginTestCases': [
    {email: 'admin@brainvire.com', password: 'petboox@admin', expect: 200},
    {email: 'Admin@brainvire.com', password: 'petboox@admin', expect: 500},
    {email: 'Admin@brainvire.com', password: 'petboox@admin', expect: 500},
    {email: 'admin@brainwire.com', password: 'petboox@admin', expect: 500},
    {email: 'admin@brainwire.com', password: 'petboox@admin', expect: 500},
    {email: '*',         password: '*',       expect: 401},
    {email: '',          password: 'petboox@admin', expect: 401},
    {email: 'admin@brainvire.com', password: '',        expect: 401},
    {email: '',          password: '',        expect: 401},
    {email: 'temp',          password: '***',        expect: 401},
    {email: 'admin?',          password: '&',        expect: 401}
  ]
};
