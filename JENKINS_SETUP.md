# Jenkins Setup Guide

This guide provides step-by-step instructions for setting up a Jenkins environment to automate the deployment of this project.

> **IMPORTANT:** Follow these steps in order. The first step is a **one-time manual setup** that must be completed before the Jenkins pipeline can function.

## Step 1: Initial Infrastructure Setup (One-Time)

Before you can use the Jenkins pipeline, you must first manually create the core AWS infrastructure. This is a **one-time action** required to solve a "chicken-and-egg" problem: the pipeline needs an AWS IAM Role to run, but that role can only be created by running Terraform.

By running `terraform apply` once from your local machine, you will create the necessary `aws_role_arn` that Jenkins requires as a credential.

1.  **Navigate to the Terraform Directory:**
    Open your terminal and change to the `infra` directory.

    ```bash
    cd infra
    ```

2.  **Initialize and Apply Terraform:**
    Run the following commands to initialize Terraform and provision the resources.

    ```bash
    terraform init
    terraform apply
    ```

3.  **Approve and Get Output:**
    - Review the plan and type `yes` when prompted to approve the changes.
    - After the command completes, Terraform will display several outputs. **Copy the `jenkins_iam_role_arn` value.** You will need this for Step 3.

---

## Step 2: Launch Jenkins Container

Now, set up the Jenkins controller using Docker.

1.  **Create a Jenkins Home Directory:**
    Create a directory on the host machine to persistently store the Jenkins data.

    ```bash
    sudo mkdir -p /opt/jenkins_home
    sudo chown -R 1000:1000 /opt/jenkins_home
    ```

2.  **Run the Jenkins Container:**
    Start the Jenkins container with the following command:

    ```bash
    docker run -d --name jenkins \
      -p 8888:8080 \
      -p 50000:50000 \
      -v /opt/jenkins_home:/var/jenkins_home \
      jenkins/jenkins:lts
    ```

    **Command Breakdown:**

    - `-d`: Runs the container in detached mode.
    - `--name jenkins`: Assigns the name `jenkins` to the container.
    - `-p 8888:8080`: Maps port `8888` on the host to port `8080` in the container (for the Jenkins web UI).
    - `-p 50000:50000`: Maps port `50000` for agent communication.
    - `-v /opt/jenkins_home:/var/jenkins_home`: Mounts the host directory for persistent storage.
    - `jenkins/jenkins:lts`: Specifies the official Jenkins LTS Docker image.

---

## Step 3: Jenkins Initial Setup & Configuration

### 1. Unlock Jenkins

1.  **Retrieve the Initial Admin Password:**
    Get the password from the container's logs:

    ```bash
    docker logs jenkins
    ```

    Copy the alphanumeric password from the output.

2.  **Unlock Jenkins:**
    - Open your web browser and navigate to `http://localhost:8888`.
    - Paste the password into the "Administrator password" field and click "Continue".

### 2. Install Plugins

1.  On the "Customize Jenkins" page, click **"Install suggested plugins"**.
2.  After completion, navigate to **Manage Jenkins > Plugins**.
3.  Go to the **Available plugins** tab and install the following:
    - `Pipeline`
    - `AWS Credentials`
    - `SSH Agent`
    - `Blue Ocean`

### 3. Create Admin User & Set Instance URL

1.  Create your first admin user when prompted.
2.  Confirm the Jenkins URL is `http://localhost:8888/` and save.

---

## Step 4: Required Credentials Setup

> **IMPORTANT:** You must add the following credentials to the Jenkins GUI **before** you run the pipeline for the first time. The pipeline will fail without them.

### How to Add Credentials in Jenkins

1.  Navigate to **Manage Jenkins > Credentials**.
2.  Under **Stores scoped to Jenkins**, click on the **(global)** domain.
3.  Click **Add Credentials**.
4.  For each credential below, select the correct **Kind**, fill in the details exactly as specified, and click **Create**. The **ID** must match perfectly.

### Credentials to Add

Here is the list of credentials you need to create.

---

**1. AWS Role ARN**

- **Kind:** `Secret text`
- **ID:** `aws_role_arn`
- **Description:** `AWS IAM role ARN for Jenkins to assume.`
- **Secret:** Paste the `jenkins_iam_role_arn` value you copied from the `terraform apply` output in **Step 1**.

---

**2. AWS Account ID**

- **Kind:** `Secret text`
- **ID:** `aws_account_id`
- **Description:** `Your AWS account ID.`
- **Secret:** Your AWS Account ID. You can find this in the AWS Management Console in the top-right corner under your account name.

---

**3. Raspberry Pi SSH Key**

- **Kind:** `SSH Username with private key`
- **ID:** `pi_ssh_key`
- **Description:** `Private key to access the Raspberry Pi.`
- **Username:** `simoda`
- **Private Key:** Select the "Enter directly" option and paste the contents of your SSH private key file.

---

**4. Raspberry Pi Host**

- **Kind:** `Secret text`
- **ID:** `pi_host`
- **Description:** `Raspberry Pi IP address or hostname.`
- **Secret:** The local IP address of your Raspberry Pi (e.g., `192.168.1.10`).

---

## Step 5: Create and Run the Jenkins Pipeline

### 1. Create the Pipeline Job

1.  From the Jenkins dashboard, click **New Item**.
2.  Enter a name (e.g., `fullstack-deployment`), select **Pipeline**, and click **OK**.
3.  Scroll down to the **Pipeline** section.
4.  For **Definition**, select **"Pipeline script from SCM"**.
5.  For **SCM**, select **"Git"**.
6.  In **Repository URL**, enter your Git repository URL.
7.  Ensure **Branch Specifier** is set to `*/main` (or your primary branch).
8.  Ensure **Script Path** is set to `Jenkinsfile`.
9.  Click **Save**.

### 2. Run the Build

1.  On the job page, click **Build Now**.
2.  The pipeline will pause at two stages for manual approval:
    - **Approve Apply:** To confirm infrastructure changes via Terraform.
    - **Approve Pi Deploy:** To confirm deployment to the Raspberry Pi via Ansible.
      Click **"Proceed"** at each stage to continue.

---

## Step 6: Post-Deployment Validation

After the pipeline completes, validate that all components are working. The required values for `<bucket-name>`, `<cloudfront_domain>`, etc., can be found in the `terraform-outputs.json` file, which is archived as a build artifact in the Jenkins job.

1.  **Validate AWS S3 Bucket:**
    Check that the frontend files were uploaded.

    ```bash
    # Replace <your-bucket-name> with the actual S3 bucket name
    aws s3 ls s3://<your-bucket-name>
    ```

2.  **Validate CloudFront Distribution:**
    Open your CloudFront URL (`https://<cloudfront_domain>`) in a browser. The website should load.

3.  **Validate Backend on Raspberry Pi:**
    Check the backend health endpoint.
    ```bash
    # Replace <pi_host> and <backend_port> with the correct values
    curl http://<pi_host>:<backend_port>/api/health
    ```
    A `200 OK` response confirms the backend is running.

---

**Note on Destroying Infrastructure:**
If you ever run `terraform destroy`, the IAM role will be deleted. To rebuild, you must repeat **Step 1**: run `terraform apply` locally, get the new `jenkins_iam_role_arn`, and update the credential in Jenkins before running the pipeline.

Congratulations! Your CI/CD pipeline is fully functional.
