# Define the provider for AWS
provider "aws" {
  region = "ap-south-1"
}

# Define VPC and subnet IDs
data "aws_vpc" "existing_vpc" {
  id = "vpc-011f1b733d94aa911" # Change to your existing VPC ID
}
# Define the existing subnets
data "aws_subnet" "my_subnet_ids" {
   vpc_id = data.aws_vpc.existing_vpc.id
   cidr_block = "172.31.32.0/20"
}
resource "aws_security_group" "ecs_security_group" {
name_prefix = "ayush-new"
 vpc_id      = data.aws_vpc.existing_vpc.id
  
  ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    security_groups = ["sg-09a357d37bbade8fc"]
  }
ingress {
    from_port   = 0
    to_port     = 65535
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
#some
 egress {
   from_port   = 0
   to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
data "aws_ecr_repository" "my_repository" {
  name = "my-personal-repository"
  
}
# Define the ECS cluster
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "my-graphql-ecs-cluster"
}

# Define the ECS task definition
resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "my-ecs-graphql-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "2 vCPU"
  memory                   = "4096"
  execution_role_arn       = "arn:aws:iam::168933414344:role/ecsTaskExecutionRole"
  container_definitions = <<DEFINITION
[
  {
    "name": "my-graphql-container",
    "image": "${data.aws_ecr_repository.my_repository.repository_url}",
    "portMappings": [
      {
        "containerPort": 4000,
        "protocol": "tcp"
      }
   ],
    "environment": [
        {
          "name": "DATABASE_URL",
          "value": "mongodb+srv://atlasAdmin:m9yrCL1hikEj8BUU@offsetmaxcluster0.6zak4.mongodb.net/offsetmaxsandbox"
        }
      
      
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/my-ecs-task",
        "awslogs-region": "ap-south-1",
        "awslogs-stream-prefix": "my-graphql-container"
      }
    }
  }
]
DEFINITION
}
resource "aws_ecs_service" "my_service" {
  name            = "my-graphql"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  launch_type     = "FARGATE"
  desired_count   = 1
  deployment_controller {
    type = "ECS"
  }
  network_configuration {
    security_groups = [aws_security_group.ecs_security_group.id]
    subnets         = [data.aws_subnet.my_subnet_ids.id]
    assign_public_ip = true
  }
 load_balancer {
    target_group_arn = "arn:aws:elasticloadbalancing:ap-south-1:168933414344:targetgroup/ecs-test/7d4e8185893e0867"
    container_name   = "my-graphql-container"
    container_port   = 4000
  }
}
