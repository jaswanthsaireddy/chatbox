pipeline {
    agent any

    environment {
        GH_TOKEN = credentials('GH_TOKEN')
    }

    stages {

        stage('Checkout') {
            steps {
                git url: 'https://github.com/jaswanthsaireddy/chatbox.git', branch: 'master'
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
                sh 'git remote set-url origin https://${GH_TOKEN}@github.com/jaswanthsaireddy/chatbox.git'
                sh 'npm run deploy'
            }
        }
    }
}

