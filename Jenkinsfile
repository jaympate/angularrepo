pipeline {
  agent {
    docker { image 'node:latest' }
  }
  stages {
    stage('Install') {
      steps { sh 'npm ci' }
    }

    stage('Test') {
      parallel {
        stage('Static code analysis') {
            steps { sh 'npm run-script lint' }
        }
        stage('Unit tests') {
            steps { sh 'npm run-script test' }
        }
      }
    }

    stage('Deploy') {
      steps {
        script {
          // configure registry
          docker.withRegistry('https://082272919318.dkr.ecr.eu-west-3.amazonaws.com', 'ecr:eu-west-3:AKIARGJ6ZD4LC4WIWRUW') {
            // build image
            def customImage = docker.build('dieter_jordens')

            // push image
            customImage.push('latest')
          }
        }
      }
    }
  }
}
