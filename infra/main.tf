provider "aws" {
  region = var.aws_region
}

resource "aws_s3_bucket" "frontend" {
  bucket = "${var.project_name}-frontend"

  tags = {
    Name      = "${var.project_name}-frontend"
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.project_name} frontend bucket"
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.frontend.arn}/*"]

    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id
  policy = data.aws_iam_policy_document.s3_policy.json
}


resource "aws_cloudfront_distribution" "s3_distribution" {
  origin {
    domain_name = aws_s3_bucket.frontend.bucket_regional_domain_name
    origin_id   = "S3-${var.project_name}"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  comment             = "${var.project_name} Frontend Distribution"
  default_root_object = "index.html"

  aliases = var.domain_name != "" ? [var.domain_name] : []

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${var.project_name}"

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }

  price_class = "PriceClass_100"

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = var.domain_name == "" ? true : false
    acm_certificate_arn            = var.acm_certificate_arn != "" ? var.acm_certificate_arn : null
    ssl_support_method             = var.domain_name != "" ? "sni-only" : null
  }

  tags = {
    Name      = "${var.project_name}-frontend-dist"
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}


resource "aws_iam_role" "jenkins" {
  name = "${var.project_name}-jenkins-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          # This should be updated with the correct principal for your Jenkins server
          # For example, an EC2 instance role or an AWS account.
          # Using a placeholder for now.
          AWS = "arn:aws:iam::123456789012:root"
        }
      }
    ]
  })

  tags = {
    Name      = "${var.project_name}-jenkins-role"
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}

data "aws_iam_policy_document" "jenkins_policy" {
  statement {
    sid = "S3Sync"
    actions = [
      "s3:PutObject",
      "s3:GetObject",
      "s3:ListBucket",
      "s3:DeleteObject"
    ]
    resources = [
      aws_s3_bucket.frontend.arn,
      "${aws_s3_bucket.frontend.arn}/*"
    ]
  }

  statement {
    sid = "CloudFrontInvalidation"
    actions = [
      "cloudfront:CreateInvalidation",
      "cloudfront:GetInvalidation"
    ]
    resources = [aws_cloudfront_distribution.s3_distribution.arn]
  }

  statement {
    sid = "SSMAccess"
    actions = [
      "ssm:GetParameters",
      "ssm:GetParameter"
    ]
    resources = ["arn:aws:ssm:${var.aws_region}:${data.aws_caller_identity.current.account_id}:parameter/${var.ssm_parameter_prefix}/*"]
  }

  dynamic "statement" {
    for_each = var.ecr_repository_name != "" ? [1] : []
    content {
      sid = "ECRAccess"
      actions = [
        "ecr:GetAuthorizationToken",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:GetRepositoryPolicy",
        "ecr:DescribeRepositories",
        "ecr:ListImages",
        "ecr:DescribeImages",
        "ecr:BatchGetImage",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ]
      resources = [aws_ecr_repository.app[0].arn]
    }
  }
}

resource "aws_iam_policy" "jenkins" {
  name   = "${var.project_name}-jenkins-policy"
  policy = data.aws_iam_policy_document.jenkins_policy.json
}

resource "aws_iam_role_policy_attachment" "jenkins" {
  role       = aws_iam_role.jenkins.name
  policy_arn = aws_iam_policy.jenkins.arn
}

data "aws_caller_identity" "current" {}


resource "aws_ssm_parameter" "app_secrets" {
  for_each = var.app_secrets
  name     = "/${var.ssm_parameter_prefix}/${each.key}"
  type     = "SecureString"
  value    = each.value
}

resource "aws_ecr_repository" "app" {
  count = var.ecr_repository_name != "" ? 1 : 0

  name                 = var.ecr_repository_name
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name      = "${var.project_name}-app-repo"
    Project   = var.project_name
    ManagedBy = "Terraform"
  }
}
