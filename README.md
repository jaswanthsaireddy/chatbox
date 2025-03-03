# Chatbox Application

This is a chatbox application built with React and Vite. It provides real-time messaging capabilities with a minimal setup.

## Features

- Real-time messaging
- Message history
- Responsive design
- View Past conversation
-  Feedback for AI responses

## Technical choices and reasoning.

React with Vite for its fast development experience and optimized build performance, along with Tailwind CSS for efficient styling using utility classes. Redux manages state efficiently, ensuring smooth handling of conversations and feedback. Just mock data of AI responses not backend used.


## Design decisions and justifications
Component based Structure with two pages, "/" directing to main Chatpage and "/feedback-overview" page redirecting to feedback page overview page , Rendering Chat.jsx,ChatFeedback.jsx,Sidebar.jsx, In Chat.jsx the conversation happens between user and AI ,once conversation is ended, It will  displayed in the sideBar ,upon clicking the conversation in sidebar ,the history of text will be shown in read mode only and upon clicking the feedback overview button in the bottom of the sidebar we will be redirected to feedBack overview page in which all the past conversations feedback will be shown


## Trade-offs made, features left out, and potential improvements.

# Trade-offs made
Didnt use any backend.
Not used any API for fetching/saving the data

# Features Left out
Italics and bold
Failure left out


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/jaswanthsaireddy/chatbox.git
    ```
2. Navigate to the project directory:
    ```sh
    cd chatbox
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Running the Application

To start the development server with hot module replacement:
```sh
npm run dev
```
or
```sh
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Building for Production

To create a production build:
```sh
npm run build
```
or
```sh
yarn build
```

The output will be in the `dist` directory.



## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
