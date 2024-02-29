# Identity and Access Management (IAM)

## Preview
1. Usually, when you login to your AWS account, you get the choice between 
    logging in as a root-user or an IAM user. 
2. Development and other critical tasks should not be carried out as a 
    root-user. You are better off, creating some safety checks and controls 
    in order to avoid a bill by creating an IAM user account with certain 
    restrictions on what you can and cannot access. 
3. Root account should be used only for user-management, even though it has 
    the capacity to perform all kinds of tasks like deployment, monitoring and 
    DevOps; better not to use it for anything else other than managing IAM
    users.

## What is IAM ?

When working in a company, you would usually work within teams and accross
teams. Being the root-user, you need to setup IAM for each team say - 

- Development teams
- Finance teams etc.

When you go into your IAM dashboard/console; you see an option to setup an 
Account Alias (beneath your AccountID). Using this alias, you can login as a 
root-user into your account or as an IAM guided-user into other people's 
accounts based on the roles, access and restrictions that you have been 
provided with by them.

## Access Management 
1. User groups : Specify permissions for a collection of users 
2. Users : Identity with long-term credentials that interacts with AWS
3. Roles : 
4. Policies
5. Identity providers 
6. Account settings

> NOTE: When you are developing using AWS you would encounter two types of 
users - programmatic users, physical user (needs management controls).

In case the access is to be given, you need to do the following :
- Provide user access to AWS Management Console (optional)
- Create IAM User
- Auto generate Passwd / Custom Passwd
(then users must change it upon their next-sign-in - optional)
- Setup permissions for the users
    - Attach policies one-by-one
    - Use another user as a template to add perms to the current user
    - Add the user to a certain group so that it would have pre-defined perms

> NOTE : We cannot attach as many policies as we wish to, there is a hard-limit
of 10 permissions that we can attach to a single user. 

A better way to do this is to use user-groups. A user can be added to multiple
user groups. And these groups contain certain policies attached to them which 
get applied to all the users within the group. Interestingly, there are certain 
policies which are `AWS Managed` and then there are policies written from 
scratch by you. There are guidelines and documentation as to how you can write 
security policies.

`In the top right corner you would notice the profile name - IAMUser @ RootUser`
Also, based on the permissions provided (policies attached) the user would 
be able to open the dashboard of only those relavant services.


