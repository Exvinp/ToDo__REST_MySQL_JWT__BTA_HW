const db = require('../../utils/db')

module.exports = class User {
  constructor(id, username, email, password) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
  }

  static create(username, email, password) {
    return db.execute(
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    )
  }

  // save() {
  //   return db.execute(
  //     'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
  //     [this.username, this.email, this.password]
  //   )
  // }

  static findOneByColumnName(columnName, value) {
    return db.execute(`SELECT * FROM user WHERE user.${columnName} = ?`, [
      value,
    ])
  }
}
