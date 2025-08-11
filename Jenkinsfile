pipeline {
    agent any

    environment {
        USE_ECR = "true"
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        BACKEND_PORT = "3001"
        AWS_DEFAULT_REGION = "us-east-1"
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
        timeout(time: 1, unit: 'HOURS')
        timestamps()
        cleanWs()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Plan Infra (Terraform)') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws_role_arn', variable: 'AWS_ROLE_ARN'),
                    string(credentialsId: 'aws_account_id', variable: 'AWS_ACCOUNT_ID')
                ]) {
                    script {
                        sh '''
                            set -e
                            cd infra
                            terraform init
                            terraform plan -out=tfplan
                        '''
                    }
                }
            }
        }

        stage('Manual input "Approve Apply"') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    input message: 'Do you want to apply the Terraform changes?', ok: 'Yes, apply now'
                }
            }
        }

        stage('Apply Infra') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws_role_arn', variable: 'AWS_ROLE_ARN'),
                    string(credentialsId: 'aws_account_id', variable: 'AWS_ACCOUNT_ID')
                ]) {
                    script {
                        sh '''
                            set -e
                            cd infra
                            terraform apply -auto-approve tfplan
                            terraform output -json > ../terraform-outputs.json
                        '''
                    }
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'terraform-outputs.json', followSymlinks: false
                }
            }
        }

        stage('Build Frontend') {
            steps {
                sh 'set -e; bash scripts/build_frontend.sh'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'frontend/dist/**', followSymlinks: false
                }
            }
        }

        stage('Publish Frontend') {
            steps {
                withCredentials([
                    string(credentialsId: 'aws_role_arn', variable: 'AWS_ROLE_ARN'),
                    string(credentialsId: 'aws_account_id', variable: 'AWS_ACCOUNT_ID')
                ]) {
                    script {
                        sh '''
                            set -e
                            # Assume role and sync files
                            # This part would typically use aws sts assume-role and export credentials
                            # For simplicity, we're just calling the aws cli directly, assuming Jenkins IAM role has permissions
                            # A more robust solution would use a shared library or a plugin for AWS auth
                            
                            S3_BUCKET=$(jq -r .s3_bucket.value terraform-outputs.json)
                            CLOUDFRONT_ID=$(jq -r .cloudfront_id.value terraform-outputs.json)

                            echo "Syncing to S3 bucket: ${S3_BUCKET}"
                            aws s3 sync frontend/dist/ s3://${S3_BUCKET} --delete

                            echo "Invalidating CloudFront distribution: ${CLOUDFRONT_ID}"
                            aws cloudfront create-invalidation --distribution-id ${CLOUDFRONT_ID} --paths "/*"
                        '''
                    }
                }
            }
        }

        stage('Build & Push Backend') {
            when {
                expression { env.USE_ECR == 'true' }
            }
            steps {
                 withCredentials([
                    string(credentialsId: 'aws_role_arn', variable: 'AWS_ROLE_ARN'),
                    string(credentialsId: 'aws_account_id', variable: 'AWS_ACCOUNT_ID')
                ]) {
                    script {
                        sh '''
                            set -e
                            ECR_REPO=$(jq -r .ecr_repository_url.value terraform-outputs.json)
                            IMAGE_NAME="${ECR_REPO}:${IMAGE_TAG}"
                            
                            echo "Building and pushing backend image to ${IMAGE_NAME}"
                            bash scripts/build_backend.sh "${IMAGE_NAME}"
                        '''
                    }
                }
            }
        }

        stage('Manual input "Approve Pi Deploy"') {
            steps {
                timeout(time: 15, unit: 'MINUTES') {
                    input message: 'Do you want to deploy the backend to the Raspberry Pi?', ok: 'Yes, deploy now'
                }
            }
        }

        stage('Deploy to Pi (Ansible)') {
            steps {
                withCredentials([
                    sshUserPrivateKey(credentialsId: 'pi_ssh_key', keyFileVariable: 'PI_SSH_KEY_FILE'),
                    string(credentialsId: 'pi_host', variable: 'PI_HOST'),
                    string(credentialsId: 'pi_user', variable: 'PI_USER')
                ]) {
                    script {
                        sh '''
                            set -e
                            echo "Deploying backend to Raspberry Pi..."
                            
                            # Create a temporary inventory file
                            echo "[pi]" > inventory.ini
                            echo "${PI_HOST}" >> inventory.ini

                            ansible-playbook -i inventory.ini ansible/playbook.yml \\
                                --user "${PI_USER}" \\
                                --private-key "${PI_SSH_KEY_FILE}" \\
                                --extra-vars "use_ecr=${USE_ECR} image_tag=${IMAGE_TAG} backend_port=${BACKEND_PORT}"
                        '''
                    }
                }
            }
        }

        stage('Smoke Tests') {
            steps {
                script {
                    sh 'set -e; bash scripts/smoke_test.sh'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
            cleanWs()
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}