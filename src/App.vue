// 展示模板
<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <button @click="getData">example data</button> -->

    <!-- 下面是grid布局 -->
    <div id="content">
      <div id="cora">
        <div class="card item-1">
          <div class="data">
            <button class="loaddata" @click="loaddata">load data</button>
            <input
              v-show="false"
              ref="fileRef"
              type="file"
              @change="fileChange($event)"
            />
          </div>

          <div class="data">
            <select
              class="loaddata"
              name="example"
              id="exam"
              v-model="selectedName"
              @change="changefName($event)"
            >
              <option disabled value="">example data</option>
              <option
                v-for="(item, index) in list"
                :key="index"
                :value="item.fName"
              >
                {{ item.fName }}
              </option>
              <!-- <option value="example0">example data</option>
                    <option value="example0">example0</option>
                    <option value="example1">example1</option>
                    <option value="example2">example2</option> -->
            </select>
          </div>
        </div>

        <div
          class="card"
          style="display:flex;flex-direction:column;justify-content:space-evenly;margin:10px"
        >
          <span style="color:red;text-align:center"
            >Please load a dataset first!</span
          >
          <div class="item-5">
            <button
              class="example"
              value="VisCoAuthor_4"
              @click="exampleFile($event)"
            >
              VisCoAuthor_4
            </button>
            <button
              class="example"
              value="VisCoAuthor_5"
              @click="exampleFile($event)"
            >
              VisCoAuthor_5
            </button>
            <button
              class="example"
              value="VisCoAuthor_7"
              @click="exampleFile($event)"
            >
              VisCoAuthor_7
            </button>
            <button
              class="example"
              value="VisCoAuthor_8"
              @click="exampleFile($event)"
            >
              VisCoAuthor_8
            </button>
            <button
              class="example"
              value="VisCoAuthor_9"
              @click="exampleFile($event)"
            >
              VisCoAuthor_9
            </button>
            <button
              class="example"
              value="VisCoAuthor_10"
              @click="exampleFile($event)"
            >
              VisCoAuthor_10
            </button>
          </div>
        </div>

        <div class="card item-2">
          <!-- attribute control is here -->
          <!-- <div class="comPara">
                     <div class="switch">
                        <span style="font-weight: bold">t-fdp view:</span>
                        <input type="checkbox"  v-model="comp" class="switch">
                    </div>
                </div> -->

          <!-- <div class="comPara">
                    <div style="font-size:20px; color:#515a6e; font-weight:bold"> common parameters</div>

                    <div class="range">
                        <span >Node Strength:</span>
                        <input  id = "rangens" type="range" min="0" max="1"  step=0.05 v-model.number="nodestrength"/>
                        <input type="number" min="0" max="1"  step=0.05 v-model.number="nodestrength"/>
                    </div>

                    <div class="range">
                        <span >Link Strength:</span>
                        <input  id = "rangels" type="range" min="0" max="1"  step=0.05 v-model.number="linkstrength" />
                        <input type="number" min="0" max="1"  step=0.05 v-model.number="linkstrength"/>
                    </div>



                    <div class="switch">
                        <span>param1:</span>
                        <input type="checkbox" class="switch">
                    </div>
                    <div class="switch">
                        <span>param2:</span>
                        <input type="checkbox" class="switch">
                    </div>



                </div> -->

          <div class="MyGraphPara">
            <div style="font-size:20px; color:#515a6e; font-weight:bold">
              parameters
            </div>
            <div class="range">
              <span style="justify-self: end; padding:5px"> α: </span>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                v-model.number="alpha"
              />

              <!-- <div class="rangemy">
                                <input  id = "k" type="range" min="0" max="10"  step=0.1 v-model.number="mygraphK"/>
                                <input type="number" min="0" max="10"  step=0.1 v-model.number="mygraphK"/>
                            </div> -->
            </div>

            <div class="range">
              <span style="justify-self: end; padding:5px">β:</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                v-model.number="beta"
              />
            </div>

            <div class="range">
              <span style="justify-self: end; padding:5px">γ:</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                v-model.number="gamma"
              />
            </div>
          </div>

          <div class="default">
            <!-- <div class="range">
              <span style="justify-self: end; padding:5px">StepSize:</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                v-model.number="stepsize"
              />
            </div> -->
            <button class="button-rerun" value="rerun" @click="rerun($event)">
              rerun
            </button>
          </div>

          <div class="extern">
            <!-- <div style="font-size:20px; color:#515a6e; font-weight:bold">  extern </div>  -->

            <div class="extern-default">
              <button
                class="extern-default-button1"
                value="evenly"
                @click="setpara($event)"
              >
                evenly
              </button>
              <button
                class="extern-default-button2"
                value="major"
                @click="setpara($event)"
              >
                major
              </button>
              <button
                class="extern-default-button3"
                value="refine"
                @click="refine($event)"
              >
                refine
              </button>
              <button
                disabled="disabled"
                class="extern-default-button4"
                value="local"
                @click="local($event)"
              >
                local
              </button>
              <!-- <button class="extern-default-button5" value="VisCoAuthor_4" @click="exampleFile($event)">1</button>
                        <button class="extern-default-button6" value="VisCoAuthor_4" @click="exampleFile($event)">2</button>  -->
            </div>
          </div>

          <!-- <div class="fdpPara">
                    <div style="font-size:20px; color:#515a6e; font-weight:bold">  force-directed parameters</div>

                    <div class="rangefdp">
                        <span >Gravity:</span>
                        <input  id = "forcerangegr" type="range" min="0" max="1"  step=0.05 v-model.number="gravity"/>
                        <input type="number" min="0" max="1"  step=0.05 v-model.number="gravity"/>
                    </div>

                    <div class="rangefdp">
                        <span >Charge:</span>
                        <input  id = "forcerangech" type="range" min="-200" max="0"  step=1 v-model.number="charge"/>
                        <input type="number" min="-200" max="0"  step=1 v-model.number="charge"/>
                    </div>

                    <div class="rangefdp">
                        <span >Link Distance:</span>
                        <input  id = "forcerangeld" type="range" min="0" max="200"  step=0.05 v-model.number="linkdistance"/>
                        <input type="number" min="0" max="200"  step=0.05 v-model.number="linkdistance"/>

                    </div>

                    <div class="rangefdp">
                        <span >Link Strength:</span>
                        <input  id = "forcerangels" type="range" min="0" max="0.2"  step=0.05 v-model.number="linkstrength" />
                        <input type="number" min="0" max="0.2"  step=0.05 v-model.number="linkstrength"/>
                    </div>
                </div> -->
        </div>

        <div class="card item-3">
          <my-graph
            :filename="selectedName"
            v-bind:paraalphaRep="alpha"
            v-bind:parabeta="beta"
            v-bind:paragammaRep="gamma"
            v-bind:parastepsize="stepsize"
            v-bind:flagrun="flagrun"
            v-bind:flaglocal="flaglocal"
            v-bind:filedata="filedata"
            v-bind:filepath="filepath"
            @func="getMsgFromSon"
          ></my-graph>
        </div>

        <!-- <div class="item-both">
                <div class="item-3">
                    <my-graph :filename="selectedName" v-bind:mygraphk="mygraphK" v-bind:mygraphp="mygraphP"
                    v-bind:mygraphaone="mygraphA1" v-bind:mygraphatwo="mygraphA2" v-bind:mygraphctwo="mygraphC2"
                    v-bind:filedata="filedata" v-bind:filepath="filepath"></my-graph>
                </div>

                <div class="item-4">
                    <force-d-3 :filename="selectedName" v-bind:nodestrength="nodestrength" v-bind:linkstrength="linkstrength"></force-d-3>
                    <force-stardust :filename="selectedName" v-bind:gravity="gravity" v-bind:charge="charge"
                    v-bind:linkdistance="linkdistance" v-bind:linkstrength="linkstrength"
                    v-bind:filedata="filedata" v-bind:filepath="filepath"></force-stardust>
                </div>
            </div> -->
      </div>
    </div>

    <!-- <div class="direc">
        <a href="javascript:void(0)" @click="toggleTabs('MyGraph')"> {{first}}</a>
        <a href="javascript:void(0)" @click="toggleTabs('ForceD3')">{{ second }}</a>
    </div> -->

    <!-- <div class="content">
        <my-graph></my-graph>
        <force-d-3></force-d-3>
      <first :is="currentView"></first>
    </div> -->
  </div>
