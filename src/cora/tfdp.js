import * as d3 from 'd3'

export function tfdp() {
    var nodes,
        node,
        random,
        alpha,
        xScaleFactor = 1.0,
        yScaleFactor = 1.0,
        Degree = 2.0,
        strength = -1.0,
        strengths,
        distanceMin2 = 1,
        distanceMax2 = Infinity,
        theta2 = 0.81;

  function x(d) {
    return d.x;
  }

  function y(d) {
    return d.y;
  }
  var quadtree = d3.quadtree;
  function force(_) {
    //   console.log(alpha);
    var i, n = nodes.length, tree = quadtree(nodes, x, y).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = strength;
  }


function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
    //   do strength += strengths[q.data.index];
    //   while (q = q.next);
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
}


function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y,
        r = yScaleFactor / Math.pow((1 + xScaleFactor * l),Degree);
        // r = 1.0 /l;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        // if (x === 0) x = jiggle(random), l += x * x;
        // if (y === 0) y = jiggle(random), l += y * y;
        // if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        // r = 1.0 /l;
        node.vx += x * quad.value * alpha * r;
        node.vy += y * quad.value * alpha * r;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    // if (quad.data !== node || quad.next) {
    //   if (x === 0) x = jiggle(random), l += x * x;
    //   if (y === 0) y = jiggle(random), l += y * y;
    //   if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    // }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha * r ;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }


  force.initialize = function(_nodes) {
    nodes = _nodes;
    // random = _random;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : (+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  force.xScaleFactor = function(_){
    return arguments.length ? (xScaleFactor = _, force) : xScaleFactor;
  }

  force.yScaleFactor = function(_){
    return arguments.length ? (yScaleFactor = _, force) : yScaleFactor;
  }

  force.Degree = function(_){
    return arguments.length ? (Degree = _, force) : Degree;
  }

  return force;
}

