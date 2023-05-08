# Xendit Integration

Simple payment integration with xendit

### Prerequisites

- Xendit account
- Ngrok

### How To Run
- `yarn install`
- copy `.env.example` to `.env`
- `npx prisma migrate dev`
- `yarn dev`

### Xendit Configuration
- Signup to Xendit
- Go to settings 
<img width="150" alt="image" src="https://user-images.githubusercontent.com/39044004/236889943-ba7606f5-733b-4ff2-85b8-1ca5e6383723.png">

#### Setup Secret Key
- Click on Api keys
<img width="150" alt="image" src="https://user-images.githubusercontent.com/39044004/236890160-36cdc452-6ff0-40d1-be18-27b23c6303e0.png">
- Generate secret key
<img width="245" alt="image" src="https://user-images.githubusercontent.com/39044004/236890347-43c13fc2-ba4a-46bd-8aa5-eaf57b4a6800.png">
- Copy secret key to .env
<img width="560" alt="image" src="https://user-images.githubusercontent.com/39044004/236890626-5e6f2ef2-f61d-4604-8526-965c82392e3d.png">

#### Setup Callback
- Run ngrok `ngrok http 3000`
- Copy ngrok url
- Go to Callback Url 
<img width="500" alt="image" src="https://user-images.githubusercontent.com/39044004/236891405-97f78bc9-e53c-458e-b12d-845bbc38b16e.png">
- FVA paid : replace_with_ngrok_url/v1/payment/va/callback-paid
- FVA created : replace_with_ngrok_url/v1/payment/va/callback-created
