variable "aws_region" {
  description = "The AWS region to deploy resources."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "The name of the project."
  type        = string
}

variable "domain_name" {
  description = "The domain name for the CloudFront distribution."
  type        = string
  default     = ""
}

variable "acm_certificate_arn" {
  description = "The ARN of the ACM certificate for the domain."
  type        = string
  default     = ""
}

variable "ssm_parameter_prefix" {
  description = "The prefix for SSM Parameter Store parameters."
  type        = string
}

variable "enable_ecr" {
  description = "A boolean to enable/disable ECR repository creation."
  type        = bool
  default     = false
}

variable "app_secrets" {
  description = "A map of secrets to be stored in SSM Parameter Store."
  type        = map(string)
  default     = {}
}

variable "jenkins_iam_role_arn" {
  description = "The ARN of the Jenkins IAM role."
  type        = string
  default     = ""
}
