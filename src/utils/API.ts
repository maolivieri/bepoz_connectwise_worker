import axios from "axios";

const api = axios.create({
  baseURL: "https://api-au.myconnectwise.net/v4_6_release/apis/3.0/",
  headers: {
    clientId: 'b0d388d6-558d-47ad-a6d1-716e83ad5e66"',
    "Content-Type": "application/json",
    Authorization:
      "Basic dmVjdHJvbis2ZlBVeHNpdzRVZWdBZmo5OlcyeDNrV0dTRFlUb21yVHM=",
  },
});

export { api };
