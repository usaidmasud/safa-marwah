


<template>
    <b-card header="Barang">
    <router-link class="btn btn-primary btn-sm mb-3 float-right" to="/barangs/add">Tambah</router-link>
    <div class="table-responsive">
        <table class="table table-bordered table-sm">
        <thead>
            <tr>
                <th>#</th>
                <th>Nama Barang</th>
                <th>Thumbnail</th>
                <th>Satuan</th>
                <th>Kategori</th>
                <th>Qty</th>
                <th>Harga Beli</th>
                <th>Harga Jual</th>
                <th>Diskon</th>
                <th>User</th>
                <th>Created</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in barangs" :key="index">
                <td>{{ ++index }}</td>
                <td>{{ item.nama_barang }}</td>
                <td>
                    <b-img thumbnail fluid :src="'http://127.0.0.1:3333/public/uploads/'+item.thumbnail" alt="Thumbnail" />
                </td>
                <td>{{ item.satuan.nama_satuan }}</td>
                <td>{{ item.kategori.nama_kategori }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.harga_beli }}</td>
                <td>{{ item.harga_jual }}</td>
                <td>{{ item.diskon }}</td>
                <td>{{ item.user_id }}</td>
                <td>{{ item.created_at }}</td>
                <td>
                    <b-button variant="success" size="sm">Edit</b-button>
                    <b-button variant="danger" @click="deleteUser(item.id)" size="sm">Delete</b-button>
                </td>
            </tr>
        </tbody>
    </table>
    </div>
    </b-card>
</template>

<script>

export default {
    layout : 'app',
    data(){
        return {
            barangs : [],
            path_img : '',
        }
    },
    mounted() {
        // this.get_data()
        this.get_data(),
        this.get_path()
    },
    methods : {
        async get_data(){
            const url = 'http://127.0.0.1:3333/api/barangs';
            this.$axios.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU0MjQxNjYwOX0.f1V02gZIdiWyD0j5XVOuCVuNaZNslJBRhIAgT_oHkoQ', 'Bearer')
            const response = await this.$axios.$get(url)
            this.barangs = response;
        },
        deleteUser(id) {
            alert(id)
        },
        async get_path() {
            const url = 'http://127.0.0.1:3333/api/path_img';
            this.path_img = await this.$axios.$get(url)
        }
    }
}
</script>
