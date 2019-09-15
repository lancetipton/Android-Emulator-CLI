const { executeCmd } = require('../process')
const { handleError, printHeader } = require('../helpers')

/**
 * Lists all installed android emulators
 * @param {string} taskName - Name of the task to run ( list )
 * @param {Object} task - Metadata for the task to run ( tasks.list )
 * @param {Object} tasks - All tasks that can be run
 *
 * @returns {void}
 */
const listEmulators = async (taskName, task, tasks) => {
  try {

    // Get all installed emulators
    const options = await executeCmd(taskName, task)
    const emulators = options.split('\n').filter(em => em)

    printHeader(`Available Android Emulators:`)

    // Print the emulators one by one
    emulators.map((em, index) => console.log(`  ${index} => ${em}`))
    console.log('')
  }
  catch(e){
    handleError(e)
  }
}

module.exports = {
  name: 'list',
  cmd: 'emulator',
  args: [ '-list-avds' ],
  action: listEmulators,
  description: `List available android emulators`,
}