
# Multithreaded File Uploader (AWS S3)




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`AWS_BUCKET_NAME` `AWS_ACCESS_KEY` `AWS_ACCESS_SECRET_KEY`   `AWS_BUCKET_REGION`

See .env.example file.



## Run Locally

Clone the project

```bash
  git clone https://github.com/misha-z1nchuk/multithread-s3-file-uploader
```

Go to the project directory

```bash
  cd multithread-s3-file-uploader
```

Install dependencies

```bash
  npm install
```

Add folder that you want to upload to root folder of project

And run

```bash
    node lib/main.js -f <file name>
```
