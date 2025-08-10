# Terraform Infrastructure

This directory contains the Terraform code to provision the AWS infrastructure for the application.

## Prerequisites

- [Terraform](https.www.terraform.io/downloads.html) installed.
- AWS credentials configured in your environment.

## How it Works

This Terraform setup will create and manage your AWS resources. You define your settings in a `terraform.tfvars` file, and Terraform does the rest.

### SSM Parameter Store (Secrets)

You do not need to create secrets in AWS manually. The Terraform code handles it for you.

In your `terraform.tfvars` file, you will define your secrets in the `app_secrets` map. When you run `terraform apply`, Terraform will create a `SecureString` parameter in AWS SSM Parameter Store for each entry in the map.

For example:

```hcl
app_secrets = {
  "DATABASE_URL" = "your-production-database-url"
  "API_KEY"      = "super-secret-api-key"
}
```

This will create the SSM parameters `/your-ssm-prefix/DATABASE_URL` and `/your-ssm-prefix/API_KEY`.

## Usage Steps

1.  **Create a `terraform.tfvars` file:**

    Make a copy of `terraform.tfvars.example` and name it `terraform.tfvars`.

    ```bash
    cp terraform.tfvars.example terraform.tfvars
    ```

2.  **Populate `terraform.tfvars`:**

    Edit `terraform.tfvars` with your specific values.

3.  **Initialize Terraform:**

    Run `terraform init` to download the necessary providers.

    ```bash
    terraform init
    ```

4.  **Plan and Apply:**

    Run `terraform plan` to see the changes that will be applied.

    ```bash
    terraform plan
    ```

    If the plan is acceptable, run `terraform apply` to create the infrastructure.

    ```bash
    terraform apply
    ```

## Outputs

After a successful `terraform apply`, the following files will be created:

- `terraform-outputs.json`: Contains the outputs needed for the Jenkins pipeline.
- `terraform.tfstate`: The state file for your infrastructure. **Do not commit this file to version control.**
