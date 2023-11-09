<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/oslabs-beta/PayStream">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">PayStream</h3>

  <p align="center">
    Paystream is a Next.js application designed to streamline financial management for a non-profit client.
    <br />
    <a href="https://github.com/oslabs-beta/PayStream"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/oslabs-beta/PayStream">View Demo</a>
    ·
    <a href="https://github.com/oslabs-beta/PayStream/issues">Report Bug</a>
    ·
    <a href="https://github.com/oslabs-beta/PayStream/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![NextJS][NextJs]][NextJS-url]
* [![React][React.js]][React-url]
* [![JavaScript][JavaScript]][JavaScript-url]
* [![Typescript][TS.js]][TS-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![][Git]][Git-url]
* [![Jest][Jest]][Jest-url]
* [![AWS][AWS]][AWS-url]
* [![Docker][Docker]][Docker-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before using this application, make sure you have the following in place:

1. **Stripe Account:** You’ll need a Stripe account to connect to the payment gateway and manage donations.
2. **Salesforce Account:** You must have a Salesforce account with the necessary permissions to set up the integration.
3. **Web Server:** This application requires a web server to host the integration. You can use a cloud service like AWS, Google Cloud, or Heroku.
4. **API Keys:** Obtain API keys from both Stripe and Salesforce for secure communication between the systems.

### Installation

1. Get your publishable and secret Stripe API Keys at: [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Get your Salesforce access token by following the following steps: [https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_jwt_flow.htm&type=5](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_jwt_flow.htm&type=5)
3. Clone the repo
   ```sh
   git clone https://github.com/oslabs-beta/PayStream.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Enter your JWT Secret into the `.env` file:
   ```js
     JWT_SECRET = 'ENTER YOUR JWT SECRET';

   ```
6. Enter your Salesforce Authentication information into the `.env` file:
   ```js
    SALESFORCE_GRAPHQL_URI = '[YOUR SALESFORCE INSTANCE]/services/data/v58.0/graphql'
    SALESFORCE_COOKIE_AUTH = 'ENTER YOUR SALEFORCE COOKING AUTHORIZATION'
    SALESFORCE_LOGIN_URL = 'ENTER YOUR SALESFORCE LOGIN URL'
    SALESFORCE_AUTH_TYPE = oauth-client-credentials
    SALESFORCE_USERNAME = 'ENTER YOUR SALESFORCE USERNAME'
    SALESFORCE_PASSWORD = 'ENTER YOUR SALESFORCE PASSWORD'
    SALESFORCE_ORG_ID = 'ENTER YOUR SALESFORCE ORGANIZATION ID'
    PUB_SUB_ENDPOINT = api.pubsub.salesforce.com:7443
    SALESFORCE_CLIENT_ID = 'ENTER YOUR SALESFORCE CLIENT ID'
    SALESFORCE_CLIENT_SECRET = 'ENTER YOUR SALESFORCE CLIENT SECRET'
    BASE64_PRIVATE_KEY = 'ENTER YOUR BASE64 PRIVATE KEY'
   ```
   
7. Enter your Stripe Authentication informatino into the `.env` file:
   ```js
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'ENTER YOUR STRIPE PUBLIC KEY';
   STRIPE_SECRET_KEY = 'ENTER YOUR STRIPE SECRET KEY';
   STRIPE_ENDPOINT_SECRET = 'ENTER YOUR STRIPE ENDPOINT SECRET'
   ```
   
8. Enter your Clerk Authentication informatino into the `.env` file:
   ```js
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = 'ENTER YOUR CLERK PUBLIC KEY';
    CLERK_SECRET_KEY = 'ENTER YOUR CLERK SECRET KEY';
    
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   ```
   
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Configuration
1. **Stripe Integration:**
   - Go to your Stripe dashboard and obtain your API keys.
   - Update the `.env` file with your Stripe API keys.
   - Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/webhooks) and generate your Stripe endpoint for your application. 
2. **Salesforce Integration:**
   - Obtain Salesforce API credentials (Consumer Key, Consumer Secret, Username, and Password).
   - Update the `.env` file with your Salesforce API credentials.
   - The queries are mapped to custom payment records for a specific client and will need to be refactored to your application specific needs. 
3. **Webhook Setup:**
   - Configure webhooks in Stripe to send events to your application’s endpoint.
   - Use a service like ngrok to create a secure tunnel to your local server or set up SSL on your production server.
4. **Customization:**
   - Modify the application to match your nonprofit’s specific Salesforce objects, fields, and donation processing logic.

<!-- USAGE EXAMPLES -->
## Demo

USE THIS SPACE FOR DEMO OF PROJECT GIF


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Email Us: paystreamdevops@gmail.com

Project Link: [https://github.com/oslabs-beta/PayStream](https://github.com/oslabs-beta/PayStream)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



## Authors
| Developed By |                                                                     Github                                                                      |                                                                   LinkedIn                                                                    |
| :----------: | :---------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|  Chandler Charity  |    [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lcchrty)    | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/chandlerchrty/) |
| Julia Xin | [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/juliazlx) |
|  Liam Hodges  |  [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/lhodges3)   | [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/liam-p-hodges/) |
| Robert Hoover  |  [![Github](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Gambarou)   |  [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/roberthoover00/)   |



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/oslabs-beta/PayStream.svg?style=for-the-badge
[contributors-url]: https://github.com/oslabs-beta/PayStream/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/oslabs-beta/PayStream.svg?style=for-the-badge
[forks-url]: https://github.com/oslabs-beta/PayStream/network/members
[stars-shield]: https://img.shields.io/github/stars/oslabs-beta/PayStream.svg?style=for-the-badge
[stars-url]: https://github.com/oslabs-beta/PayStream/stargazers
[issues-shield]: https://img.shields.io/github/issues/oslabs-beta/PayStream.svg?style=for-the-badge
[issues-url]: https://github.com/oslabs-beta/PayStream/issues
[license-shield]: https://img.shields.io/github/license/oslabs-beta/PayStream.svg?style=for-the-badge
[license-url]: https://github.com/oslabs-beta/PayStream/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://reactjs.org/
[TS.js]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TS-url]: https://www.typescriptlang.org/
[JavaScript]: https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E
[JavaScript-url]: https://www.javascript.com/
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Git]: https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white
[Git-url]: https://git-scm.com/
[Tailwind]: https://img.shields.io/badge/Tailwind-%231DA1F2.svg?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[NextJS]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[NextJS-url]: https://nextjs.org/
[AWS]: https://img.shields.io/badge/AWS-%231E73BE.svg?style=for-the-badge&logo=amazon-aws&logoColor=white:
[AWS-url]: https://aws.amazon.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
