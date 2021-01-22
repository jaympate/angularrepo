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
          sh('aws ecr get-login-password --region eu-west-3 | docker login --username AWS --password-stdin 082272919318.dkr.ecr.eu-west-3.amazonaws.com')
          docker.withRegistry('https://082272919318.dkr.ecr.eu-west-3.amazonaws.com', 'ecr:eu-west-3:aws.dieter.jordens') {
            docker.image('dieter_jordens').push('latest')
          }
        }
      }
    }
  }
}
