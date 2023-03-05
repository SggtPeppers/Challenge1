# Challenge1

This is the database schema used in this project 
![imagen](https://user-images.githubusercontent.com/38479072/222977818-e06a285c-0f70-4959-94aa-36ddb16c8d0b.png)

## How To Run
1) Clone the repository
2) Install dependencies with 
```bash
npm install
```
3) Run the program with
```bash
npm run dev
```


When the programs starts it going to fetch the needed data from  https://jsonplaceholder.typicode.com.


## The app has the following endpoints:

### /posts

GET request to fetch paginated posts from the API.
Without a query param it will fetch 10 post from the page 1.
Instead you can specify the limit and page in this form /posts?page=2&limit=20

### /post/:id

GET request to fetch a post with a specific ID from the API.

### /comments/:postId

GET request to fetch all comments from a post from a specific Id .

### /title/:text

GET request to fetch a post or posts that contains the string in the title.

