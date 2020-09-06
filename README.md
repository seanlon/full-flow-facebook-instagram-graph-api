# full-flow-facebook-instagram

A framework for helping others connect to v8 graph api facebok login,graphapi and access and also grab the instagram access linked to it.
Use javascript and v8 graph api to integrate facebook login and grab facebook account information like page account information and then get the instagram account information like the id, followers, followers count, media posts, likes,comments,insights impression, viewers. It is the full flow that can help you start using simple javascript.
Full Flow Facebook Instagram example .

1. Start example

   ```
   npm install

   ```

   then

   ```
   npm run generate-cert

   ```

   then

   ```
   npm run start

   ```

2. Configure
   In `examples/flow-example.html` , Change your client profile and appid
   ```
      const appId = "your-app-id"; // change-here
      const clientToken = "your-client-token"; // change-here`
   ```

3) Verify
   `Go Browser - https://localhost:4200/examples/flow-example.html`
   `Press login button and login`

4) Pre-requisites:

- Correct app settings and correct appId and appToken.
- Testing account - facebook account with linked facebook page that links to instagram business acount.
- https://youtu.be/cMv6cCi-x-E for video info...
