# Context of kubectl

## To check the context of kubectl

      $ kubectl config get-contexts
      CURRENT   NAME                                                       CLUSTER                                                    AUTHINFO                                                        NAMESPACE
                gke_ticketing-dev-294323_asia-northeast1-a_ticketing-dev   gke_ticketing-dev-294323_asia-northeast1-a_ticketing-dev   gke_ticketing-dev-294323_asia-northeast1-a_ticketing-dev
      *         minikube                                                   minikube                                                   minikube

## To switch the context of kubectl
      $ kubectl config use-context gke_ticketing-dev-294323_asia-northeast1-a_ticketing-dev
      Switched to context "gke_ticketing-dev-294323_asia-northeast1-a_ticketing-dev".

# Creating nginx ingress controller in GCE
      $ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.0/deploy/static/provider/cloud/deploy.yaml
Ref: https://kubernetes.github.io/ingress-nginx/deploy/#gce-gke


# Creating "secret" for Kubernetes

## To create a Secret

      $ kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_private_key_string
      
## To get secret
      $ kubectl get secrets

      NAME                  TYPE                                  DATA   AGE
      default-token-b2b42   kubernetes.io/service-account-token   3      5d
      jwt-secret            Opaque                                1      2m31s

