terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket-offsetmax"
    key            = "Graphql-db/terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "dynamodb-state-locking-terraform"
  }
}
