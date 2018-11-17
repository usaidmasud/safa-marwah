


<template>
    <div>
        <b-card header="Persons">
                 <b-form @submit="onSubmit" @reset="onReset">
                    <b-form-group id="exampleInputGroup1"
                                    label="Email address:"
                                    label-for="exampleInput1"
                                    description="We'll never share your email with anyone else.">
                        <b-form-input id="exampleInput1"
                                    type="email"
                                    v-model="form.email"
                                    required
                                    placeholder="Enter email">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup2"
                                    label="Your Password:"
                                    label-for="exampleInput2">
                        <b-form-input id="exampleInput2"
                                    type="password"
                                    v-model="form.password"
                                    required
                                    placeholder="Enter password">
                        </b-form-input>
                    </b-form-group>
                    <b-form-group id="exampleInputGroup3"
                                label="Role:"
                                label-for="exampleInput3">
                        <b-form-select id="exampleInput3"
                                    :options="roles"
                                    required
                                    v-model="form.role">
                        </b-form-select>
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
                email : '',
                password : '',
                role : null
            },
            roles : [
                {text : 'Pilih', value : null},
                {text : 'Admin', value : 'admin'},
                {text : 'Guest', value : 'guest'},
            ],
            alert : {
                show : false,
                variant : '',
                msg : ''
            }
        }
    },
    methods : {
        onSubmit(evt) {
            evt.preventDefault();
            let register = {
                email : this.form.email,
                password : this.form.password,
                role : this.form.role,
            }
            axios.post('http://127.0.0.1:3333/api/register', register)
                .then((response)=>{
                    let result = response.data;
                    console.log(result.message);
                    if (result.status === 'success') {
                        this.alert.variant = 'success';
                        this.alert.msg = result.message;
                        this.alert.show = true;
                        
                        this.form.email = '';
                        this.form.password = '';
                        this.form.role = null;
                    } else {
                        this.alert.variant = 'danger';
                        this.alert.msg = result[0].message;
                        this.alert.show = true;
                    }
                })
                .catch((error)=>{
                    this.alert.variant = 'danger';
                    this.alert.msg = error;
                    this.alert.show = true;
                })
            
            // alert(JSON.stringify(this.form));

        },
        onReset(evt) {
            evt.preventDefault();
            this.form.email = '';
            this.form.password = '';
            this.alert.show = false;
        },
    }
}
</script>
