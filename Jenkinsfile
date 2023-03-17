pipeline {
  agent any
  stages {
    stage('checkoutCode') {
      steps {
        git(url: 'https://github.com/sami-nyx/cf-generator-ui', branch: 'master')
      }
    }

  }
}