// 展示模板
<template>
  <div id="app">
    <!-- <h1>{{msg}}</h1> -->
    <!-- <button @click="getData">example data</button> -->

    <!-- 下面是grid布局 -->
    <div id="content">
      <div id="cora">
        <div
          class="card item-text"
          style="
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            margin: 10px;
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
          "
        >
          <span style="color: red; text-align: center">
            Due to the limited computational capability of the JavaScript code,
            this demo only shows some layouts and the extensions for t-FDP.
            <br />
            For conducting more experiments or handling larger graphs, please
            refer to our efficient python implementation
            <a href="https://github.com/t-fdp/t-fdp"
              >(github.com/t-fdp/t-fdp/)</a
            >.</span
          >
          <!-- <span style="color: red"
            >
            
          </span> -->
        </div>

        <div
          class="card item-2"
          style="
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 3;
          "
        >
          <div class="item-5">
            <div
              style="
                font-size: 20px;
                margin-left: -20px;
                color: #ffffff;
                background: #515a6e;
                width: 180px;
                text-align: left;
                display: flex;
              "
            >
              &nbsp; Example data

              <Button
                type="text"
                shape="circle"
                size="small"
                class="button-help"
                ghost="true"
                @click="help($event)"
              >
                <Icon
                  class="icon-help"
                  type="ios-help-circle"
                  style="margin-top: -18px"
                  color="#ffffff"
                  size="25"
                />
              </Button>
              <br />
            </div>
            <Button
              style="margin-top: 5px"
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'rajat11')"
            >
              rajat11
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'btree9')"
            >
              btree9
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'qh882')"
            >
              qh882
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'Cluster800_2')"
            >
              cluster
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'cage8')"
            >
              cage8
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'VisCoauthor')"
            >
              VISCoauthor
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, 'bcspwr07')"
            >
              bcspwr07
            </Button>

            <Button
              class="example"
              type="primary"
              size="small"
              icon="ios-folder-open-outline"
              @click="exampleFile($event, '3elt')"
            >
              3elt
            </Button>

            <div class="data">
              <Select
                name="example"
                id="exam"
                size="small"
                v-model="selectedName"
                @on-change="changefName($event)"
                placeholder="more data"
              >
                <Option
                  v-for="(item, index) in list"
                  :key="index"
                  :value="item.fName"
                >
                  {{ item.showname }}
                </Option>
                <!-- <option value="example0">example data</option>
                    <option value="example0">example0</option>
                    <option value="example1">example1</option>
                    <option value="example2">example2</option> -->
              </Select>
            </div>
          </div>

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
          <!-- <div></div> -->
          <div class="extern">
            <div class="extern-default">
              <div
                style="
                  font-size: 20px;
                  margin-left: 0px;
                  color: #ffffff;
                  background: #515a6e;
                  width: 180px;
                  text-align: left;
                "
              >
                &nbsp; Refinement
                <br />
              </div>
              <div class="extern-global">
                <template>
                  <ButtonGroup size="small">
                    <Button
                      disabled="disabled"
                      class="extern-default-button1"
                      value="evenly"
                      type="primary"
                      size="small"
                      @click="setpara($event, 'evenly')"
                    >
                      Evenly
                    </Button>
                    <Button
                      disabled="disabled"
                      class="extern-default-button2"
                      value="major"
                      type="primary"
                      size="small"
                      @click="setpara($event, 'major')"
                    >
                      Cluster
                    </Button>
                  </ButtonGroup>
                </template>
              </div>
              <div class="extern-default-button4x">
                <Button
                  disabled="disabled"
                  class="extern-default-button4"
                  size="small"
                  type="primary"
                  value="local"
                  @click="local($event)"
                >
                  Select
                </Button>
                <Button
                  type="error"
                  shape="circle"
                  icon="ios-trash"
                  size="small"
                  @click="clear($event)"
                ></Button>
              </div>
              <Button
                disabled="disabled"
                type="primary"
                class="extern-default-button3"
                value="refine"
                icon="ios-trending-up"
                size="small"
                @click="refine($event)"
                >Refine</Button
              >
              <div style="display: flex; align-items: center">
                <Spin size="small" v-if="selectedName && !runstop">
                  <Icon
                    type="ios-loading"
                    size="18"
                    class="demo-spin-icon-load"
                  ></Icon>
                </Spin>
                <span v-if="selectedName && !runstop">
                  Wait for computing.</span
                >
              </div>
            </div>
          </div>

          <div class="MyGraphPara">
            <div
              style="
                font-size: 20px;
                margin-left: 0px;
                margin-buttom: 0px;
                color: #ffffff;
                background: #515a6e;
                width: 180px;
                text-align: left;
              "
            >
              &nbsp; Parameters
              <br />
            </div>

            <div class="parameters">
              <div class="range">
                <span style="justify-self: end; padding: 0px"> α: </span>
                <!-- <i-input
                  type="number"
                  min="0.00"
                  max="1"
                  step="0.01"
                  v-model.number="alpha"
                /> -->
                <template>
                  <InputNumber
                    :max="1.0"
                    :min="0.0"
                    :step="0.01"
                    v-model.number="alpha"
                    size="small"
                    class="range-inputnumber0"
                    :disabled="!this.runstop"
                  >
                  </InputNumber>
                </template>
              </div>

              <div class="range">
                <span style="justify-self: end; padding: 0px">β:</span>
                <!-- <input
                  type="number"
                  min="0.0"
                  max="100.0"
                  step="1.0"
                  v-model.number="beta"
                /> -->

                <template>
                  <InputNumber
                    :max="100.0"
                    :min="0.0"
                    :step="1.0"
                    v-model.number="beta"
                    size="small"
                    class="range-inputnumber1"
                    :disabled="!this.runstop"
                  >
                  </InputNumber>
                </template>
              </div>

              <div class="range">
                <span style="justify-self: end; padding: 0px">γ:</span>
                <!-- <input
                  type="number"
                  min="1.5"
                  max="20"
                  step="0.5"
                  v-model.number="gamma"
                /> -->

                <template>
                  <InputNumber
                    :max="30.0"
                    :min="0"
                    :step="0.5"
                    v-model.number="gamma"
                    size="small"
                    id="range-inputnumber2"
                    :disabled="!this.runstop"
                  >
                  </InputNumber>
                </template>
              </div>

              <!-- <div class="button-reset"> -->
              <!-- <button
                class="button-reset"
                disable=""
                value="resetpata"
                @click="resetpata($event)"
              >
                reset
              </button> -->
              <!-- <Button
                class="button-reset"
                type="primary"
                shape="circle"
                icon="ios-refresh"
                size="small"
                @click="resetpata($event)"
              ></Button> -->
            </div>
            <!-- </div> -->
          </div>

          <div class="default">
            <!-- <div class="range">
              <span style="justify-self: end; padding: 5px">StepSize:</span>
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                v-model.number="stepsize"
              />
            </div> -->
            <!-- <button class="button-rerun" value="rerun" @click="rerun($event)">
              Restart & Run
            </button> -->
            <!-- <ButtonGroup
              size="small"
              class="button-rerun-refine"
              style="height=32px !important;"
            > -->
            <Button
              class="button-rerun"
              type="primary"
              size="small"
              icon="ios-send"
              value="rerun"
              @click="rerun($event)"
            >
              Rerun
            </Button>
            <!-- <div>
              <Spin size="small" fix v-if="!runstop"> Loading </Spin>
            </div> -->
            <!-- <Button
                class="button-refine"
                type="primary"
                size="small"
                icon="ios-send"
                value="refine"
                @click="refine($event)"
                >Refine
              </Button> -->
            <!-- </ButtonGroup> -->
          </div>
        </div>

        <div
          class="card item-3"
          style="
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
          "
        >
          <my-graph
            :filename="selectedName"
            v-bind:paraalphaRep="alpha"
            v-bind:parabetaAttr="beta"
            v-bind:paragammaRep="gamma"
            v-bind:parastepsize="stepsize"
            v-bind:paraflagrun="flagrun"
            v-bind:evenly="evenly"
            v-bind:major="major"
            v-bind:local="local"
            v-bind:paraclear="paraclear"
            v-bind:flaglocal="flaglocal"
            v-bind:filedata="filedata"
            v-bind:filepath="filepath"
            @func="getMsgFromSon"
            @flagRunFunc="getFlagrun"
            @returnalpahRep="returnalpahRep"
            @returngammaRep="returngammaRep"
            @returnclear="returnclear"
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
      msg: "Force-directed graph layouts revisited: a new force based on the t-Distribution",

      graphData: [],

      list: [
        { id: 1, fName: "can_96", showname: "can_96" },
        { id: 2, fName: "bcspwr07", showname: "bcspwr07" },
        { id: 3, fName: "rajat11", showname: "rajat11" },
        { id: 1, fName: "Cluster800_2", showname: "cluster" },
        { id: 2, fName: "qh882", showname: "qh882" },
        { id: 3, fName: "btree9", showname: "btree9" },
        { id: 3, fName: "VisCoauthor", showname: "VisCoauthor" },
        { id: 1, fName: "cage8", showname: "cage8" },
        { id: 2, fName: "lesmis", showname: "lesmis" },
        { id: 3, fName: "grid17", showname: "grid17" },
        { id: 1, fName: "netscience", showname: "netscience" },
        { id: 2, fName: "dwt_419", showname: "dwt_419" },

        { id: 2, fName: "dwt_1005", showname: "dwt_1005" },
        { id: 3, fName: "1138_bus", showname: "1138_bus" },
        { id: 3, fName: "block_2000", showname: "block_2000" },
        { id: 1, fName: "lp_ship04l", showname: "lp_ship04l" },
        { id: 1, fName: "USPowerGrid", showname: "USPowerGrid" },
        { id: 2, fName: "3elt", showname: "3elt" },
        { id: 2, fName: "CSCoAuthor", showname: "ca-CS" },
        { id: 3, fName: "fe_4elt2", showname: "fe_4elt2" },
      ],

      selectedName: "",

      nodestrength: 0.1,

      linkstrength: 0.05,
      charge: -40,
      gravity: 0.5,
      linkdistance: 50,
      evenly: false,
      major: false,
      flaglocal: false,
      //   my graph para
      //   mygraphK: 1,
      //   mygraphP: 2,
      //   mygraphA1: 1,
      //   mygraphA2: 1,
      //   mygraphC2: 2,

      comp: false,

      filedata: {},
      filepath: "",

      //   parameters
      alpha: 0.1,
      beta: 8,
      gamma: 2,
      stepsize: 1,
      paraclear: false,
      flagrun: 0,
      //   flaglocal: 0,
      runstop: 0,
      // isloaddata:false;
    };
  },
  components: {
    MyGraph,
    ForceD3,
    ForceStardust,
  },
  //   mounted: {},
  methods: {
    getMsgFromSon(data) {
      this.runstop = data;
    },
    returnalpahRep(data) {
      this.alpha = data;
    },
    returngammaRep(data) {
      this.gamma = data;
    },
    getFlagrun(data) {
      this.flagrun = data;
      console.log("this.flagrun", this.flagrun);
    },
    returnclear(data) {
      this.paraclear = data;
    },
    loaddata() {
      this.$refs.fileRef.dispatchEvent(new MouseEvent("click"));
    },
    fileChange(event) {
      this.alpha = 0.1;
      this.beta = 8.0;
      this.gamma = 2.0;
      // this.runstop = 0;
      this.evenly = false;
      this.flagrun = 1;
      this.major = false;
      this.flaglocal = false;
      console.log(event.target.value);
      this.filepath = event.target.value;
      const selectedFile = event.target.files[0];
      console.log(selectedFile);
      const reader = new FileReader();
      let that = this;
      reader.onload = function (e) {
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

    changefName(value) {
      // console.log(event);
      this.alpha = 0.1;
      this.beta = 8.0;
      this.gamma = 2.0;

      this.evenly = false;
      this.flagrun = 1;
      this.major = false;
      this.flaglocal = false;
      this.selectedName = value;
      this.$Spin.show({
        render: (h) => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18,
              },
            }),
            h("div", "Loading"),
          ]);
        },
      });

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
    exampleFile(event, filename) {
      this.alpha = 0.1;
      this.beta = 8.0;
      this.gamma = 2.0;
      // this.runstop = 0;
      this.evenly = false;
      this.flagrun = 1;
      this.major = false;
      this.flaglocal = false;
      console.log(event);
      if (filename != null) {
        this.selectedName = filename;
        this.$Spin.show({
          render: (h) => {
            return h("div", [
              h("Icon", {
                class: "demo-spin-icon-load",
                props: {
                  type: "ios-loading",
                  size: 18,
                },
              }),
              h("div", "Loading"),
            ]);
          },
        });
      } else {
        this.selectedName = event.target.value;
        this.$Spin.show({
          render: (h) => {
            return h("div", [
              h("Icon", {
                class: "demo-spin-icon-load",
                props: {
                  type: "ios-loading",
                  size: 18,
                },
              }),
              h("div", "Loading"),
            ]);
          },
        });
      }
      // console.log(this.selectedName)
    },
    setpara(event, value) {
      var thepara = value;
      if (value == null) thepara = event.target.value;
      if (thepara == "evenly") {
        this.evenly = true;

        this.major = false;
        this.flaglocal = false;

        document
          .getElementsByClassName("extern-default-button2")[0]
          .classList.add("notchek");

        document
          .getElementsByClassName("extern-default-button4")[0]
          .classList.add("notchek");
        document
          .getElementsByClassName("extern-default-button1")[0]
          .classList.remove("notchek");

        // document.getElementsByClassName("extern-default-button4")[0].disabled =
        //   "disabled";
        // document.getElementsByClassName("button4-2")[0].disabled = "disabled";
        this.alpha = 0.002;
        this.beta = 8;
        this.gamma = 4;
        this.$Message.success({
          content:
            "Set a combination parameter for more evenly. Click the 'Refine' button to produce a new layout.",
          duration: 5,
        });
        //   this.stepsize = ;
      } else if (thepara == "major") {
        this.alpha = 0.1;
        this.beta = 8;
        this.gamma = 5;

        this.evenly = false;
        // document.getElementsByClassName("extern-default-button1")[0].disabled =
        //   "disabled";
        this.major = true;
        this.flaglocal = false;

        // document.getElementsByClassName("extern-default-button4")[0].disabled =
        //   "disabled";

        // document.getElementsByClassName(
        //   "extern-default-button1"
        // )[0].style.color = "#c5c8ce";
        document
          .getElementsByClassName("extern-default-button2")[0]
          .classList.remove("notchek");
        document
          .getElementsByClassName("extern-default-button1")[0]
          .classList.add("notchek");

        document
          .getElementsByClassName("extern-default-button4")[0]
          .classList.add("notchek");
        this.$Message.success({
          content:
            "Set a combination parameter for more clustering. Click the 'Refine' button to produce a new layout.",
          duration: 5,
        });
        // document.getElementsByClassName("button4-2")[0].disabled = "disabled";
        //   this.stepsize = ;s
      }
    },
    resetpata(event) {
      this.alpha = 0.1;
      this.beta = 8.0;
      this.gamma = 2.0;
      // this.runstop = 0;
      this.evenly = false;
      // this.flagrun = 1;
      this.major = false;
      this.flaglocal = false;
    },
    rerun(event) {
      if (this.selectedName.length > 1) {
        this.flagrun = 1;
        this.runstop = 0;
        this.flaglocal = false;
        this.evenly = false;
        // this.flaglocal = false;
        console.log("this.flagrun = 1;");
      } else {
        alert("Please load a dataset first!");
      }
    },
    help(event) {
      this.$Notice.open({
        title: "Tips",
        desc: "1. First, loads one example data.<br>2. The 'Rerun' button will be re-layout according to the current parameters.<br>3. The 'Refine' button refines the layout based on the current parameters and the current layout.<br>4. Click the 'Evenly' or 'Cluster' button will assign a set of preset parameters. Then, click the refine button to see the fine structure more clearly or better show major structures.<br>5. Click the 'Select' button to enter the local refinement mode and choose some interesting nodes. And then, clicking the 'Refine' button will be more inclined to show the neighbors of the selected node clearly. Click the red trash button will clear the status of the selected node.",
        duration: 0,
      });
    },
    clear(event) {
      this.paraclear = true;
    },

    refine(event) {
      this.flagrun = 2;
      //   this.flagrun = 1;
      this.runstop = 0;
    },

    local(event) {
      //   this.flaglocal = 1;
      this.evenly = false;
      // document.getElementsByClassName("extern-default-button1")[0].disabled =
      //   "disabled";
      // document.getElementsByClassName("extern-default-button2")[0].disabled =
      //   "disabled";
      document
        .getElementsByClassName("extern-default-button4")[0]
        .classList.remove("notchek");
      document
        .getElementsByClassName("extern-default-button1")[0]
        .classList.add("notchek");
      document
        .getElementsByClassName("extern-default-button2")[0]
        .classList.add("notchek");
      this.major = false;
      this.flaglocal = true;

      // console.log("flaglocal app:", this.flaglocal);
      this.$Message.success({
        content:
          "Enter local refinement mode. Please select the nodes and click the 'Refine' button.",
        duration: 5,
      });
    },
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

      if (val === 0) {
        // document.getElementsByClassName("button-rerun")[0].loading = true;
        document.getElementsByClassName("extern-default-button1")[0].disabled =
          "disabled";
        document.getElementsByClassName("extern-default-button2")[0].disabled =
          "disabled";
        document.getElementsByClassName("extern-default-button3")[0].disabled =
          "disabled";
        document.getElementsByClassName("extern-default-button4")[0].disabled =
          "disabled";
        document.getElementsByClassName("button4-2")[0].disabled = "disabled";
        // document.getElementById("range-inputnumber0").disabled = "disabled";
        // document.getElementById("range-inputnumber1").disabled = "disabled";
        // document.getElementById("range-inputnumber2").disabled = "disabled";
      }
      if (val === 1) {
        //button local is avaliable
        document.getElementsByClassName("extern-default-button1")[0].disabled =
          "";
        document.getElementsByClassName("extern-default-button2")[0].disabled =
          "";
        document.getElementsByClassName("extern-default-button3")[0].disabled =
          "";
        document.getElementsByClassName("extern-default-button4")[0].disabled =
          "";
        document
          .getElementsByClassName("extern-default-button1")[0]
          .classList.remove("notchek");
        document
          .getElementsByClassName("extern-default-button2")[0]
          .classList.remove("notchek");
        document
          .getElementsByClassName("extern-default-button4")[0]
          .classList.remove("notchek");
        // document.getElementById("range-inputnumber0").disabled = false;
        // document.getElementById("range-inputnumber1").disabled = false;
        // document.getElementById("range-inputnumber2").disabled = false;
        // document.getElementsByClassName("button4-2")[0].disabled = "";
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

    // mygraphK(val, oldval) {
    //   var range = document.getElementById("k");
    //   var size = val * 10;
    //   range.style.backgroundSize = size + "% 100%";
    // },

    // mygraphP(val, oldval) {
    //   var range = document.getElementById("p");
    //   var size = val * 10;
    //   range.style.backgroundSize = size + "% 100%";
    // },

    // mygraphA1(val, oldval) {
    //   var range = document.getElementById("a1");
    //   var size = val * 10;
    //   range.style.backgroundSize = size + "% 100%";
    // },

    // mygraphA2(val, oldval) {
    //   var range = document.getElementById("a2");
    //   var size = val * 10;
    //   range.style.backgroundSize = size + "% 100%";
    // },
    // mygraphC2(val, oldval) {
    //   var range = document.getElementById("c2");
    //   var size = val * 10;
    //   range.style.backgroundSize = size + "% 100%";
    // },
  },
};
</script>

