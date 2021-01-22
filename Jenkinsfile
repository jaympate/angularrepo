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
            // build image
            def customImage = docker.build('dieter_jordens')

            // push image
            customImage.push('latest')
        }
      }
    }
  }
}
