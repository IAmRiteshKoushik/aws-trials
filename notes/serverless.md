# Serverless - AWS Lambda

## Overview
1. As a backend, you would be writing APIs { GraphQL | REST }
2. So, we usually spin up a server : say, AWS-EC2 (2GB RAM, 500GB Storage)
3. Our code executes inside an EC2 instance.
4. In this case, our billing is done based on hourly usage. ($0.02/Hr)
5. And when our traffic spikes during a certain time period, we can setup an 
   Auto-Scaling Group (ASG) where we can push the limits of our machine by 
   providing it with additional RAM and storage. (say - 6GB, 1TB storage)

This is a non-serverless architecture where the developer has to handle all the 
configurations, which are as follows :
1. Install the Linux operating system
2. Install the required libraries and dependencies
3. Deployments are to be taken care
4. Scaling it up and down is our job

## Going Serverless
When using a serverless architecture the following takes place : 
1. You write the code 
2. You do not have to worry about the underlying infrastructure which is 
   running your server.

In AWS terms, there is something called as Lambda. Here, Amazon decides :
1. OS 
2. RAM Storage
3. Other management and peripheral requirements

Now, when we come to billing, then in serverless architecture; the billing is 
done based on invocation as opposed to running all the time. Traditionally, 
your server would be running 100% of the time and you would be billed per hour 
in the case of EC2.

Coming back to operations :
1. Our code is be default in SLEEP state.
2. When an user hits our API, our code moves into START state.
3. The entire code executes, and returns the o/p to the user.
4. Then the code reverts back to SLEEP state. 
(Therefore, our code is not running constantly. Charges: per invocation.)
5. In addition to this, our code handles Auto-Scaling by itself, the developer 
   need not interfere or get involved with setting up ASGs.
6. It does so by making multiple copies / instances of our code-base 
   in order to handle the incoming requests (parallely)
7. Once all the users are done with their tasks, each code-base instance will 
   auto-kill itself and after all the instances are down, the system would move 
   back into SLEEP state.
 
> NOTE : Each code-base instance is called as a Lambda function.

## Pricing
1. *Requests* : 1-million request are Free-Of-Cost and then we have $0.02 per 
    1M requests
2. *Duration* : The time taken by your backend to respond to a request. This 
    is again - $0.0000167 for every GB-second. Again, you get 400k-GB seconds 
    free per month.
Usually, you do not have to worry much about the pricing when it comes to 
serverless. In-case you have memory leaks, then you would lose compute time 
otherwise there is nothing to worry about. In-case you go beyond these limits 
then you are probably a profitable business.


