const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
require('dotenv').config();

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
});

const input = {
    Body: "/home/rk/Pictures/Me.jpeg",
    Bucket: process.env.BUCKET_NAME,
    Key: "project1/MeToo.jpeg",
}

async function init2(){
    const command = new PutObjectCommand(input);
    const response = await client.send(command);
    console.log(response);
}

init2();
