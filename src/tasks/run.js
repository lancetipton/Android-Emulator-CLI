const { handleError, handleInput, printHeader, spacer } = require('../helpers')
const { executeCmd } = require('../process')

/**
 * Runs the passed in emulator
 * @param {Object} task - CLI run task
 * @param {string} emulator - emulator to run
 *
 * @returns {string} - response from the run command
 */
const executeRunCmd = async (task, emulator) => {
  try {
    // Print message about which emulator is being used
    console.log(``)
    console.log(`Using emulator => ${emulator}`)
    console.log(``)

    // Await the response, so we don't exit right away
    const response = await executeCmd(`run`, { cmd: task.cmd, args: task.args.concat([`@${emulator}`]) })

    // Print message about quiting the emulator
    printHeader(`Quit Emulator`)
    response && console.log(response)

    // Kill the process on exit
    process.exit(0)
  }
  catch(e){
    handleError(e)
  }
}

/**
 * Runs the selected android emulator
 * @param {string} taskName - Name of the task to run ( run )
 * @param {Object} task - Metadata for the task to run ( tasks.run )
 * @param {Object} tasks - All tasks that can be run
 *
 * @returns {void}
 */
const runEmulator = async (taskName, task, tasks) => {
  try {
    const options = await executeCmd('list', tasks.list)
    const emulators = options.split('\n').filter(em => em)

    if(emulators.length === 0)
      throw new Error(`No android emulators available!`)
    
    // If there's only 1 emulator; just run it
    if(emulators.length === 1)
      return executeRunCmd(task, emulator)

    printHeader(`Select Emulator:`)
    emulators.map((em, index) => console.log(`  ${index} => ${em}`))
    console.log(``)

    // Listen for input from the user
    handleInput(toUSe => {
      // Get the selected emulator
      const emulator = emulators[parseInt(toUSe.toString())]
      // Ensure an emulator was selected
      emulator
        ? executeRunCmd(task, emulator)
        : handleError(new Error(`Not a valid choice. Choice must be a number!`))
    })
  }
  catch(e){
    handleError(e)
  }
}

module.exports = {
  name: 'run',
  cmd: 'emulator',
  args: [],
  action: runEmulator,
  description: `Run an android emulator.${spacer()}Make sure your Android SDK paths are correct before using this command.${spacer()}See this blog:${spacer()}https://www.stkent.com/2017/08/10/update-your-path-for-the-new-android-emulator-location.html`,
}