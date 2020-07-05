# AWS Lambda Requester

👉 Give your website a proper poke from AWS Lambda

🔄 Useful for forcing a refresh of a cache. For example, you have an Amazon CloudFront distribution with a near-86400 second expiry on a low traffic site and want users to always get a fast cached version. Simply point this Lambda at the site, and invoke it every day.

## Usage

1. [Download this repository as a zip](https://github.com/domdomegg/aws-lambda-requester/archive/master.zip)
2. Upload it to AWS Lambda as a Node.js function
3. Set the memory to ≥ 512 MB (or you'll get ENOMEM errors)
4. Set a long-ish timeout, depends on your site but probably a minute will do
5. Set the `URLS` environment variable to a comma seperated list of URLs you want the function to hit
6. Test it out - for this you can invoke it with a blank test event, one with a body like `{}`
7. (optional) To run on a schedule, add an Amazon EventBridge cron rule to invoke it with a body of `{}`

## Questions

> You idiot, why have you committed `node_modules`? This be excluded from the repository!!!111one

This is so that you can download this repository as a zip and upload it straight to AWS Lambda, as it needs the dependencies to function.

> I don't trust your dependencies. How can I build this from scratch?

1. Clone this repository
2. `npm ci` (this removes and recreates `node_modules`)
3. Zip everything and upload it to AWS

> Why near-86400 second instead of 86400 second expiry in your example?

If the expiry is exactly one day, the function must run at the exact same time each day to cause a refresh. For example:
- Day 1, makes request at 1:02am, updates cache
- Day 2, makes request at 1:01am, does not update cache as it expires at 1:02am this day

So if you run the Lambda on a schedule, set the CloudFront expiry to be slightly shorter - e.g. 86100 seconds (23 hours, 55 minutes)

> Why not use curl/https/request/axios/<insert your favourite networking library here>?

Most of these will request the source document (the HTML), but not get all the resources necessary to load your site (like images, CSS, JS).

Using `chrome-aws-lambda` and `puppeteer` allows the function to properly poke your website.

> I've found something wrong or I can improve this

Yay! Raise an [issue](https://github.com/domdomegg/aws-lambda-requester/issues) or [PR](https://github.com/domdomegg/aws-lambda-requester/pulls) and I'll try to get back to you. Give me a poke if I don't.
