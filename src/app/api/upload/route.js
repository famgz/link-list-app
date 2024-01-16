import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export async function POST(req) {
  const formData = await req.formData();

  if (!formData.has('file')) {
    console.log('No file was found');
    return false;
  }

  const file = formData.get('file');
  const randomId = uniqid();
  const ext = file.name.split('.').pop() || 'jpg';
  const newFileName = randomId.concat('.', ext);

  const chunks = [];
  for await (const chunk of file.stream()) {
    chunks.push(chunk);
  }

  const s3Client = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  const bucketName = process.env.S3_BUCKET_NAME;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: newFileName,
      ACL: 'public-read',
      Body: Buffer.concat(chunks),
      ContentType: file.type,
    })
  );

  const link = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;

  return Response.json(link);
}
