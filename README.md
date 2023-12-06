[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-718a45dd9cf7e7f842a935f5ebbe5719a5e09af4491e668f4dbf3b35d5cca122.svg)](https://classroom.github.com/online_ide?assignment_repo_id=12989914&assignment_repo_type=AssignmentRepo)
# Traveling Salesperson Problem -- Local Search

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The 2-opt algorithm for solving the Traveling Salesperson Problem is a
randomized local search algorithm that, at each iteration, reverses part of the
route. It starts with a random route (this is the randomized part), and changes
part of the route in each step (this is the local search part, sprinkled with
more randomness). The pseudocode for one iteration is as follows:

```javascript
2optSwap(route, i, k)
  cities 1 to i-1 stay in the order they are
  cities i to k are reversed
  cities k + 1 to n stay in the order they are
```

For example, if I call the above function with route A--B--C--D--E--F, $i=2$,
$k=4$, the resulting route is A--B--E--D--C--F.

The algorithm starts with a random route; if the new route at the end of an
iteration decreases the total length, it is retained as the current incumbent.
The incumbent after the final iteration is returned as the solution.

Implement the 2-opt algorithm, which repeatedly runs the above steps. Your
implementation needs to fix two design parameters that I have left open. First,
you need to design a stopping criterion -- when would it make sense to stop and
return the shortest route found so far rather than trying another iteration?
Second, design a way to choose $i$ and $k$ -- note that they need to be
different in subsequent iterations, as one iteration would simply undo what
the previous one did otherwise. Start with the template I provided in `code.js`.
Describe in your code how you designed your stopping criterion and ways of
choosing $i$ and $k$ and why.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

## Runtime Response

### Time Complexity

I have opted to do this in pieces so as to simplify the complexity. The asymptotic complexity of optSwap is $\Theta(\frac{k-i}{2})$ where k and i are their respective parameters within the function, $k-i$ represents the length of the section to be reversed. From here on out this length will be represented as $j$, hence $k-i=j$. It is divided by 2 because $k$ and $i$ are decremented and incremented, respectively, at the same time.

The asymptotic complexity of routeCost is much simpler as it increments through all the vertices, excluding one, once so it is $\Theta(|V|)$ The one is not subtracted here because it makes little difference to asymptotic complexity.

Finally, we must take a look at the bulk of our tsp_ls function. For the worst case complexity, focusing on our inner for-loop where the bulk of the work is done, we expect that the length of the section we are swapping will grow to the length of the route. And it always starts at $1$. We will use $j$ to represent the length of the swapped section of the route for the sake of simplicity as above. This loop is best represented as a sum for now: $$\sum_{j=1}^{|V|}\frac{j}{2}$$

Going through the whole function in order, we begin with two loops that run for the number of nodes, both complexity $\Theta(|V|)$, followed by the initial run of routeCost, another $\Theta(|V|)$. Then we get to our outer for-loop that runs 3 times, and we will leave it as three for now, within which is our sum accompanied by routeCost that will run as many times as the sum which will run $|V|$ times, but routeCost's complexity won't change so we will put it as $|V|^2$ and just add it to the sum. At this step our current complexity is:
$$\Theta(3|V|+3((\sum_{j=1}^{|V|}\frac{j}{2})+|V|^2))$$
Now we can ignore constants including $\frac{1}{2}$ inside the summation because it can be removed.
$$\Theta(|V|+(\sum_{j=1}^{|V|}j)+|V|^2)$$
Using a summation formula we can turn our sum into:
$$\Theta(|V|+\frac{|V|(|V|-1)}{2}+|V|^2)$$
We simplify again:
$$\Theta(|V|^2+|V|+\frac{|V|^2-|V|}{2})$$
We will ignore constant multiples again to get:
$$\Theta(|V|^2+|V|+|V|^2-|V|)$$
And simplify:
$$\Theta(2|V|^2+2|V|)$$
And again:
$$\Theta(|V|^2+|V|)$$
And ignoring lower order functions we get:
$$\Theta(|V|^2)$$

### Memory Complexity

Memory complexity is a lot simpler in the case of this algorithm. It is not memoized so though there are several things that will be influenced by the input, none of them beyond just being the length of the input. Several times in this program arrays are created with lengths equal to the number of nodes in the graph. That is the largest memory needed for this program which would be some constant $C$ to represent how many of these arrays there are, times the number of nodes, thus with constants our complexity would be $\Theta(C|V|)$ then ignoring constants we get $\Theta(|V|)$

## Sources: 

https://ms.uky.edu/~123/lecturenotes/Chapter9_answers.pdf
