<template>
    <div id="MyGraph">
        <!-- {{nowFileName}} -->
        <!-- <h2>t-fdp layout </h2> -->
        <div id="selected-nodes">
            <span margin:20px> you can select the nodes! </span>
        </div>
        <canvas id="main-canvas"></canvas>

        <div class="sliders"></div>
    </div>
    
</template>


<script>
import * as d3 from 'd3'
// import * as Stardust from 'stardust-core'
// import * as Stardust from '../cora/stardust.bundle.min.js'
import {tfdp} from '../cora/tfdp'


var width = 800
var height = 600
// miserables = FileAttachment("../data/example0.json").json()
export default {
  name: 'MyGraph',
  props:{
      filename:String,
      nodestrength:Number,
      linkstrength:Number,

      mygraphk:Number,
      mygraphp:Number,
      mygraphaone:Number,
      mygraphatwo:Number,
      mygraphctwo:Number,

      filedata:Object,

      paraalpha:Number,
      parabeta:Number,
      paragamma:Number,
      parastepsize:Number,

      flagrun:Number,
      flaglocal:Number,




  },



  mounted () {
      this.repulforce = tfdp().strength(-1)
      this.canvas = document.getElementById("main-canvas")
// console.log("aaaaa",Stardust)
      this.platform = Stardust.platform("webgl-2d", this.canvas, this.width, this.height)
// console.log("aaaaa",Stardust)
      this.snodes = Stardust.mark.create(Stardust.mark.circle(10), this.platform)
      this.sedges = Stardust.mark.create(Stardust.mark.line(), this.platform);
    
      this.colors = this.colors.map(x => [x[0] / 255, x[1] / 255, x[2] / 255, 1]);

      this.snodesSelected = Stardust.mark.create(Stardust.mark.circle(8), this.platform);
      
     
  },

  data () {
    return {
        snodesSelected:{},
        selectedNode:null,
        runstop:0,   
       
        data: {},
        nowFileName : this.filename,
        nodeStrength: 0.1,
        linkStrength:0.1,
        a1:1,
        a2:1,


        debug : false,
        snodes : {},
        sedges : {},
        repulforce : {},

        width : 742,
        height : 742,
    
        nodes : [],
        links: [],
        counts : [],
        timer : d3.timer,
        cnt : 0,
        maxiter :400,
        K :2,
        p : 2.0,
        yScaleFactorAttr : 0.0,
        xScaleFactorAttr : 1.0,
        DegreeAttr : 1.0,
        yScaleFactorRep : 40.0,
        xScaleFactorRep : 1.0,
        DegreeRep : 2.0,
        fileid : 9,
        lr :20.0,


        renderScale : 1.0,
        
        stepper1:{},
        iter : 0,
        alpha : 1.0,
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
        
        canvas :{},
        platform :{},
        
        positions:{},
        pos:{},

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
        console.log("my get data ing")
       
          this.$axios.get("./../../static/data/" + name + ".json")
          .then(result => {
              this.data = result.data
              console.log("getdata", this.data)
          })
          .catch(error=>{
              console.log(error)
          })

    },

    RunSimulation() {
      this.nodes = this.data.nodes;
      this.nodes.map(d => (d.id = d.name));
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].index = i;
      }

      this.links = this.data.links;
      this.links.map(d => (d.idsrc = d.source, d.idtgt = d.target));
      this.links.map(d => (d.source = this.nodes[d.idsrc], d.target = this.nodes[d.idtgt]));
      this.counts = this.nodes.map(d => 0);
      for (var i = 0; i < this.links.length; i++) {
        var link = this.links[i], src = link.idsrc, tgt = link.idtgt;
        if (src == tgt) continue;
        this.counts[src]++;
        this.counts[tgt]++;
      }

      var initialRadius = 10,
        initialAngle = Math.PI * (3 - Math.sqrt(5));

      for (var i = 0, n = this.nodes.length, node; i < n; ++i) {
        node = this.nodes[i], node.index = i;
        if (node.fx != null) node.x = node.fx;
        if (node.fy != null) node.y = node.fy;
        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(i), angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
      }

      var pos = this.nodes.map(d => [d.x, d.y]);
      var renderScale = 1.0;
      this.positions = Stardust.array("Vector2")
        .value(d => d)
        .data(pos);

      var positionScale = Stardust.scale.custom("array(pos, value)").attr("pos", "Vector2Array", this.positions);
      var positionScale = Stardust.scale.custom("array(pos, value)").attr("pos", "Vector2Array", this.positions);

      this.snodes.attr("radius", 7.5).attr("color", d => this.colors[d.group % 20]);
      this.snodesSelected.attr("radius", 12).attr("color", [0 / 255, 0 / 255, 0 / 255, 1]);

      this.snodes.attr("center", positionScale(d => d.index));
      this.snodesSelected.attr("center", positionScale(d => d.index));

      this.sedges.attr("p1", positionScale(d => d.source.index));
      this.sedges.attr("p2", positionScale(d => d.target.index));
      this.sedges.attr("color", [192.0 / 256, 192.0 / 256, 192.0 / 256, 0.5]);
      this.snodes.data(this.nodes);
      this.sedges.data(this.links);
      this.Simulation();

      var that = this
      console.log("nodes:", this.nodes)
      this.canvas.onmousedown = function(e) {
        console.log(that.flaglocal)
        if(that.flaglocal == 1) {
            // var xs = that.nodes.map(d => d.x);
            // var ys = that.nodes.map(d => d.y);
            // var minx = d3.min(xs);
            // var miny = d3.min(ys);
            // var maxx = d3.max(xs);
            // var maxy = d3.max(ys);
            // var midx = (minx + maxx) / 2;
            // var midy = (miny + maxy) / 2;
            // var scale = Math.max(maxy - miny, maxx - minx) * 1.05;
            // that.renderScale = scale;

            var x = e.clientX - that.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.canvas.getBoundingClientRect().top;

            // var ini_x = x * that.renderScale / that.width + midx - that.renderScale / 2;
            // var ini_y = maxy - (y / that.height + 0.02) * that.renderScale;

            console.log("x y:", x, y)
            // console.log("ini x, y", ini_x, ini_y)
            console.log("ratio:", that.platform.pixelRatio)
            var tmin = 1123456789;
            var tmp = 0;
            // cons
            for(var i = 0; i < that.pos.length; i++) {
                var dist = (that.pos[i][0] - x)**2 + (that.pos[i][1] - y)**2;
                // console.log(dist);
                if (dist < tmin) {
                    tmp = i;
                    tmin = dist ;
                }
            }
            console.log("selected i:", tmp, that.nodes[tmp]);
            // var p = that.platform.getPickingPixel(x * that.platform.pixelRatio, y * that.platform.pixelRatio);
            // var p = that.platform.getPickingPixel(ini_x * that.platform.pixelRatio, ini_y * that.platform.pixelRatio);
            // var p = that.platform.getPickingPixel(x , y );
            console.log("selected p :", tmp)
            if (tmp) {
                that.selectedNode = that.nodes[tmp];
                console.log(that.selectedNode);
            }
            that.render();
        }
      };
        

    },

    Simulation() {
      var i = 0;
      this.repulforce.initialize(this.nodes);
      this.alpha = 1.0;
      this.stepper1 = d3.timer(this.step);
    },

    eval() {
      var res = 0;
      var N = this.nodes.length, E = this.links.length;
      var nodeto = Array(N);
      for (var i = 0; i < N; i++) {
        nodeto[i] = [];
      }
      for (var i = 0; i < E; i++) {
        var link = this.links[i], src = link.idsrc, tgt = link.idtgt;
        if (src == tgt) continue;
        nodeto[src].push(tgt);
        nodeto[tgt].push(src);
      }

      for (var i = 0; i < N; i++) {
        var distnodes = [];
        for (var j = 0; j < N; j++) {
          if (j != i) {
            var mx = this.nodes[i].x - this.nodes[j].x;
            var my = this.nodes[i].y - this.nodes[j].y;
            distnodes.push({ id: j, distance: mx * mx + my * my });
          }
        }
        distnodes.sort(function (a, b) { return a.distance - b.distance });
        if (this.debug) console.log(nodeto[i], distnodes);
        var templen = nodeto[i].length;
        var GSet = new Set();
        if (templen <= 0) continue;
        for (var k = 0; k < templen; k++) {
          GSet.add(nodeto[i][k]);
        }
        var inSet = new Set();
        var USet = new Set();
        // console.log(distnodes);
        for (var k = 0; k < templen; k++) {
          USet.add(distnodes[k].id);
          if (GSet.has(distnodes[k].id)) {
            inSet.add(distnodes[k].id);
          }
        }
        res += 1.0 * inSet.size / USet.size;
      }
      return res / N;
    },

    step() {

      this.SimulationStep(this.alpha);
      this.alpha += (0.01 - this.alpha) * 0.011446905343061142;
      this.alpha = Math.max(this.alpha, 0.01);
      if (this.iter >= this.maxiter) {
        this.stepper1.stop();
        //julie：send msg to parent vue
        this.runstop = 1;
        this.$emit('func',this.runstop)

        console.log(this.fileid, this.iter, this.eval());;
      }
      this.iter += 1;
    },

    SimulationStep(alpha) {
      this.repulforce.xScaleFactor(this.xScaleFactorRep).yScaleFactor(this.yScaleFactorRep).Degree(this.DegreeRep);
      this.repulforce(alpha);
      var i = 0, E = this.links.length;
      for (i = 0; i < E; i++) {
        var link = this.links[i], source = link.source, target = link.target, src = link.idsrc, tgt = link.idtgt;
        var cntsrc = this.counts[src], cnttgt = this.counts[tgt];
        var strength = 1.0 / Math.min(cntsrc, cnttgt);
        var b = 1.0 * cnttgt / (cntsrc + cnttgt);
        var x, y;
        x = target.x + target.vx - source.x - source.vx || this.jiggle();
        y = target.y + target.vy - source.y - source.vy || this.jiggle();
        var l = Math.sqrt(x * x + y * y);
        var r = this.yScaleFactorAttr / Math.pow((1 + this.xScaleFactorAttr * l * l), this.DegreeAttr) + this.K;
        r *= strength;
        source.vx += alpha * x * r * b;
        source.vy += alpha * y * r * b;
        b = 1 - b;
        target.vx -= alpha * x * r * b;
        target.vy -= alpha * y * r * b;
      }

      for (i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        node.vx *= 0.6;
        node.vy *= 0.6;
        node.x += node.vx;
        node.y += node.vy;
      }

      var xs = this.nodes.map(d => d.x);
      var ys = this.nodes.map(d => d.y);
      var minx = d3.min(xs);
      var miny = d3.min(ys);
      var maxx = d3.max(xs);
      var maxy = d3.max(ys);
      var midx = (minx + maxx) / 2;
      var midy = (miny + maxy) / 2;
      var scale = Math.max(maxy - miny, maxx - minx) * 1.05;
      this.renderScale = scale;

      this.pos = this.nodes.map(d => [(d.x - midx) / this.renderScale * this.width + this.width / 2, 
      ((midy - d.y) / this.renderScale + (maxy - midy) / this.renderScale - 0.48) * this.height + this.height / 2]);

      this.positions.data(this.pos);

      


      requestAnimationFrame(this.render);
    },
    render() {
      this.sedges.render();
      this.snodes.render();
      console.log(this.selectedNode);
      this.snodesSelected.data(this.selectedNode ? [this.selectedNode] : []);
      this.snodesSelected.render();
    },
    jiggle() {
      return (Math.random() - 0.5) * 1e-6;
    }

      
  },
  watch:{
     
      filedata(val, oldval) {
        //   console.log("filedata", val)
          this.data = val
      },

      filename(val, oldval) {
        this.nowFileName = val
        console.log(val)
        this.getData(this.nowFileName)

      },

      data(val, oldval) {
        console.log("检测到data发生变化", val)
        //   this.render()
        this.runSelect()
        // this.render(this.nodeStrength, this.linkStrength)
      },

      paraalpha(val, oldval) {
          
      },
      parabeta(val, oldval) {
          
      },
      paragamma(val, oldval) {
          
      },
      parastepsize(val, oldval) {
          
      },
      flagrun(val, oldval) {
          if(val == 1) {
              //重新渲染
          }
          else if(val == 2) {
              //按照当前位置渲染
          }
      },
      flaglocal(val, oldval) {
          //用户可以选择点
        //   this.flaglocal = val
          console.log("flaglocal graph:", this.flaglocal)
          if(this.flaglocal == 1) {
            var box = document.getElementById("selected-nodes").style.visibility="visible";       
            // box.style.border = '1px solid #397aaf';
          }
          else {
            var box = document.getElementById("main-canvas");        
            box.style.border = '';
          }
      },

      mygraphk(val, oldval) {
          
          this.K = val
          console.log("mynodek", val)

        //   this.yScaleFactorAttr = val  * 20;
            this.alpha = 0.1;

            this.stepper1.restart(this.step);
            this.iter = this.maxiter / 2;
        //   this.render( this.nodeStrength, this.linkStrength)
      },

      mygraphp(val, oldval) {
          
          this.p = val
          console.log("mynodep", val)

        //   this.yScaleFactorAttr = val  * 20;
            this.alpha = 0.1;

            this.stepper1.restart(this.step);
            this.iter = this.maxiter / 2;
        //   this.render( this.nodeStrength, this.linkStrength)
      },

      mygraphaone(val, oldval) {
          
          this.a1 = val
          console.log("mynode", val)

          this.yScaleFactorAttr = val  * 20;
            this.alpha = 0.1;

            this.stepper1.restart(this.step);
            this.iter = this.maxiter / 2;
        //   this.render( this.nodeStrength, this.linkStrength)
      },

      mygraphatwo(val, oldval) {
          
          this.a1 = val
          console.log("mynode", val)

          this.yScaleFactorRep = val * 20;
            this.alpha = 0.1;

            this.stepper1.restart(this.step);
            this.iter = this.maxiter / 2;
        //   this.render( this.nodeStrength, this.linkStrength)
      },

      mygraphctwo(val, oldval) {
          
          this.c2 = val
          console.log("mynode", val)

          this.DegreeRep = val  * 20;
            this.alpha = 0.1;

            this.stepper1.restart(this.step);
            this.iter = this.maxiter / 2;
        //   this.render( this.nodeStrength, this.linkStrength)
      },


      linkstrength(val, oldval) {
          
          this.linkStrength = val
          console.log("mylink", this.linkStrength)

        //   this.render( this.nodeStrength, this.linkStrength)
      }

  }
}
</script>
<style>
#MyGraph {
    display: grid;
    grid-template-columns: 20% 60% 20%;
    /* grid-template-rows: 33/3% 33.3% 33.3%; */
    /* grid-template-rows: 300px auto 300px; */
    grid-auto-flow: column;
    width:auto;
    /* align-items: center; */
    justify-content: center;
    position: relative;
    
}

#selected-nodes {
    visibility:hidden;
}


</style>
