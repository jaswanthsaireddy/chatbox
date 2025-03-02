# Chatbox Application

This is a chatbox application built with React and Vite. It provides real-time messaging capabilities with a minimal setup.

## Features

- Real-time messaging
- Message history
- Responsive design
- View Past conversation
-  Feedback for AI responses

## Technical choices and reasoning.

I chose React with Vite for its fast development experience and optimized build performance, along with Tailwind CSS for efficient styling using utility classes. Express.js powers the backend, providing a lightweight and flexible API structure to handle chat interactions. Redux manages state efficiently, ensuring smooth handling of conversations and feedback.


## Design decisions and justifications
Component based structure
```
APP
    SideBar
    Chat
        FeedbackForm
```

I have taken a single page in which sidebar and chat will render in app and , we can start having conversation with mockAPI and even give the feedback to inidividual message, All the conversations are stored using redux and once user finishes the conversation he can end the converstion ,then a submit feedback form will be displayed upon displaying the conversation will store nuumnerically like "Conversation 1"  and upon clicking the conversation  it will show the messasges exchange between ai response and user ,then upon cliking new conversation ,user can again start a conversation with AI.


## Trade-offs made, features left out, and potential improvements.

yet to be done features are 

toggle between light and dark theme


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
