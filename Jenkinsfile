pipeline {
  agent any
  environment {
    DOCKER_TAG = getDockerTag()
  }
  stages {
    stage('Build docker image') {
      steps {
        sh "docker build . -t jsbisht/fastify-server:${DOCKER_TAG}"
      }
    }
    stage('Dockerhub push') {
      steps {
        withCredentials([string(credentialsId: 'docker-hub', variable: 'dockerHubPwd')]) {
          sh "docker login -u jsbisht -p ${dockerHubPwd}"
          sh "docker push jsbisht/fastify-server:${DOCKER_TAG}"
        }
      }
    }
    stage('Deploy to k8s') {
      steps {
        sh 'chmod +x changeTag.sh'
        sh "./changeTag.sh ${DOCKER_TAG}"
        sshagent(['machine-name']) {
          sh 'scp -o StrictHostKeyChecking=no services.yml fastify-server-pods.yml username@<machine-ip>:/path'
          script {
            try {
              sh "ssh  username@<machine-ip> kubectl apply -f ."
            } catch(error){
              sh 'ssh  username@<machine-ip> kubectl create -f .'
            } 
          }
        }
      }
    }
  }
}

def getDockerTag() {
  def tag = sh script: 'git rev-parse HEAD', returnStdout: true
  return tag
}