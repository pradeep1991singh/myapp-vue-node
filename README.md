# myapp

## Step 1: Project Setup

```sh
cd myapp-vue-node
npm install
```

### Step 2: Migration and seed DB

```sh
npx knex migrate:latest --env development
npx knex seed:run --env development
```

### Step 3: Run client

```sh
npm run dev
```

### Step 4: Run Server

```sh
npm run server
```

### Step 5: Login

Username: john
Password: john_doe
