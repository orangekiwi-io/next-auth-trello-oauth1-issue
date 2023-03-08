import NextAuth from "next-auth"

const scope = 'read,write';
const expiration = '1hour';
const requestURL = 'https://trello.com/1/OAuthGetRequestToken';
const accessURL = 'https://trello.com/1/OAuthGetAccessToken';
const authorizeURL = 'https://trello.com/1/OAuthAuthorizeToken';
const profileUrl = 'https://api.trello.com/1/members/me/';

export const authOptions = {
  providers: [
    {
      id: "trello",
      name: "Trello",
      type: "oauth",
      version: "1.0",  // try both 1.0 and 1.0A
      authorization: authorizeURL,
      // authorization: {
      //   url: authorizeURL,
      //   params: {
      //     scope,
      //     expiration
      //   },
      // },
      accessTokenUrl: accessURL,
      requestTokenUrl: requestURL,
      profileUrl,
      profile: (profile) => {
        return {
          id: profile.id,
          avatarUrl: profile.avatarUrl,
          fullname: profile.fullname,
          username: profile.username
        }
      },
      clientId: process.env.TRELLO_APIKEY,
      clientSecret: process.env.TRELLO_APISECRET
    }
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    strategy: "database",
    maxAge: 60 * 60, // 1 hour in seconds
    updateAge: 24 * 60 * 60, // 1 day in seconds
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('*** SIGIN callback');
      console.log('*** user');
      console.log(user);

      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  }
}

export default NextAuth(authOptions)