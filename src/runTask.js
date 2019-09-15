const { handleError, showHelp, showNoTask } = require('./helpers')
const Tasks = require('./tasks')

/**
 * Runs a Android Emulator CLI command
 *
 * @returns {void}
 */
module.exports = async () => {
  try {
    const [ command, ...options ] = process.argv.slice(2);
    // Ensure a command exists
    if(!command) return showHelp(Tasks)
    
    // Get the task from avalible tasks
    const task = Tasks[command]

    // Ensure a task exists
    const output = !task
      ? showNoTask(command, Tasks)
      : await task.action(command, task, Tasks)

    output && console.log(output)

  }
  catch(e){
    handleError(e)
  }
}


