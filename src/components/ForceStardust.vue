<template>
    <div id="ForceStardust">
        <!-- {{nowFileName}} -->
        <h2>force-directed layout </h2>
        <canvas id="forceStar"></canvas>
        <div class="fps"></div>
    </div>
    
</template>

<script>
import * as d3 from 'd3'
// import { FPS } from "../cora/utils";
// import * as Stardust from 'stardust-core'

// import example1 from '../data/example1.json'
// import example2 from '../data/example1.json'
// import example3 from '../data/example1.json'

var width = 800
var height = 600
// miserables = FileAttachment("../data/example0.json").json()
export default {
//   name: 'ForceD3',
  name :'ForceStardust',
  props:{
      filename:String,
      nodestrength:Number,
      linkstrength:Number,
      gravity:Number,
      charge:Number,
      linkdistance:Number,
      filedata:Object,
      
  },

  mounted () {
      this.canvas = document.getElementById("forceStar")

      this.platform = Stardust.platform("webgl-2d", this.canvas, this.width, this.height)
    //   this.platform.pixelRatio = window.devicePixelRatio || 1;

      this.snodes = Stardust.mark.create(Stardust.mark.circle(10), this.platform)
      this.sedges = Stardust.mark.create(Stardust.mark.line(), this.platform);

      this.colors = this.colors.map(x => [x[0] / 255, x[1] / 255, x[2] / 255, 1]);

    //   this.fps = new FPS();

  },

  data () {
    return {      
        data: {},
        nowFileName : this.filename,
        nodeStrength: 0.1,
        linkStrength:0.1,
        canvas: {},
        width:738,
        height:738,
        platform:{},
        snodes:{},
        snodesBG:{},
        snodesSelected:{},
        sedges:{},
        // colors:{},
        requested: null,
        fps:{},
        colors :[
        [31, 119, 180],
        [255, 127, 14],
        [44, 160, 44],
        [214, 39, 40],
        [148, 103, 189],
        [140, 86, 75],
        [227, 119, 194],
        [127, 127, 127],
        [188, 189, 34],
        [23, 190, 207],
        [127, 103, 39],
        [220, 20, 60],
        [250, 128, 114],
        [255, 0, 255],
        [255, 228, 181],
        [255, 215, 0],
        [0, 128, 114],
        [112, 128, 144],
        [30, 144, 255],
        [128, 70, 0],
        ],

        force:{},
        iter: 0,
    }
  },
  components: {},
  methods:{

    runSelect(val) {
        this.alpha = 1.00;
        this.iter = 0;
        this.RunSimulation();
    },
    getData(name) {
// console.log("my get data ing")
       
          this.$axios.get("./../../static/data/" + name + ".json")
          .then(result => {
              this.data = result.data
              console.log(" 2 force getdata", this.data)
          })
          .catch(error=>{
              console.log(error)
          })

    },

    RunSimulation() {
// console.log("my", this.data.nodes)
      this.nodes = this.data.nodes;
      this.nodes.map(d => (d.id = d.name));

      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].index = i;
      }

      this.links = this.data.links;
      this.links.map(d => (d.idsrc = d.source, d.idtgt = d.target));
      this.links.map(d => (d.source = this.nodes[d.idsrc], d.target = this.nodes[d.idtgt]));

      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].index = i;
        this.nodes[i].x = Math.random() * this.width;
        this.nodes[i].y = Math.random() * this.height;
      }

    // this.snodes.attr("radius", 2).attr("color", d => this.colors[d.cluster]);

    // this.sedges.attr("width", 0.5).attr("color", d => {
    //   if (d.source.cluster == d.target.cluster) return this.colors[d.source.cluster].slice(0, 3).concat([0.1]);
    //   return [0.5, 0.5, 0.5, 0.1];
    // });
    this.sedges.attr("color", [192.0 / 256, 192.0 / 256, 192.0 / 256, 0.5]);

    this.force = d3
      .forceSimulation()
      .force(
        "link",
        d3.forceLink().id(function(d) {
          return d.index;
        })
      )
      .force("charge", d3.forceManyBody())
      .force("forceX", d3.forceX(this.width / 2))
      .force("forceY", d3.forceY(this.height / 2));

    this.force.nodes(this.nodes);
    this.force.force("link").links(this.links);

    this.force.force("forceX").strength(0.5);
    this.force.force("forceY").strength(0.5);
    this.force.force("link").distance(1);
    this.force.force("link").strength(0.05);
    this.force.force("charge").strength(-100);


    var positions = Stardust.array("Vector2")
      .value(d => [d.x, d.y])
      .data(this.nodes);


    var positionScale = Stardust.scale.custom("array(pos, value)").attr("pos", "Vector2Array", positions);
    
    this.snodes.attr("radius", 7.5).attr("color", d => this.colors[d.group % 20]);
    this.snodes.attr("center", positionScale(d => d.index));

    
    this.sedges.attr("p1", positionScale(d => d.source.index));
    this.sedges.attr("p2", positionScale(d => d.target.index));

    
    this.snodes.data(this.nodes);
    this.sedges.data(this.links);

    this.force.on("tick", () => {     
      positions.data(this.nodes);
      this.requestRender();
    });

    this.requestRender();

      
    },

    requestRender() {
      if (this.requested) return;
    //   this.iter = 0;
      this.requested = requestAnimationFrame(this.render);
    },

    render() {
        this.requested = null;
        this.sedges.render();
        this.snodes.render();
        this.force.alphaTarget(1).restart();
        this.iter = this.iter + 1;
        // console.log("iter", this.iter);
        if(this.iter>400) {
            this.force.stop()
        }
       
    },

    changeAttr(attr, d) {
        this.iter = 0;
        if (attr == "gravity") {
          this.force.force("forceX").strength(d);
          this.force.force("forceY").strength(d);
        }
        if (attr == "linkDistance") {
          this.force.force("link").distance(d);
        }
        if (attr == "linkStrength") {
          this.force.force("link").strength(d);
        }
        if (attr == "charge") {
          this.force.force("charge").strength(d);
        }
        this.force.alphaTarget(0.3).restart();
    }

      
  },
  watch:{
      filedata(val, oldval) {
          console.log("传数据",val)
          this.data = val
      },

      filename(val, oldval) {
        this.nowFileName = val
        console.log(val)

        this.getData(this.nowFileName)

      },
      

      data(val, oldval) {
        //   console.log(val)
        //   this.render()
        this.runSelect()
      },

      gravity(val, oldval) {

          this.changeAttr("gravity", val);
      },
      charge(val, oldval) {

          this.changeAttr("charge", val);
      },
      linkdistance(val, oldval) {

          this.changeAttr("linkDistance", val);
      },
      linkstrength(val, oldval) {
          
        //   this.linkStrength = val
        //   console.log("d3link", this.linkStrength)

        //   this.changeAttr("linkStrength", val);
          this.changeAttr("linkDistance", val);
      }

  }
}
</script>
<style>

</style>
