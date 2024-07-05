const db = require('../../utils/db')

module.exports = class Task {
  constructor(id, taskName, isFinished, userID) {
    this.id = id
    this.taskName = taskName
    this.isFinished = isFinished
    this.userID = userID
  }

  static create(taskName, userID) {
    return db.execute('INSERT INTO task (taskName, userID) VALUES (?, ?)', [
      taskName,
      userID,
    ])
  }

  static updateOne(id, userID, taskName, isFinished) {
    return db.execute(
      `UPDATE task 
      SET taskName = ?, isFinished = ? 
      WHERE task.ID = ? AND task.userID = ?`,
      [taskName, isFinished, id, userID]
    )
  }

  static findOneByColumnName(columnName, value) {
    return db.execute(`SELECT * FROM task WHERE task.${columnName} = ?`, [
      value,
    ])
  }

  static deleteById(id, userID) {
    return db.execute(
      'DELETE FROM task WHERE task.ID = ? AND task.userID = ? LIMIT 1',
      [id, userID]
    )
  }

  static listAll() {
    return db.execute('SELECT * FROM task')
  }
}
