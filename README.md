# printrAssignment

*For admin login use:

user: 'david'

pw: 'david'


Back­end developer assignment 1

Some background

As you might now, a big part of the FORMIDE system is the API which is running in Google’s
compute cloud and is written in node.js with the Express framework. We use MongoDB for our
database storage and Google Cloud Storage to store 3D files, machine codes and images.

We have several features that we want to add to the API in the near future. One of them is a
featured section on the ‘discover’ page. This featured section will show hand­picked featured
apps, 3D files and accounts. For this, the following needs to be integrated in our system:

● Endpoints to fetch the current featured items:

○ Endpoint to get a list of all active featured items that have a type ‘app’, ‘account’
or ‘modelfile’

○ Endpoint to get a list of all previous featured items (admin only) to see the history

○ Endpoints to add, edit or de­activate featured items (admin only).

Typically, a featured item will have the following properties:

● Name
● Tags
● Image(s)
● User (with username, profile image)
● Publish date

The assignment

Create a small example to explain how you would solve this problem. Setup a small node.js
server with Express, add the endpoints, connect it to some example MongoDB models (we
recommend the Mongoose ODM for that) and maybe even create a small interface to show the
results.

Feel free to add or change anything in this assignment to show your knowledge in
programming, design, etc. Surprise us!
