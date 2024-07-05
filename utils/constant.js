const CONSTANT = {
  actionType: {},
  ACTION_TYPE: 'ACTION_TYPE',
}

Object.defineProperty(CONSTANT, 'email', {
  value: 'email',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT, 'userID', {
  value: 'userID',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT, 'ACTION_TYPE', {
  value: 'ACTION_TYPE',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT.actionType, 'TASK_CREATE', {
  value: 'TASK_CREATE',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT.actionType, 'TASK_UPDATE', {
  value: 'TASK_UPDATE',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT.actionType, 'TASK_DELETE', {
  value: 'TASK_DELETE',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT.actionType, 'TASK_LIST_ALL', {
  value: 'TASK_LIST_ALL',
  writable: false,
  enumerable: true,
  configurable: true,
})

Object.defineProperty(CONSTANT.actionType, 'TASK_LIST_OWNED', {
  value: 'TASK_LIST_OWNED',
  writable: false,
  enumerable: true,
  configurable: true,
})

module.exports = CONSTANT
