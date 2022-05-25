<template>
    <div>
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @change-area="getcolumns"
        />
    </div>
</template>

<script>
import { Dialog } from "vant";
import { fetchaddAddress } from "../api/user";
import { mapState } from "Vuex";
//areaList,省市信息
import { areaList } from "@vant/area-data";
export default {
    data() {
        return {
            areaList, //用户添加的地址
            areaCode: "", //地区代码
        };
    },
    computed: {
        ...mapState(["userInfo"]),
    },

    methods: {
        // 添加地址
        async onSave(content) {
            // 1.准备接口参数
            content.isDefault = content.isDefault ? 1 : 0;
            content.country = content.county;
            let formData = {
                ...content,
                areaCode: this.areaCode,
            };
            //2.发送请求保存地址
            let { status, message } = await fetchaddAddress(
                this.userInfo.id,
                formData
            );
            //3.提示成功,跳转到我的地址页面并且传递数据
            if (status === 0) {
                Dialog.alert({
                    message: message,
                }).then(() => {
                    this.$router.back();
                });
            }
        },

        // 地区编码
        getcolumns(code) {
            this.areaCode = code.map((item) => item.code).join("-");
        },
    },
};
</script>

<style>
</style>