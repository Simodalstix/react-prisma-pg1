output "s3_bucket_name" {
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

output "ecr_repo_url" {
  description = "The URL of the ECR repository."
  value       = var.ecr_repository_name != "" ? aws_ecr_repository.app[0].repository_url : ""
}

output "ssm_parameter_prefix" {
  description = "The prefix for SSM Parameter Store parameters."
  value       = var.ssm_parameter_prefix
}

resource "local_file" "tf_outputs" {
  content = jsonencode({
    s3_bucket_name       = aws_s3_bucket.frontend.id
    cloudfront_id        = aws_cloudfront_distribution.s3_distribution.id
    cloudfront_domain    = aws_cloudfront_distribution.s3_distribution.domain_name
    ecr_repo_url         = var.ecr_repository_name != "" ? aws_ecr_repository.app[0].repository_url : ""
    ssm_parameter_prefix = var.ssm_parameter_prefix
  })
  filename = "${path.module}/terraform-outputs.json"
}
