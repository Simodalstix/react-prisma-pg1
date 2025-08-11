# Jenkins Setup Guide

This guide provides step-by-step instructions for setting up a Jenkins environment using Docker.

## 1. Launch Jenkins Container

First, you need to create a directory on the host machine to store the Jenkins data persistently.

```bash
sudo mkdir -p /opt/jenkins_home
sudo chown -R 1000:1000 /opt/jenkins_home
```

Now, run the following command to start the Jenkins container:

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
- `-v /opt/jenkins_home:/var/jenkins_home`: Mounts the host directory `/opt/jenkins_home` to `/var/jenkins_home` inside the container for persistent storage.
- `jenkins/jenkins:lts`: Specifies the official Jenkins LTS Docker image.

## 2. Initial Setup Wizard

Once the container is running, you need to unlock Jenkins using the initial administrator password.

1.  **Retrieve the Initial Admin Password:**
    Get the password from the container's logs by running the following command:

    ```bash
    docker logs jenkins
    ```

    You will see output similar to this. Copy the alphanumeric password.

    ```
    *************************************************************
    *************************************************************
    *************************************************************

    Jenkins initial setup is required. An admin user has been created and a password generated.
    Please use the following password to proceed to installation:

    [initial_admin_password]

    This may also be found at: /var/jenkins_home/secrets/initialAdminPassword

    *************************************************************
    *************************************************************
    *************************************************************
    ```

2.  **Unlock Jenkins:**
    - Open your web browser and navigate to `http://localhost:8888`.
    - Paste the initial administrator password into the "Administrator password" field and click "Continue".

## 3. Plugin Installation

1.  On the "Customize Jenkins" page, click **"Install suggested plugins"**. Jenkins will begin installing a set of recommended plugins.

2.  **Install Additional Plugins:**
    After the initial setup is complete, you will need to install a few more plugins manually.
    - Navigate to **Manage Jenkins > Plugins**.
    - Go to the **Available plugins** tab.
    - Search for and install the following plugins:
      - `Pipeline`
      - `AWS Credentials`
      - `SSH Agent`
      - `Blue Ocean`

## 4. Create First Admin User

After the plugins are installed, you will be prompted to create the first admin user. Fill in the required details (username, password, full name, and email address) and click **"Save and Continue"**.

## 5. Instance Configuration

Confirm the Jenkins URL. The default `http://localhost:8888/` should be correct. Click **"Save and Finish"**.

Your Jenkins setup is now ready!

## 6. Required Credentials Setup

> **IMPORTANT:** You must add the following credentials to the Jenkins GUI **before** you run the pipeline for the first time. The pipeline will fail without them.

This section provides a step-by-step guide to configure the necessary secrets in Jenkins.

### How to Add Credentials in Jenkins

1.  From the Jenkins dashboard, navigate to **Manage Jenkins** in the left sidebar.
2.  Click on **Credentials** under the "Security" section.
3.  Under **Stores scoped to Jenkins**, click on the **(global)** domain.
4.  Click **Add Credentials** in the left sidebar.
5.  For each credential listed in the table below, select the correct **Kind** (e.g., "Secret text" or "SSH Username with private key").
6.  Fill in the details exactly as specified in the table. The **ID** must match perfectly.
7.  Click **Create**.

Repeat this process for every credential in the table below.

### Credentials Table

| ID (`Credential ID`) | Kind (`Type`)                 | Description                             | Where to Find the Value                                                                                               |
| -------------------- | ----------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `aws_role_arn`       | Secret text                   | AWS IAM role ARN for Jenkins to assume. | This is the `jenkins_role_arn` output from your Terraform deployment.                                                 |
| `aws_account_id`     | Secret text                   | Your AWS account ID.                    | You can find this in the AWS Management Console in the top-right corner under your account name.                      |
| `pi_ssh_key`         | SSH Username with private key | Private key to access the Raspberry Pi. | **ID:** `pi_ssh_key`<br>**Username:** `pi`<br>**Private Key:** Check "Enter directly" and paste your SSH private key. |
| `pi_host`            | Secret text                   | Raspberry Pi IP address or hostname.    | The local IP address of your Raspberry Pi (e.g., `192.168.1.10`).                                                     |
| `pi_user`            | Secret text                   | Username for the Raspberry Pi.          | The user you SSH into the Pi with (e.g., `pi`).                                                                       |
