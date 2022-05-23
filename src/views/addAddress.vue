<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { Dialog } from 'vant';
import {fetchaddAddress,fetchdeladdress} from "../api/user"
import { mapState, mapGetters, mapActions, mapMutations } from "Vuex";
//areaList,省市信息
import { areaList } from "@vant/area-data";
export default {
  data() {
    return {
      areaList,
      searchResult: [],//详细地址搜索结果
    };
  },
  computed:{
    ...mapState(["userInfo"])
  },
  
  methods: {
    // 添加地址
    async onSave(content) {
      let {city,county,isDefault,name,postalCode,province,tel,areaCode ,addressDetail} = content
      let data = {
        name:name,//李四
        tel:tel,//13411112222
        province:province,//省
        city:city,//市
        country:county,//区 
        postalCode:postalCode,//邮编
        isDefault:isDefault ? 1 : 0,//是否默认地址， 1-是 ， 0-不是,数字类型
        areaCode:areaCode, //省市区地区码， 120000-120100-120102
        addressDetail:addressDetail,//地址详情
      }
      //1.发送请求保存地址
      let { status, message } = await fetchaddAddress(this.userInfo.id,data)
      //2.提示成功,跳转到我的地址页面并且传递数据
      console.log(status, message );
      if(status === 0){
        Dialog.alert({
          message:message,
        }).then(() => {
          this.$router.push("/address")
        });
      }
    },
    // 删除地址
    async onDelete() {
      let id = ""
      // 发送地址删除地址
      let result = await fetchdeladdress(id)
      console.log(result);
    },

    onChangeDetail(val) {
      // 切换是否使用默认地址时触发
      // value: 是否选中
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style>
</style>