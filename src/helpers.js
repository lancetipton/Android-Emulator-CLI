const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { exec } = require('child_process')
const cmdExec = promisify(exec)
const rootDir = require('app-root-path')

/**
 * Helper to log out CLI message header
 * @param {string} title
 *
 * @returns {void}
 */
const printHeader = title => {
  console.log(``)
  console.log(`------ ${title} ------`)
  console.log(``)
}

/**
 * Prints CLI help message with tasks and their description
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showHelp = tasks => {
  const allTasks = Object.keys(tasks)
  printHeader(`Android emulator CLI Help`)
  console.log(`Available commands: `)
  console.log(``)
  allTasks.map(key => {
    console.log(`  ${key}  =>  ${tasks[key].description}`)
    console.log(``)
  })
  console.log(``)
}

/**
 * Prints CLI unknown command when invalid command is used
 * @param {string} command - Invalid passed in command
 * @param {Object} tasks - All possible CLI tasks to run
 *
 * @returns {void}
 */
const showNoTask = (command, tasks) => {
  console.log(``)
  console.log(`Unknown command => ${command}`)
  console.log(``)

  return showHelp(tasks)
}


/**
 * Helper to print an error
 *
 * @param {Error|Object} err - Error that was thrown
 *
 * @returns {void}
 */
const handleError = err => {
  printHeader(`Emulator Error:`)
  console.log(`  ${err.message}`)
  console.log('')
  process.exit(1)
}

/**
 * Adds listeners to the stdin, to allow capturing input from the user
 *
 * @param {function} cb - function to call when input is received
 *
 * @returns {void}
 */
const handleInput = cb => {
  process.stdin.on('data', cb)
  process.stdin.on('error', cb)
  process.stdin.on('exit', cb)
}

/**
 * Helper to align text when printing to the console
 *
 * @returns {string} - spacer text
 */
const spacer = () => `\n\t   `

module.exports = {
  handleError,
  handleInput,
  printHeader,
  showHelp,
  showNoTask,
  spacer
}