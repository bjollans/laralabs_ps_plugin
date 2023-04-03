
#Initial installations
pip install --upgrade diffusers transformers scipy
pip install --upgrade huggingface_hub
pip install torch torchvision torchaudio
pip install boto3


#Python file

import torch
from diffusers import StableDiffusionPipeline
import boto3

s3=boto3.client('s3')

from huggingface_hub import login
login('...')

model_id = "runwayml/stable-diffusion-v1-5"
device = "cuda"


pipe = StableDiffusionPipeline.from_pretrained(model_id, torch_dtype=torch.float16)
pipe = pipe.to(device)

g_cuda = torch.Generator(device='cuda').manual_seed(0)
# docs: https://huggingface.co/docs/diffusers/v0.7.0/en/api/pipelines/stable_diffusion#diffusers.StableDiffusionPipeline
imgs = pipe(prompt="magic sword, 2d game prop, white background, no background, clean lines, wood, steel, material, trending on artstation, game art, cgsociety, art by greg rutkowski and artgerm and james jean and zdzisław beksinski, 8 k, unreal engine, c 4 d, blue and pink color scheme",
            negative_prompt="amateur, poorly drawn, ugly, flat, abstract, character, rough, sketch, sheet",
            height=512,
            width=512,
            num_inference_steps=50,
            generator=g_cuda)
imgs.images[0].save("result.png")

try:
    response = s3.upload_file("result.png", "laralabs", "output_images/result.png")
except ClientError as e:
    print(e)