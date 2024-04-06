import {
    CodeGuruReviewerClient,
    AssociateRepositoryCommand,
    DescribeRepositoryAssociationCommand,
    CreateCodeReviewCommand,
    ListRecommendationsCommand,
    DescribeCodeReviewCommand,
} from "@aws-sdk/client-codeguru-reviewer";
import dotenv from "dotenv";

dotenv.config();

const config = {
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    }
};
const client = new CodeGuruReviewerClient(config);

const inputForAssociate = {
    Repository: {
        S3Bucket: {
            BucketName: process.env.BUCKET_NAME,
            Name: process.env.REPOSITORY_NAME,
        }
    }
}
const associateCmd = new AssociateRepositoryCommand(inputForAssociate);
// const response = await client.send(associateCmd);
// console.log(respone);

const inputForDescAssociate = {
    AssociationArn: process.env.ASSOCIATION_ARN,
}
const describeAssociateCmd = new DescribeRepositoryAssociationCommand(inputForDescAssociate);
// const response = await client.send(describeAssociateCmd);
// console.log(respone);

const inputForReview = {
    Name: "FirstReview",
    RepositoryAssociationArn: process.env.ASSOCIATION_ARN,
    "Type" : {
        "AnalysisTypes": ["Security", "CodeQuality"],
        "RepositoryAnalysis" : {
            "S3BucketRepository" : {
                "Details": {
                    "BucketName": process.env.BUCKET_NAME,
                    "CodeArtifacts": {
                        "SourceCodeArtifactsObjectKey": process.env.REPOSITORY_NAME + "/source.zip"
                    },
                },
                "Name": process.env.REPOSITORY_NAME,
            }
        }
    }
};
const createCodeRevCmd = new CreateCodeReviewCommand(inputForReview);
// const response = await client.send(createCodeRevCmd);
// console.log(response);

const inputForDescCodeReview = {
    CodeReviewArn: process.env.CODEREVIEW_ARN,
}

// const descCodeRevCmd = new DescribeCodeReviewCommand(inputForDescCodeReview);
// const response = await client.send(descCodeRevCmd);
// console.log(response);

const inputForListRecommendations = {
    MaxResults: Number("100"),
    CodeReviewArn: process.env.CODEREVIEW_ARN,
}
// const command = new ListRecommendationsCommand(inputForListRecommendations);
// const response = await client.send(command);
// console.log(response);
