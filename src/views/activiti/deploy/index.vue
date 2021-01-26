<template>
    <d2-container>
        <!-- 工具栏 -->


        <!-- 表格 -->
        <el-table :data="deployList" style="width: 100%">
        <el-table-column prop="roleZH" label="角色名" width="180">
        </el-table-column>
        <el-table-column prop="roleName" label="角色标识" width="100">
        </el-table-column>
        <el-table-column prop="remark" label="备注" width="100">
        </el-table-column>
        <el-table-column label="状态" width="150">
            <template slot-scope="scope">
            <el-switch
                v-model="scope.row.flag"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeSwitch(scope.row)"
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
export default {
    name: '',
    data() {
        return {
            deployList:[]
        }
    },
    methods: {}
}
</script>