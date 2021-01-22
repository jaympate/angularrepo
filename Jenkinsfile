pipeline {
  agent any
  stages {
    stage('Install') {
      agent {
        docker { image 'node:latest' }
      }
      steps { sh 'npm ci' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
          agent {
            docker { image 'node:latest' }
          }
          steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
          agent {
            docker { image 'node:latest' }
          }
          steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          // configure registry
          docker.withRegistry('https://082272919318.dkr.ecr.eu-west-3.amazonaws.com', 'ecr:eu-west-3:aws.dieter.jordens') {
            def myImage = docker.build('dieter_jordens')
            myImage.push('latest')
          }
        }
      }
    }
  }
}
