


<template>
    <div>
        <b-card header="Persons">
                 <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group label="Nama Barang:">
                        <b-form-input
                                    type="text"
                                    v-model="form.nama_barang"
                                    required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Qty:">
                        <b-form-input
                                    type="number"
                                    v-model="form.qty"
                                    required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Diskon:">
                        <b-form-input
                                    type="number"
                                    v-model="form.diskon"
                                    required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Harga Beli:">
                        <b-form-input
                                    type="number"
                                    v-model="form.harga_beli"
                                    required>
                        </b-form-input>
                    </b-form-group>
                    <b-form-group label="Harga Jual:">
                        <b-form-input
                            type="number"
                            v-model="form.harga_jual"
                            required>
                        </b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Satuan">
                        <b-form-select
                            :options="satuans"
                            required
                            v-model="form.satuan_id">
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Kategori:">
                        <b-form-select
                            :options="kategoris"
                            required
                            v-model="form.kategori_id">
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Gambar">
                        <b-form-file
                            v-model="form.thumbnail">
                        </b-form-file>
                    </b-form-group>
                    <b-alert v-if="alert.show" show :variant="alert.variant">{{ alert.msg }}</b-alert>
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <router-link to="/persons" class="btn btn-danger">Cancel</router-link>
                    </b-form>
        </b-card>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    layout : 'app',
    data() {
        return {
            form : {
                nama_barang : 'Jus Alpokat',
                qty : '100',
                harga_beli : '1000',
                diskon : '10',
                harga_jual : '1500',
                satuan_id : null,
                kategori_id : null,
                thumbnail : '',
            },
            satuans : [
                {text : 'Pilih', value : null},
                {text : 'Satuan 1', value : '1'},
                {text : 'Satuan 2', value : '2'},
            ],
            kategoris : [
                {text : 'Pilih', value : null},
                {text : 'Kategori 1', value : '1'},
                {text : 'Kategori 2', value : '2'},
            ],
            alert : {
                show : false,
                variant : '',
                msg : ''
            }
        }
    },
    mounted() {
        // this.get_master()
    },
    methods : {
        async onSubmit(evt) {
            evt.preventDefault();
            let post = {
                nama_barang : this.nama_barang,
                qty : this.qty,
                harga_beli : this.harga_beli,
                diskon : this.diskon,
                harga_jual : this.harga_jual,
                satuan_id : this.satuan_id,
                kategori_id : this.kategori_id,
                thumbnail : this.thumbnail,
            }
            this.$axios.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU0MjQxNjYwOX0.f1V02gZIdiWyD0j5XVOuCVuNaZNslJBRhIAgT_oHkoQ', 'Bearer')
            const satuan = await this.$axios.$post('http://127.0.0.1:3333/api/barangs', JSON.stringify(this.form))
            console.log(satuan);
            
            // axios.post('http://127.0.0.1:3333/api/barangs', register)
            //     .then((response)=>{
            //         let result = response.data;
            //         console.log(result.message);
            //         if (result.status === 'success') {
            //             this.alert.variant = 'success';
            //             this.alert.msg = result.message;
            //             this.alert.show = true;
                        
            //             this.form.email = '';
            //             this.form.password = '';
            //             this.form.role = null;
            //         } else {
            //             this.alert.variant = 'danger';
            //             this.alert.msg = result[0].message;
            //             this.alert.show = true;
            //         }
            //     })
            //     .catch((error)=>{
            //         this.alert.variant = 'danger';
            //         this.alert.msg = error;
            //         this.alert.show = true;
            //     })
            
            // alert(JSON.stringify(this.form));

        },
        onReset(evt) {
            evt.preventDefault();
            this.alert.show = false;
        },
        async get_master(){
            this.$axios.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIsImlhdCI6MTU0MjQxNjYwOX0.f1V02gZIdiWyD0j5XVOuCVuNaZNslJBRhIAgT_oHkoQ', 'Bearer')
            const satuan = await this.$axios.$get('http://127.0.0.1:3333/api/satuans')
            const kategori = await this.$axios.$get('http://127.0.0.1:3333/api/kategoris')
            this.satuans = satuan.data
            this.kategoris = kategori.data
            console.log(this.satuans);
            
            
        }
    }
}
</script>
