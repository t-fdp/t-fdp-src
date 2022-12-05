<template>
  <div id="MyGraph">
    <!-- {{nowFileName}} -->
    <!-- <h2>t-fdp layout </h2> -->
    <div id="selected-nodes">
      <span margin:0px> you can select the nodes! </span>
    </div>
    <canvas id="main-canvas"></canvas>

    <div class="sliders"></div>
  </div>
</template>


<script>
import * as d3 from "d3";
// import * as Stardust from 'stardust-core'
// import * as Stardust from '../cora/stardust.bundle.min.js'
import { tfdp } from "../cora/tfdp";
import * as tf from "@tensorflow/tfjs";
// import "@tensorflow/tfjs-backend-webgl";
// import * as tfjs from "../../static/js/tfjs-core";

var width = 900;
var height = 900;
// miserables = FileAttachment("../data/example0.json").json()
export default {
  name: "MyGraph",
  props: {
    filename: String,
    nodestrength: Number,
    linkstrength: Number,

    mygraphk: Number,
    mygraphp: Number,
    mygraphaone: Number,
    mygraphatwo: Number,
    mygraphctwo: Number,

    filedata: Object,

    paraalphaRep: Number,
    parabetaAttr: Number,
    paragammaRep: Number,
    parastepsize: Number,
    paraclear: Boolean,

    paraflagrun: Number,
    flaglocal: Boolean,
    evenly: Boolean,
    major: Boolean,
  },

  mounted() {
    this.repulforce = tfdp().strength(-1);
    this.canvas = document.getElementById("main-canvas");
    // console.log("aaaaa",Stardust)
    this.platform = Stardust.platform(
      "webgl-2d",
      this.canvas,
      this.width,
      this.height
    );
    // console.log("aaaaa",Stardust)
    this.snodes = Stardust.mark.create(Stardust.mark.circle(20), this.platform);
    this.sedges = Stardust.mark.create(Stardust.mark.line(), this.platform);

    this.colors = this.colors.map((x) => [
      x[0] / 255,
      x[1] / 255,
      x[2] / 255,
      1,
    ]);

    this.snodesSelected = Stardust.mark.create(
      Stardust.mark.circle(20),
      this.platform
    );
  },

  data() {
    return {
      snodesSelected: {},
      selectedNode: null,
      runstop: 0,

      data: {},
      nowFileName: this.filename,
      nodeStrength: 0.1,
      linkStrength: 0.1,

      debug: false,
      snodes: {},
      sedges: {},
      repulforce: {},

      width: width,
      height: width,

      nodes: [],
      links: [],
      links_new: [],
      counts: [],
      nodeto: [[]],
      timer: d3.timer,
      cnt: 0,
      maxiter: 300,
      alphaRep: this.paraalphaRep,
      betaAttr: this.parabetaAttr,
      gammaRep: this.paragammaRep,
      flagrun: this.paraflagrun,
      alphasmallflag: true,
      fileid: 9,
      lr: 20.0,
      // evenly: false,
      // major: false,
      // local: false,
      refine: false,
      renderScale: 1.0,

      stepper1: {},
      iter: 0,
      alpha: 1.0,
      alphastart: 1.0,
      alphamin: 0.01,
      colors: [
        [31, 119, 180],
        [255, 127, 14],
        [44, 160, 44],
        [214, 39, 40],
        [148, 103, 189],
        [140, 86, 75],
        [227, 119, 194],
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
        [128, 128, 128],
      ],
      radius: 7.5,

      canvas: {},
      platform: {},

      positions: {},
      pos: {},
    };
  },
  components: {},
  methods: {
    runSelect(val) {
      if (JSON.stringify(this.stepper1) !== "{}") this.stepper1.stop();
      // this.alpha = this.alphastart;
      this.iter = 0;

      this.$emit("flagRunFunc", 0);

      // this.flagrun = 0;
      this.RunSimulation();
    },
    getData(name) {
      console.log("my get data ing");

      this.$axios
        .get("./../../static/data/" + name + ".json")
        .then((result) => {
          this.data = result.data;
          console.log("getdata", this.data);
          this.$emit("flagRunFunc", 0);
          this.$Spin.hide();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    RunSimulation() {
      this.nodes = this.data.nodes;
      this.nodes.map((d) => (d.id = d.name));
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].index = i;
      }

      this.links = this.data.links;
      this.links.map((d) => ((d.idsrc = d.source), (d.idtgt = d.target)));
      this.links.map(
        (d) => (
          (d.source = this.nodes[d.idsrc]), (d.target = this.nodes[d.idtgt])
        )
      );
      this.counts = this.nodes.map((d) => 0);
      for (var i = 0; i < this.links.length; i++) {
        var link = this.links[i],
          src = link.idsrc,
          tgt = link.idtgt;
        if (src == tgt) continue;
        this.counts[src]++;
        this.counts[tgt]++;
      }
      // console.log()
      // this.nodeto = Array(N);
      this.nodeto = new Array(this.nodes.length);
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodeto[i] = [];
      }
      var maplinks = new Map();
      var cntmap = 0;
      for (var i = 0; i < this.links.length; i++) {
        var link = this.links[i],
          src = link.idsrc,
          tgt = link.idtgt;
        if (maplinks.has(src + "," + tgt) || maplinks.has(tgt + "," + src)) {
          continue;
        }
        if (src == tgt) continue;
        // console.log(src + "," + tgt, tgt + "," + src);
        this.nodeto[src].push(tgt);
        this.nodeto[tgt].push(src);

        maplinks.set(src + "," + tgt, 1);
        maplinks.set(tgt + "," + src, 1);
        // cntmap += 1;
        // var linkcopy = {idsrc:tgt,idtgt:src,source:this.nodes[tgt],target:this.nodes[src]};
        // links.push(link,linkcopy);
        // this.counts[src]++;
        // this.counts[tgt]++;
      }
      this.links_new = new Array();
      // console.log("this.links_new.length", this.links_new.length);
      for (var i = 0; i < this.nodes.length; i++) {
        var deg = this.nodeto[i].length;
        this.counts[src] = deg;
        // console.log(deg, this.nodeto[i]);
        for (var k = 0; k < deg; k++) {
          var j = this.nodeto[i][k];
          this.links_new.push({
            idsrc: i,
            idtgt: j,
            source: this.nodes[i],
            target: this.nodes[j],
          });
        }
      }
      // console.log(this.links, this.links_new);
      // console.log("this.links_new.length", this.links_new.length);
      this.links = this.links_new;
      console.log((this.data.links = this.links_new), this.data.links);
      // console.log("this.links_new.length", this.links_new.length);

      var initialRadius = 10,
        initialAngle = Math.PI * (3 - Math.sqrt(5));
      var n = this.nodes.length;
      for (var i = 0, node; i < n; ++i) {
        (node = this.nodes[i]), (node.index = i);
        if (node.fx != null) node.x = node.fx;
        if (node.fy != null) node.y = node.fy;
        if (isNaN(node.x) || isNaN(node.y)) {
          var radius = initialRadius * Math.sqrt(i),
            angle = i * initialAngle;
          node.x = radius * Math.cos(angle);
          node.y = radius * Math.sin(angle);
        }
        if (isNaN(node.vx) || isNaN(node.vy)) {
          node.vx = node.vy = 0;
        }
        if (isNaN(node.group)) {
          node.group = 0;
        }
      }
      this.nodes.map((d) => (d.bakgroup = d.group));
      this.nodes.map((d) => (d.bakx = d.x));
      this.nodes.map((d) => (d.baky = d.y));
      this.nodes.map((d) => (d.rd = 1));

      var pos = this.nodes.map((d) => [d.x, d.y]);
      var renderScale = 1.0;
      this.positions = Stardust.array("Vector2")
        .value((d) => d)
        .data(pos);

      var positionScale = Stardust.scale
        .custom("array(pos, value)")
        .attr("pos", "Vector2Array", this.positions);
      var positionScale = Stardust.scale
        .custom("array(pos, value)")
        .attr("pos", "Vector2Array", this.positions);
      this.radius = 7.5;
      if (n > 200) this.radius = 4.0;
      if (n > 500) this.radius = 3.0;
      if (n > 1000) this.radius = 2.5;
      if (n > 2000) this.radius = 2.0;
      if (n > 8000) this.radius = 1.5;
      if (n > 10000) this.radius = 1.0;
      this.snodes
        .attr("radius", (d) =>
          this.radius * d.rd > this.radius + 0.5
            ? this.radius + 0.5
            : this.radius * d.rd
        )
        .attr("color", (d) => this.colors[d.group % 20]);
      this.snodesSelected
        .attr("radius", this.radius * 2.0)
        .attr("color", (d) => this.colors[d.group % 20]);

      this.snodes.attr(
        "center",
        positionScale((d) => d.index)
      );
      this.snodesSelected.attr(
        "center",
        positionScale((d) => d.index)
      );

      this.sedges.attr(
        "p1",
        positionScale((d) => d.source.index)
      );
      this.sedges.attr(
        "p2",
        positionScale((d) => d.target.index)
      );
      this.sedges.attr("color", [
        192.0 / 256,
        192.0 / 256,
        192.0 / 256,
        0.2 * this.radius,
      ]);
      this.snodes.data(this.nodes);
      this.sedges.data(this.links);
      this.Simulation();

      var that = this;
      // console.log("nodes:", this.nodes);
      this.canvas.onmousedown = function (e) {
        console.log(that.flaglocal);
        if (that.flaglocal && that.runstop) {
          var x = e.clientX - that.canvas.getBoundingClientRect().left;
          var y = e.clientY - that.canvas.getBoundingClientRect().top;

          // var ini_x = x * that.renderScale / that.width + midx - that.renderScale / 2;
          // var ini_y = maxy - (y / that.height + 0.02) * that.renderScale;

          // console.log("x y:", x, y);
          // // console.log("ini x, y", ini_x, ini_y)
          // console.log("ratio:", that.platform.pixelRatio);
          var tmin = 1123456789;
          var tmp = -1;
          // cons
          for (var i = 0; i < that.pos.length; i++) {
            var dist = (that.pos[i][0] - x) ** 2 + (that.pos[i][1] - y) ** 2;
            // console.log(dist);
            if (dist < tmin) {
              tmp = i;
              tmin = dist;
            }
          }
          console.log("selected i:", tmp, that.nodes[tmp]);
          // var p = that.platform.getPickingPixel(x * that.platform.pixelRatio, y * that.platform.pixelRatio);
          // var p = that.platform.getPickingPixel(ini_x * that.platform.pixelRatio, ini_y * that.platform.pixelRatio);
          // var p = that.platform.getPickingPixel(x , y );
          console.log("selected p :", tmp);
          if (tmp > -1) {
            if (that.selectedNode) {
              if (that.selectedNode.includes(tmp)) {
              } else {
                that.selectedNode.push(tmp);
              }
            } else {
              that.selectedNode = [];
              that.selectedNode.push(tmp);
            }

            console.log(that.selectedNode);
          }
          that.render();
        }
      };
    },

    Simulation() {
      this.runstop = 0;
      this.$emit("func", this.runstop);

      // let lrcase = {""}
      // console.log(this.nodes, this.links);
      var n = this.nodes.length;
      var E = this.links.length;
      var maxdeg = d3.max(this.counts);
      if (this.refine === true) {
        console.log(this.refine, this.major, this.evenly, E, n, maxdeg);
        if (this.evenly) {
          this.alpha = 0.002;
          this.alphamin = 0.001;
        } else if (this.major) {
          this.alpha = 0.2;
          this.alphamin = 0.01;
          if (E / n >= 9.0 || (E / n > 3 && maxdeg > 60)) {
            this.alpha = 0.002;
            this.alphamin = 0.0001;
          }
          if (E / n >= 15.0 && maxdeg > 60) {
            this.alpha = 0.0002;
            this.alphamin = 0.0001;
          }
        } else if (this.flaglocal) {
          console.log("it's local refinement.");
        } else {
          this.alpha = 0.2;
          if (E / n >= 9.0 || (E / n > 3 && maxdeg > 60)) {
            this.alpha = 0.002;
            this.alphamin = 0.0001;
          }
          if (E / n >= 15.0 && maxdeg > 60) {
            this.alpha = 0.0002;
            this.alphamin = 0.0001;
          }
        }
      } else {
        this.alpha = 1.0;
        if (E / n >= 15.0) {
          this.alpha = 0.1;
          this.alphamin = 0.001;
        }
        if (E / n >= 75.0) {
          this.alpha = 0.01;
          this.alphamin = 0.001;
        }
      }

      this.repulforce.initialize(this.nodes);
      // this.alpha = this.alphastart;
      this.stepper1 = d3.timer(this.step);
    },
    SimulationLocal() {
      this.runstop = 0;
      this.$emit("func", this.runstop);
      this.alpha = 0.0002;
      this.alphamin = 0.0001;
      this.repulforce.initialize(this.nodes);
      // this.alpha = this.alphastart;
      this.stepper1 = d3.timer(this.stepLocal);
    },

    exportRaw(name, data) {
      var urlObject = window.URL || window.webkitURL || window;
      var export_blob = new Blob([data]);
      var save_link = document.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "a"
      );
      save_link.href = urlObject.createObjectURL(export_blob);
      save_link.download = name;
      save_link.click();
    },

    saveFile(pos) {
      // var arr = [0, 1, 2, 3];
      var n = pos.length;
      var postxt = "";
      for (var i = 0; i < n; i++) {
        postxt += pos[i][0] + " " + pos[i][1] + "\n";
      }
      // pos.push(document.querySelector("#text").value);
      this.exportRaw("pos_" + this.filename + ".txt", postxt);
    },

    eval() {
      // var res = 0;
      // var N = this.nodes.length,
      //   E = this.links.length;
      // var nodeto = Array(N);
      // for (var i = 0; i < N; i++) {
      //   nodeto[i] = [];
      // }
      // for (var i = 0; i < E; i++) {
      //   var link = this.links[i],
      //     src = link.idsrc,
      //     tgt = link.idtgt;
      //   if (src == tgt) continue;
      //   nodeto[src].push(tgt);
      //   // nodeto[tgt].push(src);
      // }
      this.saveFile(this.pos);
      // for (var i = 0; i < N; i++) {
      //   var distnodes = [];
      //   for (var j = 0; j < N; j++) {
      //     if (j != i) {
      //       var mx = this.nodes[i].x - this.nodes[j].x;
      //       var my = this.nodes[i].y - this.nodes[j].y;
      //       distnodes.push({ id: j, distance: mx * mx + my * my });
      //     }
      //   }
      //   distnodes.sort(function (a, b) {
      //     return a.distance - b.distance;
      //   });
      //   if (this.debug) console.log(nodeto[i], distnodes);
      //   var templen = nodeto[i].length;
      //   var GSet = new Set();
      //   if (templen <= 0) continue;
      //   var USet = new Set();
      //   for (var k = 0; k < templen; k++) {
      //     GSet.add(nodeto[i][k]);
      //     USet.add(nodeto[i][k]);
      //   }
      //   var inSet = new Set();

      //   // console.log(distnodes);
      //   for (var k = 0; k < templen; k++) {
      //     USet.add(distnodes[k].id);
      //     if (GSet.has(distnodes[k].id)) {
      //       inSet.add(distnodes[k].id);
      //     }
      //   }
      //   res += (1.0 * inSet.size) / USet.size;
      // }
      // // for()
      // return res / N;
    },

    step() {
      if (this.paraflagrun == 0) {
        if (this.iter <= this.maxiter) {
          this.SimulationStep(this.alpha);
          this.alpha += (this.alphamin - this.alpha) * 0.022955423246736264;
          this.alpha = Math.max(this.alpha, this.alphamin);
        }

        if (this.iter == this.maxiter) {
          this.stepper1.stop();
          //julie：send msg to parent vue
          this.runstop = 1;
          this.$emit("func", this.runstop);

          // console.log(this.fileid, this.iter, this.eval());
        }
        this.iter += 1;
      }
    },
    stepLocal() {
      if (this.paraflagrun == 0) {
        if (this.selectedNode == null) {
          this.stepper1.stop();
          //julie：send msg to parent vue
          this.runstop = 1;
          this.$emit("func", this.runstop);
        } else if (this.iter <= this.maxiter) {
          this.SimulationLocalStep(this.alpha);
          this.alpha += (this.alphamin - this.alpha) * 0.012955423246736264;
          this.alpha = Math.max(this.alpha, this.alphamin);
        }
        if (this.iter == this.maxiter) {
          this.stepper1.stop();
          this.runstop = 1;
          this.$emit("func", this.runstop);
        }
        this.iter += 1;
      }
    },

    SimulationStep(alpha) {
      var shortrangeRepForceRatio = 1 / this.alphaRep;
      var shortrangeAttrForceRation = this.betaAttr;
      var N = this.nodes.length;
      // console.log(shortrangeRepForceRatio);
      var i = 0,
        E = this.links.length;
      var attr_force = tf.zeros([N, 2]).arraySync();

      for (i = 0; i < E; i++) {
        var link = this.links[i],
          source = link.source,
          target = link.target,
          src = link.idsrc,
          tgt = link.idtgt;
        var cntsrc = this.counts[src],
          cnttgt = this.counts[tgt];
        // var strength = 1.0 / Math.min(cntsrc, cnttgt);
        var b = (1.0 * cnttgt) / (cntsrc + cnttgt);
        var x, y;
        x = target.x + target.vx - source.x - source.vx || this.jiggle();
        y = target.y + target.vy - source.y - source.vy || this.jiggle();
        var l = x * x + y * y;
        var r = shortrangeAttrForceRation / (1 + l) + 0.5 * b;
        // r *= strength;
        attr_force[src][0] += x * r;
        attr_force[src][1] += y * r;
        // source.vx += alpha *;
        // source.vy += alpha * y * r * b;
        // b = 1 - b;
        // target.vx -= alpha * x * r * b;
        // target.vy -= alpha * y * r * b;
      }
      for (i = 0; i < N; i++) {
        var node = this.nodes[i];
        var mv0 = attr_force[i][0];
        var mv1 = attr_force[i][1];
        var d = Math.sqrt(mv0 * mv0 + mv1 * mv1) + 1e-6;
        var R = d < 2000.0 ? d : 2000.0;
        node.vx += ((alpha * mv0) / d) * R;
        node.vy += ((alpha * mv1) / d) * R;
      }

      this.repulforce
        .xScaleFactor(1.0)
        .yScaleFactor(shortrangeRepForceRatio)
        .Degree(this.gammaRep);
      this.repulforce(alpha);

      let randn = tf
        .randomNormal([N, 2], 0, 1, "float32", alpha * 100000)
        .arraySync();
      // console.log(N, randn);
      for (i = 0; i < N; i++) {
        var node = this.nodes[i];
        node.vx += 0.01 * alpha * randn[i][0];
        node.vy += 0.01 * alpha * randn[i][1];
      }
      var move_norm = 0.0;
      var move_norm_mean = 0.0;
      for (i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        var mv0 = node.vx;
        var mv1 = node.vy;
        var d = Math.sqrt(mv0 * mv0 + mv1 * mv1) + 1e-6;
        var R = d < 1 ? d : 1;
        move_norm = move_norm > R ? move_norm : R;
        move_norm_mean += R;
        node.x += (mv0 / d) * R;
        node.y += (mv1 / d) * R;
        node.vx *= 0.6;
        node.vy *= 0.6;
      }
      move_norm_mean /= this.nodes.length;
      // console.log(move_norm);

      var xs = this.nodes.map((d) => d.x);
      var ys = this.nodes.map((d) => d.y);
      var minx = d3.min(xs);
      var miny = d3.min(ys);
      var maxx = d3.max(xs);
      var maxy = d3.max(ys);
      var midx = (minx + maxx) / 2;
      var midy = (miny + maxy) / 2;
      var scale = Math.max(maxy - miny, maxx - minx) * 1.2;
      // console.log(scale);
      this.renderScale = scale;
      // if (scale > 1.2 * this.renderScale) this.renderScale = scale;
      // if (scale < 0.6 * this.renderScale) this.renderScale = scale;
      this.pos = this.nodes.map((d) => [
        ((d.x - midx) / this.renderScale) * this.width + this.width / 2,
        ((midy - d.y) / this.renderScale +
          (maxy - midy) / this.renderScale -
          0.48) *
          this.height +
          this.height / 2,
      ]);

      this.positions.data(this.pos);
      if (N < 200) {
        move_norm *= 10;
        move_norm_mean *= 10;
      }
      requestAnimationFrame(this.render);
      if (move_norm < 0.01 && move_norm_mean < 0.001) {
        this.stepper1.stop();
        //julie：send msg to parent vue
        this.runstop = 1;
        this.$emit("func", this.runstop);
      }
    },
    SimulationLocalStep(alpha) {
      var shortrangeRepForceRatio = 1 / this.alphaRep;
      var shortrangeAttrForceRation = this.betaAttr;
      var innerRep = 200000;
      var interRep = 400;
      // var innerRep = 1500000;
      // var interRep = 600;
      // 100
      var N = this.nodes.length;
      var E = this.links.length;
      var maxdeg = d3.max(this.counts);
      if ((E / N > 6 && maxdeg > 20) || maxdeg > 100) {
        innerRep = 3000;
        interRep = 300;
      }
      console.log(E, N, maxdeg, innerRep, interRep);
      // console.log(shortrangeRepForceRatio);
      var i = 0,
        E = this.links.length;
      var attr_force = tf.zeros([N, 2]).arraySync();
      for (i = 0; i < E; i++) {
        var link = this.links[i],
          source = link.source,
          target = link.target,
          src = link.idsrc,
          tgt = link.idtgt;
        var cntsrc = this.counts[src],
          cnttgt = this.counts[tgt];
        // var strength = 1.0 / Math.min(cntsrc, cnttgt);
        var b = (1.0 * cnttgt) / (cntsrc + cnttgt);
        var x, y;
        x = target.x + target.vx - source.x - source.vx || this.jiggle();
        y = target.y + target.vy - source.y - source.vy || this.jiggle();
        var l = x * x + y * y;
        var r = shortrangeAttrForceRation / (1 + l) + 0.5 * b;
        attr_force[src][0] += x * r;
        attr_force[src][1] += y * r;
      }

      for (i = 0; i < N; i++) {
        var node = this.nodes[i];
        var mv0 = attr_force[i][0];
        var mv1 = attr_force[i][1];
        var d = Math.sqrt(mv0 * mv0 + mv1 * mv1) + 1e-6;
        var R = d < 2000.0 ? d : 2000.0;
        node.vx += ((alpha * mv0) / d) * R;
        node.vy += ((alpha * mv1) / d) * R;
      }
      var attr_force_2 = tf.zeros([N, 2]).arraySync();
      var lenselectNodes = this.selectedNode.length;
      for (var k = 0; k < lenselectNodes; k++) {
        var i = this.selectedNode[k];
        var lennbg = this.nodeto[i].length;
        for (var j = 0; j < lennbg; j++) {
          var vj = this.nodeto[i][j];
          var source = this.nodes[vj],
            target = this.nodes[i];
          var cntsrc = this.counts[vj],
            cnttgt = this.counts[i];
          var b = (1.0 * cnttgt) / (cntsrc + cnttgt);
          var x, y;
          x = target.x + target.vx - source.x - source.vx || this.jiggle();
          y = target.y + target.vy - source.y - source.vy || this.jiggle();
          var l = x * x + y * y;
          var r = (0.1 * shortrangeAttrForceRation) / (1 + l) + 0.5 * b;
          attr_force_2[vj][0] += 120.0 * x * r;
          attr_force_2[vj][1] += 120.0 * y * r;
        }
      }
      for (i = 0; i < N; i++) {
        var node = this.nodes[i];
        var mv0 = attr_force_2[i][0];
        var mv1 = attr_force_2[i][1];
        var d = Math.sqrt(mv0 * mv0 + mv1 * mv1) + 1e-6;
        var R = d < 2000.0 ? d : 2000.0;
        node.vx += ((alpha * mv0) / d) * R;
        node.vy += ((alpha * mv1) / d) * R;
      }

      for (var k = 0; k < lenselectNodes; k++) {
        var i = this.selectedNode[k];
        var lennbg = this.nodeto[i].length;
        for (var vj = 0; vj < lennbg; vj++) {
          var j = this.nodeto[i][vj];

          // force for neighbor node with other node
          for (var vi = 0; vi < this.nodes.length; vi++) {
            if (vi == j) continue;
            var source = this.nodes[j],
              target = this.nodes[vi];
            var x = source.x - target.x,
              y = source.y - target.y;
            var l = x * x + y * y;
            var r1 = interRep / (1 + l) ** 3;
            target.vx -= x * r1 * alpha;
            target.vy -= y * r1 * alpha;
          }

          // force for neighbor node with other node

          for (var vit = 0; vit < lennbg; vit++) {
            var vi = this.nodeto[i][vit];
            if (vi == j) continue;
            var source = this.nodes[j],
              target = this.nodes[vi];
            var x = source.x - target.x,
              y = source.y - target.y;
            var l = x * x + y * y;
            var r1 = innerRep / (1 + l) ** 6;
            var r2 = interRep / (1 + l) ** 3;
            target.vx -= x * (r1 - r2) * alpha;
            target.vy -= y * (r1 - r2) * alpha;
          }
        }
      }

      this.repulforce
        .xScaleFactor(1.0)
        .yScaleFactor(shortrangeRepForceRatio)
        .Degree(this.gammaRep);
      this.repulforce(alpha);

      let randn = tf
        .randomNormal([N, 2], 0, 1, "float32", alpha * 100000)
        .arraySync();
      // console.log(N, randn);
      for (i = 0; i < N; i++) {
        var node = this.nodes[i];
        node.vx += 0.1 * alpha * randn[i][0];
        node.vy += 0.1 * alpha * randn[i][1];
      }
      var move_norm = 0.0;
      for (var k = 0; k < lenselectNodes; k++) {
        var i = this.selectedNode[k];
        var node = this.nodes[i];
        node.vx *= 0.2;
        node.vy *= 0.2;
      }
      for (i = 0; i < this.nodes.length; i++) {
        var node = this.nodes[i];
        var mv0 = node.vx;
        var mv1 = node.vy;
        var d = Math.sqrt(mv0 * mv0 + mv1 * mv1) + 1e-6;
        var R = d < 0.1 ? d : 0.1;
        move_norm = move_norm > R ? move_norm : R;
        node.x += (mv0 / d) * R;
        node.y += (mv1 / d) * R;
        node.vx *= 0.6;
        node.vy *= 0.6;
      }
      // move_norm /= this.nodes.length;
      // console.log(move_norm);

      var xs = this.nodes.map((d) => d.x);
      var ys = this.nodes.map((d) => d.y);
      var minx = d3.min(xs);
      var miny = d3.min(ys);
      var maxx = d3.max(xs);
      var maxy = d3.max(ys);
      var midx = (minx + maxx) / 2;
      var midy = (miny + maxy) / 2;
      var scale = Math.max(maxy - miny, maxx - minx) * 1.2;
      // console.log(scale);
      this.renderScale = scale;
      // if (scale > 1.2 * this.renderScale) this.renderScale = scale;
      // if (scale < 0.6 * this.renderScale) this.renderScale = scale;
      this.pos = this.nodes.map((d) => [
        ((d.x - midx) / this.renderScale) * this.width + this.width / 2,
        ((midy - d.y) / this.renderScale +
          (maxy - midy) / this.renderScale -
          0.48) *
          this.height +
          this.height / 2,
      ]);

      this.positions.data(this.pos);

      requestAnimationFrame(this.render);
      if (N < 200) move_norm *= 10;
      if (move_norm < 0.01) {
        this.stepper1.stop();
        //julie：send msg to parent vue
        this.runstop = 1;
        this.$emit("func", this.runstop);
      }
    },

    render() {
      if (this.selectedNode) {
        var cnt = 0;
        var settednode = tf.zeros([this.nodes.length]).arraySync();
        for (var j = 0; j < this.selectedNode.length; j++) {
          var i = this.selectedNode[j];
          this.nodes[i].group = cnt;
          var deg = this.nodeto[i].length;
          for (var k = 0; k < deg; k++) {
            this.nodes[this.nodeto[i][k]].group = cnt;
            this.nodes[this.nodeto[i][k]].rd = 1.25;
            settednode[this.nodeto[i][k]] = 1;
          }
          cnt += 1;
          settednode[i] = 1;
        }
        for (var i = 0; i < this.nodes.length; i++) {
          if (settednode[i] == 0) {
            this.nodes[i].group = 19;
            this.nodes[i].rd = 0.9;
          }
        }
        this.snodes.data(this.nodes);
        this.sedges.attr("color", [
          192.0 / 256,
          192.0 / 256,
          192.0 / 256,
          0.15,
        ]);
      }
      this.sedges.render();
      this.snodes.render();
      // console.log(this.selectedNode);

      this.snodesSelected.data(
        this.selectedNode ? this.selectedNode.map((d) => this.nodes[d]) : []
      );
      this.snodesSelected.render();
    },
    jiggle() {
      return (Math.random() - 0.5) * 1e-6;
    },
  },
  watch: {
    filedata(val, oldval) {
      this.selectedNode = null;
      // console.log("filedata", val);
      this.data = val;
    },

    filename(val, oldval) {
      this.nowFileName = val;
      // console.log(val);
      this.getData(this.nowFileName);
    },

    data(val, oldval) {
      // console.log("检测到data发生变化", val);
      this.selectedNode = null;

      //   this.render()
      this.runSelect();
      // this.render(this.nodeStrength, this.linkStrength)
    },

    paraalphaRep(val, oldval) {
      this.alphaRep = this.paraalphaRep > 0.001 ? this.paraalphaRep : 0.001;
      if (this.paraalphaRep < 0.001) {
        this.$emit("returnalpahRep", 0.001);
      }
      // if (this.runstop >= 0) {
      //   this.alpha = this.alphamin * 10;
      //   this.iter = 150;
      //   this.runstop = 0;
      //   // this.stepper1.restart(this.step);
      // }
    },
    parabetaAttr(val, oldval) {
      this.betaAttr = this.parabetaAttr > 0.0 ? this.parabetaAttr : 0.0;
      // if (this.runstop >= 0) {
      //   this.alpha = this.alphamin * 10;
      //   this.iter = 150;
      //   this.runstop = 0;
      //   // this.stepper1.restart(this.step);
      // }
    },
    paragammaRep(val, oldval) {
      this.gammaRep = this.paragammaRep > 1.0 ? this.paragammaRep : 1.0;
      if (this.paragammaRep < 1.0) {
        this.$emit("returngammaRep", 1.0);
      }
      // if (this.runstop >= 0) {
      //   this.alpha = this.alphamin * 10;
      //   this.iter = 150;
      //   this.runstop = 0;
      //   // this.stepper1.restart(this.step);
      // }
    },
    parastepsize(val, oldval) {},
    paraflagrun(val, oldval) {
      // console.log("paraflagrun");
      if (val == 1) {
        this.refine = false;
        this.selectedNode = null;
        // this.getData(this.nowFileName);
        if (JSON.stringify(this.stepper1) !== "{}") this.stepper1.stop();
        // this.alpha = this.alphastart;
        this.iter = 0;

        this.$emit("flagRunFunc", 0);
        this.nodes.map((d) => (d.group = d.bakgroup));
        this.nodes.map((d) => (d.rd = 1.0));
        this.nodes.map((d) => (d.x = d.bakx));
        this.nodes.map((d) => (d.y = d.baky));
        this.sedges.attr("color", [192.0 / 256, 192.0 / 256, 192.0 / 256, 0.5]);
        this.snodes.data(this.nodes);
        // tf.rand.seed(42);
        this.Simulation();
      } else if (val == 2) {
        this.refine = true;

        if (JSON.stringify(this.stepper1) !== "{}") this.stepper1.stop();
        // this.alpha = this.alphastart;
        this.iter = 0;

        this.$emit("flagRunFunc", 0);
        console.log(this.data);
        if (this.flaglocal) {
          console.log("local here");
          // if(this.snodesSelected)
          this.SimulationLocal();
        } else {
          this.Simulation();
        }
        // this.stepper1.stop();

        // this.stepper1.restart(this.step);
        // this.flagrun = 0;

        // this.selectedNode = null;
        // this.getData(this.nowFileName);
        // this.runSelect();
      }
    },
    flaglocal(val, oldval) {
      //用户可以选择点
      //   this.flaglocal = val
      console.log("flaglocal graph:", this.flaglocal);
      if (this.flaglocal == 1) {
        var box = (document.getElementById("selected-nodes").style.visibility =
          "visible");
        // box.style.border = '1px solid #397aaf';
      } else {
        var box = document.getElementById("main-canvas");
        box.style.border = "";
        var box = (document.getElementById("selected-nodes").style.visibility =
          "hidden");
      }
    },
    paraclear(val, oldval) {
      if (this.paraclear) {
        if (this.selectedNode != null) {
          this.selectedNode = null;
          this.nodes.map((d) => (d.group = d.bakgroup));
          this.nodes.map((d) => (d.rd = 1.0));
          this.sedges.attr("color", [
            192.0 / 256,
            192.0 / 256,
            192.0 / 256,
            0.5,
          ]);
          this.snodes.data(this.nodes);
          this.render();
        }
        this.$emit("returnclear", false);
      }
    },
    linkstrength(val, oldval) {
      this.linkStrength = val;
      console.log("mylink", this.linkStrength);
    },
  },
};
</script>
<style>
#MyGraph {
  display: grid;
  grid-template-columns: 8% 84% 8%;
  /* grid-template-rows: 33/3% 33.3% 33.3%; */
  /* grid-template-rows: 300px auto 300px; */
  grid-auto-flow: column;
  width: auto;
  /* align-items: center; */
  justify-content: center;
  position: relative;
}

#selected-nodes {
  visibility: hidden;
  margin-right: -200px;
}
</style>
