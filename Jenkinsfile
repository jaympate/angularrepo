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
          docker.withRegistry("${ECR_REGISTRY_URL}", "${ECR_CREDENTIALS_ID}") {
            def myImage = docker.build("${ECR_IMAGE_NAME_FRONTEND}")
            myImage.push('latest')
          }
        }
      }
    }
  }
}
