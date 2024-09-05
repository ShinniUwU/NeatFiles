import * as path from 'path';
import * as fs from 'fs/promises';
import readline from 'readline';
import ansis from 'ansis';
import {typeMappings} from './typeMappings';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let OCDMode: boolean = false;

function menu() {
  console.log(ansis.cyan('\nMenu'));
  console.log(ansis.green('1. Enter a directory to sort'));
  console.log(ansis.green('2. Sort in current directory'));
  console.log(ansis.green('3. OCD Mode'));
  console.log(ansis.green('4. Wtf is OCD MODE?'));
  console.log(ansis.green('5. Exit'));
}

const handleChoice = async (choice: string) => {
  switch (choice) {
    case '1':
      console.clear();
      sortByDirectory();
      break;
    case '2':
      try {
        await sortFiles(process.cwd());
        console.log(ansis.green('\nDirectory sorted successfully!'));
      } catch (error) {
        console.error(
          ansis.red(`An error occurred while sorting files: ${error}`)
        );
      }
      main();
      break;
    case '3':
      OCDMode = !OCDMode;
      main();
      console.log(
        ansis.cyan(
          `OCD Mode: ${OCDMode ? ansis.green('ON') : ansis.red('OFF')}`
        )
      );
      break;
    case '4':
      console.clear();
      console.log(
        ansis.yellow(
          'Whenever OCD mode is on, the program will work as\n' +
            'usual. The only difference is that it will make separate folders\n' +
            'based on file types and dates.\n\nPress Enter to go Back...'
        )
      );
      rl.once('line', main);
      break;
    case '5':
      process.exit(0);
    default:
      console.log(ansis.red('Invalid choice. Please try again.'));
      main();
  }
};

function sortByDirectory() {
  rl.question(
    ansis.green('Enter directory or press ENTER to go back: '),
    async (choice) => {
      if (choice.trim() === '') {
        main();
        console.log(
          ansis.red(
            "\n\nYou can't press Enter without entering a directory path. Returning to the main menu."
          )
        );
        return;
      }
      const dirPath = path.resolve(choice);

      try {
        const stats = await fs.lstat(dirPath);
        if (stats.isDirectory()) {
          await sortFiles(dirPath);
          console.log(ansis.green('\nDirectory sorted successfully!'));
        } else {
          console.log(ansis.red('The provided path is not a directory.'));
        }
      } catch (error) {
        console.error(
          ansis.red(`An error occurred while sorting files: ${error}`)
        );
      }

      console.log('\nPress Enter to go back to menu...');
      rl.once('line', main);
    }
  );
}

async function sortFiles(filePath: string): Promise<void> {
  try {
    const files = await fs.readdir(filePath);
    const movePromises = files.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const targetDirName = typeMappings[ext];
      let targetDir = filePath;

      if (targetDirName) {
        targetDir = path.join(filePath, targetDirName);
        await fs.mkdir(targetDir, { recursive: true });
      }

      if (OCDMode) {
        console.log(ansis.yellow('Sorting with OCD Mode...'));
        try {
          const stats = await fs.stat(path.join(filePath, file));
          const dateDir = path.join(targetDir, stats.birthtime.toISOString().split('T')[0]);
          await fs.mkdir(dateDir, { recursive: true });
          targetDir = dateDir;
        } catch (error) {
          console.error(ansis.red(`Error getting file stats: ${error}`));
        }
      }

      await fs.rename(path.join(filePath, file), path.join(targetDir, file));
      console.log(ansis.green(`Moved ${file} to ${targetDir}`));
    });

    await Promise.all(movePromises);
  } catch (error) {
    console.error(ansis.red(`An error occurred: ${error}`));
  }
}

function main() {
  console.clear();
  menu();
  rl.question(ansis.cyan('Select an option: '), handleChoice);
}

main();
