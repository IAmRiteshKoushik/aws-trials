# Elastic Cloud Compute (EC2)

This is the most common service, when you are provisioning a server on the 
cloud then there are multiple ways to do it, the most common one being 

## Resources

01. `Instances (running)` - Virtual servers that are currently running in the 
    cloud.

02. `Auto Scaling Groups` - These are groups of instances that are managed
    collectively, and AWS Auto Scaling automatically adjust the number of
    instances in the group based on specified policies

03. `Dedicated Hosts` - A dedicated physical server in AWS used exclusively for 
    your account. It allows you to bring your own software licenses and can be 
    usefrul for compliance and regulatory requirements.

04. `Elastic IPs` - These are static IP addresses that you can assign to your 
    EC2 instances. They allow you to maintain the same IP address even if the 
    instance is stopped and restarted.

05. `Instances (total)` - This refers to the total number of instances, both
    running and stopped, in your account.

06. `Key Pairs` - A key pair consists of a public key that AWS stores, and a 
    private key file that you store. You use the private key to securely SSH 
    into your instances.

07. `Load Balancers` - They distribute the incoming network traffic accross 
    multiple instances to ensure that no single instance is overwhelmed, 
    optimizing the availability and fault tolerance of your application.

08. `Placment Groups` - Logical grouping of instances within a single 
    "Availability Zone". This can be used to influence the placement of 
    instances to meet the needs of your workload. There are 3 types of 
    placement groups :

    1. Cluster Placement Groups (CPG)
        - A CPG is designed to group instances closely together within a single
        Availability Zone. This can be particularly useful for applications that
        require low-latency network performance or high-throughput between 
        instances.
        - Ideal for HPC(High-Performance Computing) workloads.
    2. Partition Placement Groups
        - A PPG spreads instances across partitions with each partition having 
        its own set of racks and network resources. 
        - Each pariti
        - Suitable for distributed and replicated workloads that need high 
        availability, such as large-scale distributed and replicated file sys.
    3. Spread Placement Groups
        - A SPG ensures that isntances are placed on distinct underlying 
        hardware, thereby minimizing the risk of correlated failures.
        - Instances on a SPG are placed on different racks, reducing the 
        likelihood that a single failure could impact all instances.
        - Suitable for critical apps where high availability and fault 
        tolerance are essential. SPGs are recommended for small deployments
        that require the reliability for dedicated hardware.

    Points to remember:
        - Placement groups can be created only within single Availability Zone
        - Once instances are launched into a placement group, they cannot to moved
        to another placement group. You can, however move instances out of a 
        placement group back to standalone instances.
        - The choice of placement group type depends on the specific requirements 
        and characteristics of your application.

09. `Security Groups` - Virtual firewalls for your instances, controlling 
    inbound and outbound traffic at an instance level.

10. `Snapshots` - These are point-in-time copies of data stores in AWS EBS
    volumes. Snapshots can be used for backups or to create new volumes.

11. `Volumes` - These are block level storage devices that you can attach to your
    instances. Amazong EBS volumes are used for persistent storage.
