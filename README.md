

# NeatFiles

**NeatFiles** is a command-line tool designed to help you organize your files into neat and categorized directories. It can sort files based on their types and formats and offers an OCD Mode for even more meticulous organization.

## Features

- **Directory Sorting:** Organize files within a specific directory or the current working directory.
- **OCD Mode:** Toggle OCD Mode to create separate folders for different file types and dates.
- **Interactive Menu:** A simple command-line interface for easy navigation and operation.

## Usage

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/shinniuwu/NeatFiles.git
    cd NeatFiles
    ```

2. **Install Dependencies:**

    Ensure you have Node.js installed, then run:

    ```bash
    npm install
    ```

3. **Run the Script:**

    Execute the script with Node.js:

    ```bash
    npm start
    ```

4. **Navigate the Menu:**

    - **1. Enter a directory to sort:** Sort files in a user-specified directory.
    - **2. Sort in current directory:** Sort files in the current working directory.
    - **3. OCD Mode:** Toggle OCD Mode on or off.
    - **4. Wtf is OCD MODE?:** Learn more about OCD Mode.
    - **5. Exit:** Close the application.

## OCD Mode

When OCD Mode is enabled, NeatFiles creates additional folders based on the dates. This mode helps maintain a very organized file structure, ideal for those who like everything in its place.

## Code Structure

- **`index.js`**: The main entry point of the application.
- **`path`**: Handles file paths and directories.
- **`fs`**: Manages file system operations.
- **`readline`**: Facilitates user interaction through the command line.
- **`ansis`**: Adds color and style to the terminal output.

## Contributing

Contributions are welcome! If you have suggestions, bug fixes, or improvements, please:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

