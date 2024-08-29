import path from 'path';
import fs from 'fs/promises';
import readline from 'readline';
import ansis from 'ansis';

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
        await sortFiles(__dirname);
        console.log(ansis.green('\nDirectory sorted successfully!'));
      } catch (error) {
        console.error(ansis.red(`An error occurred while sorting files: ${error}`));
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
  if (OCDMode) {
    console.log(ansis.yellow('Sorting with OCD Mode...'));
    // OCD Mode implementation can be added here
  }

  const typeMappings: { [key: string]: string } = {
    '.mp3': 'Audio',
    '.wav': 'Audio',
    '.aiff': 'Audio',
    '.au': 'Audio',
    '.pcm': 'Audio',
    '.flac': 'Audio',
    '.ape': 'Audio',
    '.wv': 'Audio',
    '.alac': 'Audio',
    '.m4a': 'Audio',
    '.wma': 'Audio',
    '.opus': 'Audio',
    '.vorbis': 'Audio',
    '.aac': 'Audio',
    '.ogg': 'Audio',

    '.png': 'Images',
    '.jpg': 'Images',
    '.jpeg': 'Images',
    '.jp2': 'Images',
    '.raf': 'Images',
    '.gif': 'Images',
    '.webp': 'Images',
    '.heif': 'Images',
    '.avif': 'Images',
    '.jxl': 'Images',
    '.tiff': 'Images',
    '.bmp': 'Images',
    '.raw': 'Images',
    '.svg': 'Images',
    '.ico': 'Images',

    '.mp4': 'Video',
    '.webm': 'Video',
    '.mov': 'Video',
    '.avi': 'Video',
    '.wmv': 'Video',
    '.flv': 'Video',
    '.mkv': 'Video',
    '.m4v': 'Video',
    '.3gp': 'Video',

    '.doc': 'Documents',
    '.docx': 'Documents',
    '.pdf': 'Documents',
    '.txt': 'Documents',
    '.rtf': 'Documents',
    '.odt': 'Documents',
    '.xls': 'Documents',
    '.xlsx': 'Documents',
    '.csv': 'Documents',
    '.epub': 'Documents',
    '.ppt': 'Documents',
    '.pptx': 'Documents',
    '.md': 'Documents',
    '.ods': 'Documents',
    '.pages': 'Documents',

    '.zip': 'Compressed',
    '.rar': 'Compressed',
    '.7z': 'Compressed',
    '.tar': 'Compressed',
    '.gz': 'Compressed',
    '.bz2': 'Compressed',
    '.tar.gz': 'Compressed',
    '.xz': 'Compressed',

    '.exe': 'Executables',
    '.bat': 'Executables',
    '.sh': 'Executables',
    '.app': 'Executables',
    '.msi': 'Executables',
    '.com': 'Executables',
    '.bin': 'Executables',
    '.jar': 'Executables',

    '.js': 'Web',
    '.jsx': 'Web',
    '.html': 'Web',
    '.xml': 'Web',
    '.json': 'Web',
    '.css': 'Web',
    '.jsonc': 'Web',
    '.php': 'Web',
    '.ts': 'Web',

    '.ttf': 'Fonts',
    '.otf': 'Fonts',
    '.woff': 'Fonts',
    '.woff2': 'Fonts',

    '.dll': 'System',
    '.sys': 'System',
    '.ini': 'System',
    '.log': 'System',
    '.dmp': 'System',
    '.bak': 'System',
  };

  try {
    const files = await fs.readdir(filePath);
    const movePromises = files.map(async (file) => {
      const ext = path.extname(file).toLowerCase();
      const targetDirName = typeMappings[ext];
      if (targetDirName) {
        const targetDir = path.join(filePath, targetDirName);
        await fs.mkdir(targetDir, { recursive: true });
        await fs.rename(path.join(filePath, file), path.join(targetDir, file));
        console.log(ansis.green(`Moved ${file} to ${targetDir}`));
      }
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