<style>
body {
  margin: 0;
}
* {
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  /* font-size: 12px; */
}

#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  position: relative;
  align-content: center;
  /* max-width: 1920px; */
  /* min-width: 1280px; */
  width: 1280px;
  height: 960px;
  margin: 0;
  /* font-style: Sans-serif; */
}

#content {
  /* float:right;  */
  /* width: 800px; */
  /* background-color: white; */
}

#cora {
  display: grid;
  /* grid-template-columns: 20% 40% 40%; */
  grid-template-columns: 200px 1080px;
  grid-template-rows: 10% 90%;
  /* grid-auto-flow: row; */
  width: auto;
  position: relative;
  height: 900px;
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
  width: 120px;
  margin: 2px 2px;
  color: #515a6e;
  display: grid;
  grid-template-columns: 35% 65%;
  grid-auto-flow: row;
  align-items: center;
  justify-self: center;
}

.ivu-input-number {
  width: 80px;
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

/* .mygraphcontainer {
} */

.MyGraphPara {
  /* width:350px; */

  padding: 20px;
  /* margin:20px; */
  /* background-color:#f2f5f7;
    border-style:solid;
    border-width:0px; */
  /* border-radius: 10px; */
  /* border-color: white; */
  margin-top: 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.button-reset {
  /* margin: 0px; */
  /* disable:""; */
  /* width: 12%;
  height: 22px;
  
  background-color: #397aaf; */
  margin-left: 65px !important;
}

.parameters {
  margin-top: 10px;
  text-align: center;
  align-content: normal;
  /* border-style:solid;
    border-width:px;
    border-radius: 5px;
    border-width: 1px 1px 1px 1px;
    border-color: gray; */
  /* width: 90%;
  margin: 20px 20px;
  color: #515a6e; */
  width: 150px;
  display: flex;
  /* grid-template-columns: 40% 60%; */
  /* grid-auto-flow: row; */
  flex-direction: column;
  /* align-items: center;
  justify-self: center; */
}

.default {
  padding: 0px 0px 15px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.extern {
  padding: 0px 10px 20px 10px;
}
.button-rerun-refine {
  margin-top: 10px;
  height: 45px;
}
.icon-help:hover {
  /* border-color: #515a6e; */
  outline: 0;
  color: lightgreen !important;
}
.button-help {
  outline: 0 !important;
  border-color: #515a6e;
  box-shadow: none;
}
.button-help:hover {
  outline: 0 !important;
  border-color: #515a6e;
  background-color: #515a6e;
  box-shadow: none;
}
.button-rerun {
  width: 120px;
  height: 30px;
  background-color: #55a868;
}
.button-rerun:hover {
  background-color: #37c732;
}

.button-refine {
  width: 80px;
  height: 45px;
  background-color: #55a868;
}
.button-refine:hover {
  background-color: #37c732;
}

.extern-default {
  margin: 0px 0px 10px 10px;
  width: 90%;
  display: flex;
  /* grid-template-rows: 30% 30% 40%;
  grid-template-columns: 50% 50%;
  grid-auto-flow: column; */
  justify-items: center;
  align-items: center;
  flex-direction: column;
}

.extern-default-button1 {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #5cadff;
}

.extern-default-button1[disabled] {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}
.extern-default-button1.notchek {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #f7f7f7 !important;
  color: #c5c8ce !important;
  border: 1px solid #dcdee2 !important;
}

.extern-default-button2 {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #5cadff;
}

/* .extern-default-button2 .ivu-btn .ivu-btn-primary .ivu-btn-small .notchek {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #f7f7f7 !important;
  color: #c5c8ce !important;
  border: 1px solid #dcdee2 !important;
} */

.extern-default-button2.notchek {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #f7f7f7 !important;
  color: #c5c8ce !important;
  border: 1px solid #dcdee2 !important;
}
.extern-default-button2[disabled] {
  margin: 0px;
  width: 60px;
  height: 25px;
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}
.extern-default-button3:hover {
  background-color: #37c732;
}
.extern-default-button3 {
  margin: 5px;
  width: 120px;
  height: 30px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: #55a868;
}

/* .extern-default-button3[disabled] {
  margin: 5px;
  width: 120px;
  height: 30px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
} */
.extern-default-button3[disabled] {
  margin: 5px;
  width: 120px;
  height: 30px;
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 3;
  grid-row-end: 4;
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}

.extern-default-button4x {
  margin-top: 5px;
  width: 120px;
  height: 32px;
  display: flex;
  /* grid-template-columns: 40% 60%; */
  /* grid-auto-flow: row; */
  flex-direction: row;

  /* background-color: #2db7f5; */
}

.extern-global {
  margin-top: 15px;
  width: 120px;
  height: 25px;
  display: flex;
  /* grid-template-columns: 40% 60%; */
  /* grid-auto-flow: row; */
  flex-direction: row;

  /* background-color: #2db7f5; */
}

.extern-default-button4 {
  margin-top: 3px;
  margin-right: 10px;
  width: 90px;
  height: 25px;
  /* grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  background-color: #5cadff;
}

.extern-default-button4.notchek {
  margin-top: 3px;
  width: 90px;
  height: 25px;
  /* grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}

.extern-default-button4[disabled] {
  margin-top: 3px;
  width: 90px;
  height: 25px;
  /* grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}
.button4-2[disabled] {
  margin: 0px;
  width: 20%;
  height: 30px;
  /* grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  background-color: #f7f7f7;
  color: #c5c8ce;
  border: 1px solid #dcdee2;
}
.button4-2 {
  margin: 0px;
  width: 45px;
  height: 40px;
  /* grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3; */
  background-color: #a51e1e;
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
  /* font-family: inherit; */
  font-size: inherit;
}

input[type="number"]:hover {
  border: 2px solid rgb(78, 142, 202);
  /* background-color:rgba(0,0,0,0.5) */
}

.loaddata {
  /* background-color: #515a6e; */
  background-color: #2d8cf0;
  width: 120px;
  height: 100%;
  margin: auto;
  border-style: solid;
  border-width: 0px;
  /* border-radius: 5px; */
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
  width: 120px;
  height: 30px;
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
  padding: 20px 0;
  /* position: absolute;
    top: 50%;
    left: 50%; */
  /* transform: translate(-50%,-50%); */
  /* display: flex;  */
  /* align-items: center; */
  /* justify-content: center; */
  /* flex-direction: column; */

  display: grid;
  /* grid-template-rows: 50% 50%; */
  grid-auto-flow: row;
  place-items: center;
}

.item-2 {
  /* background-color: #f68f26; */
  border-style: solid;
  border-width: 3px;
  border-radius: 5px;
  border-color: white;
  margin: 10px;
  /* background-color: white; */
  background-color: #f2f5f7;
  display: grid;
  /* grid-template-columns: 33/3% 33.3% 33.3%; */
  /* grid-template-rows: 33/3% 33.3% 33.3%; */
  grid-template-rows: 40% 18% 8% 15%;
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
  border-radius: 5px, 0px, 0px, 5px;
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
  border-radius: 0px, 5px, 5px, 0px;
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
  width: 100%;
  /* border-style: solid;
  border-width: 0px;
  border-radius: 0px, 5px, 5px, 0px; */
  /* border-width: 1px 1px 1px 0px; */
  border-color: gray;
  margin: 10px;
  /* background-color: white; */

  display: flex;
  flex-direction: column;
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
  /* font-size: 16px !important; */
  width: 120px;
  margin-top: 0;
  /* height: 30px; */
}
.ivu-btn-circle-outline.ivu-btn-icon-only.ivu-btn-small,
.ivu-btn-circle.ivu-btn-icon-only.ivu-btn-small {
  margin: auto;
  /* width: 24px;
  height: 24px;
  padding: 0;
  font-size: 14px;
  border-radius: 50%; */
}
.ivu-notice {
  width: 408px;
  margin-right: 5px;
  /* position: fixed;
  z-index: 1010; */
}
/* document.documentElement.style.overflowY = "hidden" */
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}

element.style {
  width: 120px;
  margin-left: 10px;
}
</style>
