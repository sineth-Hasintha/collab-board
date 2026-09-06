# Collab Board

## How to Run

Here's how to get the server and client running locally.

### Backend

First, navigate to the backend directory and set up your environment variables:

```bash
cd server
cp .env.example .env
```

**Next, open your new `.env` file and copy-paste the following (fill in your own MongoDB URI if you are using Atlas):**

```env
PORT=5000
JWT_SECRET=your_super_secret_key_here
MONGO_URI=mongodb://localhost:27017/collab-board
CLIENT_ORIGIN=http://localhost:5173
```

Then, install dependencies and start the server:

```bash
npm install
npm run dev
```

If it starts up fine, you'll see both `MongoDB Connected: <host>` and `Server running on port 5000` printed in the terminal. The first line is basically your confirmation that the database connection actually went through.

### Frontend

In a new terminal window, navigate to the frontend directory:

```bash
cd client
npm install
npm run dev
```

The client runs on `http://localhost:5173` and is already pointed at `http://localhost:5000/api`. Once you register an account, the board pulls its tasks straight from the live database through `GET /api/tasks`.

## Known Limitations
- No real-time sync yet — a manual refresh is needed to see changes made by another user.
- No automated test suite or CI pipeline yet.
