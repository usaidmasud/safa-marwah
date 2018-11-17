


<template>
    <b-card header="Persons">
    <router-link class="btn btn-primary btn-sm mb-3 float-right" to="/persons/add">Tambah</router-link>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Email</th>
                <th>Password</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in users" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ item.email }}</td>
                <td>{{ item.password }}</td>
                <td>
                    <b-button variant="success" size="sm">Edit</b-button>
                    <b-button variant="danger" @click="deleteUser(item.id)" size="sm">Delete</b-button>
                </td>
            </tr>
        </tbody>
    </table>
    </b-card>
</template>

<script>
export default {
    layout : 'app',
    data(){
        return {
            users : []
        }
    },
    mounted() {
        // this.get_data()
        this.get_data()
    },
    methods : {
        async get_data(){
            const url = 'http://127.0.0.1:3333/api/users';
            const response = await this.$axios.$get(url)
            return response
            
        },
        deleteUser(id) {
            alert(id)
        }
    }
}
</script>
