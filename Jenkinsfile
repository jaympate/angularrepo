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

    stage('Build') {
      agent {
        docker { image 'docker:latest' }
      }
      steps {
        sh 'docker build . --tag 082272919318.dkr.ecr.eu-west-3.amazonaws.com/dieter_jordens:latest'
        sh 'docker push 082272919318.dkr.ecr.eu-west-3.amazonaws.com/dieter_jordens:latest'
      }
    }
  }
}
