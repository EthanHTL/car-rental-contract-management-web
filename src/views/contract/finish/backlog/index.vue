<template>
    <d2-container>
        <!-- 工具栏 -->
 

        <!-- 表格 -->
        <el-table :data="taskList" style="width: 100%">
        <el-table-column prop="contractName" label="合同名" width="180">
        </el-table-column>
        <el-table-column prop="contractNumbers" label="合同编号" width="100">
        </el-table-column>
        <el-table-column prop="payment" label="支付方式" width="100">
        </el-table-column>
        <el-table-column label="状态" width="150">
            <template slot-scope="scope">
            <el-switch
                v-model="scope.row.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
            
            >
            </el-switch>
            </template>
        </el-table-column>
        <el-table-column
            label="创建时间"
            width="150"
            prop="createTime"
            :formatter="formatterTime"
        >
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-link icon="el-icon-edit"  @click="updateFormVisible = true">编辑 </el-link>
            <el-link icon="el-icon-edit" @click="assignPermissionVisible(scope)">权限分配</el-link>
            <el-link><i class="el-icon-view el-icon--right"></i> 查看 </el-link>
            </template>
        </el-table-column>
        </el-table>
    </d2-container>
</template>

<script>
import { mapActions } from "vuex";
import dayjs from "dayjs";

export default {
    name: '',
    data() {
        return {
            taskList:[],

        }
    },
    created(){
        this.init()
    },
    methods: {
        ...mapActions('d2admin/contract', [
            'myTaskList',
        ]),
        init(){
            this.myTaskList().then(res =>{
                this.taskList = res
                console.log(res);
            })
        },
        formatterTime(row, column) {
            if (row[column.property] == null) return null;
            return dayjs(row[column.property]).format("YYYY-MM-DD");
        },
    }
}
</script>