const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Task = require('../models/task')

exports.signup = async (req, res, next) => {
  /**
   * Purpose: this fn is registering the new user
   * @param username
   * @param email
   * @param password
   * *returns: userId => the newly created user's ID
   */

  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.')
      error.statusCode = 422
      error.data = errors.array()
      throw error
    }

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const hashedPw = await bcrypt.hash(password, 12)

    const result = await User.create(username, email, hashedPw)
    res.status(201).json({ message: 'User created!', resultMsg: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.login = async (req, res, next) => {
  /**
   * Purpose: this fn is returning the JWT token
   * @param email
   * @param password
   * *returns: token => This return value will hold the JWT which we have to send at every request
   * *returns: userId => The logged in user's ID  (req.userId)
   */

  try {
    const email = req.body.email.toLowerCase()
    const password = req.body.password
    let user = await User.findOneByColumnName(CONSTANT.email, email)

    if (!user[0][0]) {
      const error = new Error('A user with this email could not be found.')
      error.statusCode = 401
      throw error
    } else {
      user = user[0][0]
    }
    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      const error = new Error('Wrong password!')
      error.statusCode = 401
      throw error
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user.ID.toString(),
      },
      'somesupersecretsecret',
      { expiresIn: '365d' }
    )
    res.status(201).json({ token: token, userId: user.ID.toString() })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.dispatcher = async (req, res, next) => {
  /**
   * Purpose: this fn is just calling the relevant fn by the ACTION_TYPE
   * @param token the JWT token which is authenticating the user (must be in the authorization header)
   * @param ACTION_TYPE this arg decides which fn will be called
   * @param _OTHERS_ several other params can come, observe the relevant called function's description instead
   * *returns: executes the relevant ACTION_TYPE function
   */

  try {
    const ACTION_TYPE = req.body.ACTION_TYPE

    switch (ACTION_TYPE) {
      case CONSTANT.actionType.TASK_CREATE:
        return taskCreate(req, res, next)

      case CONSTANT.actionType.TASK_LIST_ALL:
        return taskListAll(req, res, next)

      case CONSTANT.actionType.TASK_LIST_OWNED:
        return taskListOwned(req, res, next)

      case CONSTANT.actionType.TASK_DELETE:
        return taskDeleteOne(req, res, next)

      case CONSTANT.actionType.TASK_UPDATE:
        return taskUpdateOne(req, res, next)

      default:
        const error = new Error('No ACTION_TYPE was recognised.')
        error.statusCode = 401
        throw error
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

const taskCreate = async (req, res, next) => {
  /**
   * Purpose: this fn is creating a new ToDo Task
   * @param payload.taskName The task itself
   */

  try {
    const result = await Task.create(req.body.payload.taskName, req.userId)
    res.status(201).json({ message: 'Task is created!', resultMsg: result })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

const taskListAll = async (req, res, next) => {
  /**
   * Purpose: this fn is listing all the ToDo Task
   */

  try {
    const result = await Task.listAll()
    res.status(201).json({ message: 'Tasks are listed!', resultMsg: result[0] })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

const taskListOwned = async (req, res, next) => {
  /**
   * Purpose: this fn is listing all the owned ToDo Task
   */

  try {
    const result = await Task.findOneByColumnName(CONSTANT.userID, req.userId)
    res.status(201).json({ message: 'Tasks are listed!', resultMsg: result[0] })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

const taskUpdateOne = async (req, res, next) => {
  /**
   * Purpose: this fn is updating a single ToDo Task
   * @param payload.ID The task ID
   * @param payload.taskName The task name
   * @param payload.isFinished Is the task already completed property
   * *returns: json => returns with the result of the operation
   */

  try {
    const result = await Task.updateOne(
      req.body.payload.ID,
      req.userId,
      req.body.payload.taskName,
      req.body.payload.isFinished
    )
    res.status(201).json({ message: 'Tasks is updated!', resultMsg: result[0] })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

const taskDeleteOne = async (req, res, next) => {
  /**
   * Purpose: this fn is deleting a single ToDo Task
   * @param payload.ID The task ID
   * *returns: json => returns with the result of the operation
   */

  try {
    const result = await Task.deleteById(req.body.payload.ID, req.userId)
    res.status(201).json({ message: 'Tasks is deleted!', resultMsg: result[0] })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
