# The social networking website Bluedit (the clone of reddit)

## Firebase

It uses Firebase's Firestore as a datastore.
In order to run it properly you need to save [Firebase](http://firebase.google.com)'s Firebase Admin SDK's configuration file to the root directory's **.local_config** folder with the name **firebase.json**

## Test

To run tests

```
yarn test
```

To run specific test

```
yarn test UserDao
```

To run React test

```
yarn test:ui
```
