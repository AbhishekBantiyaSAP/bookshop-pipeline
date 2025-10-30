# Setting github actions for CAP project which utilizes application content deployer buildpack

1. ### cds add gha adds the .github folder to the repository which contains
    - actions for kyma-setup and kyma-info
    - workflows for kyma deployment, for tests, and kyma deployment in the event of release

2. ### Changes done from kyma info 
    - Added a line in installing binaries step to install @sap/cds-dk as a globally available package
    - Added steps for docker login using docker/login-action@v3 which takes in arguments of container registry, username and password
        - First docker login is required to login to `deploy-releases-hyperspace-docker.common.repositories.sapcloud.cn` for accessing the application content deployer buildpack
        - Other docker login is required for logging in to your container image registry
        - Final step is to configure kubeconfig in the runner. Kubeconfig provided through github secrets is base64 encoded

3. ### Setting up kubeconfig.yaml file
    - Navigate to your **kyma** environment. Navigate to the namespace you want your application to be deployed to
    - Under `Configuration`, Select `Service Accounts` and create one with any appropriate name
    - Under Configuration, Select `Secrets` and create a secret
        - Template = Secrets: `kubernetes.io/service-account-token`
        - Under `Annotations` : Enter name of the above create created service account as value to the key `kubernetes.io/service-account.name`
        - Once secret is created you can find `ca.crt` and `token` under Data
        - Under Configuration, go to **Roles** and create a role with appropriate permissions. For simplicity, I have create a role with the template all permissions
        - Under Configuration, go to `Role Bindings`
            - Give an appropriate name to binding, Select Role type as `Role` and Kind as `ServiceAcccount`.
            - Provide the service acccount **name** and **namespace** under the ServiceAccount section.
            - This creates a **role binding** to the create Service Account
    - Create a yaml file with the configuration mentioned below so that you can set it as a secret in the github actions
        ```yaml
        ---
        apiVersion: v1
        kind: Config
        clusters:
        - name: kyma
            cluster:
            server: <kyma server url>
            certificate-authority-data: <Base64 encoded ca.crt from the secret created above>
        contexts:
        - name: <Service Account name>
            context:
            cluster: kyma
            namespace: <target-namespace>
            user: <Service Account name>
        current-context: <Service Account name>
        users:
        - name: <Service Account name>
            user:
            token: <provide the token here from the above created secret as it is>
        ```
