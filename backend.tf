terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket-offsetmax"
    key            = var.key
    region         = "ap-south-1"
    dynamodb_table = "dynamodb-state-locking-terraform"
    
  }
}
