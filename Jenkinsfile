pipeline {
  agent any
  stages {
    stage('Test') {
      agent {
        docker { image 'node:latest' }
      }
      steps {
        sh 'npm ci'
        sh 'npm run-script lint'
        sh 'npm run-script test'
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
