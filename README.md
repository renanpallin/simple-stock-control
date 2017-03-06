# Simple Stock control
A simple stock control system made with react.

## This is a weekend study project
I've studing react and reading the docs, when I've found a little tutorial of made an simple list of products with an search bar - probably the component that inspired me the most to learn react (have you seen how fast is it?!) and I've decide make something a little more complex.
Was a very funny and profitable. Found some problems, resolved some probelms. A few I'd like to detach:

1. I've implemented an scheme in the ProductTable component, making him super reusable. So much that I use the same component with the Clients View and the Admin View.
2. One premise of this little project is that the names of the products have to be unique. The validation using the lastValidValue seens to be a great soluction, once improve the UX and protect the data on the same time.
3. There's an Debounce Pattern in send data to my API, and the responses if have sussed or have fail is unique for each product. See the implementation, I'm storing a key for every product to maintain the Debounce.

Obviously this cannot be safely use in production, specialy with a lot of clients at the same time, is just a study project. This offers me a great initial perspective for Lifting State Up in react.



Inspired by:
https://facebook.github.io/react/docs/thinking-in-react.html