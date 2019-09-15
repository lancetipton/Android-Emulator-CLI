# Android Emulator CLI
A small utility library to run an Android Emulator

### Setup

* Download the repo

  * Add to your path
  ```bash
    // Clone repo
    git clone https://github.com/lancetipton/Android-Emulator-CLI.git
    export PATH="<path/to/repo/andE>$PATH"
    // Then from your command line
    endE run
  ```

  * Or add to package.json or your project
  ```json
    {
      "scripts": {
        "emulator": "node_modules/andE/andE run",
      },
      "dependencies": {
        "andE": "git+https://github.com/lancetipton/Android-Emulator-CLI.git",
      },
    }
  ```