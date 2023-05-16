variable "DATABASE_URL" {
  default = ""
}

variable "ENV" {
  default = ""
}

variable "TG" {
  default = ""
}
variable "key" {
  description = "Key name for the backend state file"
  type        = string
}
