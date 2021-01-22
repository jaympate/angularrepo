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
          def customImage = docker.build("082272919318.dkr.ecr.eu-west-3.amazonaws.com/dieter_jordens")
          customImage.push("latest")
        }
      }
    }
  }
}
