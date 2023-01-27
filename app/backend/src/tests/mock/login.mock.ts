const user = {
  id: 1,
  username: 'Admin',
  role: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

const invalidEmail = {
  email: 'teste@gmail.com',
  password: 'secret_admin',
}

const invalidPassword = {
  email: 'admin@admin.com',
  password: 'invalidP',
}

const validUser = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const noEmail = {
  password: 'secret_admin',
}

const noPassword = {
  email: 'admin@admin.com',
}

export {
  user,
  invalidEmail,
  invalidPassword,
  validUser,
  noEmail,
  noPassword,
};