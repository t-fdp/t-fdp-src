<template>
    <div id="ForceD3">
        {{nowFileName}}
    </div>
    
</template>

<script>
import * as d3 from 'd3'

// import example1 from '../data/example1.json'
// import example2 from '../data/example1.json'
// import example3 from '../data/example1.json'

var width = 800
var height = 600
// miserables = FileAttachment("../data/example0.json").json()
export default {
  name: 'ForceD3',
  props:{
      filename:String,
      nodestrength:Number,
      linkstrength:Number,
  },

  mounted () {

  },

  data () {
    return {      
        data: {},
        nowFileName : this.filename,
        nodeStrength: 0.1,
        linkStrength:0.1
    }
  },
  components: {},
  methods:{
        ForceGraph({
            nodes, // an iterable of node objects (typically [{id}, …])
            links // an iterable of link objects (typically [{source, target}, …])
        }, {
            nodeId = d => d.id, // given d in nodes, returns a unique identifier (string)
            nodeGroup, // given d in nodes, returns an (ordinal) value for color
            nodeGroups, // an array of ordinal values representing the node groups
            nodeTitle, // given d in nodes, a title string
            nodeFill = "currentColor", // node stroke fill (if not using a group color encoding)
            nodeStroke = "#fff", // node stroke color
            nodeStrokeWidth = 1.5, // node stroke width, in pixels
            nodeStrokeOpacity = 1, // node stroke opacity
            nodeRadius = 5, // node radius, in pixels
            nodeStrength,

            linkSource = ({source}) => source, // given d in links, returns a node identifier string
            linkTarget = ({target}) => target, // given d in links, returns a node identifier string
            linkStroke = "#999", // link stroke color
            linkStrokeOpacity = 0.6, // link stroke opacity
            linkStrokeWidth = 1.5, // given d in links, returns a stroke width in pixels
            linkStrokeLinecap = "round", // link stroke linecap
            linkStrength,

            colors = d3.schemeTableau10, // an array of color strings, for the node groups

            width = 640, // outer width, in pixels
            height = 400, // outer height, in pixels
            invalidation // when this promise resolves, stop the simulation
        } = {}) {
        // Compute values.
            console.log(nodeId)
            console.log(nodeGroup)
            const N = d3.map(nodes, nodeId).map(intern);
            console.log(N)
            const LS = d3.map(links, linkSource).map(intern);
            const LT = d3.map(links, linkTarget).map(intern);
            if (nodeTitle === undefined) nodeTitle = (_, i) => N[i];
            const T = nodeTitle == null ? null : d3.map(nodes, nodeTitle);
            const G = nodeGroup == null ? null : d3.map(nodes, nodeGroup).map(intern);
            const W = typeof linkStrokeWidth !== "function" ? null : d3.map(links, linkStrokeWidth);
            const L = typeof linkStroke !== "function" ? null : d3.map(links, linkStroke);


            // Replace the input nodes and links with mutable objects for the simulation.
            nodes = d3.map(nodes, (_, i) => ({id: N[i]}));
            
            links = d3.map(links, (_, i) => ({source: LS[i], target: LT[i]}));

            console.log(nodes)
            console.log(links)

            // Compute default domains.
            if (G && nodeGroups === undefined) nodeGroups = d3.sort(G);

            // Construct the scales.
            const color = nodeGroup == null ? null : d3.scaleOrdinal(nodeGroups, colors);

            // Construct the forces.
            const forceNode = d3.forceManyBody();
            const forceLink = d3.forceLink(links).id(({index: i}) => N[i]);
            if (nodeStrength !== undefined) forceNode.strength(nodeStrength);
            if (linkStrength !== undefined) forceLink.strength(linkStrength);

            const simulation = d3.forceSimulation(nodes)
                .force("link", forceLink)
                .force("charge", forceNode)
                .force("center",  d3.forceCenter())
                .on("tick", ticked);

            
            const svg = d3.create("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("viewBox", [-width / 2, -height / 2, width, height])
                .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
                // .attr("id", "mygraphsvg");
                

            
            const link = svg.append("g")
                .attr("stroke", typeof linkStroke !== "function" ? linkStroke : null)
                .attr("stroke-opacity", linkStrokeOpacity)
                .attr("stroke-width", typeof linkStrokeWidth !== "function" ? linkStrokeWidth : null)
                .attr("stroke-linecap", linkStrokeLinecap)
                .selectAll("line")
                .data(links)
                .join("line");

            const node = svg.append("g")
                .attr("fill", nodeFill)
                .attr("stroke", nodeStroke)
                .attr("stroke-opacity", nodeStrokeOpacity)
                .attr("stroke-width", nodeStrokeWidth)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", nodeRadius)
                .call(drag(simulation));

            if (W) link.attr("stroke-width", ({index: i}) => W[i]);
            if (L) link.attr("stroke", ({index: i}) => L[i]);
            if (G) node.attr("fill", ({index: i}) => color(G[i]));
            if (T) node.append("title").text(({index: i}) => T[i]);
            if (invalidation != null) invalidation.then(() => simulation.stop());

            function intern(value) {
                return value !== null && typeof value === "object" ? value.valueOf() : value;
            }

            function ticked() {
                link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

                node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
            }

            function drag(simulation) {    
                function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
                }
                
                function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
                }
                
                function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
                }
                
                return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
            }

            return Object.assign(svg.node(), {scales: {color}});
        },

      getData(name) {
       
          this.$axios.get("./../../static/data/" + name + ".json")
          .then(result => {
              console.log("d3 getdata", result.data)
              this.data = result.data
          })
          .catch(error=>{
              console.log(error)
          })

      },

      render(ns, ls) {
        //   console.log("here!!!")
          if(Object.keys(this.data).length !== 0) {
              console.log("enter")
              console.log("data", this.data)
            var chart = this.ForceGraph(this.data, {
                nodeId: d => d.id,
                nodeGroup: d => d.group,
                nodeTitle: d => `${d.name}\n${d.group}`,
                // linkStrokeWidth: l => Math.sqrt(l.value),
                width,
                height: 600,
                invalidation :null,// a promise to stop the simulation when the cell is re-run
                // nodeStrength:ns,
                // linkStrength:ls
            })

            // console.log(chart)
            // console.log(document.getElementById("MyGraph").innerHTML)
            // 拿到待删除节点:
            var parent = document.getElementById('ForceD3');
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild)
            }
            document.getElementById("ForceD3").appendChild(chart)
          }
          
      },
  },
  watch:{
      filename(val, oldval) {
        this.nowFileName = val
        console.log(val)

        this.getData(this.nowFileName)

      },

      data(val, oldval) {
          console.log(val)
        //   this.render()
        this.render(this.nodeStrength, this.linkStrength)
      },

      nodestrength(val, oldval) {
          
          this.nodeStrength = val
          console.log("d3node", this.nodeStrength)

          this.render( this.nodeStrength, this.linkStrength)
      },
      linkstrength(val, oldval) {
          
          this.linkStrength = val
          console.log("d3link", this.linkStrength)

          this.render( this.nodeStrength, this.linkStrength)
      }

  }
}
</script>
<style>

</style>