</template>

<script>
import ForceD3 from "./components/ForceD3.vue";
import MyGraph from "./components/MyGraph.vue";
import ForceStardust from "./components/ForceStardust.vue";

export default {
  name: "App",
  template: "<div></div>",
  mounted() {
    //   var range = document.getElementById("forcerangech");
    //   range.style.backgroundSize = '80% 100%';
    //   range = document.getElementById("forcerangegr");
    //   range.style.backgroundSize = '50% 100%';
    //   range = document.getElementById("forcerangeld");
    //   range.style.backgroundSize = '25% 100%';
    //   range = document.getElementById("forcerangels");
    //   range.style.backgroundSize = '25% 100%';
    //   range = document.getElementById("k");
    //   range.style.backgroundSize = '10% 100%';
    //   range = document.getElementById("p");
    //   range.style.backgroundSize = '20% 100%';
    //   range = document.getElementById("a1");
    //   range.style.backgroundSize = '10% 100%';
    //   range = document.getElementById("a2");
    //   range.style.backgroundSize = '10% 100%';
    //   range = document.getElementById("c2");
    //   range.style.backgroundSize = '20% 100%';
  },
  data() {
    return {
      first: "MyGraph",
      second: "ForceD3",

      currentView: "MyGraph",
      msg: "Graph Layout",

      graphData: [],

      list: [
        { id: 1, fName: "VisCoAuthor_4" },
        { id: 2, fName: "VisCoAuthor_5" },
        { id: 3, fName: "VisCoAuthor_7" },
        { id: 1, fName: "VisCoAuthor_8" },
        { id: 2, fName: "VisCoAuthor_9" },
        { id: 3, fName: "VisCoAuthor_10" },
        { id: 1, fName: "sample_0" },
        { id: 2, fName: "sample_1" },
        { id: 3, fName: "sample_5" },
        { id: 1, fName: "sample_9" },
        { id: 2, fName: "sample_10" },
        { id: 3, fName: "sample_18" },
        { id: 1, fName: "sample_19" },
        { id: 2, fName: "sample_20" },
        { id: 3, fName: "sample_21" }
      ],

      selectedName: "",

      nodestrength: 0.1,

      linkstrength: 0.05,
      charge: -40,
      gravity: 0.5,
      linkdistance: 50,

      //   my graph para
      mygraphK: 1,
      mygraphP: 2,
      mygraphA1: 1,
      mygraphA2: 1,
      mygraphC2: 2,

      comp: false,

      filedata: {},
      filepath: "",

      //   parameters
      alpha: 0.1,
      beta: 8,
      gamma: 2,
      stepsize: 1,

      flagrun: 0,
      flaglocal: 0,
      runstop: 0
    };
  },
  components: {
    MyGraph,
    ForceD3,
    ForceStardust
  },
  //   mounted: {},
  methods: {
    getMsgFromSon(data) {
      this.runstop = data;
    },
    loaddata() {
      this.$refs.fileRef.dispatchEvent(new MouseEvent("click"));
    },
    fileChange(event) {
      console.log(event.target.value);
      this.filepath = event.target.value;
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      const reader = new FileReader();
      let that = this;
      reader.onload = function(e) {
        // let json = JSON.parse(this.result);
        // let json = JSON.stringify(this.result);
        let json = new Function("return " + this.result)();
        // console.log(json.nodes)
        // console.log(json.links)
        that.filedata = json;
        console.log(that.filedata);
        // // console.log(e.target.result)
        // var resdata = e.target.result;
        // // console.log(resdata)
        // that.filedata = JSON.parse(resdata)
        // console.log(that.filedata.links.idsrc)

        // // that.filedata.links.map(d => (d.source = d.idsrc, d.target = d.idtgt));
        // // that.filedata.links.map(d => (d.idsrc = d.source.index, d.idtgt = d.target.index));

        // // that.filedata = eval("(" + resdata + ")")
        // console.log("filedata", that.filedata)
      };
      reader.readAsText(selectedFile, "UTF-8");
      // console.log(this.filedata)
      // this.$message({
      // message: '请重新点击选择文件传入符合标准的文件',
      // type: 'warning'
      // });
    },
    getData() {
      // 从文件中获取数据
      this.graphData = [1, 2];
    },
    toggleTabs(tabText) {
      this.currentView = tabText;
    },

    changefName(event) {
      this.selectedName = event.target.value;
      // console.log("select", this.selectedName)
    },
    changeNS(event) {
      this.nodestrength = event.target.value - "0";
      // console.log("app nodestrength", this.nodestrength)
    },
    changeLS(event) {
      this.linkstrength = event.target.value - "0";
      // console.log("linkstrength", this.linkstrength)
    },
    exampleFile(event) {
      this.selectedName = event.target.value;
      // console.log(this.selectedName)
    },
    setpara(event) {
      var thepara = event.target.value;
      // if(thepara == 'evenly') {
      //     this.alpha = ;
      //     this.beta = ;
      //     this.gamma = ;
      //     this.stepsize = ;
      // }
      // else if(thepara == 'major') {
      //     this.alpha = ;
      //     this.beta = ;
      //     this.gamma = ;
      //     this.stepsize = ;s
      // }
    },

    rerun(event) {
      this.flagrun = 1;
    },

    refine(event) {
      this.flagrun = 2;
    },

    local(event) {
      this.flaglocal = 1;
      console.log("flaglocal app:", this.flaglocal);
    }
  },
  computed: {},
  watch: {
    filedata(val, oldval) {
      console.log("数据改变", val);
    },
    comp(val, oldval) {
      console.log("compare", val);
      if (!val) {
        document.getElementsByClassName("item-4")[0].style.display = "";
        document.getElementsByClassName(
          "item-both"
        )[0].style.gridTemplateColumns = "50% 50%";
        document.getElementsByClassName("fdpPara")[0].style.display = "";
      }
      if (val) {
        //隐藏fdp的画布
        // rootElement.getElementByClassName("item-4").style.display="none";
        document.getElementsByClassName("item-4")[0].style.display = "none";
        document.getElementsByClassName(
          "item-both"
        )[0].style.gridTemplateColumns = "100%";
        document.getElementsByClassName("fdpPara")[0].style.display = "none";
        document.getElementsByClassName("item-2")[0].style.gridTemplateRows =
          "80px auto";
        // document.getElementById("item-4").style.display="none";
      }
    },
    runstop(val, oldval) {
      console.log("disable:", val);
      if (val == 1) {
        //button local is avaliable
        document.getElementsByClassName("extern-default-button4")[0].disabled =
          "";
      }
    },
    selectedName(val, oldval) {
      //   console.log("app监听到值的改变", val);
      //   this.sList = this.list[val]
    },

    gravity(val, oldval) {
      // console.log("00000")
      var range = document.getElementById("forcerangegr");
      var size = val * 100;
      range.style.backgroundSize = size + "% 100%";
    },

    charge(val, oldval) {
      // console.log("00000")
      var range = document.getElementById("forcerangech");
      var size = val / 2 + 100;
      range.style.backgroundSize = size + "% 100%";
    },

    linkdistance(val, oldval) {
      // console.log("00000")
      var range = document.getElementById("forcerangeld");
      var size = val / 2;
      range.style.backgroundSize = size + "% 100%";
    },

    linkstrength(val, oldval) {
      // console.log("00000")
      var range = document.getElementById("forcerangels");
      var size = val * 500;
      range.style.backgroundSize = size + "% 100%";
    },

    mygraphK(val, oldval) {
      var range = document.getElementById("k");
      var size = val * 10;
      range.style.backgroundSize = size + "% 100%";
    },

    mygraphP(val, oldval) {
      var range = document.getElementById("p");
      var size = val * 10;
      range.style.backgroundSize = size + "% 100%";
    },

    mygraphA1(val, oldval) {
      var range = document.getElementById("a1");
      var size = val * 10;
      range.style.backgroundSize = size + "% 100%";
    },

    mygraphA2(val, oldval) {
      var range = document.getElementById("a2");
      var size = val * 10;
      range.style.backgroundSize = size + "% 100%";
    },
    mygraphC2(val, oldval) {
      var range = document.getElementById("c2");
      var size = val * 10;
      range.style.backgroundSize = size + "% 100%";
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

* {
  box-sizing: border-box;
  font-family: Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei",
    "微软雅黑", Arial, sans-serif;
  /* font-size: 12px; */
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  position: relative;
  align-content: center;
  /* max-width: 1920px; */
  /* min-width: 1280px; */
  width: 1850px;
  /* height: 1800px; */
  margin: auto;
  font-style: Sans-serif;
}

#content {
  /* float:right;  */
  /* width: 800px; */
  /* background-color: white; */
}

#cora {
  display: grid;
  /* grid-template-columns: 20% 40% 40%; */
  grid-template-columns: 20% 80%;
  grid-template-rows: 15% 85%;
  grid-auto-flow: row;
  width: auto;
  position: relative;
  height: calc(100vh - 64px);
}

.rangefdp {
  text-align: center;
  align-content: center;
  border-style: solid;
  border-width: 1px;
  border-radius: 5px;
  border-width: 1px 1px 1px 1px;
  border-color: gray;
  width: 90%;
  margin: 20px 20px;
  color: #515a6e;

  display: grid;
  grid-template-columns: 37% 43% 20%;
  align-items: center;
  /* justify-content: space-between; */
  /* justify-content:space-around; */
  /* justify-content: center;
    align-items: flex-center; */

  /* background: #515a6e; */
  /* padding:10px; */
  /* position:relative; */
}
.rangemy {
  /* text-align: center;
    align-content: center;
    border-style:solid;
    border-width:1px;
    border-radius: 5px;
    border-width: 1px 1px 1px 1px;
    border-color: gray;
    width:80%;
    margin:8px auto;
    color:#515a6e; */

  margin: 2px 20px;
  display: grid;
  grid-template-columns: 80% 20%;
  align-items: center;
}

.range {
  text-align: center;
  align-content: center;
  /* border-style:solid;
    border-width:px;
    border-radius: 5px;
    border-width: 1px 1px 1px 1px;
    border-color: gray; */
  width: 90%;
  margin: 20px 20px;
  color: #515a6e;
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  justify-self: center;
}

.comPara {
  background-color: #f2f5f7;
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  border-color: white;
  /* margin:1px; */

  display: flex;
  justify-content: center;
  align-items: center;
}

.mygraphcontainer {
}

.MyGraphPara {
  /* width:350px; */

  padding: 20px;
  /* margin:20px; */
  /* background-color:#f2f5f7;
    border-style:solid;
    border-width:0px; */
  /* border-radius: 10px; */
  /* border-color: white; */

  display: flex;
  align-items: center;
  flex-direction: column;
}

.default {
  padding: 20px 20px 10px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.extern {
  padding: 0px 10px 20px 10px;
}
.button-rerun {
  width: 100%;
  height: 40px;
}

.extern-default {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 33/3% 33.3% 33.3%;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
}

.extern-default-button1 {
  margin: 10px;
  width: 80px;
  height: 30px;
  background-color: #2db7f5;
}
.extern-default-button2 {
  margin: 10px;
  width: 80px;
  height: 30px;
  background-color: #2db7f5;
}

.extern-default-button3 {
  margin: 10px;
  width: 80px;
  height: 80px;
  grid-column-start: 3;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}
.extern-default-button4 {
  margin: 10px;
  width: 180px;
  height: 30px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: #2db7f5;
}

.extern-default-button4[disabled] {
  margin: 10px;
  width: 180px;
  height: 30px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}

.fdpPara {
  background-color: #f2f5f7;
  border-style: solid;
  border-width: 3px;
  border-radius: 10px;
  border-color: white;
}

.switch {
  vertical-align: middle;
  /* margin:auto;
    top: 0;
    bottom: 0;
    position: absolute; */
}

span {
  text-align: left;
  margin: 2px;
}

input[type="range"] {
  -webkit-appearance: none; /*清除系统默认样式*/
  width: 90%;
  background: -webkit-linear-gradient(left, #0a6ebd, #0a6ebd) no-repeat, #ddd;
  height: 40%;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  background-size: 20% 100%;
}

/*拖动块的样式   这是一个伪类的样式*/
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none; /*清除系统默认样式*/
  height: 16px; /*拖动块高度*/
  width: 16px; /*拖动块宽度*/
  background: #2d8cf0; /*拖动块背景*/
  border-radius: 50%;
  /* border: solid 1px #ddd; !*设置边框*!*/
}

input[type="number"] {
  width: 68px;
  height: 32px;
  line-height: 32px;
  /* padding: 0 7px; */
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border: 2px solid #666;
  border-radius: 4px;
  transition: all 0.2s linear;
  font-family: inherit;
  font-size: inherit;
}

input[type="number"]:hover {
  border: 2px solid rgb(78, 142, 202);
  /* background-color:rgba(0,0,0,0.5) */
}

.loaddata {
  /* background-color: #515a6e; */
  background-color: #2d8cf0;
  width: 100%;
  height: 100%;
  margin: auto;
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  color: aliceblue;
}

button {
  /* background-color: #515a6e; */
  background-color: #2d8cf0;
  /* width:100%;
    height: 100%; */
  margin: auto;
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  color: aliceblue;

  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #57c5f7;

  /* border-style:solid;
    border-width:5px;
    border-radius: 5px;
    color: white; */
}

select {
  /* background-color: #515a6e; */
  background-color: #2d8cf0;
  width: 100%;
  height: 100%;
  margin: auto;
  text-align: center;
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  color: aliceblue;
}

/* Switch开关样式 */
/* 必须是input为 checkbox class 添加 switch 才能实现以下效果 */
input[type="checkbox"].switch {
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  position: relative;
  width: 40px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  transition: border-color 0.3s, background-color 0.3s;
}

input[type="checkbox"].switch::after {
  content: "";
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0, 0, 2px, #999;
  transition: 0.4s;
  top: 2px;
  position: absolute;
  left: 2px;
}

input[type="checkbox"].switch:checked {
  background: #2d8cf0;
}
/* 当input[type=checkbox]被选中时：伪元素显示下面样式 位置发生变化 */
input[type="checkbox"].switch:checked::after {
  content: "";
  position: absolute;
  left: 55%;
  top: 2px;
}

.data {
  /* background-color: dodgerblue; */
  /* height: 50%; */
  /* align-content: center;
    text-align: center;
    vertical-align: center; */
  width: 50%;
  height: 50%;
}

.item-1 {
  /* background-color: #ef342a;   */
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  border-color: gray;
  /* border-width: 1px 1px 0px 1px; */
  margin: 10px;
  background-color: white;
  /* position: absolute;
    top: 50%;
    left: 50%; */
  /* transform: translate(-50%,-50%); */
  /* display: flex;  */
  /* align-items: center; */
  /* justify-content: center; */
  /* flex-direction: column; */

  display: grid;
  grid-template-rows: 50% 50%;
  grid-auto-flow: row;
  place-items: center;
}

.item-2 {
  /* background-color: #f68f26; */
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  border-color: white;
  margin: 10px;
  /* background-color: white; */
  background-color: #f2f5f7;
  display: grid;
  /* grid-template-columns: 33/3% 33.3% 33.3%; */
  /* grid-template-rows: 33/3% 33.3% 33.3%; */
  grid-template-rows: 300px auto 300px;
  grid-auto-flow: row;
  width: auto;
  /* align-items: center; */
  justify-content: center;
  position: relative;
}

.item-3 {
  /* background-color: #4ba946; */
  /* grid-row-start: 1;
  grid-row-end: 3; */

  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  /* border-width: 1px 0px 1px 1px; */
  border-color: gray;
  margin: 10px;
  background-color: white;
}

.item-4 {
  /* background-color: #0376c2; */
  /* grid-row-start: 1;
  grid-row-end: 3; */
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  /* border-width: 1px 1px 1px 0px; */
  border-color: gray;
  margin: 10px;
  background-color: white;
  /* display: ; */
}

.item-both {
  display: grid;
  /* grid-template-columns: 33/3% 33.3% 33.3%; */
  grid-template-columns: 50% 50%;
  /* grid-template-columns: 100%; */
}

.item-5 {
  /* background-color: #0376c2; */
  /* grid-column-start: 2;
  grid-column-end: 4; */
  border-style: solid;
  border-width: 0px;
  border-radius: 5px;
  /* border-width: 1px 1px 1px 0px; */
  border-color: gray;
  margin: 10px;
  background-color: white;

  display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
  align-items: center;
}

.card {
  box-shadow: 0 0 10px #ccc;
  border-radius: 10px;
  background: #ffffff;
}

.example {
  width: 180px;
  height: 30px;
}
</style>
