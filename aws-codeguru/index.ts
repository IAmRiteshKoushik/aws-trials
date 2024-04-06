import {
    CodeGuruReviewerClient,
    AssociateRepositoryCommand,
    DescribeRepositoryAssociationCommand,
    CreateCodeReviewCommand,
    ListRecommendationsCommand,
    DescribeCodeReviewCommand,
} from "@aws-sdk/client-codeguru-reviewer";
import { warn } from "console";
import dotenv from "dotenv";

dotenv.config();

const config = {
    region: process.env.REGION ?? "region",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID ?? "access-key",
        secretAccessKey: process.env.SECRET_ACCESS_KEY ?? "secret-key",
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

const inputForDescAssociate = {
    AssociationArn: process.env.ASSOCIATION_ARN,
}

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

const inputForDescCodeReview = {
    CodeReviewArn: process.env.CODEREVIEW_ARN,
}


const inputForListRecommendations = {
    MaxResults: Number("100"),
    CodeReviewArn: process.env.CODEREVIEW_ARN,
}

async function main(){

    // const associateCmd = new AssociateRepositoryCommand(inputForAssociate);
    // const responseAss = await client.send(associateCmd);
    // console.log(responseAss);

    // const describeAssociateCmd = new DescribeRepositoryAssociationCommand(inputForDescAssociate);
    // const responseDescAss = await client.send(describeAssociateCmd);
    // console.log(responseDescAss);

    const createCodeRevCmd = new CreateCodeReviewCommand(inputForReview);
    const responseCreate = await client.send(createCodeRevCmd);
    console.log(responseCreate);

    // const descCodeRevCmd = new DescribeCodeReviewCommand(inputForDescCodeReview);
    // const responseDescRev = await client.send(descCodeRevCmd);
    // console.log(responseDescRev);
 
    // const listRecomed = new ListRecommendationsCommand(inputForListRecommendations);
    // const responseListRecomed = await client.send(listRecomed);
    // console.log(responseListRecomed);
}

main();
