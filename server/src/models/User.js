const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
      console.log(`hash${hash}`)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    console.log(`PLAIN ${password}`)
    console.log(`this.password ${this.password}`)
    return bcrypt.compareAsync(password, this.password)

    // bcrypt.compare(password, this.password, function (err, res) {
    //   if (err) {
    //     console.error(err)
    //   } else {
    //     console.log(`ressponse ${res}`)
    //     return res
    //   }
    // })

    // bcrypt.compareAsync(password, this.password).then(function (res) {
    //   console.log(`ressponse ${res}`)
    //   console.log('hi')
    //   return res
    // })
  }

  return User
}
