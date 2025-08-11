output "s3_bucket" {
  description = "The name of the S3 bucket."
  value       = aws_s3_bucket.frontend.id
}

output "cloudfront_id" {
  description = "The ID of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.id
}

output "cloudfront_domain" {
  description = "The domain name of the CloudFront distribution."
  value       = aws_cloudfront_distribution.s3_distribution.domain_name
}

output "ecr_repository_url" {
  description = "The URL of the ECR repository."
  value       = var.enable_ecr ? aws_ecr_repository.app[0].repository_url : ""
}

output "ecr_repository_name" {
  description = "The name of the ECR repository."
  value       = var.enable_ecr ? aws_ecr_repository.app[0].name : ""
}

output "ssm_param_prefix" {
  description = "The prefix for SSM Parameter Store parameters."
  value       = var.ssm_parameter_prefix
}

resource "local_file" "tf_outputs" {
  content = jsonencode({
    s3_bucket           = aws_s3_bucket.frontend.id
    cloudfront_id       = aws_cloudfront_distribution.s3_distribution.id
    cloudfront_domain   = aws_cloudfront_distribution.s3_distribution.domain_name
    ecr_repository_url  = var.enable_ecr ? aws_ecr_repository.app[0].repository_url : ""
    ecr_repository_name = var.enable_ecr ? aws_ecr_repository.app[0].name : ""
    ssm_param_prefix    = var.ssm_parameter_prefix
  })
  filename = "${path.module}/terraform-outputs.json"
}
