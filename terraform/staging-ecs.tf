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
  vpc_id     = data.aws_vpc.existing_vpc.id
  cidr_block = "172.31.32.0/20"
}
resource "aws_security_group" "ecs_security_group" {
  name_prefix = "ayush-new"
  vpc_id      = data.aws_vpc.existing_vpc.id

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = ["sg-04c53a4831e9f6ff8"]
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
  name = "offsetmax-stage-project-service"

}
# Define the ECS cluster
resource "aws_ecs_cluster" "ecs_cluster" {
  name = "offsetmax-project-service-stage-ecs-cluster"
}

# Define the ECS task definition
resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = "project-service-stage-task"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = "1 vCPU"
  memory                   = "2048"
  execution_role_arn       = "arn:aws:iam::168933414344:role/ecsTaskExecutionRole"
  container_definitions    = <<DEFINITION
[
  {
    "name": "project-service-stage-container",
    "image": "${data.aws_ecr_repository.my_repository.repository_url}",
    "portMappings": [
      {
        "containerPort": 8080,
        "protocol": "tcp"
      }
   ],
    "environment": [
        {
          "name": "DATABASE_URL",
          "value": "${var.DATABASE_URL}"
        }
      
      
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/my-ecs-project-stage-service-task",
        "awslogs-region": "ap-south-1",
        "awslogs-stream-prefix": "my-project-service-container"
      }
    }
  }
]
DEFINITION
}
resource "aws_ecs_service" "my_service" {
  name            = "project-service-stage"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  launch_type     = "FARGATE"
  desired_count   = 1
  deployment_controller {
    type = "ECS"
  }
  network_configuration {
    security_groups  = [aws_security_group.ecs_security_group.id]
    subnets          = [data.aws_subnet.my_subnet_ids.id]
    assign_public_ip = true
  }
  load_balancer {
    target_group_arn = "arn:aws:elasticloadbalancing:ap-south-1:168933414344:targetgroup/project-service-stage-tg/7f5e61f54e7f30ad"
    container_name   = "project-service-stage-container"
    container_port   = 8080
  }
}
resource "aws_appautoscaling_target" "dev_to_target" {
  max_capacity       = 5
  min_capacity       = 1
  resource_id        = "service/offsetmax-project-service-stage-ecs-cluster/project-service-stage"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "dev_to_memory" {
  name               = "project-service-stage-to-memory"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.dev_to_target.resource_id
  scalable_dimension = aws_appautoscaling_target.dev_to_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.dev_to_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageMemoryUtilization"
    }

    target_value = 80
  }
}

resource "aws_appautoscaling_policy" "dev_to_cpu" {
  name               = "project-service-stage-to-cpu"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.dev_to_target.resource_id
  scalable_dimension = aws_appautoscaling_target.dev_to_target.scalable_dimension
  service_namespace  = aws_appautoscaling_target.dev_to_target.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }

    target_value = 60
  }
}