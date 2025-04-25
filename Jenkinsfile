pipeline {
    agent any

    environment {
        GH_TOKEN = credentials('GH_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/jaswanthsaireddy/chatbox'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to GitHub Pages') {
            steps {
                sh 'git config user.name "jenkins"'
                sh 'git config user.email "jenkins@localhost"'
                sh 'npm set //github.com/:_authToken=$GH_TOKEN'
                sh 'npm run deploy'
            }
        }
    }
}

