# Eventful.io's Installation Instructions

## Development Installation

### Requirements


- Node.js version 22.13.1 or latest
- Git

Environment variables are avaialable through the Discord channel, should you need them you can look them up in the drive folder.
Additionally, if you want to take a look at the required environment variables you may find them on the [`.env.example`](https://github.com/katkes/SOEN-343-Project/blob/main/backend/.env.example) file.

### Front End Installation
For installing the front end run the following from the root of the project:

```bash
cd frontend
npm install
```

### Back End Installation
For installing the back end run the following from the root of the project:
```bash
cd backend
npm install
```

Create a `.env` file under the `backend/` folder and put the necessary values. You may refer to the `.env.example` [file](https://github.com/katkes/SOEN-343-Project/blob/main/backend/.env.example) as a template. 

You can also simply use the values from the `.env.development` [file](https://drive.google.com/file/d/1g40Lz9TSkMRSOmzmHCq0ln4etu__y1UF/view?usp=sharing) in the Drive folder.

## Running Eventful.io

Once the front and back end are installed, you may run the program as per below (two terminals are needed)

**Terminal 1:**:
```bash
cd backend
npm run dev
```

**Terminal 2:**
```bash
cd front end 
npm run dev
```

You may find the web application under http://localhost:5173/.

## Production Installation

More to come in this section...