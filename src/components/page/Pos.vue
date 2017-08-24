<template>
  <div class="pos">
    <div>
          <el-row >
              <el-col :span='7'>
                  <el-tabs>
                        <el-tab-pane label="点餐">
                          <el-table :data="tableData" border show-summary style="width: 100%" >
                            <el-table-column prop="name" label="商品"  ></el-table-column>
                            <el-table-column prop="count" label="量" width="50"></el-table-column>
                            <el-table-column prop="price" label="金额" width="70"></el-table-column>
                            <el-table-column  label="操作" width="100" fixed="right">
                                <template scope="scope">
                                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="div-btn">
                          <el-button type="warning" class="div-btn-item" >挂单</el-button>
                          <el-button type="danger"  class="div-btn-item" @click="delAllGoods">删除</el-button>
                          <el-button type="success" class="div-btn-item" @click="checkout()">结账</el-button>
                        </div>

                        </el-tab-pane>
                        <el-tab-pane label="挂单">
                        挂单
                        </el-tab-pane>
                        <el-tab-pane label="外卖">
                        外卖
                       </el-tab-pane>
                  </el-tabs>
              </el-col>
              <!--商品展示-->

              <el-col :span="17">
                <!-- 常用商品 -->
                <div class="often-goods">
                     <div class="title">常用商品</div>
                     <div class="often-goods-list">
                         <ul>
                             <li v-for="item in oftenGoods" @click="addOrderList(goods)">
                                 <span>{{item.name}}</span>
                                 <span class="o-price">￥{{item.price}}元</span>
                             </li>
                         </ul>
                     </div>
                 </div>
                 <!-- 商品分类 -->
                 <div class="goods-type">
                    <el-tabs>
                        <el-tab-pane label="汉堡">
                          <ul class='cookList'>
                            <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                                <span class="foodImg"><img :src="goods.preview" width="100%"></span>
                                <span class="foodName">{{goods.name}}</span>
                                <span class="foodPrice">￥{{goods.price}}元</span>
                            </li>
                          </ul>
                        </el-tab-pane>
                            <el-tab-pane label="小食">
                            小食
                        </el-tab-pane>
                        <el-tab-pane label="饮料">
                            饮料
                        </el-tab-pane>
                        <el-tab-pane label="套餐">
                            套餐
                        </el-tab-pane>
                    </el-tabs>
                </div>

              </el-col>
          </el-row>
      </div>
  </div>
</template>

<script>
export default {

  name: 'Pos',
  created(){
        this.$http.get('api/itemsArray')
        .then(response=>{

           this.type0Goods=response.data.data;
           console.log(this.type0Goods);
        })
        .catch(error=>{
            console.log(error);
            alert('网络错误，不能访问');
        })
    },
  methods:{
    //添加订单列表的方法
      addOrderList(goods){
            this.totalCount=0; //汇总数量清0
            this.totalMoney=0;
            let isHave=false;
            //判断是否这个商品已经存在于订单列表
            for (let i=0; i<this.tableData.length;i++){
                console.log(this.tableData[i].id);
                if(this.tableData[i].id==goods.id){
                    isHave=true; //存在
                }
            }
            //根据isHave的值判断订单列表中是否已经有此商品
            if(isHave){
                //存在就进行数量添加
                 let arr = this.tableData.filter(o =>o.id == goods.id);
                 arr[0].count++;
                 arr[0].price = arr[0].count * arr[0].price
                 //console.log(arr);
            }else{
                //不存在就推入数组
                let newGoods={id:goods.id,name:goods.name,price:goods.price,count:1};
                 this.tableData.push(newGoods);

            }

            //进行数量和价格的汇总计算
            this.tableData.forEach((element) => {
                this.totalCount+=element.count;
                this.totalMoney=this.totalMoney+(element.price*element.count);
            });

      },
      delSingleGoods(goods){
        console.log(this.tableData);
        this.tableData = this.tableData.filter(o=>o.id != goods.id);
      },
      delAllGoods(){
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
      },
      checkout() {
      if (this.totalCount!=0) {
          this.tableData = [];
          this.totalCount = 0;
          this.totalMoney = 0;
          this.$message({
              message: '结账成功，感谢你又为店里出了一份力!',
              type: 'success'
          });
      }else{
          this.$message.error('不能空结。老板了解你急切的心情！');
      }

      }
  },
  data(){
    return {
      totalCount : 0,
      totalMoney : 0,
      tableData: [],
       oftenGoods:[
          {
              id:1,
              name:'香辣鸡腿堡',
              price:18
          }, {
              id:2,
              name:'田园鸡腿堡',
              price:15
          }, {
              id:3,
              name:'和风汉堡',
              price:15
          }, {
              id:4,
              name:'快乐全家桶',
              price:80
          }, {
              id:5,
              name:'脆皮炸鸡腿',
              price:10
          }, {
              id:6,
              name:'魔法鸡块',
              price:20
          }, {
              id:7,
              name:'可乐大杯',
              price:10
          }, {
              id:8,
              name:'雪顶咖啡',
              price:18
          }, {
              id:9,
              name:'大块鸡米花',
              price:15
          }, {
              id:20,
              name:'香脆鸡柳',
              price:17
          }

      ],
      type0Goods:[]
    }
  }
}
</script>
<style scoped>
.pos{
  /*background-color: #a3a4a5;*/
  height: 100%;
}
.div-btn{
  width: 100%;
  /*background-color: #b3b4b5;*/
  display: flex;
  padding: 10px;
  margin-left: -10px;
}
.div-btn-item{
  flex:1;
}
.title{
   height: 20px;
   border-bottom:1px solid #D3DCE6;
   background-color: #F9FAFC;
   padding:10px;
}
.often-goods-list ul li{
  list-style: none;
  float:left;
  border:1px solid #E5E9F2;
  padding:10px;
  margin:5px;
  background-color:#fff;
   }
.o-price{
      color:#58B7FF;
}
.goods-type{
 clear:both;
}
.cookList li{
  width: 12%;
  border:1px solid #E5E9F2;
  height: auto;
  padding: 2px;
  margin: 2px;
  background-color:#fff;
}
.cookList li span{
    display: block;
    float:left;
}
.cookList li {
  float:left;
  margin:4px;
}
.foodName{
   font-size: 18px;
   padding-left: 10px;
   color:brown;
}
.foodPrice{
   font-size: 16px;
   padding-left: 10px;
   padding-top:10px;
}

</style>
