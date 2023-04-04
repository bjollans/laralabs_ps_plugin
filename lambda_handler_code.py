import json
import boto3
from botocore.exceptions import ClientError
import logging
import base64

s3 = boto3.client('s3')
bucket="laralabs"
prompts_key="input_prompts"
input_key="input_images"
output_key="output_images"

def lambda_handler(event, context):
    print(event)
    if 'queryStringParameters' not in event:
        print("parameters were not in request: " + str(event))
        return {
            'Content-Type': 'json',
            'statusCode': 400,
            'body': json.dumps('no query')
        }
    if 'body' in event and 'id' in event['queryStringParameters']:
        id=event['queryStringParameters']['id']
        base64_img=json.loads(event['body'])['img']
        return upload_img(id, base64_img)
    elif 'prompt' in event['queryStringParameters'] and 'id' in event['queryStringParameters']:
        id=event['queryStringParameters']['id']
        prompt=event['queryStringParameters']['prompt']
        return write_json(id, prompt)
    elif 'id' in event['queryStringParameters'] and 'poll' in event['queryStringParameters'] and event['queryStringParameters']['poll']=='true':
        id=event['queryStringParameters']['id']
        return poll(id)
    elif 'id' in event['queryStringParameters']:
        id=event['queryStringParameters']['id']
        return return_image(id)
   
def upload_img(id, base64_img):
    try:
        s3.put_object(Body=base64.b64decode(base64_img), Bucket=bucket, Key=f'{input_key}/{id}.png')
        return {
            'headers': { "Content-Type": "json" },
            'statusCode': 200,
            'body': json.dumps('success')
        }
    except ClientError as e:
        logging.error(e)
        return {
            'Content-Type': 'json',
            'statusCode': 500,
            'body': json.dumps(f'ERROR: {e}')
        }
        
def poll(id):
    try:
        response = s3.list_objects_v2(Bucket=bucket, Prefix=f'{output_key}/{id}')
        return {
            'headers': { "Content-Type": "json" },
            'statusCode': 200,
            'body': json.dumps('processing' if 'Contents' not in response or len(response['Contents']) < 4 else 'ready')
        }
    except ClientError as e:
        logging.error(e)
        return {
            'Content-Type': 'json',
            'statusCode': 500,
            'body': json.dumps(f'ERROR: {e}')
        }
        
def write_json(id, prompt):
    try:
        s3.put_object(Body=prompt, Bucket=bucket, Key=f'{prompts_key}/{id}')
        return {
            'headers': { "Content-Type": "json" },
            'statusCode': 200,
            'body': json.dumps('success')
        }
    except ClientError as e:
        logging.error(e)
        return {
            'Content-Type': 'json',
            'statusCode': 500,
            'body': json.dumps(f'ERROR: {e}')
        }
        
def return_image(id):
    try:
        response = s3.get_object(Bucket=bucket, Key=f'{output_key}/{id}.png')
        image = response['Body'].read()
        return {
            'headers': { "Content-Type": "image/png" },
            'statusCode': 200,
            'body': base64.b64encode(image),
            'isBase64Encoded': True
        }
    except ClientError as e:
        logging.error(e)
        return {
            'Content-Type': 'json',
            'statusCode': 500,
            'body': json.dumps(f'ERROR: {e}')
        }