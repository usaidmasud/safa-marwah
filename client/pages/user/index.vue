<template>
    <section class="section">
        <h2 class="title is-3">User</h2>
        <button class="button is-primary" @click="addUser">
            <b-icon icon="plus" 
            size="is-small">
            </b-icon> User
        </button>
        <hr>
        <table class="table is-bordered is-fullwidth">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
        </table>
    </section>
</template>

<script>
export default {
    methods : {
        addUser() {
            alert('hello')
        }
    }
}
</script>
