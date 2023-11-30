function tsp_ls(distance_matrix) {
    //From this comment to the next creates list that is a permutation of the nodes
    let nodes = [];
    let route = [];
    for(let i = 0; i < distance_matrix.length; i++)
        nodes[i] = i;
    for(let i = distance_matrix.length; i > 0; i--)
        route[i - 1] = nodes.splice(getRandomInt(i), 1);
    //I'm "The next"!

    let routeLen = routeCost(distance_matrix, route);
    let min = Infinity;
    for(let b = 0; b < 3; b++){ //Because the inner for loop takes a random number, this for loop gives it 3 chances to pick a good random index.
        for(let i = getRandomInt(distance_matrix.length - 1), k = i + 1, v = 0; i >= 0 && k < distance_matrix.length; v++){
            // i is selected randomly and k is chosen to be just above it.
            tempRoute = optSwap(route, i, k);
            let newRouteLen = routeCost(distance_matrix, tempRoute);
            if(routeLen > newRouteLen) {
                routeLen = newRouteLen;
                route = JSON.parse(JSON.stringify(tempRoute));
                i = getRandomInt(distance_matrix.length - 1); // If the new route with a reversed section is kept, the process restarts and a new i and k are selected.
                k = i                                         // k is set equal to i because one of them will immediately be changed in the following if statement.
            }
            if(v%2 == 0 || k == distance_matrix.length - 1) // i and k are increased and decreased accordingly so throughout the iterations they get stretched across
                i--;                                        // the entire route array.
            else if(v%2 == 1 || i == 0)
                k++;
        }
        if(routeLen < min)
            min = routeLen; // Here the smalles of the three attempts is collected.
    }
    return min;
}
//For the above function, since i and k are reset every time route is changed the idea is that the actual ending conditions for the inner for loop will
//only be hit if k and i get to the point were they stretch across the whole array without changing anything. It is kind of like bubble sort in how it ends when
//goes through the whole array without any changes.

function optSwap(route, i, k) {
    let temp = -1;
    let reRoute = JSON.parse(JSON.stringify(route))
    while(i < k) {
        temp = reRoute[i];
        reRoute[i] = reRoute[k];
        reRoute[k] = temp;
        i++;
        k--;
    }
    return reRoute;
}

function routeCost(distance_matrix, route){
    let sum = 0;
    for(let i = 0; i < distance_matrix.length - 1; i++){
        sum += distance_matrix[route[i]][route[i+1]]
    }
    return sum;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  // Random function sourced from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
