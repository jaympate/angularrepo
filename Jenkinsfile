pipeline {
    agent {
        docker { image 'node:14-alpine' }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'ng run-script test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run-script build'
            }
        }
    }
}
