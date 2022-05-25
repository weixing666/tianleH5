<template>
  <div class="orderlistcoent">
    <van-tabs v-model="active" @change="getstatus">
      <van-tab :title="item.text" v-for="item in tabs" :key="item.status">
        <div class="content">
          <div class="card" v-for="item in findStatusOrderComputed" :key="item.title" @click="$router.push(`/orderdetails/${item.order_id}`)">
            <div class="goodinfo">
              <div class="good_img">
                <img :src="item.goodsInfo.thumb_path" alt="" />
              </div>
              <div class="good">
                <div class="title ellipsis_line_2">
                    {{item.goodsInfo.title}}
                </div>
                <div class="pay">{{item.pay_way}}</div>
                <div class="ordertime">{{ item.add_time | timeFormat }}</div>
                <div class="money">
                  <span class="money_"
                    ><span class="yen">¥</span><span>{{item.total_price}}</span></span
                  >
                  <span class="total">共{{item.number}}件</span>
                </div>
              </div>
            </div>
            <div class="orderinfo">
                <van-button type="danger" size="mini" @click.stop="callPhone">客服</van-button>
                <van-button type="info" size="mini" v-if="item.is_take == 1 && item.is_out == 1 && item.status == 2">已完成</van-button>
                <van-button type="warning" size="mini" v-if="item.is_take == 1 && item.is_out == 1 && item.status == 2">去评价</van-button>
              <van-button type="danger" size="mini" v-if="item.status == 0">立即付款</van-button>
              <van-button type="danger" size="mini" v-if="item.status == 0">复制订单号</van-button>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
import { fetchgetorder , fetchgetorderinfo , fetchgetcardata} from "../api/user";
export default {
  data() {
    return {
      active: "",
      userorderInfo:[],
      status:"",//记录状态
      tabs:[
          {status:"all",text:"全部"},
          {status:"0",text:"未付款"},
          {status:"1",text:"已付款"},
          {status:"2",text:"完成"},
      ],
    };
  },
  created() {
    this._fetchgetorder();
  },
  computed: {
    ...mapState(["userInfo"]),
    // 通过订单状态status筛选订单
    findStatusOrderComputed() {
      // all 0 1 2
      if (this.status == 'all') {
        return this.userorderInfo;
      }
      return this.userorderInfo.filter(order => order.status == this.status)
    }
  },
  methods: {
    // 获取用户的订单信息,信息说明:
    // status: 0-未付款(默认)  1-已付款  2-完成  
    // is_take: 0-未收货(默认) 1-已收货 
    // is_out: 0-未发货(默认) 1-已收货
    async _fetchgetorder() {
      // 1.获取用户订单
      let userorder = await fetchgetorder(this.userInfo.id);
      // 2.获取订单详情
      let promiseArr = [];
      userorder.forEach(item => {
          promiseArr.push(fetchgetcardata(item.goods_ids))
      });
      // 3.并发获取全部购物车商品信息
      let allOrderGoods = await Promise.all(promiseArr);
      // 4.将订单和购物车信息关联，购物车信息存储到订单的goodsInfo属性中
      let userorderInfo = userorder.map((item,index) => {
          item.goodsInfo = allOrderGoods[index].message[0]
          return item
      })
      //5.存贮用户订单信息
      this.userorderInfo = userorderInfo
    },
    // 复制到系统粘贴板
    onCopy(e) {
      event.stopPropagation();// 阻止事件冒泡
      this.$toast('复制成功')
    },
    // 联系客服
    callPhone(){
        this.$dialog.confirm({
        message: '确拨打打电话?',
        })
    },
    // 状态
    getstatus(name,title){
        let statusMap = {
        '全部': "all",
        '未付款': "0",
        '已付款': "1",
        '完成': "2",
      }
      this.status = statusMap[title];
    }
  },
};
</script>

<style lang="scss" scoped>
@import url("../assets/css/common.scss");
.orderlistcoent {
  .content {
    .card {
      padding: 10px;
      background-color: #fafafa;
      margin-bottom: 10px ;
      .goodinfo {
        display: flex;
        .good_img {
          width: 88px;
          height: 88px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .good {
          flex: 1;
          font-size: 12px;
          padding-left: 5px;
          .title {
            max-height: 32px;
            font-weight: 500;
            line-height: 16px;
            color: #323233;
          }
          .pay {
            max-height: 20px;
            color: #646566;
            line-height: 20px;
          }
          .ordertime {
            max-height: 20px;
            color: #323233;
            line-height: 20px;
          }
          .money {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .money_ {
              color: #323233;
              font-size: 16px;
              .yen {
                color: #323233;
                font-size: 12px;
              }
            }
          }
        }
      }
      .orderinfo {
        height: 24px;
        display: flex;
        flex-direction: row-reverse;
        .van-button {
          margin: 0 3px;
        }
      }
    }
  }
}
</style>