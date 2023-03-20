# SDK design

This SDK was designed with a class based architecture for having universal types of requests that can be extended for further parametrization when needed.

These classes contain the data structures, the data manipulation logic and the api calls based on this specific API's functionality.

Having this structure we can then have a simple sdk object initialization that returns an object with the functions needed to access the API which are typed based on said request classes. (src/index.ts)

Following this design the API logic remains in these class objects and during the sdk's initialization we need to define only the necessary endpoint specific parameters which will result in safer type enforcement, less code repetition and better code readability.
