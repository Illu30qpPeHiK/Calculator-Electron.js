Electron Calculator

A simple calculator built using Electron.js.

📌 Features

Perform basic mathematical operations (addition, subtraction, multiplication, division)

Simple and minimalist interface

Cross-platform compatibility (Windows, macOS, Linux)

Keyboard shortcuts for quick input

Support for dark and light themes

⌨️ Keyboard Shortcuts

- `0-9`: Enter numbers
- `+`: Addition
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `Enter`: Calculate the result
- `Backspace`: Delete the last entry
- `Esc`: Clear the input
- `(`: Open parenthesis
- `)`: Close parenthesis
- `S`: Provides access to advanced mathematical operations
- `C`: Clear the current input

🛠️ Installation and Running

Clone the repository:

git clone https://github.com/Illu30qpPeHiK/Calculator-Electron.js.git
cd Calculator-Electron.js

Install dependencies:

npm install

Run the application:

npm start

🚀 How It Works

Main Process (main.js): Manages the application window and interaction with the operating system.

Renderer Process (renderer.js): Handles user input and updates the interface.

HTML & CSS (index.html, styles.css): Define the calculator's appearance.

🔧 Building and Packaging

To create an executable file for your OS, use:

npm run build

For Windows, macOS, and Linux, the electron-builder can be configured in package.json.

❓ Support

If you have any questions or find a bug, please create an issue in the repository.

📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


