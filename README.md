# Server List Application

Simple React project made using React, TypeScript and Vite.

Features two pages: 
* Login form
* Table displaying list of servers.

To launch the project, set up a local .env file with the necessary variables provided in the example. Locally run the following command:

```
npm run dev
```

## Tools
### Vite

Project is built using Vite. Provides the project with a easy to use config and faster build times.

### React Context

Used for authentication. Created `AuthContext` that stores the token provided from the API. Components wrapped with `AuthProvider` have access to the token and any related methods.

Tokens are stored as cookies instead of localStorage due to safety reasons (less vulnerability to XSS attacks).

### React Query

Used for easier data fetching/caching.
Created `useMutation` hook for fetching the token that is later managed by `AuthContext`.
Created `useQuery` hook for fetching the server list. This is called immediately within the `Servers` component, due to it only being necessary for that scope.

Set `refetchOnWindowFocus` by default to false in order to not overload the application with calls to the API.

### React Router

Basic router setup that initially directs the user to the `/login`. Within `ProtectedRoute`, we check for a token. If available, the router navigates us to `/servers`. It's also used as our index path.

### Vitest + React Testing Library

While Jest is the more established testing framework, it's simply easier to integrate Vitest with Vite. Vitest combined with React Testing Library provides developers with more than enough necessary tools to test the user experience properly.

Test can run using the following command:

```
npm run test
```

## Further improvements

* Add an option for the user to choose how many pages are displayed.
* Add a page not found screen.
* Refactor Table for further customisability. Would prefer the developer to configure headers/rows manually.
