pipeline {
  agent any
  stages {
    stage('NPM CI') {
      /*agent {
        docker { image 'node:latest' }
      }*/
      steps {
        sh 'npm ci'
        echo ("NPM CI")
      }
    }
    stage('NPM run') {
      steps {
        sh 'npm run-script lint'
        echo ("NPM run")
      }
    }
    stage ('NPM Test'){
      steps {
        echo ("In NPM Test")    
        sh 'npm run-script test'
      }
    }
  }
}

   /* stage('Deploy') {
      steps {
        script {
          // configure registry
          docker.withRegistry('https://082272919318.dkr.ecr.eu-west-3.amazonaws.com', 'ecr:eu-west-3:aws.dieter.jordens') {
            def myImage = docker.build('dj-website-frontend')
            myImage.push('latest')
          }
        }
      }
    }
  }
}*/
