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

//     stage('Deploy') {
//       steps {
//         script {
//           sh 'rm ~/.dockercfg || true'
//           sh 'rm ~/.docker/config.json || true'
//
//           // configure registry
//           docker.withRegistry('https://082272919318.dkr.ecr.eu-west-3.amazonaws.com', 'aws.dieter.jordens') {
//             // build image
//             def customImage = docker.build('dieter_jordens:latest')
//
//             // push image
//             customImage.push()
//           }
//         }
//       }
//     }
  }
}
