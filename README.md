# FomoFactory Backend Developer Role Assessment Project

## Requirements

Your task is to create a mini-website to collect and display real-time price data:

Backend:

- Poll real-time data every few seconds for 5 stocks or crypto (ex. GOOG, BTC) from an API of your choice
- There are multiple free APIs for eg. LiveCoinWatch, CoinGecko
- Store that data in a mongoDB database

Frontend:

- Fetch the most recent 20 real-time data entries from the mongoDB database for a particular stock or crypto and display that in a table.
- The table should be dynamic and should be updating its values in real-time according to new data.
- Include a button to a modal/popup that allows you to change the stock or crypto.

## Demonstration

https://drive.google.com/file/d/1Sx21SFut3es8iEPAs-4vQ10fmyiRcflE/view?usp=drive_link


## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- Node.js (>= 14.x)
- npm (>= 6.x)

Note : If you don't have the require setup,
you can follow docker setup given at the end of this file


### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vold-la/realtime-price-data.git
   cd realtime-price-data
   ```

2. Install the dependencies in respective folders (backend & frontend):
   
   cd backend
   ```sh
   npm install
   ```

   cd frontend
   ```sh
   npm install
   ```

### Running the backend

1. cd backend

2. Build the project:
   ```sh
   npm run build
   ```

3. Start the project:
   ```sh
   npm run start
   ```
The project should now be running at `http://localhost:4005`.


### Running the frontend

1. cd frontend

2. Build the project:
   ```sh
   npm run build
   ```

3. Start the project:
   ```sh
   npm run start
   ```

   OR run locally

   ```sh
   npm run dev
   ```

The project should now be running at `http://localhost:3000`.

## Docker setup
 
 1. cd into respective folders
 2. Build the image
 ```sh
docker build -t <your-app-name> .
 ```
3. Run the Image

For backend

```sh
docker run -p 4005:4005 <your-app-name> -d
 ```

For frontend 

```sh
docker run -p 3000:3000 <your-app-name> -d
 ```



## Contact

If you have any questions or feedback, please reach out to me at [parwez.inf77@gmail.com].