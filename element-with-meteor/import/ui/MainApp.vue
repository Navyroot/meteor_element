<template>
    <div class="app" v-loading="loading" label-width="120px">
        <el-form :ref="form" :model="form" :rules="rules">
          <el-form-item label="Item" prop="item">
            <el-input v-model="form.item"></el-input>
          </el-form-item>
          <el-form-item label="Price" prop="price">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.prevent="handleAddItem(form)" size="mini">Add</el-button>
          </el-form-item>
        </el-form>

        <el-table
          :data="tableData"
          border
          
          style="width: 100%">
          <el-table-column
            prop="item"
            label="Item"
            width="180">
          </el-table-column>
          <el-table-column
            prop="price"
            label="Price">
          </el-table-column>
          <el-table-column
            label="Operations"
            >
            <template slot-scope="scope">
              <el-button @click="handleRemove(scope.$index, scope.row)" type="primary" size="mini"> x </el-button>
              <el-button type="danger" size="mini">Edit</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { Meteor } from "meteor/meteor";
export default {
  props: ["myMessage"],
  data() {
    return {
      form: {
        item: "",
        price: ""

      },
      rules: {
        item: [
          { required: true, message: "Please input Item", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "Length should be 1 to 50",
            trigger: "blur"
          }
        ],
        price: [
          { required: true, message: "Please input Item", trigger: "blur" }
        ]
      },
      tableData: [],
      loading: false
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleAddItem(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            let obj = {
              item: this.form.item,
              price: this.form.price
            };
            Meteor.call("insertData", obj, (error, result) => {
              this.$message({
                message: "ការក្សាទុកបានជោគជ័យ!",
                type: "success"
              });
              this.clearData();
              this.loadData();
            });
          }, 200);
        } else {
          this.$message({
            message: "ការរក្សាទុកមិនបានជោគជ័យ!",
            type: "error"
          });
          return false;
        }
      });
    },
    loadData() {
      Meteor.call("getAllData", (error, result) => {
        this.tableData = result;
        this.tableData.forEach(obj => {
           (item = obj.item), (price = obj.price);
        });
      });
    },
    clearData(){
      this.form.item=''
      this.form.price=''
    },
    handleRemove(index,row){
        let id = row._id;
        Meteor.call('removeItem',id,(error,result)=>{
          this.$message({
            message: "លុបបានជោគជ័យ!",
            type: "success"
          });
          this.loadData();
        })
    }
  }
};
</script>

